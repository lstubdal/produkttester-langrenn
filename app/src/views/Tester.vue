<template>
  <Header  :role="'tester'" />
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
    <RouterView />

      <!-- to render nested views -->
      <!-- tester input -->
     <section v-if="$route.name === 'tester'" class="tester__skipairs">
       <h3>TESTING</h3>
      <div class="tester__skipairs-title">
        <span>Nr. </span>
        <span>Verdi</span>
      </div>

        <!-- MAKE comp. -->
       <div v-for="index in test.numberOfPairs">
          <label for="product">Nr. {{ index }}</label>
          <input type="text" name="product" placeholder="Skriv inn resultat" v-model="valueFirstRound[index-1]">
      </div>

      <RouterLink :to="{ name: 'nesteRunde', params: {runde: 'neste-runde' } }" @click="nextRound">create temp array</RouterLink>
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
        await this.sanityFetchTest(query); // fetch new test
        console.log('router', this.$route.name)
      },

      data() {
        return {
          valueFirstRound: [],
        }
      },

      components: {
        Header
      },

      methods: {
        /* create temporary array of skipairs with added 'value' attribute */
        temporaryArray() {
          const tempArray = []

          this.test.addedSkipairs.forEach((pair, index) => {
            const currentValue = parseInt(this.valueFirstRound[index]) // parse value to number
            
            const tempSkipair = {
              _key: pair._key,
              product: pair.product,
              value: currentValue, // add value attribute (for calculating result)
              result: pair.result  += currentValue // update result (difference) => update this attribute to sanity 
            }
            tempArray.push(tempSkipair);
            pair.value = 0; // reset current value after updated to array
          })  
          return tempArray;
        },

        splitIntoPairs(tempArray) {
          const splittedIntoPairs = []
          if (tempArray) {
            for (let index = 0; index < tempArray.length; index += 2) {
            splittedIntoPairs.push([tempArray[index], tempArray[index +1]])
            console.log('SPLITTED into pairs', splittedIntoPairs)
            }
            return splittedIntoPairs;
          }
        },

        nextRound() {
          const testedPairs =  this.splitIntoPairs(this.temporaryArray()) // split tempArray into tested pairs to compare and find winners
          console.log('splittet testpairs', testedPairs); 
          const nextRound = []

          testedPairs.forEach(pairs => {
            const [first, second] = pairs // crate pair variable
            const winnerValue = Math.min(first.value, second.value); // compare first and second to fnd lowest value aka winner
            const currentWinner = pairs.find(skipair => skipair.value === winnerValue);
      
            nextRound.push(currentWinner)         
          })

          this.$store.dispatch('updateNextRound', nextRound); // save rounds in store to access to next round
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