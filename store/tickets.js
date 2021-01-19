import Vue from 'vue';
import VueVisible from 'vue-visible';

Vue.use(VueVisible);
const state = {
	historyList:[],
    searchContactsdefault: {
        firstname: "",
        lastname: "",
        gender: "",
        email: "",
        mobile: "",
        position: "",
        company: "",
        province: "",
        district: "",
        subDistrict: "",
        zipCode: "",
        address: "",
        remark: "",
        createAt: "",
        createBy: "",
        updateAt: "",
        updateBy: "",
        used: "",
    },
    searchContacts: [],
    ticketList: [],
	searchById:{},
	overTicketSlaList:{}
};
const actions = {
    searchContact({ commit }, data) {
        commit("SEARCH_CONTACT", data)
    },
    getTicket({ commit }, data) {
        commit("GET_TICKET", data)
    },
	getSite({commit}, data){
    	commit("GET_SITE_BY_ID", data)
	},
	setHistory({commit}, data){
		commit("GET_HISTORY", data)
	},
	setTicketOverList({commit}, data) {
		commit("SET_TICKET_OVER_LIST", data)
	},
};
const mutations = {
    SEARCH_CONTACT(state, data) {
        state.searchContactsdefault = data
    },
    GET_TICKET(state, data) {
        state.ticketList = data
    },
	GET_HISTORY(state, data) {
		state.historyList = data
	},
	GET_SITE_BY_ID(state, data) {
    	state.searchById = data
	},
	SET_TICKET_OVER_LIST(state, payload) {
		state.overTicketSlaList = []
		payload.forEach(data => {
				if (parseFloat(data.overSla) > 0) {
					const keyId = _.get(data, 'id', null)
					Vue.set(state.overTicketSlaList, keyId, data)
				}
			}
		);
	},

};
const getters = {
    searchContact: state => state.searchContactsdefault,
    getTicket: state => state.ticketList,
	getSite: state => state.searchById,
	getHistory: state => state.historyList,
	getTicketOverSlaList: state => state.overTicketSlaList,
}
export default {
    state,
    actions,
    mutations,
    getters
}
