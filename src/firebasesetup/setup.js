import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { ref, uploadBytesResumable, getDownloadURL,listAll,deleteObject  } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_F_API_KEY,
  authDomain: import.meta.env.VITE_F_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_F_PROJECT_ID,
  storageBucket: import.meta.env.VITE_F_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_F_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_F_APP_ID,
  measurementId: import.meta.env.VITE_F_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export async function uploadFileToFirebaseStorage(gmailId, file) {
  if (!gmailId || !file) {
    throw new Error("Both Gmail ID and file are required");
  }
  const filePath = `${gmailId}/${file.name}`;
  const fileRef = ref(storage, filePath);
  const uploadTask = uploadBytesResumable(fileRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.error("File upload error:", error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
}

export async function listFilesForEmail(emailId) {
  if (!emailId) {
    throw new Error("Email ID is required");
  }
  const folderRef = ref(storage, emailId);
  try {
    const files = await listAllFiles(folderRef);
    return files;
  } catch (error) {
    console.error("Error listing files:", error);
    throw error;
  }
}

async function listAllFiles(folderRef) {
  const result = await listAll(folderRef);
  let files = [];
  const filePromises = result.items.map(async (itemRef) => {
    const downloadURL = await getDownloadURL(itemRef);
    return {
      name: itemRef.name,
      url: downloadURL
    };
  });
  const filesWithUrls = await Promise.all(filePromises);
  files = files.concat(filesWithUrls);
  const nestedFolderPromises = result.prefixes.map((prefixRef) => listAllFiles(prefixRef));
  const nestedFiles = await Promise.all(nestedFolderPromises);
  nestedFiles.forEach((nestedFileArray) => {
    files = files.concat(nestedFileArray);
  });
  return files;
}

export async function deleteFileFromStorage(fileName, emailId) {
  if (!fileName || !emailId) {
    throw new Error("File name and Email ID are required");
  }
  const folderRef = ref(storage, emailId);
  try {
    const fileRef = await findFileInNestedFolders(folderRef, fileName);
    if (fileRef) {
      await deleteObject(fileRef);
      console.log("File deleted successfully:", fileName);
    } else {
      console.log("File not found:", fileName);
    }
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
}

async function findFileInNestedFolders(folderRef, fileName) {
  const result = await listAll(folderRef);
  for (const itemRef of result.items) {
    if (itemRef.name === fileName) {
      return itemRef;
    }
  }
  const nestedFolderPromises = result.prefixes.map((prefixRef) =>
    findFileInNestedFolders(prefixRef, fileName)
  );
  const nestedResults = await Promise.all(nestedFolderPromises);
  for (const nestedResult of nestedResults) {
    if (nestedResult) {
      return nestedResult;
    }
  }
  return null;
}

//--------------------------------------------------------------------------
export async function listOrganizedFolders(emailId) {
  const folderRef = ref(storage, emailId);
  const result = await listAll(folderRef);
  const folderNames = result.prefixes.map(folderRef => {
    const fullPath = folderRef._location.path_;
    const name = fullPath.split('/').pop();
    return name;
  });

  return folderNames;
}

export async function listOrganizedFiles(folder, emailId) {
  const folderPath = `${emailId}/${folder}`;
  const folderRef = ref(storage, folderPath);
  const result = await listAll(folderRef);
  const concurrencyLimit = 5;
  const fileChunks = chunkArray(result.items, concurrencyLimit);
  const files = [];
  for (const chunk of fileChunks) {
    const chunkResults = await Promise.all(chunk.map(async (fileRef) => {
      const fullPath = fileRef._location.path_;
      const name = fullPath.split('/').pop();
      const url = await getDownloadURL(fileRef);
      return { name, url };
    }));
    files.push(...chunkResults);
  }
  console.log(files);
  return files;
}

function chunkArray(array, size) {
  const chunked = [];
  for (let i = 0; i < array.length; i += size) {
    chunked.push(array.slice(i, i + size));
  }
  return chunked;
}