import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCq70jnAABYCi_HCUl6NMLr4OGslvvi_SI",
    authDomain: "chatgpt-f1215.firebaseapp.com",
    projectId: "chatgpt-f1215",
    storageBucket: "chatgpt-f1215.appspot.com",
    messagingSenderId: "778776381073",
    appId: "1:778776381073:web:1f3f30fdfb4ac0f0a62130",
    measurementId: "G-9X5FS72GW1"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };