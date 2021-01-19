<template>
	<div id="sc-page-wrapper">
		<no-ssr>
			<div id="sc-page-top-bar" class="sc-top-bar">
				<div class="sc-top-bar-content uk-flex uk-flex-1">
					<h1 class="sc-top-bar-title uk-text-uppercase uk-flex-1">
						Over SLA
					</h1>
				</div>
			</div>
		</no-ssr>
		<div id="sc-page-content">
			<ScCard class="uk-margin-top">
				<ScCardBody>
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
							>
							</b-form-select>
						</b-form-group>
					</div>
					<div class="uk-width-1-6@s uk-align-right uk-margin-bottom">
						<input v-model="filter" class="uk-input uk-form-small" type="text" placeholder="Search">
					</div>
					<div class="uk-margin-top uk-table-responsive">
						<b-table
							small
							:items="listTicketOverSla"
							:fields="fields"
							:current-page="currentPage"
							:per-page="perPage"
							:filter="filter"
							@filtered="onFiltered"
							responsive
							headVariant="light"
							hover
						>
							<template v-slot:cell(No)="row">
								{{ GetIndexRow(currentPage, perPage, row.index) }}
							</template>
							<template v-slot:cell(ticketNo)="row">
								<a style="color: #0e76a8" @click="viewTickets(row.item)">
									{{ row.item.ticketNo ? row.item.ticketNo : '-' }}
								</a>
							</template>
							<template v-slot:cell(createdAt)="row">
								{{ row.item.createdAt ? convertUnixToTime(row.item.createdAt) : '-'}}
							</template>
							<template v-slot:cell(slaTime)="row">
								{{ newDateSLA(row.item.slaTime)}}
							</template>

							<template v-slot:cell(overSla)="row">
								<strong v-if="row.item.overSla === 0" class="uk-text-success">In SLA</strong>
								<strong v-if="row.item.overSla !== 0" class="uk-text-danger">
									{{ numberToTime(row.item.overSla)}}</strong>
							</template>

							<template v-slot:cell(createBy)="row">
								{{ row.item.createBy.name ? row.item.createBy.name: '-'}}
							</template>
							<template v-slot:cell(createdBy.team.name)="row">
								{{ row.item.createdBy.team.name ? row.item.createdBy.team.name.toUpperCase(): '-'}}
							</template>
						</b-table>
						<b-pagination
							v-model="currentPage"
							:total-rows="totalRow"
							:per-page="perPage"
							size="sm"
							class="uk-pagination-right uk-flex-right"
						>
						</b-pagination>
					</div>
				</ScCardBody>
			</ScCard>
		</div>
	</div>
</template>
<script>
	import moment from 'moment'
	export default {
		components: {
		},
		data: () => ({
			fields: [
				{key: 'No', label: 'No.',  sortDirection: 'desc'},
				{key: 'ticketNo', label: 'Ticket Number',  class: 'text-left' ,tdClass:'fixLowtWidth'},
				{key: 'contactType', label: 'Contact Type',  class: 'text-left',tdClass:'listWidth'},
				{key: 'slaTime', label: 'SLA Time',  class: 'text-left' ,tdClass:'fixLowtWidth'},
				{key: 'overSla', label: 'Over SLA',  class: 'text-left' ,tdClass:'fixLowtWidth'},
				{key: 'createdAt', label: 'Ticket Open', tdClass:'listWidth'},
				{key: 'createdBy.name', label: 'Created By',  class: 'text-left',tdClass: 'listWidth'},
				{key: 'createdBy.team.name', label: 'Team',  class: 'text-left'},
			],
			listTicketOverSla:[],
			ContactCreate: false,
			ContactView: true,
			totalRows: 1,
			currentPage: 1,
			perPage: 15,
			pageOptions: [10, 15, 25, 50, 100],
			sortBy: '',
			sortDesc: false,
			sortDirection: 'asc',
			filter: null,
			filterOn: [],
			keyword: {
				assignTo: '',
			},
			totalRow:''
		}),
		computed: {
			sortOptions() {
				return this.fields
					.filter(f => f.sortable)
					.map(f => {
						return {text: f.label, value: f.key}
					})
			},
		},
		mounted() {
			this.getReminder()
		},
		methods: {
			numberToTime(decimalTimeString) {
				let decimalTime = parseFloat(decimalTimeString)
				decimalTime = decimalTime * 60 * 60
				const hours = Math.floor((decimalTime / (60 * 60)))
				decimalTime = decimalTime - (hours * 60 * 60)
				const minutes = Math.floor((decimalTime / 60))
				decimalTime = decimalTime - (minutes * 60)
				const seconds = Math.round(decimalTime)
				let newHr
				let newMin
				let newSec
				if (Math.abs(hours) < 10) {
					newHr = '0' + hours
				} else {
					newHr = hours
				}
				if (minutes < 10) {
					newMin = '0' + minutes
				} else {
					newMin = minutes
				}
				if (seconds < 10) {
					newSec = '0' + seconds
				} else {
					newSec = seconds
				}
				return newHr + ':' + newMin + ':' + newSec
			},
			convertUnixToTime(unixTime, format =  'DD/MM/YYYY HH:mm:ss') {
				const unix = unixTime / 1000
				return this.$moment.unix(unix).format(format)
			},
			getTicketList() {
				const dataMap = Object.values(this.$store.getters.getTicketOverSlaList)
				this.listTicketOverSla = _.orderBy(dataMap, ['slaTime'], ['desc'])
				this.totalRow = this.listTicketOverSla.length
			},
			onFiltered(filteredItems) {
				this.totalRow = filteredItems.length
				this.currentPage = 1
			},
			getReminder() {
				const date = moment().format('YYYY-MM-DD')
				this.$reminderAdapter.getReminder(date).then(resp => {
					this.$store.dispatch('setTicketOverList', resp.data)
					this.$store.dispatch('setListReminder', resp.data)
					this.totalRow = this.listTicketOverSla.length
					this.getTicketList()
				})
			},
			GetIndexRow(CurrentPage, PerPage, index) {
				return (CurrentPage - 1) * PerPage + (index + 1)
			},
			viewTickets(data) {
				this.$reminderAdapter.readedReminder(data.id).then(resp => {
					this.getReminder()
					this.$router.push(`/Ticket/View?ticketNo=${data.ticketNo}`)
				})
			},
			newDateSLA (data) {
				let date = moment(new Date (data)).format('DD/MM/YYYY HH:mm:ss')
				return date
			}
		},
		watch: {
		}
	}

</script>

<style lang="scss">
	@import "~scss/common/md_colors";
	@import "~scss/common/variables_mixins";
	@import "~scss/plugins/datatables";
	@import '~scss/vue/_pretty_checkboxes';
</style>
<style type="scss">
	.listWidth {
		min-width: 150px;
	}
	.fixWidth {
		min-width: 350px;
	}
	.fixLowtWidth {
		min-width: 100px;
	}
</style>
