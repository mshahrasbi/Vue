<template>
  <div class='container'> 
    <div class='row'>
      <div class='col-xs-12 col-sm-8 col-sm-offser-2 col-md-6 col-md-offset-3'>
        <h1>Animations</h1>

        <hr>

        <select v-model="alertAnimation" class='form-control'>
          <option value='fade'>Fade</option>
          <option value='slide'>Slide</option>
        </select>

        <hr>

        <button class="btn btn-primary" @click="show = !show">Show Alert</button>
        <br></br>

        <transition :name="alertAnimation" >
          <div class="alert alert-info" v-if="show">This is some Info</div>
        </transition>
        <hr>
        <transition name="slide" type="animation" appear>
          <div class="alert alert-info" v-if="show">This is some Info</div>
        </transition>
        <hr>
        <transition 
            enter-active-class="animated bounce"
            leave-active-class="animated shake" >
          <div class="alert alert-info" v-if="show">This is some Info</div>
        </transition>

        <hr>
        <transition :name="alertAnimation" mode="out-in">
          <div class="alert alert-info" v-if="show" key="info">This is some Info</div>
          <div class="alert alert-warning" v-else key="warning">This is some warning</div>
        </transition>

        <hr>
        
        <button class="btn btn-primary" @click="load = !load">Load / Remove Element</button>
        <br><br>
        <transition
          @before-enter="beforeEnter"
          @enter="enter"
          @after-enter="afterEnter"
          @enter-cancelled="enterCancelled"
          
          @before-leave="beforeLeave"
          @leave="leave"
          @after-leave="afterLeave"
          @leave-cancelled="leaveCancelled"
          :css="false"> 

          <!--
            we are not using css in transition tag, we are doing everything through JS which is why we need to call
            the done function. now if we dont use css, we might also tell vuejs, we dont get an error if we dont tell 
            it but if we do tell it, it can skip the step of determining whether we do have a css animation attached
            or not, because keep in mind, if we dont have name setup, that doesn't mean it doesn't look for css classes
            to attach, it means it looks to attach v-enter, v0enter-active and so on, and it will find that these 
            classes don't exist but we can skip this checking if we know well we won't attach one because we don't
            want to use them here, so we can tell it by adding :css="false"
            we use : here because we want to pass boolean here not string. 
            so by passing false here it means don't look for css classes, we don't use them, so we can take over with 
            javascript 
          -->

          <div style="height: 100px; width: 300px; background-color: lightgreen;" v-if="load"></div>
        </transition>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        load: true,
        alertAnimation: 'fade',
        elementWidth: 100
      }
    },
    methods: {
      beforeEnter(el) {
        console.log("[beforeEnter]");
        this.elementWidth = 100;
        el.style.width = this.elementWidth + 'px';
      },
      enter(el, done) {
        console.log('[enter]');

        let round = 1;

        const interval = setInterval(() => {
          el.style.width = (this.elementWidth + (round * 10)) + 'px';
          round++;
          if (round > 20) {
            clearInterval(interval);
            done();
          }
        }, 20);


        // done(); // done is needed to tell vuejs once this animation finishes, when using 
                // css animations, it can determine this from the timing we setup on the 
                // transition or the animation property. but when we using js, we have no 
                // such timing
      },
      afterEnter(el) {
        console.log('[afterEnter]');
      },
      enterCancelled(el) {
        console.log('[enterCancelled]');
      },

      beforeLeave(el) {
        console.log('[beforeLeave]');
        this.elementWidth = 300
        el.style.width = this.elementWidth + 'px';
      },
      leave(el, done) {
        console.log('[leave]');

        let round = 1;

        const interval = setInterval(() => {
          el.style.width = (this.elementWidth - (round * 10)) + 'px';
          round++;
          if (round > 20) {
            clearInterval(interval);
            done();
          }
        }, 20);

      },
      afterLeave(el) {
        console.log('[afterLeave]');
      },
      leaveCancelled(el) {
        console.log('[leaveCancelled]');
      }
    }
  }
</script>

<style>
  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    transition: opacity 1s;
  }

  .fade-leave {
    /* opacity: 1; */

  }

  .fade-leave-active {
    transition: opacity 1s;
    opacity: 0;
  }

  .slide-enter {
    opacity: 0;
  }

  .slide-enter-active {
    animation: slide-in 1s ease-out forwards;
    transition: opacity 0.5s;
  }

  .slide-leave {

  }

  .slide-leave-active {
    animation: slide-out 1s ease-out forwards;
    transition: opacity 1s;
    opacity: 0;
  }

  @keyframes slide-in {
    from {
      transform: translateY(20px);
    }
    to {
      transform: translateY(0px);
    }
  }

  @keyframes slide-out {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(20px);
    }
  }
</style>
