<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <app-quote>
          <h1 slot="title">{{ quoteTitle }}</h1>
          <!-- <p slot="subtitle">Hi I am subtitle<p> -->
          <p>This is another wonderful!</p>
        </app-quote>
      </div>
    </div>
  </div>
</template>

<script>
  import Quote from './components/Quote.vue';

  export default {

    data: function() {
      return {
        quoteTitle: 'The quote'
      }
    },
    components: {
      appQuote: Quote
    }
  }
</script>

<style>
</style>
