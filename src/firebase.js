import {initializeApp} from 'firebase';

const app = initializeApp({
  apiKey: "AIzaSyD_hTRE79wSgCjbhSczPaGF-Er2a7Eql5I",
  authDomain: "hectors-todo-list.firebaseapp.com",
  databaseURL: "https://hectors-todo-list.firebaseio.com",
  projectId: "hectors-todo-list",
  storageBucket: "hectors-todo-list.appspot.com",
  messagingSenderId: "240088787083"
});

export const db = app.database();
export const tareasRef = db.ref('tareas');
