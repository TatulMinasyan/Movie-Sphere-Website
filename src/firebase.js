import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth/cordova";
import {
    addDoc,
    collection,
    getFirestore
} from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyCsGlQxn2krXhBZ6s505qJZqzdHYgJ5w-E",
    authDomain: "moviesphere-6e72e.firebaseapp.com",
    projectId: "moviesphere-6e72e",
    storageBucket: "moviesphere-6e72e.firebasestorage.app",
    messagingSenderId: "802181333912",
    appId: "1:802181333912:web:5a36d875ef17cb8c2921ed",
    measurementId: "G-FT8X2BE383"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = () => {
    signOut(auth);
}

export { auth, db, login, signup, logout };