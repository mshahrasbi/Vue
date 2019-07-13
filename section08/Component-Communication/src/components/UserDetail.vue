
<template>
    <div class="component">
        <h3>You may view the User Details here</h3>
        <p>Many Details</p>
        <p>User Name: {{ name }}</p>
        <p>User Name: {{ switchName() }}</p>
        <p>User Age: {{ userAge }}</p>
        <hr>
        <button @click="resetName">Reset Name</button>
    </div>
</template>

<script>
    import { eventBus } from '../main';

    export default {
        //props: ['name'],
        props: {
            name: {
                type: String
            },
            userAge: Number
        },
        methods: {
            switchName() {
                return this.name.split("").reverse().join("");
            },

            resetName() {
                this.name = "Mohammad";
                this.$emit('nameWasReset', this.name );
            }

        },
        created() {
            eventBus.$on('ageWasEditted', (age) => {
                this.userAge = age
            });
        }
    }
</script>

<style scoped>
    div {
        background-color: lightcoral;
    }
</style>

