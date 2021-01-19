<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-grid" data-uk-grid>
				<div class="uk-width-3-3@l">
					<ScCard>
						<ScCardTitle>
							TICKET DASHBOARD
						</ScCardTitle>
						<div class="sc-padding sc-padding-medium-ends md-bg-grey-100">
							<div class=" uk-flex-middle uk-grid-small uk-grid" data-uk-grid>
								<div class="uk-flex-1">
									<div class="uk-button-group sc-button-group-outline">
										<DateRangePicker>
											<ScInput id="formDate" v-model="form.datetime" placeholder="Pick a range..." style="width: 200px"></ScInput>
										</DateRangePicker>
									</div>
								</div>
								<div class="uk-width-1-6@l">
									<div class="uk-margin">
										<select class="uk-select" v-model="form.team">
											<option value="0">-Select Team-</option>
											<option
												v-for="option in optionsTeam"
												v-bind:value="option.id"
											>{{ option.name }}</option>
										</select>
									</div>
								</div>
							</div>
						</div>
						<div class="uk-child-width-1-2@l uk-child-width-1-2@m uk-grid" data-uk-grid>
							<div>
								<ScCard>
									<ScCardTitle>
										Ticket Status (All Channel)
									</ScCardTitle>
									<ScCardBody class="uk-child-width-1-1">
										<div class="canvas-con">
											<div class="uk-width-2-3">
												<BillboardChart
													:options="statusChart"
													class="sc-chart">
												</BillboardChart>
											</div>
											<div class="uk-width-1-3 legend-con" id="my-legend-status"></div>
										</div>
									</ScCardBody>
								</ScCard>
							</div>

							<div>
								<ScCard>
									<ScCardTitle>
										Channel Report
									</ScCardTitle>
									<ScCardBody class="uk-child-width-1-1">
										<div class="canvas-con">
											<div class="uk-width-2-3">
												<BillboardChart
													:options="channelChart"
													class="sc-chart">
													></BillboardChart>
											</div>
											<div class="uk-width-1-3 legend-con" id="my-legend-channel"></div>
										</div>
									</ScCardBody>
								</ScCard>
							</div>
						</div>
						<div class="uk-child-width-1-4@l uk-child-width-1-4@m uk-grid" data-uk-grid>
							<div>
								<ScCard>
									<ScCardTitle>
										Call (SLA)
									</ScCardTitle>
									<ScCardBody class="uk-child-width-1-1">
										<div class="canvas-con">
											<div class="uk-width-2-4">
												<BillboardChart
													:options="callChart"
													class="sc-chart">
												</BillboardChart>
											</div>
										</div>
										<div class="uk-width-1-4 legend-con2" id="my-legend-call"></div>
									</ScCardBody>
								</ScCard>
							</div>
							<div>
								<ScCard>
									<ScCardTitle>
										Email (SLA)
									</ScCardTitle>
									<ScCardBody class="uk-child-width-1-1">
										<div class="canvas-con">
											<div class="uk-width-2-4">
												<BillboardChart
													:options="emailChart"
													class="sc-chart">
												</BillboardChart>
											</div>
										</div>
										<div class="uk-width-1-4 legend-con2" id="my-legend-email"></div>
									</ScCardBody>
								</ScCard>
							</div>
							<div>
								<ScCard>
									<ScCardTitle>
										Agent (SLA)
									</ScCardTitle>
									<ScCardBody class="uk-child-width-1-1">
										<div class="canvas-con">
											<div class="uk-width-2-4">
												<BillboardChart
													:options="agentChart"
													class="sc-chart">
												</BillboardChart>
											</div>
										</div>
										<div class="uk-width-1-4 legend-con2" id="my-legend-agent"></div>
									</ScCardBody>
								</ScCard>
							</div>
							<div>
								<ScCard>
									<ScCardTitle>
										Webform (SLA)
									</ScCardTitle>
									<ScCardBody class="uk-child-width-1-1">
										<div class="canvas-con">
											<div class="uk-width-2-4">
												<BillboardChart
													:options="webformChart"
													class="sc-chart">
												</BillboardChart>
											</div>
										</div>
										<div class="uk-width-1-4 legend-con2" id="my-legend-webform"></div>
									</ScCardBody>
								</ScCard>
							</div>
						</div>
						<div class="uk-child-width-1-3@l uk-child-width-1-3@m uk-grid" data-uk-grid>
							<div>
								<ScCard>
									<ScCardTitle>
										Call (SLA)
									</ScCardTitle>
									<ScCardBody>
										<div data-uk-grid=""
											 class="uk-child-width-1-3@s uk-grid-divider uk-grid-small uk-grid">
											<div class="uk-text-center uk-first-column">
													  <span class="uk-text-medium md-color-blue-600">
														  All Cases
													  </span>
												<h4 class="uk-margin-mini-top">{{ this.data.call.total }}</h4>
											</div>
											<div class="uk-text-center uk-first-column">
											  <span class="sc-color-secondary uk-text-medium">
												  Close SLA
											  </span>
												<h4 class="uk-margin-mini-top">{{ this.data.call.closeSLA }}</h4>
											</div>
											<div class="uk-text-center">
											  <span class="sc-color-secondary uk-text-medium">
												  Over SLA
											  </span>
												<h4 class="uk-margin-mini-top">{{ this.data.call.overSLA }}</h4>
											</div>
										</div>
										<hr/>
										<div>
											<span class="sc-color-secondary uk-text-medium"></span>
											<div id="callBarShow"
												class="sc-progress uk-margin-small-top sc-progress-large sc-progress-group">
												<div id="callBar1" class="sc-progress-bar md-bg-light-green-600">
													{{ this.data.call.pcloseSLA }}% Close SLA
												</div>
												<div id="callBar2" class="sc-progress-bar md-bg-red-800">
													{{ this.data.call.poverSLA }}% Over SLA
												</div>
											</div>
											<div id="callBarHide"
												 class="sc-progress uk-margin-small-top sc-progress-large sc-progress-group">
												<div class="sc-progress-bar md-bg-gray-600" style="width:100%">
													0%
												</div>
											</div>
										</div>
									</ScCardBody>
								</ScCard>
								<br>
								<ScCard>
									<ScCardTitle>
										Call (Complain)
									</ScCardTitle>
									<ScCardBody>
										<div data-uk-grid=""
											 class="uk-child-width-1-2@s uk-grid-divider uk-grid-small uk-grid">
											<div class="uk-text-center uk-first-column">
													  <span class="uk-text-medium md-color-blue-600">
														  All Cases
													  </span>
												<h4 class="uk-margin-mini-top">{{ this.data.call.total }}</h4>
											</div>

											<div class="uk-text-center uk-first-column">
											  <span class="uk-text-medium md-color-red-600">
												  Complain
											  </span>
												<h4 class="uk-margin-mini-top">{{ this.data.complain.call.value }}</h4>
											</div>
										</div>
										<hr/>
										<div>
											<span class="sc-color-secondary uk-text-medium"></span>
											<div id="callComplainBarShow"
												 class="sc-progress uk-margin-small-top sc-progress-large sc-progress-group">
												<div id="callComplainBar1" class="sc-progress-bar md-bg-light-green-600">
													{{ (100-this.data.complain.call.percent).toFixed(1) }}%
												</div>
												<div id="callComplainBar2" class="sc-progress-bar md-bg-red-800">
													{{ this.data.complain.call.percent }}% Complain
												</div>
											</div>
											<div id="callComplainBarHide"
												 class="sc-progress uk-margin-small-top sc-progress-large sc-progress-group">
												<div class="sc-progress-bar md-bg-gray-600" style="width:100%">
													0%
												</div>
											</div>
										</div>
									</ScCardBody>
								</ScCard>
							</div>
							<div>
								<ScCard>
									<ScCardTitle>
										Email (SLA)
									</ScCardTitle>
									<ScCardBody>
										<div data-uk-grid=""
											 class="uk-child-width-1-3@s uk-grid-divider uk-grid-small uk-grid">
											<div class="uk-text-center uk-first-column">
											  <span class="uk-text-medium md-color-blue-600">
												  All Cases
											  </span>
												<h4 class="uk-margin-mini-top">{{ this.data.email.total }}</h4>
											</div>
											<div class="uk-text-center uk-first-column">
											  <span class="sc-color-secondary uk-text-medium">
												  Close SLA
											  </span>
												<h4 class="uk-margin-mini-top">{{ this.data.email.closeSLA }}</h4>
											</div>
											<div class="uk-text-center">
											  <span class="sc-color-secondary uk-text-medium">
												  Over SLA
											  </span>
												<h4 class="uk-margin-mini-top">{{ this.data.email.overSLA }}</h4>
											</div>
										</div>
										<hr/>
										<div>
											<span class="sc-color-secondary uk-text-medium"></span>
											<div id="emailBarShow"
												class="sc-progress uk-margin-small-top sc-progress-large sc-progress-group">
												<div id="emailBar1" class="sc-progress-bar md-bg-light-green-600">
													{{ this.data.email.pcloseSLA }}% Close SLA
												</div>
												<div id="emailBar2" class="sc-progress-bar md-bg-red-800">
													{{ this.data.email.poverSLA }}% Over SLA
												</div>
											</div>
											<div id="emailBarHide"
												 class="sc-progress uk-margin-small-top sc-progress-large sc-progress-group">
												<div class="sc-progress-bar md-bg-gray-600" style="width:100%">
													0%
												</div>
											</div>
										</div>
									</ScCardBody>
								</ScCard>
								<br>
								<ScCard>
									<ScCardTitle>
										E-mail (Complain)
									</ScCardTitle>
									<ScCardBody>
										<div data-uk-grid=""
											 class="uk-child-width-1-2@s uk-grid-divider uk-grid-small uk-grid">
											<div class="uk-text-center uk-first-column">
													  <span class="uk-text-medium md-color-blue-600">
														  All Cases
													  </span>
												<h4 class="uk-margin-mini-top">{{ this.data.email.total }}</h4>
											</div>

											<div class="uk-text-center uk-first-column">
											  <span class="uk-text-medium md-color-red-600">
												  Complain
											  </span>
												<h4 class="uk-margin-mini-top">{{ this.data.complain.email.value }}</h4>
											</div>
										</div>
										<hr/>
										<div>
											<span class="sc-color-secondary uk-text-medium"></span>
											<div id="emailComplainBarShow"
												 class="sc-progress uk-margin-small-top sc-progress-large sc-progress-group">
												<div id="emailComplainBar1" class="sc-progress-bar md-bg-light-green-600">
													{{ (100-this.data.complain.email.percent).toFixed(1) }}%
												</div>
												<div id="emailComplainBar2" class="sc-progress-bar md-bg-red-800">
													{{ this.data.complain.email.percent }}% Complain
												</div>
											</div>
											<div id="emailComplainBarHide"
												 class="sc-progress uk-margin-small-top sc-progress-large sc-progress-group">
												<div class="sc-progress-bar md-bg-gray-600" style="width:100%">
													0%
												</div>
											</div>
										</div>
									</ScCardBody>
								</ScCard>
							</div>
							<div>
								<ScCard>
									<ScCardTitle>
										Agent (SLA)
									</ScCardTitle>
									<ScCardBody>
										<div data-uk-grid=""
											 class="uk-child-width-1-3@s uk-grid-divider uk-grid-small uk-grid">
											<div class="uk-text-center uk-first-column">
											  <span class="uk-text-medium md-color-blue-600">
												  All Cases
											  </span>
												<h4 class="uk-margin-mini-top">{{ this.data.agent.total }}</h4>
											</div>
											<div class="uk-text-center uk-first-column">
											  <span class="sc-color-secondary uk-text-medium">
												  Close SLA
											  </span>
												<h4 class="uk-margin-mini-top">{{ this.data.agent.closeSLA }}</h4>
											</div>
											<div class="uk-text-center">
											  <span class="sc-color-secondary uk-text-medium">
												  Over SLA
											  </span>
												<h4 class="uk-margin-mini-top">{{ this.data.agent.overSLA }}</h4>
											</div>
										</div>
										<hr/>
										<div>
											<span class="sc-color-secondary uk-text-medium"></span>
											<div id="agentBarShow"
												 class="sc-progress uk-margin-small-top sc-progress-large sc-progress-group">
												<div id="agentBar1" class="sc-progress-bar md-bg-light-green-600">
													{{ this.data.agent.pcloseSLA }}% Close SLA
												</div>
												<div id="agentBar2" class="sc-progress-bar md-bg-red-800">
													{{ this.data.agent.poverSLA }}% Over SLA
												</div>
											</div>
											<div id="agentBarHide"
												 class="sc-progress uk-margin-small-top sc-progress-large sc-progress-group">
												<div class="sc-progress-bar md-bg-gray-600" style="width:100%">
													0%
												</div>
											</div>
										</div>
									</ScCardBody>
								</ScCard>
								<br>
								<ScCard>
									<ScCardTitle>
										Agent (Complain)
									</ScCardTitle>
									<ScCardBody>
										<div data-uk-grid=""
											 class="uk-child-width-1-2@s uk-grid-divider uk-grid-small uk-grid">
											<div class="uk-text-center uk-first-column">
													  <span class="uk-text-medium md-color-blue-600">
														  All Cases
													  </span>
												<h4 class="uk-margin-mini-top">{{ this.data.agent.total }}</h4>
											</div>

											<div class="uk-text-center uk-first-column">
											  <span class="uk-text-medium md-color-red-600">
												  Complain
											  </span>
												<h4 class="uk-margin-mini-top">{{ this.data.complain.agent.value }}</h4>
											</div>
										</div>
										<hr/>
										<div>
											<span class="sc-color-secondary uk-text-medium"></span>
											<div id="agentComplainBarShow"
												 class="sc-progress uk-margin-small-top sc-progress-large sc-progress-group">
												<div id="agentComplainBar1" class="sc-progress-bar md-bg-light-green-600">
													{{ (100-this.data.complain.agent.percent).toFixed(1) }}%
												</div>
												<div id="agentComplainBar2" class="sc-progress-bar md-bg-red-800">
													{{ this.data.complain.email.agent }}% Complain
												</div>
											</div>
											<div id="agentComplainBarHide"
												 class="sc-progress uk-margin-small-top sc-progress-large sc-progress-group">
												<div class="sc-progress-bar md-bg-gray-600" style="width:100%">
													0%
												</div>
											</div>
										</div>
									</ScCardBody>
								</ScCard>
							</div>
							<div>
								<ScCard>
									<ScCardTitle>
										App (SLA)
									</ScCardTitle>
									<ScCardBody>
										<div data-uk-grid=""
											 class="uk-child-width-1-3@s uk-grid-divider uk-grid-small uk-grid">
											<div class="uk-text-center uk-first-column">
											  <span class="uk-text-medium md-color-blue-600">
												  All Cases
											  </span>
												<h4 class="uk-margin-mini-top">{{ this.data.webform.app.total }}</h4>
											</div>
											<div class="uk-text-center uk-first-column">
											  <span class="sc-color-secondary uk-text-medium">
												  Close SLA
											  </span>
												<h4 class="uk-margin-mini-top">{{ this.data.webform.app.closeSLA }}</h4>
											</div>
											<div class="uk-text-center">
											  <span class="sc-color-secondary uk-text-medium">
												  Over SLA
											  </span>
												<h4 class="uk-margin-mini-top">{{ this.data.webform.app.overSLA }}</h4>
											</div>
										</div>
										<hr/>
										<div>
											<div id="appBarShow"
												 class="sc-progress uk-margin-small-top sc-progress-large sc-progress-group">
												<div id="appBar1" class="sc-progress-bar md-bg-light-green-600">
													{{ this.data.webform.app.pcloseSLA }}% Close SLA
												</div>
												<div id="appBar2" class="sc-progress-bar md-bg-red-800">
													{{ this.data.webform.app.poverSLA }}% Over SLA
												</div>
											</div>
											<div id="appBarHide"
												 class="sc-progress uk-margin-small-top sc-progress-large sc-progress-group">
												<div class="sc-progress-bar md-bg-gray-600" style="width:100%">
													0%
												</div>
											</div>
										</div>
									</ScCardBody>
									<ScCardTitle>
										App (Complain)
									</ScCardTitle>
									<ScCardBody>
										<div data-uk-grid=""
											 class="uk-child-width-1-2@s uk-grid-divider uk-grid-small uk-grid">
											<div class="uk-text-center uk-first-column">
											  <span class="uk-text-medium md-color-blue-600">
												  All Cases
											  </span>
												<h4 class="uk-margin-mini-top">{{ this.data.webform.app.total }}</h4>
											</div>
											<div class="uk-text-center">
											  <span class="uk-text-medium md-color-red-600">
												  Complain
											  </span>
												<h4 class="uk-margin-mini-top">{{ this.data.complain.app.value }}</h4>
											</div>
										</div>
										<hr/>
										<div>
											<div id="appComplainBarShow"
												 class="sc-progress uk-margin-small-top sc-progress-large sc-progress-group">
												<div id="appComplainBar1" class="sc-progress-bar md-bg-light-green-600">
													{{ (100-this.data.complain.app.percent).toFixed(1) }}%
												</div>
												<div id="appComplainBar2" class="sc-progress-bar md-bg-red-800">
													{{ this.data.complain.app.percent }}% Complain
												</div>
											</div>
											<div id="appComplainBarHide"
												 class="sc-progress uk-margin-small-top sc-progress-large sc-progress-group">
												<div class="sc-progress-bar md-bg-gray-600" style="width:100%">
													0%
												</div>
											</div>
										</div>
									</ScCardBody>

								</ScCard>
							</div>
							<div>
								<ScCard>
									<ScCardTitle>
										Website (SLA)
									</ScCardTitle>
									<ScCardBody>
										<div data-uk-grid=""
											 class="uk-child-width-1-3@s uk-grid-divider uk-grid-small uk-grid">
											<div class="uk-text-center uk-first-column">
												<span class="uk-text-medium md-color-blue-600">All Cases</span>
												<h4 class="uk-margin-mini-top">{{ this.data.webform.web.total }}</h4>
											</div>
											<div class="uk-text-center uk-first-column">
												<span class="sc-color-secondary uk-text-medium">Close SLA</span>
												<h4 class="uk-margin-mini-top">{{ this.data.webform.web.closeSLA }}</h4>
											</div>
											<div class="uk-text-center">
												<span class="sc-color-secondary uk-text-medium">Over SLA</span>
												<h4 class="uk-margin-mini-top">{{ this.data.webform.web.overSLA }}</h4>
											</div>
										</div>
										<hr/>
										<div>
											<div id="webBarShow"
												 class="sc-progress uk-margin-small-top sc-progress-large sc-progress-group">
												<div id="webBar1" class="sc-progress-bar md-bg-light-green-600">
													{{ this.data.webform.web.pcloseSLA }}% Close SLA
												</div>
												<div id="webBar2" class="sc-progress-bar md-bg-red-800">
													{{ this.data.webform.web.poverSLA }}% Over SLA
												</div>
											</div>
											<div id="webBarHide"
												 class="sc-progress uk-margin-small-top sc-progress-large sc-progress-group">
												<div class="sc-progress-bar md-bg-gray-600" style="width:100%">
													0%
												</div>
											</div>
										</div>
									</ScCardBody>
									<ScCardTitle>
										Website (Complain)
									</ScCardTitle>
									<ScCardBody>
										<div data-uk-grid=""
											 class="uk-child-width-1-2@s uk-grid-divider uk-grid-small uk-grid">
											<div class="uk-text-center uk-first-column">
												<span class="uk-text-medium md-color-blue-600">All</span>
												<h4 class="uk-margin-mini-top">{{ this.data.webform.web.total }}</h4>
											</div>
											<div class="uk-text-center">
												<span class="uk-text-medium md-color-red-600">Complain</span>
												<h4 class="uk-margin-mini-top">{{ this.data.complain.web.value }}</h4>
											</div>
										</div>
										<hr/>
										<div>
											<div id="webComplainBarShow"
												 class="sc-progress uk-margin-small-top sc-progress-large sc-progress-group">
												<div id="webComplainBar1" class="sc-progress-bar md-bg-light-green-600">
													{{ (100-this.data.complain.web.percent).toFixed(1) }}%
												</div>
												<div id="webComplainBar2" class="sc-progress-bar md-bg-red-800">
													{{ this.data.complain.web.percent }}% Complain
												</div>
											</div>
											<div id="webComplainBarHide"
												 class="sc-progress uk-margin-small-top sc-progress-large sc-progress-group">
												<div class="sc-progress-bar md-bg-gray-600" style="width:100%">
													0%
												</div>
											</div>
										</div>
									</ScCardBody>
								</ScCard>
							</div>
						</div>
					</ScCard>
				</div>
			</div>
		</div>
		<br>
	</div>
