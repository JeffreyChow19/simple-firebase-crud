import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const DataReference = () => {
  // firebase configs
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINSENDERID,
    appId: process.env.REACT_APP_APPID,
  };

  // init app
  initializeApp(firebaseConfig);

  // init services
  const db = getFirestore();

  // collection reference
  const colRef = collection(db, "student");

  return colRef;
};

export default DataReference;
