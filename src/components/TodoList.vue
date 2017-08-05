<template>
    <div id="app">
        <div class="header">
            <div class="form__wrapper__user">
                <label>Filter by:</label>
                <select v-model="animal">
                    <option disabled value>Filter</option>
                    <option value="All" selected>All </option>
                    <option value="berto">Berto's </option>
                    <option value="berta">Berta's</option>
                </select>

            </div>
            <h2>{{tareasCompletadas.length}}/{{tareas.length}} are done!</h2>
        </div>
        <main>
            <div class="cards">
                <h1>What we need to get done:</h1>
                <ul>
                    <li v-for="tarea in tareasFiltradas" :class="{completado: tarea.completado}">
                        <span @click="completarTarea(tarea)">{{ tarea.titulo }} </span>
                        <div class="cards__settings">
                            <span class="cards__settings__user" v-if="tarea.usuario == 'berto'" title="Berto">
                                &#x1F42F;
                            </span>
                            <span class="cards__settings__user" v-if="tarea.usuario == 'berta'" title="Berta">
                                &#x1F437;
                            </span>
                            <span class="cards__settings__priority" v-if="tarea.prioridad">
                                <i class="fa f fa-bolt" title="Priority task"></i>
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
                            <option disabled value> Who?</option>
                            <option value="berto" selected>&#x1F42F; Berto </option>
                            <option value="berta">&#x1F437; Berta</option>
                        </select>
                    </div>
                </div>
                <input type="submit" value="Save Task">
            </form>
        </main>
        <footer class="footer">
            <a class="footer__copyright" href="http://hectororia.com">Made with
                <i class="fa fa-heart"></i> by oria_hector</a>
            <a class="footer__copyright" href="http://hectororia.com/contact.php">
                <i class="fa fa-envelope-open-o"></i> Contact me!</a>
        </footer>
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
            animal: "All"
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
        }
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
            else {
                return this.tareas.filter((tarea) => tarea.usuario == this.animal);
            }
        }
    }
}

</script>
<style lang="scss" scoped>
@import '../scss/main.scss';
</style>


