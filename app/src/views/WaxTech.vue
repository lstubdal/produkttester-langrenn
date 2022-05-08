<template>
    <Header :role="waxTech" />

    <div class="waxTech">
        <div class="waxTech__input">
            <label for="testname">Testnavn</label>
            <input type="text" id="testname" name="testname" placeholder="Skriv inn navn på test" v-model="name">   
        </div>

        <div class="waxTech__input">
            <label for="place">Sted</label>
            <input type="text" id="place" name="place" v-model="place" placeholder="Skriv inn sted for test">   
        </div>

        <div class="waxTech__input">
            <label for="date">Dato</label>
            <input type="date" id="date" name="date" v-model="date">   
        </div>

        <div class="waxTech__input">
            <label for="temperature">Temperatur</label>
            <input type="text" id="temperature" name="temperature" v-model="temperature" placeholder="Celcius">   
        </div>

        <!-- SNOWDATA -->
        <section class="snowData">
            <h3>Snødata</h3>
            <span>Kryss av type test som skal gjennomføres</span>

            <div class="snowData__types" >
                <div class="snowData__type" v-for="(type, index) in skiTypes" >
                    <label :for="type">{{ type }}</label>
                    <input type="checkbox" :id="type" :name="type" :value="type" :v-model="selectedTestType" @change="getTestType">
                </div>
            </div>

            <div class="snowData__values">
                <div class="snowData__value" v-if="selectedTestType === 'Klassisk' || selectedTestType === 'Skibytte'">
                    <label for="inTrack">I spor</label>
                    <input type="text" id="inTrack" name="inTrack" placeholder="Format eks. 25%-29%" v-model="inTrack">   
                </div>

                <div v-if="selectedTestType === 'Skøyting' || selectedTestType === 'Skibytte'" class="snowData__value">
                    <label for="outsideTrack">Utenfor spor</label>
                    <input type="text" id="outsideTrack" name="outsideTrack" placeholder="Format eks. 25%-29%" v-model="outsideTrack">   
                </div>
            </div>
        </section>

        <!-- ADD SKIPARIS -->
        <section class="addSkipairs">
            <h2>LEGG INN SKI </h2>
            <div class="addSkipairs__number">
                <label for="numberOfSkipairs">Hvor mange skipar skal testes?</label>
        
                <select name="numberOfSkipairs" id="addSkis" @change="getNumberOfPairs">
                    <option value="selectPlaceholder">Velg antall</option>
                    <option :value="number" v-for="number in selectNumberOfPairs">{{ number }}</option>
                </select>
            </div>

            <div class="addSkipairs__user">
                <div v-if="numberOfSkipairs !== ''" class="addSkipairs__user-title">
                    <p>Nr.</p>
                    <p>Produkt</p>
                </div>
                
                <div class="pairs" v-for='index in numberOfSkipairs' :key='index'>
                    <div class="pair">
                        <label for="nr">{{ index }}</label>
                        <input type="text" id="nr" name="pair" v-model="addedSkiPairs[index-1]" placeholder="Skriv inn produkt">
                    </div>
                </div>
            </div>
        </section>
        
        <RouterLink :to="{ name: 'tester'}">
            <button @click="waxTechDone">FERDIG</button>
        </RouterLink>
    </div>
</template>

<script>
    import Header from '../components/Header.vue';

    export default {
        data() {
            return {
                name: '',
                place: '',
                date: '',
                temperature: '',
                skiTypes: ['Klassisk', 'Skøyting', 'Skibytte'],
                selectNumberOfPairs: [2,3,4,5,6,7,8,9,10,11,12],
                numberOfSkipairs: '',
                selectedTestType: '',
                inTrack: '',
                outsideTrack: '',
                addedSkiPairs: [], // collect added pair of skis in array
                snowdata: '',
                testArray: ['tomato', 'potato']
            }
        },

        components: {
            Header
        },

        computed: {
            /* numberOfSkipairs() {
                return this.$store.getters.getNumberOfSkipairs
            }, */

            skiType() {
                return this.skiType;
            },

            /* testname() {
                return this.$store.getters.getTestname;
            } */
        },

        methods: {
            getNumberOfPairs(event) {
                const parsedNumberValue = parseInt(event.target.value) // parse from string to number
                this.numberOfSkipairs = parsedNumberValue;
                /* this.$store.dispatch('updateNumberOfSkipairs', ); */ // push value to store in order to use it in the next field

                console.log('name', this.name)
                console.log('place', this.place)
                console.log('date', this.date)
                console.log('temp', this.temperature)
                console.log('selected skitype', this.selectedTestType);
                console.log('intrack', this.inTrack)
                console.log('outside track', this.outsideTrack);
                console.log(this.addedSkiPairs);
            },

            getTestType(event) {
                this.selectedTestType = event.target.value;
                console.log('event', event.target.checked);
                console.log('computed', this.selectedTestType);
            },

            createSnowDataObject() {
                this.snowdata = {
                    type: this.selectedTestType,
                    track: {
                        inTrack: this.selectedTestType === 'skøyting' ? '-' : this.inTrack,
                        outisdeTrack: this.selectedTestType === 'klassisk' ? '-' : this.outsideTrack
                    }
                }
            },


            /*  psuhe data til store på ett vis */
            waxTechDone() {
                this.createSnowDataObject();
                console.log('snowdata', this.snowdata)
                this.$store.dispatch('updateWaxTechStatus');

                console.log('added skipairs', this.addedSkiPairs);
                console.log('added skipairs length', this.addedSkiPairs.length);
                
                this.$store.dispatch('updateNewTestData', {
                    name: this.name,
                    place: this.place,
                    date: this.date,
                    temperature: this.temperature,
                    snowdata: this.snowdata,
                    skipairs: this.addedSkiPairs
                })

                /* const newTest = {
                    name: this.name,
                    place: this.place,
                    date: this.date,
                    temperature: this.temperature,
                    addSkis: this.addedSkiPairs,
                    snowdata: {
                        type: this.getTestType,
                        inTrack: this.inTrack !== null ? this.inTrack : '',
                        outsideTrack: this.inTrack !== null ? this.inTrack : '',
                    },
                    slug: '',
                }
                console.log('NEW TEST OBJECT', newTest); */
            }
        }
    }
</script>

<style>
    .waxTech {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: var(--padding-large);
    }

    .waxTech__input {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: var(--margin-medium);
    }

    .snowData {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: var(--margin-large);
    }

    .snowData__types {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .snowData__type {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: var(--padding-medium);
    }

    .addSkipairs {
        margin: var(--margin-large);
    }

    .addSkipairs__number {
        display: flex;
        flex-direction: column;
    }

    .addSkipairs__user-title {
        display: flex;
    }

    .pair {
        display: flex;
    }
</style>