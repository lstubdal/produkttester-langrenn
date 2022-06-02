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

        <div class="inputError errorTestInput-nextRound"></div>
        <RouterLink :to="{ name: 'nextRound', params: {round: `runde-${round}` } } ">
            <button @click="goToNextRound" class="pageButton">NESTE</button>
        </RouterLink>
    </div>
</template>

<script>
    import Banner from '../components/Banner.vue';
    import SkipairsHeadline from '../components/SkipairsHeadline.vue';
    import testMixin from '../mixins/testMixin.js';
    import validationMixin from '../mixins/validationMixin.js';

    export default {
        mixins: [testMixin, validationMixin],

        created() {
            if (this.nextRound !== 'undefined') {
                this.skipairs = this.nextRound; // for v-model
            } 
        },

        data(){
            return {
                skipairs: [], 
                round: 2
            }
        },

        // before each round is finished
        beforeRouteUpdate(to, from, next) {
            this.findWinners(this.skipairs);
            this.$store.dispatch('increaseRoundIndex');
            this.skipairs = this.nextRound; // udpate testingpairs view
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
                if (this.validationPass(this.skipairs, 'errorTestInput-nextRound')) {
                    this.round += 1; // increase round nubmer for slug
                }  
            },
            
            skipairKey(pair) {
                return Object.values(pair)[0]
            }
        }
    }
</script>

<style>
    .nextRound {
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
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