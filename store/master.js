import Vue from "vue";
import Vuex from "vuex";
// import _ from "lodash";

const state = {
	partnersLists: [],
	hashtagList: [],
	customerTypeList: [],
	brandList: [],
	applicationList: [],
	categoryIssueList: [],
	teamList: [],
	subjectList: [],
	mainList:[],
	roleLists: [],
	statusLists: [],
	contactGarageLists: []
};

const actions = {
	setPartnersLists({commit}, data){
		commit("SET_PARTNER_LIST", data)
	},
	setContactedGarage({commit},data){
		commit("SET_CONTACT_GARAGE",data)
	},
	setHashtagList({commit}, data){
		commit("SET_HASHTAG_LIST", data)
	},
	setCustomerTypeList({commit}, data){
		commit("SET_CUSTOMERTYPE_LIST", data)
	},
	setBrandList({commit}, data){
		commit("SET_BRAND_LIST", data)
	},
	setApplicationList({commit}, data){
		commit("SET_APPLICATION_LIST", data)
	},
	setCategoryIssueList({commit}, data){
		commit("SET_CATEGORY_ISSUE_LIST", data)
	},
	setTeamList({commit}, data){
		commit("SET_TEAM_LIST", data)
	},
	setSubjectList({commit}, data){
		commit("SET_SUBJECT_LIST", data)
	},
	setMainSubjectList({commit}, data){
		commit("SET_MAIN_SUBJECT_LIST", data)
	},
	setRoleList({commit}, data){
		commit("SET_ROLE_LIST", data)
	},
	setStatusList({commit}, data){
		commit("SET_STATUS_LIST", data)
	}
};

const mutations = {
	SET_PARTNER_LIST ( state , data ) {
		state.partnersLists = data
	},
	SET_HASHTAG_LIST ( state , data ) {
		state.hashtagList = data
	},
	SET_CUSTOMERTYPE_LIST ( state , data ) {
		state.customerTypeList = data
	},
	SET_BRAND_LIST ( state , data ) {
		state.brandList = data
	},
	SET_APPLICATION_LIST ( state , data ) {
		state.applicationList = data
	},
	SET_CATEGORY_ISSUE_LIST ( state , data ) {
		state.categoryIssueList = data
	},
	SET_TEAM_LIST ( state , data ) {
		state.teamList = data
	},
	SET_SUBJECT_LIST ( state , data ) {
		state.subjectList = data
	},
	SET_MAIN_SUBJECT_LIST( state , data ) {
		state.mainList = data
	},
	SET_ROLE_LIST( state , data ) {
		state.roleLists = data
	},
	SET_STATUS_LIST( state , data) {
		state.statusLists = data
	},
	SET_CONTACT_GARAGE( state, data) {
		state.contactGarageLists = data
	}
};

const getters = {
	getPartnersList : state => state.partnersLists,
	getHashtagList: state => state.hashtagList,
	getCustomerTypeList: state => state.customerTypeList,
	getBrandList: state => state.brandList,
	getApplicationList: state => state.applicationList,
	getCategoryIssueList: state => state.categoryIssueList,
	getTeamList: state => state.teamList,
	getSubjectList: state => state.subjectList,
	getMainList: state => state.mainList,
	getRoleList: state => state.roleLists,
	getStatusList: state => state.statusLists,
	getContactGarageList: state => state.contactGarageLists
};

export default {
	state,
	actions,
	mutations,
	getters
}
