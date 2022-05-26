<template>
  <LoadingScreen v-if="loading" />
  <div v-else class="tester">
    <Header  :page="'tester'" />
    <Information :test="test" :page="'tester'" />
    
    <RouterView /> <!-- to render child views of tester -->

      <!-- tester input -->
     <section v-if="$route.name === 'tester'" class="tester__skipairs">
        <Banner :bannerTitle="'TEST 1'" />

        <div class="tester__skipairs-pairs" v-for="(pairs, indexResults) in splittedSkipairs">
          <SkipairsHeadline  />
          <div v-for="(pair, index) in pairs">
            <div class="pair">
              <label class="pair__number" for="product">{{ pair._key }}</label>
              <input class="pair__product pair__product--tester" type="number" name="product" placeholder="Skriv inn resultat" v-model="splittedSkipairs[indexResults][index].currentResult"> 
            </div>
          </div> 
        </div>
        <div class="inputError errorTestInput"></div>
        <button @click="nextRound" class="pageButton">NEXT</button>
    </section>
  </div>
</template>

<script>
    import Header from '../components/Header.vue';
    import LoadingScreen from '../components/LoadingScreen.vue';
    import viewMixin from '../mixins/viewMixin';
    import query from '../groq/currentTest.groq?raw';
    import NextRound from '../components/NextRound.vue';
    import Banner from '../components/Banner.vue';
    import Information from '../components/Information.vue';
    import SkipairsHeadline from '../components/SkipairsHeadline.vue';

    export default {
      mixins: [viewMixin],

      async created() {
       await this.sanityFetchTest(query); // fetch current test
       this.$store.dispatch('setTestId', this.test._id)
       this.splittedSkipairs = this.splitIntoPairs(this.test.addedSkipairs);
      },

      data() {
        return {
          splittedSkipairs: [],
          round: 0,
        }
      },

      components: {
        Header,
        NextRound,
        Banner,
        Information,
        LoadingScreen,
        SkipairsHeadline
      },

      methods: {
        splitIntoPairs(tempArray) {
          const splittedIntoPairs = []
          if (tempArray) { // Add: if tempArray.length >= 2 check
            for (let index = 0; index < tempArray.length; index += 2) {
            splittedIntoPairs.push([tempArray[index], tempArray[index +1]])
            }
            return splittedIntoPairs;
          }
        },

        validationPass() {
          const inputField = document.querySelector('.errorTestInput')
          this.splittedSkipairs.forEach(pairs => {
            pairs.forEach(pair => {
              if (!pair.currentResult) {
                inputField.innerText = 'Obs, fyll inn alle feltene';
                inputField.style.display = 'block';
                return false
              } 
            })
          })
          inputField.style.display = 'none';
          return true
          
        },

        updateResultsStore() {
          const results = []
          this.splittedSkipairs.forEach(pairs => {
              pairs.forEach(pair => {
                pair.result = pair.currentResult // update current result to total result
                delete pair.currentResult // remove currentValue attr. for next round (clear inputfields)
                results.push(pair)
              })
            })

            this.$store.dispatch('updateTotalResults', results);
        },
      

        findWinners() {        
          const currentWinners = []
            this.splittedSkipairs.forEach(pairs => {
              const [first, second] = pairs // crate pair variable
              const winnerValue = Math.min(first.currentResult, second.currentResult); // compare first and second to fnd lowest value aka winner
              const currentWinner = pairs.find(skipair => skipair.currentResult === winnerValue);

              currentWinners.push(currentWinner)  // add currentWinner to array
            })
            
            this.updateResultsStore();
            this.$store.dispatch('updateNextRound', this.splitIntoPairs(currentWinners)); // save winners from current round in store to access to next round, and split into pairs
        },

        nextRound() {
          if (this.validationPass()) {
            if (this.test.addedSkipairs.length <= 2) {

              this.$router.push({ name: 'results', params: 'results' }) // if only 2 skipairs tested
            } else {
              this.findWinners();
              this.$store.dispatch('increaseRoundIndex')
              this.$router.push({ name: 'nextRound', params: {round: 'runde-2'} })
            }
          }
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

  .tester__skipairs-pairs {
    display: flex;
    flex-direction: column;
    margin-top: var(--margin-medium);
  }
  .pair__product--tester {
        width: 220px;
        color: var(--main-color);
        background-color: var(--light);
    }

  .errorTestInput{
    display: none;
  }
</style>