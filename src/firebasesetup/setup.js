import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { ref, uploadBytesResumable, getDownloadURL,listAll,deleteObject  } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBQQ4kVs0hlvK1YUsIT1YLa9r0INhjPWwU",
  authDomain: "docs-app-47fad.firebaseapp.com",
  projectId: "docs-app-47fad",
  storageBucket: "docs-app-47fad.appspot.com",
  messagingSenderId: "869820582771",
  appId: "1:869820582771:web:0028f17fff858c560cd306",
  measurementId: "G-CM158SXNJQ"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const storageRef = ref(storage);




export async function uploadFileToFirebaseStorage(gmailId, file) {
  if (!gmailId || !file) {
    throw new Error("Both Gmail ID and file are required");
  }

  // Create a storage reference using the Gmail ID as the folder name
  const filePath = `${gmailId}/${file.name}`;
  const fileRef = ref(storage, filePath);

  // Upload the file
  const uploadTask = uploadBytesResumable(fileRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Optional: Handle progress updates here if needed
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error("File upload error:", error);
        reject(error);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
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
    console.error("Error listing files:", error);
    throw error;
  }
}

export async function deleteFileFromStorage(fileName,emailId) {
  const fileRef = ref(storage, `${emailId}/${fileName}`);

  try {
    // Delete the file from Firebase Storage
    await deleteObject(fileRef);
    console.log("File deleted successfully:", fileName);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
}