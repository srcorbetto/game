import * as firebase from 'firebase';

export const authFunc = firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        // logOut.classList.remove('hide');
    } else {
        console.log('Not logged in');
        // logOut.classList.add('hide');
    }
  });