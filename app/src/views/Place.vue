<template>
    <loadingScreen v-if="loading" />
    <div v-else class="place">
        <Header :page="'previousTest'" />
        
        <div class="place__content">
            <Banner :bannerPage="'previousTest'" :bannerTitle="'Sted'" class="banner--previousTests" />

            <p class="place__undertitle">Viser i alfabetisk rekkefølge</p>

            <div class="place__test" v-for="t in test">
                <RouterLink :to="{name: 'test', params: { testSlug: t.slug.current } }" class="tests__test-name">{{ t.name }}</RouterLink>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '../components/Header.vue';
    import Banner from '../components/Banner.vue';
    import LoadingScreen from '../components/LoadingScreen.vue';
    import viewMixin from '../mixins/viewMixin';
    import nameQuery from '../groq/nameTests.groq?raw';

    export default {
        mixins: [viewMixin],

        components: {
            Header,
            Banner,
            LoadingScreen
        },

        async created() {
            await this.sanityFetchTest(nameQuery)
     
        }

    }
</script>

<style>
    .place, .place__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: var(--main-font);
        font-size: 1.3em;
    }

    .place__undertitle {
        color: rgb(119, 117, 117);
        font-size: 1em;
    }

    .place__test {
        display: flex;
        justify-content: center;
        border-bottom: 1px solid var(--second-color);
        padding: 0.5%;
        margin: var(--margin-large) var(--margin-small);
    }

    .tests__test-name {
        font-size: 1.3em;
        text-decoration: none;
        color: var(--second-color);
    }
</style>