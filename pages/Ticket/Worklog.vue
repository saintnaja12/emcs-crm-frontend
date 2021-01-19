<template>
	<div>
		<div>
			<ScCard class="mb-4" :collapsed="todoTimeline">
				<ScCardHeader>
					<div class="uk-flex uk-flex-middle">
						<div class="uk-flex-1">
							<ScCardTitle>TIMELINE</ScCardTitle>
						</div>
						<ScCardActions>
							<a
								href="javascript:void(0)"
								class="sc-actions-icon mdi "
								:class="{'mdi-window-minimize' : !todoTimeline, 'mdi-window-maximize' : todoTimeline }"
								@click.prevent="todoTimeline = !todoTimeline"
							></a>
						</ScCardActions>
					</div>
				</ScCardHeader>
				<ScTransition name="slideUp">
					<ScCardContent v-show="!todoTimeline">
						<ScCardBody style="min-height: 550px">
							<transition name="slide-bottom-medium" mode="out-in">
								<perfect-scrollbar class="uk-height-large">
									<div class="si-content-wrapper uk-padding-small">
										<div class="sc-timeline sc-timeline-center">
											<div v-for="item in timeline" :key="item.id" class="sc-timeline-item">
												<div class="sc-timeline-date">
													{{ item.createdAt | moment("DD MMM") }}
												</div>
												<div class="sc-timeline-icon md-bg-green-500 sc-light">
													<i class="mdi mdi-account"></i>
												</div>
												<div class="sc-timeline-body sc-timeline-body-border">
													<h1 class="sc-timeline-header uk-text-center">
														{{ item.status | capitalize }}
													</h1>
													<div v-if="item.title" class="sc-timeline-body">
														{{ item.title | capitalize }}
													</div>
													<div class="uk-text-right">
														<a href="javascript:void(0)" id="tooltip-detail" :id="item.id">
															see more
														</a>
													</div>
													<b-tooltip target="tooltip-detail" :target="item.id" triggers="hover">
														<div align="left">
															<b style="color: #f9a825; ">Status : </b> {{item.status}} <br>
															<b style="color: #f9a825">Responsible By : </b>
															{{item.responsibleBy}} <br>
															<b style="color: #f9a825">Raise Date : </b>
															{{ item.raiseDate | moment("DD/MM/YYYY") }}<br>
															<b style="color: #f9a825">Expect Delivery Date : </b>
															{{ item.expectDeliveryDate | moment("DD/MM/YYYY") }}<br>
															<b style="color: #f9a825">Respond Date : </b>
															{{ item.respondDate | moment("DD/MM/YYYY") }}<br>
															<b style="color: #f9a825">Due Date (Customer) : </b>
															{{ item.dueDate | moment("DD/MM/YYYY") }}<br>
															<b style="color: #f9a825">Title : </b> {{item.title}} <br>
															<b style="color: #f9a825">Description : </b>
															<p v-html="item.description"></p>
															<b style="color: #f9a825">Assign To : {{item.assignTo.name}}</b>
															<br>
															<b v-show="item.processResults || item.cause !== ''" style="color: #f9a825">บันทึกผลการ verify ลูกค้า</b><br>
															<b v-show="item.processResults !== '' " style="color: #f9a825">ดำเนินการแก้ไขสำเร็จ : </b>
															{{item.processResults}} <br>
															<b v-if="item.cause !== ''" style="color: #f9a825">สาเหตุ : </b> {{item.cause}} <br>
															<b v-if="item.overSla !== '' || item.overSla !== null || item.overSla !== undefined" style="color: #f9a825">Over SLA : </b> {{item.overSla}} <br>
														</div>
													</b-tooltip>
													<div v-if="item.file1.alt" class="uk-text-right">
														<a href="javascript:void(0)" id="tooltip-file" :id="item.createdAt.toString()">
															Attachment
														</a>
													</div>
													<b-tooltip target="tooltip-file" :target="item.createdAt.toString()" triggers="hover">
														<b style="color: #f9a825">Attachment : </b> <br>
														<div v-if="item.file1.alt" align="left">
															<span>- </span>
															<a href="javascript:void(0)"
															   @click="downloadFiles(item.file1.data.link,item.file1.alt)">
																{{item.file1.alt}}</a>
														</div>
														<div v-if="item.file2.alt" align="left">
															<span>- </span>
															<a href="javascript:void(0)"
															   @click="downloadFiles(item.file2.data.link,item.file2.alt)">
																{{item.file2.alt}}</a>
														</div>
														<div v-if="item.file3.alt" align="left">
															<span>- </span>
															<a href="javascript:void(0)"
															   @click="downloadFiles(item.file3.data.link,item.file3.alt)">
																{{item.file3.alt}}</a>
														</div>
														<div v-if="item.file4.alt" align="left">
															<span>- </span>
															<a href="javascript:void(0)"
															   @click="downloadFiles(item.file4.data.link,item.file4.alt)">
																{{item.file4.alt}}</a>
														</div>
														<div v-if="item.file5.alt" align="left">
															<span>- </span>
															<a href="javascript:void(0)"
															   @click="downloadFiles(item.file5.data.link,item.file5.alt)">
																{{item.file5.alt}}</a>
														</div>
													</b-tooltip>
													<hr>
													<div class="uk-margin-remove sc-timeline-meta">
														<div v-if="item.ticketNo">
															Ticket No. : {{ item.ticketNo }}
														</div>
														<div v-if="item.ticket.ticketMain">
															Main Ticket: {{ item.ticket.ticketMain }}
														</div>
														<div v-if="item.fromTicketId">
															From Ticket No. : {{ item.fromTicketId }}
														</div>
														<div v-if="item.createdBy.name">
															Created By : {{ item.createdBy.name  }}
														</div>
														<div v-if="item.createdBy.team">
															Team : {{ item.createdBy.team.name }}
														</div>
														<div v-if="item.createdAt">
															Time : {{ item.createdAt | moment("DD/MM/YYYY HH:mm") }}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</perfect-scrollbar>
							</transition>
						</ScCardBody>
					</ScCardContent>
				</ScTransition>
			</ScCard>
		</div>
	 
		<div v-if="this.$route.query.mode !== 'view'">
			<ScCard  class="" :collapsed="todoWorklog">
				<ScCardHeader>
					<div class="uk-flex uk-flex-middle">
						<div class="uk-flex-1">
							<ScCardTitle>Worklog</ScCardTitle>
						</div>
						<ScCardActions>
							<a
								href="javascript:void(0)"
								class="sc-actions-icon mdi "
								:class="{'mdi-window-minimize' : !todoWorklog, 'mdi-window-maximize' : todoWorklog }"
								@click.prevent="todoWorklog = !todoWorklog"
							></a>
						</ScCardActions>
					</div>
				</ScCardHeader>
				<ScTransition name="slideUp">
					<ScCardContent v-show="!todoWorklog">
						<ScCardBody style="min-height: 250px">
							<transition name="slide-bottom-medium" mode="out-in">
								<transition name="slide-bottom-medium" mode="out-in">
									<div class="uk-form-stacked">
										<div class="sc-round sc-border sc-padding">
											<div class="uk-child-width-1-2@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
												<div>
													<label class="uk-form-label">
														Status<span style="color: red;">*</span> : {{formWorklog.status}}
													</label>
													<select v-model="formWorklog.status" class="uk-select">
														<option value="">- select status -</option>
														<option v-for="option in statusList"
																v-bind:value="option.value">
															{{ option.text }}
														</option>
													</select>
												</div>
												<div>
													<label class="uk-form-label">
														Responsible By :
													</label>
													<ScInput v-model="formWorklog.responsibleBy"
															 disabled></ScInput>
												</div>
												<div>
													<ScInput v-model="formWorklog.raiseDate" v-flatpickr mode="outline">
														<label>Raise Date</label>
													</ScInput>
												</div>
												<div>
													<ScInput v-model="formWorklog.expectDeliveryDate" v-flatpickr
															 mode="outline">
														<label>Expect Delivery Date</label>
													</ScInput>
												</div>
												<div>
													<ScInput v-model="formWorklog.respondDate" v-flatpickr mode="outline">
														<label>Respond Date</label>
													</ScInput>
												</div>
												<div>
													<ScInput v-model="formWorklog.dueDate" v-flatpickr mode="outline">
														<label>Due Date (Customer)</label>
													</ScInput>
												</div>
											</div>
											<div class="uk-child-width-1-1@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
												<div>
													<ScInput v-model="formWorklog.title">
														<label>Title<span style="color: red;">*</span> :</label>
													</ScInput>
												</div>
												<div class="uk-margin-top">
													<label class="uk-form-label uk-margin-mini-bottom">
														Description :
													</label>
													<vue-editor ref="editor1"
																v-model="formWorklog.description"
																:config="editorOption"
																useCustomImageHandler
																@image-added="uploadFile"
													>
													</vue-editor>
												</div>
											</div>
											<div class="uk-child-width-1-1@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
												<div class="uk-margin-top uk-margin-mini-bottom ">
													<b-form-file multiple v-model="formWorklog.file" @change="changeFile($event)"></b-form-file>
												</div>
											</div>
											<div class="uk-child-width-1-2@s uk-flex uk-flex-bottom uk-grid " data-uk-grid>
												<div>
													<label class="uk-form-label">
														Assign To :
													</label>
													<select v-model="formWorklog.assignTo" class="uk-select">
														<option value="">- select assign to -</option>
														<option v-for="option in teamList" v-bind:value="option.id">
															{{ option.name }}
														</option>
													</select>
												</div>
											</div>

											<div v-show="formWorklog.status === 'close'">
												<div class="mt-4">
													<p class="sc-text-semibold uk-text-uppercase uk-heading-line">
														<span>บันทึกผลการ verify ลูกค้า</span>
													</p>
												</div>
												<div class="uk-child-width-1-2@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
													<div>
														<label>แก้ไขสำเร็จ<span style="color: red;">* {{formWorklog.processResults}}</span></label>
														<label><input class="uk-radio" type="radio" name="result" v-model="formWorklog.processResults" value="ใช่">ใช่</label>
														<label><input class="uk-radio" type="radio" name="result" v-model="formWorklog.processResults" value="ไม่ใช่">ไม่ใช่</label>
													</div>
													<div>
														<ScInput v-model="formWorklog.cause">
															<label>สาเหตุ<span style="color: red;">*</span> :</label>
														</ScInput>
													</div>
												</div>
												<div v-show="formWorklog.status === 'close'" class="uk-child-width-1-1@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
													<div>
														<ScInput v-model="formWorklog.overSla">
															<label>กรณีเกิน SLA กรุณาระบุสาเหตุที่ไม่ปิดเคสตามกำหมด :</label>
														</ScInput>
													</div>
												</div>
											</div>
											<br/>
											<div class="uk-child-width-1-1@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
												<div class="uk-text-right">
													<a href="javascript:void(0)"
													   class="sc-button sc-button-primary sc-button-social"
													   @click="saveWorklog()">
														<span>SAVE</span><i class="mdi mdi-send"></i>
													</a>
													<a href="javascript:void(0)"
													   class="sc-button sc-button-danger sc-button-social"
													   @click="resetForm()">
														<span>RESET</span><i class="mdi mdi-lock-reset"></i>
													</a>
												</div>
											</div>
										</div>
									</div>
								</transition>
							</transition>
						</ScCardBody>
					</ScCardContent>
				</ScTransition>
			</ScCard>
		</div>
	</div>
