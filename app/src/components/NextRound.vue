<template>
    <div class="nextRound">
        <Banner :bannerTitle="`TEST ${round}`" />

        <div class="skipairs__user-title">
          <span class="skipairs__user-number">Nr. </span>
          <span class="skipairs__user-product">Verdi</span>
        </div>

        <div v-for="(pair, index) in nextRound" class="pair">
            <label for="product" class="skipairs__number">{{ index +1 }}</label>
            <input ref="product" type="text" name="product" placeholder="Skriv inn resultat" v-model="inputValues[index]">
        </div>

        <RouterLink :to="{ name: 'nesteRunde', params: {runde: `runde-${round}` } } ">
            <button @click="goToNextRound" class="pageButton">next</button>
        </RouterLink>
    </div>
</template>

<script>
    import Banner from '../components/Banner.vue';

    export default {
        beforeRouteUpdate(to, from, next) {
            this.makeSkipairObjects();
            this.findWinners() 
            this.emptyInputFields();
            this.$store.dispatch('increaseRoundCount'); 
            next()
        },

        data(){
            return {
                inputValues: [],
                currentRoundResult: [],
                round: 2
            }
        },

        components: {
            Banner
        },

        computed: {
            nextRound() {
                return this.$store.getters.getNextRound;
            }, 
        },

        methods: {
            goToNextRound() {
                this.round += 1; // increase round nubmer for slug

            },

            updateResultToStore() {

            },

            makeSkipairObjects() {
                this.inputValues.forEach((value, index) => {
                    let valueNumber = parseInt(value)
                   
                    const tempSkipair = {
                        _key: this.nextRound[index]._key,
                        product: this.nextRound[index].product,
                        value: valueNumber,
                        result: this.nextRound[index].result += valueNumber
                    }

                    this.currentRoundResult.push(tempSkipair); 
                    console.log('current round index: ', this.currentRoundResult)
                })
            },

            splitIntoPairs() {
                const splittetPairs = []
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
                const loosers = []
                const splitted = this.splitIntoPairs()

                /* last test  */
                if (splitted.length < 2 ) {
                    console.log('ikke nok par igjen') 
                    this.$router.push({ name: 'results', params: 'results' }) // move to results view
                    
                } else {
                        splitted.forEach(pairs => {
                        const [first, second] = pairs
                        const winnerValue = Math.min(first.value, second.value);
                        const currentWinner = pairs.find(pair => pair.value === winnerValue)
                        winners.push(currentWinner)
                        console.log('wiiners', winners)

                        const looserValue = Math.max(first.value, second.value)
                        const currentLooser = pairs.find(pair => pair.value === looserValue)
                        loosers.push(currentLooser);
                        console.log('loosers', loosers);
                    })

                    this.$store.dispatch('updateNextRound', loosers); // only update looser values because winnervalue is always 0
                }

                // find key to winners
                // current result += result in store
                this.$store.dispatch('updateTotalResults', loosers); 
                this.currentRoundResult = []; // empty array for next round     
            },
            
            emptyInputFields() {
                /* reset for next round */
                this.inputValues.forEach((field, index) => {  
                    this.inputValues[index] = '';
                })
                
                /* then remove values for next round */
                this.inputValues = []                
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