<template>
	<li class="uk-visible@l">
		<a href="javascript:void(0)" ref="closePopup">
              <span v-if="getReminderTotal === 0" class="mdi mdi-bell uk-display-inline-block">
                <!-- <span v-show="getReminderTotal>" class="sc-indicator md-bg-color-red-600 "></span> -->
              </span>
			  <span v-else class="mdi mdi-bell md-color-red-700 uk-display-inline-block">
              </span>
		</a>
		<div class="uk-navbar-dropdown md-bg-grey-100 width" >
			<div class="uk-flex uk-flex-center">
				{{getReminderTotal}}   New App Notifications
			</div>
			<div class="sc-padding sc-padding-small-ends">
				<div class="uk-panel uk-panel-scrollable uk-height-medium" v-if="listReminder.length>0">
					<ul id="sc-header-alerts" class="uk-list uk-margin-remove">
						<li v-for="(alert, index) in listReminder"  :style="{'--index': index}"
							:class="{'uk-margin-small-top sc-border sc-round md-bg-white':  alert.status  === 'unread'}"
							style="cursor: pointer;"
							v-if="alert.status === 'unread'"
							@click="readReminder(alert)"
						>
							<div class="uk-flex uk-flex-middle">
								<div class="sc-list-addon" style="margin-right: 10px" >
									<i class="mdi mdi-alarm md-color-red-600 mdi-36px"></i>
								</div>
								<div class="uk-flex-1 uk-text-small" >
									<p style="margin-bottom: 0px">Ticket : {{ alert.ticketNo }} </p>
									<p style="margin-bottom: 0px">SLA Time : {{ convertUnixToTime(alert.slaTime) }} </p>
									<p style="margin-bottom: 0px">Created By : {{ alert.createdBy.name }} </p>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<a href="javascript:void(0)" @click="showOverSLA()" class="uk-flex uk-text-small sc-padding-small-ends sc-padding">
				Show all in SLA
			</a>
		</div>
	</li>
</template>

<script>
	import moment from "moment-timezone";
	export default {
		name: "reminder",

		data: () => ({
			listReminder:[],
			settings: { 
				maxScrollbarLength: 10,
				wheelSpeed: .10,
			},
		}),
		mounted(){
			this.getReminder()
		},
		computed:{
			getReminderTotal(){
				return this.$store.getters.getReminderTotal
			},
			eventReminderIncome() {
				return this.$store.getters.getLastReminderIncome
			},
		},
		methods: {
			convertUnixToTime(unixTime, format = 'DD/MM/YYYY HH:mm:ss') {
				const unix = unixTime / 1000
				return this.$moment.unix(unix).format(format)
			},
			getReminder() {
				const date = moment().format('YYYY-MM-DD')
				this.$reminderAdapter.getReminder(date).then(resp => {
					this.$store.dispatch('setListReminder', resp.data)
					this.getReminderList()
				})
			},
			getReminderList() {
				const dataMap = Object.values(this.$store.getters.ListReminder)
				this.listReminder = _.orderBy(dataMap, ['slaTime'], ['desc'])
			},
			readReminder(data){
				this.$reminderAdapter.readedReminder(data.id).then(resp => {
					this.getReminder()
					this.$refs.closePopup.click()
					this.$router.push(`/Ticket/View?ticketNo=${data.ticketNo}`)
				})
			},
			showOverSLA() {
				this.$router.push(`/Ticket/OverSLA`)
				this.$refs.closePopup.click()
			}
		},
		watch: {
			'eventReminderIncome'() {
				this.getReminderList()
			},
		}
	}
</script>

<style scoped>
	.bg-gray{
		background-color: #cccccc
	}
	.width {
		min-width: 350px;
	}
	.uk-list .ui li:hover {
		background-color: #a3a3a3;
	}
	.alarm-color {
		color: yellow;
	}
</style>
