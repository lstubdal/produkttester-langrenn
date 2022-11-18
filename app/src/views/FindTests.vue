<template>
    <LoadingScreen v-if="loading" />
    <Header v-else :page="'tests'" />
    <div class="findTests">
        <Banner :bannerPage="'findTest'" :bannerTitle="'Finn tester'" class="findTests__banner" />
        
        <div class="findTests__links">
            <RouterLink :to="{ name : 'place' }" class="pageLink">Sted</RouterLink>
            <RouterLink :to="{ name : 'temperature' }" class="pageLink" >Temperatur</RouterLink>
            <RouterLink :to="{ name : 'date' }" class="pageLink">Dato</RouterLink>
        </div>

        <section class="allTests--main">
            <h3 class="allTests__title--main">Alle tester</h3>
            <hr class="allTests__divider">

            <ul v-for="test in tests">
                <li class="allTests__names">
                    <RouterLink :to="{name: 'test', params: {testSlug: test.slug.current } }" class="allTests__link--main">
                        <span>{{ test.name }}</span>
                        <span class="allTests__link-place--main">Sted: {{ test.place }}</span>
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
    import allTests from '../groq/allTests.groq?raw';
    import sanityMixin from '../mixins/sanityMixin';

    export default {
        mixins: [sanityMixin],

        async created() {
            await this.sanityFetchTest(allTests)

            const headTags = {
                title: 'Produkttesteren | Finn test',
                description: 'Finn tidligere tester etter filter'
            }

            document.title = headTags.title;
            document.querySelector('meta[name="description"]').setAttribute('content', headTags.description);
			document.querySelector('meta[property="og:description"]').setAttribute('content', headTags.description);
        },

        components: {
            Header,
            Banner
        }
    }
</script>

<style>
    .findTests {
        height: 100vh;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
       /*  background-image: url('/images/background-tests.png'); */
    }

    .findTests__banner {
        margin-top:10%;
    }

    .findTests__links {
   
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .allTests--main {
        font-family: var(--main-font);
    }

    .allTests__link--main {
        color: var(--dark);
        display: flex;
        flex-direction: column;
        text-decoration: none;
    }

    .allTests__link-place--main {
        color: var(--second-color);
        font-size: 0.8em;
    }

    .allTests__title--main {
        color: var(--second-color);
        font-size: 1.5em;
    }

    @media screen and (max-width: 800px) {
        .findTests__links {
            flex-direction: column;
        }

        .pageButton--findTest {
            margin: var(--margin-medium);
        }
    }
</style>