<template>
    <div>
        <h3>Some User Details</h3>
        <p>User loaded has Id: {{ $route.params.id }}</p>

        <!-- <router-link tag="button" :to="'/user/' + $route.params.id + '/edit'" class="btn btn-primary">Edit User</router-link> or -->
        <!-- <router-link tag="button" :to="{ name: 'userEdit', params: { id: $route.params.id } }" class="btn btn-primary">Edit User</router-link> -->
        <router-link 
            tag="button" 
            :to="link" 
            class="btn btn-primary">Edit User</router-link>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                link: { 
                    name: 'userEdit', 
                    params: { 
                        id: this.$route.params.id 
                    } , 
                    query: { 
                        locale: 'en', 
                        q: 100 
                    },
                    hash: '#data' 
                }
            }
        },
        
        beforeRouteEnter(to, from, next) {
            // if user authenticated for example
            if (true) {
                next();
            } else {
                next(false);
            }            
        }
    }
</script>