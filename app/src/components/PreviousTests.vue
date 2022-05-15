<template>
    <div v-if="loading">Henter tester...</div>
    <div v-else>
        <div class="tests">
            <Header :page="'previousTest'" />
            <Banner :bannerPage="'previousTest'" :bannerTitle="'Sted'" class="tests__banner" />
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
    import query from '../groq/testsName.groq?raw';

    export default {
        mixins: [viewMixin],

        components: {
            Header,
            Banner
        },

        async created() {
            await this.sanityFetchTest(query);

            console.log(this.$route.name)
        },

        methods: {
            /* clicked() {
                return this.testClicked = true;
            } */
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