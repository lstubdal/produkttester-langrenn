<template>
    <Header :page="'tests'" />
    <div class="findTests">
        <Banner :bannerPage="'findTest'" :bannerTitle="'Finn tester'" class="findTest__banner"/>

        <RouterLink :to="{ name : 'place' }">
            <button class="pageButton">Sted</button>
        </RouterLink>

        <RouterLink :to="{ name : 'weatherData' }">
            <button class="pageButton">Værdata</button>
        </RouterLink>

        <RouterLink :to="{ name : 'date' }">
            <button class="pageButton">Dato</button>
        </RouterLink>
    </div>
</template>

<script>
    import Header from '../components/Header.vue';
    import Banner from '../components/Banner.vue';
    
    export default {
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

    .findTest__banner {
        margin-top: -100px;
        margin-bottom: var(--margin-large);
    }
</style>