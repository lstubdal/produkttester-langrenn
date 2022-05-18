<template>
    <Header :page="'waxTech'" />

    <div class="waxTech">
        <div class="waxTech__input">
            <label for="testname">Testnavn</label>
            <input type="text" id="testname" name="testname" placeholder="Skriv inn navn på test" v-model="name">   
        </div>

        <div class="waxTech__input--responsive">
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

        </div>

        <!-- SNOWDATA -->
        <section class="snowData">
            <h3>Snødata</h3>
            <span>Kryss av type test som skal gjennomføres</span>

            <div class="snowData__types" >
                <div class="snowData__type" v-for="(type, index) in skiTypes" >
                    <label :for="type">{{ type }}</label>
                    <input type="checkbox" class="snowData__checkbox" :name="type" :value="type" :v-model="selectedTestType" @change="getTestType">
                </div>
            </div>

            <div class="snowData__values">
                <div class="snowData__value" v-if="selectedTestType === 'Klassisk' || selectedTestType === 'Skibytte'">
                    <label for="inTrack">I spor</label>
                    <input type="text" id="inTrack" name="inTrack" placeholder="Format eks. 25%-29%" v-model="inTrack" class="snowData__input">   
                </div>

                <div v-if="selectedTestType === 'Skøyting' || selectedTestType === 'Skibytte'" class="snowData__value">
                    <label for="outsideTrack">Utenfor spor</label>
                    <input type="text" id="outsideTrack" name="outsideTrack" placeholder="Format eks. 25%-29%" v-model="outsideTrack" class="snowData__input">   
                </div>
            </div>
        </section>

        <!-- SELECT NUMBER OF SKIPAIRS -->
        <section class="skipairs">
            <h3>LEGG INN SKI </h3>
            <div class="skipairs__number">
                <label for="numberOfpairs">Hvor mange skipar skal testes?</label>

                <select name="numberOfpairs" id="addSkis" @change="getNumberOfPairs">
                    <option value="selectPlaceholder">Velg antall</option>
                    <option :value="number" v-for="number in selectNumberOfPairs">{{ number }}</option>
                </select>
            </div>

            <!-- ADD SKIPAIRS -->
            <div class="skipairs__user">
                <div v-if="numberOfpairs !== ''" class="skipairs__user-title">
                    <p class="skipairs__user-number">Par.</p>
                    <p class="skipairs__user-product">Produkt</p>
                </div>

                <div class="pairs" v-for='index in numberOfpairs' :key='index'>
                    <div class="pair">
                        <label for="nr">{{ index }}</label>
                        <input type="text" id="nr" name="pair" v-model="products[index-1]" placeholder="Skriv inn produkt">
                    </div>
                </div>
            </div>
        </section>

        <RouterLink :to="{ name: 'tester'}">
            <button @click="createTestSanity" class="pageButton">NESTE</button>
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
                this.products.forEach((product, index) => {
                    let key = JSON.stringify(index+1);

                    const skipairWithProduct = {
                        product: product, // 
                        result: 0,
                        _key: key // this.generateRandomKey()
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
                /* this.createNewTest(
                    this.name, 
                    this.place, 
                    this.date,
                    this.getTemperature(),
                    this.createSnowDataObject(),
                    this.numberOfpairs,
                    this.createSkipairObjects(),
                    this.createSlug()
                ); */
            }
        }
    }
</script>

<style>
    .waxTech {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: var(--main-font);
        padding: var(--padding-large);
        background-image: url(/images/background.png);
        background-size: cover;
    }

    .waxTech__input {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: var(--margin-medium);
        font-size: 1.2em;
        color: var(--main-color);
    }


    .waxTech__input input {
       padding: 3%;
       margin-top: 2%;
       border: 1.5px solid var(--main-color);
       border-radius: 2px;
    }

    .waxTech__input ::placeholder {
        font-size: 1em;
        opacity: 50%;
    }

    .snowData {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: var(--margin-medium);
        color: var(--main-color);
    }

    .snowData h3 {
        padding: var(--padding-small);
        font-size: 1.2em;
    }

    .snowData__checkbox {
        height: 25px;
        width: 25px;
        border: 2px solid var(--main-color);
        margin: var(--margin-small);
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
        padding: var(--padding-medium);
    }

    .snowData__values {
        width: 100%;
        font-size: 1em;
    }

    .snowData__value {
        margin: 0px var(--margin-medium) var(--margin-small) ;
    }

    .snowData__value label  {
        width: 50%;
        margin-right: var(--margin-small)
    }

    .snowData__input {
       padding: 1.5%;
    }

    .snowData__value ::placeholder  {
        opacity: 50%;
    }

    @media screen and (min-width: 800px) {
        .waxTech__input--responsive {
            display: flex;
            flex-direction: row;
        }
    }


    
</style>