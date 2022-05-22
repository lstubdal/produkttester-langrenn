export default {
    state() {
        return {
            rounds: [],
            totalResults: null,
            roundIndex: 0,
            testtId: ''
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
            return state.testtId;
        }
    },

    mutations: {
        setNewTestData() {
            // logic here
        },

        addNewRound(state, nextRound) {
            state.rounds.push(nextRound);
        },
        
        // dele opp i mindre funksjoner => if else round i actions?
        addTotalResults(state, currentResults) {
            if (firstRound()) { 
                state.totalResults = currentResults;

            } else {
                if (state.roundIndex === 1) {
                    currentResults.forEach(pair => {    //iterate new round values
                        if (pair.result > 0 && isEven(pair._key)) {
                            state.totalResults[pair._key -2].result += pair.result; // add value to 'looserpair'
                        } else {
                            if (pair.result > 0 && !isEven(pair._key)) {
                                state.totalResults[pair._key].result += pair.result
                            }
                        } 
                    })
                }
                
                else { // last round
                   if (lastRound(currentResults)) {
                    currentResults.forEach(pair => {
                        if (pair.result !== 0 ) {
                            const winnerKey = parseInt(pair._key) 
                            const [firstPair, secondPair] = currentResults  // access both pairs to compare key value
                            const lowestKey = Math.min(firstPair._key, secondPair._key) 
                            
                            // add difference from winnerpair to skiapirs with key > winnerkey
                            if (winnerKey !== lowestKey) {
                                for (let index = winnerKey; index <= state.totalResults.length; index++) {
                                    state.totalResults[index-1].result += pair.result
                                }
                             // add difference from winnerpair to skiapirs with key > winnerkey 
                            } else {
                                for (let index = 4; index < state.totalResults.length; index--) {
                                    console.log(pair.result);
                                    
                                    if (index === 0) {
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

            function lowerKeyValue(pair) {
                
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