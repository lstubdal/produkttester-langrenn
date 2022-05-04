import sanity from "../sanity";

export default {
    data() {
        return {
            loading: true,
            result: null
        }
    },

    methods: {
        async sanityFetchTest(query) {
            this.result = await sanity.fetch(query);
            this.$store.dispatch('updateTests', this.result);
            this.loading = false;
        }
    }
}