import { Component, OnInit } from '@angular/core';
import { auth, signInWithEmailAndPassword } from ''

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // Import the functions you need from the SDKs you need
/*import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXI6Uu7tGP95DnzPXqt07DXogDIhLqhkE",
  authDomain: "harmonee-prototype.firebaseapp.com",
  projectId: "harmonee-prototype",
  storageBucket: "harmonee-prototype.appspot.com",
  messagingSenderId: "214353220762",
  appId: "1:214353220762:web:5a2777bc393f0dff017b23",
  measurementId: "G-PXLYXS0MN1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
*/
}
