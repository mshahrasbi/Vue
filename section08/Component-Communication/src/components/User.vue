
<template>
    <div class="component">
        <h3>The User Component</h3>
        <p>I'm an awesome User!</p>
        <button @click="changeName">Change My Name</button>
        <p>Name is {{ name }}</p>
        <p>Age is {{ age }}</p>
        <hr>
        <div class="row">
            <div class="col-xs-12 col-sm-6">
                <app-user-detail 
                    v-bind:name="name" 
                    @nameWasReset="name=$event"
                    :userAge="age"></app-user-detail>
            </div>
            <div class="col-xs-12 col-sm-6">
                <app-user-edit 
                    :userAge="age"
                    @ageWasEditted="age=$event"></app-user-edit>
            </div>
        </div>
    </div>
</template>

<script>

import UserDetail from './UserDetail.vue';
import UserEdit from './UserEdit.vue';

export default {
    data: function() {
        return {
            name: 'Mohammad',
            age: 27
        };
    },
    components: {
        appUserDetail: UserDetail,
        appUserEdit: UserEdit
    },
    methods: {
        changeName() {
            this.name = 'Mahrou';
        }
    }    
}
</script>

<style scoped>
    div {
        background-color: lightblue;
    }
</style>
