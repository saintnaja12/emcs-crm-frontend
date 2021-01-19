
import _ from 'lodash';
import qs from 'qs'
import moment from "moment";
export default $axios => (resourcePath) => ({
	_emailList(item){
		return {
			id: item.id,
			detail: _.get(item,'detail',''),
			subject: _.get(item,'subject',''),
			emailName: _.get(item,'from.emailAddress.name',''),
			emailAddress: _.get(item,'from.emailAddress.address',''),
			status: _.get(item,'status',''),
			ticketStatusId: _.get(item,'tickStatus.id', null),
			ticketStatus: _.get(item,'tickStatus.name', null),
			receivedDate: moment(new Date(item.receivedDateTime)).format('DD/MM/YYYY HH:mm')
		}
	},
	createEmail(data){
		return $axios.$post(`${resourcePath}`, data).then(resp => ({
			'id': resp.id,
		}))
	},
	getListEmailAll(obj){
		let str = qs.stringify(obj);
		return $axios.$get(`${resourcePath}?${str}`).then(resp => {
			const rawData = _.get(resp, 'data', [])
			return {
				total: _.get(resp,'total',0),
				totalAll: _.get(resp,'totalAll',0),
				data: _.map(rawData, item => this._emailList(item))
			}
		})
	},
	getEmailById(id){
		return $axios.$get(`${resourcePath}/${id}`).then(resp => {
			return {
				id: resp.id,
				detail: _.get(resp,'detail',''),
				subject: _.get(resp,'subject',''),
				emailName: _.get(resp,'from.emailAddress.name',''),
				emailAddress: _.get(resp,'from.emailAddress.address',''),
				channel: 'email',
				receivedDate: moment(new Date(resp.receivedDateTime)).format('DD/MM/YYYY HH:mm')
			}
		})
	},
	findEmail(obj) {
		let str = qs.stringify(obj);
		return $axios.$get(`${resourcePath}/search?${str}`).then(resp => {
			const rawData = _.get(resp, 'data', [])
			return {
				total: _.get(resp,'total',0),
				totalAll: _.get(resp,'totalAll',0),
				data: _.map(rawData, item => this._emailList(item))
			}
		})
	},
	readedEmail (id) {
		return $axios.$put(`${ resourcePath }/${id}/read`)
			.then(resp => {
				return resp
			})
	}
})
