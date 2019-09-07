export const fruitMixins = {
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
    created() {
        console.log('Mixin created!');
    }
};