import _ from "lodash";
import qs from 'qs'
import moment from 'moment'

export default $axios => (resourcePath) => (

    {
        _mapDataContactCompany(item) {
            return {
				id: item._id,
				companyName: _.get(item, 'companyName', ''),
				branch: _.get(item, 'branch', ''),
				partner: _.get(item, 'partner',''),
				garage: _.get(item, 'garage',[]),
				phone1: _.get(item, 'phone1', ''),
				phone2: _.get(item, 'phone2', ''),
				phone3: _.get(item, 'phone3', ''),
				phone4: _.get(item, 'phone4', ''),
				phone5: _.get(item, 'phone5', ''),
				customerType: {
					id: _.get(item, 'customerType.id', ''),
					name: _.get(item, 'customerType.name', ''),
				},
				brand: {
					id: _.get(item, 'brand.id', ''),
					name: _.get(item, 'brand.name', '')
				},
				region: _.get(item, 'region', ''),
				customerCode: _.get(item, 'customerCode', ''),
				serviceCode: _.get(item, 'serviceCode', ''),
				taxId: _.get(item, 'taxId', ''),
				fax: _.get(item, 'fax', ''),
				website: _.get(item, 'website', ''),
				certAddress: {
					address: _.get(item, 'certAddress.address', ''),
					alley: _.get(item, 'certAddress.alley', ''),
					subDistrict: _.get(item, 'certAddress.subDistrict', ''),
					district: _.get(item, 'certAddress.district', ''),
					province: _.get(item, 'certAddress.province', ''),
					zipCode: _.get(item, 'certAddress.zipCode', ''),
				},
				otherAddress: _.get(item, 'otherAddress', ''),
				invoiceAddress: _.get(item, 'invoiceAddress', ''),
				country: _.get(item, 'country', ''),
				note: _.get(item, 'note', ''),
				status: _.get(item, 'status', ''),
				file1: {
					success: _.get(item, 'file1.success', ''),
					data: {
						link: _.get(item, 'file1.data.link', ''),
					},
					alt: _.get(item, 'file1.alt', '')
				},
				file2: {
					success: _.get(item, 'file2.success', ''),
					data: {
						link: _.get(item, 'file2.data.link', ''),
					},
					alt: _.get(item, 'file2.alt', '')
				},
				file3: {
					success: _.get(item, 'file3.success', ''),
					data: {
						link: _.get(item, 'file3.data.link', ''),
					},
					alt: _.get(item, 'file3.alt', '')
				},
				file4: {
					success: _.get(item, 'file4.success', ''),
					data: {
						link: _.get(item, 'file4.data.link', ''),
					},
					alt: _.get(item, 'file4.alt', '')
				},
				file5: {
					success: _.get(item, 'file5.success', ''),
					data: {
						link: _.get(item, 'file5.data.link', ''),
					},
					alt: _.get(item, 'file5.alt', '')
				},
				createdAt: !_.isNil(_.get(item, 'createdAt', '')) ? moment(_.get(item, 'createdAt', '')).format('DD/MM/YYYY HH:mm') : '',
				createdBy: {
					id: _.get(item, 'createdBy.id', ''),
					name: _.get(item, 'createdBy.name', ''),
					team: {
						id: _.get(item, 'createdBy.team.id', ''),
						name: _.get(item, 'createdBy.team.name', ''),
					},
					username: _.get(item, 'createdBy.username')
				},
				updatedAt: !_.isNil(_.get(item, 'updatedAt', '')) ? moment(_.get(item, 'updatedAt', '')).format('DD/MM/YYYY HH:mm') : '',
				updatedBy: {
					id: _.get(item, 'updatedBy.id', ''),
					name: _.get(item, 'updateBy.name', ''),
					team: {
						id: _.get(item, 'updatedBy.team.id', ''),
						name: _.get(item, 'updatedBy.team.name', ''),
					},
					username: _.get(item, 'updatedBy.username', '')
				}
            }
        },
        _mapDataContactCompanyById(item) {
            return {
                id: item._id,
                companyName: _.get(item, 'companyName', ''),
				branch: _.get(item, 'branch', ''),
				partner: _.get(item, 'partner',''),
				partnerId: _.map(_.get(item, 'partner',''), 'id'),
				garage: _.get(item, 'garage',''),
				garageId: _.map(_.get(item, 'garage',''), 'id'),
				phone1: _.get(item, 'phone1', ''),
				phone2: _.get(item, 'phone2', ''),
				phone3: _.get(item, 'phone3', ''),
				phone4: _.get(item, 'phone4', ''),
				phone5: _.get(item, 'phone5', ''),
				customerType: {
					id: _.get(item, 'customerType.id', ''),
					name: _.get(item, 'customerType.name', ''),
				},
				brand: {
					id: _.get(item, 'brand.id', ''),
					name: _.get(item, 'brand.name', '')
				},
				region: _.get(item, 'region', ''),
				customerCode: _.get(item, 'customerCode', ''),
				serviceCode: _.get(item, 'serviceCode', ''),
				taxId: _.get(item, 'taxId', ''),
				fax: _.get(item, 'fax', ''),
				website: _.get(item, 'website', ''),
				certAddress: {
					address: _.get(item, 'certAddress.address', ''),
					alley: _.get(item, 'certAddress.alley', ''),
					subDistrict: _.get(item, 'certAddress.subDistrict', ''),
					district: _.get(item, 'certAddress.district', ''),
					province: _.get(item, 'certAddress.province', ''),
					zipCode: _.get(item, 'certAddress.zipCode', ''),
				},
				otherAddress: _.get(item, 'otherAddress', ''),
				invoiceAddress: _.get(item, 'invoiceAddress', ''),
				country: _.get(item, 'country', ''),
				note: _.get(item, 'note', ''),
				status: _.get(item, 'status', ''),
				file1: {
					success: _.get(item, 'file1.success', ''),
					data: {
						link: _.get(item, 'file1.data.link', ''),
					},
					alt: _.get(item, 'file1.alt', '')
				},
				file2: {
					success: _.get(item, 'file2.success', ''),
					data: {
						link: _.get(item, 'file2.data.link', ''),
					},
					alt: _.get(item, 'file2.alt', '')
				},
				file3: {
					success: _.get(item, 'file3.success', ''),
					data: {
						link: _.get(item, 'file3.data.link', ''),
					},
					alt: _.get(item, 'file3.alt', '')
				},
				file4: {
					success: _.get(item, 'file4.success', ''),
					data: {
						link: _.get(item, 'file4.data.link', ''),
					},
					alt: _.get(item, 'file4.alt', '')
				},
				file5: {
					success: _.get(item, 'file5.success', ''),
					data: {
						link: _.get(item, 'file5.data.link', ''),
					},
					alt: _.get(item, 'file5.alt', '')
				},
				createdAt: !_.isNil(_.get(item, 'createdAt', '')) ? moment(_.get(item, 'createdAt', '')).format('DD/MM/YYYY HH:mm') : '',
				createdBy: {
					id: _.get(item, 'createdBy.id', ''),
					name: _.get(item, 'createdBy.name', ''),
					team: {
						id: _.get(item, 'createdBy.team.id', ''),
						name: _.get(item, 'createdBy.team.name', ''),
					},
					username: _.get(item, 'createdBy.username')
				},
				updatedAt: !_.isNil(_.get(item, 'updatedAt', '')) ? moment(_.get(item, 'updatedAt', '')).format('DD/MM/YYYY HH:mm') : '',
				updatedBy: {
					id: _.get(item, 'updatedBy.id', ''),
					name: _.get(item, 'updatedBy.name', ''),
					team: {
						id: _.get(item, 'updatedBy.team.id', ''),
						name: _.get(item, 'updatedBy.team.name', ''),
					},
					username: _.get(item, 'updatedBy.username', '')
				}
			}
		},
		getContactCompanyList(keyword) {
			const obj = {
				page: keyword.currentPage,
				limit: keyword.perPage,
				customerType: keyword.customerType,
				province: keyword.province,
				region: keyword.region,
				insurance: keyword.insurance,
				searchBy: keyword.searchBy,
				keyword: keyword.keyword,
				status: keyword.status
			}
			const removeEmpty = (obj) => {
				Object.keys(obj).forEach(key => {
					if (_.isObject(obj[key])) removeEmpty(obj[key]);
					if (_.isNumber(obj[key])) {

					} else if (_.isNil(obj[key]) || _.isEmpty(obj[key])) {
						delete obj[key];
					}
				});
				return obj;
			};
			const data = removeEmpty(obj)
			let str = qs.stringify(data);
			return $axios.$get(`${resourcePath}/company/?${str}`).then(resp => {
				const rawData = _.get(resp, 'data', [])
				return {
					totalAll: _.get(resp, 'totalAll', 0),
					total: _.get(resp, 'total', 0),
                    data: _.orderBy(_.map(rawData, item => this._mapDataContactCompany(item)), ['createdAt'], ['desc'])
                }
            })
        },
		searchCompanyList(keyword) {
			const obj = {
				page: keyword.currentPage,
				limit: keyword.perPage,
				customerType: keyword.customerType,
				region: keyword.region,
				province: keyword.province,
				insurance: keyword.insurance,
				searchBy: keyword.searchBy,
				keyword: keyword.keyword,
				status: keyword.status,
				brand: keyword.brand,
				phone: keyword.phone,
				companyName: keyword.companyName,
			}
			const removeEmpty = (obj) => {
				Object.keys(obj).forEach(key => {
					if (_.isObject(obj[key])) removeEmpty(obj[key]);
					if (_.isNumber(obj[key])) {
					} else if (_.isNil(obj[key]) || _.isEmpty(obj[key])) {
						delete obj[key];
					}
				});
				return obj;
			};
			const data = removeEmpty(obj)
			let str = qs.stringify(data);
			return $axios.$get(`${resourcePath}/company/?${str}`).then(resp => {
				const rawData = _.get(resp, 'data', [])
				return {
					totalAll: _.get(resp, 'totalAll', 0),
					total: _.get(resp, 'total', 0),
					data: _.orderBy(_.map(rawData, item => this._mapDataContactCompany(item)), ['createdAt'], ['desc'])
				}
			})
		},
		createCompany(item) {
			return $axios.$post(`${resourcePath}/company`, item, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}).then(resp => {
				return resp
			})
		},
		updateCompanyContact(data, id) {
			return $axios.$put(`${resourcePath}/company/${id}`, data).then(resp => {
				return resp
			})
		},
		getCompanyViewDataById(id) {
			return $axios.$get(`${resourcePath}/company/${id}`).then(resp => {
				return this._mapDataContactCompanyById(resp)
			})
		},
		downloadFiles(item) {
			return $axios.$get(`/download/file/?path=${item}`, {responseType: 'blob'})
				.then(resp => {
					return resp
				})
		},
		getListPeopleInCompany(id, keyword) {
			const obj = {
				page: keyword.currentPage,
				limit: keyword.perPage,
				region: keyword.region,
				keyword: keyword.keyword,
				province: keyword.province,
				searchBy: keyword.searchBy

			}
			let str = qs.stringify(obj);
			return $axios.$get(`${resourcePath}/company/${id}/people?${str}`).then(resp => {
				const rawData = _.get(resp, 'data', [])
				return {
					totalAll: _.get(resp, 'totalAll', 0),
					total: _.get(resp, 'total', 0),
					data: _.map(rawData, item => ({
						id: _.get(item, 'id', ''),
						firstName: _.get(item, 'firstName', ''),
						lastName: _.get(item, 'lastName', ''),
						position: _.get(item, 'position', ''),
						companyId: _.get(item, 'companyId', ''),
						companyName: _.get(item, 'companyName', ''),
						branch: _.get(item, 'branch', ''),
						brand: {
							id: _.get(item, '.brand.id', ''),
							name: _.get(item, 'brand.name', '')
						},
						customerType: {
							id: _.get(item, 'customerType.id', ''),
							name: _.get(item, 'customerType.name', '')
						},
						partner: [{
							id: _.get(item, 'partner.id', ''),
							name: _.get(item, 'partner.name', '')
						}],
						address: {
							address: _.get(item, 'address.address', ''),
							alley: _.get(item, 'address.alley', ''),
							subDistrict: _.get(item, 'address.subDistrict', ''),
							district: _.get(item, 'address.district', ''),
							province: _.get(item, 'address.province', ''),
							zipCode: _.get(item, 'address.zipCode', '')
						},
						region: _.get(item, 'region', ''),
						phone1: _.get(item, 'phone1', ''),
						phone2: _.get(item, 'phone2', ''),
						phone3: _.get(item, 'phone3', ''),
						email: _.get(item, 'email', ''),
						lineId: _.get(item, 'lineId', ''),
						note: _.get(item, 'note', ''),
						status: _.get(item, 'status', ''),
						updateBy: {
							id: _.get(item, 'updateBy.id', ''),
							name: _.get(item, 'updateBy.name', ''),
							username: _.get(item, 'updateBy.username', ''),
							team: {
								id: _.get(item, 'updateBy.team.id', ''),
								name: _.get(item, 'updateBy.team.name', ''),
							}
						},
						createAt: _.get(item, 'createAt', '')
					}))
				}
			})
		},
		searchPeopleInCompany(id, keyword) {
			const obj = {
				page: keyword.currentPage,
				limit: keyword.perPage,
				customerType: keyword.customerType,
				province: keyword.province,
				region: keyword.region,
				insurance: keyword.insurance,
				searchBy: keyword.searchBy,
				keyword: keyword.keyword,
			}
			const removeEmpty = (obj) => {
				Object.keys(obj).forEach(key => {
					if (_.isObject(obj[key])) removeEmpty(obj[key]);
					if (_.isNumber(obj[key])) {

					} else if (_.isNil(obj[key]) || _.isEmpty(obj[key])) {
						delete obj[key];
					}
				});
				return obj;
			};
			const data = removeEmpty(obj)
			let str = qs.stringify(data);
			return $axios.$get(`${resourcePath}/company/${id}/people?${str}`).then(resp => {
				const rawData = _.get(resp, 'data', [])
				return {
					totalAll: _.get(resp, 'totalAll', 0),
					total: _.get(resp, 'total', 0),
					data: _.map(rawData, item => ({
						id: _.get(item, 'id', ''),
						companyId: _.get(item, 'company._id', ''),
						companyName: _.get(item, 'company.companyName', ''),
						branch: _.get(item, 'branch'),
						brand: {
							id: _.get(item, 'brand.id', ''),
							name: _.get(item, 'brand.name', '')
						},
						customerType: {
							id: _.get(item, 'customerType.id', ''),
							name: _.get(item, 'customerType.name', '')
						},
						partner: [{
							id: _.get(item, 'partner.id', ''),
							name: _.get(item, 'partner.name', '')
						}],
						firstName: _.get(item, 'firstName', ''),
						lastName: _.get(item, 'lastName', ''),
						position: _.get(item, 'position', ''),
						address: {
							address: _.get(item, 'address.address', ''),
							alley: _.get(item, 'address.alley', ''),
							subDistrict: _.get(item, 'address.subDistrict', ''),
							district: _.get(item, 'address.district', ''),
							province: _.get(item, 'address.province', ''),
							zipCode: _.get(item, 'address.zipCode', '')
						},
						region: _.get(item, 'region', ''),
						phone1: _.get(item, 'phone1', ''),
						phone2: _.get(item, 'phone2', ''),
						phone3: _.get(item, 'phone3', ''),
						email: _.get(item, 'email', ''),
						lineId: _.get(item, 'lineId', ''),
						note: _.get(item, 'note', ''),
						status: _.get(item, 'status', ''),
						updateBy: {
							id: _.get(item, 'updateBy.id', ''),
							name: _.get(item, 'updateBy.name', ''),
							username: _.get(item, 'updateBy.username', ''),
							team: {
								id: _.get(item, 'updateBy.team.id'),
								name: _.get(item, 'updateBy.team.name')
							}
						},
						updatedAt: moment(_.get(item, 'updateAt', '')).format('DD/MM/YYYY HH:mm'),
						createBy: {
							id: _.get(item, 'createBy.id', ''),
							name: _.get(item, 'createBy.name', ''),
							username: _.get(item, 'createBy.username', ''),
							team: {
								id: _.get(item, 'team.id', ''),
								name: _.get(item, 'team.name', '')
							}
						},
						createdAt: moment(_.get(item, 'createAt', '')).format('DD/MM/YYYY HH:mm'),
					}))
				}
			})
		},
		createPeopleCompany(item) {
			return $axios.$post(`${resourcePath}/people`, item).then(resp => {
				return resp
			})
		},
		getDetailPeopleInCompanyById(id) {
			return $axios.$get(`${resourcePath}/people/${id}`).then(resp => {
				return {
					id: _.get(resp, 'id', ''),
					companyId: _.get(resp, 'companyId', ''),
					companyName: _.get(resp, 'companyName', ''),
					branch: _.get(resp, 'branch'),
					brand: {
						id: _.get(resp, 'brand.id', ''),
						name: _.get(resp, 'brand.name', '')
					},
					customerType: {
						id: _.get(resp, 'customerType.id', ''),
						name: _.get(resp, 'customerType.name', '')
					},
					partner: _.map(_.get(resp,'partner',[])),
					garage: _.map(_.get(resp,'garage',[])),
					firstName: _.get(resp, 'firstName', ''),
					lastName: _.get(resp, 'lastName', ''),
					position: _.get(resp, 'position', ''),
					address: {
						address: _.get(resp, 'address.address', ''),
						alley: _.get(resp, 'address.alley', ''),
						subDistrict: _.get(resp, 'address.subDistrict', ''),
						district: _.get(resp, 'address.district', ''),
						province: _.get(resp, 'address.province', ''),
						zipCode: _.get(resp, 'address.zipCode', '')
					},
					region: _.get(resp, 'region', ''),
					phone1: _.get(resp, 'phone1', ''),
					phone2: _.get(resp, 'phone2', ''),
					phone3: _.get(resp, 'phone3', ''),
					email: _.get(resp, 'email', ''),
					lineId: _.get(resp, 'lineId', ''),
					note: _.get(resp, 'note', ''),
					status: _.get(resp, 'status', ''),
					updateBy: {
						id: _.get(resp, 'updateBy.id', ''),
						name: _.get(resp, 'updateBy.name', ''),
						username: _.get(resp, 'updateBy.username', ''),
						team: {
							id: _.get(resp, 'updateBy.team.id'),
							name: _.get(resp, 'updateBy.team.name')
						}
					},
					updatedAt: moment(_.get(resp, 'updateAt', '')).format('DD/MM/YYYY HH:mm'),
					createBy: {
						id: _.get(resp, 'createBy.id', ''),
						name: _.get(resp, 'createBy.name', ''),
						username: _.get(resp, 'createBy.username', ''),
						team: {
							id: _.get(resp, 'createBy.team.id', ''),
							name: _.get(resp, 'createBy.team.name', '')
						}
					},
					createdAt: moment(_.get(resp, 'createAt', '')).format('DD/MM/YYYY HH:mm'),
				}
			})
		},
		updatePeopleInCompany(data) {
			return $axios.$put(`${resourcePath}/people/${data.id}`, data).then(resp => {
				return resp
			})
		},
		exportViewPeopleInCom(keyword, id) {
			const obj = {
				page: keyword.currentPage,
				limit: keyword.perPage,
				customerType: keyword.customerType,
				province: keyword.province,
				region: keyword.region,
				insurance: keyword.insurance,
				searchBy: keyword.searchBy,
				keyword: keyword.keyword,
			}
			const removeEmpty = (obj) => {
				Object.keys(obj).forEach(key => {
					if (_.isObject(obj[key])) removeEmpty(obj[key]);
					if (_.isNumber(obj[key])) {

					} else if (_.isNil(obj[key]) || _.isEmpty(obj[key])) {
						delete obj[key];
					}
				});
				return obj;
			};
			const data = removeEmpty(obj)
			let str = qs.stringify(data);
			return $axios.$get(`${resourcePath}/people/export/view/${id}?${str}`, {responseType: 'blob'})
				.then(resp => {
					return resp
				})
		},
		exportAllPeopleInCom(keyword, id) {
			const obj = {
				page: keyword.currentPage,
				limit: keyword.perPage,
				customerType: keyword.customerType,
				province: keyword.province,
				region: keyword.region,
				insurance: keyword.insurance,
				searchBy: keyword.searchBy,
				keyword: keyword.keyword,
			}
			const removeEmpty = (obj) => {
				Object.keys(obj).forEach(key => {
					if (_.isObject(obj[key])) removeEmpty(obj[key]);
					if (_.isNumber(obj[key])) {

					} else if (_.isNil(obj[key]) || _.isEmpty(obj[key])) {
						delete obj[key];
					}
				});
				return obj;
			};
			const data = removeEmpty(obj)
			let str = qs.stringify(data);
			return $axios.$get(`${resourcePath}/people/export/all/${id}?${str}`, {responseType: 'blob'})
				.then(resp => {
					return resp
				})
		},
		getHistoryLog(id) {
			return $axios.$get(`/contactLog?id=${id}`).then(resp => {
				const logsData = _.get(resp, 'logs', '')
				return {
					id: _.get(resp, 'id', ''),
					contactId: _.get(resp, 'contactId', ''),
					logs: _.map(logsData, item => ({
						field: _.get(item, 'field', ''),
						detail: _.get(item, 'detail', ''),
						remark: _.get(item, 'remark', ''),
						team: _.get(item, 'team', ''),
						agent: _.get(item, 'agent', ''),
						timestamp: _.get(item, 'timestamp', ''),
					})),
					createAt: _.get(resp, 'createAt', '') ? moment(_.get(resp, 'createAt', '')).format('DD/MM/YYYY HH:mm') : '',
				}
			})
		},
		getPersonalListAll(keyword) {
			const obj = {
				page: keyword.currentPage,
				limit: keyword.perPage,
				customerType: keyword.customerType,
				province: keyword.province,
				region: keyword.region,
				insurance: keyword.insurance,
				searchBy: keyword.searchBy,
				keyword: keyword.keyword,
			}
			const removeEmpty = (obj) => {
				Object.keys(obj).forEach(key => {
					if (_.isObject(obj[key])) removeEmpty(obj[key]);
					if (_.isNumber(obj[key])) {

					} else if (_.isNil(obj[key]) || _.isEmpty(obj[key])) {
						delete obj[key];
					}
				});
				return obj;
			};
			const data = removeEmpty(obj)
			let str = qs.stringify(data);
			return $axios.$get(`${resourcePath}/personal?${str}`)
				.then(resp => {
					const rawData = _.get(resp, 'data', '')
					return {
						totalAll: _.get(resp, 'totalAll', 0),
						total: _.get(resp, 'total', 0),
						data: _.map(rawData, item => ({
							id: _.get(item, 'id', ''),
							address: {
								address: _.get(item, 'address.address', ''),
								alley: _.get(item, 'address.alley', ''),
								subDistrict: _.get(item, 'address.subDistrict', ''),
								district: _.get(item, 'address.district', ''),
								province: _.get(item, 'address.province', ''),
								zipCode: _.get(item, 'address.zipCode', ''),
								region: _.get(item, 'address.region', ''),
							},
							branch: _.get(item, 'branch', ''),
							brand: {
								id: _.get(item, 'brand.id', '-'),
								name: _.get(item, 'brand.name', '-')
							},
							company: _.get(item, 'company', ''),
							createdAt: _.get(item, 'createdAt', ''),
							createdBy: _.get(item, 'createdBy', ''),
							customerType: {
								id: _.get(item, 'customerType.id', ''),
								name: _.get(item, 'customerType.name', '')
							},
							email: _.get(item, 'email', ''),
							firstName: _.get(item, 'firstName', ''),
							lastName: _.get(item, 'lastName', ''),
							lineId: _.get(item, 'lineId', ''),
							note: _.get(item, 'note', ''),
							status: _.get(item, 'status', ''),
							partner: _.get(item, 'partner', ''),
							garage: _.get(item, 'garage', ''),
							phone1: _.get(item, 'phone1', ''),
							phone2: _.get(item, 'phone2', ''),
							phone3: _.get(item, 'phone3', ''),
							position: _.get(item, 'position', ''),
							updatedAt: _.get(item, 'updatedAt', ''),
							updatedBy: _.get(item, 'updatedBy', ''),
						}))
					}

				})
		},
		searchPersonalList(keyword) {
			const obj = {
				page: keyword.currentPage,
				limit: keyword.perPage,
				customerType: keyword.customerType,
				province: keyword.province,
				region: keyword.region,
				insurance: keyword.insurance,
				searchBy: keyword.searchBy,
				keyword: keyword.keyword,
				name: keyword.name,
				phone: keyword.phone,
				email: keyword.email,
			}
			const removeEmpty = (obj) => {
				Object.keys(obj).forEach(key => {
					if (_.isObject(obj[key])) removeEmpty(obj[key]);
					if (_.isNumber(obj[key])) {

					} else if (_.isNil(obj[key]) || _.isEmpty(obj[key])) {
						delete obj[key];
					}
				});
				return obj;
			};
			const data = removeEmpty(obj)
			let str = qs.stringify(data);
			return $axios.$get(`${resourcePath}/personal/?${str}`).then(resp => {
				const rawData = _.get(resp, 'data', '')
				return {
					totalAll: _.get(resp, 'totalAll', 0),
					total: _.get(resp, 'total', 0),
					data: _.map(rawData, item => ({
						id: _.get(item, 'id', ''),
						address: {
							address: _.get(item, 'address.address', ''),
							alley: _.get(item, 'address.alley', ''),
							subDistrict: _.get(item, 'address.subDistrict', ''),
							district: _.get(item, 'address.district', ''),
							province: _.get(item, 'address.province', ''),
							zipCode: _.get(item, 'address.zipCode', ''),
							region: _.get(item, 'address.region', ''),
						},
						branch: _.get(item, 'branch', ''),
						brand: !_.isObject(item.brand) ? _.get(item, 'brand', '') : '',
						company: _.get(item, 'company', ''),
						createdAt: _.get(item, 'createdAt', ''),
						createdBy: _.get(item, 'createdBy', ''),
						customerType: {
							id: _.get(item, 'customerType.id', ''),
							name: _.get(item, 'customerType.name', '')
						},
						email: _.get(item, 'email', ''),
						firstName: _.get(item, 'firstName', ''),
						lastName: _.get(item, 'lastName', ''),
						lineId: _.get(item, 'lineId', ''),
						note: _.get(item, 'note', ''),
						partner: _.get(item, 'partner', ''),
						garage: _.get(item, 'garage', ''),
						phone1: _.get(item, 'phone1', ''),
						phone2: _.get(item, 'phone2', ''),
						phone3: _.get(item, 'phone3', ''),
						position: _.get(item, 'position', ''),
						updatedAt: _.get(item, 'updatedAt', ''),
						updatedBy: _.get(item, 'updatedBy', ''),
					}))
				}
			})
		},
		createPersonal(item) {
			return $axios.$post(`${resourcePath}/personal`, item).then(resp => {
				return resp
			})
		},
		getPersonalByid(id) {
			return $axios.$get(`${resourcePath}/personal/${id}`).then(resp => {
				return {
					id: _.get(resp, 'id', ''),
					address: {
						address: _.get(resp, 'address.address', ''),
						alley: _.get(resp, 'address.alley', ''),
						subDistrict: _.get(resp, 'address.subDistrict', ''),
						district: _.get(resp, 'address.district', ''),
						province: _.get(resp, 'address.province', ''),
						zipCode: _.get(resp, 'address.zipCode', '')
					},
					firstName: _.get(resp, 'firstName', ''),
					lastName: _.get(resp, 'lastName', ''),
					position: _.get(resp, 'position', ''),
					company: _.get(resp, 'company', ''),
					branch: _.get(resp, 'branch', ''),
					brand: {
						id: _.get(resp, 'brand.id', ''),
						name: _.get(resp, 'brand.name', '')
					},
					customerType: {
						id: _.get(resp, 'customerType.id', '-'),
						name: _.get(resp, 'customerType.name', '-'),
					},
					phone1: _.get(resp, 'phone1', ''),
					phone2: _.get(resp, 'phone2', ''),
					phone3: _.get(resp, 'phone3', ''),
					email: _.get(resp, 'email', ''),
					lineId: _.get(resp, 'lineId', ''),
					note: _.get(resp, 'note', ''),
					status: _.get(resp, 'status', []),
					partnerName: _.get(resp, 'partner', []),
					partner: _.map(_.get(resp, 'partner', []), 'id'),
					garageName: _.get(resp, 'garage', []),
					garage: _.map(_.get(resp, 'garage', []), 'id'),
					createdAt: _.get(resp, 'createdAt', '') ? moment(_.get(resp, 'createdAt', '')).format('DD/MM/YYYY HH:mm') : '',
					createdBy: {
						id: _.get(resp, 'createdBy.id', ''),
						name: _.get(resp, 'createdBy.name', ''),
					},
					updatedAt: _.get(resp, 'updatedAt', '') ? moment(_.get(resp, 'updatedAt', '')).format('DD/MM/YYYY HH:mm') : '',
					updatedBy: {
						id: _.get(resp, 'updatedBy.id', ''),
						name: _.get(resp, 'updatedBy.name', ''),
					},
					username: _.get(resp, 'username', ''),
					team: _.get(resp, 'team', '')
				}
			})
		},
		deleteFile(id, data) {
			var str = qs.stringify(data)
			return $axios.delete(`${resourcePath}/company/${id}/delete?${str}`).then(resp => {
				return resp
			})
		},
		updatePersonal(item) {
			return $axios.$put(`${resourcePath}/personal/${item.id}`, item).then(resp => {
				return resp
			})
		},
		findProvince(obj) {
			return $axios.$get(`province?${obj}`).then(resp => {
				return resp
			})
		},
		getProvinceById(id) {
			return $axios.$get(`province/${id}/province`).then(resp => {
				return resp
			})
		},
		searchPersonal(item) {
			return $axios.$get(`${resourcePath}/personal/export/all/?${item}`).then(resp => {
				return resp
			})
		},
		getProvinceByRegion(id) {
			const obj = {
				geoName: id
			}
			let str = qs.stringify(obj);
			return $axios.$get(`geo/?${str}`).then(resp => {
				return _.map(resp.data, data => {
					return {
						'value': _.get(data, 'province', ''),
						'text': _.get(data, 'province', ''),
					}
				})
			})
		},
		ExportCompanyListAll(keyword) {
			const obj = {
				page: keyword.currentPage,
				limit: keyword.perPage,
				customerType: keyword.customerType,
				province: keyword.province,
				region: keyword.region,
				insurance: keyword.insurance,
				searchBy: keyword.searchBy,
				keyword: keyword.keyword,
			}
			const removeEmpty = (obj) => {
				Object.keys(obj).forEach(key => {
					if (_.isObject(obj[key])) removeEmpty(obj[key]);
					if (_.isNumber(obj[key])) {

					} else if (_.isNil(obj[key]) || _.isEmpty(obj[key])) {
						delete obj[key];
					}
				});
				return obj;
			};
			const data = removeEmpty(obj)
			let str = qs.stringify(data);
			return $axios.$get(`${resourcePath}/company/export/all?${str}`, {responseType: 'blob'}).then(resp => {
				return resp
			})
		},
		ExportCompanyListView(keyword) {
			const obj = {
				page: keyword.currentPage,
				limit: keyword.perPage,
				customerType: keyword.customerType,
				province: keyword.province,
				region: keyword.region,
				insurance: keyword.insurance,
				searchBy: keyword.searchBy,
				keyword: keyword.keyword,
			}
			const removeEmpty = (obj) => {
				Object.keys(obj).forEach(key => {
					if (_.isObject(obj[key])) removeEmpty(obj[key]);
					if (_.isNumber(obj[key])) {

					} else if (_.isNil(obj[key]) || _.isEmpty(obj[key])) {
						delete obj[key];
					}
				});
				return obj;
			};
			const data = removeEmpty(obj)
			let str = qs.stringify(data);
			return $axios.$get(`${resourcePath}/company/export/view?${str}`, {responseType: 'blob'}).then(resp => {
				return resp
			})
		},
		ExportPersonalListAll(keyword) {
			const obj = {
				customerType: keyword.customerType,
				province: keyword.province,
				region: keyword.region,
				insurance: keyword.insurance,
				searchBy: keyword.searchBy,
				keyword: keyword.keyword,
			}
			const removeEmpty = (obj) => {
				Object.keys(obj).forEach(key => {
					if (_.isObject(obj[key])) removeEmpty(obj[key]);
					if (_.isNumber(obj[key])) {

					} else if (_.isNil(obj[key]) || _.isEmpty(obj[key])) {
						delete obj[key];
					}
				});
				return obj;
			};
			const data = removeEmpty(obj)
			let str = qs.stringify(data);
			return $axios.$get(`${resourcePath}/personal/export/all?${str}`, {responseType: 'blob'}).then(resp => {
				return resp
			})
		},
		ExportPersonalListView(keyword) {
			const obj = {
				customerType: keyword.customerType,
				province: keyword.province,
				region: keyword.region,
				insurance: keyword.insurance,
				searchBy: keyword.searchBy,
				keyword: keyword.keyword,
			}
			const removeEmpty = (obj) => {
				Object.keys(obj).forEach(key => {
					if (_.isObject(obj[key])) removeEmpty(obj[key]);
					if (_.isNumber(obj[key])) {

					} else if (_.isNil(obj[key]) || _.isEmpty(obj[key])) {
						delete obj[key];
					}
				});
				return obj;
			};
			const data = removeEmpty(obj)
			let str = qs.stringify(data);
			return $axios.$get(`${resourcePath}/personal/export/view?${str}`, {responseType: 'blob'}).then(resp => {
				return resp
			})
		},
		getContactByPhonePopup (phone) {
			return $axios.$get(`popup/${phone}`).then(resp => {
				let companyArr = _.get(resp, 'company', [])
				let personalArr = _.get(resp, 'personal', [])
				return _.concat(companyArr,personalArr)
			})
		},
		exportContactAdmin (keyword) {
			var obj = {
				page: keyword.currentPage,
				limit: keyword.perPage,
				customerType: keyword.customerType,
				province: keyword.province,
				region: keyword.region,
				insurance: keyword.insurance,
				searchBy: keyword.searchBy,
				keyword: keyword.keyword,
				status: keyword.status,
				brand: keyword.brand,
				phone: keyword.phone,
       			companyName: keyword.companyName,
			}
			const removeEmpty = (obj) => {
				Object.keys(obj).forEach(key => {
					if (_.isObject(obj[key])) removeEmpty(obj[key]);
					if (_.isNumber(obj[key])) {

					} else if (_.isNil(obj[key]) || _.isEmpty(obj[key])) {
						delete obj[key];
					}
				});
				return obj;
			};
			const data = removeEmpty(obj)
			let str = qs.stringify(data);
			return $axios.$get(`${resourcePath}/company/export/admin?${str}`, {responseType: 'blob'}).then(resp => {
				return resp
			})
		}


	}
)
