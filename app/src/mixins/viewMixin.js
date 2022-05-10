import sanity from "../sanity";

export default {
    data() {
        return {
            loading: true,
            test: null
        }
    },

    methods: {
        async sanityFetchTest(query) {
            this.test = await sanity.fetch(query);
            this.loading = false;
        },

        createNewTest(name, place, date, temperature, snowdata, numberOfpairs, addedSkipairs, slug) {
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

            /* OBS! REMEBER TO CHECK IF NOT EXIST */

            sanity.create(newTest)
                  .then((res => {
                      console.log(`test was created, document ID is ${res._id}`)
                  }))
        }
    }
}