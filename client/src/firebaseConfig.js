import * as firebase from 'firebase';

export const config = {
    apiKey: "AIzaSyC7q2Z_iuEHFUiH10zmizAhzoMXP0FE65M",
    authDomain: "bash-bash.firebaseapp.com",
    databaseURL: "https://bash-bash.firebaseio.com",
    projectId: "bash-bash",
    storageBucket: "",
    messagingSenderId: "446079285310"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

