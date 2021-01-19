<template>
    <div id="sc-page-wrapper">
		<div id="sc-page-content">
			<ScCard>
				<ScCardTitle>
					<b-row>
						<b-col>User Management</b-col>
						<b-col>
							<div class="mt-2" align="right">
								<button
									class="sc-button sc-button-primary sc-button-social"
									@click="setPageCreateUser()"
								>Add New User</button>
							</div>
						</b-col>
					</b-row>
				</ScCardTitle>
				<ScCardBody>
					<div>
						<b-table
							bordered
							small
							:items="userList"
							:fields="fields"
						>
							<template v-slot:cell(username)="row">
								{{row.item.username ? row.item.username: '-'}}
							</template>
							<template v-slot:cell(name)="row">
								{{row.item.name ?  row.item.name: '-'}}
							</template>
							<template v-slot:cell(team)="row">
								{{row.item.team.id ? row.item.team.name : '-'}}
							</template>
							<template v-slot:cell(roles)="row">
								{{ mapDataRole(row.item.roles) }}
							</template>
							<template v-slot:cell(active)="row">
								<input
									type="checkbox"
									class="uk-checkbox"
									id="reporter"
									value="reporter"
									v-model="row.item.suspended"
									false-value="true"
									true-value="false"
									@click="handleSelected(row.item.id,row.item.suspended)"
								>
							</template>
							<template v-slot:cell(action)="row">
								<button
									class="sc-button sc-button-small md-bg-cyan-600"
									@click="viewDataUser(row.item)">
									<i class="mdi mdi-eye md-color-white sc-icon-18"></i>
								</button>
								<button
									class="sc-button sc-button-small md-bg-green-400"
									@click="editDataUser(row.item)"
								>
									<i class="mdi mdi-pencil md-color-white sc-icon-18"></i>
								</button>
							</template>
						</b-table>
					</div>
				</ScCardBody>
			</ScCard>
			<div>
				<b-modal
					id="modal-view-user"
					centered
					size="lg"
					hide-footer
				>
					<template v-slot:modal-header="{ close }">
						<h5>User Detail : {{userData.name}}</h5>
						<a href="javascript:void(0)" style="color: black;" @click="closeViewPage()">
							<i class="mdi mdi-close"></i>
						</a>
					</template>
					<div>
						<b-form-group
							label="Username :"
						>
							<b-form-input
								v-model="userData.username"
								disabled
							></b-form-input>
						</b-form-group>
						<b-form-group
							label="Name :"
						>
							<b-form-input
								v-model="userData.name"
								disabled
							></b-form-input>
						</b-form-group>
						<b-form-group
							label="Team :"
						>
							<b-form-input
								:value="userData.team ? userData.team.name : '-'"
								disabled
							></b-form-input>
						</b-form-group>
						<b-form-group
							label="Role :"
						>
							<b-form-input
								:value="mapDataRole(userData.roles)"
								disabled
							></b-form-input>
						</b-form-group>
						<b-row v-if="userData.updateAt">
							<b-col>
								<b-form-group
									label="Update At :"
								>
									<b-form-input
										v-model="userData.updatedAt"
										disabled
									></b-form-input>
								</b-form-group>
							</b-col>
							<b-col>
								<b-form-group
									label="Update By :"
								>
									<b-form-input
										v-model="userData.updatedBy"
										disabled
									></b-form-input>
								</b-form-group>
							</b-col>
						</b-row>
					</div>
				</b-modal>
			</div>
			<div>
				<b-modal
					id="modal-edit-user"
					centered
					size="lg"
					hide-footer
				>
					<template v-slot:modal-header="{ close }">
						<h5>Edit User : {{userData.name}}</h5>
						<a href="javascript:void(0)" style="color: black;" @click="closeEditPage()">
							<i class="mdi mdi-close"></i>
						</a>
					</template>
					<div>
						<b-form-group
							label="Username :"
						>
							<b-form-input
								v-model="userEditData.username"
								disabled
							></b-form-input>
						</b-form-group>
						<b-form-group
							label="Name :"
						>
							<b-form-input
								v-model="userEditData.name"
							></b-form-input>
						</b-form-group>
						<b-form-group
							label="email :"
						>
							<b-form-input
								v-model="userEditData.email"
							></b-form-input>
						</b-form-group>
						<b-form-group
							label="Team :"
						>
							<select v-model="userEditData.team.id" class="form-control" data-sc-input>
								<option> - Select Team -</option>
								<option
									v-for="option in team"
									v-bind:value="option.id"
								>{{ option.name }}
								</option>
							</select>
						</b-form-group>
						<b-form-group
							label="Roles :"
						>
							<b-form-checkbox-group
								id="checkbox-group-1"
								v-model="edit.roles"
								:options="rolesOptions"
								name="flavour-1"
								class="mr-2"
								align="center"
							></b-form-checkbox-group>
						</b-form-group>
					</div>
					<div>
						<b-row>
							<b-col></b-col>
							<b-col>
								<div class="mt-2" align="right">
									<button
										class="sc-button sc-button-primary sc-button-social"
										@click="updateUser(userEditData, edit)"
									>Save</button>
									<button
										class="sc-button sc-button-danger sc-button-social"
										@click="closeEditPage()"
									>Cancel</button>
								</div>
							</b-col>
						</b-row>
					</div>
				</b-modal>
			</div>
			<div>
				<b-modal
					id="modal-create-user"
					centered
					size="lg"
					hide-footer
				>
					<template v-slot:modal-header="{ close }">
						<h5>Create User </h5>
						<a href="javascript:void(0)" style="color: black;" @click="closeCreatePage()">
							<i class="mdi mdi-close"></i>
						</a>
					</template>
					<div>
						<b-form-group
							label="Username :"
						>
							<b-form-input
								v-model="form.username"
							></b-form-input>
						</b-form-group>
						<b-form-group
							label="Password :"
						>
							<b-form-input
								v-model="form.password"
								type="password"
								min="8"
							></b-form-input>
						</b-form-group>
						<b-form-group
							label="Name :"
						>
							<b-form-input
								v-model="form.name"
							></b-form-input>
						</b-form-group>
						<b-form-group
							label="Email :"
						>
							<b-form-input
								v-model="form.email"
								type="email"
							></b-form-input>
						</b-form-group>
						<b-form-group
							label="Team :"
						>
							<select v-model="form.team" class="form-control" data-sc-input>
								<option> - Select Team -</option>
								<option
									v-for="option in team"
									v-bind:value="option.id"
								>{{ option.name }}
								</option>
							</select>
						</b-form-group>
						<b-form-group
							label="Roles :"
						>
							<b-form-checkbox-group
								id="checkbox-group-1"
								v-model="form.roles"
								:options="rolesOptions"
								name="flavour-1"
								class="mr-2"
								align="center"
							></b-form-checkbox-group>
						</b-form-group>
					</div>
					<hr>
					<div>
						<b-row>
							<b-col></b-col>
							<b-col>
								<div class="mt-2" align="right">
									<button
										class="sc-button sc-button-primary sc-button-social"
										@click="createUser(form)"
									>Save</button>
									<button
										class="sc-button sc-button-danger sc-button-social"
										@click="closeCreatePage()"
									>Cancel</button>
								</div>
							</b-col>
						</b-row>
					</div>
				</b-modal>
			</div>
		</div>
	</div>
