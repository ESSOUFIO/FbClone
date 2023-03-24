import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "./config";

export const addUserDocument = async (user) => {
  await setDoc(doc(db, "users", user.uid), user);
};

export const uploadImage = (userId, file) => {
  return new Promise((resolve, reject) => {
    // create file reference
    const filePath = `users/${userId}/profile-image`;
    const fileRef = ref(storage, filePath);

    // Upload the file and metadata
    const uploadTask = uploadBytesResumable(fileRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default: //default
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          default: // Unknown error occurred, inspect error.serverResponse
        }
        reject(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
};

export const uploadPostPhoto = (postId, file) => {
  return new Promise((resolve, reject) => {
    // create file reference
    const filePath = `posts/${postId}/photo`;
    const fileRef = ref(storage, filePath);

    // Upload the file and metadata
    const uploadTask = uploadBytesResumable(fileRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      () => {},
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          default: // Unknown error occurred, inspect error.serverResponse
        }
        reject(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
};

export const getUploadedProfilePic = (userId) => {
  const filePath = `users/${userId}/profile-image`;
  const fileRef = ref(storage, filePath);
  return new Promise((resolve, reject) => {
    getDownloadURL(fileRef)
      .then((downloadURL) => {
        resolve(downloadURL);
      })
      .catch(() => {
        reject(null);
      });
  });
};

export const getUser = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  // console.log("getUser: ", uid);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};
