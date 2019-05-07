import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        idx:null,
        checked:false,


      },
    mutations:{
        comleteitem(state,idx){
            state.idx=idx
                // console.log(state)
        }
    },


})