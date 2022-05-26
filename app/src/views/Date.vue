<template>
  <div class="date">
      <Header :page="'previousTest'" />
      <Banner :bannerPage="'previousTest'" :bannerTitle="'Dato'" class="banner--previousTests" />
      
      <section class="date__content">
        <label for="test-date">Velg dato for testen du ønsker å finne</label>
        <input name="test-date" type="date" v-model="inputDate" @change="findTest">
        
        <div class="errorDate"></div>
        <div class="date__test" v-for="t in test">
            <RouterLink :to="{name: 'test', params: { testSlug: t.slug.current } }" class="tests__test-name">{{ t.name }}</RouterLink>
        </div>
      </section>
  </div>
</template>

<script>
  import Header from '../components/Header.vue';
  import Banner from '../components/Banner.vue';
  import viewMixin from '../mixins/viewMixin';
  import dateQuery from '../groq/dateTest.groq?raw';

  export default {
    mixins: [viewMixin],

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
        await this.sanityFetchTest(dateQuery, { date: this.inputDate })

        const errorView = document.querySelector('.errorDate');
        errorView.innerText = ''; // reset error message for next search
        if (this.test.length === 0) {
          console.log('ingen test');
          errorView.innerText = `Fant ingen test fra ${this.inputDate}. Prøv igjen...`;
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
    color: var(--second-color);
  }
</style>