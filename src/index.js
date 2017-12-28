import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Creatingtodo from './Creatingtodo';
import Addingtodos from './Addingtodos';
import Div3 from './Div3';
import Div4 from './Div4';
import Dragndrop from './Dragndrop';
import firebase from "firebase"
import registerServiceWorker from './registerServiceWorker';

var config = {
  apiKey: "AIzaSyAkhH4uLWHVBCVd5wtIvK6l6p9BLTZXBLs",
  authDomain: "todo-app-2411f.firebaseapp.com",
  databaseURL: "https://todo-app-2411f.firebaseio.com",
  projectId: "todo-app-2411f",
  storageBucket: "todo-app-2411f.appspot.com",
  messagingSenderId: "213722828277"
};
firebase.initializeApp(config);

ReactDOM.render(
  <div>
    {/* <Creatingtodo /> */}
    {/* <Addingtodos /> */}
    {/* <Div3 /> */}
    {/* <Div4 /> */}
    <Dragndrop />
  </div>

  , document.getElementById('root'));
registerServiceWorker();
