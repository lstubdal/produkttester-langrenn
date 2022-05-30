<template>
    <Header :page="'tests'" />
    <div class="findTests">
        <Banner :bannerPage="'findTest'" :bannerTitle="'Finn tester'" />
        
        <div class="findTests__links">
            <RouterLink :to="{ name : 'place' }" class="pageLink">Sted</RouterLink>
            <RouterLink :to="{ name : 'temperature' }" class="pageLink" >Temperatur</RouterLink>
            <RouterLink :to="{ name : 'date' }" class="pageLink">Dato</RouterLink>
        </div>
    </div>
</template>

<script>
    import Header from '../components/Header.vue';
    import Banner from '../components/Banner.vue';
    
    export default {
        created() {
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
        background-image: url('/images/background-tests.png');
    }

    .findTests__links {
        height: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
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