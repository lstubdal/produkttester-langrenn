import sanity from "../sanity.js";

export default {
    data() {
        return {
            loading: true,
            updated: false,
            tests: null
        }
    },

    methods: {
        async sanityFetchTest(query, params) {
            this.tests = await sanity.fetch(query, params);
            this.loading = false;
        },

        createOrUpdateTest(id, name, place, date, temperature, snowdata, numberOfpairs, addedSkipairs, slug) {
            if (id === '') {
                const newTest = {
                    _type: 'test',
                    name: name,
                    place: place,
                    date: date,
                    temperature: temperature,
                    snowdata: snowdata,
                    numberOfPairs: numberOfpairs,
                    addedSkipairs: addedSkipairs,
                    slug: {
                        current: slug
                    }
                }
                sanity.create(newTest)
                        .then((res => {
                            this.$router.push({ name: 'tester' }) // go to tester page AFTER test is created
                        }))
            } else {
                const updateTest = {
                    _type: 'test',
                    _id: id,
                    name: name,
                    place: place,
                    date: date,
                    temperature: temperature,
                    snowdata: snowdata,
                    numberOfPairs: numberOfpairs,
                    addedSkipairs: addedSkipairs,
                    slug: {
                        current: slug
                    }
                }
                
                sanity.createOrReplace(updateTest)
                        .then((res => {
                            this.updated = true;
                        }))

            }
        }
    }
}