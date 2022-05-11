<template>
    <!-- <Routerview /> -->
<!--     <div v-if="`${this.$route.name}-${number}` === 'nesteRunde-1'">hei</div>

    <div v-if="`${this.$route.name}-${number}` === 'nesteRunde-2'">hei2</div> -->

    <div class="nextRound">
        <div v-for="(pair, index) in nextRound">
        <label for="product">Nr. {{ index+1 }}</label>
        <input ref="product" type="text" name="product" placeholder="Skriv inn resultat" v-model="inputValues[index]" >
    </div>
 
    <RouterLink :to="{ name: 'nesteRunde', params: {runde: `${this.$route.name}-${number}` } } ">
        <button @click="nextRoundNumber">next</button>
    </RouterLink>
    </div>
</template>

<script>
    export default {
        async created() {
           
           /*  this.nextRoundNumber(); */
         
            console.log('router name', this.$route.name)

        },

        beforeRouteUpdate(to, from, next) {
            /* move data to resultarray */
            this.inputValues.forEach((value, index) => {
                this.currentRoundResult[index] = value;
            })

            this.inputValues.forEach((field, index) => {  // then reset input fields for next round
                this.inputValues[index] = '';
            })
            next()
        },


        data(){
            return {
                inputValues: [],
                currentRoundResult: [],
                number: 0
            }
        },

        computed: {
            nextRound() {
                return this.$store.getters.getNextRound;
            }, 
        },

        mounted() {
            
        },
        
        methods: {
            nextRoundNumber() {
                this.number += 1;
                console.log('runde', this.$route.params.runde)

                console.log(this.number)
               
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