<template>
	<div id="sc-page-wrapper">
		<no-ssr>
			<div id="sc-page-top-bar" class="sc-top-bar">
				<div class="sc-top-bar-content uk-flex uk-flex-1">
					<h1 class="sc-top-bar-title uk-text-uppercase uk-flex-1">
						View Ticket
					</h1>
				</div>
			</div>
		</no-ssr>
		<div id="sc-page-content">
			<div class="uk-flex-center">
				<div class="uk-grid uk-width-1-1@m uk-child-width-1-2@s uk-child-width-1-2@m"
					 data-uk-grid>
					<div>
						<ScCard class="" :collapsed="todoContact">
							<ScCardHeader>
								<div class="uk-flex uk-flex-middle">
									<div v-if="!userEditActive" class="uk-flex-1">
										<ScCardTitle>CONTACT</ScCardTitle>
									</div>
									<ScCardActions>
										<a
											href="javascript:void(0)"
											class="sc-actions-icon mdi "
											:class="{'mdi-window-minimize' : !todoContact, 'mdi-window-maximize' : todoContact }"
											@click.prevent="todoContact = !todoContact"
										></a>
									</ScCardActions>
								</div>
							</ScCardHeader>
							<ScTransition name="slideUp">
								<ScCardContent v-show="!todoContact">
									<ScCardBody style="min-height: 250px">
										<transition name="slide-bottom-medium" mode="out-in">
											<div v-if="contactType === 'company'">
												<contactCompanyView></contactCompanyView>
											</div>
											<div v-if="contactType === 'personal'">
												<contactPersonalView></contactPersonalView>
											</div>
										</transition>
									</ScCardBody>
								</ScCardContent>
							</ScTransition>
						</ScCard>
					</div>
					<div>
						<ScCard class="" :collapsed="todoTicket">
							<ScCardHeader>
								<div class="uk-flex uk-flex-middle">
									<div class="uk-flex-1">
										<ScCardTitle>VIEW TICKET</ScCardTitle>
									</div>

									<ScCardActions>
										<a
											href="javascript:void(0)"
											class="sc-actions-icon mdi "
											:class="{'mdi-window-minimize' : !todoTicket, 'mdi-window-maximize' : todoTicket }"
											@click.prevent="todoTicket = !todoTicket"
										></a>
									</ScCardActions>
								</div>
							</ScCardHeader>

							<ScTransition name="slideUp">
								<ScCardContent v-show="!todoTicket">
									<ScCardBody style="min-height: 750px">
											<div class="uk-child-width-1-2@s uk-flex uk-flex-bottom uk-grid"
												 data-uk-grid>
												<div>
													<ScInput v-model="formTickets.ticketNo" disabled>
														<label><b>Ticket Number :</b></label>
													</ScInput>
												</div>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls">
															<ScInput v-model="formTickets.customerCode" disabled>
																<label><b>Customer Code :</b></label>
															</ScInput>
														</div>
													</div>
												</div>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls">
															<ScInput v-model="formTickets.serviceCode" disabled>
																<label><b>Service Code :</b></label>
															</ScInput>
														</div>
													</div>
												</div>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls">
															<ScInput v-model="formTickets.customerCompany" disabled>
																<label><b>Customer Company :</b></label>
															</ScInput>
														</div>
													</div>
												</div>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls">
															<ScInput v-model="formTickets.branch" disabled>
																<label><b>Branch :</b></label>
															</ScInput>
														</div>
													</div>
												</div>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls">
															<ScInput v-model="formTickets.customerType.name" disabled>
																<label><b>Customer Type :</b></label>
															</ScInput>
														</div>
													</div>
												</div>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls">
															<ScInput v-model="formTickets.brand" disabled>
																<label><b>Brand :</b></label>
															</ScInput>
														</div>
													</div>
												</div>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls">
															<ScInput v-model="formTickets.customerName" disabled>
																<label><b>Customer Name :</b></label>
															</ScInput>
														</div>
													</div>
												</div>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls">
															<ScInput v-model="formTickets.rm" disabled>
																<label><b>RM/Internal Code :</b></label>
															</ScInput>
														</div>
													</div>
												</div>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls">
															<ScInput v-model="formTickets.region" disabled>
																<label><b>Region :</b></label>
															</ScInput>
														</div>
													</div>
												</div>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls">
															<ScInput v-model="formTickets.province" disabled>
																<label><b>Province :</b></label>
															</ScInput>
														</div>
													</div>
												</div>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls">
															<ScInput v-model="formTickets.appName.name" disabled>
																<label><b>Application Name :</b></label>
															</ScInput>
														</div>
													</div>
												</div>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls">
															<ScInput v-model="formTickets.channel" disabled>
																<label><b>Channel :</b></label>
															</ScInput>
														</div>
													</div>
												</div>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls">
															<ScInput v-model="formTickets.subject.name" disabled>
																<label><b>Subject :</b></label>
															</ScInput>
														</div>
													</div>
												</div>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls">
															<ScInput v-model="formTickets.subSubject.name" disabled>
																<label><b>Sub Subject :</b></label>
															</ScInput>
														</div>
													</div>
												</div>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls">
															<ScInput v-model="formTickets.categoryIssue.name" disabled>
																<label><b>Category Issue :</b></label>
															</ScInput>
														</div>
													</div>
												</div>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls">
															<ScInput v-model="formTickets.otherIssue" disabled>
																<label><b>Other Issue :</b></label>
															</ScInput>
														</div>
													</div>
												</div>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls">
															<ScInput v-model="formTickets.priority" disabled>
																<label><b>Priority :</b></label>
															</ScInput>
														</div>
													</div>
												</div>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls">
															<ScInput v-model="formTickets.sla" disabled>
																<label><b>SLA (Min) :</b></label>
															</ScInput>
														</div>
													</div>
												</div>
											</div>

											<div class="uk-child-width-1-1@s uk-flex uk-flex-bottom uk-grid"
												 data-uk-grid>
												<div v-if="formTickets.complain" class="uk-margin-top">
													<label class="uk-form-label uk-margin-mini-bottom">
														<b>Complain :</b>
													</label>
													<div v-html="formTickets.complainNote" class="p-2"
														 style="background-color: #f5f5f5 "></div>
												</div>
												<div class="uk-margin-top">
													<label class="uk-form-label uk-margin-mini-bottom">
														<b>Description :</b>
													</label>
													<div v-html="formTickets.description" class="p-2"
														 style="background-color: #f5f5f5 "></div>
												</div>
												<div class="uk-margin-top">
													<div class="uk-margin">
														<div v-for="(data, index) in formTickets.file">
															<a href="javascript:void(0)" @click="downloadFiles(data)">{{index+1}}.
																{{ data.alt}}</a>
														</div>
													</div>
												</div>
											</div>
											<div class="uk-child-width-1-2@s uk-flex uk-flex-bottom uk-grid"
												 data-uk-grid>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls">
															<ScInput v-model="formTickets.reqDueDate" disabled>
																<label><b>Request Due Date :</b></label>
															</ScInput>
														</div>
													</div>
												</div>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls">
															<ScInput v-model="formTickets.appointmentDate" disabled>
																<label><b>Appointment Date :</b></label>
															</ScInput>
														</div>
													</div>
												</div>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls">
															<ScInput v-model="formTickets.assignMyTeam.name" disabled>
																<label><b>Assign to my Team (Agent) :</b></label>
															</ScInput>
														</div>
													</div>
												</div>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls">
															<ScInput v-model="formTickets.continueTo.name" disabled>
																<label><b>Continue to (Other Team) :</b></label>
															</ScInput>
														</div>
													</div>
												</div>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls">
															<ScInput v-model="formTickets.createdByTeam.name" disabled>
																<label><b>Open Ticket (team) :</b></label>
															</ScInput>
														</div>
													</div>
												</div>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls uk-form-label">
															<b>Hashtag : </b>
															<button class="sc-button sc-button-mini ml-1 mb-1 " disabled
																	v-for="(hashTag,index) in formTickets.hashtag">
																{{hashTag.name}}
															</button>
														</div>
													</div>
												</div>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls uk-form-label">
															<b>Attach Document :</b>
															<div v-if="formTickets.file1.alt">
																<span class="sc-text-semibold">1.</span>
																<a href="javascript:void(0)" @click="downloadFiles(formTickets.file1)">{{
																	formTickets.file1.alt}}</a>
															</div>
															<div v-if="formTickets.file2.alt">
																<span class="sc-text-semibold">2.</span>
																<a href="javascript:void(0)" @click="downloadFiles(formTickets.file2)">{{
																	formTickets.file2.alt}}</a>
															</div>
															<div v-if="formTickets.file3.alt">
																<span class="sc-text-semibold">3.</span>
																<a href="javascript:void(0)" @click="downloadFiles(formTickets.file3)">{{
																	formTickets.file3.alt}}</a>
															</div>
															<div v-if="formTickets.file4.alt">
																<span class="sc-text-semibold">4.</span>
																<a href="javascript:void(0)" @click="downloadFiles(formTickets.file4)">{{
																	formTickets.file4.alt}}</a>
															</div>
															<div v-if="formTickets.file5.alt">
																<span class="sc-text-semibold">5.</span>
																<a href="javascript:void(0)" @click="downloadFiles(formTickets.file5)">{{
																	formTickets.file5.alt}}</a>
															</div>
															<div v-if="formTickets.file6.alt">
																<span class="sc-text-semibold">5.</span>
																<a href="javascript:void(0)" @click="downloadFiles(formTickets.file6)">{{
																	formTickets.file6.alt}}</a>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="uk-child-width-1-2@s uk-flex uk-flex-bottom uk-grid"
												 data-uk-grid>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls uk-form-label">
															<b>Open Ticket Date : </b> {{ formTickets.createdAt }}
														</div>
													</div>
												</div>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls uk-form-label">
															<b>Close Ticket Date : </b> {{ formTickets.status === 'close' ?
															formTickets.updatedAt : ''}}
														</div>
													</div>
												</div>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls uk-form-label">
															<b>Open Ticket by (Agent) : </b> {{ formTickets.createdBy.name
															}}
														</div>
													</div>
												</div>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls uk-form-label">
															<b>Close Ticket by (Agent) : </b> {{ formTickets.status === 'close' ?
															formTickets.updatedBy.name : ''}}
														</div>
													</div>
												</div>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls uk-form-label">
															<b>Request by (Agent) : </b> {{ formTickets.reqBy }}
														</div>
													</div>
												</div>
												<div>
													<div class="uk-margin">
														<div class="uk-form-controls uk-form-label">
															<b>Last status : </b> {{ formTickets.status }}
														</div>
													</div>
												</div>
											</div>
									</ScCardBody>
								</ScCardContent>
							</ScTransition>
						</ScCard>
					</div>

					<div>
						<Worklog @worklog-save-summit="getTicketsByID"></Worklog>
					</div>

					<div>
						<ScCard class="" :collapsed="todoHistorical">
							<ScCardHeader>
								<div class="uk-flex uk-flex-middle">
									<div class="uk-flex-1">
										<ScCardTitle>Historical</ScCardTitle>
									</div>
									<ScCardActions>
										<a
											href="javascript:void(0)"
											class="sc-actions-icon mdi "
											:class="{'mdi-window-minimize' : !todoHistorical, 'mdi-window-maximize' : todoHistorical }"
											@click.prevent="todoHistorical = !todoHistorical"
										></a>
									</ScCardActions>
								</div>
							</ScCardHeader>
							<ScTransition name="slideUp">
								<ScCardContent v-show="!todoHistorical">
									<ScCardBody style="min-height: 250px">
										<transition name="slide-bottom-medium" mode="out-in">
											<Historical/>
										</transition>
									</ScCardBody>
								</ScCardContent>
							</ScTransition>
						</ScCard>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
    import {scHelpers, scFakeData} from "~/assets/js/utils";
    import {validationMixin} from 'vuelidate'
    import {required} from 'vuelidate/lib/validators'
    import ScInput from '~/components/Input'
    import ScTextarea from '~/components/Textarea'
    import SentMail from "./SentMail";
    import Historical from "./Historical";
    import Worklog from "./Worklog";
    import {XlsxTable, XlsxRead} from '~/node_modules/vue-xlsx/dist/vue-xlsx.es.js'
    import Buttons from '../src/components/buttons'
    import contactPersonalView from './contactPersonal'
    import contactCompanyView from './contactCompany'

    const {first, last, email} = scFakeData;
    import Select2 from "~/components/Select2";
    import moment from 'moment'
    import confirmDatePlugin from "flatpickr/dist/plugins/confirmDate/confirmDate";
    import _ from 'lodash'

    if (process.client) {
        require('~/plugins/flatpickr');
    }
    if (process.client) {
        require('~/plugins/quill');
    }

    export default {
        components: {
            Buttons,
            ScInput,
            ScTextarea,
            Select2,
            XlsxTable,
            XlsxRead,
            SentMail,
            Historical,
            Worklog,
            moment,
            contactPersonalView,
            contactCompanyView
        },
        mixins: [validationMixin],
        data: () => ({
            priorityOption: [
                {
                    value: '1',
                    text: '1'
                },
                {
                    value: '2',
                    text: '2'
                },
            ],
            contactType: '',
            todoContact: false,
            todoTicket: false,
            todoMail: false,
            todoHistorical: false,
            userEditActive: false,
            editUserTransition: false,
            submitStatus: null,
            firstName: '',
            lastName: '',
            mobile: '',
            select2: {
                state: '',
                phone: '',
            },
            userTemp: {},
            hashTagList: [],
            formTickets: {
                ticketNo: '',
                appName: '',
                categoryIssue: '',
                complain: '',
                complainNote: '',
                contact: '',
                contactType: '',
                subject: {
                    id: '',
                    name: ''
                },
                subSubject: {
                    id: '',
                    name: ''
                },
                priority: '',
                sla: '',
                otherIssue: '',
                channel: '',
                hashtag: {
                    id: '',
                    name: ''
                },
                appointmentDate: '',
                continueTo: {
                    id: '',
                    name: ''
                },
				file1:{
					alt: '',
					link: ''
				},
				file2:{
					alt: '',
					link: ''
				},
				file3:{
					alt: '',
					link: ''
				},
				file4:{
					alt: '',
					link: ''
				},
				file5:{
					alt: '',
					link: ''
				},
				file6:{
					alt: '',
					link: ''
				},
                customerCode: '',
                serviceCode: '',
                customerCompany: '',
                branch: '',
				brand: '',
				region:'',
                province: '',
                customerType: {
                    id: '',
                    name: ''
                },
                customerName: '',
                reqDueDate: '',
                reqBy: '',
                rm: '',
                status: '',
                assignMyTeam: '',
                description: '',
                closedAt: '',
                createdAt: '',
                createdBy: '',
                createdByTeam: {
                    id: '',
                    name: ''
                },
                updatedAt: '',
                updatedBy: '',
            },
            editorOption: {
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        [{'list': 'ordered'}, {'list': 'bullet'}],
                        [{'indent': '-1'}, {'indent': '+1'}],
                        [{'direction': 'rtl'}],
                        [{'header': [1, 2, 3, 4, 5, 6, false]}],
                        [{'color': []}, {'background': []}],
                        [{'align': []}],
                        ['clean'],
                        ['link', 'image']
                    ],
                    imageResize: true
                }
            },
            basicTable: null,
            file: null,
            contactName: [],
            searchByName: '',
            contactPhone: [],
            searchByPhone: '',
            phone: '',
            optionSelect2: {
                ajax: {
                    url: 'https://api.github.com/search/repositories',
                    dataType: 'json',
                }
            },
            ticketId: '',
        }),
        validations: {
            getContact: {
                firstName: {
                    required,
                },
                lastName: {
                    required,
                },
                mobile: {
                    required,
                },
            },

        },
        computed: {
            getContact() {
                return this.$store.getters.searchContact
            },
            editor() {
                return process.client ? require('@ckeditor/ckeditor5-build-classic') : null
            },
            incident: function () {
                return this.$route.query.ticketNo
            },
            dpTimePicker() {
                const self = this;
                return {
                    enableTime: true,
                    time_24hr: true,
                    plugins: [new confirmDatePlugin({
                        confirmIcon: "<i class='mdi mdi-check'></i>",
                        confirmText: ""
                    })],
                    dateFormat: "d/m/Y H:i",
                    defaultDate: self.$moment().format('DD/MM/YYYY H:m')
                }
            },
        },
        created() {
            this.ticketId = this.$route.query.ticketNo
        },
        mounted() {
            this.getTicketsByID()
            this.getHashTag()

        },
        methods: {
            downloadFiles(item) {
                const nameFile = item.alt
                this.$contactAdapter.downloadFiles(item.link).then(resp => {
                    const url = window.URL.createObjectURL(new Blob([resp]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', nameFile);
                    document.body.appendChild(link);
                    link.click();
                }).catch((err) => {
                    this.$swal("Error!", "download ข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกค่ะ !" + "<br>" + err, "error")
                })
            },
            getHashTag() {
                this.$masterAdapter.getAllHashTag().then(resp => {
                    this.hashTagList = resp
                })
            },
            getTicketsByID() {
                this.$ticketsAdapter.getTicketsByID(this.ticketId).then(resp => {
                    this.contactType = resp.contactType
                    if (this.contactType === 'company') {
                        this.contactId = resp.contact._id
                        this.$store.dispatch('getCompanyByTicketId', resp.contact)
						this.listTicketByContactId(this.contactId)
                    }
                    if (this.contactType === 'personal') {
                        this.contactId = resp.contact._id
                        this.$store.dispatch('getPersonalByTicketId', resp.contact)
						this.listTicketByContactId(this.contactId)
					}
					
                     this.formTickets = resp
					 this.formTickets.brand = !_.isNil(resp.brand) ? resp.brand.name : ''
                }).catch(err => {
                    this.$swal('Error!', 'Ticket Not Found<br>'+ err , 'error')
                })
            },
            listTicketByContactId(id) {
                if (!_.isNil(id)) {
                    this.$ticketsAdapter.listTicketByContactId(id).then(resp => {
                        this.$store.dispatch('setHistory', resp.data)
                    }).catch(err => {
                        this.$swal('Error!', 'Can not found Ticket<br>' + err.response.data.message, 'error')
                    })
                } else {
                    this.$store.dispatch('setHistory', [])
                }

            },
            submitForm(e) {
                e.preventDefault();
                this.$v.$touch();
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                } else {
                    this.submitStatus = 'PENDING';
                    setTimeout(() => {
                        this.submitStatus = 'OK'
                    }, 500)
                }
            },
            cancelEdit() {
                this.userTemp = {};
                this.userEditActive = !this.userEditActive;
            },
            updateTicket() {
                this.$ticketsService.updateTicket(this.formTickets).then(resp => {
                    return resp
                }).then(resp => {
                    this.$swal("Successful!", "บันทึกข้อมูลไม่สำเร็จ ", "success")
                }).catch((err) => {
                    this.$swal("Error!", "บันทึกข้อมูลไม่สำเร็จ <br/>" + err.response.data.message, "error")
                })
            },
        },
        watch: {
            'incident'(newData) {
                if (newData) {
                    this.ticketId = this.$route.query.ticketNo
                    this.getTicketsByID()
                }
            }
        }
    }
</script>

<style lang="scss">
	@import '~scss/vue/_pretty_checkboxes';

	#editor1 {
		min-height: 170px;
	}
</style>
