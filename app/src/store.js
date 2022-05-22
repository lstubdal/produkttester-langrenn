export default {
    state() {
        return {
            rounds: [],
            totalResults: null,
            roundIndex: 0
        }
    },

    getters: {
        getNextRound(state) {
            return state.rounds[state.roundIndex-1] // use roundIndex to access current round
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
        
        addTotalResults(state, currentResults) {
            if (firstRound()) { 
                state.totalResults = currentResults;

            } else {
                if (state.roundIndex === 1) {
                    currentResults.forEach(pair => {    //iterate new round values
                        if (pair.result > 0 && isEven(pair._key)) {
                            console.log(    'total result in last loop FIRST', state.totalResults)
                            state.totalResults[pair._key -2].result += pair.result; // add value to 'looserpair'
                            console.log(    'total result in last loop FIRST', state.totalResults)

                        } else {
                            if (pair.result > 0 && !isEven(pair._key)) {
                                state.totalResults[pair._key].result += pair.result
                                console.log('ROUND INDEX', state.roundIndex)
                            }
                        }
                      
                    })
                }
                
                 // last round
                else {
                   if (lastRound(currentResults)) {
                    currentResults.forEach(pair => {
                        if (pair.result !== 0 ) {
                            console.log(    'total result in last loop', state.totalResults)
                            const winnerKey = parseInt(pair._key) 
                            const [firstPair, secondPair] = currentResults  // access both pairs to compare key value
                            const lowestKey = Math.min(firstPair._key, secondPair._key) 
    
                            // add current result to all pairs in totalResults over winnerkey (for difference)
                            if (winnerKey !== lowestKey) {
                                console.log('before', state.totalResults[7].result)
                                for (let index = winnerKey; index <= state.totalResults.length; index++) {
                                    state.totalResults[index-1].result += pair.result
    
                                   /*  if (index === 7) {
                                        console.log('after', state.totalResults[index].result)
                                        continue
    
                                    } */
    
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