<template>
    <div id="app">
        <div class="header">
            <h4>{{tareasCompletadas.length}}/{{tareas.length}} are done!
            </h4>
        </div>
        <main>
            <div class="cards">
                <h3>What I need to get done:</h3>
                <ul>
                    <li v-for="tarea in tareas" :class="{completado: tarea.completado}">
                        <span @click="completarTarea(tarea)">{{ tarea.titulo }} </span>
                        <div class="cards__settings">
                            <span v-if="tarea.usuario == 'Berto'">
                                &#x1F42F;
                            </span>
                            <span v-if="tarea.usuario == 'Berta'">
                                &#x1F431;
                            </span>
                            <span class="cards__settings__priority" v-if="tarea.prioridad">
                                <i style="opacity: 1;" class="fa f fa-bolt"></i>
                            </span>
                            <a class="cards__settings__url" target="_blank" v-if="tarea.url" v-bind:href="tarea.url">
                                <i class="fa f fa-link"></i>
                            </a>
                            <span class="cards__settings__geo" v-if="tarea.geo">
                                <i style="opacity: 1;" class="fa f fa-location-arrow"></i>
                            </span>
                            <i v-on:click="borrarTarea(tarea)" class="cards__settings__trash fa fa-trash-o"></i>
                        </div>
                    </li>
                </ul>
            </div>
            <form class="form" v-on:submit.prevent="agregarTarea" style="display: flex; align-items: center; flex-direction: column; flex-basis:60%;">
                <span class="input input--isao">
                    <input class="input__field input__field--isao" type="text" id="validate" v-model="nuevaTarea.titulo" onClick="return empty()">
                    <label class="input__label input__label--isao" for="input-38" data-content="Task">
                        <span class="input__label-content input__label-content--isao">Add task</span>
                    </label>
                </span>
                <span class="input input--isao">
                    <input class="input__field input__field--isao" type="text" id="validate" v-model="nuevaTarea.url" onClick="return empty()">
                    <label class="input__label input__label--isao" for="input-38" data-content="Url">
                        <span class="input__label-content input__label-content--isao">Add Url</span>
                    </label>
                </span>
                <p>
                    <input type="checkbox" id="test1" v-model="nuevaTarea.prioridad" />
                    <label for="test1">
                        <i class="fa fa-bolt"></i>High Priority
                    </label>
                     <div class="select-style">
       <select v-model="nuevaTarea.usuario">
   <option v-bind="berto" selected>&#x1F42F;</option>
   <option v-bind="berta">  &#x1F437;</option>
 </select>





</div>
                </p>

                <input type="submit" value="Save Task">
            </form>
        </main>
        <footer class="footer" style=" flex-shrink: 0;">
            <a class="footer__copyright" href="http://hectororia.com">Made with
                <i class="fa fa-heart"></i> by oria_hector</a>
            <a class="footer__copyright" href="http://hectororia.com/contact.php">
                <i class="fa fa-envelope-open-o"></i> Contact me!</a>
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
    data() {
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
        agregarTarea: function () {
            tareasRef.push(this.nuevaTarea);
            this.nuevaTarea.titulo = '';
            this.nuevaTarea.url = '';
            this.nuevaTarea.completado = false;
            this.nuevaTarea.prioridad = false;
        },
        borrarTarea: function (tarea) {
            tareasRef.child(tarea['.key']).remove();
            toastr.success("Tarea eliminada");
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
    display: flex;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.7);
    height: 100%;
    width: 100%;
    align-items: center;
}

main {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
}

@import 'scss/main.scss';
</style>
