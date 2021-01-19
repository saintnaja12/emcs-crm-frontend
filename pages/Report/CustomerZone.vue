<template>
	<div id="sc-page-wrapper">
		<no-ssr>
			<div id="sc-page-top-bar" class="sc-top-bar">
				<div class="sc-top-bar-content uk-flex uk-flex-1">
					<h1 class="sc-top-bar-title uk-text-uppercase uk-flex-1">
						Customer Zone Report
					</h1>
				</div>
			</div>
		</no-ssr>
		<div id="sc-page-content">
			<div class="uk-width-1-1">
				<ScCard>
					<ScCardHeader separator>
						<div class="uk-flex uk-flex-middle">
							<div class="uk-flex-1">
								<ScCardTitle>
									Filters
									<div class="sc-fab-card-wrapper uk-position-right uk-margin-small-top">
										<button v-waves.button.light
												class="sc-button sc-button-warning"
												@click="searchTicker(form)"
										>
											Show Alll Case
										</button>
										<div class="uk-button-group">
											<button class="sc-button sc-button-success sc-button-social">
												<span>Export</span><i class="mdi mdi-file-export"></i>
											</button>
											<div class="uk-inline">
												<button class="sc-button sc-button-success sc-button-social sc-button-icon">
													<i class="mdi mdi-chevron-down"></i>
												</button>
												<div data-uk-dropdown="mode: click; boundary: ! .uk-button-group; boundary-align: true;">
													<ul class="uk-nav uk-dropdown-nav">
														<li class="uk-active">
															<a href="javascript:void(0)">
																Export View
															</a>
														</li>
														<li>
															<a href="javascript:void(0)">
																Export All
															</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</ScCardTitle>
							</div>
						</div>
					</ScCardHeader>
					<ScCardBody>
						<div data-uk-grid="" class="uk-child-width-1-6@s uk-grid-small uk-grid">
							<div class="uk-text-center uk-first-column">
								<DateRangePicker>
									<ScInput v-model="form.datetime" placeholder="Pick a range..." mode="outline">
										<label>Date Range</label>
									</ScInput>
								</DateRangePicker>
							</div>
							<div>
								<ScInput v-model="form.ticketNo">
									<label>Ticket No</label>
								</ScInput>
							</div>
							<div>
								<ScInput v-model="form.companyName">
									<label>Company Name</label>
								</ScInput>
							</div>
							<div>
								<ScInput v-model="form.customerName">
									<label>Customer Name</label>
								</ScInput>
							</div>
							<div>
								<ScInput v-model="form.openDate" v-flatpickr placeholder="Pick a date..." mode="outline">
									<label>Open Date</label>
								</ScInput>
							</div>
							<div>
								<ScInput v-model="form.closeDate" v-flatpickr placeholder="Pick a date..." mode="outline">
									<label>Close Date</label>
								</ScInput>
							</div>
						</div>
						<div data-uk-grid="" class="uk-child-width-expand@m uk-grid-small uk-grid">

							<div>
								<select v-model="form.channel" class="uk-select">
									<option v-for="option in channelOption" v-bind:value="option.value">
										{{ option.text }}
									</option>
								</select>
							</div>

							<div>
								<select v-model="form.customerType" class="uk-select">
									<option v-for="option in customerTypeOption" v-bind:value="option.value">
										{{ option.text }}
									</option>
								</select>
							</div>

							<div>
								<select v-model="form.region" class="uk-select">
									<option v-for="option in regionOption" v-bind:value="option.value">
										{{ option.text }}
									</option>
								</select>
							</div>

							<div>
								<select v-model="form.province" class="uk-select">
									<option v-for="option in provinceOption" v-bind:value="option.value">
										{{ option.text }}
									</option>
								</select>
							</div>

							<div>
								<select v-model="form.statusCustomer" class="uk-select">
									<option v-for="option in statusCustomerOption" v-bind:value="option.value">
										{{ option.text }}
									</option>
								</select>
							</div>
						</div>
					</ScCardBody>
				</ScCard>
			</div>
			<div class="uk-width-1-1 uk-margin-top">
				<ScCard>
					<ScCardTitle>
						Report Ticket
					</ScCardTitle>
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
								></b-form-select>
							</b-form-group>
						</div>
						<div class="uk-margin-top">
							<b-table
								small
								:items="reportTicket"
								:fields="fields"
								:current-page="currentPage"
								:per-page="perPage"
								:filter="filter"
								responsive
								striped
							>
							</b-table>
							<b-pagination
								v-model="currentPage"
								:total-rows="totalRows"
								:per-page="perPage"
								class="uk-pagination-right uk-flex-right"
							></b-pagination>
						</div>
					</ScCardBody>
				</ScCard>
			</div>

			<div class="uk-margin-top">
				<div data-uk-grid="" class="uk-child-width-1-2@s uk-grid">
					<div class="uk-first-column">
						<ScCard class="uk-margin">
							<ScCardTitle>
								Pie Chart
							</ScCardTitle>
							<ScCardBody>
								<div>
									<div>
										<select v-model="pieChart" class="uk-select">
											<option disabled value="">select Chart source</option>
											<option v-for="option in pieChartOption" v-bind:value="option.value">
												{{ option.text }}
											</option>
										</select>
									</div>
								</div>
							</ScCardBody>
						</ScCard>
					</div>
					<div>
						<ScCard class="uk-margin">
							<ScCardTitle>
								Bar Chart Quarter Data
							</ScCardTitle>
							<ScCardBody>
								<div data-uk-grid="" class="uk-child-width-1-3@s uk-grid-small uk-grid">
									<div>
										<select v-model="quarter" class="uk-select">
											<option disabled value="">select Quarter</option>
											<option v-for="option in quarterOption" v-bind:value="option.value">
												{{ option.text }}
											</option>
										</select>
									</div>
									<div>
										<select v-model="year" class="uk-select">
											<option disabled value="">select year</option>
											<option v-for="option in yearOption" v-bind:value="option.value">
												{{ option.text }}
											</option>
										</select>
									</div>
									<div>
										<select v-model="barChart" class="uk-select">
											<option disabled value="">select Chart source</option>
											<option v-for="option in barChartOption" v-bind:value="option.value">
												{{ option.text }}
											</option>
										</select>
									</div>
								</div>
							</ScCardBody>
						</ScCard>
					</div>
				</div>

				<div data-uk-grid="" class="uk-child-width-1-2@s uk-grid">
					<div>
						<ScCard>
							<ScCardTitle>
								Channel
							</ScCardTitle>
							<ScCardBody>
								<BillboardChart
									v-if="appMounted"
									:options="returnsChart"
									class="sc-chart"
									@created="returnsChartLoaded = true"
								></BillboardChart>
								<div v-if="!returnsChartLoaded" class="sc-chart">
									<div class="uk-flex uk-flex-middle uk-height-1-1 uk-flex-center">
										<div class="sc-spinner"></div>
									</div>
								</div>
							</ScCardBody>
						</ScCard>
					</div>

					<div>
						<ScCard>
							<ScCardTitle>
								Channel
							</ScCardTitle>
							<ScCardBody>
								<no-ssr>
									<BillboardChart :options="bb.barChart"></BillboardChart>
								</no-ssr>
							</ScCardBody>
						</ScCard>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>
