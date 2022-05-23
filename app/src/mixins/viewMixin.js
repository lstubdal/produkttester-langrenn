import sanity from "../sanity.js";

export default {
    data() {
        return {
            loading: true,
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
                            this.$router.push({ name: 'results', params: 'runde-2' })
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
                            console.log('TEST UPDATED')
                        }))

            }
        },

/*         updateTotalResultsSanity(testID, resultsArray, index) {
             sanity.patch(testID) 
                   .insert('replace', `addedSkipairs[${index}]`, [{
                       _key: resultsArray[index]._key,
                       product: resultsArray[index].product,
                       result: resultsArray[index].result
                    }])
                   .commit() 
                   .then((updatedResult) => {
                       console.log('oppdatert!', updatedResult)
                   })
                   .catch((err) => {
                       console.log('feil!!', err);
                   })
  
        } */
    }
}