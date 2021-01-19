
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state ={
	allRoles : [],
	token:'',
	user:{
		id:'',
		name:'',
		email:'',
		roles:[],
		isSuspended:'',
		permission: [],
		iat:'',
		exp:'',
		team: {
			id:'',
			name:''
		}
	},
	userList:{
		id: '',
		userName: '',
		password:'',
		name: '',
		department: '',
		email: '',
		roles: [],
		isSuspended: Boolean
	},
	department:'',
	permission: []
};

const actions = {
	setAllRoles({commit}, data){
		commit("SET_ALL_ROLES", data)
	},
	setToken ({commit}, token){
		commit('SET_TOKEN', token)
	},
	setUser ({commit}, data) {
		commit('SET_USER', data)
	},
	setPermission({commit}, data) {
		commit("SET_PERMISSION", data)
	},
	setUserListAll({commit}, data) {
		commit("SET_USER_LIST_ALL", data)
	}
};

const mutations = {
	SET_ALL_ROLES ( state , data ) {
		state.allRoles = data
	},
	SET_TOKEN (state, payload){
		state.token = payload
	},
	SET_USER (state, payload){
		state.user = payload
	},
	SET_PERMISSION(state, data) {
		state.permission = data
	},
	SET_USER_LIST_ALL(state, data){
		state.userList = data
	}
};

const getters = {
	getAllRoles : state => state.allRoles,
	getToken: state => state.token,
	getUserLogin: state => state.user,
	getPermission: state => state.permission,
	getUserListById: (state) => (id) => {
		return state.userList.find(userList => userList.id === id)
	},
};

export default {
	state,
	actions,
	mutations,
	getters
}
