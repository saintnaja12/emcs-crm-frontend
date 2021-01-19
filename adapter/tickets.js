import _ from 'lodash'
import moment from 'moment'

var qs = require('qs');

export default $axios => (resourcePath) => ({
	_ticketsData(data) {
		return {
			'ticketNo': data.id,
			'appName': {
				'id': _.get(data, 'appName.id', ''),
				'name': _.get(data, 'appName.name', ''),
			},
			'categoryIssue': {
				'id': _.get(data, 'categoryIssue.id', ''),
				'name': _.get(data, 'categoryIssue.name', ''),
			},
			'complain': _.get(data, 'complain', ''),
			'complainNote': _.get(data, 'complainNote', ''),
			'contact': _.get(data, 'contact', {}),
			'contactType': _.get(data, 'contactType', ''),
			'region': _.get(data, 'region', ''),
			'subject': {
				'id': _.get(data, 'subject.subject.id', ''),
				'name': _.get(data, 'subject.subject.name', ''),
			},
			'subSubject': {
				'id': _.get(data, 'subject.subSubject.id', ''),
				'name': _.get(data, 'subject.subSubject.name', ''),
			},
			'priority': _.get(data, 'subject.priority', ''),

			'sla':!_.isNil(data.subject.sla) ?  _.get(data, 'subject.sla', 0).toString() : 0,

			'otherIssue': _.get(data, 'otherIssue', ''),
			'channel': _.get(data, 'channel', ''),
			'hashtag': _.map(data.hashtag, function(hashtag) {
				return _.assign(hashtag, {
					'id': _.get(hashtag, 'id', ''),
					'name': _.get(hashtag, 'name', ''),
				});
			}),
			'appointmentDate': _.get(data, 'appointmentDate', '') !== 0 ? moment(data.appointmentDate).format('DD/MM/YYYY') : '',
			'continueTo': {
				'id': _.get(data, 'continueTo.id', ''),
				'name': _.get(data, 'continueTo.name', ''),
			},
			'file1': {
				'alt': _.get(data,'file1.alt',''),
				'link': _.get(data,'file1.data.link','')
			},
			'file2': {
				'alt': _.get(data,'file2.alt',''),
				'link': _.get(data,'file2.data.link','')
			},
			'file3': {
				'alt': _.get(data,'file3.alt',''),
				'link': _.get(data,'file3.data.link','')
			},
			'file4': {
				'alt': _.get(data,'file4.alt',''),
				'link': _.get(data,'file4.data.link','')
			},
			'file5': {
				'alt': _.get(data,'file5.alt',''),
				'link': _.get(data,'file5.data.link','')
			},
			'file6': {
				'alt': _.get(data,'file6.alt',''),
				'link': _.get(data,'file6.data.link','')
			},
			'customerCode': _.get(data, 'customerCode', ''),
			'serviceCode': _.get(data, 'serviceCode', ''),
			'customerCompany': _.get(data, 'customerCompany', ''),
			'branch': _.get(data, 'branch', ''),
			'brand': _.get(data, 'brand', {}),
			'province': _.get(data, 'province', ''),
			'customerType': {
				'id': _.get(data, 'customerType.id', ''),
				'name': _.get(data, 'customerType.name', ''),
			},
			'customerName': _.get(data, 'customerName', ''),
			'reqDueDate':_.get(data, 'reqDueDate', '') !== 0 ? moment(data.reqDueDate).format('DD/MM/YYYY') : '',
			'reqBy': _.get(data, 'reqBy', ''),
			'rm': _.get(data, 'rm', ''),
			'status': _.get(data, 'status', ''),
			'raiseDate': _.get(data, 'raiseDate', ''),
			'assignMyTeam': {
				'id': _.get(data, 'assignMyTeam.id', ''),
				'name': _.get(data, 'assignMyTeam.name', ''),
			},
			'description': _.get(data, 'description', ''),
			'closeAt': _.isNil(_.get(data, 'closeAt', '')) ? moment(data.closeAt).format('DD/MM/YYYY HH:mm') : '',
			'createdAt': !_.isNil(_.get(data, 'createdAt', '')) ? moment(data.createdAt).format('DD/MM/YYYY HH:mm') : '',
			'createdBy': {
				'id': _.get(data, 'createdBy.id', ''),
				'name': _.get(data, 'createdBy.name', ''),
				'username': _.get(data, 'createdBy.username', ''),
			},
			'createdByTeam': {
				'id': _.get(data, 'createdBy.team.id', ''),
				'name': _.get(data, 'createdBy.team.name', ''),
			},
			'updatedAt': !_.isNil(_.get(data, 'updatedAt', '')) ? moment(data.updatedAt).format('DD/MM/YYYY HH:mm') : '',
			'updatedBy': {
				'id': _.get(data, 'updatedBy.id', ''),
				'name': _.get(data, 'updatedBy.name', ''),
				'username': _.get(data, 'updatedBy.username', ''),
				'team': _.get(data, 'updatedBy.team', ''),
			}
		}
	},
	downloadFiles(item){
		return $axios.$get(`/download/file/?path=${item}`,{responseType: 'blob'})
			.then(resp => {
				return resp
			})
	},
	getCountStatus() {
		return $axios.$get(`${resourcePath}/total/status`).then(resp => {
			return {
				'all': {
					'statusOpen': _.get(resp, 'statusOpen', 0),
					'statusPending': _.get(resp, 'statusPending', 0),
					'statusClose': _.get(resp, 'statusClose', 0),
					'statusInprogress': _.get(resp, 'statusInprogress', 0),
					'statusTotal': _.get(resp, 'statusTotal', 0),
				},
				'today': {
					'statusOpen': _.get(resp, 'statusOpen', 0),
					'statusPending': _.get(resp, 'statusPending', 0),
					'statusClose': _.get(resp, 'statusClose', 0),
					'statusInprogress': _.get(resp, 'statusInprogress', 0),
					'statusTotal': _.get(resp, 'statusTotal', 0),
				},
			}
		})
	},
	listTicket() {
		return $axios.$get(`${resourcePath}`).then(resp => {
			const rawData = _.get(resp, 'data', [])
			return {
				total: _.get(resp, 'total', 0),
				data: _.orderBy(_.map(rawData, data => this._ticketsData(data)), ['createdAt'], ['desc'])
			}
		})
	},
	listTicketByContactId(id) {
		return $axios.$get(`${resourcePath}/historical?contactId=${id}`).then(resp => {
			const rawData = _.get(resp, 'data', [])
			return {
				total: _.get(resp, 'total', 0),
				data: _.orderBy(_.map(rawData, data => this._ticketsData(data)), ['createdAt'], ['desc'])
			}
		})
	},
	ExportTicketAll(keyword) {
		let dateFrom = ''
		let dateTo = ''
		if (!_.isEmpty(keyword.datetime)) {
			const dateTime = keyword.datetime.split(" to ")
			if (!_.isEmpty(dateTime[1])) {
				dateFrom = new Date(dateTime[0] + ' ' + '00:00:00').getTime()
				dateTo = new Date(dateTime[1] + ' ' + '23:59:59').getTime()
			} else {
				dateFrom = new Date(dateTime[0] + ' ' + '00:00:00').getTime()
				dateTo = new Date(dateTime[0] + ' ' + '23:59:59').getTime()
			}
		}
		var obj = {
			from: dateFrom,
			to: dateTo,
			customerType: _.get(keyword, 'customerType', ''),
			appName: _.get(keyword, 'appName', ''),
			agent: _.get(keyword, 'agent', ''),
			keyword: _.get(keyword, 'keyword', ''),
			status: _.get(keyword, 'status', ''),
		}
		var str = qs.stringify(obj);
		return $axios.$get(`${resourcePath}/export/excel/all?${str}`, {responseType: 'blob'}).then(resp => {
			return resp
		})
	},
	ExportTicketView(keyword) {
		let dateFrom = ''
		let dateTo = ''
		if (!_.isEmpty(keyword.datetime)) {
			const dateTime = keyword.datetime.split(" to ")
			if (!_.isEmpty(dateTime[1])) {
				dateFrom = new Date(dateTime[0] + ' ' + '00:00:00').getTime()
				dateTo = new Date(dateTime[1] + ' ' + '23:59:59').getTime()
			} else {
				dateFrom = new Date(dateTime[0] + ' ' + '00:00:00').getTime()
				dateTo = new Date(dateTime[0] + ' ' + '23:59:59').getTime()
			}
		}
		var obj = {
			from: dateFrom,
			to: dateTo,
			customerType: _.get(keyword, 'customerType', ''),
			appName: _.get(keyword, 'appName', ''),
			agent: _.get(keyword, 'agent', ''),
			keyword: _.get(keyword, 'keyword', ''),
			status: _.get(keyword, 'status', ''),
		}
		var str = qs.stringify(obj);
		return $axios.$get(`${resourcePath}/export/excel/view?${str}`, {responseType: 'blob'}).then(resp => {
			return resp
		})
	},
	createTickets(data) {
		return $axios.$post(`${resourcePath}`, data)
			.then(resp => ({
				'id': resp.id,
			}))
	},
	searchTicket(keyword) {
		let dateFrom = ''
		let dateTo = ''
		if (keyword.sla === 'today' || keyword === 'almost-over' ) {
			if (!_.isEmpty(keyword.today)) {
				const dateTime = keyword.today.split(" to ")
				if (!_.isEmpty(dateTime[1])) {
					dateFrom = new Date(dateTime[0] + ' ' + '00:00:00').getTime()
					dateTo = new Date(dateTime[1] + ' ' + '23:59:59').getTime()
				} else {
					dateFrom = new Date(dateTime[0] + ' ' + '00:00:00').getTime()
					dateTo = new Date(dateTime[0] + ' ' + '23:59:59').getTime()
				}
			}
		}
		else{
			if (!_.isEmpty(keyword.datetime)) {
				const dateTime = keyword.datetime.split(" to ")
				if (!_.isEmpty(dateTime[1])) {
					dateFrom = new Date(dateTime[0] + ' ' + '00:00:00').getTime()
					dateTo = new Date(dateTime[1] + ' ' + '23:59:59').getTime()
				} else {
					dateFrom = new Date(dateTime[0] + ' ' + '00:00:00').getTime()
					dateTo = new Date(dateTime[0] + ' ' + '23:59:59').getTime()
				}
			}
		}


		var obj = {
			from: dateFrom,
			to: dateTo,
			customerType: _.get(keyword, 'customerType', ''),
			appName: _.get(keyword, 'application', ''),
			agent: _.get(keyword, 'agent', ''),
			keyword: _.get(keyword, 'keyword', ''),
			status: _.get(keyword, 'status', ''),
			sla: _.get(keyword, 'sla', ''),
		}
		var str = qs.stringify(obj);

		return $axios.$get(`${resourcePath}/?${str}`).then(resp => {
			const rawData = _.get(resp, 'data', [])
			return {
				total: _.get(resp, 'total', 0),
				data: _.orderBy(_.map(rawData, data => this._ticketsData(data)), ['timeStamp'], ['desc'])
			}
		})
	},
	getSiteById(id) {
		return $axios.$get(`site/${id}/site`).then(resp => {
			return resp
		})
	},
	getTicketsByID(id) {
		return $axios.$get(`${resourcePath}/${id}`).then(resp => {
			return this._ticketsData(resp)
		})
	},
	getCountTicketStatus(keyword) {
		let dateFrom = ''
		let dateTo = ''
		if (!_.isEmpty(keyword.datetime)) {
			const dateTime = keyword.datetime.split(" to ")
			dateFrom = new Date(dateTime[0] + ' ' + '00:00:00').getTime()
			dateTo = new Date(dateTime[1] + ' ' + '23:59:59').getTime()
		}
		var obj = {
			from: dateFrom,
			to: dateTo,
			customerType: _.get(keyword, 'customerType', ''),
			appName: _.get(keyword, 'application', ''),
			agent: _.get(keyword, 'agent', ''),
			keyword: _.get(keyword, 'keyword', ''),
			status: _.get(keyword, 'status', ''),
			sla: _.get(keyword, 'sla', ''),
		}
		var str = qs.stringify(obj);
		return $axios.$get(`${resourcePath}/count?${str}`).then(resp => {
			return {
				open: {
					all: _.get(resp, 'open.all', 0),
					call: _.get(resp, 'open.call', 0),
					email: _.get(resp, 'open.email', 0),
					web: _.get(resp, 'open.web', 0),
					app: _.get(resp, 'open.app', 0),
					agent: _.get(resp, 'open.agent', 0),
				},
				acknowledge: {
					all: _.get(resp, 'acknowledge.all', 0),
					call: _.get(resp, 'acknowledge.call', 0),
					email: _.get(resp, 'acknowledge.email', 0),
					web: _.get(resp, 'acknowledge.web', 0),
					app: _.get(resp, 'acknowledge.app', 0),
					agent: _.get(resp, 'acknowledge.agent', 0),
				},
				pendingInternal: {
					all: _.get(resp, 'pendingIn.all', 0),
					call: _.get(resp, 'pendingIn.call', 0),
					email: _.get(resp, 'pendingIn.email', 0),
					web: _.get(resp, 'pendingIn.web', 0),
					app: _.get(resp, 'pendingIn.app', 0),
					agent: _.get(resp, 'pendingIn.agent', 0),
				},
				pendingCustomer: {
					all: _.get(resp, 'pendingCus.all', 0),
					call: _.get(resp, 'pendingCus.call', 0),
					email: _.get(resp, 'pendingCus.email', 0),
					web: _.get(resp, 'pendingCus.web', 0),
					app: _.get(resp, 'pendingCus.app', 0),
					agent: _.get(resp, 'pendingCus.agent', 0),
				},
				processing: {
					all: _.get(resp, 'processing.all', 0),
					call: _.get(resp, 'processing.call', 0),
					email: _.get(resp, 'processing.email', 0),
					web: _.get(resp, 'processing.web', 0),
					app: _.get(resp, 'processing.app', 0),
					agent: _.get(resp, 'processing.agent', 0),
				},
				solving: {
					all: _.get(resp, 'solving.all', 0),
					call: _.get(resp, 'solving.call', 0),
					email: _.get(resp, 'solving.email', 0),
					web: _.get(resp, 'solving.web', 0),
					app: _.get(resp, 'solving.app', 0),
					agent: _.get(resp, 'solving.agent', 0),
				},
				close: {
					all: _.get(resp, 'close.all', 0),
					call: _.get(resp, 'close.call', 0),
					email: _.get(resp, 'close.email', 0),
					web: _.get(resp, 'close.web', 0),
					app: _.get(resp, 'close.app', 0),
					agent: _.get(resp, 'close.agent', 0),
				},
				cancel: {
					all: _.get(resp, 'cancel.all', 0),
					call: _.get(resp, 'cancel.call', 0),
					email: _.get(resp, 'cancel.email', 0),
					web: _.get(resp, 'cancel.web', 0),
					app: _.get(resp, 'cancel.app', 0),
					agent: _.get(resp, 'cancel.agent', 0),
				},
				overSla: {
					all: _.get(resp, 'overSla.all', 0),
					call: _.get(resp, 'overSla.call', 0),
					email: _.get(resp, 'overSla.email', 0),
					web: _.get(resp, 'overSla.web', 0),
					app: _.get(resp, 'overSla.app', 0),
					agent: _.get(resp, 'overSla.agent', 0),
				},
				almostOver: {
					all: _.get(resp, 'almostOver.all', 0),
					call: _.get(resp, 'almostOver.call', 0),
					email: _.get(resp, 'almostOver.email', 0),
					web: _.get(resp, 'almostOver.web', 0),
					app: _.get(resp, 'almostOver.app', 0),
					agent: _.get(resp, 'almostOver.agent', 0),
				},
				complain: {
					all: _.get(resp, 'complain.all', 0),
					call: _.get(resp, 'complain.call', 0),
					email: _.get(resp, 'complain.email', 0),
					web: _.get(resp, 'complain.web', 0),
					app: _.get(resp, 'complain.app', 0),
					agent: _.get(resp, 'complain.agent', 0),
				},
				today: {
					all: _.get(resp, 'today.all', 0),
					call: _.get(resp, 'today.call', 0),
					email: _.get(resp, 'today.email', 0),
					web: _.get(resp, 'today.web', 0),
					app: _.get(resp, 'today.app', 0),
					agent: _.get(resp, 'today.agent', 0),
				}
			}
		})
	},

	listTicketByPhoneNumber(phone) {
		return $axios.$get(`${resourcePath}`, phone).then(resp => {
			const rawData = _.get(resp, 'data', [])
			return {
				total: _.get(resp, 'total', 0),
				data: _.orderBy(_.map(rawData, data => this._ticketsData(data)), ['createdAt'], ['desc'])
			}
		})

	},

	getDashboard(from, to, team) {
		var obj = {
			from: from,
			to: to,
		}
		if (team != 0) {
			obj.team = team
		}
		var str = qs.stringify(obj)

		return $axios.get(`${resourcePath}/count?${str}`).then(resp => {
			return resp
		}).catch(err => {
			throw ('Error catch get dashboard:' + err)
		})
	},

	getPersonalByName() { //ใช้เส้นเดิมได้ตอนจะดึง list ไปแสดงใน table
		const status = 'inactive'
		return $axios.$get(`contact/personal?status=${status}`).then(resp => {
			return _.map(resp.data, data => {
				data.id = data.id;
				data.text = data.firstName + ' ' + data.lastName;
				return data;
			})
		})
	},

	getPersonalByPhone() {
		const status = 'inactive'
		return $axios.$get(`contact/personal?status=${status}`).then(resp => {
			return _.map(resp.data, data => {
				data.id = data.id;
				if (!_.isNil(data.phone1) && (data.phone1 != '')) {
					data.text = data.phone1
				}
				if (!_.isNil(data.phone2) && (data.phone2 != '')) {
					data.text = data.text + ', ' + data.phone2
				}
				if (!_.isNil(data.phone3) && (data.phone3 != '')) {
					data.text = data.text + ', ' + data.phone3
				}
				data.text = data.text + ' (' + data.firstName + ' ' + data.lastName + ')'
				return data;
			})
		})
	},

	getPersonalByEmail() {
		const status = 'inactive'
		return $axios.$get(`contact/personal?status=${status}`).then(resp => {
			return _.map(resp.data, data => {
				data.id = data.id;
				data.text = data.email;
				return data;
			})
		})
	},

	getCompanyByPhone() {
		const status = 'inactive'
		return $axios.$get(`contact/company?status=${status}`).then(resp => {
			return _.map(resp.data, data => {
				data.id = data._id;
				if (!_.isNil(data.phone1) && (data.phone1 != '')) {
					data.text = data.phone1
				}
				if (!_.isNil(data.phone2) && (data.phone2 != '')) {
					data.text = data.text + ', ' + data.phone2
				}
				if (!_.isNil(data.phone3) && (data.phone3 != '')) {
					data.text = data.text + ', ' + data.phone3
				}
				if (!_.isNil(data.phone4) && (data.phone4 != '')) {
					data.text = data.text + ', ' + data.phone4
				}
				if (!_.isNil(data.phone5) && (data.phone5 != '')) {
					data.text = data.text + ', ' + data.phone5
				}
				data.text = data.text + ' (' + data.companyName + ')'
				return data;
			})
		})
	},
	uploadFile(data){
		return $axios.$post(`uploads/file`, data,{ headers: { 'Content-Type': 'multipart/form-data' } })
			.then(resp => {
				return resp
			})
	},
	ExportTicketAdmin (keyword) {
		let dateFrom = ''
		let dateTo = ''
		if (!_.isEmpty(keyword.datetime)) {
			const dateTime = keyword.datetime.split(" to ")
			if (!_.isEmpty(dateTime[1])) {
				dateFrom = new Date(dateTime[0] + ' ' + '00:00:00').getTime()
				dateTo = new Date(dateTime[1] + ' ' + '23:59:59').getTime()
			} else {
				dateFrom = new Date(dateTime[0] + ' ' + '00:00:00').getTime()
				dateTo = new Date(dateTime[0] + ' ' + '23:59:59').getTime()
			}
		}
		var obj = {
			from: dateFrom,
			to: dateTo,
			customerType: _.get(keyword, 'customerType', ''),
			appName: _.get(keyword, 'appName', ''),
			agent: _.get(keyword, 'agent', ''),
			keyword: _.get(keyword, 'keyword', ''),
			status: _.get(keyword, 'status', ''),
			team: _.get(keyword, 'team', ''),
		}
		var str = qs.stringify(obj);
		return $axios.$get(`${resourcePath}/export/excel/admin?${str}`, {responseType: 'blob'}).then(resp => {
			return resp
		})
	},
})
