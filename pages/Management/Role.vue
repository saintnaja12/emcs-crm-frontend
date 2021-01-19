
<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<ScCard>
				<ScCardTitle>
					<b-row>
						<b-col>
							Role Management
						</b-col>
						<b-col>
							<div class="mt-2" align="right">
								<button
									class="sc-button sc-button-primary sc-button-social"
									@click="createRoleModal()"
								>Add Role</button>
								<button
									class="sc-button sc-button-success sc-button-social"
									@click="editRoleModal()"
								>Edit Role</button>
							</div>
						</b-col>
					</b-row>

				</ScCardTitle>
				<ScCardBody>
					<ul data-uk-tab="" class="uk-tab">
						<li class="uk-active">
							<a href="javascript:void(0)" aria-expanded="true">
								Menu
							</a>
						</li>
						<li>
							<a href="javascript:void(0)" aria-expanded="false">
								Function
							</a>
						</li>
						<li>
							<a href="javascript:void(0)" aria-expanded="false">
								Field
							</a>
						</li>
					</ul>
					<ul class="uk-switcher">
						<li class="uk-active">
							<div class="uk-overflow-auto">
								<table id="menuList" class="uk-table uk-table-hover uk-table-divider uk-table-border uk-table-small">
									<thead>
									<tr>
										<th class="uk-text-nowrap" rowspan="2">Available Menu</th>
										<th class="uk-text-nowrap uk-text-center" colspan="12">Role</th>
									</tr>
									<tr>
										<template v-for="head in roles">
											<th class="uk-text-center">{{ head.role }}</th>
										</template>
									</tr>
									</thead>
									<tbody>
										<template v-for="menu in dtDData.menus">
											<tr>
												<td>
													{{ menu.val }}
												</td>
												<template v-for="rol in roles">
													<td class="uk-text-center">
														<input
															type="checkbox"
															class="uk-checkbox"
															:id="menu.id"
															:value="menu.id"
															v-model="rol.permission.permissionMenu"
															@click="checkRolePermission(rol,menu.id)"
														>
													</td>
												</template>
											</tr>
										</template>
									</tbody>
								</table>
							</div>
						</li>
						<li>
							<div class="uk-overflow-auto">
								<table id="functionList" class="uk-table uk-table-hover uk-table-divider uk-table-border uk-table-small">
									<thead>
									<tr>
										<th class="uk-text-nowrap" rowspan="2">Available Function</th>
										<th class="uk-text-nowrap uk-text-center" colspan="12">Role</th>
									</tr>
									<tr>
										<template v-for="head in roles">
											<th class="uk-text-center">{{ head.role }}</th>
										</template>
									</tr>
									</thead>
									<tbody>
									<template v-for="item in dtDData.functions">
										<tr>
											<td>
												{{ item.val }}
											</td>
											<template v-for="rol in roles">
												<td class="uk-text-center">
													<input
														type="checkbox"
														class="uk-checkbox"
														:id="item.id"
														:value="item.id"
														v-model="rol.permission.permissionFunction"
														@click="checkRoleFunction(rol,item.id)"
													>
												</td>
											</template>
										</tr>
									</template>
									</tbody>
								</table>
							</div>
						</li>
						<li>
							<div class="uk-overflow-auto">

								<template v-for="(item,indexField) in dtDData.fields">
									<ScCard class="uk-margin-large-bottom">
										<ScCardTitle class="uk-card-header sc-card-header-separator uk-flex uk-flex-middle sc-padding-medium">
											<div class="uk-flex-1">
												<h3 class="uk-card-title">
													{{ item.name }}
												</h3>
											</div>
											<div class="sc-actions">
												<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-window-minimize"></a>
											</div>
										</ScCardTitle>
										<ScCardBody class="sc-padding-medium mt-3">
											<table class="uk-table uk-table-hover uk-table-divider uk-table-border uk-table-small">
												<thead>
												<tr>
													<th class="uk-text-nowrap" rowspan="2">Available Field</th>
													<th class="uk-text-nowrap uk-text-center" colspan="12">Role</th>
												</tr>
												<tr>
													<template v-for="head in roles">
														<th class="uk-text-center">{{ head.role }}</th>
													</template>
												</tr>
												</thead>
												<tbody>

													<template v-for="data in item.field" v-if="indexField === 0">
														<tr >
															<td>
																{{ data.val }}
															</td>
															<template v-for="rol in roles" >
																<td class="uk-text-center">
																	<input
																		type="checkbox"
																		class="uk-checkbox"
																		:id="data.id"
																		:value="data.id"
																		v-model="rol.permission.permissionField.company"
																		@click="checkRoleField(item.name,rol,data.id)"
																	>
																</td>
															</template>
														</tr>
													</template>

													<template v-for="data in item.field" v-if="indexField === 1">
														<tr >
															<td>
																{{ data.val }}
															</td>
															<template v-for="rol in roles" >
																<td class="uk-text-center">
																	<!--																	{{ rol.permission.permissionField }}-->
																	<input
																		type="checkbox"
																		class="uk-checkbox"
																		:id="data.id"
																		:value="data.id"
																		v-model="rol.permission.permissionField.personal"
																		@click="checkRoleField(item.name,rol,data.id)"
																	>
																</td>
															</template>
														</tr>
													</template>

													<template v-for="data in item.field" v-if="indexField === 2">
														<tr >
															<td>
																{{ data.val }}
															</td>
															<template v-for="rol in roles" >
																<td class="uk-text-center">
																	<!--																	{{ rol.permission.permissionField }}-->
																	<input
																		type="checkbox"
																		class="uk-checkbox"
																		:id="data.id"
																		:value="data.id"
																		v-model="rol.permission.permissionField.people"
																		@click="checkRoleField(item.name,rol,data.id)"
																	>
																</td>
															</template>
														</tr>
													</template>

													<template v-for="data in item.field" v-if="indexField === 3">
														<tr >
															<td>
																{{ data.val }}
															</td>
															<template v-for="rol in roles" >
																<td class="uk-text-center">
																	<!--																	{{ rol.permission.permissionField }}-->
																	<input
																		type="checkbox"
																		class="uk-checkbox"
																		:id="data.id"
																		:value="data.id"
																		v-model="rol.permission.permissionField.ticket"
																		@click="checkRoleField(item.name,rol,data.id)"
																	>
																</td>
															</template>
														</tr>
													</template>


												</tbody>
											</table>
										</ScCardBody>
									</ScCard>
								</template>
							</div>
						</li>
					</ul>
				</ScCardBody>
			</ScCard>
		</div>

		<b-modal id="modal-create" ref="modal-create" size="md" scrollable hide-footer title="Create Role" centered="centered">
			<label>Role Name</label>
			<ScInput
				v-model="$v.roleNames.$model"
				:error-state="$v.roleNames.$error"
				:validator="$v.roleNames"
			>
			</ScInput>
			<label v-if="!$v.roleNames.required" class="sc-vue-errors">Field is required</label>
			<br>
			<p class="uk-text-right">
				<button class="sc-button sc-button-primary" type="button" :disabled="createStatus === 'PENDING'" @click="createRole($event)">
					Create
				</button>
			</p>
		</b-modal>

		<b-modal id="modal-edit" ref="modal-edit" size="md" scrollable hide-footer title="Edit Roles" centered="centered">
			<b-table
				:items="roles"
				:fields="fieldsEditRole">
				<template v-slot:cell(Active)="row">
					<input
						type="checkbox"
						class="uk-checkbox"
						v-model="row.item.active"
						@click="activeRole(row.item,$event.target.checked)"
						>
				</template>
				<template v-slot:cell(Edit)="row">
					<a class="sc-button sc-button-warning sc-button-mini" @click="editTemplate(row.item)"><i class="mdi mdi-pencil"></i></a>

				</template>
			</b-table>
		</b-modal>

		<b-modal id="modal-form-edit-template" ref="edit-template" size="md" scrollable hide-footer title="Edit Roles" centered="centered">
			<ScInput v-model="$v.roleEdit.$model" :error-state="$v.roleEdit.$error" :validator="$v.roleEdit"></ScInput>
			<label v-if="!$v.roleEdit.required" class="sc-vue-errors">Field is required</label>

			<p class="uk-text-right">
				<button class="sc-button sc-button-primary" type="button" :disabled="editStatus === 'PENDING'" @click="editDataRole(roleEdit,dataEdit,$event)">
					Edit
				</button>
			</p>
		</b-modal>
	</div>


