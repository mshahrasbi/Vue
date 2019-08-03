<template>
    <div>
        <h3>New Quote</h3>
        <button @click="counter++">Counter</button>

        <p>{{ counter }}</p>
    </div>   
</template>

<script>
    export default {
        data: function() {
            return {
                counter: 0
            };
        },
        destroyed() {
            console.log("[New Component] destroied!")
        }
    }
</script>

<style>

</style>
