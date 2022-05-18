<template>
    <div v-if="loading">Henter tester...</div>
    <div v-else>
        <div class="tests">
            <Header :page="'previousTest'" />
            <Banner :bannerPage="'previousTest'" :bannerTitle="'Sted'" class="tests__banner" />
                <p class="tests__undertitle">Vises i alfabetisk rekkefølge</p>
                <div class="tests__test" v-for="t in test">
                    <RouterLink :to="{name: 'test', params: { testSlug: t.slug.current } }" class="tests__test-name">{{ t.name }}</RouterLink>
                </div>
        </div>
    </div>
</template>

<script>
    import Header from '../components/Header.vue';
    import Banner from '../components/Banner.vue';
    import viewMixin from '../mixins/viewMixin';
    import nameQuery from '../groq/nameTests.groq?raw';


    export default {
        mixins: [viewMixin],

        components: {
            Header,
            Banner
        },

        async created() {
            await this.sanityFetchTest(nameQuery)
     
        }

    }
</script>

<style>
    .tests {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: var(--main-font);
        font-size: 1.3em;
    }

    .tests__banner {
        margin: var(--margin-large);
    }

    .tests__undertitle {
        color: rgb(143, 140, 140);
        font-size: 0.9em;
    }

    .tests__test {
        display: flex;
        justify-content: center;
        border-bottom: 1px solid var(--second-color);
        padding: 0.5%;
        margin: var(--margin-small);
    }

    .tests__test-name {
        text-decoration: none;
        color: var(--second-color);
    }

</style>