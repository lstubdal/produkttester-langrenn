<template>
  <LoadingScreen v-if="loading" />
  <div v-else class="tester">
    <Header  :page="'tester'" />
    <Information :test="test" :page="'tester'" />
    
    <RouterView /> <!-- to render child views of tester -->

      <!-- tester input -->
     <section v-if="$route.name === 'tester'" class="tester__skipairs">
        <Banner :bannerTitle="'TEST'" />
        
        <!-- make comp -->
        <div class="skipairs__user-title">
          <span class="skipairs__user-number">Nr. </span>
          <span class="skipairs__user-product">Verdi</span>
        </div>

        <div class="pair" v-for="(pair, index) in test.addedSkipairs">
            <label for="product">{{ pair._key }}</label>
            <input type="text" name="product" placeholder="Skriv inn resultat" v-model="valueFirstRound[index]">
        </div>

      <RouterLink :to="{ name: 'nesteRunde', params: {runde: 'runde' } }" @click="nextRound">
        <button class="pageButton">NEXT</button>
      </RouterLink>
    </section>
  </div>
</template>

<script>
    import Header from '../components/Header.vue';
    import LoadingScreen from '../components/LoadingScreen.vue';
    import viewMixin from '../mixins/viewMixin';
    import query from '../groq/newTest.groq?raw';
    import NextRound from '../components/NextRound.vue';
    import Banner from '../components/Banner.vue';
    import Information from '../components/Information.vue'

    export default {
      mixins: [viewMixin],

      async created() {
       await this.sanityFetchTest(query); // fetch new test
      },

      data() {
        return {
          valueFirstRound: [],
          round: 0,
        }
      },

      components: {
        Header,
        NextRound,
        Banner,
        Information,
        LoadingScreen
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
            /* pair.value = 0; */ // reset current value after updated to array
          }) 

          this.$store.dispatch('updateTotalResults', tempArray)
          return tempArray;
        },

        splitIntoPairs(tempArray) {
          const splittedIntoPairs = []
          if (tempArray) { // Add: if tempArray.length >= 2 check
            for (let index = 0; index < tempArray.length; index += 2) {
            splittedIntoPairs.push([tempArray[index], tempArray[index +1]])
            }
            return splittedIntoPairs;
          }
        },

        nextRound() {
          const testedPairs =  this.splitIntoPairs(this.temporaryArray()) // split tempArray into tested pairs to compare and find winners
          const currentWinners = []

          testedPairs.forEach(pairs => {
            const [first, second] = pairs // crate pair variable
            const winnerValue = Math.min(first.value, second.value); // compare first and second to fnd lowest value aka winner
            const currentWinner = pairs.find(skipair => skipair.value === winnerValue);
      
            currentWinners.push(currentWinner)
            console.log('current winenrs reuslt', currentWinners);
          })

          this.$store.dispatch('updateNextRound', currentWinners); // save rounds in store to access to next round
        }
      }
    }
</script>

<style>
  .tester {
    display: flex;
    flex-direction: column;
    font-family: var(--main-font);
    color: var(--main-color);
    background-image: url(/images/background.png);
    padding-bottom: var(--padding-large);
  }

  .tester__header {
    display: flex;
    align-items: center;
  }

  .tester__skipairs {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .tester__input {
    display: flex;
    flex-direction: column;
  }
</style>