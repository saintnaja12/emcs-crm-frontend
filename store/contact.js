import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";
import moment from "moment";

Vue.use(Vuex);

const state = {
	user: [],
	pageCompanyView: true,
	pageCompanyCreate: false,
	pagePeopleInCompanyView: true,
	pagePeopleInCompanyCreate: false,
	pagePersonalView: true,
	pagePersonalCreate: false,
	companyById: {
		id: '',
		companyName: '',
		branch: '',
		partner: [
			{
				id: '',
				name: ''
			}
		],
		phone1: '',
		phone2: '',
		phone3: '',
		phone4: '',
		phone5: '',
		customerType: {
			id: '',
			name: ''
		},
		brand: {
			id: '',
			name: ''
		},
		status:'',
		region: '',
		customerCode: '',
		serviceCode: '',
		taxId: '',
		fax: '',
		website: '',
		certAddress: {
			address: '',
			alley: '',
			subDistrict: '',
			district: '',
			province: '',
			zipCode: '',
		},
		otherAddress: '',
		invoiceAddress: '',
		country: '',
		note: '',
		file1: {
			success: '',
			data: {
				link: ''
			},
			alt: ''
		},
		file2: {
			success: '',
			data: {
				link: ''
			},
			alt: ''
		},
		file3: {
			success: '',
			data: {
				link: ''
			},
			alt: ''
		},
		file4: {
			success: '',
			data: {
				link: ''
			},
			alt: ''
		},
		file5: {
			success: '',
			data: {
				link: ''
			},
			alt: ''
		},
		createdAt: '',
		createdBy: {
			id: '',
			name: '',
			team : {
				id: '',
				name: ''
			}
		},
		updatedAt: '',
		updatedBy: {
			id: '',
			name: '',
			team : {
				id: '',
				name: ''
			},
			username: ''
		},
	},
	companyByTicketId: {
		id: '',
		companyName: '',
		branch: '',
		partner: [
			{
				id: '',
				name: ''
			}
		],
		phone1: '',
		phone2: '',
		phone3: '',
		phone4: '',
		phone5: '',
		customerType: {
			id: '',
			name: ''
		},
		brand: {
			id: '',
			name: ''
		},
		status:'',
		region: '',
		customerCode: '',
		serviceCode: '',
		taxId: '',
		fax: '',
		website: '',
		certAddress: {
			address: '',
			alley: '',
			subDistrict: '',
			district: '',
			province: '',
			zipCode: '',
		},
		otherAddress: '',
		invoiceAddress: '',
		country: '',
		note: '',
		file1: {
			success: '',
			data: {
				link: ''
			},
			alt: ''
		},
		file2: {
			success: '',
			data: {
				link: ''
			},
			alt: ''
		},
		file3: {
			success: '',
			data: {
				link: ''
			},
			alt: ''
		},
		file4: {
			success: '',
			data: {
				link: ''
			},
			alt: ''
		},
		file5: {
			success: '',
			data: {
				link: ''
			},
			alt: ''
		},
		createdAt: '',
		createdBy: {
			id: '',
			name: '',
			team : {
				id: '',
				name: ''
			}
		},
		updatedAt: '',
		updatedBy: {
			id: '',
			name: '',
			team : {
				id: '',
				name: ''
			},
			username: ''
		},
	},
	viewContact: [],
	peopleById: {
		id: '',
		firstName: '',
		lastName: '',
		position: '',
		branch:'',
		brand: {
			id: '',
			name: ''
		},
		customerType: {
			id: '',
			name: ''
		},
		partner:[
			{
				id: '',
				name: ''
			}
		],
		address: {
			address: '',
			alley: '',
			subDistrict: '',
			district: '',
			province: '',
			zipCode: ''
		},
		region: '',
		phone1: '',
		phone2: '',
		phone3: '',
		email: '',
		lineId: '',
		note: '',
		status:{
			id: '',
			name:''
		},
		updateBy: {
			id: '',
			name: '',
			username: '',
			team: {
				id: '',
				name: ''
			}
		},
		createdAt: '',
	},
	personalById: {
		id: '',
		address: {
			address: '',
			alley: '',
			subDistrict: '',
			district: '',
			province: '',
			zipCode: ''
		},
		firstName: '',
		lastName: '',
		position: '',
		company: '',
		branch: '',
		brand: {
			id: '',
			name: ''
		},
		customerType: {
			id: '',
			name: ''
		},
		phone1: '',
		phone2: '',
		phone3: '',
		email: '',
		lineId: '',
		note: '',
		status:{
			id: '',
			name: ''
		},
		partner: '',
		garage: '',
		createdAt: '',
		createdBy: {
			name: ''
		},
		updatedAt: '',
		updatedBy: {
			name: ''
		},
	},
	personalByTicketId: {
		id: '',
		address: {
			address: '',
			alley: '',
			subDistrict: '',
			district: '',
			province: '',
			zipCode: ''
		},
		firstName: '',
		lastName: '',
		position: '',
		company: '',
		branch: '',
		brand: {
			id: '',
			name: ''
		},
		customerType: {
			id: '',
			name: ''
		},
		phone1: '',
		phone2: '',
		phone3: '',
		email: '',
		lineId: '',
		note: '',
		status:{
			id: '',
			name: ''
		},
		partner: '',
		garage: '',
		createdAt: '',
		createdBy: {
			name: ''
		},
		updatedAt: '',
		updatedBy: {
			name: ''
		},
	},
	remarkCompany: {},
	remarkPersonal: {},
	remarkPeople: {},
};
const actions = {
	getContact({commit}, data) {
		commit("SET_CONTACT", data)
	},
	pageCompanyView({commit}, view) {
		commit("SET_PAGE_COMPANY_VIEW", view)
	},
	pageCompanyCreate({commit}, create) {
		commit("SET_PAGE_COMPANY_CREATE", create)
	},
	pagePeopleInCompanyView({commit}, view) {
		commit("SET_PEOPLE_IN_COMPANY_VIEW", view)
	},
	pagePeopleInCompanyCreate({commit}, create) {
		commit("SET_PEOPLE_IN_COMPANY_CREATE", create)
	},
	pagePersonalView({commit}, view) {
		commit("SET_PAGE_PERSONAL_VIEW", view)
	},
	pagePersonalCreate({commit}, create) {
		commit("SET_PAGE_PERSONAL_CREATE", create)
	},
	getViewContact({commit}, viewContact) {
		commit("GET_VIEWCONTACT", viewContact)
	},
	getCompanyById({commit}, data) {
		commit("GET_COMPANY_BY_ID", data)
	},
	getCompanyByTicketId({commit}, data) {
		commit("GET_COMPANY_BY_TICKET_ID", data)
	},
	getDetailPeopleInCompanyById({commit}, data) {
		commit('GET_DETAIL_PEOPLE_IN_COMPANY', data)
	},
	getPersonalById({commit}, payload) {
		commit('GET_PERSONAL_BY_ID', payload)
	},
	getPersonalByTicketId({commit}, payload) {
		commit('GET_PERSONAL_BY_TICKET_ID', payload)
	},
	setCompanyRemarkById({commit}, data) {
		commit('SET_REMARK_COMPANY', data)
	},
	setPersonalRemarkById({ commit }, data) {
		commit('SET_REMARK_PERSONAL', data)
	},
	setRemarkPeopleInCompany({ commit }, data) {
		commit('SET_REMARK_PEOPLE', data)
	},


};
const mutations = {
	SET_CONTACT(state, data) {
		state.user = data
	},
	SET_PAGE_COMPANY_VIEW(state, view) {
		state.pageCompanyView = view
	},
	SET_PAGE_COMPANY_CREATE(state, edit) {
		state.pageCompanyCreate = edit
	},
	SET_PEOPLE_IN_COMPANY_VIEW(state, view) {
		state.pagePeopleInCompanyView = view
	},
	SET_PEOPLE_IN_COMPANY_CREATE(state, create) {
		state.pagePeopleInCompanyCreate = create
	},
	SET_PAGE_PERSONAL_VIEW(state, view) {
		state.pagePersonalView = view
	},
	SET_PAGE_PERSONAL_CREATE(state, edit) {
		state.pagePersonalCreate = edit
	},
	GET_VIEWCONTACT(state, viewContact) {
		state.viewContact = viewContact
	},
	GET_COMPANY_BY_ID(state, data) {
		state.companyById = data
	},
	GET_COMPANY_BY_TICKET_ID(state, data) {
		state.companyByTicketId = data
	},
	GET_DETAIL_PEOPLE_IN_COMPANY(state, data) {
		state.peopleById = data
	},
	GET_PERSONAL_BY_ID(state, data) {
		state.personalById = data
	},
	GET_PERSONAL_BY_TICKET_ID(state, data) {
		state.personalByTicketId = data
	},
	SET_REMARK_COMPANY(state, data) {
		state.remarkCompany = data
	},
	SET_REMARK_PERSONAL(state, data) {
		state.remarkPersonal = data
	},
	SET_REMARK_PEOPLE(state, data) {
		state.remarkPeople = data
	}

};
const getters = {
	getUser: state => state.user,
	pageCompanyView: state => state.pageCompanyView,
	pageCompanyCreate: state => state.pageCompanyCreate,
	pagePeopleInCompanyView: state => state.pagePeopleInCompanyView,
	pagePeopleInCompaycreate: state => state.pagePeopleInCompanyCreate,
	pagePersonalView: state => state.pagePersonalView,
	pagePersonalCreate: state => state.pagePersonalCreate,
	getCompanyById: state => state.companyById,
	getViewContact: state => state.viewContact,
	getPeopleById: state => state.peopleById,
	getPersonalById: state => state.personalById,
	getPersonalByTicketId: state => state.personalByTicketId,
	getCompanyByTicketId: state => state.companyByTicketId,
	remarkCompanyById: state => state.remarkCompany,
	remarkPersonalById: state => state.remarkPersonal,
	remarkPeopleById: state => state.remarkPeople
}
export default {
	state,
	actions,
	mutations,
	getters
}
