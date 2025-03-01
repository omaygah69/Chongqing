import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBrbZaQR7dycn41NZgCpsdaXlfqpgR_A1E",
    authDomain: "nahhocr.firebaseapp.com",
    projectId: "nahhocr",
    storageBucket: "nahhocr.firebasestorage.app",
    messagingSenderId: "681395969591",
    appId: "1:681395969591:web:5440c4fddadf95b3b629b2"
};

const app = initializeApp(firebaseConfig);
export default app;
