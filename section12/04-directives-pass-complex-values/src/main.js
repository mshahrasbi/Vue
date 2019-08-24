import Vue from 'vue'
import App from './App.vue'

Vue.directive('highlight', {
  bind(el, binding, vnode) {
    
    var delay = 0;
    if (binding.modifiers['delayed']) {
      delay = 3000;
    }

    el.style.color = 'white';

    if (!binding.value) {
      el.style.backgroundColor = 'green';
    } else if (delay == 0) {
      if (binding.arg == 'mybackground') {
        el.style.backgroundColor = binding.value;
      } else {
        el.style.backgroundColor = binding.value;
      }
    } else if (delay >= 0) {
      el.style.color = 'black';
      setTimeout( () => {
          el.style.backgroundColor = binding.value;
      }, delay);
    }
  }
});

new Vue({
  el: '#app',
  render: h => h(App)
})
