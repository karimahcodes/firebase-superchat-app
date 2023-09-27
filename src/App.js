import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore'; //database
import 'firebase/auth'; //user authentication

//Firebase SDK hooks to make it easier to work with firebase
import { useAuthState} from 'react-firebase-hooks/auth';
import { useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp({
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
  apiKey: "AIzaSyBGtV9Ya6peJatI0oGK9vie7iCxuxH_UXM",
  authDomain: "superchat-demo-efb05.firebaseapp.com",
  projectId: "superchat-demo-efb05",
  storageBucket: "superchat-demo-efb05.appspot.com",
  messagingSenderId: "907559992071",
  appId: "1:907559992071:web:a9bb1b9e2c52b52943e3a2"
})

//reference DB and auth as global variables
const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;
