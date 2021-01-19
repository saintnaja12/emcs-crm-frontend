<template>
	<div class="uk-grid" data-uk-grid>
		<div class="uk-width-2-3@l">
			<ScCard class="uk-margin-mini-top">
				<ScCardHeader separator>
					<div class="uk-flex-middle uk-grid-small uk-grid" data-uk-grid>
						<div class="uk-flex-1">
							<ScCardTitle>
								<div>
									<transition name="fade" mode="out-in">
										<div key="userPreview">
											<a href="javascript:void(0)" class="sc-button sc-button-primary sc-button-social" @click="toggleData()">
												<span>ADD NEW COMPANY</span><i class="mdi mdi-plus-box"></i>
											</a>
										</div>
									</transition>
								</div>
							</ScCardTitle>
						</div>

						<div class="uk-width-auto@s">
							<div class="uk-button-group">
								<a class="sc-button sc-button-success sc-button-social">
									<span>Export</span><i class="mdi mdi-file-export"></i>
								</a>
								<div class="uk-inline">
									<button class="sc-button sc-button-success sc-button-social sc-button-icon">
										<i class="mdi mdi-chevron-down"></i>
									</button>
									<div data-uk-dropdown="mode: click; boundary: ! .uk-button-group; boundary-align: true;">

										<ul class="uk-nav uk-dropdown-nav">
											<li class="uk-active">
												<a href="javascript:void(0)" @click="exportListView()">
													Export View
												</a>
											</li>
											<li>
												<a href="javascript:void(0)" @click="exportListAll()">
													Export All
												</a>
											</li>
											<li v-if="userStore.name ==='UCCONNECT' && mapDataRole(userStore.roles) === 'Admin'">
												<a href="javascript:void(0)" @click="ExportContactAdmin()">
													Export Admin
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</ScCardHeader>

				<ScCardBody style="min-height: 710px">
					<b-container class="bv-example-row">
						<b-row cols="1" cols-sm="2" cols-md="4" cols-lg="6">
							<b-col>
								<b-form-group>
									<label for="custypeSelect">Customer Type</label>
									<b-form-select
										id="custypeSelect"
										v-model="keyword.customerType"
										size="sm"
										:options="customerTypeOption"
										@change="searchCompany()"
									>
										<template slot="first">
											<option value=""> - Select customer type -</option>
										</template>
									</b-form-select>
								</b-form-group>
							</b-col>
							<b-col>
								<b-form-group>
									<label for="regionSelect">Region</label>
									<b-form-select
										id="regionSelect"
										v-model="keyword.region"
										size="sm"
										:options="regionOption"
										@change="getProvinceByRegion(keyword.region)"
									>
										<template slot="first">
											<option value=""> - Select region -</option>
										</template>
									</b-form-select>
								</b-form-group>
							</b-col>
							<b-col v-if="keyword.region !==''">
								<b-form-group>
									<label for="provinceSelect">Province</label>
									<b-form-select
										id="provinceSelect"
										v-model="keyword.province"
										size="sm"
										:options="provinceOption"
										@change="searchCompany()"
									>
										<template slot="first">
											<option value=""> - Select province -</option>
										</template>
									</b-form-select>
								</b-form-group>
							</b-col>
							<b-col v-else>
								<b-form-group>
									<label for="provinceSelect">Province</label>
									<b-form-select
										id="provinceSelect"
										v-model="keyword.province"
										size="sm"
										:options="provinceOption"
										@change="searchCompany()"
										disabled
									>
										<template slot="first">
											<option value="">- Select province -</option>
										</template>
									</b-form-select>
								</b-form-group>
							</b-col>
							<b-col>

								<b-form-group>
									<label for="insuranceSelect">Insurance Partners(ในเครือ)</label>
									<Select2
										v-model="keyword.insurance"
										:options="insuranceOption"
										@change="searchCompany()"
										:settings="{ 'placeholder': '- Select garage -', allowClear: true }"
									>
									</Select2>

								</b-form-group>
							</b-col>
						</b-row>
					</b-container>

					<b-container class="bv-example-row">
						<b-row align-h="between">
							<b-col cols="6">
								<b-row align-h="start">
									<b-col cols="6">
										<b-form-group>
											<label>Status</label>
											<b-form-select
												id="perPageSelect"
												v-model="keyword.status"
												size="sm"
												:options="contactStatus"
												class="mr-5"
												@change="searchCompany()"
											></b-form-select>
										</b-form-group>
									</b-col>
								</b-row>
							</b-col>

							<b-col cols="6">
								<b-row align-h="end">
									<b-col cols="6">
										<b-form-group>
											<label for="perPageSelect">Search By</label>
											<b-form-select
												id="perPageSelect"
												v-model="keyword.searchBy"
												size="sm"
												:options="keyTypeOption"
												@change="searchCompany()"
											>
												<template slot="first">
													<option value=""> - Select search by -</option>
												</template>
											</b-form-select>
										</b-form-group>
									</b-col>
									<b-col cols="6">
										<b-form-group>
											<label >Search</label>
											<b-form-input
												v-model="keyword.keyword"
												type="search"
												id="filterInput"
												placeholder="Type to Search"
												size="sm"
												@input="searchDataKeyword()"
											></b-form-input>
										</b-form-group>
									</b-col>
								</b-row>
							</b-col>
						</b-row>
					</b-container>

					<b-container class="bv-example-row">
						<b-row align-h="between">
							<b-col cols="6">
								<b-row align-h="start">
									<b-col cols="4">
										<b-form-group>
											<label>Show</label>
											<b-form-select
												id="perPageSelect"
												v-model="keyword.perPage"
												size="sm"
												:options="pageOptions"
												class="mr-5"
												@change="getContactCompanyList()"
											></b-form-select>
										</b-form-group>
									</b-col>
								</b-row>
							</b-col>
						</b-row>
					</b-container>
					<div class="uk-margin-mini-top">
						<b-table
							small
							responsive
							hover
							striped
							:items="contactCompanyList"
							:fields="fields"
							:sort-by.sync="sortBy"
							:sort-desc.sync="sortDesc"
							:current-page="keyword.currentPage"
							:filter="filter"
							@filtered="onFiltered"
							ref="selectableTable"
							selectable
							:select-mode="modeSelect"
							@row-clicked="getCompanyViewDataById"
						>

							<template v-slot:cell(No)="row">
								{{ GetIndexRow(keyword.currentPage, keyword.perPage, row.index) }}
							</template>
							<template v-slot:cell(customerCode)="row">
								{{ row.item.customerCode ? row.item.customerCode: '-'}}
							</template>
							<template v-slot:cell(serviceCode)="row">
								<div v-if="row.item.serviceCode === null">
									{{ '-' }}
								</div>
								<div v-else>
									{{ row.item.serviceCode ? row.item.serviceCode: '-'}}
								</div>
							</template>
							<template v-slot:cell(companyName)="row">
								{{ row.item.companyName ? row.item.companyName: '-' }}
							</template>
							<template v-slot:cell(branch)="row">
								{{ row.item.branch ? row.item.branch:'-'}}
							</template>
							<template v-slot:cell(customerType)="row">
								{{ row.item.customerType.name ? row.item.customerType.name : '-'}}
							</template>
							<template v-slot:cell(province)="row">
								{{ row.item.certAddress.province ? row.item.certAddress.province: '-'  }}
							</template>
							<template v-slot:cell(phone)="row">
								{{ row.item.phone1  ? row.item.phone1 : '-'}}
							</template>
							<template v-slot:cell(partner)="row">
								<div v-if="row.item.partner !== null">
									<b-form-select v-if="row.item.partner[0].id === ''" v-model="row.item.partner[0].id" :options="[{ 'value' : '' , 'text' : 'No Partner' }]">
									</b-form-select>
									<b-form-select v-else v-model="row.item.partner[0].id" :options="mapData(row.item.partner)" >
									</b-form-select>
								</div>
							</template>
							<template v-slot:cell(garage)="row">
								<div v-if="checkUndifined(row.item.garage)">
									<b-form-select v-if="row.item.garage[0].id === ''" v-model="row.item.garage[0].id" :options="[{ 'value' : '' , 'text' : 'No Partner' }]">
									</b-form-select>
									<b-form-select v-model="row.item.garage[0].id" :options="mapData(row.item.garage)" >
									</b-form-select>
								</div>
								<div v-else>
									<b-form-select v-model="row.item.garage" :options="[{ 'value' : null , 'text' : 'No Partner' }]">
									</b-form-select>
								</div>
							</template>
							<template v-slot:cell(brand)="row">
								{{ row.item.brand.name? row.item.brand.name: '-'}}
							</template>
							<template v-slot:cell(status)="row">
								<template v-if="row.item.status === null || row.item.status === ''">
									<span>Null status</span>
								</template>
								<template>
									<span v-if="row.item.status.id === '' || row.item.status.id === null">-</span>
									<template v-else>
										<span v-if="row.item.status.id === '5f39f8a274601b0bf3bd9e2d'" class="clrBlue">{{row.item.status.name}}</span>
										<span v-else-if="row.item.status.id === '5f350851cd3d534abee6c6ef'" class="clrGrey">{{row.item.status.name}}</span>
										<span v-else-if="row.item.status.id === '5f350864cd3d534abee6c6f0'" class="clrRed">{{row.item.status.name}}</span>
										<span v-else >{{ row.item.status.name }}</span>
									</template>
								</template>

							</template>

						</b-table>
						<b-pagination
							v-model="keyword.currentPage"
							:total-rows="totalRows"
							:per-page="keyword.perPage"
							size="sm"
							class="uk-pagination-right uk-flex-right"
							@input="pageChanged($event)"
						></b-pagination>
					</div>
				</ScCardBody>
			</ScCard>
		</div>
		<div class="uk-width-1-3@l">
			<ContactCompanyCreate v-if="!toggleDataView" @contact-company-save-summit="getCompanyViewDataById"></ContactCompanyCreate>
			<ContactCompanyView v-else-if="toggleDataView" @contact-company-update-summit="getCompanyViewDataById"></ContactCompanyView>
		</div>
	</div>
