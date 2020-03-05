<template>
    <div class="col-sm-6 col-md-4">
        <div class="panel panel-info">
            <div class="panel-heading">
                <h3 class="panel-title">
                    {{ stock.name }}
                    <small>(Price: {{ stock.price }} | Quantity: {{ stock.quantity }})</small>
                </h3>
            </div>
            <div class="panel-body">
                <div class="pull-left">
                    <input type="number" class="form-control" placeholder="Quantity" v-model="quantity" :class="{ danger: insufficientQuantity }">
                </div>
                <div class="panel-right">
                    <button 
                        class="btn btn-success" 
                        @click="sellStock"
                        :disabled="insufficientQuantity || quantity <= 0  || !Number.isInteger(+quantity) ">{{ insufficientQuantity ? 'Insufficient Quantity' : 'Sell' }}</button>        
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        props: ['stock'],

        data() {
            return {
                quantity: 0
            }
        },
        computed: {
            insufficientQuantity() {
                return this.quantity > this.stock.quantity;
            }
        },
        methods: {
            // this is anotherway importing sellStock by using mapActions from Vuex, since we only have one action here
            // that is a bit too much work, and you could directly dispatch it, but anyway I will use the 3 dots to then
            // call maoActions and distribute all the properties this is going to create forus and then I will pass an
            // array and I will simply inport sellStock, this now gives me acess to this sell stock here. 
            ...mapActions({ placeSellOrder: 'sellStock'}),

            sellStock() {
                const order = {
                    stockId: this.stock.id,
                    stockPrice: this.stock.price,
                    quantity: this.quantity
                };
                this.placeSellOrder(order);
                this.quantity = 0;
            }
        }
    }
</script>

<style scoped>
    .danger {
        border: 1px solid red;
    }
</style>
