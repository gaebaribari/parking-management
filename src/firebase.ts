import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBuMZ5miR9fR61ykUgF0xXexKciO5ZFuPo",
  authDomain: "parking-management-2cba1.firebaseapp.com",
  projectId: "parking-management-2cba1",
  storageBucket: "parking-management-2cba1.firebasestorage.app",
  messagingSenderId: "249823524635",
  appId: "1:249823524635:web:832f05645b77edc9e285be",
  measurementId: "G-89S86BWFBS"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };