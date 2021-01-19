import _ from 'lodash'
import moment from 'moment'
var qs = require('qs');

export default $axios => (resourcePath) => ({
	_worklogsData(data) {
		return {
			'id': data.id,
			'status': _.get(data, 'status', ''),
			'responsibleBy': _.get(data, 'responsibleBy', ''),
			'raiseDate':  _.get(data, 'raiseDate', '') !== 0 ? _.get(data, 'raiseDate', '') : '-',
			'expectDeliveryDate': _.get(data, 'expectDeliveryDate', '') !== 0 ? _.get(data, 'expectDeliveryDate', '') : '-',
			'respondDate': _.get(data, 'respondDate', '') !== 0 ? _.get(data, 'respondDate', '') : '-',
			'dueDate': _.get(data, 'dueDate', '') !== 0 ? _.get(data, 'dueDate', '') : '-',
			'title': _.get(data, 'title', ''),
			'description': _.get(data, 'description', ''),
			'processResults': _.get(data, 'processResults', ''),
			'cause': _.get(data, 'cause', ''),
			'overSla': _.get(data, 'overSla', ''),
			'file1': {
				'success': _.get(data, 'file1.success', ''),
				'data': _.get(data, 'file1.data', ''),
				'alt': _.get(data, 'file1.alt', ''),
			},
			'file2': {
				'success': _.get(data, 'file2.success', ''),
				'data': _.get(data, 'file2.data', ''),
				'alt': _.get(data, 'file2.alt', ''),
			},
			'file3': {
				'success': _.get(data, 'file3.success', ''),
				'data': _.get(data, 'file3.data', ''),
				'alt': _.get(data, 'file3.alt', ''),
			},
			'file4': {
				'success': _.get(data, 'file4.success', ''),
				'data': _.get(data, 'file4.data', ''),
				'alt': _.get(data, 'file4.alt', ''),
			},
			'file5': {
				'success': _.get(data, 'file5.success', ''),
				'data': _.get(data, 'file5.data', ''),
				'alt': _.get(data, 'file5.alt', ''),
			},
			'assignTo': {
				'id': _.get(data, 'assignTo.id', ''),
				'name': _.get(data, 'assignTo.name', ''),
			},
			'createdAt': _.get(data, 'createdAt', ''),
			'createdBy': {
				'id': _.get(data, 'createdBy.id', ''),
				'name': _.get(data, 'createdBy.name', ''),
				'username': _.get(data, 'createdBy.username', ''),
				'team': _.get(data, 'createdBy.team', ''),
			},
			'updatedAt': _.get(data, 'updatedAt', ''),
			'updatedBy': {
				'id': _.get(data, 'updatedBy.id', ''),
				'name': _.get(data, 'updatedBy.name', ''),
				'username': _.get(data, 'updatedBy.username', ''),
				'team': _.get(data, 'updatedBy.team', ''),
			},
			'ticket': {
				'ticketNo': _.get(data, 'ticket.id',''),
				'ticketMain': _.get(data, 'ticket.ticketMain','')
			},
			'ticketNo' : _.get(data, 'ticketNo',''),
			'fromTicketId': _.get(data, 'fromTicketId', '')

		}
	},

	getWorkLogByTicketNo(id) {
		return $axios.$get(`${resourcePath}/${id}/ticketNo`).then(resp => {
			const rawData = _.get(resp, 'data', [])
			return {
				total: _.get(resp, 'total', 0),
				data: _.orderBy(_.map(rawData, data => this._worklogsData(data)), ['createdAt'], ['desc'])
			}
		})
	},

	createWorkLog(data) {
		return $axios.$post(`${resourcePath}`, data).then(resp => ({
				'id': resp.id,
			}))
	},

})
