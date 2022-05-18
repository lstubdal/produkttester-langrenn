<template>
      <div class="tests">
          <Header :page="'previousTest'" />
          <Banner :bannerPage="'previousTest'" :bannerTitle="'Værdata'" class="tests__banner" />
  
          <section class="weatherData">
              <div class="weatherData__selector">
                  <label for="weatherData">Velg type</label>
                  <select name="weatherData"  @change="findSelectedType">
                      <option value="selectPlaceholder">Filtrer etter...</option>
                      <option value="snowData">Snøfuktighet</option>
                      <option value="temperature">Temperatur</option>
                  </select>
              </div>

              <!-- filter based on temperature -->
              <div v-if="filterType === 'temperature'" class="tests__temperature">
                  <label for="min">Fra</label>
                  <input v-model="inputMinimum" type="text" placeholder="Celsius" />
                  
                  <label for="max">Til</label>
                  <input v-model="inputMaximum" type="text" placeholder="Celsius" />

                  <button class="temperature__search" @click="searchTests">
                      <img src="/icons/search.svg" alt="search icon" >
                  </button>
              </div>

              <div class="error"></div>
              <div class="tests__test" v-for="t in test">
                    <RouterLink :to="{name: 'test', params: { testSlug: t.slug.current } }" class="tests__test-name">{{ t.name }}</RouterLink>
              </div>

              <!-- filter based on snowdata -->
              <div v-if="filterType === 'snowData'" class="tests__snowdata">
              
                 <label for="min">Fra</label>
                  <input v-model="inputMinimum" type="text" placeholder="%" />
                  
                  <label for="max">Til</label>
                  <input v-model="inputMaximum" type="text" placeholder="%" />

                  <button class="temperature__search" @click="searchTestsTemperature">
                      <img src="/icons/search.svg" alt="search icon" >
                  </button>
              </div>
              
              <div class="error"></div>
              <div class="tests__test" v-for="t in test">
                    <RouterLink :to="{name: 'test', params: { testSlug: t.slug.current } }" class="tests__test-name">{{ t.name }}</RouterLink>
              </div> 
          </section>
      </div>
</template>

<script>
    import Header from '../components/Header.vue';
    import Banner from '../components/Banner.vue';
    import viewMixin from '../mixins/viewMixin';
    import temperatureQuery from '../groq/temperatureTests.groq?raw';


    export default {
        data() {
          return {
            filterType: '',
            inputMinimum: '',
            inputMaximum: '',

          }
        },

        mixins: [viewMixin],

        components: {
            Header,
            Banner
        },
        
        methods: {
          findSelectedType(event) {
            return this.filterType = event.target.value;
          },
          
          async searchTests() {
            const parsedMin = parseInt(this.inputMinimum);
            const parsedMax = parseInt(this.inputMaximum);

            await this.sanityFetchTest(temperatureQuery, { 
              min: parsedMin,
              max: parsedMax
            })

            if (this.test.length === 0) {
              const errorView = document.querySelector('.error');
              errorView.innerText = `Fant ingen mellom ${parsedMin} og ${parsedMax} grader. Prøv igjen...`;
            }
          }
        }

        
            
     
        

    }
</script>

<style>
    .temperature {
        display: flex;
        justify-content: center;
        align-items: center ;
    }

    .temperature__search {
        background-color: transparent;
        border: none;
    }

    .weatherData__selector {
        display: flex;
        flex-direction: column;
    }
</style>