</template>

<script>

	import { scColors } from '~/assets/js/utils';
	import * as d3 from 'd3';
	import moment from 'moment'
	import ScInput from '~/components/Input'
	import DateRangePicker from '~/components/DateRangePicker'
	import { ScProgressLinear, ScProgressBar, ScProgressLabel } from '~/components/progress'

	export default {
		components: {
			BillboardChart: process.client ? () => import('~/components/billboard-charts') : null,
			DateRangePicker,
			ScInput,
			ScProgressLinear,
			ScProgressBar,
			ScProgressLabel,
			moment
		},
		data: () => ({
			doughnutChart: {
				options: {
					responsive: true,
					maintainAspectRatio: false,
					legend: false,
					legendCallback: [],
					animation: {
						animateScale: true,
						animateRotate: true
					},
				}
			},
			data: {
				status: {
					label: [],
					bgColor: [],
					value: [],
					data: [],
					total: 0,
				},
				channel: {
					label: [],
					bgColor: [],
					value: [],
					data: [],
					total: 0,
				},
				call: {
					label: [],
					bgColor: [],
					value: [],
					data: [],
					closeSLA: 0,
					overSLA: 0,
					pcloseSLA: 0,
					poverSLA: 0,
					total: 0,
				},
				email: {
					label: [],
					bgColor: [],
					value: [],
					data: [],
					closeSLA: 0,
					overSLA: 0,
					pcloseSLA: 0,
					poverSLA: 0,
					total: 0,
				},
				webform: {
					label: [],
					bgColor: [],
					value: [],
					data: [],
					total: 0,
					app: {
						closeSLA: 0,
						overSLA: 0,
						pcloseSLA: 0,
						poverSLA: 0,
						total: 0,
					},
					web: {
						closeSLA: 0,
						overSLA: 0,
						pcloseSLA: 0,
						poverSLA: 0,
						total: 0,
					},
				},
				agent: {
					label: [],
					bgColor: [],
					value: [],
					data: [],
					closeSLA: 0,
					overSLA: 0,
					pcloseSLA: 0,
					poverSLA: 0,
					total: 0,
				},
				complain: {
					total: 0,
					call: { value: 0 ,percent: 0, },
					email: { value: 0 ,percent: 0, },
					app: { value: 0 ,percent: 0, },
					web: { value: 0 ,percent: 0, },
					agent: { value: 0 ,percent: 0, },
				}
			},
			form:{
				datetime: '',
				team: 0,
			},
			optionsTeam: [],
		}),
		computed: {
			statusChart () {
				return {
					data: {
						columns: this.data.status.data,
						type: "donut"
					},
					transition: {
						duration: 0
					},
					responsive: true,
					maintainAspectRatio: false,
					legend: {
						hide: true
					},
					color: {
						pattern: scColors.multi
					}
				}
			},
			channelChart () {
				return {
					data: {
						columns: this.data.channel.data,
						type: "donut"
					},
					transition: {
						duration: 0
					},
					legend: {
						hide: true
					},
					color: {
						pattern: scColors.multi
					}
				}
			},
			callChart () {
				return {
					data: {
						columns: this.data.call.data,
						type: "donut"
					},
					transition: {
						duration: 0
					},
					responsive: true,
					maintainAspectRatio: false,
					legend: {
						hide: true
					},
					color: {
						data: scColors.multi[1]
					}
				}
			},
			emailChart () {
				return {
					data: {
						columns: this.data.email.data,
						type: "donut"
					},
					transition: {
						duration: 0
					},
					responsive: true,
					maintainAspectRatio: false,
					legend: {
						hide: true
					},
					color: {
						data: scColors.multi[1]
					}
				}
			},
			webformChart () {
				return {
					data: {
						columns: this.data.webform.data,
						type: "donut"
					},
					transition: {
						duration: 0
					},
					responsive: true,
					maintainAspectRatio: false,
					legend: {
						hide: true
					},
					color: {
						data: scColors.multi[1]
					}
				}
			},
			agentChart () {
				return {
					data: {
						columns: this.data.agent.data,
						type: "donut"
					},
					transition: {
						duration: 0
					},
					responsive: true,
					maintainAspectRatio: false,
					legend: {
						hide: true
					},
					color: {
						data: scColors.multi[1]
					}
				}
			},
		},
		mounted () {
			this.form.datetime = this.$moment().format('YYYY-MM-')+'01'+'~'+this.$moment().endOf('month').format('YYYY-MM-DD')
			this.getTeamLogin()
			this.$dashboardService.getTeam()
				.then(resp => {
					this.optionsTeam = resp
				})
			this.getDashboard()
		},
		destroyed() {
			clearInterval(this.intervalDashboard)
		},
		methods: {
			getTeamLogin() {
				// this.keyword.team = this.$store.getters.getUserLogin.department
			},
			getDashboard() {
				this.intervalDashboard = setInterval(() => {
					this.$dashboardService.getDashboard($('#formDate').val(),this.form.team).then(resp => {
						this.data.status.data = resp.status
						this.data.channel.data = resp.channel
						this.data.call.data = resp.call
						this.data.email.data = resp.email
						this.data.webform.data = resp.webform
						this.data.agent.data = resp.agent
						this.data.complain = resp.complain
						this.statusData(),
						this.channelData(),
						this.callData(),
						this.emailData(),
						this.webformData(),
							this.agentData(),
						this.complainData()
					})
				}, 5000)
			},
			statusData()
			{
				let index = 0
				let total = 0
				this.data.status.label = []
				this.data.status.bgColor = []
				this.data.status.value = []
				this.data.status.data.forEach(element => {
					this.data.status.label.push(element[0])
					this.data.status.bgColor.push(scColors.multi[index])
					this.data.status.value.push(element[1])
					index = index + 1
					total = total + element[1]
				})
				this.data.status.total = total

				let config = _.cloneDeep(this.doughnutChart.options)
				config.legendCallback = this.addlegends(this.data.status.value, this.data.status)
				$('#my-legend-status').html(config.legendCallback)
			},
			channelData()
			{
				let index = 0
				let total = 0
				this.data.channel.label = []
				this.data.channel.bgColor = []
				this.data.channel.value = []
				this.data.channel.data.forEach(element => {
					this.data.channel.label.push(element[0])
					this.data.channel.bgColor.push(scColors.multi[index])
					this.data.channel.value.push(element[1])
					index = index + 1
					total = total + element[1]
				})
				this.data.channel.total = total

				let config = _.cloneDeep(this.doughnutChart.options)
				config.legendCallback = this.addlegends(this.data.channel.value, this.data.channel)
				$('#my-legend-channel').html(config.legendCallback)
			},
			callData()
			{
				let index = 0
				let total = 0
				this.data.call.label = []
				this.data.call.bgColor = []
				this.data.call.value = []
				this.data.call.data.forEach(element => {
					this.data.call.label.push(element[0])
					this.data.call.bgColor.push(scColors.multi[index])
					this.data.call.value.push(element[1])
					index = index + 1
					total = total + element[1]
				})
				this.data.call.closeSLA = this.data.call.data[0][1]
				this.data.call.overSLA = this.data.call.data[1][1]
				this.data.call.total = total
				if (this.data.call.total > 0)
				{
					this.data.call.pcloseSLA = ((this.data.call.closeSLA*100) / this.data.call.total).toFixed(1)
					this.data.call.poverSLA = (100 - this.data.call.pcloseSLA).toFixed(1)
				}
				else
				{
					this.data.call.pcloseSLA = 0
					this.data.call.poverSLA = 0
				}
				this.setProgressBar('call',this.data.call.pcloseSLA,this.data.call.poverSLA)

				let config = _.cloneDeep(this.doughnutChart.options)
				config.legendCallback = this.addlegends2(this.data.call.value, this.data.call)
				$('#my-legend-call').html(config.legendCallback)
			},
			emailData()
			{
				let index = 0
				let total = 0
				this.data.email.label = []
				this.data.email.bgColor = []
				this.data.email.value = []
				this.data.email.data.forEach(element => {
					this.data.email.label.push(element[0])
					this.data.email.bgColor.push(scColors.multi[index])
					this.data.email.value.push(element[1])
					index = index + 1
					total = total + element[1]
				})
				this.data.email.closeSLA = this.data.email.data[0][1]
				this.data.email.overSLA = this.data.email.data[1][1]
				this.data.email.total = total
				if (this.data.email.total > 0)
				{
					this.data.email.pcloseSLA = ((this.data.email.closeSLA*100) / this.data.email.total).toFixed(1)
					this.data.email.poverSLA = (100 - this.data.email.pcloseSLA).toFixed(1)
				}
				else
				{
					this.data.email.pcloseSLA = 0
					this.data.email.poverSLA = 0
				}
				this.setProgressBar('email',this.data.email.pcloseSLA,this.data.email.poverSLA)

				let config = _.cloneDeep(this.doughnutChart.options)
				config.legendCallback = this.addlegends2(this.data.email.value, this.data.email)
				$('#my-legend-email').html(config.legendCallback)
			},
			webformData()
			{
				let index = 0
				let total = 0
				this.data.webform.label = []
				this.data.webform.bgColor = []
				this.data.webform.value = []
				this.data.webform.data.forEach(element => {
					this.data.webform.label.push(element[0])
					this.data.webform.bgColor.push(scColors.multi[index])
					this.data.webform.value.push(element[1])
					index = index + 1
					total = total + element[1]
				})
				this.data.webform.total = total

				this.data.webform.app.closeSLA = this.data.webform.data[0][1]
				this.data.webform.app.overSLA = this.data.webform.data[2][1]
				this.data.webform.app.total = this.data.webform.data[0][1] + this.data.webform.data[2][1]
				if (this.data.webform.app.total > 0)
				{
					this.data.webform.app.pcloseSLA = ((this.data.webform.app.closeSLA*100) / this.data.webform.app.total).toFixed(1)
					this.data.webform.app.poverSLA = (100 - this.data.webform.app.pcloseSLA).toFixed(1)
				}
				else
				{
					this.data.webform.app.pcloseSLA = 0
					this.data.webform.app.poverSLA = 0
				}
				this.setProgressBar('app',this.data.webform.app.pcloseSLA,this.data.webform.app.poverSLA)

				this.data.webform.web.closeSLA = this.data.webform.data[1][1]
				this.data.webform.web.overSLA = this.data.webform.data[3][1]
				this.data.webform.web.total = this.data.webform.data[1][1] + this.data.webform.data[3][1]
				if (this.data.webform.web.total > 0)
				{
					this.data.webform.web.pcloseSLA = ((this.data.webform.web.closeSLA*100) / this.data.webform.web.total).toFixed(1)
					this.data.webform.web.poverSLA = (100 - this.data.webform.web.pcloseSLA).toFixed(1)
				}
				else
				{
					this.data.webform.web.pcloseSLA = 0
					this.data.webform.web.poverSLA = 0
				}
				this.setProgressBar('web',this.data.webform.web.pcloseSLA,this.data.webform.web.poverSLA)

				let config = _.cloneDeep(this.doughnutChart.options)
				config.legendCallback = this.addlegends2(this.data.webform.value, this.data.webform)
				$('#my-legend-webform').html(config.legendCallback)
			},
			agentData()
			{
				let index = 0
				let total = 0
				this.data.agent.label = []
				this.data.agent.bgColor = []
				this.data.agent.value = []
				this.data.agent.data.forEach(element => {
					this.data.agent.label.push(element[0])
					this.data.agent.bgColor.push(scColors.multi[index])
					this.data.agent.value.push(element[1])
					index = index + 1
					total = total + element[1]
				})
				this.data.agent.closeSLA = this.data.agent.data[0][1]
				this.data.agent.overSLA = this.data.agent.data[1][1]
				this.data.agent.total = total
				if (this.data.agent.total > 0)
				{
					this.data.agent.pcloseSLA = ((this.data.agent.closeSLA*100) / this.data.agent.total).toFixed(1)
					this.data.agent.poverSLA = (100 - this.data.agent.pcloseSLA).toFixed(1)
				}
				else
				{
					this.data.agent.pcloseSLA = 0
					this.data.agent.poverSLA = 0
				}
				this.setProgressBar('agent',this.data.agent.pcloseSLA,this.data.agent.poverSLA)

				let config = _.cloneDeep(this.doughnutChart.options)
				config.legendCallback = this.addlegends2(this.data.agent.value, this.data.agent)
				$('#my-legend-agent').html(config.legendCallback)
			},
			complainData()
			{
				if (this.data.call.total > 0)
				{
					this.data.complain.call.percent = (this.data.complain.call.value*100 / this.data.call.total).toFixed(1)
					this.setProgressBar('callComplain',(100-this.data.complain.call.percent).toFixed(1),this.data.complain.call.percent)
				}
				else
				{
					this.data.complain.call.percent = 0
					this.setProgressBar('callComplain',0,0)
				}

				if (this.data.email.total > 0)
				{
					this.data.complain.email.percent = (this.data.complain.email.value*100 / this.data.email.total).toFixed(1)
					this.setProgressBar('emailComplain',(100-this.data.complain.email.percent).toFixed(1),this.data.complain.email.percent)
				}
				else
				{
					this.data.complain.email.percent = 0
					this.setProgressBar('emailComplain',0,0)
				}

				if (this.data.webform.app.total > 0)
				{
					this.data.complain.app.percent = (this.data.complain.app.value*100 / this.data.webform.app.total).toFixed(1)
					this.setProgressBar('appComplain',(100-this.data.complain.app.percent).toFixed(1),this.data.complain.app.percent)
				}
				else
				{
					this.data.complain.app.percent = 0
					this.setProgressBar('appComplain',0,0)
				}

				if (this.data.webform.web.total > 0)
				{
					this.data.complain.web.percent = (this.data.complain.web.value*100 / this.data.webform.web.total).toFixed(1)
					this.setProgressBar('webComplain',(100-this.data.complain.web.percent).toFixed(1),this.data.complain.web.percent)
				}
				else
				{
					this.data.complain.web.percent = 0
					this.setProgressBar('webComplain',0,0)
				}

				if (this.data.agent.total > 0)
				{
					this.data.complain.agent.percent = (this.data.complain.agent.value*100 / this.data.agent.total).toFixed(1)
					this.setProgressBar('agentComplain',(100-this.data.complain.agent.percent).toFixed(1),this.data.complain.agent.percent)
				}
				else
				{
					this.data.complain.agent.percent = 0
					this.setProgressBar('agentComplain',0,0)
				}
			},
			addlegends(data, config) {
				let legendHtml = []
				let total = _.sum(data)

				legendHtml.push('<ul>')
				let label = config.label
				let colors = config.bgColor
				for (let i = 0; i < label.length; i++) {
					// let percentage = (data[i] / total)*100
					legendHtml.push('<li>');
					// add background color of each data
					legendHtml.push('<span class="chart-legend" style="background-color:' + colors[i] + '"></span>')
					// add label after color plate
					legendHtml.push('<span class="chart-legend-label-text">' + label[i] + ': ' + data[i] + '</span>')
					legendHtml.push('</li>')
				}
				legendHtml.push('</ul>')
				return legendHtml.join('')
			},
			addlegends2(data, config) {
				let legendHtml = []
				let total = _.sum(data)

				legendHtml.push('<ul>')
				let label = config.label
				let colors = config.bgColor
				let row = 0
				for (let i = 0; i < label.length; i++) {
					row = row + 1
					// let percentage = (data[i] / total)*100
					legendHtml.push('<li>')
					// add background color of each data
					legendHtml.push('<span class="chart-legend" style="background-color:' + colors[i] + '"></span>')
					// add label after color plate
					legendHtml.push('<span class="chart-legend-label-text">' + label[i] + ': ' + data[i] + '</span>')
					legendHtml.push('</li>')
					if (row == 2)
					{
						legendHtml.push('<br />')
						row = 0
					}
				}
				legendHtml.push('</ul>')
				return legendHtml.join('')
			},
			setProgressBar(prefixElement ,pvalue1 ,pvalue2) {
				if ((pvalue1 <= 0) && (pvalue2 <= 0))
				{
					$('#'+prefixElement+'BarHide').show()
					$('#'+prefixElement+'BarShow').hide()
				}
				else
				{
					$('#'+prefixElement+'BarHide').hide()
					$('#'+prefixElement+'BarShow').show()
				}

				if (pvalue1 <= 0)
				{
					$('#'+prefixElement+'Bar1').hide()
				}
				else
				{
					$('#'+prefixElement+'Bar1').width(pvalue1 + '%')
					$('#'+prefixElement+'Bar1').show()
				}

				if (pvalue2 <= 0)
				{
					$('#'+prefixElement+'Bar2').hide()
				}
				else
				{
					$('#'+prefixElement+'Bar2').width(pvalue2 + '%')
					$('#'+prefixElement+'Bar2').show()
				}
			}

		}
	}
</script>
<style lang="scss">
	.canvas-con {
		display: inline-flex;
		align-items:center;
		justify-content: center;
		/*margin: auto;*/
		position: relative;
		/*height: 100%;*/
	}
	.canvas-con-inner, .legend-con {
		display: inline-block;
	}

	.legend-con {
		display: inline;
		ul {
			list-style: none;
		}
		li {
			display: flex;
			align-items: center;
			margin-bottom: 2px;
			font-size: 13px;

			span {
				display: inline-block;
			}

			span.chart-legend {
				width: 15px;
				height: 15px;
				margin-right: 5px;
			}
		}
	}

	.legend-con2 {
		display: inline;
		ul {
			list-style: none;
		}
		li {
			display: inline;
			align-items: center;
			margin-bottom: 2px;
			font-size: 13px;
			margin-left: 5px;

			span {
				display: inline-block;
			}

			span.chart-legend {
				width: 15px;
				height: 15px;
				margin-right: 5px;
			}
		}
	}
</style>
