import _ from 'lodash'

const state = {
	MessageList: [],
	NewMessage: false,

}
const mutations = {
	ADD_MESSAGE_USER (state, payload) {
		const UserId = _.get(payload, 'uid', '')
		const UserName = _.get(payload, 'name', '')
		// const ImagePath = _.get(payload, 'imgPath', '')
		const TimeStamp = _.get(payload, 'timestamp', '')
		// console.log(`${process.env.END_POINT}static/line/profile/${UserId}`)
		if (_.isNil(state.MessageList[UserId])) {
			state.MessageList[UserId] = {
				uid: UserId,
				name: UserName,
				img: `${process.env.END_POINT}/static/line/profile/${UserId}.jpeg`,
				timestamp: TimeStamp,
				messages: [],
				unRead:0,
			}
		}
		state.MessageList[UserId].timestamp = TimeStamp
		state.MessageList[UserId].messages.push(payload)
		if(UserName !== 'BOT'){
			state.MessageList[UserId].unRead += 1
		}
		// _.sortBy(state.MessageList, (data) =>{return data.timestamp}, 'desc')
		state.NewMessage = true
		// console.log(state.MessageList)
	},
	TOGGLE_NEW_MESSAGE (state, payload) {
		state.NewMessage = payload
	},
	RESET_USER_UNREAD (state, uid){
		// console.log(state.MessageList)
		state.MessageList[uid].unRead = 0
	}

}
const actions = {
	addMessageUser ({commit}, data) {
		// console.log(data)
		commit('ADD_MESSAGE_USER', data)
	},
	updateNewMessage ({commit}, data) {
		commit('TOGGLE_NEW_MESSAGE', data)
	},
	releaseGroup ({commit}, data) {
	},
	ReadMessage ({commit}, uid){
		commit('RESET_USER_UNREAD', uid)
	}

}
const getters = {
	getNewMessage: state => state.NewMessage,
	getMessageAllUser: state => state.MessageList,
	getMessageByUserId: state => (uid) => {
		// console.log(uid)
		// let messageList = JSON.parse(JSON.stringify(state.MessageList))
		// console.log(messageList)
		// console.log(state.MessageList[uid])
		if (!_.isEmpty(uid)||!_.isNil(uid)){
			if (!_.isNil(state.MessageList[uid])) {
				// console.log(true)
				return state.MessageList[uid]
			}else{
				return []
			}
		}else {
			return []
		}
	},

}

export default {
	state,
	getters,
	mutations,
	actions,
}
