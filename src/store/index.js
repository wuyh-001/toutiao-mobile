import Vue from 'vue'
import Vuex from 'vuex';

import {setItem,getItem} from '@/utils/storage';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:getItem('user')
  },
  mutations: {
    setUser(state,data){
      state.user=data;
      setItem('user',data)
    }
  },
  actions: {
  },
  modules: {
  }
})
