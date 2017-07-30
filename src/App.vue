<template>
  <div id="app" style="display: flex; flex-direction:column; height: 100vh;">
    <div style="width: 100%; color: white; background: #68ad8b; display:flex; align-items:center; flex-direction:column;flex-shrink: 0;">
      <h1>My Tasks</h1>
    </div>



<div style="flex: 1 0 auto;">
<div style="display: flex; justify-content: space-around; margin-top: 20px;">
<div style="flex-basis: 40%;"><h3 >Tasks to keep in mind</h3>
        <ul style="display: flex; flex-direction: column;">
            <li v-for="tarea in tareas"  style="font-weight: bold" :class="{completado: tarea.completado}">
<i v-on:click="borrarTarea(tarea)" class="fa fa-trash-o"></i>
                  <span @click="completarTarea(tarea)">{{ tarea.titulo }}</span>

            </li>
        </ul>
        </div>

        <div style="flex-basis: 40%;"><h3>Priority Tasks</h3>
            <ul style="display: flex; flex-direction: column;">
            <li v-for="tarea in tareasConPrioridad"  style="font-weight: bold;" :class="{completado: tarea.completado}">
<i v-on:click="borrarTarea(tarea)" class="fa fa-trash-o"></i>
               <span @click="completarTarea(tarea)"> {{ tarea.titulo }}</span>

            </li>
        </ul>
        </div>
</div>


<div style="margin-top:100px; border-top: 1px solid #68ad8b; display: flex; justify-content: flex-end;">
  <h4>{{ tareasCompletadas.length }}/{{tareas.length}} are done!</h4>

  </div>

<div style="border-top: 1px solid #68ad8b; display: flex; justify-content: center;">

   <form v-on:submit.prevent="agregarTarea" style="display: flex; align-items: center; flex-direction: column; flex-basis:60%;">
       <span class="input input--isao">
					<input class="input__field input__field--isao" type="text" id="input-38" v-model="nuevaTarea.titulo">
					<label class="input__label input__label--isao" for="input-38" data-content="Task">
						<span class="input__label-content input__label-content--isao">Add a task</span>
					</label>
				</span>
        <p>
    <input type="checkbox" id="test1" v-model="nuevaTarea.prioridad"/>
    <label for="test1">High Priority</label>
  </p>

        <input type="submit" value="Enviar tarea">
        </form>



</div>
</div>

 <footer class="footer" style=" flex-shrink: 0;">
            <a class="footer__copyright" href="http://hectororia.com">Made with <i class="fa fa-heart"></i> by Héctor Martínez</a>
            <a class="footer__copyright" href="../contact.php"><i class="fa fa-envelope-open-o"></i> Contact with the developer</a>
        </footer>

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
    },
     completarTarea: function(tarea){

                 tareasRef.child(tarea['.key']).child('completado').set(tarea.completado = !tarea.completado);
            }
  },
  computed: {
            tareasCompletadas(){
                return this.tareas.filter((tarea) => tarea.completado);
            },

             tareasConPrioridad(){
                return this.tareas.filter((tarea) => tarea.prioridad);
            }
        }
}
</script>

<style lang="scss" scoped>

body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;

}

@import 'scss/main.scss';

.completado {
    text-decoration: line-through;
    color: $main;
}


</style>
