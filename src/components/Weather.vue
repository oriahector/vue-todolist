<template>
  <div class="weather">
    <img class="icon" width="20px" src="../assets/thermometer.png">
    <p class="weather__p"> {{ Math.round(weather.main.temp)}}° <sup>({{(weather.main.temp_max)}}/{{(weather.main.temp_min)}})</sup></p>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "weather",
  mounted() {
    this.cargarWeather();
  },
  data() {
    return {
      weather: []
    };
  },
  methods: {
    cargarWeather() {
      axios
        .get(
          "http://api.openweathermap.org/data/2.5/weather?q=Madrid&units=metric&APPID=4eee4d4d6afcfb5e99d35eac8120fb12"
        )
        .then(respuesta => {
          this.weather = respuesta.data;
        });
    },
  }
};
</script>
