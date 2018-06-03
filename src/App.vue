<template>
<div class="app">
     <router-view></router-view>
</div>
</template>

<script>
import todo from './components/TodoList.vue';

export default {
    components: {todo },
    data() {
        return {
             subrayado: false,
        }
    }
}
</script>

<style>
html {
    box-sizing: border-box;
}

*,
*:before,
*:after {
    box-sizing: inherit;
}

html,
body {
    width: 100%;
    margin: 0;
    padding: 0;
    user-select: none;
    justify-content: center;
    margin: 0px;
}

    .toast-success {
        background-color: #68AD8B;
        font-family: Avenir;
    }

    #toast-container {
        left: 12px;
    }

    #toast-container>div {
        box-shadow: none;
        width: 140px;
        border-radius: 10px;
        opacity: 0.5;
    }

    .app {
      display: flex;
      height: 100%;
      width:100%;
      justify-content: center;
    }

</style>
