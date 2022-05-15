<template>
    <div v-if="loading">Henter test...</div>
    <div v-else class="test">
        <Header :page="'previousTest'" />
        <Information :test="test" :page="'previousTest'" class="test__information" />
        <Banner :bannerPage="'previousTest'" :bannerTitle="test.name" />

        <section class="test__data">
            <h3>Snødata</h3>
            <div>Test type: {{ testType }}</div>
            <div v-if="testType === 'Klassisk' || testType === 'Skibytte'">I spor: {{ test.snowdata.inTrack }}</div>
            <div v-if="testType === 'Skøyting' || testType === 'Skibytte'">Utenfor spor: {{ test.snowdata.outsideTrack }}</div>
        </section>

        <section class="test__results">
            <Banner :bannerPage="'findTest'" :bannerTitle="'RESULTATER'" />

            <!-- make component! -->
            <div class="skipairs__user-title test__results-info">
                <span class="skipairs__user-number">Nr. </span>
                <span class="skipairs__user-product">Produkt</span>
                <span class="skipairs__user-product">Differanse</span>
            </div>

            <div class="test__results-skipairs" v-for="pair in test.addedSkipairs">
                <div>{{ pair._key }}</div>
                <span>{{ pair.product }}</span>
                <div>{{ pair.result }}</div>
            </div>
        </section>
    </div>
</template>

<script>
    import viewMixin from '../mixins/viewMixin';
    import query from '../groq/previousTest.groq?raw';
    import Header from '../components/Header.vue';
    import Information from '../components/Information.vue';
    import Banner from '../components/Banner.vue';

    export default {
        mixins: [viewMixin],

        async created() {
            console.log(this.$route.params.testSlug);

            await this.sanityFetchTest(query, {
                slug: this.$route.params.testSlug
            });
        },

        components: {
            Header,
            Information,
            Banner
        },

        computed: {
            testType(){
                if (this.test.snowdata.classic === true) {
                    return 'Klassisk'
                } else if (this.test.snowdata.skating === true) {
                    return 'Skøyting'
                } else {
                   return 'Skibytte'
                }
            }
        }
    }
</script>

<style>
    .test, .test__data, .test__results {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .test {
        font-family: var(--main-font);
        color: var(--second-color);
    }

    .test__data {
        margin: var(--margin-medium);
    }

    .test__results {
        height: 100vh;
        width: 50vw;
        color: var(--light);
        background-color: var(--second-color)
    }

    .test__results-skipairs {
        width: 0%;
        display: flex;
        justify-content: space-around;
    }

    .test__results-info {
        width: 50%;
    }
</style>