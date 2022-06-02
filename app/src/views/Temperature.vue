<template>
    <div class="temperature">
        <Header :page="'previousTest'" />
        <Banner :bannerPage="'previousTest'" :bannerTitle="'Temperatur'" class="banner--previousTests" />

        <section class="temperature__range">
            <p>Skriv inn temperaturer for å finne ønsket tester</p>

            <div class="temperature__range-inputs">
                <label for="min">Fra</label>
                <input v-model="inputMinimum" type="number" placeholder="Celsius" />
                
                <label for="max">Til</label>
                <input v-model="inputMaximum" type="number" placeholder="Celsius" />

                <button class="temperature__search" @click="searchTests" aria-label="search for tests">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.6667 30C19.625 29.9994 22.498 29.0091 24.8284 27.1867L32.155 34.5134L34.5117 32.1567L27.185 24.83C29.0084 22.4995 29.9993 19.6258 30 16.6667C30 9.31504 24.0184 3.33337 16.6667 3.33337C9.31504 3.33337 3.33337 9.31504 3.33337 16.6667C3.33337 24.0184 9.31504 30 16.6667 30ZM16.6667 6.66671C22.1817 6.66671 26.6667 11.1517 26.6667 16.6667C26.6667 22.1817 22.1817 26.6667 16.6667 26.6667C11.1517 26.6667 6.66671 22.1817 6.66671 16.6667C6.66671 11.1517 11.1517 6.66671 16.6667 6.66671Z" fill="#7B0303"/>
                    </svg>
                </button>
            </div>
        </section>

        <div class="error"></div>
        <div class="temperature__test" v-for="t in test">
            <RouterLink :to="{name: 'test', params: { testSlug: t.slug.current } }" class="tests__test-name">{{ t.name }}</RouterLink>
        </div>
    </div>
</template>

<script>
    import Header from '../components/Header.vue';
    import Banner from '../components/Banner.vue';
    import sanityMixin from '../mixins/sanityMixin';
    import temperatureQuery from '../groq/temperatureTests.groq?raw';

    export default {
        data() {
          return {
            filterType: '',
            inputMinimum: '',
            inputMaximum: '',
          }
        },

        mixins: [sanityMixin],

        components: {
            Header,
            Banner
        },

        watch: {
            input() {
                const errorView = document.querySelector('.error');
                errorView.style.display = 'none';
            }
        },
        
        methods: {
          findSelectedType(event) {
            return this.filterType = event.target.value;
          },
          
          async searchTests() {
            if (this.inputMinimum && this.inputMaximum !== ''){
                const parsedMin = parseInt(this.inputMinimum);
                const parsedMax = parseInt(this.inputMaximum);

                // fetch tests with users temperature range
                await this.sanityFetchTest(temperatureQuery, { 
                    min: parsedMin,
                    max: parsedMax
                })
                
                // display error if no tests found
                const errorView = document.querySelector('.error');
                if (this.tests.length === 0) {
                    errorView.innerText = `Fant ingen mellom ${parsedMin} og ${parsedMax} grader. Prøv igjen...`;
                    errorView.style.display = 'block';
                }

                // handle input error
                if (parsedMin > parsedMax) {
                    errorView.innerText = "Obs, 'fra-verdi' kan ikke være større enn 'til-verdi'";
                    errorView.style.display = 'block';
                }
              }
          }
        }
    }
</script>

<style>
    .temperature {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: var(--second-color);
        font-size: 1.2em;
        font-family: var(--main-font);
    }

    .temperature__range {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .temperature__range-inputs {
        display: flex;
        align-items: center;
        margin: var(--margin-small);
    }

    .temperature__range-inputs label {
        padding: var(--padding-small);
    }

    .temperature__range-inputs input {
        width: 70px;
        height: 30px;
        padding: 0.5%;
        text-align: center;
    }

    .temperature__search {
        background-color: transparent;
        border: none;
        padding: var(--padding-small);
    }
    
    .temperature__test {
        display: flex;
        justify-content: center;
        border-bottom: 1px solid var(--second-color);
        padding: 0.5%;
        margin: var(--margin-small);
    }

    .error {
        display: none;
        color: var(--second-color)
    }

    @media screen and (max-width: 800px) {
       
    }
</style>