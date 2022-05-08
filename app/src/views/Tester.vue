<template>
  <!-- <Header  :role="tester" /> -->
  <div class="tester">
    <section class="tester__information">
        <div class="tester__place">
          <img src="/icons/location.svg" alt="location tag">
          <span>{{ testData.place }}</span>
        </div>

        <h2>{{ testData.name }}</h2>

        <span>{{ testData.temperature }} Celsius</span>
    </section>
  </div>
</template>

<script>
    import Header from '../components/Header.vue';

    export default {
      created() {
        console.log('testdata', this.testData)
      },
      components: {
        Header
      },

      computed: {
        testData() {
          return this.$store.getters.getNewTestData;
        },

        /* testData() {
          return this.$store.getters.getTests;
        } */
      }
    }
</script>

<style>
  .tester__header {
    display: flex;
    align-items: center;
  }
  .tester__information {
    display: flex;
    justify-content: space-between;
  }
</style>