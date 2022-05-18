<template>
  <div class="tests">
      <Header :page="'previousTest'" />
      <Banner :bannerPage="'previousTest'" :bannerTitle="'Dato'" class="tests__banner" />
      
      <section class="tests__date">
        <p>Velg dato for testen du ønsker å finne</p>
        <input type="date" v-model="inputDate" @change="findTest">
        
        <div class="errorDate"></div>
        
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
          errorView.innerText = `Fant ingen test fra ${this.inputDate}. Prøv igjen...`;
        }
      }  
    }
  }
</script>

<style>
  .tests__date {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .errorDate {
    color: var(--second-color)
  }
</style>