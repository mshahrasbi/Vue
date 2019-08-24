<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Directives</h1>
                <h2>Built-in Directives</h2>
                <p v-text="'Hello world'"></p>
                <p v-html="'<strong>Hello world</strong>'"></p>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h2>Custom Directives</h2>
                <p v-highlight>Nothing</p>
                <p v-highlight="'red'">Adding binding</p>
                <p v-highlight:mybackground="'lightblue'">Adding binding and Argument</p>
                <p v-highlight:mybackground.delayed="'lightblue'">Adding binding, Argument and Modifier</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>

<style>

</style>
