<template>
  <div id="sc-page-wrapper">
    <no-ssr>
      <div id="sc-page-top-bar" class="sc-top-bar">
        <div class="sc-top-bar-content uk-flex uk-flex-1">
          <h1 class="sc-top-bar-title uk-text-uppercase uk-flex-1">
			  History Edit Log
          </h1>
        </div>
      </div>
    </no-ssr>

    <div id="sc-page-content">
		<div class="uk-grid uk-child-width" data-uk-grid>
			<div>
				<ScCard class="uk-margin-mini-top">
					<ScCardHeader separator>
						<div>
							<div>
								<ScCardTitle>
									<div>
										<transition name="fade" mode="out-in">
											<div>
												<a href="javascript:void(0)" class="sc-button sc-button-secondary sc-button-social" @click="backPage()">
													<i class="mdi mdi-arrow-left-bold-circle"></i>
												</a>
											</div>
										</transition>
									</div>
								</ScCardTitle>
							</div>
						</div>
					</ScCardHeader>
					<ScCardBody style="min-height: 710px">
						<div class="uk-margin-bottom uk-width-1-6@s uk-align-left">
							<b-form-group
								label="Show"
								label-cols-sm="6"
								label-cols-md="4"
								label-cols-lg="3"
								label-align-sm="left"
								label-size="sm"
								label-for="perPageSelect"
								class="mb-0 uk-align-left"
							>
								<b-form-select
									id="perPageSelect"
									v-model="perPage"
									size="sm"
									:options="pageOptions"
									class="mr-5"
								></b-form-select>
							</b-form-group>
						</div>
						<div class="uk-width-1-6@s uk-align-right uk-margin-bottom">
							<input v-model="filter" class="uk-input uk-form-small" type="text" placeholder="Search">
						</div>
						<div class="uk-margin-top">
							<b-table
								sticky-header="550px"
								small
								:items="historyLogList"
								:fields="fields"
								:current-page="currentPage"
								:per-page="perPage"
								:filter="filter"
								hover
								responsive
							>
								<template v-slot:cell(No)="row">
									{{ GetIndexRow(currentPage, perPage, row.index) }}
								</template>
								<template v-slot:cell(team)="row">
									{{ row.item.team ? row.item.team: '-' }}
								</template>
								<template v-slot:cell(agent)="row">
									{{ row.item.agent ? row.item.agent: '-' }}
								</template>
								<template v-slot:cell(timestamp)="row">
									{{ row.item.timestamp ? formatDate(row.item.timestamp): '-' }}
								</template>
								<template v-slot:cell(field)="row">
									{{ row.item.field ? row.item.field: '-' }}
								</template>
								<template v-slot:cell(detail)="row">
									{{ row.item.detail ? row.item.detail: '-' }}
								</template>
							</b-table>
							<b-pagination
								v-model="currentPage"
								:total-rows="totalRow"
								:per-page="perPage"
								class="uk-pagination-right uk-flex-right"
								size="sm"
							></b-pagination>
						</div>
						<div class="uk-align-right">
							<a class="sc-button sc-button-success sc-button-social" data-uk-toggle="target: #modal-remarkLogCompany">
								<span>Remark</span><i class="mdi mdi-format-list-numbered"></i>
							</a>
						</div>
					</ScCardBody>
				</ScCard>
			</div>
		</div>
    </div>
	  <Remark/>
  </div>
</template>

<script>
	import Remark from "./Remark";
	import moment from "moment"
export default {
    components: {
		Remark
    },
	data: () => ({
		fields: [
			{ key: 'No', label: 'No.', sortable: true, class: 'text-left', isRowHeader: true},
			{ key: 'team', label: 'Team', sortable: true, class: 'text-left'},
			{ key: 'agent', label: 'Agent', sortable: true, class: 'text-left'},
			{ key: 'timestamp', label: 'Edit DateTime', stickyColumn: true },
			{ key: 'field', label: 'Item Edit', sortable: true, class: 'text-left'},
			{ key: 'detail', label: 'Detail Edit', sortable: true, class: 'text-left'},
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
		historyLogList:[]
	}),
	computed: {
		sortOptions () {
			return this.fields
				.filter(f => f.sortable)
				.map(f => {
					return { text: f.label, value: f.key }
				})
		},
		totalRow(){
			return this.historyLogList.length
		}
	},
	created() {
		this.companyId = this.$route.query.company
	},
	mounted () {
    	this.getEditHistoryLogCompany()
		this.getRemarkLog()
	},
	methods: {
		GetIndexRow (CurrentPage, PerPage, index){
			return ( CurrentPage - 1 ) * PerPage + (index + 1)
		},
		backPage(){
			this.$router.push(`/Contact`)
		},
		getEditHistoryLogCompany(){
			this.$contactAdapter.getHistoryLog(this.companyId).then(resp => {
				this.historyLogList = _.orderBy(resp.logs, ['timestamp'], ['desc'])
			})
		},
		getRemarkLog(){
			this.$contactAdapter.getHistoryLog(this.companyId).then(resp => {
				this.$store.dispatch('setCompanyRemarkById', resp.logs)
			})
		},
		formatDate (data) {
			let dateTime = moment(new Date (data)).format('DD/MM/YYYY HH:mm')
			return dateTime
		}
	}
}
</script>


