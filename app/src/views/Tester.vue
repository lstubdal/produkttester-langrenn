<template>
  <!-- <Header  :role="tester" /> -->
  <div v-if="loading">Henter data...</div>
  <div v-else class="tester">
    <section class="tester__information">
        <div class="tester__place">
          <img src="/icons/location.svg" alt="location tag">
          <span>{{ test.place }}</span>
        </div>

        <h2>{{ test.name }}</h2>

        <span>{{ test.temperature }} Celsius</span>
    </section>

    <section class="tester__skipairs">
      <div class="tester__skipairs-title">
        <span>Nr</span>
        <span>Verdi</span>
      </div>

      <div class="tester__input">
        <div v-for="index in test.addedSkipairs.length-1">
          <span>Nr. {{ index }}</span>
          <input type="text" placeholder="Skriv inn resultat">
        </div>

        <button @click="temporarySkipairArray">klikk klikk</button>
      </div>
    </section>
  </div>
</template>

<script>
    import Header from '../components/Header.vue';
    import viewMixin from '../mixins/viewMixin';
    import query from '../groq/newTest.groq?raw';

    export default {
      mixins: [viewMixin],

      async created() {
        await this.sanityFetchTest(query);
        console.log('added skipair:', this.test.addedSkipairs);
      },

      components: {
        Header
      },

      methods: {
        /* create temporary array of skipairs with added 'value' attribute */
        temporarySkipairArray() {
          const tempArray = []

          this.test.addedSkipairs.forEach(pair => {
            const skipair = {
              ...pair, // get everything from pair object
              value: 0 // add value attribute (for calculating result)
            }

            tempArray.push(skipair);
            console.log('temparray', tempArray);
          })
        }
      }
    }
</script>

<style>
  .tester {
    width: 100%;
  }

  .tester__header {
    display: flex;
    align-items: center;
  }

  .tester__information {
    display: flex;
    justify-content: space-between;
    padding: var(--padding-medium);
  }

  .tester__place {
    display: flex;
    align-items: center;
  }

  .tester__place span {
    padding-left: var(--padding-small);
  }

  .tester__skipairs {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .tester__skipairs-title {
    display: flex;
  }

  .tester__input {
    display: flex;
    flex-direction: column;
  }
</style>