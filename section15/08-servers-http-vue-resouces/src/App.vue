<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Http</h1>

                <div class="form-group">
                    <label>Username</label>
                    <input type="text" class="form-control" v-model='user.username'>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="text" class="form-control" v-model='user.email'>
                </div>
                <button class="btn btn-primary" @click="submit">Submit</button>
                <hr>
                <button class="btn btn-primary" @click='fetchData'>Get Data</button>
                <br><br>
                <ul class="list-group">
                    <li class="list-group-item" v-for="(u, index) in users" :key="index"> {{ u.username }} - {{ u.email }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return { 
                user: {
                    username: '',
                    email: ''
                },
                users: [],
                resource: []
            }
        },
        methods: {
            submit() {
                console.log(this.user);
                // this.$http
                //     .post('data.json', this.user )
                //     .then( response => {
                //         console.log(response);
                //     },
                //     error => {
                //         console.log(error);
                //     });

                this.resource.save({}, this.user);
            },
            fetchData() {
                this.$http
                    .get('data.json')
                    .then( response => {
                        return response.json(); // this response is promise method and it is not done yet, so we have to do another then method
                    })
                    .then(data => {
                        console.log(data);

                        const resultArray = [];
                        for (let key in data) {
                            resultArray.push(data[key]);
                        }
                        this.users = resultArray;
                    });
            }
        },

        created() {
            this.resource = this.$resource('data.json');
        }
    }
</script>

<style>
</style>
