export default {
    state() {
        return {
            rounds: [],
            totalResults: null,
            roundCount: 0
        }
    },

    getters: {
        getNextRound(state) {
            return state.rounds[state.roundCount]
        },
        
        getTotalResults(state) {
            return state.totalResults;
        }
    },

    mutations: {
        setNewTestData() {
            // logic here
        },

        addNewRound(state, nextRound) {
            state.rounds.push(nextRound);
        },
        
        addTotalResult(state, currentResult) {
            if (state.totalResult === null) { // add results from first round
                state.totalResult = currentResult;
            } /* else {

                const skipairToUpdate = state.totalResult.find(skipair => skipair._key === key);
                console.log('skipair to update', skipairToUpdate)


            } */
            
        },

        increaseRound(state) {
            state.roundCount += 1
        }
    },

    actions: {
        // create muitation (commit) ?
        updateNewTestData({ state }, { name, place, date, temperature, snowdata, skipairs }) {
            state.newTestData = {
                name: name,
                place: place,
                date: date,
                temperature: temperature,
                snowdata: snowdata,
                skipairs: skipairs
            }
            console.log('new test data', this.newTestData)
        },

        updateNextRound({ state, commit }, nextRound) {
            commit('addNewRound', nextRound);
            console.log('updated rounds array', state.rounds);
        },

        updateTotalResults({ state, commit }, currentResults) {
            commit('addTotalResults', currentResults)
            console.log('total RESULTS STORE', state.totalResults)
        },
        
        increaseRoundCount({ commit }) {
            commit('increaseRound');
        }
    }
}