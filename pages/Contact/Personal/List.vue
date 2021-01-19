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
												<span>ADD Personal</span><i class="mdi mdi-plus-box"></i>
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
										@change="searchPersonal()"
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
										@change="searchPersonal()"
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
										@change="searchPersonal()"
										disabled
									>
										<template slot="first">
											<option value=""> - Select province -</option>
										</template>
									</b-form-select>
								</b-form-group>
							</b-col>

							<b-col>
								<b-form-group>
									<label for="insuranceSelect">Insurance Partners (ในเครือ)</label>
									<Select2
										v-model="keyword.insurance"
										:options="insuranceOption"
										@change="searchPersonal()"
										:settings="{ 'placeholder': '- Select garage -', allowClear: true }"
									>
									</Select2>
								</b-form-group>
							</b-col>
						</b-row>
					</b-container>
					<b-container class="bv-example-row">
						<b-row align-h="between">
							<b-col cols="2">
								<b-form-group>
									<label for="perPageSelect">Show</label>
									<b-form-select
										id="perPageSelect"
										v-model="keyword.perPage"
										size="sm"
										:options="pageOptions"
										class="mr-5"
										@change="getPersonalListAll()"
									></b-form-select>
								</b-form-group>
							</b-col>
							<b-col cols="6">
								<b-row align-h="end">
									<b-col cols="4">
										<b-form-group>
											<label for="perPageSelect">Search By</label>
											<b-form-select
												id="perPageSelect"
												v-model="keyword.searchBy"
												size="sm"
												:options="keyTypeOption"
												@change="searchPersonal()"
											>
												<template slot="first">
													<option value=""> - Select keyType -</option>
												</template>
											</b-form-select>
										</b-form-group>
									</b-col>
									<b-col cols="4">
										<b-form-group>
											<label for="perPageSelect">Search</label>
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
					<div class="uk-margin-mini-top">
						<b-table
							striped
							small
							:items="personalList"
							:fields="fields"
							hover
							responsive
							selectable
							:select-mode="modeSelect"
							@row-clicked="getPersonalById"
							ref="selectableTable"
						>
							<template v-slot:cell(No)="row">
								{{ GetIndexRow(keyword.currentPage, keyword.perPage, row.index) }}
							</template>
							<template v-slot:cell(firstName)="row">
								{{ row.item.firstName }}
							</template>
							<template v-slot:cell(lastName)="row">
								{{ row.item.lastName }}
							</template>
							<template v-slot:cell(company)="row">
								{{ row.item.company ? row.item.company: '-' }}
							</template>
							<template v-slot:cell(branch)="row">
								{{ row.item.branch ? row.item.branch: '-' }}
							</template>
							<template v-slot:cell(customerType.name)="row">
								{{ row.item.customerType.name ? row.item.customerType.name: '-' }}
							</template>
							<template v-slot:cell(phone1)="row">
								{{ row.item.phone1 ? row.item.phone1: '-' }}
							</template>
							<template v-slot:cell(email)="row">
								{{ row.item.email ? row.item.email: '-' }}
							</template>
							<template v-slot:cell(status)="row">

								<span v-if="row.item.status.id === '' || row.item.status.id === undefined">-</span>
								<template v-else>
									<span v-if="row.item.status.id === '5f39f8a274601b0bf3bd9e2d'" class="clrBlue">{{row.item.status.name}}</span>
									<span v-else-if="row.item.status.id === '5f350851cd3d534abee6c6ef'" class="clrGrey">{{row.item.status.name}}</span>
									<span v-else-if="row.item.status.id === '5f350864cd3d534abee6c6f0'" class="clrRed">{{row.item.status.name}}</span>
									<span v-else >{{ row.item.status.name }}</span>
								</template>
							</template>
						</b-table>
						<b-pagination
							v-model="keyword.currentPage"
							:total-rows="totalRows"
							:per-page="keyword.perPage"
							class="uk-pagination-right uk-flex-right"
							size="sm"
							@input="pageChanged($event)"
						></b-pagination>
					</div>
				</ScCardBody>
			</ScCard>
		</div>
		<div class="uk-width-1-3@l">
			<ContactCreate v-if="!toggleDataview" @contact-personal-save-summit="getPersonalById"></ContactCreate>
			<ContactView v-else-if="toggleDataview" @contact-personal-update-summit="getPersonalById"></ContactView>
		</div>
	</div>
