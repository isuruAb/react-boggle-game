
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAItXcU-0lkjfGxa5r8_ccDFFGgurIraMg",
    authDomain: "boggle-4d684.firebaseapp.com",
    databaseURL: "https://boggle-4d684.firebaseio.com",
    projectId: "boggle-4d684",
    storageBucket: "boggle-4d684.appspot.com",
    messagingSenderId: "588418056665"
};

export const app = firebase.initializeApp(config);

export const auth = firebase.auth();
export const database = firebase.database();
export const storage = firebase.storage();


