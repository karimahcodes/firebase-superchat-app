import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; //database
import 'firebase/compat/auth'; //user authentication        
//Firebase SDK hooks to make it easier to work with firebase
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useState } from 'react';

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

// Reference DB and auth as global variables
const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">

      </header>

      <section>
        {/* if an authorized user is signed in, show chatroom, otherwise show signin component */}
        {user ? <ChatRoom /> : <SignIn />}
      </section>


    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {

    // Instantiate a provider called the Google auth provider
    const provider = new firebase.auth.GoogleAuthProvider();
    // Trigger popup with signInWithPopup method
    auth.signInWithPopup(provider);
  } 
  return (
    <button onClick={signInWithGoogle}>Sign In With Google</button>
  )
}

function SignOut() {

  // Check for a current user. If so, button will trigger signOut method
  return auth.currentUser && (
    <button onClick = { () => auth.signOut()}> Sign Out </button >

  )
}

function ChatRoom() {

  // Reference the messages collection in our Firestore database
  const messagesRef = firestore.collection('messages');
  //  Query a subset of documents ordered by the timestamp and limited to the maximum number of 25 docs
  const query = messagesRef.orderBy('createdAt').limit(25);

  // Update the query and listen to data in realtime with a useCollectionData hook
  // Return an array of objects that contain each message in the database
  const [messages] = useCollectionData(query, {idField: 'id'});

  // Set state of input to user's selection
  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    // reset form to an empty field after submission
    setFormValue('');

  }


  return(
    <>
      <div>

        {/* Map/loop over the array of messages to retrieve each message document */}
        {/* Return a ChatMessage component for each message and pass the document data to it as the message prop*/}
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)} 
      </div>
      
      {/* Create a form for users to submit messages */}
      <form onSubmit = {sendMessage}>

        {/* Bind the state of the formValue to the form input whenever a change occurs */}
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
        
        <button type='submit'> Send Message </button>
      
      </form>


    </>

  )
}

//receive the props from the 
function ChatMessage(props) {

  // Use the props' message to create an object containing the text and user ID
  const { text, uid, photoURL } = props.message; 
  
  // Use conditional styling to assign different class names to the message:
    // If logged-in user's ID matches the message's uid, then create a class for a 'sent' message.
    // Otherwise, if the uids differ, create a class for a 'received' message.
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';


  return (

    <div className={`message ${messageClass}`}>
      <img src = {photoURL}/>
      <p>{text}</p>
    </div>
  ) 
}


export default App;
