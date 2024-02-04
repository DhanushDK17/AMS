import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import {getAnalytics, logEvent} from 'firebase/analytics';
import { setDoc, updateDoc, addDoc, collection, getFirestore, serverTimestamp, onSnapshot, query, orderBy, where, doc, getDoc, arrayUnion, getDocs, Timestamp } from 'firebase/firestore';
const firebaseConfig = {

    apiKey: "AIzaSyDFPgjU2bELJhecGiOMnn1wBwpAxRYrRXY",
  
    authDomain: "apartmentlife-1933e.firebaseapp.com",
  
    projectId: "apartmentlife-1933e",
  
    storageBucket: "apartmentlife-1933e.appspot.com",
  
    messagingSenderId: "840800703419",
  
    appId: "1:840800703419:web:92ac99f729b42292a5ea9e",
  
    measurementId: "G-MFTHD8W5TJ"
  
  };
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const analytics = getAnalytics();
async function loginWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        const { user } = await signInWithPopup(auth, provider);
        const isUserRegged = await checkIfUserPresent(user.email, 'signedOwners');
        if (!isUserRegged) {
            await addUser(user, 'signedOwners');
            logEvent(analytics, `newuser`, {
                method: 'google',
                user: user.email
            });
        }
        return { uid: user.uid, displayName: user.displayName, email: user.email };
    } catch (error) {
        if (error.code !== 'auth/cancelled-popup-request') {
            console.error(error);
        }
        return null;
    }
}

async function sendMessage(user, text) {
    try {
        await addDoc(collection(db, 'signedApartments',`${user.apartmentId}`, 'messages'), {
            uid: user.uid,
            displayName: user.displayName,
            text: text.trim(),
            timestamp: serverTimestamp()
        });
    } catch (error) {
        console.error(error);
    }
}

async function checkIfUserPresent(user, collectionname) {
    try {
        const docRef = doc(db, collectionname, user);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log('checkuser',error);
    }
}

async function addApartment(user, apartment, collectionname) {
    try {
        await setDoc(doc(db, collectionname, `${apartment.name}`), {
            name: apartment.name,
            bed: apartment.bed,
            bath: apartment.bath,
            price: apartment.price,
            address: apartment.address,
            features: apartment.features,
            phone: '7378839092',
            createdBy: user,
            convs: {},
            timestamp: serverTimestamp()
        })
        // const docResponse = await getDoc(doc(db, 'signedOwners', user));
        await updateDoc(doc(db, 'signedOwners', user), {
           apartments: arrayUnion(apartment.name)
        });
        logEvent(analytics, 'newapartment', {
            name: apartment.name
        });
    } catch (error) {
        console.log('add app', error);
    }
}

async function addUser(user, collectionname) {
    try {
        await setDoc(doc(db, collectionname, user.email), {
            uid: user.uid,
            displayName: user.displayName,
            apartments: [],
            timestamp: serverTimestamp()
        });
    } catch (error) {
        console.log('adduser',error.message);
        console.error(error);
    }
}

async function fetchMessages (roomId, callback) {
    return onSnapshot(
        query(
            collection(db, 'signedApartments', `${roomId}`, 'messages'),
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
async function fetchApartments (user, callback) {
    const apartmentsQuery = query(
        collection(db, 'signedApartments'),
        where("createdBy", "==", user)
    );
    const querySnapshot = await getDocs(apartmentsQuery);
    const apartments = [];
    querySnapshot.forEach((doc) => apartments.push(doc.data()));
    callback(apartments.filter((apartment) => apartment.name));
}
async function fetchApartmentsForResidents (callback) {
    const querySnapshot = await getDocs(collection(db, 'signedApartments'));
    const apartments = [];
    querySnapshot.forEach((doc) => {
        apartments.push(doc.data());
    })
    logEvent(analytics, 'apartmentsfetched', {
        name: 'apartmentsfetched'
    });
    callback(apartments.filter((apartment) => apartment.name));
}
async function fetchApartmentConvsForApartment(apartmentname, callback) {
    console.log(apartmentname);
    await onSnapshot(collection(db, "signedApartments", apartmentname, 'convs'), (snapshot) => {
        callback(snapshot.docs.map((doc) => doc.data()));
    });
}
async function fetchApartmentConvs(user, apartmentname, callback) {
    await onSnapshot(doc(db, "signedApartments", apartmentname, 'convs', user), (doc) => {
        console.log(doc.data().messages);
        callback(doc.data().messages);
    });
}
async function checkIfConversationExist(user, apartmentname, callback) {
    try {
        const docRef = doc(db, 'signedApartments', apartmentname, 'conv', user);
        const docSnap = await getDoc(docRef);
        console.log(user, apartmentname, docSnap.exists());
        callback(docSnap.exists())
    } catch (error) {
        console.log('checkuser',error);
    }
}
async function createConversation (user, apartmentname) {
    try {
        await setDoc(doc(db, 'signedApartments', apartmentname, 'convs', user), {
            creator: user,
            messages: []
        });
    } catch (error) {
        console.log('adduser',error.message);
        console.error(error);
    }
}
async function addMessageToConversation(user, conversationowner, apartmentname, message, type, callback) {
    console.log(user, conversationowner, apartmentname, message, type);
    try {
        await updateDoc(doc(db, 'signedApartments', apartmentname ,'convs', conversationowner), {
            messages: arrayUnion({
                text: message,
                by: user,
                type,
                timestamp: Timestamp.now()
            })
        });
        await fetchApartmentConvs(conversationowner, apartmentname, callback);
    } catch (error) {
        console.log('add message error');
        console.log(error);
    }
}

export { fetchApartmentConvsForApartment, checkIfConversationExist, fetchApartmentConvs, addMessageToConversation, sendMessage, loginWithGoogle, fetchMessages, addApartment, fetchApartments, fetchApartmentsForResidents, createConversation };