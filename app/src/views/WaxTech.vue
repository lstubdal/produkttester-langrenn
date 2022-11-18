<template>
    <Header :page="'waxTech'" />
    <div class="waxTech">
        <div class="waxTech__input">
            <label for="testname">Testnavn</label>
            <input type="text" name="testname" placeholder="Skriv inn navn på test" v-model="name" required>
            <div class="inputError errorName"></div> 
        </div>

        <div class="waxTech__input--responsive">
            <div class="waxTech__input">
                <label for="place">Sted</label>
                <input type="text" id="place" name="place" v-model="place" placeholder="Skriv inn sted for test">
                <div class="inputError errorPlace"></div>    
            </div>

            <div class="waxTech__input">
                <label for="date">Dato</label>
                <input type="date" id="date" name="date" v-model="date">
                <div class="inputError errorDate"></div>   
            </div>

            <div class="waxTech__input">
                <label for="temperature">Temperatur</label>
                <input type="number" id="temperature" name="temperature" v-model="temperature" placeholder="Celcius">
                <div class="inputError errorTemperature"></div>   
            </div>
        </div>

        <!-- SNOWDATA -->
        <section class="snowData">
            <h3>Snødata</h3>
            <span>Kryss av type test som skal gjennomføres</span>
            <div class="inputError errorTestType"></div>

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
                <div class="inputError errorNumberOfSkipairs"></div>

                <select class="skipairs__selector" name="numberOfpairs" id="addSkis" @change="getNumberOfPairs">
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

                <div v-for='index in numberOfpairs' :key='index'>
                    <div class="pair">
                        <label class="pair__number" for="nr">{{ index }}</label>
                        <input class="pair__product pair__product--waxTech" type="text" name="pair" v-model="products[index-1]" placeholder="Skriv inn produkt">
                    </div>
                </div>
                <div class="inputError errorProduct"></div>
            </div>
        </section>

        <button @click="createTestSanity" class="pageButton">NESTE</button>
        <div class="inputError errorPage"></div>
    </div>
</template>

