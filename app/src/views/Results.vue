<template>
  <div class="results">
      <div class="results__headline">
          <span>Nr.</span>
          <span>Product</span>
          <span>Result</span>
      </div>

      <div class="results__result" v-for="(result, index) in results">
          <span>Nr. {{ index +1 }}</span>
          <span>{{ result.product }}</span>
          <span>{{ result.result }}</span>
      </div>

  </div>
</template>

<script>
    export default {
        created() {
            this.sortResultsASC() // best skipair first
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
  
    .results__headline, .results__result {
        width: 20%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    

</style>