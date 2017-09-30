<template>
  <div class="weather">
    <img class="icon" width="20px" src="../assets/thermometer.png">
    <p class="weather__p" v-for="persona in personas"> {{persona.temp}}</p>
    <p> ° </p>
    </div>
</template>



<script>
import axios from 'axios';

export default {
    name: 'weather',
     mounted() {
        this.cargarPersonas();
    },
    data() {
          return {
          personas: []

    }
    },
  methods: {

        cargarPersonas() {

             axios.get('http://api.openweathermap.org/data/2.5/weather?q=Madrid&units=metric&APPID=4eee4d4d6afcfb5e99d35eac8120fb12')
                 .then((respuesta) => {
                 this.personas = respuesta.data;
                 });
        }

    }
}

</script>
