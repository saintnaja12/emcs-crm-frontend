import _ from "lodash";
import moment from "moment-timezone";

export default $axios => (resourcePath) => (
	{

		getReminder(date) {
			return $axios.$get(`${ resourcePath }?date=${ date }`)
				.then(resp => {
					return {
						total: resp.total,
						data: _.map(resp.data, data => {
							return {
								id: _.get(data, 'id', ''),
								ticketNo: _.get(data, 'ticketNo', ''),
								createdBy: _.get(data, 'createdBy', ''),
								contactType: _.get(data, 'contactType', ''),
								slaTime: _.get(data, 'slaTime', ''),
								overSla: _.get(data, 'overSla', ''),
								status: _.get(data, 'status', ''),
								userRead: _.get(data, 'userRead', ''),
								almostOver: _.get(data, 'almostOver', ''),
								notified: _.get(data, 'notified', ''),
								createdAt: _.get(data, 'createdAt', ''),
							}
						})
					}
				})
		},
		readedReminder( id) {
			return $axios.$put(`${ resourcePath }/${id}`)
				.then(resp => {
					return resp
				})
		},
	}
)
