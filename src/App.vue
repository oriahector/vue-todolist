<template>
<div style="width:100%;">
      <todo></todo>
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

<style></style>
