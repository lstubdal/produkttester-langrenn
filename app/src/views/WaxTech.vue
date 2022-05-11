<template>
    <Header :role="'waxTech'" />

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
                <label for="numberOfpairs">Hvor mange skipar skal testes?</label>

                <select name="numberOfpairs" id="addSkis" @change="getNumberOfPairs">
                    <option value="selectPlaceholder">Velg antall</option>
                    <option :value="number" v-for="number in selectNumberOfPairs">{{ number }}</option>
                </select>
            </div>

            <div class="addSkipairs__user">
                <div v-if="numberOfpairs !== ''" class="addSkipairs__user-title">
                    <p>Nr.</p>
                    <p>Produkt</p>
                </div>

                <div class="pairs" v-for='index in numberOfpairs' :key='index'>
                    <div class="pair">
                        <label for="nr">{{ index }}</label>
                        <input type="text" id="nr" name="pair" v-model="products[index-1]" placeholder="Skriv inn produkt">
                    </div>
                </div>
            </div>
        </section>

        <!-- <section class="addSkipairs">
            <h2>SKIPAR FOR TESTING</h2>
            <div class="pairs" v-for='index in 8' :key='index'>
                <div class="pair">
                    <label for="nr">{{ index }}</label>
                    <input type="text" id="nr" name="pair" v-model="products[index-1]" placeholder="Skriv inn produkt">
                </div>
            </div>
        </section>
         -->
        
        <RouterLink :to="{ name: 'tester'}">
            <button @click="createTestSanity">FERDIG</button>
        </RouterLink>
    </div>
</template>

<script>
    import Header from '../components/Header.vue';
    import viewMixin from '../mixins/viewMixin.js'

    export default {
        mixins: [viewMixin],

        data() {
            return {
                name: '',
                place: '',
                date: '',
                temperature: '',
                skiTypes: ['Klassisk', 'Skøyting', 'Skibytte'],
                selectNumberOfPairs: [2,4,6,8,10,12],
                selectedTestType: '',
                inTrack: '',
                outsideTrack: '',
                products: [], // collect skiproducts
                snowdata: '',
                clicked: false,
                numberOfpairs: ''
            }
        },

        components: {
            Header
        },

        computed: {
            skiType() {
                return this.skiType;
            },

            checkTestType() {
                if (this.selectedTestType === 'Klassisk' || this.selectedTestType === 'Skøyting' || this.selectedTestType === 'Skibytte' ) {
                    return true;
                } return false
            }
        },

        methods: {
            getNumberOfPairs(event) {
                return this.numberOfpairs = parseInt(event.target.value);
            },

            getTestType(event) {
                return this.selectedTestType = event.target.value;
            },

            getTemperature() {
               const parsedTemp = parseInt(this.temperature)
               return parsedTemp
            },

            createSnowDataObject() {
                const snowdata = {
                    classic: this.selectedTestType === 'Klassisk' ? true : false,
                    inTrack: this.selectedTestType === 'Klassisk' ||  this.selectedTestType === 'Skibytte' ? this.inTrack : '',
                    outsideTrack: this.selectedTestType === 'Skøyting' || this.selectedTestType === 'Skibytte' ? this.outsideTrack : '',
                    skating: this.selectedTestType === 'Skøyting' ? true : false,
                    skichange: this.selectedTestType === 'Skibytte' ? true : false
                }
                return snowdata; 
            },

            generateRandomKey() {
                let key = '';
                const char = 'abcdefghijklmnopqrstuvwxyz0123456789';
                for (let index = 0; index < 7; index++) {
                    key += char.charAt(Math.random()*  7);
                }
                return key
            },

            createSkipairObjects() {
                const addedSkipairs =  []
                this.products.forEach(product => {
                   const skipairWithProduct = {
                       product: product, // 
                       result: 0,
                       _key: this.generateRandomKey()
                   }
                   addedSkipairs.push(skipairWithProduct)
                });
                return addedSkipairs
            },

            createSlug() {
                const slug = this.name.replace(' ', '-');
                return slug.toLowerCase();
            },

            getParsedNumberOfPairs() {
                const parsedNumber = parseInt(this.numberOfpairs)
                return parsedNumber
            },

            createTestSanity() {
                /* create new testdocument to sanity */
                this.createNewTest(
                    this.name, 
                    this.place, 
                    this.date,
                    this.getTemperature(),
                    this.createSnowDataObject(),
                    this.numberOfpairs,
                    this.createSkipairObjects(),
                    this.createSlug()
                );
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