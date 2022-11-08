import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBMB5i_-mYevKZozP890G7NuUiNo18jM-4",
	authDomain: "bqt-task.firebaseapp.com",
	projectId: "bqt-task",
	storageBucket: "bqt-task.appspot.com",
	messagingSenderId: "777476129217",
	appId: "1:777476129217:web:cc1ecdd357139f83fb2f40",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
