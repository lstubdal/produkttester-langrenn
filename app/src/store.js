export default {
    state() {
        return {
            waxTechWorking: false,
            /* newTestData: {},
            tests: [], */
        }
    },

    getters: {
        getWaxTechStatus(state) {
            return state.waxTechWorking;
        },

    },

    mutations: {
        changeWaxTechStatus(state) {
            return state.waxTechWorking = !state.waxTechWorking;
        }
    },

    actions: {
        updateWaxTechStatus({ commit, state}) {
            commit('changeWaxTechStatus');
            console.log(state.waxTechWorking)
        },

        updateNumberOfSkipairs({ commit }, number) {
            commit('setNumberOfSkipairs', number);
            // remember local storage
        },

        updateTests({ commit }, fetchedTests) {
            commit('setTests', fetchedTests)
        },

        
        // create muitation (commit) ?
        updateNewTestData({ state}, { name, place, date, temperature, snowdata, skipairs }) {
            state.newTestData = {
                name: name,
                place: place,
                date: date,
                temperature: temperature,
                snowdata: snowdata,
                skipairs: skipairs
            }
            console.log('new test data', this.newTestData)

        }

        
    }
}