<template>
    <div>
        <h1>Filters and Mixins</h1>
        <input v-model="filterText" >
        <ul>
            <li v-for="fruit in filteredFruits">{{ fruit }}</li> 
        </ul>
    </div>
</template>

<script>
    import { fruitMixins } from './fruitMixins';
    
    export default {
        mixins: [fruitMixins]
    }
</script>

<style>
</style>
