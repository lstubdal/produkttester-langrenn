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
        console.log(this.test);
      },

      data() {
        return {
          round: [],
          valueFirstRound: [],
          splittedIntoPairs: [],
          number: 0
        }
      },

      components: {
        Header
      },

      computed: {
        findNr(index) {
            let current = 0;
            this.number =  current + (2*index);
            return this.number;
          }
      
      },

      methods: {
        /* create temporary array of skipairs with added 'value' attribute */
        temporarySkipairArray() {
          const tempArray = []

          this.test.addedSkipairs.forEach((pair,index) => {
            const currentValue = parseInt(this.valueFirstRound[index]) // parse value to number
            const tempSkipair = {
              product: pair.product,
              value: currentValue, // add value attribute (for calculating result)
              result: pair.result  += currentValue // update result (difference) => update this attribute to sanity 
            }

            tempArray.push(tempSkipair);
            pair.value = 0; // reset current value after updated to array

            console.log('temparray', tempArray);
            console.log('check updated result', this.test.addedSkipairs);
          })

          return tempArray
        },

        splitIntoPairs() {
          for (let index = 0; index < this.test.addedSkipairs.length; index += 2) {
            this.splittedIntoPairs.push([this.test.addedSkipairs[index], this.test.addedSkipairs[index +1]])
            console.log(this.splittedIntoPairs)
          }
        },

        filterWinners() {
          
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