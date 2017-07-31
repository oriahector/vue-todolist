<template>
  <div id="app" style="display: flex; flex-direction:column; background-color: rgba(0, 0, 0, 0.7); height: 100%;width: 100%;">

  <div style="border-top: 1px solid #68ad8b; display: flex; justify-content: flex-end;">
      <h4>{{tareasCompletadas.length}}/{{tareas.length}} are done!</h4>
  </div>

<div style="flex: 1 0 auto;">
<div style="display: flex; justify-content: space-around; margin-top: 20px; flex-wrap:wrap;">
<div style="flex-basis: 80%; display: flex; justify-content: center; align-items: flex-start; flex-direction: column;"><h3><i class="fa fa-sun-o"></i>Tasks to keep in mind</h3>
        <ul style="display: flex; flex-direction: column;">
            <li v-for="tarea in tareas"  style="font-weight: bold" :class="{completado: tarea.completado}">
<i v-on:click="borrarTarea(tarea)" class="fa fa-trash-o"></i>
                  <span @click="completarTarea(tarea)">{{ tarea.titulo }} </span>

                   <span ><a target="_blank" v-bind:href="tarea.url">{{ tarea.url }} </a></span>
            </li>

        </ul>
        </div>

        <div style="flex-basis: 40%; flex-basis: 80%; display: flex; justify-content: center; align-items: flex-start; flex-direction: column;"><h3><i class="fa fa-sun-o"></i>git Priority Tasks</h3>
            <ul style="display: flex; flex-direction: column;">
            <li v-for="tarea in tareasConPrioridad"  style="font-weight: bold;" :class="{completado: tarea.completado}">
<i v-on:click="borrarTarea(tarea)" class="fa fa-trash-o"></i>
               <span @click="completarTarea(tarea)"> {{ tarea.titulo }}</span>

            </li>
        </ul>
        </div>
</div>




<div style="margin-top:100px;8ad8b; display: flex; justify-content: center;">

   <form v-on:submit.prevent="agregarTarea" style="display: flex; align-items: center; flex-direction: column; flex-basis:60%;">
       <span class="input input--isao">
					<input class="input__field input__field--isao" type="text" id="validate" v-model="nuevaTarea.titulo" onClick="return empty()" >
					<label class="input__label input__label--isao" for="input-38" data-content="Task">
						<span class="input__label-content input__label-content--isao">Add a task</span>
					</label>
				</span>
        <span class="input input--isao">
					<input class="input__field input__field--isao" type="text" id="validate" v-model="nuevaTarea.url" onClick="return empty()" >
					<label class="input__label input__label--isao" for="input-38" data-content="Task">
						<span class="input__label-content input__label-content--isao">Url</span>
					</label>
				</span>
        <p>
    <input type="checkbox" id="test1" v-model="nuevaTarea.prioridad"/>
    <label for="test1">High Priority</label>
  </p>

        <input type="submit" value="Save Task">
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
          url: '',
          prioridad: false,
          completado: false
      }
    }
  },
  methods: {
    agregarTarea: function(){
      tareasRef.push(this.nuevaTarea);
      this.nuevaTarea.titulo = '';
      this.nuevaTarea.url = '';
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
}

@import 'scss/main.scss';

.completado {
    text-decoration: line-through;
    color: $main;
    opacity: 0.3;
    transition: 0.3s;
}


</style>
