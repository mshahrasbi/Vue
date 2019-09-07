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
        }
    }
</script>

<style>
</style>
