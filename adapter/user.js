import qs from 'qs'

export default $axios => (resourcePath) => (
	{
		_mapDataUser (data){
			return {
				id: _.get(data, 'id', ''),
				name: _.get(data, 'name', ''),
				roles: _.get(data, 'roles' , []),
				suspended: _.get(data, 'suspended', ''),
				team: {
					id: _.get(data, 'team.id', ''),
					name: _.get(data, 'team.name', '')
				},
				email: _.get(data, 'email', ''),
				createdAt: _.get(data, 'createdAt', ''),
				updatedAt: _.get(data, ' updatedAt', ''),
				updatedBy: _.get(data, 'updatedBy', ''),
				username: _.get(data, 'username','')
			}
		},
		login(data) {
			let str = qs.stringify(data)
			return $axios.$get(`login?${str}`).then(resp => {
				return resp
			})
		},
		forgotPassword(email) {
			return $axios.$get(`${resourcePath}/forgot-password?email=${email}`).then(resp => {
				return resp.data
			})
		},
		getProvince() {
			return $axios.$get(`https://api.hih.wealthup.dev/provinces`).then(resp => {
				return resp
			})
		},
		getRegistration() {
			return $axios.$get(`https://5d5a12942257cc0014962160.mockapi.io/registration`).then(resp => {
				return resp.data
			})
		},
		getAllProfile() {
			return $axios.$get(`/profile`)
				.then(resp => {
					const rawData = _.get(resp, 'data','')
					return {
						total: _.get(resp, 'total', 0),
						data: _.map(rawData, item => this._mapDataUser(item))
					}
				})
		},
		checkResp() {
			return $axios.$get(`/user/me/session`)
				.then(resp => {
					return resp
				})
		},
		CheckSession() {
			return $axios.$patch(`/user/session`)
				.then(resp => {
					return resp
				})
		},
		logout() {
			return $axios.$get('/user/logout')
				.then(() => {
					console.log('user logged out')
				})
		},
		changePassword(data){
			return $axios.$put(`/profile/changePassword`,data).then(resp => {
				return resp
			})
		},
		resetPassword(id){
			return $axios.$put(`/profile/${id}/resetPassword`).then(resp => {
				return resp
			})
		},
		deactivatedUser (id){
			return $axios.$put(`/profile/${id}/deactivate`).then(resp => {
				return resp
			})
		},
		activatedUser (id) {
			return $axios.$put(`/profile/${id}/activate`).then(resp => {
				return resp
			})
		},
		createUser(data){
			return $axios.$post(`/profile`, data).then(resp => {
				return resp
			})
		},
		editUser(data, id) {
			return $axios.$put(`/profile/${id}`, data).then(resp => {
				return resp
			})
		}
	}
)
