import Vue from 'vue';
import VueVisible from 'vue-visible';
import _ from "lodash";
import moment from 'moment'
Vue.use(VueVisible);

const state = {
	lastTimeReminderIncome:0,
	reminderData: [],
	reminderTotal: 0,

};
const actions = {
	pushReminder({commit}, data) {
		commit('PUSH_REMINDER_MESSAGE', data)
		commit('UPDATE_LAST_REMINDER')
	},
	setListReminder({commit},data){
		commit('SET_REMINDER_MESSAGE',data)
		commit('UPDATE_LAST_REMINDER')
	},
	readReminder({commit},data){
		commit('SET_READ_MESSAGE',data)
		commit('UPDATE_LAST_REMINDER')
	},
	setTotalReminder({commit},data){
		commit('SET_REMINDER_MESSAGE_TOTAL',data)
		commit('UPDATE_LAST_REMINDER')
	},
}
const mutations = {
	UPDATE_LAST_REMINDER(state) {
		state.lastTimeReminderIncome = moment().format('x')
	},
	PUSH_REMINDER_MESSAGE(state, data){
		const keyId = _.get(data, 'id', null)
		if(_.isNil(state.reminderData[keyId])){
			Vue.set(state.reminderData, keyId, data)
			state.reminderTotal++
		}
	},
	SET_READ_MESSAGE(state,data){
		// state.reminderData = data
	},
	SET_REMINDER_MESSAGE_TOTAL(state,total){
		state.reminderTotal = total
	},
	SET_REMINDER_MESSAGE(state, payload) {
		state.reminderData = []
		state.reminderTotal = 0
		payload.forEach(data => {
				if (parseFloat(data.overSla) > 0) {
					const keyId = _.get(data, 'id', null)
					Vue.set(state.reminderData, keyId, data)
					if(data.status === 'unread'){
						state.reminderTotal++
					}
				}
			}
		);
	}
};
const getters = {
	ListReminder: state => state.reminderData,
	getReminderTotal: state => state.reminderTotal,
	getLastReminderIncome: state => state.lastTimeReminderIncome,
};
export default {
	state,
	actions,
	mutations,
	getters
}
