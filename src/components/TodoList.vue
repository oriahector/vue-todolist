<template>
    <div id="app">
      <div class="overlay">
        <div class="header">
            <div class="form__wrapper__user">
                <label>Filter by:</label>
                <select v-model="animal">
                    <option disabled value>Filter</option>
                    <option value="pendiente">Pending</option>
                    <option value="prioridad">Priority </option>
                    <option value="berto">Berto's </option>
                    <option value="berta">Berta's</option>
                    <option value="completado">&nbsp;&nbsp;Done</option>
                </select>

            </div>
            <h2>{{tareasCompletadas.length}}/{{tareas.length}} are done!</h2>
        </div>
        <main>
            <div class="cards">
              <!-- <button @click="ordenar('prioridad')">Por Color</button> -->
                <h1>What we need to get done:</h1>
                <ul>
                    <li v-for="tarea in tareasFiltradas" :class="{completado: tarea.completado, withpriority: tarea.prioridad, berta: tarea.usuario == 'berta', berto: tarea.usuario == 'berto'}">
                        <span contenteditable="true" @blur="editarTarea($event, tarea)">{{ tarea.titulo }}</span>
                        <div class="cards__settings">
                            <span class="cards__settings__completed">
                                <i @click="completarTarea(tarea)" class="fa fa-check" title="Completed"></i>
                            </span>

                            <span class="cards__settings__priority">
                                <i @click="ponerPrioridad(tarea)" class="fa fa-bolt" title="Priority task"></i>
                            </span>
                            <a class="cards__settings__url" target="_blank" v-if="tarea.url" v-bind:href="'http://' + tarea.url">
                                <i class="fa f fa-link" title="Link"></i>
                            </a>
                            <span class="cards__settings__trash">
                                <i v-on:click="borrarTarea(tarea)" class="fa fa-trash-o" title="Remove"></i>
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
            <form class="form" v-on:submit.prevent="agregarTarea">
                <span class="input input--isao">
                    <input class="input__field input__field--isao" type="text" v-model="nuevaTarea.titulo" onClick="return empty()">
                    <label class="input__label input__label--isao" data-content="Task">
                        <span class="input__label-content input__label-content--isao">Add task</span>
                    </label>
                </span>
                <span class="input input--isao">
                    <input class="input__field input__field--isao" type="text" v-model="nuevaTarea.url" onClick="return empty()">
                    <label class="input__label input__label--isao" data-content="Url">
                        <span class="input__label-content input__label-content--isao">Add Url</span>
                    </label>
                </span>
                <div class="form__wrapper">
                    <span>
                        <input type="checkbox" id="test1" v-model="nuevaTarea.prioridad" />
                        <label for="test1">
                            High Priority
                        </label>
                    </span>
                    <div class="form__wrapper__user">
                        <select v-model="nuevaTarea.usuario">
                            <option disabled value>&nbsp;&nbsp;&nbsp;Who?</option>
                            <option value="berto" selected>&#x1F42F; Berto </option>
                            <option value="berta">&#x1F437; Berta</option>
                        </select>
                    </div>
                </div>
                <input type="submit" value="Save Task">
            </form>
        </main>
        <footer class="footer">
          <div class="footer__powered">
            <p>Powered by</p>
            <img src="../assets/vue.png" width="20px" alt="Vue">
              <p>and</p>
            <img src="../assets/firebase.png" width="20px" alt="Vue"></p>
          </div>
          <div class="footer__contact">
            <a class="footer__contact__copyright" href="http://hectororia.com">Made with
                <i class="fa fa-heart"></i> by oria_hector</a>
            <a class="footer__contact__copyright" href="http://hectororia.com/contact.php">
                <i class="fa fa-envelope-open-o"></i> Contact me!</a>
          </div>
        </footer>
    </div>
    </div>
</template>

<script>

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
    data() {
        return {
            nuevaTarea: {
                titulo: '',
                url: '',
                prioridad: false,
                completado: false,
                usuario: ''
            },
            animal: "pendiente"
        }
    },
    methods: {
        agregarTarea: function () {
            tareasRef.push(this.nuevaTarea);
            this.nuevaTarea.titulo = '';
            this.nuevaTarea.url = '';
            this.nuevaTarea.completado = false;
            this.nuevaTarea.prioridad = false;
            this.nuevaTarea.usuario = '';
        },
        borrarTarea: function (tarea) {
            tareasRef.child(tarea['.key']).remove();
            toastr.success("Removed");
        },
        completarTarea: function (tarea) {
            tareasRef.child(tarea['.key']).child('completado').set(tarea.completado = !tarea.completado);
        },
        editarTarea: function (event, tarea) {
            tareasRef.child(tarea['.key']).child('titulo').set(tarea.titulo = event.target.innerHTML);
        },

        ponerPrioridad: function (tarea) {
            tareasRef.child(tarea['.key']).child('prioridad').set(tarea.prioridad = !tarea.prioridad);
        },

        //under construction
        ordenar(key) {
                tareasRef.orderByChild(key).on('child_added', snapshot => {
                    console.log(snapshot.key, snapshot.val());
                });
            },
        //End under construction
    },
    computed: {
        tareasCompletadas() {
            return this.tareas.filter((tarea) => tarea.completado);
        },

        tareasConPrioridad() {
            return this.tareas.filter((tarea) => tarea.prioridad);
        },
        tareasBerto() {
            return this.tareas.filter((tarea) => tarea.usuario == 'berto');
        },
        tareasBerta() {
            return this.tareas.filter((tarea) => tarea.usuario == 'berta');
        },

        tareasFiltradas() {
            if (this.animal == 'All') {
                return this.tareas;
            }
            else if (this.animal == 'prioridad') {
                return this.tareas.filter((tarea) => tarea.prioridad && tarea.completado == false);
            }
            else if (this.animal == 'completado') {
                return this.tareas.filter((tarea) => tarea.completado);
            }
            else if (this.animal == 'pendiente') {
                return this.tareas.filter((tarea) => tarea.completado == false);
            }
            else if (this.animal == 'berto'){
                return this.tareas.filter((tarea) => tarea.usuario == 'berto' && tarea.completado == false);
            }
            else if (this.animal == 'berta'){
                return this.tareas.filter((tarea) => tarea.usuario == 'berta' && tarea.completado == false);
            }
        }
    }


}

</script>
<style lang="scss" scoped>
@import '../scss/main.scss';
</style>



