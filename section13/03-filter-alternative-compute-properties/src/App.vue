<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Filters and Mixins</h1>

                <p>{{ text }}</p>
                <p>{{ text | toUppercase }}</p>
                <p>{{ text | toUppercase | to-lowercase }}</p>
                <hr>
                <ul>
                    <li v-for="fruit in fruits">{{ fruit }}</li> 
                </ul>
                <hr>
                <input v-model="filterText" >
                <ul>
                    <li v-for="fruit in filteredFruits">{{ fruit }}</li> 
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                text: 'Hello there',
                fruits: ['Apple', 'Banana', 'Mango', 'Melon'],
				filterText: ''
            }
        },
        filters: {
            toUppercase(value) {
                // it gets the value automatically because we add it here
                // with the pipe symbol and that will Vuejs to take the piece
                // in front of the pipe and put it or pass it as a value to
                // this function
                return value.toUpperCase();
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
