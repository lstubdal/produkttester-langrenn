export default {
    state() {
        return {
            newTestData: {},
            tests: [],
            waxTechWorking: false
        }
    },

    getters: {
        getTests(state) {
            return state.tests;
        },

        getTesterStatus(state) {
            return state.testerWorking;
        },

        getwaxTechStatus(state) {
            return state.waxTechWorking;
        },

        getNewTestData(state) {
            return state.newTestData;
        },

        getTestname(state) {
            return state.name
        },

        getPlace(state) {
            return state.place 
        },

        getTemperature(state) {
            return state.temperature
        }
    },

    mutations: {
        setTests(state, tests) {
            state.tests = tests;
        },

        setNumberOfSkipairs(state, number) {
            state.numberOfSkipairs = number
        },

        setTestname(state, testname) {
            state.name = testname
        },

        setPlace(state, place) {
            state.palace = place
        },

        setTemperature(state, temperature) {
            state.temperature = temperature
        },

        addNewTest(state, test) {
            state.tests.push(test);
        },

        changeWaxTechStatus(state) {
            return state.waxTechWorking = !state.waxTechWorking;
        }
    },

    actions: {
        updateTests({ commit }, fetchedTests) {
            commit('setTests', fetchedTests)
        },

        updateNumberOfSkipairs({ commit }, number) {
            commit('setNumberOfSkipairs', number);
            // remember local storage
        },

        updateTestname({ commit}, testname ){
            commit('setTestname', testname);
        },

        updatePlace({ commit}, place) {
            commit('setPlace', place);
        },

        updateTemperature({commit}, temperature) {
            commit('setTemperature', temperature)
        },

        updateWaxTechStatus({ commit, state}) {
            commit('changeWaxTechStatus');
            console.log(state.waxTechWorking)
        },
        // create muitation (commit)
        updateNewTestData({ state, commit }, { name, place, date, temperature, snowdata, skipairs }) {
            state.newTestData = {
                name: name,
                place: place,
                date: date,
                temperature: temperature,
                snowdata: snowdata,
                skipairs: skipairs
            }

            console.log('new test data', this.newTestData)
            
            /* commit('addNewTest', state.newTestData);
            console.log('tests', this.tests); */

        }

        
    }
}