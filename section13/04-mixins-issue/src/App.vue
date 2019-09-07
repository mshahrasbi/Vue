<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Filters and Mixins</h1>
                <input v-model="filterText" >
                <ul>
                    <li v-for="fruit in filteredFruits">{{ fruit }}</li> 
                </ul>
                <app-list></app-list>
            </div>
        </div>
    </div>
</template>

<script>
    import List from './List.vue';

    export default {
        data() {
            return {
                fruits: ['Apple', 'Banana', 'Mango', 'Melon'],
                filterText: ''
            }
        },
        computed: {
            filteredFruits() {
                
                return this.fruits.filter( (element) => {
                    
                    return element.match(this.filterText);
                });
            }
        },
        components: {
            appList: List
        }
    }
</script>

<style>
</style>
