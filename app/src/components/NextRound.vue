<template>
    <div class="nextRound">
        <Banner :bannerTitle="`TEST ${round}`" />

        <div class="skipairs__user-title">
          <span class="skipairs__user-number">Par</span>
          <span class="skipairs__user-product">Verdi</span>
        </div>

        <div v-for="(pair, index) in nextRound" class="pair">
            <label for="product" class="skipairs__number">{{ skipairKey(pair) }}</label>
            <input ref="product" type="text" name="product" placeholder="Skriv inn resultat" v-model="resultValues[index]">
        </div>

        <!-- <RouterLink :to="{ name: 'nextRound', params: {round: `runde-${round}` } } "> -->
        <div class="inputTestError"></div>
        <button @click="goToNextRound" class="pageButton">next</button>
       <!--  </RouterLink> -->
    </div>
</template>

<script>
    import Banner from '../components/Banner.vue';

    export default {
        beforeRouteUpdate(to, from, next) {
            this.makeSkipairObjects();
            this.findWinners() 
            this.emptyInputFields();
            this.$store.dispatch('increaseRoundIndex'); 
            next()
        },

        data(){
            return {
                resultValues: [],    // results from current test
                currentRoundResult: [], // temp array for current round reuslt
                round: 2
            }
        },

        components: {
            Banner
        },

        computed: {
            nextRound() {
                return this.$store.getters.getNextRound;
            }
        },

        methods: {
            goToNextRound() {
                if (this.validationTestInput()) {
                    this.round += 1; // increase round nubmer for slug
                    this.$router.push({ name: 'nextRound', params: {round: `runde-${this.round}`} })
                } else {
                    console.log('nope');
                }
                

            },

            validationTestInput() {
                const inputField = document.querySelector('.testInputError')
                if (this.resultValues.length === 0) {
                    inputField.innerText = 'Obs, fyll inn alle felter';
                    inputField.style.display = 'block';
                    return false
                }
                inputField.style.display = 'none';
                return true
            },

            makeSkipairObjects() {
                this.resultValues.forEach((value, index) => {
                    let currentValue = parseInt(value)
                   
                    const skipairObject = {
                        _key: this.nextRound[index]._key,
                        product: this.nextRound[index].product,
                        value: currentValue,
                        result: this.nextRound[index].result += currentValue // add current value on total
                    }
                    this.currentRoundResult.push(skipairObject); 
                })

                // update current result to total result in skipairs
                this.$store.dispatch('updateTotalResults', this.currentRoundResult)
            },

            splitIntoPairs() {
                let splittetPairs = []
                if (this.currentRoundResult.length < 2) {
                    splittetPairs = this.currentRoundResult
                } else {
                    if (this.currentRoundResult.length >= 2) {
                    for (let index = 0; index <  this.currentRoundResult.length; index+=2) {
                        splittetPairs.push([this.currentRoundResult[index], this.currentRoundResult[index+1]])
                    }
                }

                return splittetPairs
                }      
            },

            findWinners() {
                const winners = []
                const splittedPairs = this.splitIntoPairs()
                
                if (splittedPairs.length <= 2 ) {
                    this.$router.push({ name: 'results', params: 'results' }) // move to results view after the last test
                    
                } else {
                        splittedPairs.forEach(pairs => {
                        const [first, second] = pairs
                        const winnerValue = Math.min(first.value, second.value);
                        const currentWinner = pairs.find(pair => pair.value === winnerValue)
                        
                        winners.push(currentWinner)
                        this.$store.dispatch('updateNextRound', winners) 
                    })
                }
                this.currentRoundResult = []; // empty array for next round     
            },
            
            emptyInputFields() {
                /* reset for next round */
                this.resultValues.forEach((field, index) => {  
                    this.resultValues[index] = '';
                })
                
                /* then remove values for next round */
                this.resultValues = []      
                this.currentRoundResult = []          
            },

            skipairKey(pair) {
                return Object.values(pair)[0]
            }
        }
    }
</script>

<style>
    .nextRound{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: var(--margin-large) 0px;
    }
</style>