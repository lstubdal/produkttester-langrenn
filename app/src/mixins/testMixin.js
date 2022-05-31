// mixin for methods used in Tester.vue and NextRound.vue
export default {
    methods: {
        splitIntoPairs(skiArray) {
            let splittedIntoTestPairs = []
            if (skiArray) {
                if (skiArray.length < 2) {  // when last test
                    splittedIntoTestPairs = skiArray;
                } else {
                    for (let index = 0; index < skiArray.length; index += 2) { // skip index with 2 to create pairs
                        splittedIntoTestPairs.push([skiArray[index], skiArray[index +1]])
                    }
                }
            }
            return splittedIntoTestPairs;
        },

        findWinners(skiArray) {
            const currentWinners = []
            if (skiArray.length === 1) {
                this.$router.push({ name: 'results', params: 'results' }) // go to results after last round or if only 2 pairs tested
            } else {
                skiArray.forEach(pairs => {
                    const [first, second] = pairs // crate pair variable
                    const winnerValue = Math.min(first.currentResult, second.currentResult); // compare first and second to fnd lowest value aka winner
                    const currentWinner = pairs.find(skipair => skipair.currentResult === winnerValue);
    
                    currentWinners.push(currentWinner)  // add currentWinner to array
                })
            }

            this.updateResultsStore(skiArray);
            this.$store.dispatch('updateNextRound', this.splitIntoPairs(currentWinners)); // save winners from current round in store to access to next round, and split into pairs          
        },

        updateResultsStore(skiArray) {
            const results = []
            skiArray.forEach(pairs => {
                pairs.forEach(pair => {
                  pair.result = pair.currentResult // update current result to total result
                  delete pair.currentResult // remove currentValue attr. for next round (clear inputfields)
                  results.push(pair)
                })
              })
            this.$store.dispatch('updateTotalResults', results);
        }
    }
}
