import Vue from 'vue';
import Vuex from 'vuex';
import { instance as http } from '.././utils/http.js';
Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        menu: [],
        group: [],
        table: []
    },
    mutations: {
        updateMenu(state, data) {
            state.menu = data.data;
        },
        updateGroup(state, payload) {
            state.group = payload
        },
        updateTable(state, payload) {
            state.table = payload
        },
        deleteItem(state, payload){

        }
    },
    actions: {//通过dispatch来触发一个action
        fetchMenu({ commit }) {
            http.get('/server/menu.json').then(res => {
                // this.menu = res.data;
                commit('updateMenu', res);
            })
        },
        fetchGroup(store) {
            http.get('/server/group.json').then(res => {
                store.commit('updateGroup', res.orgs)
            })
        },
        fetchTable({ commit, state }, payload) {
            http.get('/server/user.json').then(res => {
                commit('updateTable',res.userList)
            })
        },
        deleteItem({commit},payload){
            commit('deleteItem',payload)
        }
    },
    getters: {
        filterGroup(state) {
            return (filter) => {
                if (filter) {
                    let res = state.group.filter((item) => {
                        console.log(item)
                        return item.ORGNAME.indexOf(filter) > -1 || item.FORGNAME.indexOf(filter) > -1
                    })
                    return res
                } else {
                    return state.group
                }
            }
        }
    },
    modules: {}
})
export default store;  