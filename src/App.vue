<template>
  <div id="app">
    <div style="width: 100%; background: green;">
      <h1> Primera prueba con Vue + Firebase</h1>
    </div>

    <p> Task List </p>
     <main style="margin-top:20px;">
        <li v-for="tarea in tareas">
           {{ tarea['.value'] }}

        </li>
     </main>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Firebase from 'firebase'

let config = {
  apiKey: "AIzaSyD_hTRE79wSgCjbhSczPaGF-Er2a7Eql5I",
  authDomain: "hectors-todo-list.firebaseapp.com",
  databaseURL: "https://hectors-todo-list.firebaseio.com",
  projectId: "hectors-todo-list",
  storageBucket: "hectors-todo-list.appspot.com",
  messagingSenderId: "240088787083"
}

let app = Firebase.initializeApp(config);
let db = app.database();

let tareasRef = db.ref('tareas');

export default {
  name: 'app',
  firebase: {
      tareas: tareasRef
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
