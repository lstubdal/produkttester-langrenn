<template>
  <div class="date">
      <Header :page="'previousTest'" />
      <Banner :bannerPage="'previousTest'" :bannerTitle="'Dato'" class="banner--previousTests" />
      
      <section class="date__content">
        <label for="test-date">Velg dato for testen du ønsker å finne</label>
        <input name="test-date" type="date" v-model="inputDate" @change="findTest">
        
        <div class="errorDate"></div>
        <div class="date__test" v-for="test in tests">
            <RouterLink :to="{name: 'test', params: { testSlug: test.slug.current } }" class="tests__test-name">{{ test.name }}</RouterLink>
        </div>
      </section>
  </div>
</template>

<script>
  import Header from '../components/Header.vue';
  import Banner from '../components/Banner.vue';
  import sanityMixin from '../mixins/sanityMixin';
  import dateQuery from '../groq/dateTest.groq?raw';

  export default {
    mixins: [sanityMixin],

    data() {
      return {
        inputDate: ''
      }
    },

    components: {
      Header,
      Banner
    },

    methods: {
      async findTest() {
        // fetch test with matching input date 
        await this.sanityFetchTest(dateQuery, { date: this.inputDate })

        // if no test exists with current date
        const errorView = document.querySelector('.errorDate');
        errorView.innerText = ''; // reset error message for next search
        if (this.tests.length === 0) {
          errorView.innerText = `Fant ingen test fra ${this.inputDate}. Prøv igjen...`;
          errorView.style.display = 'block';
        }
      }  
    }
  }
</script>

<style>
  .date, .date__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: var(--main-font);
    font-size: 1.3em;
    color: var(--second-color);
  }

  .date__content {
    font-size: 1em;
  }

  .date__content input {
    height: 40px;
    width: 200px;
    font-size: 1.1em;
    padding: var(--padding-small);
    margin-top: var(--margin-medium);
    color: var(--second-color);
    background-color: var(--light);
    border: 2px solid var(--second-color);
  }

  .date__test {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid var(--second-color);
    padding: 0.5%;
    margin: var(--margin-large) var(--margin-small);
  }

  .errorDate {
    display: none;
    color: var(--second-color);
  }
</style>