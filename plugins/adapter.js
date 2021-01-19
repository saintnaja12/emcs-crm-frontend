import UserAdapter from '~/adapter/user';
import contactAdapter from "~/adapter/contact";
import knowledgeAdapter from "~/adapter/knowledge";
import ticketsAdapter from "~/adapter/tickets";
import reportAdapter from "~/adapter/report";
import SocketAdapter from '~/adapter/socket'
import worklogAdapter from '~/adapter/worklog'
import masterAdapter from '~/adapter/master'
import emailAdapter from '~/adapter/email'
import reminderAdapter from '~/adapter/reminder'
// import profileAdapter from '~/adapter/profile'

import io from 'socket.io-client'

export default (ctx, inject) => {
	ctx.$axios.interceptors.request.use((request) => {
		const token = localStorage.getItem('token')
		if( !_.isNil(token)) {
			request.headers['X-Profile'] = token
		}
		return request
	})
	ctx.$axios.defaults.baseURL = ctx.env.baseUrl
	const axiosAdapterMaster = masterAdapter(ctx.$axios);
	inject('masterAdapter', axiosAdapterMaster('/master'));
	const axiosAdapter = UserAdapter(ctx.$axios);
	inject('userAdapter', axiosAdapter('/user'));
	const axiosAdpaterContact = contactAdapter(ctx.$axios);
	inject('contactAdapter', axiosAdpaterContact('/contact'));
	const axiosAdpaterEmail = emailAdapter(ctx.$axios);
	inject('emailAdapter', axiosAdpaterEmail('/email'));
	const axiosAdpaterKnowledge = knowledgeAdapter(ctx.$axios);
	inject('knowledgeAdapter', axiosAdpaterKnowledge('/knowledge'));
	const axiosAdpaterTickets = ticketsAdapter(ctx.$axios);
	inject('ticketsAdapter', axiosAdpaterTickets('/ticket'));
	const axiosAdapterWorkLog = worklogAdapter(ctx.$axios);
	inject('worklogAdapter', axiosAdapterWorkLog('/worklog'))
	const axiosAdapterReport = reportAdapter(ctx.$axios);
	inject('reportAdapter', axiosAdapterReport('/report'));
	const axiosAdapterReminder = reminderAdapter(ctx.$axios);
	inject('reminderAdapter', axiosAdapterReminder('/reminder'));
	// const axiosAdapterProfile = profileAdapter(ctx.$axios);
	// inject('profileAdapter', axiosAdapterProfile('/profile'));

	const Socket = io(ctx.$axios.defaults.baseURL)
	const wsAdapter = SocketAdapter(Socket)
	const socketAdapter = wsAdapter()
	socketAdapter.init()
	inject('socketAdapter', socketAdapter)
}
