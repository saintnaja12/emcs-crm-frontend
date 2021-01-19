const state = {
	historyLog:[]
};
const actions = {
	getHistoryLogList({ commit }, data) {
		commit("GET_HISTORY_LOG", data)
	},

};
const mutations = {
	GET_HISTORY_LOG(state, data) {
		state.getHistoryLog = data
	},

};
const getters = {
	getHistoryLog: state => state.historyLog,
}
export default {
	state,
	actions,
	mutations,
	getters
}
