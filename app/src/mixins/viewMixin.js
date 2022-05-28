import sanity from "../sanity.js";

export default {
    data() {
        return {
            loading: true,
            updated: false,
            test: null
        }
    },

    methods: {
        async sanityFetchTest(query, params) {
            this.test = await sanity.fetch(query, params);
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
                            console.log(`test was created, document ID is ${res._id}`)
                            this.$router.push({ name: 'tester' })
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
                            console.log(`test updated ${res._id}`)
                            this.updated = true;

                            // Send user back to frontpage after 10 second if no interaction within this timespan
                            setTimeout(() => {
                                this.$router.push({ name: 'home' })
                            }, 10000) 
                        }))

            }
        }
    }
}