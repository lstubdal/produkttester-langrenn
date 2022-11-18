<template>
    <loadingScreen v-if="loading" />
    <div v-else class="place">
        <Header :page="'previousTest'" />
        <Banner :bannerPage="'previousTest'" :bannerTitle="'Sted'" class="banner--previousTests" />
        
        <section class="place__search">
            <label for="placeInput">Søk på sted for å finne test</label>
            <input type="text" name="placeInput" v-model="inputPlace" placeholder="Skriv her..." @keyup="filterTests">
        </section>

        <section class="allTests">
            <hr class="allTests__divider">
            <h3 class="allTests__title">Alle tester</h3>

            <ul v-for="test in tests">
                <li class="allTests__names">
                    <RouterLink :to="{name: 'test', params: {testSlug: test.slug.current } }" class="allTests__link">
                        <span>{{ test.name }}</span>
                        <span class="allTests__link-place">Sted: {{ test.place }}</span>
                    </RouterLink>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
    import Header from '../components/Header.vue';
    import Banner from '../components/Banner.vue';
    import LoadingScreen from '../components/LoadingScreen.vue';
    import sanityMixin from '../mixins/sanityMixin.js';
    import allTests from '../groq/allTests.groq?raw'; // ?raw -> read file as it is

    export default {
        mixins: [sanityMixin],

        async created() {
            // fetch all tests for filter search
            await this.sanityFetchTest(allTests);
        },

        data() {
            return {
                inputPlace: '',
                newSlug: ''
            }
        },

        watch: {
            slug(newSlug) {
                this.checkSlugExists(newSlug);
                
                if (this.newSlug !== newSlug) {
                    this.$router.push({ name: 'pageNotFound', params: { catchAll: '/finn-test/test/:catchAll(.*)' } })
                }         
            }
        },

        computed: {
            slug() {
                return this.$route.params.testSlug
            }
        },

        components: {
            Header,
            Banner,
            LoadingScreen
        },

        methods: {
            filterTests() {
                let testView = document.querySelectorAll('.allTests__names');
                
                // hide tests that don't contain any char from users input
                for (let index = 0; index < this.tests.length; index++) {
                    if (this.tests[index].place.toLowerCase().indexOf(this.inputPlace.toLowerCase()) > -1) {
                        testView[index].style.display = '';
                    } else {
                        testView[index].style.display = 'none';
                    }
                }
            },

            checkSlugExists(newSlug) {
                this.tests.forEach(test => {
                    if (newSlug === test.slug.current) {
                        return this.newSlug = newSlug
                    }
                })
            }
        }
    }
</script>

<style>
    .place {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: var(--main-font);
    }

    .place__search {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .place__search label {
        font-size: 1.2em;
        color: var(--second-color);
        opacity: 80%;
        padding-bottom: var(--padding-medium);
    }

    .place__search input {
        height: 40px;
        width: 300px;
        padding: var(--padding-small);
    }

    .place__search input::placeholder {
        font-size: 1.2em;
        opacity: 70%;
    }

    .allTests {
        width: 25%;
    }

    .allTests__divider {
        height: 0.2px;
        background-color: rgb(107, 106, 106);
        width: 100%;
        opacity: 30%;
        margin: var(--margin-medium) 0px;
    }

    .allTests__title {
        font-weight: 100;
        color: grey;
        padding-bottom: var(--padding-small);
    }

    .allTests__names {
        font-weight: bold;
        font-size: 1.3em;
        padding: 6px 0px;
        list-style-type: none;
    }

    .allTests__link {
        display: flex;
        flex-direction: column;
        text-decoration: none;
        color: var(--second-color);
    }

    .allTests__link-place {
        font-size: 0.8em;
        color: rgb(175, 174, 174);
    }

   .errorInputPlace {
       display: none;
       font-size: 1.5em;
   }

   @media screen and (max-width: 700px){
       .allTests {
            width: 50%;
        }  
   }
</style>