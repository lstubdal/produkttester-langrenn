<template>
  <LoadingScreen v-if="loading" />
  <div v-else :class="`tester ${tests.addedSkipairs.length === 8 ? 'tester--large' : ''}`" >
    <Header :page="'tester'" />
    <Information :test="tests" :page="'tester'" />
    <RouterView /> <!-- to render child views of tester -->

      <!-- input from tester -->
     <section v-if="$route.name === 'tester'" class="tester__skipairs">
        <Banner :bannerTitle="'TEST 1'" />

        <div class="tester__skipairs-pairs" v-for="(pairs, indexResults) in skipairs">
          <SkipairsHeadline  />
          <div v-for="(pair, index) in pairs">
            <div class="pair">
              <label class="pair__number" for="product">{{ pair._key }}</label>
              <input class="pair__product pair__product--tester" type="number" name="product" placeholder="Skriv inn resultat" v-model="skipairs[indexResults][index].currentResult"> 
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
    import NextRound from '../components/NextRound.vue';
    import Banner from '../components/Banner.vue';
    import Information from '../components/Information.vue';
    import SkipairsHeadline from '../components/SkipairsHeadline.vue';

    import sanityMixin from '../mixins/sanityMixin.js';
    import testMixin from '../mixins/testMixin.js';
    import validationMixin from '../mixins/validationMixin.js'
    import query from '../groq/currentTest.groq?raw';

    export default {
      mixins: [sanityMixin, testMixin, validationMixin],

      async created() {
        await this.sanityFetchTest(query); // fetch current test
        this.$store.dispatch('setTestId', this.tests._id) // store test id
        this.skipairs = this.splitIntoPairs(this.tests.addedSkipairs); // create skipairs testingpairs for view
      },

      data() {
        return {
          skipairs: [],
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
        nextRound() {
          if (this.validationPass(this.skipairs, 'errorTestInput')) {
            if (this.tests.addedSkipairs.length <= 2) {
                this.updateResultsStore(this.skipairs);
                this.$router.push({ name: 'results', params: 'results' }) // if only 2 skipairs tested
            } else {
                this.findWinners(this.skipairs);
                this.$store.dispatch('increaseRoundIndex')
                this.$router.push({ name: 'nextRound', params: {round: 'runde-2'} })
            }
          }
        } 
      },

      computed: {
        numberOfSkipairs() {
          return this.$store.getters.getNumberOfSkipairs;
        }
      }
    }
</script>

<style>
  .tester {
    height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: var(--main-font);
    color: var(--main-color);
    background-image: url(/images/background.png);
  }

  /* if many testing pairs */
  .tester--large {
    height: 200vh;
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