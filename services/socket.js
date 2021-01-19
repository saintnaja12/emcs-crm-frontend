import moment from 'moment'
import _ from "lodash";

export default ($socketAdapter, $store) => () => ({
	newReminder(data) {
		let remind = {
			id: _.get(data, 'id', ''),
			ticketNo: _.get(data, 'ticketNo', ''),
			createdBy: _.get(data, 'createdBy', ''),
			contactType: _.get(data, 'contactType', ''),
			slaTime: _.get(data, 'slaTime', ''),
			overSla: _.get(data, 'overSla', ''),
			status: _.get(data, 'status', ''),
			createdAt: _.get(data, 'createdAt', ''),
		}
		$store.dispatch('pushReminder', remind)
	},
	readReminder(data) {
		let remind = {
			id: data.id,
		}
		$store.dispatch('readReminder', remind)
	},
})