</template>

<script>
	import { scColors } from '~/assets/js/utils';
	import Buttons from "../src/components/buttons";
	import ScInput from "../../components/Input";
	import { validationMixin } from 'vuelidate'
	import { required } from 'vuelidate/lib/validators'
	import Swal from 'sweetalert2';

	export default {
		name: "Management",
		components: {ScInput, Buttons},
		mixins: [validationMixin],
		data: () => ({
			dtDData: {
				menus: [
					{id: 'dashboard', val: 'Dashboard',},
					{id: 'contact', val: 'Contact',},
					{id: 'ticket', val: 'Ticket',},
					{id: 'email', val: 'Email',},
					{id: 'knowledge', val: 'Knowledge',},
					{id: 'report', val: 'Report',},
					{id: 'ticketReport', val: '- All : Incident Ticket Report',},
					{id: 'agentReport', val: '- All : Agent Report',},
					{id: 'teamReport', val: '- All : TeamWork Report',},
					{id: 'acdReport', val: '- All : ACD Call Report',},
					{id: 'abanReport', val: '- All : ABANDON Call Report',},
					{id: 'feedbackReport', val: '- All : Feedback Call Report',},
					{id: 'zoneReport', val: '- All : Customer Zone Report',},
					{id: 'survey', val: '- All : Satisfaction Survey',},
					{id: 'hashtag', val: '- All : Hashtag',},
					{id: 'incedentTicket', val: '- Mrg : Incident Ticket (Summary All)',},
					{id: 'channelReport', val: '- Mrg : Channel Report (Summary All Team)',},
					{id: 'mrgSurvey', val: '- Mrg : Satisfaction Survey',},
					{id: 'management', val: 'Management',},
					{id: 'masterdata', val: 'Master Data',},
				],
				functions: [
					{id: 'dViewAnotherTeam', val: 'Dashboard : View another team',},
					{id: 'contactCreate', val: 'Contact : Create',},
					{id: 'contactEdit', val: 'Contact : Edit',},
					{id: 'contactExportView', val: 'Contact : Export (View)',},
					{id: 'contactExportAll', val: 'Contact : Export (All)',},
					{id: 'contactViewLog', val: 'Contact : View Edit history Log',},
					{id: 'ticketCreate', val: 'Ticket : Create',},
					{id: 'ticketEdit', val: 'Ticket : Edit',},
					{id: 'ticketExportView', val: 'Ticket : Export (View)',},
					{id: 'ticketExportAll', val: 'Ticket : Export (All)',},
					{id: 'knowCreate', val: 'Knowledge : Create',},
					{id: 'knowEdit', val: 'Knowledge : Edit',},
					{id: 'knowPin', val: 'Knowledge : Pin',},
					{id: 'knowViewLog', val: 'Knowledge : View Edit history Log',},
					{id: 'reportView', val: 'Report : View',},
					{id: 'reportExportView', val: 'Report : Export (View)',},
					{id: 'reportExportAll', val: 'Report : Export (All)',},
				],
				fields: [
					{
						id: '1',
						name: 'Company',
						field: [
							{id: 'id', val: 'ID',},
							{id: 'company-name', val: 'COMPANY-NAME',},
							{id: 'branch', val: 'BRANCH',},
							{id: 'partner', val: 'PARTNER',},
							{id: 'phone1', val: 'PHONE1',},
							{id: 'phone2', val: 'PHONE2',},
							{id: 'phone3', val: 'PHONE3',},
							{id: 'phone4', val: 'PHONE4',},
							{id: 'phone5', val: 'PHONE5',},
							{id: 'customer-type', val: 'CUSTOMER TYPE',},
							{id: 'brand', val: 'BRAND',},
							{id: 'region', val: 'REGION',},
							{id: 'customer-code', val: 'CUSTOMER-CODE',},
							{id: 'service-code', val: 'SERVICE CODE',},
							{id: 'tax-id', val: 'TAX ID',},
							{id: 'fax', val: 'FAX',},
							{id: 'website', val: 'WEBSITE',},
							{id: 'cert-address', val: 'CERT ADDRESS',},
							{id: 'other-address', val: 'OTHER ADDRESS',},
							{id: 'invoice-address', val: 'INVOICE ADDRESS',},
							{id: 'country', val: 'COUNTRY',},
							{id: 'note', val: 'NOTE',},
							{id: 'remark', val: 'REMARK',},
							{id: 'file1', val: 'FILE1',},
							{id: 'file2', val: 'FILE2',},
							{id: 'file3', val: 'FILE3',},
							{id: 'file4', val: 'FILE4',},
							{id: 'file5', val: 'FILE5',},
							{id: 'created-at', val: 'CREATED BY',},
							{id: 'created-by', val: 'CREATED AT',},
						]
					},
					{
						id: '2',
						name: 'Personal',
						field: [
							{id: 'id', val: 'ID',},
							{id: 'address', val: 'ADDRESS',},
							{id: 'branch', val: 'BRANCH',},
							{id: 'brand', val: 'BRAND',},
							{id: 'company', val: 'COMPANY',},
							{id: 'customer-type', val: 'CUSTOMER TYPE',},
							{id: 'created-by', val: 'CREATED BY',},
							{id: 'created-at', val: 'CREATED AT',},
							{id: 'email', val: 'EMAIL',},
							{id: 'first-name', val: 'FIRSTNAME',},
							{id: 'last-name', val: 'LASTNAME',},
							{id: 'line-id', val: 'LINE ID',},
							{id: 'note', val: 'NOTE',},
							{id: 'partner', val: 'PARTNER',},
							{id: 'phone1', val: 'PHONE1',},
							{id: 'phone2', val: 'PHONE2',},
							{id: 'phone3', val: 'PHONE3',},
							{id: 'position', val: 'POSITION',},
							{id: 'update-at', val: 'UPDATE AT',},
							{id: 'update-by', val: 'UPDATE BY',},
						]
					},
					{
						id: '3',
						name: 'People',
						field: [
							{id: 'id', val: 'ID',},
							{id: 'address', val: 'ADDRESS',},
							{id: 'branch', val: 'BRANCH',},
							{id: 'brand', val: 'BRAND',},
							{id: 'company', val: 'COMPANY',},
							{id: 'customer-type', val: 'CUSTOMER TYPE',},
							{id: 'created-by', val: 'CREATED BY',},
							{id: 'created-at', val: 'CREATED AT',},
							{id: 'email', val: 'EMAIL',},
							{id: 'first-name', val: 'FIRSTNAME',},
							{id: 'last-name', val: 'LASTNAME',},
							{id: 'line-id', val: 'LINE ID',},
							{id: 'note', val: 'NOTE',},
							{id: 'partner', val: 'PARTNER',},
							{id: 'phone1', val: 'PHONE1',},
							{id: 'phone2', val: 'PHONE2',},
							{id: 'phone3', val: 'PHONE3',},
							{id: 'position', val: 'POSITION',},
							{id: 'update-at', val: 'UPDATE AT',},
							{id: 'update-by', val: 'UPDATE BY',},
						]
					},
					{
						id: '3',
						name: 'Ticket',
						field: [
							{id: 'id', val: 'ID',},
							{id: 'app-name', val: 'APP NAME',},
							{id: 'branch', val: 'BRANCH',},
							{id: 'brand', val: 'BRAND',},
							{id: 'category-issue', val: 'CATEGORY ISSUE',},
							{id: 'complain', val: 'COMPLAIN',},
							{id: 'complain-note', val: 'COMPLAIN NOTE',},
							{id: 'created-at', val: 'CREATED AT',},
							{id: 'created-by', val: 'CREATED by',},
							{id: 'contact', val: 'CONTACT',},
							{id: 'contact-type', val: 'CONTACT TYPE',},
							{id: 'subject', val: 'SUBJECT',},
							{id: 'other-issue', val: 'OTHER ISSUE',},
							{id: 'channel', val: 'CHANNEL',},
							{id: 'hashtag', val: 'HASHTAG',},
							{id: 'appointment-date', val: 'APPOINTMENT DATE',},
							{id: 'continue-to', val: 'CONTINUE TO',},
							{id: 'file', val: 'FILE',},
							{id: 'customer-code', val: 'CUSTOMER CODE',},
							{id: 'customer-company', val: 'CUSTOMER COMPANY',},
							{id: 'service-code', val: 'SERVICE CODE',},
							{id: 'province', val: 'PROVINCE',},
							{id: 'customer-type', val: 'CUSTOMER TYPE',},
							{id: 'customer-name', val: 'CUSTOMER NAME',},
							{id: 'req-due-date', val: 'REQ DUE DATE',},
							{id: 'req-by', val: 'REQ BY',},
							{id: 'rm', val: 'RM',},
							{id: 'status', val: 'STATUS',},
							{id: 'my-team', val: 'MY TEAM',},
							{id: 'description', val: 'DESCRIPTION',},
						]
					},
				],
			},
			fieldsEditRole: [
				{key: 'role', label: 'Role Name'},
				{key: 'Active', label: 'Active'},
				{key: 'Edit', label: 'Edit'}
			],
			roleNames: "",
			roles: [],
			createStatus: null,
			current: [],
			dataEdit: [],
			roleNameEdit: "",
			editStatus: null,
			roleEdit: ""
		}),
		validations: {
			roleNames: {required},
			roleEdit: {required}
		},
		methods:{
			getAllRoles(){
				this.$masterService.getAllRoles().then(resp => {
					this.total = resp.total
					this.roles = resp.data
				})
			},
			checkRolePermission(role,permission){
				for ( let i = 0 ; i < this.total ; i++ ){
					if( this.roles[i].id == role.id){
						var addpremission = this.roles[i].permission.permissionMenu
						this.current = this.roles[i]
						var index = addpremission.indexOf(permission)
						if(index > -1) {
							addpremission.splice(index, 1);
						}
						else {
							addpremission.push(permission);
						}
					}
					this.result =  _.compact(addpremission);
				}
				this.current.permission.permissionMenu = this.result
				this.$masterService.addPermission(this.current).then(resp => {
					if(resp){
						this.$bvToast.toast(`Update Permission Successful`, {
							title: 'Successful',
							toaster:'b-toaster-bottom-right toast-z-index',
							variant: 'success',
							autoHideDelay: 500,
						})
					}
				}).catch(err =>{
					this.$bvToast.toast(`Update Permission Failed`, {
						title: 'Failed',
						toaster:'b-toaster-bottom-right toast-z-index',
						variant: 'danger',
						autoHideDelay: 500,
					})
				})
			},
			checkRoleFunction(role,functions){
				for ( let i = 0 ; i < this.total ; i++ ){
					if( this.roles[i].id == role.id){
						var addpremission = this.roles[i].permission.permissionFunction
						this.current = this.roles[i]
						var index = addpremission.indexOf(functions)
						if(index > -1) {
							addpremission.splice(index, 1);
						}
						else {
							addpremission.push(functions);
						}
					}
					this.result =  _.compact(addpremission);
				}

				this.current.permission.permissionFunction = this.result
				this.$masterService.addPermission(this.current).then(resp => {
					if(resp){
						this.$bvToast.toast(`Update Permission Successful`, {
							title: 'Successful',
							toaster:'b-toaster-bottom-right toast-z-index',
							variant: 'success',
							autoHideDelay: 500,
						})
					}
				}).catch(err =>{
					this.$bvToast.toast(`Update Permission Failed`, {
						title: 'Failed',
						toaster:'b-toaster-bottom-right toast-z-index',
						variant: 'danger',
						autoHideDelay: 500,
					})
				})
			},
			checkRoleField(menu,role,field){
				if ( menu == 'Company'){
					for ( let i = 0 ; i < this.total ; i++ ){
						if( this.roles[i].id == role.id){
							var addpremission = this.roles[i].permission.permissionField.company
							this.current = this.roles[i]
							var index = addpremission.indexOf(field)
							if(index > -1) {
								addpremission.splice(index, 1);
							}
							else {
								addpremission.push(field);
							}
						}
						this.result =  _.compact(addpremission);
					}
					this.current.permission.permissionField.company = this.result
				}
				else if ( menu == 'Personal' ){
					for ( let i = 0 ; i < this.total ; i++ ){
						if( this.roles[i].id == role.id){
							var addpremission = this.roles[i].permission.permissionField.personal
							this.current = this.roles[i]
							var index = addpremission.indexOf(field)
							if(index > -1) {
								addpremission.splice(index, 1);
							}
							else {
								addpremission.push(field);
							}

						}
						this.result =  _.compact(addpremission);
					}
					this.current.permission.permissionField.personal = this.result
				}
				else if ( menu == 'People' ){
					for ( let i = 0 ; i < this.total ; i++ ){
						if( this.roles[i].id == role.id){
							var addpremission = this.roles[i].permission.permissionField.people
							this.current = this.roles[i]
							var index = addpremission.indexOf(field)
							if(index > -1) {
								addpremission.splice(index, 1);
							}
							else {
								addpremission.push(field);
							}

						}
						this.result =  _.compact(addpremission);
					}
					this.current.permission.permissionField.people = this.result
				}
				else if ( menu == 'Ticket' ){
					for ( let i = 0 ; i < this.total ; i++ ){
						if( this.roles[i].id == role.id){
							var addpremission = this.roles[i].permission.permissionField.ticket
							this.current = this.roles[i]
							var index = addpremission.indexOf(field)
							if(index > -1) {
								addpremission.splice(index, 1);
							}
							else {
								addpremission.push(field);
							}
						}
						this.result =  _.compact(addpremission);
					}
					this.current.permission.permissionField.ticket = this.result
				}
				this.$masterService.addPermission(this.current).then(resp => {
					if(resp){
						this.$bvToast.toast(`Update Permission Successful`, {
							title: 'Successful',
							toaster:'b-toaster-bottom-right toast-z-index',
							variant: 'success',
							autoHideDelay: 500,
						})
					}
				}).catch(err =>{
					this.$bvToast.toast(`Update Permission Failed`, {
						title: 'Failed',
						toaster:'b-toaster-bottom-right toast-z-index',
						variant: 'danger',
						autoHideDelay: 500,
					})
				})
			},


			createRoleModal(){
				this.$refs['modal-create'].show()
			},
			editRoleModal(){
				this.$refs['modal-edit'].show()
			},
			editTemplate(detail){
				this.dataEdit = detail
				this.roleEdit = detail.role
				this.$refs['edit-template'].show()
				this.$refs['modal-edit'].hide()
			},
			createRole(e){
				if (_.isEmpty(this.roleNames)){
					e.preventDefault();
					this.$v.$touch();
					if (this.$v.$invalid) {
						this.createStatus = 'ERROR'
						Swal.fire('Warning!','กรุณากรอกข้อมูลให้ครบ', 'warning')
					} else {
						this.createStatus = 'PENDING';
						setTimeout(() => {
							this.createStatus = 'OK'
						}, 500)
					}
				}
				else {
					if(!_.some(this.roles , { 'role': this.roleNames }) ){
						this.$masterService.createRoles(this.roleNames)
							.then(resp => {
								if (!!resp) {
									Swal.fire('Successful!','บันทึกข้อมูลสำเร็จ', 'success')
									this.roleNames = ""
									this.getAllRoles()
									this.$refs['modal-create'].hide()
								}else {
									this.errorText =  resp
									Swal.fire('Error!','บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ !' + errorText, 'error')
								}
							}).catch(error => {
							this.errorText =  error
							Swal.fire('Error!','บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ !' + errorText, 'error')
						})
					}
					else{
						Swal.fire('Error!', 'มีข้อมูลนี้อยู่ในระบบแล้ว ไม่สามารถบันทึกได้ ', 'error')
					}

				}
			},
			activeRole(data ,active) {
				this.$masterService.activeRole(data ,active).then(resp => {
					if (resp){
						Swal.fire(
							'Successful!',
							'บันทึกข้อมูลสำเร็จ',
							'success'
						)
					}
				}).catch(err => {
					Swal.fire('Error!', 'บันทึกข้อมูลไม่สำเร็จ! กรุณาทำรายการใหม่อีกครั้งค่ะ! <br/>' + err.response.data.message, 'error')
				})
			},

			editDataRole(data,detail,e) {
				if (this.detail === '') {
					e.preventDefault();
					this.$v.$touch();
					if (this.$v.$invalid) {
						this.editStatus = 'ERROR'
					} else {
						this.editStatus = 'PENDING';
						setTimeout(() => {
							this.editStatus = 'OK'
						}, 500)
					}
				} else {
					if(!_.some(this.roles , { 'role': this.roleEdit }) ){
						this.$masterService.updateRoleName(data,detail).then(resp => {
							if (!!resp) {
								Swal.fire('Successful!', 'บันทึกข้อมูลเรียบร้อยแล้ว', 'success')
								this.getAllRoles()
								this.$refs['edit-template'].hide()

							}
						}).catch(err => {
							Swal.fire('Error!', 'บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ! <br/>' + err.response.data.message, 'error')
						})
					}else{

						Swal.fire('Error!', 'มีข้อมูลนี้อยู่ในระบบแล้ว ไม่สามารถบันทึกได้ ', 'error')
						this.$refs['edit-template'].hide()

					}


				}
			}


		},
		mounted() {
			this.getAllRoles()
		},
		computed: {
			getRoleList(){
				return ( this.$store.getters.getRoleList )
			},
		}
	}
</script>

<style>
	#modal-create___BV_modal_outer_ {
		z-index: 9999999!important;
	}
	#modal-edit___BV_modal_outer_ {
		z-index: 9999999!important;
	}
	#modal-form-edit-template___BV_modal_outer_ {
		z-index: 9999999!important;
	}
</style>