</template>
<script>
    import ScInput from '~/components/Input'
    import ScTextarea from '~/components/Textarea'
    import Select2 from "~/components/Select2";
    import moment from 'moment'
    import Swal from 'sweetalert2'
    import ScPhoto from '~/components/Photo'
    import ScAvatar from '~/components/Avatar'
	import {VueEditor, Quill} from "vue2-editor";


	require('~/plugins/scrollable');
	import _ from "lodash";

    if (process.client) {
        require('~/plugins/flatpickr');
    }
    if (process.client) {
        require('~/plugins/quill');
    }

    export default {
        components: {
            ScPhoto,
            ScAvatar,
            ScInput,
            ScTextarea,
            Select2,
            moment,
			VueEditor
        },
        data: () => ({
			lastStatus: '',
            todoTimeline: false,
            todoWorklog: false,
            formWorklog: {
                assignTo: '',
                description: '',
                dueDate: '',
                expectDeliveryDate: '',
                raiseDate: '',
                respondDate: '',
                responsibleBy: '',
                status: '',
                ticketNo: '',
                title: '',
                cause:'',
				overSLA:'',
				processResults:'',
                updateToParent:true,
                file: '',
            },
			timeline: [],
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
            statusList: [
                {text: 'Open Case', value: 'open'},
                {text: 'Processing', value: 'processing'},
                {text: 'Pending (Internal)', value: 'pending-internal'},
                {text: 'Pending (Customer)', value: 'pending-customer'},
                {text: 'Close', value: 'close'},
                {text: 'Acknowledge', value: 'acknowledge'},
                {text: 'Solving', value: 'solving'},
                {text: 'Reject / Cancel', value: 'cancel'},
            ],
			teamList: [],
			
        }),
        validations: {},
        computed: {
            ticketsNum() {
                return this.$route.query.ticketNo
            },
        },
        mounted() {
            this.getWorkLogByTicketNo()
            this.getTeam()
			this.getTeamLogin()
        },
        methods: {
            handleSelected(data){
               this.formWorklog.processResults = data
			},
            saveWorklog() {
				if (this.formWorklog.status.trim() == '') {
					this.$swal("Warning!", "กรุณาเลือก Status", "warning")
				} else if (this.formWorklog.title == '') {
					this.$swal("Warning!", "กรุณาระบุหัวข้อ Title", "warning")
				} else if (this.formWorklog.processResults == '' && this.formWorklog.status === 'close') {
					this.$swal("Warning!", "กรุณาระบุผลการดำเนินการ", "warning")
				} else if (this.formWorklog.cause == ''&& this.formWorklog.status === 'close') {
					this.$swal("Warning!", "กรุณาระบุสาเหตุ", "warning")
				}else {
					const formData = new FormData()
					formData.append('ticketNo', this.ticketsNum)
					formData.append('dueDate', new Date(this.formWorklog.dueDate).getTime())
					formData.append('expectDeliveryDate', new Date(this.formWorklog.expectDeliveryDate).getTime())
					formData.append('raiseDate', new Date(this.formWorklog.raiseDate).getTime())
					formData.append('respondDate', new Date(this.formWorklog.respondDate).getTime())
					formData.append('status', this.formWorklog.status)
					formData.append('assignTo', this.formWorklog.assignTo)
					formData.append('description', this.formWorklog.description)
					formData.append('responsibleBy', this.formWorklog.responsibleBy)
					formData.append('processResults', this.formWorklog.processResults)
					formData.append('cause', this.formWorklog.cause)
					formData.append('updateToParent', this.formWorklog.updateToParent)
					formData.append('overSla', this.formWorklog.overSla)
					formData.append('title', this.formWorklog.title)
					_.forEach(this.formWorklog.file, (data, index) => {
						formData.append(`file${index + 1}`, data)
					})
					this.$worklogAdapter.createWorkLog(formData).then(resp => {
						const statSubmit = this.formWorklog.status
						this.resetForm()
						this.getWorkLogByTicketNo()
						this.$emit('worklog-save-summit')
						if (statSubmit !== '') {
							Swal.fire('Successful!', 'บันทึกข้อมูลเรียบร้อยแล้ว', 'success')
						}
					}).catch(err => {
						Swal.fire('Error!', 'บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ !!! <br/>' + err.response.data.message, 'error')
					})
				}
            },
            getTeam() {
                this.$masterAdapter.getAllTeam().then(resp => {
                    this.teamList = resp
                })
			},
            getWorkLogByTicketNo() {
                this.$worklogAdapter.getWorkLogByTicketNo(this.ticketsNum).then(resp => {
					this.timeline = resp.data
					this.getLastStatus()
					const findData = _.find(resp.data, { 'id': this.ticketNum})
				})
				
			},
			getLastStatus(){
				this.lastStatus = this.timeline[0].status
			},
            resetForm() {
                this.formWorklog.status = ''
                this.formWorklog.raiseDate = ''
                this.formWorklog.expectDeliveryDate = ''
                this.formWorklog.respondDate = ''
                this.formWorklog.dueDate = ''
                this.formWorklog.title = ''
                this.formWorklog.description = ''
                this.formWorklog.assignTo = ''
                this.formWorklog.file = ''
				this.formWorklog.processResults = ''
				this.formWorklog.cause = ''
				this.formWorklog.overSla = ''
            },
			getTeamLogin() {
				this.formWorklog.responsibleBy = this.$store.getters.getUserLogin.name
			},
			uploadFile(file, Editor, cursorLocation, resetUploader) {
				var formData = new FormData();
				formData.append("files", file);
				let base_url =  `${process.env.baseUrl}`
				this.$ticketsAdapter.uploadFile(formData).then(resp => {
					let url = resp
					Editor.insertEmbed(cursorLocation, "image", `${base_url}/${url}`)
					resetUploader()
				}).catch(err => {
					console.log(err);
				});
			},
			changeFile (data) {
            	let file = data.target.files
            	if (file.length > 5) {
					Swal.fire('Warning!', 'กรุณาเลือกไฟล์ไม่เกิน 5 ไฟล์ !!!' + '<br>', 'warning').then(resp => {
						this.formWorklog.file = null
					})
				}
			},
			downloadFiles(item,nameFile) {
				this.$ticketsAdapter.downloadFiles(item).then(resp => {
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

        },
        watch:{
            'ticketsNum'(newData) {
                if (newData){
                    this.getWorkLogByTicketNo()
                }
            }
        }
    }
</script>
<style lang="scss">
	.tooltip {
		display: block !important;
		z-index: 10000;

		.tooltip-inner {
			background: black;
			color: white;
			border-radius: 16px;
			padding: 5px 10px 4px;
		}

		.tooltip-arrow {
			width: 0;
			height: 0;
			border-style: solid;
			position: absolute;
			margin: 5px;
			border-color: black;
			z-index: 1;
		}

		&[x-placement^="top"] {
			margin-bottom: 5px;

			.tooltip-arrow {
				border-width: 5px 5px 0 5px;
				border-left-color: transparent !important;
				border-right-color: transparent !important;
				border-bottom-color: transparent !important;
				bottom: -5px;
				left: calc(50% - 5px);
				margin-top: 0;
				margin-bottom: 0;
			}
		}

		&[x-placement^="bottom"] {
			margin-top: 5px;

			.tooltip-arrow {
				border-width: 0 5px 5px 5px;
				border-left-color: transparent !important;
				border-right-color: transparent !important;
				border-top-color: transparent !important;
				top: -5px;
				left: calc(50% - 5px);
				margin-top: 0;
				margin-bottom: 0;
			}
		}

		&[x-placement^="right"] {
			margin-left: 5px;

			.tooltip-arrow {
				border-width: 5px 5px 5px 0;
				border-left-color: transparent !important;
				border-top-color: transparent !important;
				border-bottom-color: transparent !important;
				left: -5px;
				top: calc(50% - 5px);
				margin-left: 0;
				margin-right: 0;
			}
		}

		&[x-placement^="left"] {
			margin-right: 5px;

			.tooltip-arrow {
				border-width: 5px 0 5px 5px;
				border-top-color: transparent !important;
				border-right-color: transparent !important;
				border-bottom-color: transparent !important;
				right: -5px;
				top: calc(50% - 5px);
				margin-left: 0;
				margin-right: 0;
			}
		}

		&.popover {
			$color: #f9f9f9;

			.popover-inner {
				background: $color;
				color: black;
				padding: 24px;
				border-radius: 5px;
				box-shadow: 0 5px 30px rgba(black, .1);
			}

			.popover-arrow {
				border-color: $color;
			}
		}

		&[aria-hidden='true'] {
			visibility: hidden;
			opacity: 0;
			transition: opacity .15s, visibility .15s;
		}

		&[aria-hidden='false'] {
			visibility: visible;
			opacity: 1;
			transition: opacity .15s;
		}
	}
	.tooltip-inner {
		max-width: 450px;
		width: 300px;
	}
</style>
