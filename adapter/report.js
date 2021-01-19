import _ from 'lodash'
import moment from 'moment'
var qs = require('qs');

export default $axios => (resourcePath) => (
	{
		_ticketMapping(item) {
			return {
				'id':item.id,
				'srCode':_.get(item, 'srCode', '-'),
				'category':_.get(item, 'category', '-'),
				'srType':_.get(item, 'srType', '-'),
				'topic':_.get(item, 'topic', '-'),
				'project':_.get(item, 'project', '-'),
				'subProject':	_.get(item, 'subProject', '-'),
				'customerTicket':_.get(item, 'customerTicket', '-'),
				'providerTicket':_.get(item, 'providerTicket', '-'),
				'channel':_.get(item, 'channel', '-'),
				'sla':_.get(item, 'sla', '-'),
				'ticketAssignTo':_.get(item, 'ticketAssignTo', '-'),
				'displayContact':_.get(item, 'displayContact', '-'),
				'detail':_.get(item, 'detail', '-'),
				'owner':_.get(item, 'owner', '-'),
				'status':_.get(item, 'status', '-'),
				'createAt': moment(_.get(item,'createAt','-')).format("DD/MM/YYYY"),
				'createTime': moment(_.get(item,'createAt','DD/MM/YYYY HH:mm')).format("HH:mm"),
				'createBy':_.get(item, 'createBy', '-'),
				'updateAt':_.get(item, 'updateAt', '-'),
				'updateBy':_.get(item, 'updateBy', '-'),
			}
		},
		getReportList() {
			return $axios.$get(`${resourcePath}`).then(resp => {
				const rawData = _.get(resp, 'data', [])
				return {
					total: _.get(resp, 'total', 0),
					data: _.map(rawData, item => this._ticketMapping(item))
				}
			})
		},
		searchTicket(keyword) {
			let obj = {
				datetime: _.get(keyword,'datetime'),
				source: _.get(keyword,'source'),
				agent: _.get(keyword,'agent'),
				status: _.get(keyword, 'status'),
				srType: _.get(keyword, 'srType'),
				topic: _.get(keyword, 'topic'),
				subProject: _.get(keyword, 'subProject'),
				category: _.get(keyword, 'category'),
				sla: _.get(keyword, 'sla'),
			}
			let str = qs.stringify(obj);
			return $axios.$get(`${resourcePath}/?${str}`).then(resp => {
				const rawData = _.get(resp, 'data', [])
				return {
					total: _.get(resp, 'total', 0),
					data: _.map(rawData, item => this._ticketMapping(item))
				}
			})
		},
		ExportTicket(keyword) {
			var obj = {
				datetime: _.get(keyword,'datetime'),
				source: _.get(keyword,'source'),
				agent: _.get(keyword,'agent'),
				status: _.get(keyword, 'status'),
				srType: _.get(keyword, 'srType'),
				topic: _.get(keyword, 'topic'),
				subProject: _.get(keyword, 'subProject'),
				category: _.get(keyword, 'category'),
				sla: _.get(keyword, 'sla'),
			}
			var str = qs.stringify(obj);
			return $axios.$get(`${resourcePath}/?${str}`, {responseType: 'blob'}).then(resp => {
				const rawData = _.get(resp, 'data', [])
				return {
					total: _.get(resp, 'total', 0),
					data: _.map(rawData, item => this._ticketMapping(item))
				}
			})
		},
		getReportLogList() {
			return $axios.$get(`${resourcePath}`).then(resp => {
				const rawData = _.get(resp, 'data', [])
				return {
					total: _.get(resp, 'total', 0),
					data: _.map(rawData, item => this._ticketMapping(item))
				}
			})
		},
		searchLogTicket(keyword) {
			let obj = {
				datetime: _.get(keyword,'datetime'),
				source: _.get(keyword,'source'),
				agent: _.get(keyword,'agent'),
				status: _.get(keyword, 'status'),
				srType: _.get(keyword, 'srType'),
				topic: _.get(keyword, 'topic'),
				subProject: _.get(keyword, 'subProject'),
				category: _.get(keyword, 'category'),
				sla: _.get(keyword, 'sla'),
			}
			let str = qs.stringify(obj);
			return $axios.$get(`${resourcePath}/log/?${str}`).then(resp => {
				const rawData = _.get(resp, 'data', [])
				return {
					total: _.get(resp, 'total', 0),
					data: _.map(rawData, item => this._ticketMapping(item))
				}
			})
		},
		ExportLogTicket(keyword) {
			var obj = {
				datetime: _.get(keyword,'datetime'),
				source: _.get(keyword,'source'),
				agent: _.get(keyword,'agent'),
				status: _.get(keyword, 'status'),
				srType: _.get(keyword, 'srType'),
				topic: _.get(keyword, 'topic'),
				subProject: _.get(keyword, 'subProject'),
				category: _.get(keyword, 'category'),
				sla: _.get(keyword, 'sla'),
			}
			var str = qs.stringify(obj);
			return $axios.$get(`${resourcePath}/log/?${str}`, {responseType: 'blob'}).then(resp => {
				const rawData = _.get(resp, 'data', [])
				return {
					total: _.get(resp, 'total', 0),
					data: _.map(rawData, item => this._ticketMapping(item))
				}
			})
		},
		getTicketReport (form, pieChart){
			// console.log('post connect')
			// if(!!form){
			// 	console.log(form)
			// }
			// return $axios.$get().then(resp => {
			// 	return resp = 'post api'
			// })

			const data = [
				{
					'Id': '201',
					'ticketNo': '201',
					'channel': 'call',
					'ticketType': 'dealer',
					'customType': 'garage',
					'companyName': 'UC',
					'province': 'garage',
					'application': 'garage',
					'categoryIssue': 'garage',
					'subject': 'Thai',
					'ticketStatus': 'open',
					'openDate': '2018-01-01',
					'closeDate': '2018-01-02'
				},
				{
					'Id': '202',
					'ticketNo': '202',
					'channel': 'email',
					'ticketType': 'insurer',
					'customType': 'part',
					'companyName': 'UC',
					'province': 'glass',
					'application': 'glass',
					'categoryIssue': 'glass',
					'subject': 'Thailand',
					'ticketStatus': 'processing',
					'openDate': '2018-01-19',
					'closeDate': '2018-01-20'
				}
			]

			console.log(form)
			console.log(pieChart)

			// const obj = {
			// 	ticketNo: form.ticketNo,
			// 	channel: form.channel,
			// 	ticketType: form.ticketType,
			// 	customType: form.customerType,
			// 	companyName: form.companyName,
			// 	province: form.province,
			// 	application: form.application,
			// 	categoryIssue: form.category,
			// 	subject: form.subject,
			// 	ticketStatus: form.ticketStatus,
			// 	openDate: form.openDate,
			// 	closeDate: form.closeDate
			// }

			if(!!form){
				// console.log(obj)
				// const dataPromise = (new Promise(res => res(obj)))
				// return dataPromise
			}else{
				const dataPromise = (new Promise(res => res(data)))
				return dataPromise
			}

		}
	}
)
