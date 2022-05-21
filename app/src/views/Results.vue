<template>
  <div class="results">
      <Banner :bannerTitle="'RESULTATER'" />
      <div class="results__headline">
          <span class="results__headline-text ">Nr.</span>
          <span class="results__headline-text results__headline-text--large">Product</span>
          <span class="results__headline-text ">Result</span>
      </div>

      <div class="results__result" v-for="(result, index) in results">
          <span class="results__result-text">{{ index +1 }}</span>
          <span class="results__result-text results__result-text--large">{{ result.product }}</span>
          <span class="results__result-text">{{ result.result }}</span>
      </div>

      <button class="pageButton pageButton--results">Lagre test</button>
  </div>
</template>

<script>
    import Banner from '../components/Banner.vue';

    export default {
        async created() {
            this.sortResultsASC(); // winner skipair first
        },

        components: {
            Banner
        },

        computed: {
            results(){
                return this.$store.getters.getTotalResults;
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
    }

    .pageButton--results {
        margin: var(--margin-large);
    }

</style>