</template>

<script>
    import ScCard from "../../components/card/components/Card";
	import Buttons from "../src/components/buttons";
	import _ from "lodash";
	import Swal from "sweetalert2";
	export default {
        name: "User.vue",
		components: {Buttons, ScCard},
		data() {
			return {
				fields:[
					{key:'username', label: 'Username', class: 'text-left'},
					{key:'name', label: 'Name', class: 'text-left'},
					{key:'team', label: 'Team', class: 'text-left'},
					{key:'roles', label: 'Role', class: 'text-left'},
					{key:'active', label: 'Active', class: 'text-center'},
					{key:'action', label: '', class: 'text-center'},
				],
				userList:[],
				userData:{},
				userEditData:{
					id: '',
					name:'',
					roles: [],
					suspended: '',
					team: {
						id: '',
						name: ''
					},
					email: '',
					createdAt: '',
					updatedAt: '',
					updatedBy: '',
					username: ''
				},
				form: {
					name:'',
					username:'',
					password:'',
					email:'',
					team:'',
					roles: []
				},
				edit: {
					roles:[]
				},
				team:[],
				rolesOptions: []
			}
		},
		mounted() {
        	this.getUserList()
			this.getAllTeam()
			this.getAllRoles()
		},
		methods: {
        	getUserList () {
        		this.$userAdapter.getAllProfile().then(resp => {
        			this.userList = resp.data
				})
			},
			getAllRoles(){
				this.$masterService.getAllRoles().then(resp => {
					const data = _.map(resp.data, data => {
						return {
							'value': _.get(data, 'id', ''),
							'text': _.get(data, 'role', ''),
						}
					})
					this.rolesOptions = data
				})
			},
			mapDataRole(data) {
				const filter = _.filter(data, function(o) {return o.name;})
				let mapdata = ''
				if (!_.isEmpty(filter)) {
					mapdata = _.join(_.map(filter, 'name'), ', ')
				}else {
					mapdata = '-'
				}
				return mapdata
			},
			handleSelected(id, suspended) {
				if (suspended === false || suspended === "false") {
					this.$userAdapter.deactivatedUser(id).then(resp => {
						if (resp) {
							this.$bvToast.toast(`Deactivated User Successful`, {
								title: 'Successful',
								toaster: 'b-toaster-bottom-right toast-z-index',
								variant: 'warning',
								autoHideDelay: 500,
							})
						}
					}).catch(err => {
						this.$bvToast.toast(`Deactivated User Failed`, {
							title: 'Failed',
							toaster: 'b-toaster-bottom-right toast-z-index',
							variant: 'danger',
							autoHideDelay: 500,
						})
					})
				} else {
					this.$userAdapter.activatedUser(id).then(resp => {
						if (resp) {
							this.$bvToast.toast(`Activated User Successful`, {
								title: 'Successful',
								toaster: 'b-toaster-bottom-right toast-z-index',
								variant: 'success',
								autoHideDelay: 500,
							})
						}
					}).catch(err => {
						this.$bvToast.toast(`Activated User Failed`, {
							title: 'Failed',
							toaster: 'b-toaster-bottom-right toast-z-index',
							variant: 'danger',
							autoHideDelay: 500,
						})
					})
				}
			},
			viewDataUser (data) {
				this.userData = data
				this.$bvModal.show('modal-view-user')
			},
			closeViewPage () {
				this.$bvModal.hide('modal-view-user')
			},
			editDataUser (data) {
				this.userEditData = data
				this.edit.roles = _.map(data.roles, 'id')
				this.$bvModal.show('modal-edit-user')
			},
			closeEditPage () {
				this.$bvModal.hide('modal-edit-user')
				this.userEditData = {
					id: '',
					name:'',
					roles: [],
					suspended: '',
					team: {
					id: '',
						name: ''
					},
					email: '',
					createdAt: '',
					updatedAt: '',
					updatedBy: '',
					username: ''
				}
			},
			updateUser(userEditData, edit) {
				this.$userService.editUser(userEditData, edit).then(resp => {
					if(!!resp) {
						Swal.fire('Successful','แก้ไขข้อมูลสำเร็จ', 'success')
						this.$bvModal.hide('modal-edit-user')
						this.getUserList()
					}
				}).catch(err => {
					Swal.fire('Error!','แก้ไขข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ !' + err, 'error')
				})

			},
			setPageCreateUser(){
        		this.form = {
					name:'',
					username:'',
					password:'',
					email:'',
					team:'',
					roles: []
				}
				this.$bvModal.show('modal-create-user')

			},
			createUser (form) {
        		if (form.password.length < 8) {
					Swal.fire('Error!', 'Minimum password length 8 characters', 'error')
				}
        		else {
					this.$userService.createUser(form).then(resp => {
						if (!!resp) {
							Swal.fire('Successful', 'บันทึกข้อมูลสำเร็จ', 'success')
							this.$bvModal.hide('modal-create-user')
							this.getUserList()
						}
					}).catch(err => {
						Swal.fire('Error!', 'บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ !' + err, 'error')
					})
				}

			},
			closeCreatePage () {
				this.$bvModal.hide('modal-create-user')
			},
			getAllTeam(){
        		this.$masterAdapter.getAllTeam().then(resp => {
        			this.team = resp
				})
			}
		}
	}
</script>

<style>
	#modal-view-user___BV_modal_outer_ {
		z-index: 999999!important;
	}
	#modal-edit-user___BV_modal_outer_ {
		z-index: 999999!important;
	}
	#modal-create-user___BV_modal_outer_ {
		z-index: 999999!important;
	}
</style>
