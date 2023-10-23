// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDO-nuOr8GtpNmd5yF6j5aDshxBG-eZE0c",
  authDomain: "uploadmusic-4475b.firebaseapp.com",
  projectId: "uploadmusic-4475b",
  storageBucket: "uploadmusic-4475b.appspot.com",
  messagingSenderId: "38747019049",
  appId: "1:38747019049:web:6b0acbd3eb946b130b0938",
  measurementId: "G-N6P5WSCJ35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);