<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Filters and Mixins</h1>
                <input v-model="filterText" >
                <ul>
                    <li v-for="fruit in filteredFruits">{{ fruit }}</li> 
                </ul>
                <hr>
                <app-list></app-list>
            </div>
        </div>
    </div>
</template>

<script>
    import List from './List.vue';
    import { fruitMixins } from './fruitMixins';

    export default {
        mixins: [fruitMixins],

        data() {
            return {
                test: ''
            }
        }
        ,
        components: {
            appList: List
        }
    }
</script>

<style>
</style>
