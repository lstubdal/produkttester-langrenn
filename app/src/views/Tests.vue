<template>
    <div v-if="loading"> LOADING DATA </div>
    <div v-else v-for="test in tests">{{ test }}</div>
</template>

<script>
    import query from '../groq/tests.groq?raw' // read document as it is
    import viewMixins from '../mixins/viewMixins.js'

    export default {
        mixins: [viewMixins],

        async created() {
           await this.sanityFetchTest(query);
        },

        computed: {
            tests() {
                return this.$store.getters.getTests;
            }
        }
    }
</script>

<style>
</style>