<script>
	import { scColors } from '~/assets/js/utils';
	import * as d3 from 'd3';
	import ScInput from '~/components/Input'
	import Buttons from '../src/components/buttons'
	import moment from 'moment'
	import DateRangePicker from '~/components/DateRangePicker'
	if(process.client) {
		require('~/plugins/flatpickr');
	}

	export default {
		components: {
			BillboardChart: process.client ? () => import('~/components/billboard-charts') : null,
			Buttons,
			ScInput,
			DateRangePicker,
			moment,
			d3
		},
		data: () => ({
			bb: {
				barChart: {
					data: {
						columns: [
							["Jan (101)", 10, 25, 12, 31, 23],
							["Feb (100)", 32, 9, 16, 21, 22],
							["Mar (121)", 23, 11, 23, 33, 31],
						],
						type: "bar"
					},
					bar: {
						width: {
							ratio: 0.5
						}
					},
					axis: {
						rotated:true,
						x: {
							categories: ["Category 1", "Category 2"],
							"tick": {
								"format": function(x,cat) {
									// x is the datetime data
									return '1234';
								}
							}
						}
					},
					color: {
						pattern: scColors.multi
					},
					grid: {
						y: {
							show: true
						}
					}
				}},
			form:{
				datetime: '2020-01-01~2020-01-31',
				openDate: '',
				closeDate: '',
				ticketNumber: '',
				channel: '',
				customerType: '',
				region: '',
				province: '',
				companyName: '',
				customerName: '',
				statusCustomer: '',
			},
			channelOption: [
				{ text: 'All Channel', value: '' },
				{ text: 'Call', value: 'call' },
				{ text: 'Email', value: 'email' },
				{ text: 'Webform [App]', value: 'webformApp' },
				{ text: 'Webform [Web]', value: 'webformWeb' },
				{ text: 'Create by Agent', value: 'createByAgent' },
			],
			customerTypeOption: [
				{ text: 'All Customer Type', value: '' },
				{ text: 'อู่', value: 'garage' },
				{ text: 'ร้านกระจก', value: 'glass' },
				{ text: 'ร้านอะไหล่', value: 'part' },
				{ text: 'ร้านมอเตอร์ไซด์', value: 'motorcycle' },
				{ text: 'ร้านไฟเบอร์และแม็ก', value: 'fiber' },
				{ text: 'บริษัทสำรวจภัย', value: 'survey' },
				{ text: 'บริษัทประกันภัย', value: 'insurance' },
				{ text: 'ศูนย์บริการ', value: 'serviceCenter' },
			],
			provinceOption: [
				{ text: 'All Province', value: '' },
				{ text: 'กรุงเทพ', value: 'garage' },
				{ text: 'เชียงใหม่', value: 'glass' },
				{ text: 'ขอนแก่น', value: 'part' },
				{ text: 'ยะลา', value: 'motorcycle' },
				{ text: 'สุโทัย', value: 'fiber' },
				{ text: 'อยุธยา', value: 'survey' },
				{ text: 'ปราจีนบุรี', value: 'insurance' },
				{ text: 'อุดรธานี', value: 'serviceCenter' },
			],
			regionOption: [
				{ text: 'All Region', value: '' },
				{ text: 'เหนือ', value: 'call' },
				{ text: 'ใต้', value: 'email' },
				{ text: 'ตะวันออกเฉียงเหนือ [App]', value: 'webformApp' },
				{ text: 'ตะวันออก', value: 'webformWeb' },
				{ text: 'กลาง', value: 'createByAgent' },
			],
			statusCustomerOption: [
				{ text: 'All Status Cuctomer', value: '' },
				{ text: 'aa', value: 'aa' },
				{ text: 'ss', value: 'ss' },
			],
			fields: [
				{ key: 'Id', label: 'No.', sortable: true, sortDirection: 'desc' },
				{ key: 'ticketNo', label: 'Ticket No.', sortable: true, class: 'text-left' },
				{ key: 'channel', label: 'Channel', sortable: true, class: 'text-left' },
				{ key: 'custometType', label: 'Customer Type', sortable: true, class: 'text-left' },
				{ key: 'companyName', label: 'Company Name', sortable: true, class: 'text-left' },
				{ key: 'custometName', label: 'Customer Name', sortable: true, class: 'text-left' },
				{ key: 'region', label: 'Region', sortable: true, class: 'text-left' },
				{ key: 'province', label: 'Province', sortable: true, class: 'text-left' },
				{ key: 'openDate', label: 'Open Date', sortable: true, class: 'text-left' },
				{ key: 'closeDate', label: 'Close Date', sortable: true, class: 'text-left' },
				{ key: 'statusCustomer', label: 'Status Customer', sortable: true, class: 'text-left' },
			],
			pieChart: "",
			pieChartOption: [
				{ text: 'Customer Type', value: 'customerType' },
				{ text: 'Customer Company (Top 10)', value: 'customerCompany' },
				{ text: 'Region', value: 'region' },
				{ text: 'Province (Top 10)', value: 'province' },
			],
			quarter: "",
			quarterOption: [
				{ text: 'Q 1 [Jan-Mar]', value: 'q1' },
				{ text: 'Q 2 [Apr-Jun]', value: 'q2' },
				{ text: 'Q 3 [Jul-Sep]', value: 'q3' },
				{ text: 'Q 4 [Oct-Dec]', value: 'q4' },
			],
			year: "",
			yearOption: [
				{ text: '2020', value: '2020' },
			],
			barChart: "",
			barChartOption: [
				{ text: 'Customer Type', value: 'customerType' },
				{ text: 'Region', value: 'region' },
				{ text: 'Province (Top 5)', value: 'province' },
			],
			totalRows: 1,
			currentPage: 1,
			perPage: 10,
			pageOptions: [10, 25, 50, 100],
			sortBy: '',
			sortDesc: false,
			sortDirection: 'asc',
			filter: null,
			filterOn: [],
			reportTicket:[],
			returnsChartLoaded: false,
			appMounted: false,
		}),
		computed: {
			returnsChart () {
				return {
					data: {
						columns: [
							["Call", 120],
							["Email", 40],
							["Webform [App]", 30],
							["Webform [Web]", 56],
							["Create by agent", 18]
						],
						type: "pie"
					},
					transition: {
						duration: 0
					},
					legend: {
						position: 'right'
					},
					color: {
						pattern: scColors.multi
					}
				}
			},

		},
		mounted () {

		},
		methods: {

		},
	}
</script>

