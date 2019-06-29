
<template>
    <div>
        <p>Server status: {{ status  }} </p>
        <hr>
        <button @click="changeStatus">Change Status</button>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                status: 'critical'
            };
        },
        methods: {
            changeStatus() {
                if (this.status === 'normal') {
                    this.status = 'criticla'
                } else {
                    this.status = 'normal'
                }
            }
        }
    }
</script>

