import * as moment from 'moment-timezone'
var qs = require('qs')

export default ($ticketsAdapter, $store ,$masterAdapter) => () => ({
	getDashboard(date, team) {
		const from = (new Date(date.split('~')[0]+'T'+'00:00:00'+'.0+07:00')).getTime()
		const to = (new Date(date.split('~')[1]+'T'+'23:59:59'+'.0+07:00')).getTime()
		return $ticketsAdapter.getDashboard(from, to, team).then(resp => {
			const total = {
				call: resp.data.open.call +resp.data.processing.call +resp.data.pendingIn.call +resp.data.pendingCus.call +resp.data.close.call +resp.data.acknowledge.call +resp.data.solving.call +resp.data.cancel.call,
				email: resp.data.open.email +resp.data.processing.email +resp.data.pendingIn.email +resp.data.pendingCus.email +resp.data.close.email +resp.data.acknowledge.email +resp.data.solving.email +resp.data.cancel.email,
				app: resp.data.open.app +resp.data.processing.app +resp.data.pendingIn.app  +resp.data.pendingCus.app  +resp.data.close.app +resp.data.acknowledge.app +resp.data.solving.app +resp.data.cancel.app,
				web: resp.data.open.web  +resp.data.processing.web +resp.data.pendingIn.web +resp.data.pendingCus.web +resp.data.close.web +resp.data.acknowledge.web +resp.data.solving.web +resp.data.cancel.web,
				agent: resp.data.open.agent +resp.data.processing.agent +resp.data.pendingIn.agent +resp.data.pendingCus.agent +resp.data.close.agent +resp.data.acknowledge.agent +resp.data.solving.agent +resp.data.cancel.agent,
				complain: resp.data.complain.call +resp.data.complain.email +resp.data.complain.web +resp.data.complain.app +resp.data.complain.agent
			}

			const data = {
				status: [
					['Open' ,resp.data.open.all],
					['Processing' ,resp.data.processing.all],
					['Pending (Internal)' ,resp.data.pendingIn.all],
					['Pending (Customer)' ,resp.data.pendingCus.all],
					['Close' ,resp.data.close.all],
					['Acknowledge' ,resp.data.acknowledge.all],
					['Solving' ,resp.data.solving.all],
					['Reject / Cancel' ,resp.data.cancel.all]
				],
				channel: [
					['Call (SLA)' ,total.call],
					['Email (SLA)' ,total.email],
					['Webform [App]' ,total.app],
					['Webform [Website]' ,total.web],
					['Create by agent' ,total.agent]
				],
				call: [
					['Close' ,total.call-resp.data.overSla.call],
					['Over' ,resp.data.overSla.call],
				],
				email: [
					['Close',total.email-resp.data.overSla.email],
					['Over',resp.data.overSla.email],
				],
				webform: [
					['[App] Close',total.app-resp.data.overSla.app],
					['[Website] Close',total.web-resp.data.overSla.web],
					['[App] Over ',resp.data.overSla.app],
					['[Website] Over ',resp.data.overSla.web],
				],
				agent: [
					['Close',total.agent-resp.data.overSla.agent],
					['Over',resp.data.overSla.agent],
				],
				complain: {
					total: total.complain,
					call: { value: resp.data.complain.call },
					email: { value: resp.data.complain.email },
					app: { value: resp.data.complain.app },
					web: { value: resp.data.complain.web },
					agent: { value: resp.data.complain.agent },
				}
			}

			return data
		})
	},
	getTeam() {
		return $masterAdapter.getAllTeam().then(resp => {
			return resp
		})
	},
})