</template>
<script>
	import ContactCompanyCreate from './Create'
	import ContactCompanyView from './View'
	import ScInput from "../../../components/Input";
	import MultiSelect from "../../../components/Multiselect";
	import {catchError, debounceTime, mergeMap, tap} from "rxjs/operators";
	import {EMPTY, from, of, Subject} from "rxjs";
	import Select2 from "~/components/Select2";

	export default {
		components: {
			MultiSelect,
			ScInput,
			ContactCompanyCreate,
			ContactCompanyView,
			Select2,
		},
		data: () => ({
			fields: [
				{ key: 'No', label: 'No.', sortable: true, class: 'text-left', isRowHeader: true},
				{ key: 'customerCode', label: 'Cust Code', sortable: true, class: 'text-left',tdClass:'w100'},
				{ key: 'serviceCode', label: 'Mem', sortable: true, class: 'text-left',tdClass:'w100'},
				{ key: 'companyName', label: 'Company' , sortable: true ,tdClass:'w250'},
				{ key: 'branch', label: 'Branch', sortable: true, class: 'text-left',tdClass:'w100'},
				{ key: 'customerType', label: 'Customer Type', sortable: true, class: 'text-left',tdClass:'w150'},
				{ key: 'province', label: 'Province', sortable: true, class: 'text-left',tdClass:'w150'},
				{ key: 'phone1', label: 'Office Phone', sortable: true, class: 'text-left',tdClass:'w150'},
				{ key: 'brand', label: 'Brand', sortable: true, class: 'text-left',tdClass:'w150'},
				{ key: 'partner', label: 'Partner(ในเครือ)', sortable: true, class: 'text-left',tdClass:'w150'},
				{ key: 'garage', label: 'Partner(นอกเครือ)', sortable: true, class: 'text-left',tdClass:'w150'},
				{ key: 'createdAt', label: 'Create Date', sortable: true, class: 'text-left',tdClass:'w150'},
				{ key: 'status', label: 'Status', sortable: true, class: 'text-left',tdClass:'w150'},
			],
			ContactCompanyCreate:false,
			ContactCompanyView:true,
			totalRows: 1,
			pageOptions: [10, 25, 50, 100],
			sortBy: 'createdAt',
			sortDesc: true,
			sortDirection: 'desc',
			filter: null,
			contactCompanyList:[],
			customerTypeOption: [],
			provinceOption: [],
			selectedPartner: '',
			regionOption: [
				{ text: 'ภาคเหนือ', value: 'ภาคเหนือ' },
				{ text: 'ภาคกลาง', value: 'ภาคกลาง' },
				{ text: 'ภาคตะวันออกเฉียงเหนือ', value: 'ภาคตะวันออกเฉียงเหนือ' },
				{ text: 'ภาคตะวันตก', value: 'ภาคตะวันตก' },
				{ text: 'ภาคตะวันออก', value: 'ภาคตะวันออก' },
				{ text: 'ภาคใต้', value: 'ภาคใต้' },
			],
			insuranceOption: [],
			keyTypeOption: [
				{ text: 'Tax ID', value: 'taxId' },
				{ text: 'Service Code', value: 'serviceCode' },
				{ text: 'Customer Code', value: 'customerCode' },
				{ text: 'Mobile', value: 'phone' },
				{ text: 'Brand', value: 'brand' },
			],
			modeSelect: 'single',
			keyword:{
				customerType:'',
				province:'',
				region:'',
				insurance:'',
				searchBy:'',
				keyword:'',
				perPage:10,
				currentPage: 1,
				status: '',
				companyName: '',
				phone: '',
				brand: '',
				status: ''
			},
			province:[
				{ text: '- Select province -', value: '' },
			],
			searchKeyword:'',
			partnerList: [],
			partnerProp: {
				value: '',
				text: ''
			},
			contactStatus: []
		}),
		created() {
			this.searchKeyword$ = new Subject()
		},
		computed: {
			sortOptions () {
				return this.fields
					.filter(f => f.sortable)
					.map(f => {
						return { text: f.label, value: f.key }
					})
			},
			toggleDataView () {
				return this.$store.getters.pageCompanyView
			},
			toggleDataCreate () {
				return this.$store.getters.pageCompanyCreate
			},
			rows() {
				return this.totalRows
			},
			userStore() {
				return this.$store.getters.getUserLogin
			},
		},
		mounted () {
			this.getContactCompanyList()
			this.getCustomerTypeOption()
			this.getPartner()
			this.getContactStatus()
			this.initObservableSubjects()
		},
		methods: {
			ExportContactAdmin () {
				this.$contactAdapter.exportContactAdmin(this.keyword).then(resp => {
					const url = window.URL.createObjectURL(new Blob([resp]))
					const link = document.createElement('a')
					link.href = url
					link.setAttribute('download', 'ContactAdmin.xlsx')
					document.body.appendChild(link)
					link.click()
				}).catch((err) => {
					this.$swal("Error!", " <br/>" + err.message, "error")
				})
			},
			dtButtonsInitialized () {
				this.$refs.buttonsTable.$dt.buttons().container().appendTo(document.getElementById('sc-dt-buttons'))
			},
			toggleData() {
				this.$refs.selectableTable.clearSelected()
				this.$store.dispatch('getCompanyById',{})
				this.$store.dispatch('pageCompanyView', false);
				this.$store.dispatch('pageCompanyCreate', true);
			},
			getContactCompanyList () {
				let loader = this.$loading.show({
					loader: 'spinner'
				})
				this.$contactAdapter.getContactCompanyList(this.keyword).then(resp => {
					this.contactCompanyList = resp.data
					this.totalRows = resp.totalAll
					loader.hide()
				}).catch((err) => {
					this.$swal("Error!", "Application Not Found <br/>" + err.response.data.message, "error")
				})
			},
			GetIndexRow (CurrentPage, PerPage, index){
				return ( CurrentPage - 1 ) * PerPage + (index + 1)
			},
			getCompanyViewDataById(item){
				const id = item.id
				let loader = this.$loading.show({
					loader: 'spinner'
				})
				this.$contactAdapter.getCompanyViewDataById(id).then(resp => {
					this.$store.dispatch('pageCompanyView', true);
					this.$store.dispatch('pageCompanyCreate', false);
					this.$store.dispatch('getCompanyById',resp)
					loader.hide()
				})
			},
			exportListView(){
				this.$contactAdapter.ExportCompanyListView(this.keyword).then(resp => {
					const url = window.URL.createObjectURL(new Blob([resp]));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', 'ExportCompanyListView.xlsx');
					document.body.appendChild(link);
					link.click();
				}).catch((err) => {
					Swal.fire('Error!', ' <br/>' + err.response.data.message, 'error')
				})
			},
			exportListAll(){
				this.$contactAdapter.ExportCompanyListAll(this.keyword).then(resp => {
					const url = window.URL.createObjectURL(new Blob([resp]));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', 'ExportCompanyListAll.xlsx');
					document.body.appendChild(link);
					link.click();
				}).catch((err) => {
					Swal.fire('Error!', ' <br/>' + err.response.data.message, 'error')
				})
			},
			getCustomerTypeOption(){
				this.$masterAdapter.getAllCustomerTypes().then(resp => {
					this.customerTypeOption = resp
				})
			},
			getPartner(){
				this.$masterAdapter.getAllPartner().then(resp => {
					this.insuranceOption = resp
				})
			},
			getProvinceByRegion(id){
				this.$contactAdapter.getProvinceByRegion(id).then(resp => {
					this.provinceOption =  resp
					this.searchCompany()
				})
			},
			searchCompany () {
				this.$contactAdapter.searchCompanyList(this.keyword).then(resp => {
					 	this.totalRows = resp.totalAll
						this.getContactCompanyList()
				})
			},
			searchDataKeyword(){
				this.searchKeyword$.next(this.keyword)
			},
			initObservableSubjects(){
				this.searchKeyword$.pipe(
					debounceTime(300),
					mergeMap((keyword) => {
						return from( this.$contactAdapter.searchCompanyList(keyword)).pipe(
							catchError(e => {
								return of(e)
							}),
						)
					}),
					tap(result => {
						if(!_.isEmpty(this.keyword.keyword)){
							this.contactCompanyList = result.data
							this.totalRows = result.total
						}else {
							this.contactCompanyList = result.data
							this.totalRows = result.totalAll
						}
					}),
					catchError(e => {
						return EMPTY
					}),
				).subscribe(result => {
					if(!_.isEmpty(this.keyword.keyword)){
						this.contactCompanyList = result.data
						this.totalRows = result.total
					}else {
						this.contactCompanyList = result.data
						this.totalRows = result.totalAll
					}
				})
			},
			pageChanged(event) {
				this.keyword.currentPage = event
				this.getContactCompanyList()
			},
            onFiltered(filteredItems) {
                this.totalRows = filteredItems.length
                this.keyword.currentPage = 1
            },
			mapDataStatus (data) {
				let map = ''
				if (data === 'active') {
					map = 'Active'
				}else if (data === 'inactive') {
					map = 'In Active'
				}else if (data === 'locked') {
					map = 'Locked'
				}else {
					map = ''
				}
				return map
			},
			mapData(data) {
				const options = []
				if ( data !== null ) {
					for (let i = 0; i < data.length ; i++) {
						options.push({ 'value' : data[i].id , 'text' : data[i].name })
					}
				}
				return options
			},
			mapDataRole (data) {
				return data[0].name
			},
			getContactStatus(){
				this.$masterAdapter.getContactStatus().then(resp => {
					this.contactStatus.push({ 'value' : "" , 'text' : '-Select Status-' })
					for (let i = 0; i < resp.length ; i++) {
						this.contactStatus.push({ 'value' : resp[i].id , 'text' : resp[i].name })
					}
				})
			},
			checkUndifined (data) {
				return !_.isNil(data) && !_.isEmpty(data)
			}
		},
		watch:{
			'keyword.region'(newValue){
				if(_.isEmpty(newValue)){
					this.keyword.province = ''
					this.searchCompany()
				} else if(newValue){
					this.keyword.province = ''
					this.searchCompany()
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "~scss/common/md_colors";
	@import "~scss/common/variables_mixins";
	@import "~scss/plugins/datatables";
	@import '~scss/vue/_pretty_checkboxes';
	.w150 {
		min-width: 150px;
	}
	.w200 {
		min-width: 200px;
	}
	.w250 {
		min-width: 250px;
	}
	.w300 {
		min-width: 300px;
	}
	.clrGreen{
		color: green;
	}

	.clrOrange{
		color: #FFAC33;
	}

	.clrRed{
		color: rgb(255, 51, 51);
	}

	.clrBlue{
		color: blue;
	}

	.clrGrey{
		color: rgb(97, 97, 97);
	}
</style>
