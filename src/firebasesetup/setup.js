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
        // console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        // console.error("File upload error:", error);
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


export async function listFilesForEmail(emailId) {
  if (!emailId) {
    throw new Error("Email ID is required");
  }

  const folderRef = ref(storage, emailId);

  try {
    const result = await listAll(folderRef);
    const files = await Promise.all(result.items.map(async (itemRef) => {
      const downloadURL = await getDownloadURL(itemRef);
      return {
        name: itemRef.name,
        url: downloadURL
      };
    }));
    return files;
  } catch (error) {
    // console.error("Error listing files:", error);
    throw error;
  }
}

export async function deleteFileFromStorage(fileName,emailId) {
  const fileRef = ref(storage, `${emailId}/${fileName}`);

  try {
    await deleteObject(fileRef);
    // console.log("File deleted successfully:", fileName);
  } catch (error) {
    // console.error("Error deleting file:", error);
    throw error;
  }
}