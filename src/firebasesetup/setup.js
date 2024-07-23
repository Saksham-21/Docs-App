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
          // console.log('File available at', downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
}


// export async function listFilesForEmail(emailId) {
//   if (!emailId) {
//     throw new Error("Email ID is required");
//   }

//   const folderRef = ref(storage, emailId);

//   try {
//     const result = await listAll(folderRef);
//     const files = await Promise.all(result.items.map(async (itemRef) => {
//       const downloadURL = await getDownloadURL(itemRef);
//       return {
//         name: itemRef.name,
//         url: downloadURL
//       };
//     }));
//     return files;
//   } catch (error) {
//     // console.error("Error listing files:", error);
//     throw error;
//   }
// }


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

  for (const itemRef of result.items) {
    const downloadURL = await getDownloadURL(itemRef);
    files.push({
      name: itemRef.name,
      url: downloadURL
    });
  }

  for (const prefixRef of result.prefixes) {
    const nestedFiles = await listAllFiles(prefixRef);
    files = files.concat(nestedFiles);
  }

  return files;
}

// export async function deleteFileFromStorage(fileName,emailId) {
//   const fileRef = ref(storage, `${emailId}/${fileName}`);

//   try {
//     await deleteObject(fileRef);
//     // console.log("File deleted successfully:", fileName);
//   } catch (error) {
//     // console.error("Error deleting file:", error);
//     throw error;
//   }
// }


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

  // Check for the file in the current folder
  for (const itemRef of result.items) {
    if (itemRef.name === fileName) {
      return itemRef;
    }
  }

  // Recursively search in subfolders
  for (const prefixRef of result.prefixes) {
    const foundFileRef = await findFileInNestedFolders(prefixRef, fileName);
    if (foundFileRef) {
      return foundFileRef;
    }
  }

  return null;
}