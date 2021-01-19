import _ from 'lodash'
import moment from "moment";

var qs = require('qs');

export default $axios => (resourcePath) => ({
	getAllApplication() {
		return $axios.$get(`${resourcePath}/application`)
			.then(resp => {
				const result = []
				const rawData = _.orderBy(_.get(resp, 'data', []), ['createdAt'], ['asc'])
				_.forEach(rawData, (data) => {
					result.push({
						'id': _.get(data, 'id', ''),
						'name': _.get(data, 'name', ''),
						'createAt': moment(_.get(data, 'createAt', '')).format('Do MMMM YYYY'),
						'updateAt': moment(_.get(data, 'updateAt', '')).format('Do MMMM YYYY')
					})
				})
				return result
			})
	},

	getAllCustomerTypes() {
		return $axios.$get(`${resourcePath}/customerType`)
			.then(resp => {
				const result = []
				const rawData = _.orderBy(_.get(resp, 'data', []), ['createdAt'], ['asc'])
				_.forEach(rawData, (data) => {
					result.push({
						'id': _.get(data, 'id', ''),
						'name': _.get(data, 'name', ''),
						'value': _.get(data, 'id', ''),
						'text': _.get(data, 'name', ''),
						'createAt': moment(_.get(data, 'createAt', '')).format('Do MMMM YYYY'),
						'updateAt': moment(_.get(data, 'updateAt', '')).format('Do MMMM YYYY')
					})
				})
				return result
			})
	},

	getAllTicketStatus() {
		return $axios.$get(`${resourcePath}/status`)
			.then(resp => {
				const result = []
				const rawData = _.orderBy(_.get(resp, 'data', []), ['createdAt'], ['asc'])
				_.forEach(rawData, (data) => {
					result.push({
						'id': _.get(data, 'id', ''),
						'name': _.get(data, 'name', ''),
						'used': _.get(data, 'used', ''),
					})
				})
				return result
			})
	},

	getAllUser() {
		return $axios.$get(`profile`)
			.then(resp => {
				const result = []
				const rawData = _.orderBy(_.get(resp, 'data', []), ['createdAt'], ['asc'])
				_.forEach(rawData, (data) => {
					result.push({
						'id': _.get(data, 'id', ''),
						'name': _.get(data, 'name', ''),

					})
				})
				return result
			})
	},

	getAllPartner() {
		return $axios.$get(`${resourcePath}/insurancePartners/all`)
			.then(resp => {
				const result = []
				const rawData = _.get(resp, 'data', [])
				_.forEach(rawData, (data) => {
					result.push({
						'id': _.get(data, 'id', ''),
						'name': _.get(data, 'name', ''),
						'value': _.get(data, 'id', ''),
						'text': _.get(data, 'name', ''),
						'createAt': _.get(data, 'createAt', ''),
						'updateAt': moment(_.get(data, 'updateAt', '')).format('Do MMMM YYYY'),
						'used': _.get(data, 'used', ''),
					})
				})
				return result

			})
	},

	getAllHashTag() {
		return $axios.$get(`${resourcePath}/hashtag/all`)
			.then(resp => {
				const result = []
				const rawData = _.orderBy(_.get(resp, 'data', []), ['createdAt'], ['asc'])
				_.forEach(rawData, (data) => {
					result.push({
						'id': _.get(data, 'id', ''),
						'name': _.get(data, 'name', ''),
						'createAt': _.get(data, 'createAt', ''),
						'updateAt': moment(_.get(data, 'updateAt', '')).format('Do MMMM YYYY'),
						'used': _.get(data, 'used', ''),
					})
				})
				return result
			})

	},

	getAllCustomerType() {
		return $axios.$get(`${resourcePath}/customerType/all`)
			.then(resp => {
				// _.get(resp, 'data', [])
				return _.map(_.get(resp, 'data', []), data => {
					return {
						'id': _.get(data, 'id', ''),
						'name': _.get(data, 'name', ''),
						'createAt': _.get(data, 'createAt', ''),
						'updateAt': moment(_.get(data, 'updateAt', '')).format('Do MMMM YYYY'),
						'used': _.get(data, 'used', ''),
					}
				})

			})
	},

	getAllApplications() {
		return $axios.$get(`${resourcePath}/application/all`)
			.then(resp => {
				// _.get(resp, 'data', [])
				return _.map(_.get(resp, 'data', []), data => {
					return {
						'id': _.get(data, 'id', ''),
						'name': _.get(data, 'name', ''),
						'createAt': _.get(data, 'createAt', ''),
						'updateAt': moment(_.get(data, 'updateAt', '')).format('Do MMMM YYYY'),
						'used': _.get(data, 'used', ''),
					}
				})

			})
	},

	getAllStatus() {
		return $axios.$get(`master/status/all`)
			.then(resp => {
				return _.map(_.get(resp, 'data', []), data => {
					return {
						'id': _.get(data, 'id', ''),
						'name': _.get(data, 'name', ''),
						'used': _.get(data, 'used', null),
						'createdAt': moment(_.get(data, 'createdAt', null)).format('Do MMMM YYYY'),
						'updatedAt': moment(_.get(data, 'updatedAt', null)).format('Do MMMM YYYY')
					}
				})
			})
	},

	getStatusById(data) {
		return $axios.$get(`master/status/${data.id}`)
			.then(resp => {
				return _.map(_.get(resp, 'data', []), data => {
					return {
						'id': _.get(data, 'id', ''),
						'name': _.get(data, 'name', ''),
						'active': _.get(data, 'active', null),
						'createdAt': moment(_.get(data, 'createdAt', null)).format('Do MMMM YYYY'),
						'updatedAt': moment(_.get(data, 'updatedAt', null)).format('Do MMMM YYYY')
					}
				})
			})
	},

	createStatus(data) {
		return $axios.$post(`master/status`, data)
			.then(resp => ({
				'status name :': resp.name,
			})).catch(error => {
				throw ('Error: ' + error.response.data.message)
			})
	},

	getAllBrand() {
		return $axios.$get(`${resourcePath}/brand/all`)
			.then(resp => {
				const result = []
				const rawData = _.orderBy(_.get(resp, 'data', []), ['createdAt'], ['asc'])
				_.forEach(rawData, (data) => {
					result.push({
						'id': _.get(data, 'id', ''),
						'name': _.get(data, 'name', ''),
						'value': _.get(data, 'id', ''),
						'text': _.get(data, 'name', ''),
						'createAt': _.get(data, 'createAt', ''),
						'updateAt': moment(_.get(data, 'updateAt', '')).format('Do MMMM YYYY'),
						'used': _.get(data, 'used', ''),
					})
				})
				return result
			})

	},

	mainSubject() {
		return $axios.$get(`${resourcePath}/subject/all?type=MAIN`)
			.then(resp => {
				return _.map(resp, data => {
					return {
						'id': _.get(data, 'id', ''),
						'name': _.get(data, 'name', ''),
						'used': _.get(data, 'used', ''),
					}
				})
			})
	},

	subSubject(data) {
		return {
			'id': _.get(data, 'id', ''),
			'name': _.get(data, 'name', ''),
			'SLA': _.get(data, 'SLA', ''),
			'type': _.get(data, 'type', ''),
			'groupId': _.get(data, 'groupId', ''),
			'used': _.get(data, 'used', ''),
		}
	},

	getAllSubject() {
		return $axios.$get(`${resourcePath}/subject/all`)
			.then(resp => {
				return _.map(resp, data => {
					return {
						'id': _.get(data, 'id', ''),
						'name': _.get(data, 'name', ''),
						'SLA': _.get(data, 'SLA', ''),
						'type': _.get(data, 'type', ''),
						'groupId': _.get(data, 'groupId', ''),
						'sub': _.map(data.sub, data => this.subSubject(data)),
						'used': _.get(data, 'used', ''),
					}
				})
			})
	},

	getAllTeam() {
		return $axios.$get(`${resourcePath}/team/all`)
			.then(resp => {
				const result = []
				const rawData = _.orderBy(_.get(resp, 'data', []), ['createdAt'], ['asc'])
				_.forEach(rawData, (data) => {
					result.push({
						'id': _.get(data, 'id', ''),
						'name': _.get(data, 'name', ''),
						'shortName': _.get(data, 'shortName', ''),
						'createAt': _.get(data, 'createAt', ''),
						'updateAt': moment(_.get(data, 'updateAt', '')).format('Do MMMM YYYY'),
						'used': _.get(data, 'used', ''),
					})
				})
				return result
			})

	},

	getAllCategoryIssue() {
		return $axios.$get(`${resourcePath}/categoryIssue/all`)
			.then(resp => {
				const result = []
				const rawData = _.orderBy(_.get(resp, 'data', []), ['createdAt'], ['asc'])
				_.forEach(rawData, (data) => {
					result.push({
						'id': _.get(data, 'id', ''),
						'name': _.get(data, 'name', ''),
						'createAt': _.get(data, 'createAt', ''),
						'updateAt': moment(_.get(data, 'updateAt', '')).format('Do MMMM YYYY'),
						'used': _.get(data, 'used', ''),
					})
				})
				return result
			})

	},

	getAllAssignToMyTeam() {
		return $axios.$get(`profile/team`)
			.then(resp => {
				return _.map(resp.data, data => {
					return {
						'id': _.get(data, 'id', ''),
						'name': _.get(data, 'name', ''),
						'team': {
							'id': _.get(data, 'team.id', '-'),
							'name': _.get(data, 'team.name', '-'),
						},
						'roles': _.get(data, 'roles', ''),
					}
				})
			})
	},

	getAllContactedGarage(){
		return $axios.$get(`${resourcePath}/contactedGarage`)
			.then(resp => {
				return _.map(resp.data, data => {
					return {
						'id': _.get(data, 'id', ''),
						'name': _.get(data, 'name', ''),
						'createdAt': moment(_.get(data, 'createdAt', null)).format('Do MMMM YYYY'),
						'updatedAt': moment(_.get(data, 'updatedAt', null)).format('Do MMMM YYYY'),
						'used': _.get(data, 'used', '')
					}
				})
			})
	},

	createCustomerType(data) {
		return $axios.$post(`${resourcePath}/customerType`, data)
			.then(resp => ({
				'id': resp.id,
			}))
			.catch(error => {
				throw ('Error: ' + error.response.data.message)
			})
	},
	createBrand(data) {
		return $axios.$post(`${resourcePath}/brand`, data)
			.then(resp => ({
				'id': resp.id,
			}))
			.catch(error => {
				throw ('Error: ' + error.response.data.message)
			})
	},
	createApplication(data) {
		return $axios.$post(`${resourcePath}/application`, data)
			.then(resp => ({
				'id': resp.id,
			}))
			.catch(error => {
				throw ('Error: ' + error.response.data.message)
			})
	},
	createCategoryIssue(data) {
		return $axios.$post(`${resourcePath}/categoryIssue`, data)
			.then(resp => ({
				'id': resp.id,
			}))
			.catch(error => {
				throw ('Error: ' + error.response.data.message)
			})
	},
	createTeam(data) {
		return $axios.$post(`${resourcePath}/team`, data)
			.then(resp => ({
				'id': resp.id,
			}))
			.catch(error => {
				throw ('Error: ' + error.response.data.message)
			})
	},
	createPartner(data) {
		return $axios.$post(`${resourcePath}/insurancePartners`, data)
			.then(resp => ({
				'id': resp.id,
			}))
			.catch(error => {
				throw ('Error: ' + error.response.data.message)
			})
	},
	createContactGarage(data) {
		return $axios.$post(`${resourcePath}/contactedGarage`, data)
			.then(resp => ({
				'id': resp.id,
			}))
			.catch(error => {
				throw ('Error: ' + error.response.data.message)
			})
	},
	createHashtag(data) {
		return $axios.$post(`${resourcePath}/hashtag`, data)
			.then(resp => ({
				'id': resp.id,
			}))
			.catch(error => {
				throw ('Error: ' + error.response.data.message)
			})
	},
	createMainSubject(data) {
		return $axios.$post(`${resourcePath}/subject`, data)
			.then(resp => ({
				'id': resp.id,
			}))
			.catch(error => {
				throw ('Error: ' + error.response.data.message)
			})
	},

	createSubSubject(data) {
		return $axios.$post(`${resourcePath}/subject`, data)
			.then(resp => ({
				'id': resp.id,
			}))
			.catch(error => {
				throw ('Error: ' + error.response.data.message)
			})
	},


	updateCustomerType(data) {
		return $axios.$put(`${resourcePath}/customerType/${data.id}`, data).then(resp => {
			return _.map(resp, data => {
				return {
					'id': data.id,
					'name': _.get(data, 'name', ''),
					'createAt': _.get(data, 'createAt', ''),
					'updateAt': _.get(data, 'updateAt', ''),
				}
			})
		})
	},
	updateBrand(data) {
		return $axios.$put(`${resourcePath}/brand/${data.id}`, data).then(resp => {
			return _.map(resp, data => {
				return {
					'id': data.id,
					'name': _.get(data, 'name', ''),
					'createAt': _.get(data, 'createAt', ''),
					'updateAt': _.get(data, 'updateAt', ''),
				}
			})
		})
	},
	updateApplication(data) {
		return $axios.$put(`${resourcePath}/application/${data.id}`, data).then(resp => {
			return _.map(resp, data => {
				return {
					'id': data.id,
					'name': _.get(data, 'name', ''),
					'createAt': _.get(data, 'createAt', ''),
					'updateAt': _.get(data, 'updateAt', ''),
				}
			})
		})
	},
	updatePartner(data) {
		return $axios.$put(`${resourcePath}/insurancePartners/${data.id}`, data).then(resp => {
			return _.map(resp, data => {
				return {
					'id': data.id,
					'name': _.get(data, 'name', ''),
					'createAt': _.get(data, 'createAt', ''),
					'updateAt': _.get(data, 'updateAt', ''),
				}
			})
		})
	},
	updateContactGarage(data) {
		return $axios.$put(`${resourcePath}/contactedGarage/${data.id}`, data).then(resp => {
			return _.map(resp, data => {
				return {
					'id': data.id,
					'name': _.get(data, 'name', ''),
					'used': _.get(data, 'used', ''),
					'createAt': _.get(data, 'createAt', ''),
					'updateAt': _.get(data, 'updateAt', ''),
				}
			})
		})
	},
	updateHashtag(data) {
		return $axios.$put(`${resourcePath}/hashtag/${data.id}`, data).then(resp => {
			return _.map(resp, data => {
				return {
					'id': data.id,
					'name': _.get(data, 'name', ''),
					'createAt': _.get(data, 'createAt', ''),
					'updateAt': _.get(data, 'updateAt', ''),
				}
			})
		})
	},
	updateIssue(data) {
		return $axios.$put(`${resourcePath}/categoryIssue/${data.id}`, data).then(resp => {
			return _.map(resp, data => {
				return {
					'id': data.id,
					'name': _.get(data, 'name', ''),
					'createAt': _.get(data, 'createAt', ''),
					'updateAt': _.get(data, 'updateAt', ''),
				}
			})
		})
	},
	updateTeam(data) {
		return $axios.$put(`${resourcePath}/team/${data.id}`, data).then(resp => {
			return _.map(resp, data => {
				return {
					'id': data.id,
					'name': _.get(data, 'name', ''),
					'shortName': _.get(data, 'shortName', ''),
					'createAt': _.get(data, 'createAt', ''),
					'updateAt': _.get(data, 'updateAt', ''),
				}
			})
		})
	},
	updateSubject(data) {
		return $axios.$post(`${resourcePath}/subject/${data.id}`, data).then(resp => {
			return _.map(resp, data => {
				return {
					'id': data.id,
					'name': _.get(data, 'name', ''),
					'createAt': _.get(data, 'createAt', ''),
					'updateAt': _.get(data, 'updateAt', ''),
				}
			})
		})
	},
	updateStatus(data) {
		return $axios.$put(`${resourcePath}/status/${data.id}`,data).then(resp => {
			return _.map(resp, data => {
				return {
					'id': data.id,
					'name': _.get(data, 'name',''),
					'createAt': _.get(data, 'createAt', ''),
					'updateAt': _.get(data, 'updateAt', ''),
					'used': _.get(data, 'used','')
				}
			})
		})
	},

	activeData(state, id, active , name) {

		if (state === 'subject') {
			return $axios.$post(`${resourcePath}/${state}/${id}`, {'used': active}).then(resp => {
				return _.map(resp, data => {
					return {
						'id': data.id
					}
				})
			})
		}
		else {
			return $axios.$put(`${resourcePath}/${state}/${id}`, {'used': active}).then(resp => {
				return _.map(resp, data => {
					return {
						'id': data.id
					}
				})
			})
		}

	},
	getAllRoles() {
		return $axios.$get(`${resourcePath}/role`)
			.then(resp => {
				return resp
			})
	},

	createRoles(data) {
		return $axios.$post(`${resourcePath}/role`, data)
			.then(resp => ({
				'id': resp.id,
			}))
			.catch(error => {
				throw ('Error: ' + error.response.data.message)
			})
	},

	updateRole(id, item) {
		return $axios.$put(`${resourcePath}/role/${id}`, item)
			.then(resp => ({
				'id': resp.id,
			}))
			.catch(error => {
				throw ('Error: ' + error.response.data.message)
			})
	},
	getUserByTeam() {
		return $axios.$get(`profile/team`).then(resp => {
			const result = []
			const rawData = _.orderBy(_.get(resp, 'data', []), ['createdAt'], ['asc'])
			_.forEach(rawData, (data) => {
				result.push({
					'id': _.get(data, 'id', ''),
					'name': _.get(data, 'name', ''),

				})
			})
			return result
		}).catch(err => {
			throw ('Error: ' + error.response.data.message)
		})
	},

	getContactStatus() {
		return $axios.$get(`${resourcePath}/status/all`)
			.then(resp => {
				return resp.data
			}).catch(err => {
				throw (
					'Error: ' + error.response.data.message
				)
			})
	}
})
