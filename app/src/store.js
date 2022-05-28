export default {
    state() {
        return {
            rounds: [],
            totalResults: null,
            roundIndex: 0,
            testId: ''
        }
    },

    getters: {
        getNextRound(state) {
            return state.rounds[state.roundIndex-1] // use roundIndex to access current round
        },
        
        getTotalResults(state) {
            return state.totalResults;
        },

        getTestId(state) {
            return state.testId;
        }
    },

    mutations: {
        setNewTestData() {
            // logic here
        },

        addNewRound(state, nextRound) {
            state.rounds.push(nextRound);
        },
        
        addTotalResults(state, currentResults) {
            if (firstRound()) { 
                state.totalResults = currentResults;

            } else {
                /* __MIDDLE ROUNDS__
                The looserspair for the middlerounds needs to add their difference value to the looserpairs for the first round, 
                to get correct total differencde from winnerskipair in the last round. 
                
                The skipairs are divided into testpairs of 2 skipairs.  That means that if the key of the looserpair is even, 
                the looserpair from last round must be on the index below, and the opisite for odd key.
                Then add looserpair value to last rounds looser on index+1 || index-1
                */
                if (state.roundIndex === 1) { // < 0 update
                    currentResults.forEach(pair => {    
                        if (pair.result > 0 && isEven(pair._key)) { 
                            state.totalResults[pair._key -2].result += pair.result; 
                        } else {
                            if (pair.result > 0 && !isEven(pair._key)) {
                                state.totalResults[pair._key].result += pair.result
                            }
                        } 
                    })
                } else { 
                    /* __LAST ROUND__
                        Add value from looserpair to other skipair, to calculate 
                        the difference from the winnerpair (always value: 0) */
                    if (lastRound(currentResults)) {
                        currentResults.forEach(pair => {
                            if (pair.result !== 0 ) { 
                                const looserKey = parseInt(pair._key) // find key for 'looser pair'
                                const [firstPair, secondPair] = currentResults  
                                const lowestKey = Math.min(firstPair._key, secondPair._key)  // find out if looserpair's key is > winnerpair's key

                                // if key is larger than lowest key, add difference to skiapirs with larger key
                                if (looserKey !== lowestKey) {
                                    for (let index = looserKey; index <= state.totalResults.length; index++) {
                                        state.totalResults[index].result += pair.result
                                    }
                                } else {
                                    // Find midpoint of array and add difference from looserpair to skiapirs with lower keys
                                    const midpoint = state.totalResults.length / 2; 
                                    for (let index = midpoint; index < state.totalResults.length; index--) {
                                        console.log(pair.result);
                                        
                                        if (index === 1) {
                                            console.log('ferdig', state.totalResults)
                                            return
                                        }
                                        state.totalResults[index-1].result += pair.result
                                    }
                                }  
                         } 
                     })      
                    }
                 }
            }

            function isEven(key) {
                return key % 2 === 0;
            }

            function firstRound() {
                return state.totalResults === null;
            }

            function lastRound(currentResults) {
                return currentResults.length === 2;
            }
        },

        increaseRound(state) {
            state.roundIndex += 1
        },

        addTestId(state, id) {
            state.testId = id;
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
        },

        setTestId({state, commit}, id) {
            commit('addTestId', id);
        },

        updateNextRound({ state, commit }, nextRound) {
            commit('addNewRound', nextRound);
            console.log('roundsss', state.rounds)
        },

        updateTotalResults({ state, commit }, currentResults) {
            commit('addTotalResults', currentResults)
            console.log('TOTAL RESULTS STORE', state.totalResults)    
        },
        
        increaseRoundIndex({ state,  commit }) {
            commit('increaseRound');
            console.log('round', state.roundIndex)
        },

        
    }
}