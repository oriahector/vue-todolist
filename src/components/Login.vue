<template>
<div class="login">
 <div class="login__form">
    <h1>Login Todo List</h1>
    <form @submit.prevent="login">
      <input v-model="usuario" type="text" placeholder="User">
      <input v-model="contrasena" type="password" placeholder="Contraseña">
      <input type="submit" placeholder="Acceso">
    </form>
  </div>
</div>

</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      usuario: "",
      contrasena: ""
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.usuario, this.contrasena)
        .then(user => this.$router.replace('todo'), error => console.error(error));
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';

.login {
  width:100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background: linear-gradient(0deg, $greengradient1, $greengradient2);
  h1 {
    color: $white;
  }
  &__form {
    width: 70%;
  }
}
</style>
