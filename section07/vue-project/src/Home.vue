
<template>
    <div>
        <app-server-status v-for='server in 5'></app-server-status>
    </div>
</template>

<script>
    import ServerStatus from './ServerStatus.vue';

    export default {
        // register a component locally
          components: {
              'app-server-status': ServerStatus  
          }
    }
</script>



