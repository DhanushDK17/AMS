import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { addDoc, collection, getFirestore, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { apartments } from "../data/aparments";
const firebaseConfig = {

    apiKey: "AIzaSyDFPgjU2bELJhecGiOMnn1wBwpAxRYrRXY",
  
    authDomain: "apartmentlife-1933e.firebaseapp.com",
  
    projectId: "apartmentlife-1933e",
  
    storageBucket: "apartmentlife-1933e.appspot.com",
  
    messagingSenderId: "840800703419",
  
    appId: "1:840800703419:web:92ac99f729b42292a5ea9e",
  
    measurementId: "G-MFTHD8W5TJ"
  
  };
const firebaseConfig2 = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENTID
};
console.log(firebaseConfig);
console.log(firebaseConfig2);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loginWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        const { user } = await signInWithPopup(auth, provider);

        return { uid: user.uid, displayName: user.displayName, apartmentId: apartments[user.email].apartmentId };
    } catch (error) {
        if (error.code !== 'auth/cancelled-popup-request') {
            console.error(error);
        }
        return null;
    }
}

async function sendMessage(user, text) {
    try {
        await addDoc(collection(db, 'apartments',`${user.apartmentId}`, 'messages'), {
            uid: user.uid,
            displayName: user.displayName,
            text: text.trim(),
            timestamp: serverTimestamp()
        });
    } catch (error) {
        console.log(error.message);
        console.error(error);
    }
}

async function fetchMessages (roomId, callback) {
    return onSnapshot(
        query(
            collection(db, 'apartments', `${roomId}`, 'messages'),
            orderBy('timestamp', 'asc')
        ),
        (QuerySnapshot) => {
            const messages = QuerySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            callback(messages);
        }
    )
}

export { sendMessage, loginWithGoogle, fetchMessages };