<template>
	<div id="sc-page-wrapper">
		<no-ssr>
			<div id="sc-page-top-bar" class="sc-top-bar">
				<div class="sc-top-bar-content uk-flex uk-flex-1">
					<h1 class="sc-top-bar-title uk-text-uppercase uk-flex-1">
						Ticket
					</h1>
				</div>
			</div>
		</no-ssr>
		<div id="sc-page-content">
			<ScTransition group stagger
						  :speed="20"
						  origin="50% 50%"
						  class="uk-child-width-1-4@xl uk-child-width-1-3@l uk-child-width-1-2@s uk-grid uk-grid-match "
						  data-uk-grid
			>

				<div v-for="item in Dashboard" :key="item.id"
					 @click="searchTicketByStatus(item.id),set_active_id(item.id)" style="cursor: pointer">
					<ScCard class="sc-widget uk-flex" :class="{'md-bg-blue-100':item.class}">
						<div class="uk-width-1-4  uk-flex-middle uk-flex uk-flex-center" :class="item.color">
							<i class="mdi sc-icon-48 md-color-white" :class="item.icon"></i>
						</div>
						<div class="uk-flex-1">
							<ScCardBody>
								<ScCardMeta class="uk-margin-remove">
									{{item.text}}
								</ScCardMeta>
								<ScCardTitle class="uk-text-xlarge">
									{{item.value.all ? item.value.all : 0}}
								</ScCardTitle>
							</ScCardBody>
						</div>
						<div class="uk-text-medium uk-margin-medium-top uk-margin-medium-right">
							<template>
								<div class="uk-margin-mini uk-text-right">
									<span class="">Call</span>
									<span class=""> : </span>
									<span class="">{{item.value.call ? item.value.call : 0 }}</span>
								</div>
								<div class="uk-margin-mini uk-text-right">
									<span class="">Email</span>
									<span class=""> : </span>
									<span class="">{{item.value.email ? item.value.email : 0 }}</span>
								</div>
								<div class="uk-margin-mini uk-text-right">
									<span class="">Agent</span>
									<span class=""> : </span>
									<span class="">{{item.value.agent ? item.value.agent : 0}}</span>
								</div>
								<div class="uk-margin-mini uk-text-right">
									<span class="">Web (A/W)</span>
									<span class=""> : </span>
									<span class="">{{item.value.app ? item.value.app : 0}}/{{item.value.web ? item.value.web : 0}}</span>
								</div>
							</template>
						</div>
					</ScCard>
				</div>
			</ScTransition>
			<div class="uk-grid" data-uk-grid>
				<div class="uk-width-1-1@l">
					<ScCard class="uk-margin-top">
						<ScCardHeader separator>
							<div class="uk-flex-middle uk-grid-small uk-grid" data-uk-grid>

								<div class="uk-flex-1">
									<ScCardTitle>
										<div>
											<nuxt-link :to="{path: '/Ticket/Create'}"
													   class="sc-button sc-button-primary sc-button-social">
												<span>Add</span><i class="mdi mdi-plus-box"></i>
											</nuxt-link>
										</div>
									</ScCardTitle>
								</div>

								<div class="uk-width-1-6@l">
									<div class="uk-margin">
										<ScInput v-model="keyword.datetime" v-flatpickr="dtConfig" @close="searchTicket"
												 placeholder="Pick a date range..."></ScInput>
									</div>
								</div>
								<div class="uk-width-1-6@l">
									<div class="uk-margin">
										<select v-model="keyword.status" data-sc-input class="uk-select">
											<option value="">
												- Select status -
											</option>
											<option v-for="option in ticketStatusList" v-bind:value="option.value">
												{{ option.text }}
											</option>
										</select>
									</div>
								</div>
								<div class="uk-width-1-6@l">
									<div class="uk-margin">
										<select v-model="keyword.customerType" data-sc-input class="uk-select">
											<option value="">
												- Select customer type -
											</option>
											<option v-for="option in customerTypeList" v-bind:value="option.id">
												{{ option.name }}
											</option>
										</select>
									</div>
								</div>
								<div class="uk-width-1-6@l">
									<div class="uk-margin">
										<select v-model="keyword.application" data-sc-input class="uk-select">
											<option value="">
												- Select application -
											</option>
											<option v-for="option in applicationList" v-bind:value="option.id">
												{{ option.name }}
											</option>
										</select>
									</div>
								</div>
								<div class="uk-width-1-6@l">
									<div class="uk-margin">
										<select v-model="keyword.agent" data-sc-input class="uk-select">
											<option value="">
												- Select agent -
											</option>
											<option v-for="option in agentList" v-bind:value="option.id">
												{{ option.name }}
											</option>
										</select>
									</div>
								</div>
							</div>

							<div class="uk-width-auto@s mt-4" align="right">
								<div class="uk-button-group">
									<a href="javascript:void(0)"
									   class="sc-button sc-button-danger sc-button-social"
									   @click="resetForm()">
										<span>RESET</span><i class="mdi mdi-lock-reset"></i>
									</a>
								</div>
								<div class="uk-button-group">
									<a href="javascript:void(0)" class="sc-button sc-button-primary sc-button-social"
									   @click="searchTicket()">
										<span>Search</span>
										<i class="mdi mdi-magnify"></i>
									</a>
								</div>
								<div class="uk-button-group">
									<a href="javascript:void(0)" class="sc-button sc-button-success sc-button-social">
										<span>Export</span><i class="mdi mdi-file-export"></i>
									</a>
									<div class="uk-inline">

										<button class="sc-button sc-button-success sc-button-social sc-button-icon">
											<i class="mdi mdi-chevron-down"></i>
										</button>
										<div
											data-uk-dropdown="mode: click; boundary: ! .uk-button-group; boundary-align: true;">
											<ul class="uk-nav uk-dropdown-nav">
												<li>
													<a href="javascript:void(0)" @click="ExportTicketView()">
														Export View
													</a>
												</li>
												<li>
													<a href="javascript:void(0)" @click="ExportTicketAll()">
														Export All
													</a>
												</li>
												<!-- <li v-if="userStore.name ==='UCCONNECT' && mapData(userStore.roles) === 'Admin'">
													<a href="javascript:void(0)" @click="ExportTicketAdmin()">
														Export Admin
													</a>
												</li> -->
											</ul>
										</div>
									</div>
								</div>
							</div>
						</ScCardHeader>
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
							<div class="uk-width-1-6@s uk-align-right uk-margin-bottom">
								<input v-model="keyword.keyword"  @change="searchTicket()" class="uk-input uk-form-small" type="text" placeholder="Enter Search">
							</div>
							<div class="uk-margin-top">
								<b-table
									small
									:items="ticketList"
									:fields="fields"
									:current-page="currentPage"
									:per-page="perPage"
									responsive
									striped
									hover
								>
									<template v-slot:cell(No)="row">
										{{ GetIndexRow(currentPage, perPage, row.index) }}
									</template>
									<template v-slot:cell(ticketNo)="row">
										<a style="color: #0e76a8" @click="viewTickets(row.item.ticketNo,'edit')">{{
											row.item.ticketNo ? row.item.ticketNo : '-' }}</a>
									</template>
									<template v-slot:cell(sla)="row">
										{{ row.item.sla ? row.item.sla : '-'}}
									</template>
									<template v-slot:cell(status)="row">
										{{ row.item.status ? row.item.status : '-' }}
									</template>
									<template v-slot:cell(overSLA)="row">
										<strong class="uk-text-danger">
											{{ row.item.overSLA ? row.item.overSLA : '-' }}
										</strong>
									</template>
									<template v-slot:cell(assignTo)="row">
										{{ row.item.assignTo ? row.item.assignTo : '-' }}
									</template>
									<template v-slot:cell(customerCompany)="row">
										{{ row.item.customerCompany ? truncate(row.item.customerCompany) : '-' }}
									</template>
									<template v-slot:cell(customerType)="row">
										{{ row.item.customerType.name ? row.item.customerType.name : '-' }}
									</template>
									<template v-slot:cell(appName)="row">
										{{ row.item.appName.name ? row.item.appName.name : '-' }}
									</template>
									<template v-slot:cell(subject)="row">
										{{ row.item.subject.name ? truncate(row.item.subject.name) : '-' }}
									</template>
									<template v-slot:cell(continueTo)="row">
										{{ row.item.continueTo.name ? row.item.continueTo.name : '-' }}
									</template>
									<template v-slot:cell(updatedAt)="row">
										{{ row.item.status === 'close' ? row.item.updatedAt : '-' }}
									</template>
									<template v-slot:cell(Action)="row">
										<div class="uk-grid-medium uk-flex-middle uk-grid" data-uk-grid>
											<div class="uk-margin-mini-right">
												<button class="sc-button sc-button-small md-bg-green-400"
														@click="viewTickets(row.item.ticketNo,'edit')">
													<i class="mdi mdi-pencil md-color-white sc-icon-18"></i>
												</button>
											</div>
											<div class="uk-margin-remove uk-padding-remove-left">
												<button @click="viewTickets(row.item.ticketNo,'view')"
														class="sc-button sc-button-small md-bg-cyan-600">
													<i class="mdi mdi-eye md-color-white sc-icon-18"></i>
												</button>
											</div>
										</div>
									</template>
								</b-table>
								<div id="noticket" class="sc-top-bar-content uk-flex uk-flex-1 uk-flex-center">
									<em><h5 class="sc-top-bar-title text-secondary uk-flex-1">
										<br />Please search ticket by filter
									</h5></em>
								</div>
								<b-pagination
									v-model="currentPage"
									:total-rows="totalRows"
									:per-page="perPage"
									size="sm"
									class="uk-pagination-right uk-flex-right"
								></b-pagination>
							</div>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

    import ScInput from '~/components/Input'
    import DateRangePicker from '~/components/DateRangePicker'
    import moment from 'moment-timezone'

    if (process.client) {
        require('~/plugins/flatpickr');
    }
    export default {
        components: {
            ScInput,
            DateRangePicker,
            moment,
        },
        data: () => ({
            showWidgets: false,
            countStatus: {},
            countToday: {},
            previous_active_id: 'today',
            Dashboard: [
                {
                    id: 'open',
                    text: 'OPEN CASE',
                    color: 'md-bg-cyan-600',
                    icon: 'mdi-bookmark-outline',
                    value: {},
                    class: ''
                },
                {
                    id: 'pending-internal',
                    text: 'PENDING CASE [INTERNAL]',
                    color: 'md-bg-purple-600',
                    icon: 'mdi-folder-clock-outline',
                    value: {}, class: ''
                },
                {
                    id: 'pending-customer',
                    text: 'PENDING CASE [CUSTOMER]',
                    color: 'md-bg-purple-600',
                    icon: 'mdi-folder-clock-outline',
                    value: {}, class: ''
                },
                {
                    id: 'acknowledge',
                    text: 'ACKNOWLEDGE',
                    color: 'md-bg-green-600',
                    icon: 'mdi-check-box-outline',
                    value: {}, class: ''
                },
                {
                    id: 'close',
                    text: 'CLOSE CASE',
                    color: 'md-bg-light-green-600',
                    icon: 'mdi-login',
                    value: {},
                    class: ''
                },
                {
                    id: 'processing',
                    text: 'PROCESSING CASE ',
                    color: 'md-bg-amber-600',
                    icon: 'mdi-timer-sand',
                    value: {}, class: ''
                },
                {
                    id: 'solving',
                    text: 'SOLVING',
                    color: 'md-bg-orange-600',
                    icon: 'mdi-folder-edit',
                    value: {},
                    class: ''
                },
                {
                    id: 'almost-over',
                    text: 'ALMOST OVER SLA',
                    color: 'md-bg-deep-orange-600',
                    icon: 'mdi-alarm-light-outline',
                    value: {}, class: ''
                },
                {
                    id: 'over-sla',
                    text: 'OVER SLA',
                    color: 'md-bg-red-600',
                    icon: 'mdi-calendar-clock',
                    value: {},
                    class: ''
                },
                {
                    id: 'cancel',
                    text: 'REJECT/CANCEL',
                    color: 'md-bg-red-600',
                    icon: 'mdi-file-cancel',
                    value: {},
                    class: ''
                },
                {
                    id: 'today',
                    text: 'TO DAY',
                    color: 'md-bg-yellow-600',
                    icon: 'mdi-calendar-today',
                    value: {},
                    class: 'active'
                },
            ],
            fields: [
                {key: 'No', label: 'No.', sortable: true, sortDirection: 'desc'},
                {key: 'ticketNo', label: 'Ticket number', sortable: true, class: 'text-left',tdClass:'w150'},
                {key: 'customerCompany', label: 'Company name', sortable: true, class: 'text-left',tdClass:'w250'},
                {key: 'customerType', label: 'Customer type', sortable: true, class: 'text-left',tdClass:'w250'},
                {key: 'subject', label: 'Subject', sortable: true, class: 'text-left',tdClass:'w150'},
                {key: 'appName', label: 'Application', sortable: true, class: 'text-left',tdClass:'w150'},
                {key: 'createdAt', label: 'Open date', sortable: true, class: 'text-left',tdClass:'w150'},
                {key: 'updatedAt', label: 'Close date', sortable: true, class: 'text-left',tdClass:'w150'},
                {key: 'status', label: 'Status', sortable: true, class: 'text-left',tdClass:'w150'},
                {key: 'createdBy.name', label: 'Agent', sortable: true, class: 'text-left',tdClass:'w150'},
                {key: 'continueTo', label: 'Continue to', sortable: true, class: 'text-left',tdClass:'w250'},
                {key: 'Action', label: 'Action', sortable: true, class: 'text-left',tdClass:'w150'},
            ],
            ContactCreate: false,
            ContactView: true,
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 25, 50, 100],
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            keyword: {
				datetime: '',
				today: '',
                project: '',
                status: '',
                customerType: '',
                application: '',
                agent: '',
                sla: '',
				keyword:'',
				team:''
            },
            ticketStatusList: [
                {text: 'All Status', value: ''},
                {text: 'Open Case', value: 'open'},
                {text: 'Processing', value: 'processing'},
                {text: 'Pending (Internal)', value: 'pending-internal'},
                {text: 'Pending (Customer)', value: 'pending-customer'},
                {text: 'Close', value: 'close'},
                {text: 'Acknowledge', value: 'acknowledge'},
                {text: 'Solving', value: 'solving'},
                {text: 'Reject / Cancel', value: 'cancel'},
            ],
            agentList: [],
            ticketList: [],
            customerTypeList: [],
			applicationList: [],
			clickSearch: false
        }),
        computed: {
            dtConfig() {
                return {
                    mode: "range",
                    dateFormat: "Y-m-d",
                }
            },
			userStore() {
				return this.$store.getters.getUserLogin
			},
        },
        mounted() {
            // this.searchTicketByStatus('today')
            // this.searchTicket()
            this.getCustomerType()
            this.getApplication()
            this.getUser()
            this.$nextTick(() => {
                this.showWidgets = true;
            })
            this.getCountTicketStatusFirst()
			this.$store.dispatch('setHistory', [])
        },
        methods: {
            set_active_id(id) {
                if (this.previous_active_id === id) return
                this.Dashboard.find(item => item.id === this.previous_active_id).class = ''
                this.Dashboard.find(item => item.id === id).class = 'active'
                this.previous_active_id = id
			},

            searchTicketByStatus(data) {

				if ( this.clickSearch === false ) {
					this.keyword.datetime = ''
					this.keyword.project = ''
					this.keyword.status = ''
					this.keyword.customerType = ''
					this.keyword.application = ''
					this.keyword.agent = ''
					this.keyword.sla = ''
					if (data === 'today') {
						const date = moment(new Date()).format('YYYY-MM-DD');
						this.keyword.today = date + ' to ' + date
						this.keyword.sla = data
					} else if (data === 'almost-over') {
						const date = moment(new Date()).format('YYYY-MM-DD');
						this.keyword.today = date + ' to ' + date
						this.keyword.sla = data
					} else if (data === 'over-sla') {
						const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
						const endOfMonth   = moment().endOf('month').format('YYYY-MM-DD');
						this.keyword.datetime = startOfMonth + ' to ' + endOfMonth
						this.keyword.sla = data
					} else if (data !== undefined) {
						this.keyword.datetime = this.$moment().startOf('month').format('YYYY-MM-DD') + ' to ' + this.$moment().endOf('month').format('YYYY-MM-DD')
						this.keyword.status = data
					}
					this.CardSearchTicket()
				}
				else if ( this.clickSearch === true ){
					this.keyword.project = ''
					this.keyword.status = ''
					this.keyword.customerType = ''
					this.keyword.application = ''
					this.keyword.agent = ''
					this.keyword.sla = ''

					if (data === 'today') {
						const date = moment(new Date()).format('YYYY-MM-DD');
						this.keyword.today = date + ' to ' + date
						this.keyword.sla = data
					} else if (data === 'almost-over') {
						const date = moment(new Date()).format('YYYY-MM-DD');
						this.keyword.today = date + ' to ' + date
						this.keyword.sla = data
					}
					 else if (data === 'over-sla') {
						this.keyword.sla = data
					} else if (data !== undefined) {
						this.keyword.status = data
					}
					this.CardSearchTicket()
				}
			},


            getCountTicketStatusFirst() {
				const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
				const endOfMonth   = moment().endOf('month').format('YYYY-MM-DD');
				this.keyword.datetime = startOfMonth + ' to ' + endOfMonth
                this.$ticketsAdapter.getCountTicketStatus(this.keyword).then(resp => {
                    this.Dashboard[0].value = resp.open
                    this.Dashboard[1].value = resp.pendingInternal
                    this.Dashboard[2].value = resp.pendingCustomer
                    this.Dashboard[3].value = resp.acknowledge
                    this.Dashboard[4].value = resp.close
                    this.Dashboard[5].value = resp.processing
                    this.Dashboard[6].value = resp.solving
                    this.Dashboard[7].value = resp.almostOver
                    this.Dashboard[8].value = resp.overSla
                    this.Dashboard[9].value = resp.cancel
                    this.Dashboard[10].value = resp.today
                }).catch((error) => {
                    console.log(error)
				})

			},

			getCountTicketStatusSearch() {
                this.$ticketsAdapter.getCountTicketStatus(this.keyword).then(resp => {
                    this.Dashboard[0].value = resp.open
                    this.Dashboard[1].value = resp.pendingInternal
                    this.Dashboard[2].value = resp.pendingCustomer
                    this.Dashboard[3].value = resp.acknowledge
                    this.Dashboard[4].value = resp.close
                    this.Dashboard[5].value = resp.processing
                    this.Dashboard[6].value = resp.solving
                    this.Dashboard[7].value = resp.almostOver
                    this.Dashboard[8].value = resp.overSla
                    this.Dashboard[9].value = resp.cancel
                    this.Dashboard[10].value = resp.today
                }).catch((error) => {
                    console.log(error)
				})

			},

            onFiltered(filteredItems) {
                this.totalRows = filteredItems.length
                this.currentPage = 1
            },
            listTicket() {
                this.$ticketsAdapter.listTicket().then(resp => {
                    this.totalRows = resp.total
                    this.ticketList = resp.data
					if (this.ticketList.length > 0)
					{
						$('#noticket').hide()
					}
					else
					{
						$('#noticket').show()
					}
                }).catch((error) => {
                    console.log(error)
                })
			},

			CardSearchTicket() {
				
                this.$ticketsAdapter.searchTicket(this.keyword).then(resp => {
                    this.totalRows = resp.total
                    this.ticketList = resp.data
					if (this.ticketList.length > 0)
					{
						$('#noticket').hide()
					}
					else
					{
						$('#noticket').show()
					}
                }).catch((err) => {
                    this.$swal("Warning!", "ไม่พบข้อมูล <br/>" + err.response.data.message, "warning")
                })
			},

            searchTicket() {
				this.currentPage = 1
                this.$ticketsAdapter.searchTicket(this.keyword).then(resp => {
					this.getCountTicketStatusSearch()
					this.clickSearch = true
                    this.totalRows = resp.total
                    this.ticketList = resp.data
					if (this.ticketList.length > 0)
					{
						$('#noticket').hide()
					}
					else
					{
						$('#noticket').show()
					}
                }).catch((err) => {
                    this.$swal("Warning!", "ไม่พบข้อมูล <br/>" + err.response.data.message, "warning")
                })
			},

            ExportTicketAll() {
                this.$ticketsAdapter.ExportTicketAll(this.keyword).then(resp => {
                    const url = window.URL.createObjectURL(new Blob([resp]))
                    const link = document.createElement('a')
                    link.href = url
                    link.setAttribute('download', 'Ticket.xlsx')
                    document.body.appendChild(link)
                    link.click()
                }).catch((err) => {
                    this.$swal("Error!", " <br/>" + err.message, "error")
                })
            },
            ExportTicketView() {
                this.$ticketsAdapter.ExportTicketView(this.keyword).then(resp => {
                    const url = window.URL.createObjectURL(new Blob([resp]))
                    const link = document.createElement('a')
                    link.href = url
                    link.setAttribute('download', 'Ticket.xlsx')
                    document.body.appendChild(link)
                    link.click()
                }).catch((err) => {
                    this.$swal("Error!", " <br/>" + err.message, "error")
                })
            },
            getCustomerType() {
                this.$masterAdapter.getAllCustomerTypes().then(resp => {
                    this.customerTypeList = resp
                }).catch((err) => {
                    this.$swal("Error!", "Customer Type Not Found <br/>" + err.response.data.message, "error")
                })
            },
            getApplication() {
                this.$masterAdapter.getAllApplication().then(resp => {
                    this.applicationList = resp
                }).catch((err) => {
                    this.$swal("Error!", "Application Not Found <br/>" + err.response.data.message, "error")
                })
            },
            getUser() {
                this.$masterAdapter.getUserByTeam().then(resp => {
                    this.agentList = resp
                }).catch((err) => {
                    this.$swal("Error!", "User Not Found <br/>" + err.response.data.message, "error")
                })
            },
            GetIndexRow(CurrentPage, PerPage, index) {
                return (CurrentPage - 1) * PerPage + (index + 1)
            },
            viewTickets(ticketNo, mode) {
                this.$router.push({path: `Ticket/View?ticketNo=${ticketNo}&mode=${mode}`})
            },
            resetForm() {
				this.keyword.datetime = ''
				this.keyword.project = ''
                this.keyword.status = ''
                this.keyword.customerType = ''
                this.keyword.application = ''
                this.keyword.agent = ''
                this.keyword.sla = ''
				this.ticketList = []
				this.getCountTicketStatusFirst()
				if (this.ticketList.length > 0)
				{
					$('#noticket').hide()
				}
				else
				{
					$('#noticket').show()
				}
            },
			truncate(text){
				return _.truncate(text, {
					length: 30,
					separator: ' '
				})
			},
			ExportTicketAdmin () {
				this.$ticketsAdapter.ExportTicketAdmin(this.keyword).then(resp => {
					const url = window.URL.createObjectURL(new Blob([resp]))
					const link = document.createElement('a')
					link.href = url
					link.setAttribute('download', 'TicketAdmin.xlsx')
					document.body.appendChild(link)
					link.click()
				}).catch((err) => {
					this.$swal("Error!", " <br/>" + err.message, "error")
				})
			},
			mapData (data) {
				return data[0].name
			}
        },
		watch:{
        	'keyword.keyword'(newValue){
        		if(newValue === ''){
        			this.searchTicketByStatus()
				}
			}
		}
    }
</script>
<style lang="scss">
	@import '~scss/vue/pretty_checkboxes';
	@import '~scss/plugins/jqvmap.scss';
	@import "~scss/common/md_colors";
	@import "~scss/common/variables_mixins";

	.w150 {
		min-width: 150px;
	}
	.w250 {
		min-width: 250px;
	}
	.w350 {
		min-width: 350px;
	}
	.w450 {
		min-width: 450px;
	}
</style>
