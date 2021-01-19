<template>
	<div id="sc-page-wrapper">
		<no-ssr>
			<div id="sc-page-top-bar" class="sc-top-bar">
				<div class="sc-top-bar-content uk-flex uk-flex-1">
					<h1 class="sc-top-bar-title uk-text-uppercase uk-flex-1">
						CONTACT PEOPLE IN COMPANY
					</h1>
				</div>
			</div>
		</no-ssr>

		<div id="sc-page-content" class="uk-grid" data-uk-grid>
			<div class="uk-width-2-3@l">
				<ScCard class="uk-margin-mini-top">
					<ScCardHeader separator>
						<div class="uk-flex-middle uk-grid-small uk-grid" data-uk-grid>
							<div>
								<a href="javascript:void(0)" class="sc-button sc-button-secondary sc-button-social" @click="backPageToCompany()">
									<i class="mdi mdi-arrow-left-bold-circle"></i>
								</a>
							</div>
							<div class="uk-flex-1">
								<ScCardTitle>
									<div>
										<transition name="fade" mode="out-in">
											<div key="userPreview">
												<a href="javascript:void(0)" class="sc-button sc-button-primary sc-button-social" @click="toggleData()">
													<span>ADD PEOPLE</span><i class="mdi mdi-plus-box"></i>
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
													<a href="javascript:void(0)" @click="exportViewPeopleInCom()">
														Export View
													</a>
												</li>
												<li>
													<a href="javascript:void(0)" @click="exportAllPeopleInCom()">
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
							<b-row align-h="between">
								<b-col>
									<b-form-group>
										<label for="perPageSelect">Show</label>
										<b-form-select
											id="perPageSelect"
											v-model="perPage"
											size="sm"
											:options="pageOptions"
											class="mr-5"
											@change="getListPeopleInCompany"
										></b-form-select>
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
											@change="searchPeople()"
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
											@change="searchPeople()"
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
						</b-container>
						<div class="uk-margin-mini-top">
							<b-table
								sticky-header="550px"
								responsive
								small
								hover
								:items="listPeopleInCompany"
								:fields="fields"
								:current-page="currentPage"
								:filter="filter"
								@filtered="onFiltered"
								ref="selectableTable"
								selectable
								:select-mode="modeSelect"
								@row-clicked="peopleInCompanylistByid"
							>
								<template v-slot:cell(No)="row">
									{{ GetIndexRow(currentPage, perPage, row.index) }}
								</template>
								<template v-slot:cell(firstName)="row">
									{{ row.item.firstName }}
								</template>
								<template v-slot:cell(lastName)="row">
									{{ row.item.lastName }}
								</template>
								<template v-slot:cell(position)="row">
									{{ row.item.position ? row.item.position: '-' }}
								</template>
								<template v-slot:cell(phone)="row">
									{{ row.item.phone1 ? row.item.phone1: '-' }}
								</template>
								<template v-slot:cell(email)="row">
									{{ row.item.email ? row.item.email: '-' }}
								</template>
								<template v-slot:cell(status)="row">
									<span v-if="row.item.status.id === '' || row.item.status.id === null">-</span>
									<template v-else>
										<span v-if="row.item.status._id === '5f39f8a274601b0bf3bd9e2d'" class="clrBlue">{{ row.item.status.name }}</span>
										<span v-else-if="row.item.status._id === '5f350864cd3d534abee6c6f0'" class="clrGrey">{{ row.item.status.name }}</span>
										<span v-else-if="row.item.status._id === '5f350851cd3d534abee6c6ef'" class="clrRed">{{ row.item.status.name }}</span>
										<span >{{ row.item.status.name }}</span>
									</template>
								</template>
							</b-table>
							<b-pagination
								v-model="currentPage"
								:total-rows="totalRows"
								:per-page="perPage"
								class="uk-pagination-right uk-flex-right"
								size="sm"
								@input="pageChanged($event)"
							></b-pagination>
						</div>
					</ScCardBody>
				</ScCard>
			</div>
			<div class="uk-width-1-3@l">
				<ContactPersonCompanyCreate v-if="!toggleDataview"></ContactPersonCompanyCreate>
				<ContactPersonCompanyView v-else-if="toggleDataview"></ContactPersonCompanyView>
			</div>
		</div>
	</div>
