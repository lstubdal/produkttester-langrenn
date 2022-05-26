<template>
    <div class="nextRound">
        <Banner :bannerTitle="`TEST ${round}`" />
        <div v-for="(pairs, index) in skipairs" class="nextRound__skipairs">
            <SkipairsHeadline />
            <div v-for="(pair, indexPair) in pairs">
                <div class="pair">
                    <label class="pair__number" for="product">{{ skipairKey(pair) }}</label>
                    <input class="pair__product pair__product--nextRound" type="number" name="product" placeholder="Skriv inn resultat" v-model="skipairs[index][indexPair].currentResult">
                </div>
            </div>
        </div>

        <div class="errorTestInput-nextRound"></div>
        <RouterLink :to="{ name: 'nextRound', params: {round: `runde-${round}` } } ">
            <button @click="goToNextRound" class="pageButton">NEXT</button>
        </RouterLink>
    </div>
</template>

<script>
    import Banner from '../components/Banner.vue';
    import SkipairsHeadline from '../components/SkipairsHeadline.vue';

    export default {
        created() {
            this.skipairs = this.nextRound; // for v-model
            console.log('skiapirs', this.skipairs);
        },

        data(){
            return {
                skipairs: [], 
                round: 2
            }
        },

        beforeRouteUpdate(to, from, next) {
            this.findWinners()
            this.updateResultsStore(); 
            this.$store.dispatch('increaseRoundIndex');
            this.skipairs = this.nextRound;
             
            next();
        },

        components: {
            Banner,
            SkipairsHeadline
        },

        computed: {
            nextRound() {
                return this.$store.getters.getNextRound;
            }
        },

        methods: {
            goToNextRound() {
                if (this.validationPass()) {
                    
                    // update total result rembemebr
                    //this.findWinners()
                    //this.skipairs = this.nextRound; // for v-model
                    console.log('skiapirs', this.skipairs); 
                    /* this.emptyInputFields(); */
                    
                    
                    this.round += 1; // increase round nubmer for slug


                    /* this.$router.push({ name: 'nextRound', params: {round: `runde-${this.round}`}}) */
                }  
            },

            updateResultsStore() {
                const results = []
                this.skipairs.forEach((pairs, index) => {
                    pairs.forEach((pair, indexPair) => {
                        console.log('SE HER', this.skipairs[index][indexPair])
                        this.skipairs[index][indexPair].result += this.skipairs[index][indexPair].currentResult
                        console.log('SE HER etter', this.skipairs[index][indexPair].result)

                        // 0 + 150
                        // 150 + 150

                        /* console.log('r', pair.result)
                        pair.result += pair.currentResult;
                        console.log('key', pair._key)
                        console.log('total', pair.result += pair.currentResult);
                        console.log('cr', pair.currentResult)*/
                        results.push(pair) 
                        /* delete pair.currentResult; */
                        

                    })
                })
                console.log('RESULTS!!!!', results)
                this.$store.dispatch('updateTotalResults', results);
            },

            findWinners() {
                const winners = []
                if (this.skipairs.length === 1 ) {
                    this.$router.push({ name: 'results', params: 'results' }) // move to results view after the last test
                    
                } else {
                    this.skipairs.forEach(pairs => {
                        const [first, second] = pairs
                        const winnerValue = Math.min(first.currentResult, second.currentResult);
                        const currentWinner = pairs.find(pair => pair.currentResult === winnerValue);
                        
                        winners.push(currentWinner)
                    })
                    this.$store.dispatch('updateNextRound', this.splitIntoPairs(winners)) 
                }  
            },

            splitIntoPairs(skipairArray) {
                let splittetPairs = []
                if (skipairArray.length < 2) {
                    splittetPairs = skipairArray
                } else {
                    if (skipairArray.length >= 2) {
                    for (let index = 0; index <  skipairArray.length; index+=2) {
                        splittetPairs.push([skipairArray[index], skipairArray[index+1]])
                    }
                }

                return splittetPairs
                }      
            },
            
            // move function to store?
            validationPass() {
                const inputField = document.querySelector('.errorTestInput-nextRound');
                this.skipairs.forEach(pairs => {
                    pairs.forEach(pair => {
                        if (!pair.currentResult) {
                            inputField.innerText = 'Obs, fyll inn alle feltene';
                            inputField.style.display = 'block';
                        }
                    })
                })
                inputField.style.display = 'none';
                return true
            },

            skipairKey(pair) {
                return Object.values(pair)[0]
            }
        }
    }
</script>

<style>
    .nextRound {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: var(--margin-large) 0px;
    }
    
    .nextRound__skipairs {
        margin-top: var(--margin-medium);
    }

    .pair__product--nextRound {
        width: 220px;
        color: var(--main-color);
        background-color: var(--light);
    }

    .inputTestError-nextRound {
        display: none;
    }
</style>