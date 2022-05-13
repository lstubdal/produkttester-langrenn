<template>
    <div class="nextRound">
        <div v-for="(pair, index) in nextRound">
            <label for="product">Nr. {{ index +1 }}</label>
            <div>KEY: {{ pair._key }}</div>
            <input ref="product" type="text" name="product" placeholder="Skriv inn resultat" v-model="inputValues[index]">
        </div>

        <RouterLink :to="{ name: 'nesteRunde', params: {runde: `runde-${round}` } } ">
            <button @click="goToNextRound">next</button>
        </RouterLink>

    </div>
</template>

<script>
    export default {
        created() {
            /* console.log(this.nextRound); */
        },
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
                round: 0
            }
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

            makeSkipairObjects() {
                console.log('input values length runde: ', this.round,'-', this.inputValues.length);
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

            // after find winner: this.$store.dispatch('updateNextRound', this.currentRoundResult); //
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
                    })
                    this.$store.dispatch('updateNextRound', winners);
                }
                this.currentRoundResult = []; // empty array for next round     
            },
            
            emptyInputFields() {
                /* reset for next round */
                this.inputValues.forEach((field, index) => {  
                    this.inputValues[index] = '';
                })
                
                console.log('inputvalues reset', this.inputValues)
                /* then remove values for next round */
                this.inputValues = []
                console.log('inputvalues empty', this.inputValues)
                
            }
        }
    }
</script>

<style>
    .nextRound{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>