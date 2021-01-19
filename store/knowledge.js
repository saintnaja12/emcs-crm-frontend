import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
	contentDetail:{
		id: '',
		category: '',
		topic:'',
		content: '',
		refNo: '',
		highlight: '',
		view: '',
		thumbnail: {
			success: '',
			link: '',
			alt: ''
		},
		file: {
			success: '',
			link: '',
			alt: ''
		},
		createdAt: '',
		createdBy: {
			id: '',
			name: '',
			username: '',
			team: {
				id: '',
				name: ''
			}
		},
		updatedAt: '',
		updatedBy: {
			id: '',
			name: '',
			username: '',
			team: {
				id: '',
				name: ''
			}
		},
	},
};
const actions = {
	contentById ({commit}, data) {
		commit("GET_CONTENT_BY_ID", data)
	},
};
const mutations = {
	GET_CONTENT_BY_ID (state, data) {
		state.contentDetail = data
	},
};
const getters = {
	getContentById: state => state.contentDetail,
};
export default {
    state,
    actions,
    mutations,
    getters
}