<script>
    import Header from '../components/Header.vue';
    import sanityMixin from '../mixins/sanityMixin.js';
    import testMixin from '../mixins/testMixin.js';
    import validationMixin from '../mixins/validationMixin.js';

    export default {
        mixins: [sanityMixin, testMixin, validationMixin],

        data() {
            return {
                name: '',
                place: '',
                date: '',
                temperature: null,
                skiTypes: ['Klassisk', 'Skøyting', 'Skibytte'],
                selectNumberOfPairs: [2,4,8],
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
            },

            testId() {
                return this.$store.getters.getTestId;
            }
        },

        methods: {
            getNumberOfPairs(event) {
                return this.numberOfpairs = parseInt(event.target.value);
            },

            getTestType(event) {
                return this.selectedTestType = event.target.value;
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

            createSkipairObjects() {
                const addedSkipairs =  []
                this.products.forEach((product, index) => {
                    let key = JSON.stringify(index+1);

                    const skipairWithProduct = {
                        product: product,
                        result: 0,
                        _key: key 
                    }
                    addedSkipairs.push(skipairWithProduct)
                });
                return addedSkipairs
            },

            createSlug() {
                const slug = this.name.replaceAll(' ', '-');
                return slug.toLowerCase();
            },

            getParsedNumberOfPairs() {
                return parseInt(this.numberOfpairs)
            },

            createTestSanity() {
                // if all inputs are filled
                if (this.validationTextInput(this.name, 'errorName', 'Mangler navn!' ) 
                    && this.validationTextInput(this.place, 'errorPlace', 'Mangler sted!') 
                    && this.validationTextInput(this.date, 'errorDate', 'Mangler dato!') 
                    && this.validationTemperature() 
                    && this.validationSkiType()
                    && this.validationSkipairs()) {

                    // create new testdocument to sanity 
                    this.createOrUpdateTest(
                        this.testId, /* empty placeholder */
                        this.name, 
                        this.place, 
                        this.date,
                        this.temperature,
                        this.createSnowDataObject(),
                        this.numberOfpairs,
                        this.createSkipairObjects(),
                        this.createSlug()
                    );
                 
                } else {
                    const inputField = document.querySelector('.errorPage');
                    inputField.innerText = 'Alle felt er ikke fylt inn';
                    inputField.style.display = 'block';
                }  
            },

            validationSkiType() {
                const inputField = document.querySelector('.errorTestType');
                if (this.selectedTestType === '') {
                    inputField.innerText = 'Mangler testtype'
                    inputField.style.display = 'block'
                    return false
                } else {
                    if (this.selectedTestType === 'Klassisk' && this.inTrack === '') {
                        inputField.innerText = "Manger data for 'i spor'"
                        inputField.style.display = 'block'
                        return false
                    } else if (this.selectedTestType === 'Skøyting' && this.outsideTrack === '') {
                        inputField.innerText = "Mangler data for 'utenfor spor'"
                        inputField.style.display = 'block'
                        return false
                    } else {
                        if (this.selectedTestType === 'Skibytte' && this.inTrack === '' && this.outsideTrack === '') {
                            inputField.innerText = "Mangler data 'i/ utenfor spor'";
                            inputField.style.display = 'block';
                            return false
                        }
                    }
                }
                inputField.style.display = 'none';
                return true 
            },

            validationSkipairs() {
                const inputFieldNumber = document.querySelector('.errorNumberOfSkipairs');
                const inputFieldProduct = document.querySelector('.errorProduct');
                if (this.numberOfpairs === null) {
                    inputFieldNumber.innerText = 'Mangler antall skipar som skal testes';
                    inputFieldNumber.style.display = 'block';
                    return false
                } else if (this.numberOfpairs !== null && this.products.length === 0) {
                    inputFieldProduct.innerText = 'Mangler et produkt på skipar';
                    inputFieldProduct.style.display = 'block';
                    return false
                }
                inputFieldNumber.style.display = 'none';
                inputFieldProduct.style.display = 'none';
                return true
            },

            validationTemperature() {
                const inputField = document.querySelector('.errorTemperature');
                if (this.temperature === null) {
                    inputField.innerText = 'Mangler temperatur!';
                    inputField.style.display = 'block';
                    return false
                } 
                inputField.style.display = 'none'; 
                return true
            },
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
        font-size: 1.5em;
        color: var(--main-color);
    }

    .waxTech__input input {
        width: 240px;
        height: 40px;
        padding: var(--padding-small);
       
       margin-top: 2%;
       border: 1.5px solid var(--main-color);
       border-radius: 2px;
    }

    .waxTech__input ::placeholder {
        font-size: 1.2em;
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
        font-size: 1.7em;
    }

    .snowData span {
        font-size: 1em;
    }

    .snowData__checkbox {
        height: 40px;
        width: 40px;
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
        font-size: 1.3em;
        display: flex;
        flex-direction: column;
        padding: var(--padding-medium);
    }

    .snowData__values {
        display: flex;
        font-size: 1em;
    }

    .snowData__value {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0px var(--margin-medium) ;
    }

    .snowData__value label  {
        font-size: 1.2em;
        margin-right: var(--margin-small)
    }

    .snowData__input {
       height: 40px;
       width: 160px;
       padding: var(--padding-small);
    }

    .snowData__value ::placeholder  {
        opacity: 50%;
    }

    .skipairs h3 {
        font-size: 1.7em;
    }

    .skipairs__number label {
        font-size: 1.2em;
    }

    .skipairs__user-title {
        display: flex;
        padding: 0.2%;
        align-items: center;
        text-align: center;
        margin-top: var(--margin-small);
    }

    .skipairs__user-product {
        flex-grow: 1;
    }

    .skipairs__user-number {
        padding: 2% var(--padding-small);
    }

    .skipairs__user-product {
        padding: 2% var(--padding-xlarge) ;
    }

    .skipairs__user-product, .skipairs__user-number, .pair__number, .pair__product {
        background-color: var(--main-color);
        color: var(--light);
        border-radius: var(--button-border);
        margin: 1%;
        font-size: 1.2em;
    }

    .pair__product--waxTech {
        width: 220px;
        color: var(--main-color);
        background-color: var(--light);
    }

    .skipairs__selector {
        height: 40px;
        width: 300px;
        font-size: 1.3em;
    }

    .errorName, .errorPlace, .errorDate, .errorTemperature, .errorTestType, .errorNumberOfSkipairs, .errorProduct, .errorPage {
        display: none;
    }

    @media screen and (min-width: 800px) {
        .waxTech__input--responsive {
            display: flex;
            flex-direction: row;
        }
    } 
</style>