</template>
<script>
	import ContactCreate from './Create'
	import ContactView from './View'
	import ScInput from "../../../components/Input";
	import {EMPTY, from, of, Subject} from "rxjs";
	import {catchError, debounceTime, mergeMap, tap} from "rxjs/operators";
	import _ from "lodash";
	import Select2 from "~/components/Select2";

	export default {
		components: {
			ScInput,
			ContactCreate,
			ContactView,
			Select2,
		},
		data: () => ({
			fields: [
				{ key: 'No', label: 'No.', sortable: true, class: 'text-left', isRowHeader: true},
				{ key: 'firstName', label: 'First Name', sortable: true, class: 'text-left',tdClass:'w200'},
				{ key: 'lastName', label: 'Last Name', sortable: true, class: 'text-left',tdClass:'w200'},
				{ key: 'company', label: 'Company', sortable: true, class: 'text-left',tdClass:'w300'},
				{ key: 'branch', label: 'Branch', sortable: true, class: 'text-left',tdClass:'w150'},
				{ key: 'brand.name', label: 'Brand', sortable: true, class: 'text-left',tdClass:'w150'},
				{ key: 'customerType.name', label: 'Customer Type', sortable: true, class: 'text-left',tdClass:'w200'},
				{ key: 'phone1', label: 'Mobile', sortable: true, class: 'text-left',tdClass:'w150'},
				{ key: 'email', label: 'Email', sortable: true, class: 'text-left',tdClass:'w250'},
				{ key: 'status', label: 'Status', sortable: true, class: 'text-left',tdClass:'w150'},
			],
			ContactCreate:false,
			ContactView:true,
			totalRows:1,
			pageOptions: [10, 25, 50, 100],
			sortBy: '',
			sortDesc: false,
			sortDirection: 'asc',
			filter: null,
			customerTypeOption: [],
			provinceOption: [],
			insuranceOption: [],
			keyTypeOption: [
				{ text: 'Mobile', value: 'mobile' },
				{ text: 'Line ID', value: 'lineId' },
				{ text: 'E-mail', value: 'email' },
				{ text: 'Brand', value: 'brand' },
			],
			personalList:[],
			modeSelect: 'single',
			keyword:{
				customerType:'',
				province:'',
				region:'',
				insurance:'',
				searchBy:'',
				keyword:'',
				perPage:10,
				currentPage: 1
			},
			searchKeyword:'',
			regionOption: [
				{ text: 'ภาคเหนือ', value: 'ภาคเหนือ' },
				{ text: 'ภาคกลาง', value: 'ภาคกลาง' },
				{ text: 'ภาคตะวันออกเฉียงเหนือ', value: 'ภาคตะวันออกเฉียงเหนือ' },
				{ text: 'ภาคตะวันตก', value: 'ภาคตะวันตก' },
				{ text: 'ภาคตะวันออก', value: 'ภาคตะวันออก' },
				{ text: 'ภาคใต้', value: 'ภาคใต้' },
			],
			personalList: []
		}),
		computed: {
			sortOptions () {
				return this.fields
					.filter(f => f.sortable)
					.map(f => {
						return { text: f.label, value: f.key }
					})
			},
			toggleDataview () {
				return this.$store.getters.pagePersonalView
			},
			toggleDataCreate () {
				return this.$store.getters.pagePersonalCreate
			},
			rows() {
				return this.totalRows
			}
		},
		created() {
			this.searchKeyword$ = new Subject()
		},
		mounted () {
			this.getPersonalListAll()
			this.getCustomerTypeOption()
			this.getInsurance()
			this.initObservableSubjects()
		},
		methods: {
			dtButtonsInitialized () {
				this.$refs.buttonsTable.$dt.buttons().container().appendTo(document.getElementById('sc-dt-buttons'))
			},
			toggleData: function () {
				this.$store.dispatch('pagePersonalView', false);
				this.$store.dispatch('pagePersonalCreate', true);
			},
			toggleDataView(){
				this.$store.dispatch('pagePersonalView', true);
				this.$store.dispatch('pagePersonalCreate', false);
			},
			GetIndexRow (CurrentPage, PerPage, index){
				return ( CurrentPage - 1 ) * PerPage + (index + 1)
			},
			getPersonalListAll(){
				let loader = this.$loading.show({
					loader: 'spinner'
				})
				this.$contactAdapter.getPersonalListAll(this.keyword).then(resp => {
					this.personalList = resp.data
					this.totalRows = resp.totalAll
					loader.hide()
				})
			},
			getPersonalById(item){
				let loader = this.$loading.show({
					loader: 'spinner'
				})
				const id = item.id
				this.$contactAdapter.getPersonalByid(id).then(resp => {
					this.toggleDataView()
					this.$store.dispatch('getPersonalById',resp)
					loader.hide()
				})
				this.getPersonalListAll()
			},
			getCustomerTypeOption(){
				this.$masterAdapter.getAllCustomerTypes().then(resp => {
					this.customerTypeOption = resp
				})
			},
			getInsurance(){
				this.$masterAdapter.getAllPartner().then(resp => {
					this.insuranceOption = resp
				})
			},
			searchDataKeyword(){
				this.searchKeyword$.next(this.keyword)
			},
			initObservableSubjects(){
				this.searchKeyword$.pipe(
					debounceTime(300),
					mergeMap((keyword) => {
						return from( this.$contactAdapter.searchPersonalList(keyword)).pipe(
							catchError(e => {
								return of(e)
							}),
						)
					}),
					tap(result => {
						if(_.isEmpty(this.keyword.keyword)){
							this.personalList = result.data
							this.totalRows = result.totalAll
						}else {
							this.personalList = result.data
							this.totalRows = result.total
						}

					}),
					catchError(e => {
						return EMPTY
					}),
				).subscribe(result => {
					if(_.isEmpty(this.keyword.keyword)){
						this.personalList = result.data
						this.totalRows = result.totalAll
					}else {
						this.personalList = result.data
						this.totalRows = result.total
					}
				})
			},
			getProvinceByRegion(id){
				this.$contactAdapter.getProvinceByRegion(id).then(resp => {
					this.provinceOption =  resp
					this.searchPersonal()
				})
			},
			exportListView(){
				this.$contactAdapter.ExportPersonalListView(this.keyword).then(resp => {
					const url = window.URL.createObjectURL(new Blob([resp]));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', 'ExportPersonalListView.xlsx');
					document.body.appendChild(link);
					link.click();
				}).catch((err) => {
					Swal.fire('Error!', ' <br/>' + err.response.data.message, 'error')
				})
			},
			exportListAll(){
				this.$contactAdapter.ExportPersonalListAll(this.keyword).then(resp => {
					const url = window.URL.createObjectURL(new Blob([resp]));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', 'ExportPersonalListAll.xlsx');
					document.body.appendChild(link);
					link.click();
				}).catch((err) => {
					Swal.fire('Error!', ' <br/>' + err.response.data.message, 'error')
				})
			},
			searchPersonal () {
				this.$contactAdapter.searchPersonalList(this.keyword).then(resp => {
						this.totalRows = resp.totalAll
						this.getPersonalListAll()
				})
			},
			pageChanged(event) {
				this.keyword.currentPage = event
				this.getPersonalListAll()
			},
            onFiltered(filteredItems) {
                this.totalRows = filteredItems.length
                this.currentPage = 1
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
		},
		watch:{
			'keyword.region'(newValue){
				if(_.isEmpty(newValue)){
					this.keyword.province = ''
					this.searchPersonal()
				}else if(newValue){
					this.keyword.province = ''
					this.searchPersonal()
				}
			},

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
</style>