</template>
<script>
	import ContactPersonCompanyCreate from './Create'
	import ContactPersonCompanyView from './View'
	import {EMPTY, from, of, Subject} from "rxjs";
	import {catchError, debounceTime, mergeMap, tap} from "rxjs/operators";


	export default {
		components: {
			ContactPersonCompanyCreate,
			ContactPersonCompanyView,
		},
		data: () => ({
			fields: [
				{ key: 'No', label: 'No.', sortable: true, class: 'text-left', isRowHeader: true},
				{ key: 'firstName', label: 'First Name', sortable: true, class: 'text-left'},
				{ key: 'lastName', label: 'Last Name', sortable: true, class: 'text-left'},
				{ key: 'position', label: 'Position' },
				{ key: 'phone1', label: 'Mobile', sortable: true, class: 'text-left'},
				{ key: 'email', label: 'Email', sortable: true, class: 'text-left'},
				{ key: 'status', label: 'Status', sortable: true, class: 'text-left'},
			],
			ContactCompanyCreate:false,
			ContactCompanyView:true,
			totalRows: 1,
			currentPage: 1,
			perPage: 10,
			pageOptions: [10, 25, 50, 100],
			sortBy: '',
			sortDesc: false,
			sortDirection: 'asc',
			filter: null,
			listPeopleInCompany:[],
			modeSelect: 'single',
			customerTypeOption: [],
			provinceOption: [],
			keyTypeOption: [
				{ text: 'Mobile', value: 'phone1' },
				{ text: 'Line ID', value: 'lineId' },
				{ text: 'E-mail', value: 'email' },
			],
			keyword:{
				customerType:'',
				province:'',
				region:'',
				searchBy:'',
				keyword:'',
				currentPage:1,
				perPage:10,
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
		}),
		computed: {
			sortOptions () {
				return this.fields
					.filter(f => f.sortable)
					.map(f => {
						return { text: f.label, value: f.key }
					})
			},
			contactlist () {0
				return this.$store.getters.getUser
			},
			toggleDataview () {
				return this.$store.getters.pagePeopleInCompanyView
			},
			toggleDataCreate () {
				return this.$store.getters.pagePeopleInCompaycreate
			},
			totalRow () {
				return this.contactlist.length
			},
			contactCompanyView () {
				return this.$store.getters.getViewContact
			},
		},
		created() {
			this.companyId = this.$route.query.company
			this.searchKeyword$ = new Subject()
		},
		mounted () {
			this.getListPeopleInCompany()
			this.getCompanyId()
			this.getCustomerTypeOption()
			this.initObservableSubjects()
		},
		methods: {
			dtButtonsInitialized () {
				this.$refs.buttonsTable.$dt.buttons().container().appendTo(document.getElementById('sc-dt-buttons'))
			},
			toggleData: function () {
				this.$refs.selectableTable.clearSelected()
				this.$store.dispatch('getDetailPeopleInCompanyById', {})
				this.$store.dispatch('pagePeopleInCompanyView', false);
				this.$store.dispatch('pagePeopleInCompanyCreate', true);
			},
			peopleInCompanylistByid (item) {
				let loader = this.$loading.show({
					loader: 'spinner'
				})
				const id = item.id
				if (_.isNil(id)){
					loader.hide()
					this.$swal("Warning!", "ID นี้ไม่มีในระบบ !", "warning")
				}else {
					this.$contactAdapter.getDetailPeopleInCompanyById(id).then(resp => {
						loader.hide()
						this.$store.dispatch('getDetailPeopleInCompanyById', resp)
					})
				}
			},
			GetIndexRow (CurrentPage, PerPage, index){
				return ( CurrentPage - 1 ) * PerPage + (index + 1)
			},
			backPageToCompany(){
				this.$router.push(`/Contact`)
			},
			getListPeopleInCompany(){
				let loader = this.$loading.show({
					loader: 'spinner'
				})
				this.keyword.perPage = this.perPage
				this.$contactAdapter.getListPeopleInCompany(this.companyId,this.keyword).then(resp => {
					this.listPeopleInCompany = resp.data
					this.totalRows = resp.totalAll
					loader.hide()
				})
			},
			getCompanyId(){
				this.$contactAdapter.getCompanyViewDataById(this.companyId).then(resp => {
					this.$store.dispatch('getCompanyById',resp)
				})
			},
			exportViewPeopleInCom(){
				this.$contactAdapter.exportViewPeopleInCom(this.keyword,this.companyId).then(resp => {
					const url = window.URL.createObjectURL(new Blob([resp]));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', 'peopleInCompanyView.xlsx');
					document.body.appendChild(link);
					link.click();s
				})
			},
			exportAllPeopleInCom(){
				this.$contactAdapter.exportAllPeopleInCom(this.keyword,this.companyId).then(resp => {
					const url = window.URL.createObjectURL(new Blob([resp]));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', 'peopleInCompanyAll.xlsx');
					document.body.appendChild(link);
					link.click();
				})
			},
			getCustomerTypeOption(){
				this.$masterAdapter.getAllCustomerTypes().then(resp => {
					this.customerTypeOption = resp
				})
			},
			searchDataKeyword(){
				this.searchKeyword$.next(this.keyword)
			},
			initObservableSubjects(){
				this.searchKeyword$.pipe(
					debounceTime(300),
					mergeMap((keyword) => {
						return from( this.$contactAdapter.searchPeopleInCompany(this.companyId, keyword)).pipe(
							catchError(e => {
								return of(e)
							}),
						)
					}),
					tap(result => {
						this.listPeopleInCompany = result.data
						this.totalRows = result.totalAll
					}),
					catchError(e => {
						return EMPTY
					}),
				).subscribe(result => {
					this.listPeopleInCompany = result.data
					this.totalRows = result.totalAll
				})
			},
			getProvinceByRegion(id){
				this.$contactAdapter.getProvinceByRegion(id).then(resp => {
					this.provinceOption =  resp
					this.searchPeople()
				})
			},
			searchPeople(){
				this.$contactAdapter.searchPeopleInCompany(this.companyId,this.keyword).then(resp => {
					this.totalRows = resp.totalAll
					this.getListPeopleInCompany()
				})
			},
			pageChanged(event) {
				this.keyword.currentPage = event
				this.getListPeopleInCompany()
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
			}

		},
		watch:{
			'keyword.region'(newValue){
				if(_.isEmpty(newValue)){
					this.keyword.province = ''
					this.searchPeople()
				}else if(newValue){
					this.keyword.province = ''
					this.searchPeople()
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
	.clrRed{
		color: rgb(255, 51, 51);
	}

	.clrBlue{
		color: blue;
	}

	.clrGrey{
		color: rgb(177, 177, 177);
	}
</style>
