<template>
  <div id="app">
    <div style="width: 100%; color: white; background: #68ad8b;">
      <h1>My Tasks</h1>
    </div>




<div>
  <h3>Add Tarea </h3>
   <form v-on:submit.prevent="agregarTarea" >
        <input type="text" placeholder="Introduce tu tarea" v-model="nuevaTarea.titulo">
        <input type="submit" value="Enviar tarea">
        </form>
</div>
     <main style="margin-top:20px;">

    <h2> Important Tasks </h2>
        <li v-for="tarea in tareas">
           {{ tarea.titulo }} <span v-on:click="borrarTarea(tarea)">Borraculo</span>
        </li>
         <h2> Task to keep in mind </h2>
        <li v-for="tarea in tareas">
           {{ tarea.titulo }}
        </li>
     </main>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Firebase from 'firebase'
import toastr from 'toastr'

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
  },
  data () {
    return {
      nuevaTarea: {
          titulo: '',
          prioridad: false,
          completado: false
      }
    }
  },
  methods: {
    agregarTarea: function(){
      tareasRef.push(this.nuevaTarea);
      this.nuevaTarea.titulo = '';
      this.nuevaTarea.completado = false;
      this.nuevaTarea.prioridad = false;
    },
    borrarTarea: function(tarea){
      tareasRef.child(tarea['.key']).remove();
      toastr.success("Tarea eliminada");
    }
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
