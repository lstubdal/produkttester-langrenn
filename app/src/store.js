import tester from './modules/tester.js';

export default {
    state() {
        return {
            testId: ''
        }
    },

    getters: {
        getTestId(state) {
            return state.testId;
        }
    },

    mutations: {
        addTestId(state, id) {
            state.testId = id;
        }
    },

    actions: {
        setTestId({ commit}, id) {
            commit('addTestId', id);
        } 
    },

    modules: {
        tester
    }
}