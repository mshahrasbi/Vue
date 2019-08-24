<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Directives</h1>
                <h2>Built-in Directives</h2>
                <p v-text="'Hello world'"></p>
                <p v-html="'<strong>Hello world</strong>'"></p>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h2>Custom Directives</h2>
                <p v-highlight>Nothing</p>
                <p v-highlight="'red'">Adding binding</p>
                <p v-highlight:mybackground="'lightblue'">Adding binding and Argument</p>
                <p v-highlight:mybackground.delayed="'lightblue'">Adding binding, Argument and Modifier</p>
                <hr>
                <h2>Directive Locally</h2>
                <p v-local-highlight:background.delayed="'lightblue'">Adding binding, Argument and Modifier delay</p>
                <p v-local-highlight:background.delayed.blink="'lightblue'">Adding binding, Argument and Multiple Modifiers delay and blink</p>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        directives: {
            'local-highlight': {
                bind(el, binding, vnode) {
                    var delay = 0;
                    if (binding.modifiers['delayed']) {
                        delay = 3000;
                    }

                    if (binding.modifiers['blink']) {
                        let mainColor = binding.value;
                        let secondColor = 'green';
                        let currentColor = mainColor;

                        setTimeout( () => {
                            setInterval(() => {
                                if (currentColor == secondColor) {
                                    currentColor = mainColor;
                                } else {
                                    currentColor = secondColor;
                                }

                                if (binding.arg == 'background') {
                                    el.style.backgroundColor = currentColor;
                                } else {
                                    el.style.color = currentColor;
                                }

                            }, 1000);
                            
                        }, delay);

                    } else {
                        setTimeout( () => {
                            if (binding.arg == 'background') {
                                el.style.backgroundColor = binding.value;
                            } else {
                                el.style.color = binding.value;
                            }
                        }, delay);
                    }

                }
            }
        }
    }
</script>

<style>

</style>
