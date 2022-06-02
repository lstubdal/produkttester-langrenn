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
                Then add looserpair value to last rounds looser on index+1 || index-1 */

                if (state.roundIndex > 0 && !lastRound(currentResults)) { // < 0 update
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
                                const midpoint = state.totalResults.length / 2; 

                                // if key is larger than lowest key, add difference to skiapirs with larger key
                                if (looserKey !== lowestKey) {

                                    // if looserkey is the highest key (selected number of pairs is 8 or 4)
                                    if (looserKey === 8 || looserKey === 4) {
                                        for (let index = midpoint; index <= state.totalResults.length; index++) {
                                            state.totalResults[index].result += pair.result;
                                            if (index === 6 || index === 2) {
                                                return
                                            }
                                        }
                                    } else {
                                        // add difference to all skiapirs above looserkey
                                        for (let index = looserKey; index <= state.totalResults.length; index++) {
                                            state.totalResults[index].result += pair.result
                                        } 
                                    }

                                } else {
                                    // if looserpair key is 1, find midpoint of array and difference to the skipairs half of the pairs in array with lowst key
                                    if (looserKey === 1) {
                                        for (let index = midpoint; index <= state.totalResults.length; index--) {
                                            if (index === 1) { 
                                                return
                                            }
                                            state.totalResults[index-1].result += pair.result
                                        }

                                    } else {

                                        // add difference to skipairs with key below looserkey
                                        for (let index = looserKey; index <= state.totalResults.length; index--) {
                                            if (index === 1) { 
                                                return
                                            }
                                            state.totalResults[index-2].result += pair.result
                                        }
                                    }
                                    
                                }  
                            } 
                        })      
                    }
                }
            }

             
            /*  if key is even, add differnece to skiapir with key -1 
                f key is odd, add differnece to skiapir with key +1 */
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

        setResults(state, results) {
            state.cart = results;
        },
    },

    actions: {
        updateNextRound({ commit}, nextRound) {
            commit('addNewRound', nextRound);
        },

        updateTotalResults({ commit, dispatch }, currentResults) {
            commit('addTotalResults', currentResults);
            dispatch('updateResultsLocalStorage');
        },
        
        increaseRoundIndex({ commit }) {
            commit('increaseRound');
        },

        updateResultsLocalStorage({ state }){
            window.localStorage.setItem('totalResults', JSON.stringify(state.totalResults));  // update totalresult per round
        }
    }
}