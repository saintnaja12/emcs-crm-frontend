import _ from 'lodash'

export default ($masterAdapter,$store) => () => ({

	getAllPartner() {
		$masterAdapter.getAllPartner()
			.then(resp => {
			$store.dispatch('setPartnersLists', resp)
		})
	},

	getAllContactedGarage() {
		$masterAdapter.getAllContactedGarage()
			.then(resp => {
				$store.dispatch('setContactedGarage',resp)
			})
	},

	getAllHashtag() {
		$masterAdapter.getAllHashTag()
			.then(resp => {
				$store.dispatch('setHashtagList', resp)
			})
	},

	getAllCustomerType() {
		$masterAdapter.getAllCustomerType()
			.then(resp => {
				$store.dispatch('setCustomerTypeList', resp)
			})
	},

	getAllBrand() {
		$masterAdapter.getAllBrand()
			.then(resp => {
				$store.dispatch('setBrandList', resp)
			})
	},

	getAllApplications() {
		$masterAdapter.getAllApplications()
			.then(resp => {
				$store.dispatch('setApplicationList', resp)
			})
	},

	getAllCategoryIssue() {
		$masterAdapter.getAllCategoryIssue()
			.then(resp => {
				$store.dispatch('setCategoryIssueList', resp)
			})
	},

	getAllTeam() {
		$masterAdapter.getAllTeam()
			.then(resp => {
				$store.dispatch('setTeamList', resp)
			})
	},

	getAllSubject() {
		$masterAdapter.getAllSubject()
			.then(resp => {
				$store.dispatch('setSubjectList', resp)
			})
	},

	getAllStatus() {
		$masterAdapter.getAllStatus()
			.then(resp => {
				$store.dispatch('setStatusList', resp)
			})
	},

	mainSubject() {
		return $masterAdapter.mainSubject()
			.then(resp => {
				return resp
			})
	},

	reCallMain() {
		this.mainSubject()
	},

	createCustomerType(item){
		const data = {
			"name": item
		};
		return $masterAdapter.createCustomerType(data).then(resp =>{
			this.getAllCustomerType()
			return resp
		})
	},

	createBrand(item){
		const data = {
			"name": item
		};
		return $masterAdapter.createBrand(data).then(resp =>{
			this.getAllBrand()
			return resp
		})
	},

	createApplication(item){
		const data = {
			"name": item
		};
		return $masterAdapter.createApplication(data).then(resp =>{
			this.getAllApplications()
			return resp
		})
	},

	createCategoryIssue(item){
		const data = {
			"name": item
		};
		return $masterAdapter.createCategoryIssue(data).then(resp =>{
			this.getAllCategoryIssue()
			return resp
		})
	},

	createTeam(item,name){
		const data = {
			"name": item,
			"shortName": name
		};
		return $masterAdapter.createTeam(data).then(resp =>{
			this.getAllTeam()
			return resp
		})
	},

	createPartner(item){
		const data = {
			"name": item
		};
		return $masterAdapter.createPartner(data).then(resp =>{
			this.getAllPartner()
			return resp
		})
	},

	createHashtag(item){
		const data = {
			"name": item
		};
		return $masterAdapter.createHashtag(data).then(resp =>{
			this.getAllHashtag()
			return resp
		})
	},

	createMainSubject(item){
		const data = {
			"name" : _.toString( item.subject ),
			"type" : "MAIN",
			"low": 0,
			"medium": 0,
			"high" : 0,
		}
		return $masterAdapter.createMainSubject(data).then(resp =>{
			this.getAllSubject()
			return resp
		})
	},

	createSubSubject(item){
		const data = {
			"name" : item.name,
			"type" : "SUB",
			"urgent": _.toNumber(item.urgentSla),
			"low": _.toNumber(item.lowSla),
			"medium": _.toNumber(item.medSla),
			"high" : _.toNumber(item.highSla),
			"group": item.group
		};
		return $masterAdapter.createMainSubject(data).then(resp =>{
			this.getAllSubject()
			return resp
		})
	},

	createStatus(item) {
		const data = {
			"name" : item
		};
		return $masterAdapter.createStatus(data).then(resp => {
			this.getAllStatus()
			return resp
		})
	},

	createContactGarage(item) {
		const data = {
			"name" : item
		};
		return $masterAdapter.createContactGarage(data).then(resp => {
			this.getAllContactedGarage()
			return resp
		})
	},

	updateSubSubject ( info , detail ){
		let data = {
			"id": detail.id,
			"name": info,
			"low" : _.toNumber(detail.SLA.low),
			"medium" : _.toNumber(detail.SLA.medium),
			"high": _.toNumber(detail.SLA.high),
			"urgent": _.toNumber(detail.SLA.urgent)
		};
		return $masterAdapter.updateSubject(data).then(resp => {
			this.getAllSubject()
			return true
		})
	},

	updateTeam ( info , detail ){
		let data = {
			"id": detail.id,
			"name": info,
			"shortName": detail.shortName
		};
		return $masterAdapter.updateTeam(data).then(resp => {
			this.getAllTeam()
			return true
		})
	},

	updateDataMaster ( info, detail ,state) {
		let data = {
			"id": detail.id,
			"name": info,
		}

		if ( state === 'customerType') {
			return $masterAdapter.updateCustomerType(data).then(resp => {
				this.getAllCustomerType()
				return true
			})
		}
		else if ( state === 'brand') {
			return $masterAdapter.updateBrand(data).then(resp => {
				this.getAllBrand()
				return true
			})
		}
		else if ( state === 'application') {
			return $masterAdapter.updateApplication(data).then(resp => {
				this.getAllApplications()
				return true
			})
		}
		else if ( state === 'issue') {
			return $masterAdapter.updateIssue(data).then(resp => {
				this.getAllCategoryIssue()
				return true
			})
		}
		else if ( state === 'hashtag') {
			return $masterAdapter.updateHashtag(data).then(resp => {
				this.getAllHashtag()
				return true
			})
		}
		else if ( state === 'partner') {
			return $masterAdapter.updatePartner(data).then(resp => {
				this.getAllPartner()
				return true
			})
		}
		else if ( state == 'contactedGarage') {
			return $masterAdapter.updateContactGarage(data).then(resp => {
				this.getAllContactedGarage()
				return true
			})
		}
		else if ( state == 'subject') {
			return $masterAdapter.updateSubject(data).then(resp => {
				this.getAllSubject()
				return true
			})
		}
		else if ( state === 'status') {
			return $masterAdapter.updateStatus(data).then(resp => {
				this.getAllStatus()
				return true
			})
		}
	},

	getAllRoles(){
		return $masterAdapter.getAllRoles()
			.then(resp =>{
				return resp
			})
	},

	createRoles(item) {
		const data = {
			"role" : item,
			"active" : true,
			"permissionMenu": [],
			"permissionFunction": [],
			"permissionField": {
				"company" : [],
				"people" : [],
				"personal": [],
				"ticket": []
			}
		};
		return $masterAdapter.createRoles(data).then(resp =>{
			this.getAllRoles()
			return resp
		})
	},

	addPermission(data) {
		const item = {
			'role': data.role,
			'permissionMenu': data.permission.permissionMenu,
			'permissionFunction': data.permission.permissionFunction,
			'permissionField' : data.permission.permissionField,
			'active': data.active
		}

		return $masterAdapter.updateRole(data.id,item).then(resp =>{
			this.getAllRoles()
			return resp
		})
	},

	activeRole(data,active){
		const item = {
			'role': data.role,
			'permissionMenu': data.permission.permissionMenu,
			'permissionFunction': data.permission.permissionFunction,
			'permissionField' : data.permission.permissionField,
			'active': active
		};
		return $masterAdapter.updateRole(data.id,item).then(resp =>{
			this.getAllRoles()
			return resp
		})
	},

	updateRoleName(data,detail){
		const item = {
			'role': data,
			'permissionMenu': detail.permission.permissionMenu,
			'permissionFunction': detail.permission.permissionFunction,
			'permissionField' : detail.permission.permissionField,
			'active': detail.active
		};
		return $masterAdapter.updateRole(detail.id,item).then(resp =>{
			this.getAllRoles()
			return resp
		})
	}



})
