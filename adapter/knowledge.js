import _ from 'lodash'
import moment from 'moment'

export default $axios => (resourcePath) => ({
	_mapDataContentList (item) {
		return {
			id: _.get(item ,'id',''),
			category: _.get(item,'category',''),
			topic: _.get(item,'topic', ''),
			content: _.get(item,'content',''),
			refNo: _.get(item,'refNo',''),
			highlight: _.get(item,'highlight',''),
			view: _.get(item,'view',0),
			thumbnail: {
				success: _.get(item,'thumbnail.success',''),
				link: _.get(item,'thumbnail.data.link',''),
				alt: _.get(item,'thumbnail.alt','')
			},
			file: {
				success: _.get(item,'file.success',''),
				link: _.get(item,'file.data.link',''),
				alt: _.get(item,'file.alt','')
			},
			createdAt:  moment(new Date(_.get(item,'createdAt','')),'DD/MM/YYYY').format('DD/MM/YYYY HH:mm'),
			createdBy: {
				id: _.get(item,'createdBy.id',''),
				name: _.get(item,'createdBy.name',''),
				username: _.get(item,'createdBy.username',''),
				team: {
					id: _.get(item,'createdBy.team.id',''),
					name: _.get(item,'createdBy.team.name',''),
				}
			},
			updatedAt: moment(new Date (_.get(item,'updatedAt','')),'DD/MM/YYYY').format('DD/MM/YYYY HH:mm'),
			updatedBy: {
				id: _.get(item,'updatedBy.id',''),
				name: _.get(item,'updatedBy.name',''),
				username: _.get(item,'updatedBy.username',''),
				team: {
					id: _.get(item,'updatedBy.team.id',''),
					name: _.get(item,'updatedBy.team.name',''),
				}
			},
		}
	},
	getContentList () {
		return $axios.$get(`${resourcePath}`).then(resp => {
			const rawData = _.get(resp,'data',[])
			return {
				total: _.get(resp, 'total', 0),
				data: _.orderBy(_.map(rawData, item => this._mapDataContentList(item)), ['createdAt'], ['asc'])
			}
		})
	},
	getPopularList () {
		return $axios.$get(`${resourcePath}`).then(resp => {
			const rawData = _.get(resp,'data',[])
			return {
				total: _.get(resp, 'total', 0),
				data: _.orderBy(_.map(rawData, item => this._mapDataContentList(item)), ['view'], ['desc'])
			}
		})
	},
	createContent(data) {
		return $axios.$post(`${resourcePath}`, data , {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		}).then(resp => {
			return resp
		})
	},
	deleteContent(item) {
		return $axios.$delete(`${resourcePath}/${item.id}`).then(resp => {
			return resp
		})
	},
	editContent(data , formEdit) {
		const id = formEdit.id
		return $axios.$put(`${resourcePath}/${id}`, data,{
		}).then(resp => {
			return resp
		})
	},
	getContentLog(id) {
		return $axios.$get(`knowledgeLog/${id}`).then(resp => {
			return {
				id: _.get(resp ,'id',''),
				knowledgeId: _.get(resp ,'knowledgeId',''),
				logs: _.map(resp.logs, item => ({
					topic: _.get(item ,'topic',''),
					refNo: _.get(item ,'refNo',''),
					remark: _.get(item ,'remark',''),
					editDate: moment(new Date(_.get(item,'editDate','')),'DD/MM/YYYY HH:mm').format('DD/MM/YYYY HH:mm'),
					editBy: {
						id: _.get(item ,'editBy.id',''),
						name: _.get(item ,'editBy.name',''),
						username: _.get(item ,'editBy.username',''),
						team: {
							id: _.get(item ,'editBy.team.id',''),
							name: _.get(item ,'editBy.team.name',''),
						}
					}
				})),
				createdAt: moment(new Date(_.get(resp,'createdAt','')),'DD/MM/YYYY HH:mm').format('DD/MM/YYYY HH:mm'),
			}
		})
	},
	getContentDetails(id) {
		return $axios.$get(`${resourcePath}/${id}`).then(resp => {
			return {
				id: _.get(resp,'id', ''),
				category: _.get(resp, 'category',''),
				content: _.get(resp, 'content',''),
				createdAt: moment(_.get(resp, 'createdAt','')).format('DD/MM/YYYY HH:mm'),
				createdBy: _.get(resp, 'createdBy',{}),
				file: {
					alt: _.get(resp, 'file.alt', ''),
					data: {
						link: _.get(resp, 'file.data.link', '')
					},
					success: _.get(resp, 'file.success','')
				},
				highlight: _.get(resp, 'highlight',''),
				refNo: _.get(resp, 'refNo',''),
				thumbnail: _.get(resp, 'thumbnail',''),
				topic: _.get(resp, 'topic',''),
				updatedAt: _.get(resp, 'updatedAt',''),
				updatedBy: _.get(resp, 'updatedBy',''),
				view: _.get(resp, 'view', 0),
			}
		})
	},
	downloadFileKnowledge(item) {
		return $axios.$get(`download/file/?path=${item}`,{responseType: 'blob'})
			.then(resp => {
				return resp
			})
	},
})
