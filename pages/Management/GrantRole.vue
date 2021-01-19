<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<ScCard>
				<ScCardTitle>
					Grant Roles to User
					<br>
				</ScCardTitle>
				<ScCardBody>
					<div class="uk-overflow-auto">
						<table id="menuList" class="uk-table uk-table-hover uk-table-divider uk-table-border uk-table-small">
							<thead>
							<tr>
								<th class="uk-text-nowrap uk-text-center" rowspan="2">Full Name</th>
								<th class="uk-text-nowrap uk-text-center" colspan="12">Role</th>
							</tr>
							<tr>
								<template v-for="head in roles">
									<th class="uk-text-center">{{ head.role }}</th>
								</template>
							</tr>
							</thead>
							<tbody>
								<template v-for="item in profile">
									<tr>
										<td>
											{{ item.name }}
										</td>
										<template v-for="rol in roles">
											<td class="uk-text-center">
												<input
													type="checkbox"
													class="uk-checkbox"
												>
											</td>
										</template>
									</tr>
								</template>
							</tbody>
						</table>
					</div>
				</ScCardBody>
			</ScCard>
		</div>
		<b-modal ref="modal-create" size="md" scrollable hide-footer title="Create User" centered="centered">
			<div class="row">
				<div class="col-6">
					<label>Username</label>
					<ScInput>
					</ScInput>
				</div>
				<div class="col-6">
					<label>Firstname</label>
					<ScInput>
					</ScInput>
				</div>
			</div>
			<div class="row">
				<div class="col-6">
					<label>Lastname</label>
					<ScInput>
					</ScInput>
				</div>
			</div>
			<br>
			<p class="uk-text-right">
				<button class="sc-button sc-button-primary" type="button">
					Create
				</button>
			</p>
		</b-modal>

		<b-modal ref="modal-edit" size="lg" scrollable hide-footer title="Edit User" centered="centered">
			<b-table
				:items="profile"
				:fields="fieldsEditUser">
				<template v-slot:cell(Active)="row">
					<input
						type="checkbox"
						class="uk-checkbox"
					>
				</template>
				<template v-slot:cell(Edit)="row">
					<a class="sc-button sc-button-warning sc-button-mini" ><i class="mdi mdi-pencil"></i></a>

				</template>
			</b-table>
		</b-modal>

	</div>
</template>

<script>
	import { scColors } from '~/assets/js/utils';
	import ScInput from "../../components/Input";
	import { validationMixin } from 'vuelidate'
	import { required } from 'vuelidate/lib/validators'
	import Swal from 'sweetalert2';

	export default {
		name: "Management",
		components: {ScInput},
		data: () => ({
			fieldsEditUser: [
				{key: 'id', label: 'ID'},
				{key: 'name', label: 'Full Name'},
				{key: 'Active', label: 'Active'},
				{key: 'Edit', label: 'Edit'}
			],
			roles: [],
			profile: []
		}),
		methods: {
			getAllRoles(){
				this.$masterService.getAllRoles().then(resp => {
					this.total = resp.total
					this.roles = resp.data
				})
			},
			createUserModal(){
				this.$refs['modal-create'].show()
			},
			editUserModal(){
				this.$refs['modal-edit'].show()
			},
			getProfile(){
				this.$userService.getAllProfile().then(resp=>{
					this.total = resp.total
					this.profile = resp.data
				})
			}
		},
		mounted() {
			this.getAllRoles(),
			this.getProfile()
		}
	}
</script>

<style scoped>

</style>
