<template>
    <div>
        <p>Counter is: {{ doubleCounter }}</p>
        <p>Number of Clickes: {{ stringCounter }}</p>
    </div>
</template>

<script>

    import { mapGetters } from 'vuex';

    export default {
        //props: ['counter']
        computed: {
            ...mapGetters([
                'doubleCounter',
                'stringCounter'
            ]),
            ourOwnComputedProperty() {

            }
        }
    }
</script>