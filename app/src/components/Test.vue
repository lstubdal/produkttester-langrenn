<template>
    <LoadingScreen v-if="loading" />
    <div v-else class="test">
        <Header :page="'previousTest'" />
        <Information :test="tests" :page="'previousTest'" class="test__information" />
        <Banner :bannerPage="'previousTest'" :bannerTitle="tests.name" />

        <section class="test__snowdata">
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5036 21C10.3045 21 10.1136 20.9309 9.97289 20.8078C9.83215 20.6847 9.75308 20.5178 9.75308 20.3438V18.6467L8.78345 19.4959C8.64253 19.6189 8.45148 19.688 8.25233 19.6879C8.05318 19.6877 7.86224 19.6184 7.72152 19.4952C7.5808 19.372 7.50182 19.2049 7.50196 19.0308C7.5021 18.8566 7.58135 18.6897 7.72227 18.5666L9.75308 16.7908V11.6366L4.6498 14.2131L3.90532 16.6412C3.85357 16.8093 3.72756 16.9526 3.55501 17.0395C3.38246 17.1264 3.1775 17.1498 2.98523 17.1045C2.79295 17.0592 2.62911 16.9491 2.52975 16.7982C2.43039 16.6473 2.40364 16.4681 2.45539 16.2999L2.81112 15.1423L1.13003 15.9902C0.957755 16.0758 0.753726 16.0984 0.562472 16.053C0.371217 16.0076 0.208264 15.8979 0.109173 15.7478C0.0100816 15.5978 -0.0171028 15.4195 0.0335518 15.252C0.0842064 15.0844 0.208588 14.9412 0.379552 14.8536L2.06063 14.0057L0.73378 13.6946C0.638576 13.6722 0.549352 13.6336 0.471201 13.5811C0.39305 13.5285 0.327503 13.463 0.278303 13.3883C0.229102 13.3136 0.197212 13.2311 0.184453 13.1456C0.171694 13.0602 0.178315 12.9733 0.20394 12.8901C0.229564 12.8068 0.273689 12.7288 0.333796 12.6605C0.393902 12.5921 0.468813 12.5348 0.554252 12.4918C0.63969 12.4488 0.733982 12.4209 0.831745 12.4097C0.929508 12.3986 1.02883 12.4043 1.12403 12.4268L3.89781 13.0764L9.0026 10.5L3.89931 7.92356L1.12253 8.57325C0.931508 8.61488 0.729428 8.58921 0.559848 8.50177C0.390268 8.41434 0.266769 8.27213 0.215971 8.10581C0.165172 7.9395 0.191143 7.76239 0.288285 7.61266C0.385426 7.46293 0.545959 7.35257 0.735281 7.30537L2.06063 6.99431L0.379552 6.14644C0.293513 6.10366 0.217999 6.04643 0.157359 5.97803C0.0967189 5.90963 0.0521498 5.83141 0.0262179 5.74789C0.000285875 5.66437 -0.00649685 5.57719 0.0062603 5.49136C0.0190175 5.40554 0.0510626 5.32277 0.10055 5.24782C0.150038 5.17287 0.215992 5.10721 0.294613 5.05464C0.373235 5.00207 0.462972 4.96362 0.558658 4.9415C0.654344 4.91938 0.754089 4.91402 0.85215 4.92575C0.950211 4.93747 1.04465 4.96604 1.13003 5.00981L2.81112 5.85769L2.45539 4.69875C2.42808 4.61498 2.42011 4.5273 2.43195 4.44081C2.44379 4.35433 2.47521 4.27077 2.52436 4.19501C2.57351 4.11925 2.63942 4.0528 2.71824 3.99954C2.79706 3.94628 2.88722 3.90728 2.98346 3.8848C3.0797 3.86233 3.18009 3.85683 3.27878 3.86863C3.37748 3.88043 3.4725 3.90929 3.5583 3.95353C3.64411 3.99778 3.71898 4.05651 3.77856 4.12632C3.83814 4.19613 3.88123 4.27561 3.90532 4.36013L4.6483 6.78694L9.75308 9.36337V4.20919L7.72227 2.43337C7.6525 2.37245 7.59713 2.3001 7.55933 2.22045C7.52152 2.14081 7.50203 2.05544 7.50196 1.96921C7.50189 1.88299 7.52125 1.79759 7.55892 1.7179C7.59659 1.63822 7.65184 1.5658 7.72152 1.50478C7.7912 1.44377 7.87394 1.39535 7.96502 1.36229C8.05609 1.32924 8.15372 1.3122 8.25233 1.31214C8.35094 1.31207 8.4486 1.329 8.53973 1.36194C8.63086 1.39488 8.71368 1.4432 8.78345 1.50413L9.75308 2.35331V0.65625C9.75308 0.482202 9.83215 0.315282 9.97289 0.192211C10.1136 0.0691404 10.3045 0 10.5036 0C10.7026 0 10.8935 0.0691404 11.0342 0.192211C11.175 0.315282 11.254 0.482202 11.254 0.65625V2.35331L12.2252 1.50413C12.3661 1.38107 12.5571 1.31201 12.7563 1.31214C12.9554 1.31226 13.1464 1.38156 13.2871 1.50478C13.4278 1.62801 13.5068 1.79507 13.5067 1.96921C13.5065 2.14336 13.4273 2.31032 13.2863 2.43337L11.254 4.20919V9.36337L16.3573 6.78694L17.1018 4.35881C17.1536 4.19068 17.2796 4.04741 17.4521 3.96053C17.6247 3.87364 17.8296 3.85025 18.0219 3.8955C18.2142 3.94075 18.378 4.05094 18.4774 4.20183C18.5767 4.35271 18.6035 4.53193 18.5517 4.70006L18.1975 5.85769L19.8786 5.00981C20.0509 4.92416 20.2549 4.90157 20.4461 4.94698C20.6374 4.99238 20.8004 5.10209 20.8994 5.25217C20.9985 5.40225 21.0257 5.5805 20.9751 5.74804C20.9244 5.91558 20.8 6.0588 20.6291 6.14644L18.948 6.99431L20.2733 7.30537C20.4656 7.35063 20.6295 7.46082 20.7288 7.6117C20.8282 7.76259 20.8549 7.94181 20.8032 8.10994C20.7514 8.27807 20.6254 8.42134 20.4529 8.50822C20.2803 8.59511 20.0754 8.6185 19.8831 8.57325L17.1093 7.92356L12.0045 10.5L17.1078 13.0764L19.8831 12.4268C20.0754 12.3817 20.2802 12.4052 20.4526 12.4922C20.6251 12.5793 20.7509 12.7226 20.8024 12.8907C20.854 13.0588 20.827 13.238 20.7275 13.3888C20.628 13.5395 20.4641 13.6495 20.2718 13.6946L18.9465 14.0057L20.6276 14.8536C20.7985 14.9412 20.9229 15.0844 20.9736 15.252C21.0242 15.4195 20.997 15.5978 20.8979 15.7478C20.7989 15.8979 20.6359 16.0076 20.4446 16.053C20.2534 16.0984 20.0494 16.0758 19.8771 15.9902L18.196 15.1423L18.5502 16.3013C18.5775 16.385 18.5855 16.4727 18.5737 16.5592C18.5618 16.6457 18.5304 16.7292 18.4813 16.805C18.4321 16.8808 18.3662 16.9472 18.2874 17.0005C18.2086 17.0537 18.1184 17.0927 18.0222 17.1152C17.9259 17.1377 17.8255 17.1432 17.7268 17.1314C17.6281 17.1196 17.5331 17.0907 17.4473 17.0465C17.3615 17.0022 17.2866 16.9435 17.2271 16.8737C17.1675 16.8039 17.1244 16.7244 17.1003 16.6399L16.3573 14.2131L11.254 11.6366V16.7908L13.2848 18.5666C13.4258 18.6897 13.505 18.8566 13.5052 19.0308C13.5053 19.2049 13.4263 19.372 13.2856 19.4952C13.1449 19.6184 12.9539 19.6877 12.7548 19.6879C12.5556 19.688 12.3646 19.6189 12.2237 19.4959L11.2525 18.6467V20.3438C11.2525 20.5178 11.1735 20.6847 11.0327 20.8078C10.892 20.9309 10.7011 21 10.5021 21H10.5036Z" fill="#7B0303"/>
            </svg>

            <h3>Snødata</h3>
            <div class="test__snowdata-type">-{{ testType }}-</div>
            <div class="test__snowdata-data">
                <div v-if="testType === 'Klassisk' || testType === 'Skibytte'">I spor: {{ tests.snowdata.inTrack }}</div>
                <div v-if="testType === 'Skøyting' || testType === 'Skibytte'">Utenfor spor: {{ tests.snowdata.outsideTrack }}</div>
            </div>
        </section>

        <section class="test__results">
            <div class="test__headline">
                <span>Nr. </span>
                <span>Produkt</span>
                <span>Diff</span>
            </div>

            <div class="test__results-skipairs" v-for="pair in tests.addedSkipairs">
                <div class="test__results-skipair">
                    <div>{{ pair._key }}</div>
                    <span>{{ pair.product }}</span>
                    <div>{{ pair.result }}</div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import LoadingScreen from '../components/LoadingScreen.vue';
    import Header from '../components/Header.vue';
    import Information from '../components/Information.vue';
    import Banner from '../components/Banner.vue';
    import sanityMixin from '../mixins/sanityMixin.js';
    import testMixin from '../mixins/testMixin.js'
    import query from '../groq/previousTest.groq?raw';

    export default {
        mixins: [sanityMixin, testMixin],

        async created() {
            // fetch test with matching slug
            await this.sanityFetchTest(query, {
                slug: this.$route.params.testSlug
            });
        },

        components: {
            LoadingScreen,
            Header,
            Information,
            Banner
        },

        computed: {
            testType(){
                if (this.tests.snowdata.classic === true) {
                    return 'Klassisk'
                } else if (this.tests.snowdata.skating === true) {
                    return 'Skøyting'
                } else {
                   return 'Skibytte'
                }
            },

            slug() {
                return this.$route.params.testSlug;
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

    .test__snowdata {

        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin: var(--margin-large) var(--margin-medium);
    }

    .test__snowdata h3 {
        font-size: 1.7em;
    }

    .test__snowdata-data {
        display: flex;
        flex-direction: column;
        font-size: 1.3em;
        padding: var(--padding-small);
    }

    .test__snowdata-type {
        font-size: 1.3em;
    }

    .test__results {
        width: 100%;
        color: var(--light);
        background-color: var(--second-color);
        padding: var(--padding-medium);
    }

    .test__results-skipairs, .test__results-skipair {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }

    .test__results-skipair {
        padding: var(--padding-small);
        font-size: 1.7em;
    }

    .test__results-info {
        width: 50%;
    }

    .test__headline {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 1.5em;
        background-color: var(--light);
        color: var(--second-color);
        padding: 0.5%;
    }

    @media screen and (max-width: 800px) {
        .test__results {
            /* color: var(--light);
            background-color: var(--second-color) */
        }
    }
</style>