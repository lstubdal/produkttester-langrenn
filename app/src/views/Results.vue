<template>
  <div class="results">
      <Banner :bannerTitle="'RESULTATER'" />
      <div class="results__headline">
          <span class="results__headline-text ">Par</span>
          <span class="results__headline-text results__headline-text--large">Product</span>
          <span class="results__headline-text ">Result</span>
      </div>

      <div class="results__result" v-for="(result, index) in results">
          <span class="results__result-text">{{ result._key }}</span>
          <span class="results__result-text results__result-text--large">{{ result.product }}</span>
          <span class="results__result-text">{{ result.result }}</span>
      </div>

      <button class="pageButton pageButton--results" @click="updateResultsSanity">Lagre test</button>
  </div>
</template>

<script>
    import Banner from '../components/Banner.vue';
    import viewMixin from '../mixins/viewMixin';
    import query from '../groq/currentTest.groq?raw';

    export default {
        mixins: [viewMixin],

        async created() {
            if (this.results) {
                this.sortResultsASC(); // winner skipair first
            } 
            await this.sanityFetchTest(query); // fetch current test
        },

        components: {
            Banner
        },

        computed: {
            results(){
                return this.$store.getters.getTotalResults;
            },

            testId() {
                return this.$store.getters.getTestId;
            }
        },

        methods: {
            sortResultsASC() {
                const asc = 1
                const compare = (current, next) => {
                    if (current.result > next.result) {
                        return 1
                    } else if (current.result < next.result) {
                        return -1
                    } else {
                        return 0
                    }
                }
                return this.results.sort((current, next) => compare(current, next) * asc)
            },

            resultsArrayToSanity() {
                // remove 'current value' attribute in skipairs when updating to sanity
                const resultsToSanity = []
                this.results.forEach(pair => {
                    const sanityPair = {
                        _key: pair._key,
                        product: pair.product,
                        result: pair.result
                    }
                    resultsToSanity.push(sanityPair);
                })
                return resultsToSanity; // send results in sorted order
            },

            updateResultsSanity() {
                this.createOrUpdateTest(
                    this.testId,
                    this.test.name,
                    this.test.place,
                    this.test.date,
                    this.test.temperature,
                    this.test.snowdata,
                    this.test.numberOfPairs,
                    this.resultsArrayToSanity(), 
                    this.test.slug.current
                );
            }
        }
    }
</script>

<style>
    .results {
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: var(--main-font);
    }

    .results__headline-text, .results__result-text {
        font-size: 1.5em;
        color: var(--light);
        background-color: var(--main-color);
        border-radius: 4px;
        padding: 5px var(--padding-medium);
        margin: 0px var(--margin-small)
    }

    .results__headline {
        margin: var(--margin-large) 0% var(--margin-medium) 0%;
    }

    .results__headline-text--large {
        padding: 5px var(--padding-large);
    }

    .results__result-text--large {
        min-width: 110px;
        padding: 5px var(--padding-xlarge)
    }

    .results__headline, .results__result {
        width: 30%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .results__result-text {
        color: var(--main-color);
        background-color: var(--light);
        margin: 0.5% 0%;
        min-width: 80px;
        text-align: center;
    }

    .pageButton--results {
        margin: var(--margin-large);
    }

</style>