import * as jwt from 'jsonwebtoken'
export default ($userAdapter,$store) => () => ({
    forgotPassword (email) {
        $userAdapter.ForgotPassword(email).then(resp => {
            console.log(resp)
        })
    },
    getProvince () {
        return $userAdapter.getProvince().then(resp =>{
            return resp
        })
    },
    getRegistration (){
        return $userAdapter.getRegistration().then(resp =>{
            return true
        })
    },
	getAllProfile(){
		return $userAdapter.getAllProfile()
			.then(resp =>{
				return resp
			})
	},
	login(data){
		return $userAdapter.login(data).then(resp => {
			let dataToken = jwt.decode(resp.accessToken, {complete: true})
			let user = {
				id: dataToken.payload.id,
				name: dataToken.payload.name,
				department: dataToken.payload.department,
				email: dataToken.payload.email,
				roles: dataToken.payload.roles,
				isSuspended: dataToken.payload.isSuspended,
				permissions: dataToken.payload.permissions,
				iat: dataToken.payload.iat,
				exp: dataToken.payload.exp,
			}
			let permission = dataToken.payload.permissions
			localStorage.setItem('token', resp.accessToken)
			$store.dispatch('setUser', user)
			$store.dispatch('setPermission', permission);
		})
	},
	createUser(form) {
		let data = {
			name : form.name,
			username : form.username,
			password : form.password,
			email : form.email,
			team : form.team,
			roles : form.roles
		}
		return $userAdapter.createUser(data).then(resp => {
			return resp
		})
	},
	editUser(userEditData, edit) {
		let data = {
			name : userEditData.name,
			username : userEditData.username,
			email : userEditData.email,
			team : userEditData.team.id,
			roles : edit.roles
		}
		return $userAdapter.editUser(data,userEditData.id).then(resp => {
			return resp
		})
	},
	setRolesUser(roles,id){
		let data = {
			roles: roles
		}
		return $userAdapter.setRolesUser(data,id).then(resp => {
			return resp
		})
	},

})
