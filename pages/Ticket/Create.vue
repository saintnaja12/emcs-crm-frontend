<template>
	<div id="sc-page-wrapper">
		<no-ssr>
			<div id="sc-page-top-bar" class="sc-top-bar">
				<div class="sc-top-bar-content uk-flex uk-flex-1">
					<h1 class="sc-top-bar-title uk-text-uppercase uk-flex-1">
						Create Ticket
					</h1>
				</div>
			</div>
		</no-ssr>

		<div id="sc-page-content">
			<div class="uk-flex-center">
				<div class="uk-grid uk-width-1-1@m uk-child-width-1-2@s uk-child-width-1-2@m">
					<div>
						<div class="mb-2">
							<ScCard class="" :collapsed="todoCardCollapsed">
								<ScCardHeader>
									<div class="uk-flex uk-flex-middle">
										<div class="uk-flex-1">
											<ScCardTitle>CONTACT <span style="color: red">*</span></ScCardTitle>
										</div>
										<ScCardActions>
											<a
												href="javascript:void(0)"
												class="sc-actions-icon mdi "
												:class="{'mdi-window-minimize' : !todoCardCollapsed, 'mdi-window-maximize' : todoCardCollapsed }"
												@click.prevent="todoCardCollapsed = !todoCardCollapsed"
											></a>
										</ScCardActions>
									</div>
								</ScCardHeader>
								<ScTransition name="slideUp">
									<ScCardContent v-show="!todoCardCollapsed">
										<ScCardBody style="min-height: 784px">
											<div class="mb-4">
												<a href="javascript:void(0)"
												   class="sc-button sc-button-primary sc-button-social"
												   @click="toggleCompany()">
													<span>ADD NEW COMPANY</span><i class="mdi mdi-plus-box"></i>
												</a>
												<a href="javascript:void(0)"
												   class="sc-button sc-button-primary sc-button-social"
												   @click="togglePersonal()">
													<span>ADD PERSONAL</span><i class="mdi mdi-plus-box"></i>
												</a>
											</div>
											<transition name="slide-bottom-medium" mode="out-in">
												<div class="sc-round sc-border uk-margin sc-padding">
													<b-tabs content-class="mt-3">
														<b-tab title="Company" active>
															<b-row>
																<b-col cols="3">
																	<b-form-group>
																		<b-form-select
																			id="perPageSelect"
																			v-model="compSearchBy"
																			:options="searchCompanyOption"
																		>
																			<template slot="first">
																				<option value=""> - Select search by -</option>
																			</template>
																		</b-form-select>
																	</b-form-group>
																</b-col>
																<b-col cols="6">
																	<b-form-group>
																		<b-form-input
																			v-if="compSearchBy === '' || compSearchBy === null"
																			v-model="companySearchKeyword"
																			disabled='true'
																		></b-form-input>

																		<b-form-input
																			v-else
																			v-model="companySearchKeyword"
																		></b-form-input>

																	</b-form-group>
																</b-col>
																<b-col cols="3">
																	<b-form-group>
																		<a v-if="compSearchBy === '' || compSearchBy === null" class="sc-button sc-button-primary sc-button-social" >
																			<span>SEARCH</span><i
																			class="mdi mdi-magnify"></i>
																		</a>
																		<a v-else v-b-modal.popup-company class="sc-button sc-button-primary sc-button-social" @click="searchCompany()">
																			<span>SEARCH</span><i
																			class="mdi mdi-magnify"></i>
																		</a>
																	</b-form-group>
																</b-col>
															</b-row>
														</b-tab>

														<b-tab title="Personal">
															<b-row>
																<b-col cols="3">
																	<b-form-group>
																		<b-form-select
																			id="perPageSelect"
																			v-model="personalSearchBy"
																			:options="searchPersonalOption"
																		>
																			<template slot="first">
																				<option value=""> - Select search by -</option>
																			</template>
																		</b-form-select>
																	</b-form-group>
																</b-col>
																<b-col cols="6">
																	<b-form-group>
																		<b-form-input
																			v-if="personalSearchBy === '' || personalSearchBy === null"
																			v-model="personalSearchKeyword"
																			disabled='true'
																		></b-form-input>
																		<b-form-input
																			v-else
																			v-model="personalSearchKeyword"
																		></b-form-input>
																	</b-form-group>
																</b-col>
																<b-col cols="3">
																	<b-form-group>
																		<a v-if="personalSearchBy === '' || personalSearchBy === null" class="sc-button sc-button-primary sc-button-social">
																			<span>SEARCH</span><i
																			class="mdi mdi-magnify"></i>
																		</a>

																		<a v-else v-b-modal.popup-personal class="sc-button sc-button-primary sc-button-social" @click="searchPersonal()">
																			<span>SEARCH</span><i
																			class="mdi mdi-magnify"></i>
																		</a>
																	</b-form-group>
																</b-col>
															</b-row>
														</b-tab>
													</b-tabs>
												</div>
											</transition>

											<div>

												<div v-if="formTickets.contactType === 'company'">
													<CompanyCreate v-if="!toggleCompanyView"
																   @contact-company-save-summit="searchCompanyById"></CompanyCreate>
													<CompanyView v-else-if="toggleCompanyView"></CompanyView>
												</div>

												<div v-if="formTickets.contactType === 'personal'">
													<PersonalCreate v-if="!togglePersonalView"
																	@contact-personal-save-summit="searchContactById"></PersonalCreate>
													<PersonalView v-else-if="togglePersonalView"></PersonalView>
												</div>
											</div>
										</ScCardBody>
									</ScCardContent>
								</ScTransition>
							</ScCard>
						</div>
						<div>
							<ScCard class="" :collapsed="todoHistorical">
								<ScCardHeader>
									<div class="uk-flex uk-flex-middle">
										<div class="uk-flex-1">
											<ScCardTitle>HISTORICAL</ScCardTitle>
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
								<ScTransition>
									<ScCardContent v-show="!todoHistorical">
										<ScCardBody style="min-height: 250px">
											<transition name="slide-bottom-medium" mode="out-in">
												<Historical></Historical>
											</transition>
										</ScCardBody>
									</ScCardContent>
								</ScTransition>
							</ScCard>
						</div>

					</div>
					<div>
						<ScCard class="" :collapsed="todoCardTICKET">
							<ScCardHeader>
								<div class="uk-flex uk-flex-middle">
									<div class="uk-flex-1">
										<ScCardTitle>CREATE TICKET</ScCardTitle>
									</div>

									<ScCardActions>
										<a
											href="javascript:void(0)"
											class="sc-actions-icon mdi "
											:class="{'mdi-window-minimize' : !todoCardTICKET, 'mdi-window-maximize' : todoCardTICKET }"
											@click.prevent="todoCardTICKET = !todoCardTICKET"
										></a>
									</ScCardActions>
								</div>
							</ScCardHeader>

							<ScTransition name="slideUp">
								<ScCardContent v-show="!todoCardTICKET">
									<ScCardBody style="min-height: 850px">
										<div class="uk-child-width-1-2@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
											<div>
												<div class="uk-margin">
													<div class="uk-form-controls">
														<label>Service Code</label>
														<ScInput v-if="formTickets.serviceCode !== '' && stampServiceCode === true" disabled="true" v-model="formTickets.serviceCode">
														</ScInput>

														<ScInput v-else v-model="formTickets.serviceCode">
														</ScInput>
													</div>
												</div>
											</div>
											<div>
												<div class="uk-margin">

													<div v-if="formTickets.customerCode !== '' && stampCustomerCode === true" class="uk-form-controls">
														<label>Customer Code</label>
														<ScInput disabled="true" v-model="formTickets.customerCode">
														</ScInput>
													</div>
													<div v-else class="uk-form-controls">
														<label>Customer Code</label>
														<ScInput v-model="formTickets.customerCode">
														</ScInput>
													</div>

												</div>
											</div>
											<div>
												<div class="uk-margin">
													<div class="uk-form-controls">
														<label>Branch</label>

														<ScInput v-if="formTickets.branch !== '' && stampBrand === true" disabled='true' v-model="formTickets.branch"> </ScInput>
														<ScInput v-else v-model="formTickets.branch"> </ScInput>
													</div>
												</div>
											</div>
											<div>
												<div class="uk-margin">

													<div v-if="formTickets.customerCompany !== '' && stampCustomerCompany === true" class="uk-form-controls">
														<label>Customer Company<span style="color: red;">*</span></label>
														<ScInput disabled="true" v-model="formTickets.customerCompany">
														</ScInput>
													</div>

													<div v-else class="uk-form-controls">
														<label>Customer Company<span style="color: red;">*</span></label>
														<ScInput v-model="formTickets.customerCompany">
														</ScInput>
													</div>

												</div>
											</div>

											<div>
												<div class="uk-margin">

													<div v-if="formTickets.customerType !== '' && stampCustomerType === true" class="uk-form-controls">
														<label>Customer Type<span style="color: red;">*</span></label>
														<select
															v-model="formTickets.customerType"
															class="uk-select"
															data-sc-input
															disabled
														>
															<option v-for="(customerType,index) in customerTypeList"
																	:value="customerType.id">{{customerType.name}}
															</option>
														</select>
													</div>
													
													<div v-else class="uk-form-controls">
														<label>Customer Type<span style="color: red;">*</span></label>
														<select
															v-model="formTickets.customerType"
															class="uk-select"
															data-sc-input
														>
															<option v-for="(customerType,index) in customerTypeList"
																	:value="customerType.id">{{customerType.name}}
															</option>
														</select>
													</div>
												</div>
											</div>
											<div>
												<div class="uk-margin">
													<div class="uk-form-controls">
														<label>Brand</label>

														<select
															:disabled="formTickets.customerType !== '5e953437125b915144f92d41'"
															v-model="formTickets.brand"
															class="uk-select" data-sc-input
														>
															<option v-for="(brand,index) in brandList"
																	:value="brand.id">{{brand.name}}
															</option>
														</select>
													</div>
												</div>
											</div>
											<div>
												<div class="uk-margin">
													<div class="uk-form-controls">
														<label>RM/Internal Code</label>
														<ScInput v-model="formTickets.rm">
														</ScInput>
													</div>
												</div>
											</div>
											<div>
												<div class="uk-margin">
													<div class="uk-form-controls">
														<label>Customer Name</label>

														<ScInput v-if="formTickets.customerName !== '' && stampCustomerName === true" disabled="true" v-model="formTickets.customerName"> </ScInput>
														<ScInput v-else v-model="formTickets.customerName"> </ScInput>
													</div>
												</div>
											</div>

											<div>
												<div class="uk-margin">
													<div class="uk-form-controls">
														<div class="autocomplete">
															<label>Region</label>
															<select v-model="region"
																	class="uk-select"
																	data-sc-input
																	@change="getProvinceByRegion(region)"
															>
																<option v-for="(option,index) in regionOption"
																		:value="option.text">{{option.value}}
																</option>
															</select>
														</div>
													</div>
												</div>
											</div>
											<div v-if="region !==''">
												<div class="uk-margin">
													<div class="uk-form-controls">
														<label>Province</label>
														<select
															v-model="formTickets.province"
															class="uk-select"
															data-sc-input
														>
															<option v-for="(province,index) in provinceList"
																	:value="province.text">{{province.value}}
															</option>
														</select>
													</div>
												</div>
											</div>
											<div v-else>
												<div class="uk-margin">
													<div class="uk-form-controls">
														<label>Province</label>
														<select
															v-model="formTickets.province"
															class="uk-select"
															data-sc-input
														>
															<option v-for="(province,index) in provinceList"
																	:value="province.text">{{province.value}}
															</option>
														</select>
													</div>
												</div>
											</div>
											<div>
												<div class="uk-margin">
													<div class="uk-form-controls">
														<label>Application Name<span style="color: red;">*</span></label>
														<select
															v-model="formTickets.appName"
															class="uk-select"
															data-sc-input
														>
															<option v-for="(appName,index) in applicationList"
																	:value="appName.id">{{appName.name}}
															</option>
														</select>
													</div>
												</div>
											</div>
											<div>
												<div class="uk-margin">
													<div class="uk-form-controls">
														<label>Channel<span style="color: red;">*</span></label>
														<select v-model="formTickets.channel"
																class="uk-select"
																data-sc-input
																disabled
														>
															<option v-for="(channel,index) in channelList"
																	:value="channel.id">{{channel.name}}
															</option>
														</select>
													</div>
												</div>
											</div>
											<div>
												<div class="uk-margin">
													<div class="uk-form-controls">
														<label>Category Issue<span style="color: red;">*</span></label>
														<select v-model="formTickets.categoryIssue"
																class="uk-select"
																data-sc-input>
															<option v-for="(categoryIssue,index) in categoryIssueList"
																	:value="categoryIssue.id">{{categoryIssue.name}}
															</option>
														</select>
													</div>
												</div>
											</div>

											<div>
												<div class="uk-margin">
													<div class="uk-form-controls">
														<label>Other Issue</label>
														<ScInput v-model="formTickets.otherIssue">
														</ScInput>
													</div>
												</div>
											</div>
											<div>
												<div class="uk-margin">
													<div class="uk-form-controls">
														<label>Subject<span style="color: red;">*</span></label>
														<select v-model="formTickets.subject"
																class="uk-select"
																data-sc-input
														>
															<option v-for="(subject,index) in subjectList"
																	:value="subject.id">{{subject.name}}
															</option>
														</select>
													</div>
												</div>
											</div>
											<div>
												<div class="uk-margin">
													<div class="uk-form-controls">
														<label>Sub-Subject<span style="color: red;">*</span></label>
														<select v-model="formTickets.subSubject"
																class="uk-select"
																data-sc-input
														>
															<option v-for="(subsubject,index) in subsubjectList"
																	:value="subsubject.id">{{subsubject.name}}
															</option>
														</select>
													</div>
												</div>
											</div>
											<div>
												<div class="uk-margin">
													<div class="uk-form-controls">
														<label>Priority<span style="color: red;">*</span></label>

														<select v-model="formTickets.priority"
																class="uk-select"
																data-sc-input
														>
															<option v-for="(priority,index) in priorityList"
																	:value="priority.key">{{priority.key}}
															</option>
														</select>

													</div>
												</div>
											</div>
											<div>
												<div class="uk-margin">
													<div class="uk-form-controls">
														<label>SLA(Min)<span style="color: red;">*</span></label>
														<ScInput v-model="formTickets.sla" disabled="">
														</ScInput>
													</div>
												</div>
											</div>
										</div>
										<div>
											<div class="uk-margin">
												<div class="uk-form-controls">
												</div>
											</div>
										</div>
										<div>
											<div class="uk-margin">
												<div class="uk-form-controls" style="padding-left: 4px">
													<b-form-checkbox
														id="checkbox-1"
														v-model="formTickets.complain"
														name="checkbox-1"
														value="true"
														unchecked-value="false"
													>
														Complain
													</b-form-checkbox>
												</div>
											</div>
										</div>

										<div>
											<div v-if="formTickets.complain === 'true'" class="uk-margin">
												<label class="uk-form-label uk-margin-mini-bottom">
													Complain :
												</label>
												<div id="editor2"
													 v-quill:myQuillEditor2="editorOption"
													 class="quill-editor"
													 v-model="formTickets.complainNote"
												>
												</div>
											</div>
										</div>
										<div class="uk-child-width-1-1@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
											<div class="uk-margin-top">
												<label class="uk-form-label uk-margin-mini-bottom">
													Description/Detail :
												</label>
												<vue-editor ref="editor1"
															v-model="formTickets.description"
															:config="editorOption"
															useCustomImageHandler
															@image-added="uploadFile"
												>
												</vue-editor>
											</div>

											<div class="uk-margin-top">
												<label>Attach Document</label>
												<div class="uk-child-width-1-2@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
													<div class="uk-width-1-1@l">
														<b-form-file v-model="formTickets.file1"></b-form-file>
													</div>
													<div class="uk-width-1-1@l">
														<b-form-file v-model="formTickets.file2"></b-form-file>
													</div>
													<div class="uk-width-1-1@l">
														<b-form-file v-model="formTickets.file3"></b-form-file>
													</div>
													<div class="uk-width-1-1@l">
														<b-form-file v-model="formTickets.file4"></b-form-file>
													</div>
													<div class="uk-width-1-1@l">
														<b-form-file v-model="formTickets.file5"></b-form-file>
													</div>
													<div class="uk-width-1-1@l">
														<b-form-file v-model="formTickets.file6"></b-form-file>
													</div>
												</div>
											</div>
										</div>
										<div class="uk-child-width-1-2@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
											<div>
												<div class="uk-margin">
													<div class="uk-form-controls">
														<ScInput v-model="formTickets.reqDueDate" v-flatpickr
																 mode="outline">
															<label>Request Due Date<span style="color: red;">*</span></label>
														</ScInput>
													</div>
												</div>
											</div>
											<div>
												<div class="uk-margin">
													<div class="uk-form-controls">
														<ScInput v-model="formTickets.appointment" v-flatpickr
																 mode="outline">
															<label>Appointment Date<span style="color: red;">*</span></label>
														</ScInput>
													</div>
												</div>
											</div>
											<div>
												<div class="uk-margin">
													<div class="uk-form-controls">

														<label v-if="formTickets.continueTo === ''" >Assign to my Team (Agent)<span style="color: red;">*</span></label>
														<label v-else >Assign to my Team (Agent)</label>
														<select v-model="formTickets.assignMyTeam"
																id="form-h-select12"
																class="uk-select"
																data-sc-input
																@change="onChangeAssignTo()"
														>
															<option value="">-- None --</option>
															<option v-for="(assignMyTeam,index) in assignList"
																	:value="assignMyTeam.id"
																	:disabled="assignMyTeamOption"
															>
																{{assignMyTeam.name}}
															</option>
														</select>
													</div>
												</div>
											</div>
											<div>
												<div class="uk-margin">
													<div class="uk-form-controls">
														<label v-if="formTickets.assignMyTeam === ''">Continue (Other Teams)<span style="color: red;">*</span></label>
														<label v-else>Continue (Other Teams)</label>

														<select v-model="formTickets.continueTo"
																id="form-h-select11"
																class="uk-select"
																data-sc-input
																@change="onChangeContinueTo()"
														>
															<option value="">-- None --</option>
															<option v-for="(team,index) in teamList"
																	:value="team.id"
																	:disabled="continueToOption"
															>
																{{team.name}}
															</option>
														</select>
													</div>
												</div>
											</div>
											<div>
												<div class="uk-margin">
													<div class="uk-form-controls">
														<Select2
															v-model="formTickets.hashTag"
															:settings="{ 'width': '100%', 'placeholder': 'Select Hashtag ...', 'closeOnSelect': false }"
															multiple
														>
															<option v-for="(hashTag,index) in hashTagList"
																	:value="hashTag.id">{{hashTag.name}}
															</option>
														</Select2>
													</div>
												</div>
											</div>
											<div>
												<div class="uk-margin uk-form-label">
													Request by (Agent) : {{ formTickets.reqBy }}
												</div>
											</div>
										</div>
										<div class="uk-child-width-1-1@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
											<div
												class="uk-align-right uk-margin-top uk-margin-remove-bottom uk-text-right">
												<a class="sc-button sc-button-primary sc-button-social"
														@click="createTicket(formTickets)">
													<span>SAVE TICKETS</span><i
													class="mdi mdi-content-save-outline"></i>
												</a>
												<nuxt-link :to="{path: '/Ticket'}"
														   class="sc-button sc-button-danger sc-button-social">
													<span>Cancel</span><i class="mdi mdi-close-circle-outline"></i>
												</nuxt-link>
											</div>
										</div>
									</ScCardBody>
								</ScCardContent>
							</ScTransition>
						</ScCard>
					</div>
				</div>
				<div>
					<b-modal id="popup-phone" size="lg" centered hide-footer no-close-on-backdrop no-close-on-esc>
						<b-table
							ref="selectableTable"
							hover
							small
							responsive
							:items="contactByPhoneList"
							:fields="fields"
							scrollable
							@row-selected="getHistory"
							selectable
							select-mode="single"
							:busy="isBusy"
						>
							<template v-slot:cell(phone)="data">
								<span v-if="data.item.phone1">{{data.item.phone1}}<span v-if="data.item.phone2">,</span></span>
								<span v-if="data.item.phone2">{{data.item.phone2}}<span v-if="data.item.phone3">,</span></span>
								<span v-if="data.item.phone3">{{data.item.phone3}}<span v-if="data.item.phone4">,</span></span>
								<span v-if="data.item.phone4">{{data.item.phone4}}<span v-if="data.item.phone5">,</span></span>
								<span v-if="data.item.phone5">{{data.item.phone5}}</span>
							</template>
							<template v-slot:cell(name)="data">
								{{ data.item.companyName ? data.item.companyName: data.item.firstName + '&nbsp;&nbsp;' +  data.item.lastName}}
							</template>
							<template v-slot:cell(type)="data">
								{{ data.item.companyName ? 'Company': 'Personal'}}
							</template>

							
						</b-table>
					</b-modal>

					<b-modal centered hide-footer no-close-on-backdrop no-close-on-esc id="popup-company" ref="modalComp" size="xl" title="Choose Company Contact">
						<b-table
							:fields="fieldsCompany"
							:items="companyPhoneList"
							hover
							small
							responsive
							scrollable
							selectable
							select-mode="single"
							:per-page="keywordComp.limit"
      						:current-page="keywordComp.page"
							@row-selected="selectCompanyById"
							:busy="isBusy"
						>
							<template v-slot:table-busy>
								<div class="text-center text-danger my-2">
								<b-spinner class="align-middle"></b-spinner>
								<strong>Loading...</strong>
								</div>
							</template>
						</b-table>
						<b-pagination
							v-model="keywordComp.page"
							:total-rows="totalCompany"
							:per-page="keywordComp.limit"
							aria-controls="popup-company"
						></b-pagination>
					</b-modal>

					<b-modal centered hide-footer no-close-on-backdrop no-close-on-esc id="popup-personal" ref="modalPerson" size="xl" title="Choose Personal Contact">
						<b-table
							:fields="fieldsPersonal"
							:items="contactNameList"
							hover
							small
							responsive
							scrollable
							selectable
							@row-selected="selectPersonalById"
							select-mode="single"
							:per-page="keyword.limit"
      						:current-page="keyword.page"
							:busy="isBusy"
						>
							<template v-slot:table-busy>
								<div class="text-center text-danger my-2">
								<b-spinner class="align-middle"></b-spinner>
								<strong>Loading...</strong>
								</div>
							</template>

						</b-table>
						<b-pagination
							v-model="keyword.page"
							:total-rows="totalPersonal"
							:per-page="keyword.limit"
							aria-controls="popup-personal"
						></b-pagination>
					</b-modal>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import _ from 'lodash';
    import {validationMixin} from 'vuelidate'
    import {minLength, required} from 'vuelidate/lib/validators'
    import Buttons from '../src/components/buttons'
    import ScInput from '~/components/Input'
    import ScTextarea from '~/components/Textarea'
    import Select2 from "~/components/Select2";
    import {scFakeData} from "~/assets/js/utils";
    import {XlsxTable, XlsxRead, XlsxJson} from '~/node_modules/vue-xlsx/dist/vue-xlsx.es.js'
    import {quillEditor} from 'vue-quill-editor'
    import confirmDatePlugin from "flatpickr/dist/plugins/confirmDate/confirmDate";
    import Historical from "./Historical";
	const {first, last, email} = scFakeData;
    require('~/plugins/velocity.client.js');
    require('~/plugins/jquery');
	import {VueEditor, Quill} from "vue2-editor";
	import Swal from 'sweetalert2';

	if (process.client) {
        require('~/plugins/quill');
        require('~/plugins/flatpickr');
        require('~/assets/js/vendor/jquery.quicksearch.js');
    }
    import PersonalView from '../Contact/Personal/View'
    import CompanyView from '../Contact/Company/View'
    import PersonalCreate from '../Contact/Personal/Create'
    import CompanyCreate from '../Contact/Company/Create'

    export default {
        components: {
            MultiSelect: process.client ? () => import('~/components/Multiselect') : null,
            Buttons,
            ScInput,
            ScTextarea,
            Select2,
            XlsxTable,
            XlsxRead,
            XlsxJson,
            Historical,
            PersonalView,
            CompanyView,
            PersonalCreate,
            CompanyCreate,
			quillEditor,
			VueEditor,
        },
        mixins: [validationMixin],
        data: () => ({
			isBusy: false,
            continueToOption: false,
            assignMyTeamOption: false,
            todoCardCollapsed: false,
            todoCardTICKET: false,
            editUserTransition: false,
            submitStatus: null,
            todoHistorical: false,
			companySearchKeyword: '',
			personalSearchKeyword: '',
            contactNameList: [],
            searchByName: '',
            contactPhoneList: [],
            searchByPhone: '',
            contactEmailList: [],
            searchByEmail: '',
            companyPhoneList: [],
            searchCompanyByPhone: '',
            brandList: [],
            customerTypeList: [],
            provinceList: [],
            region: '',
            regionOption: [
                {text: 'ภาคเหนือ', value: 'ภาคเหนือ'},
                {text: 'ภาคกลาง', value: 'ภาคกลาง'},
                {text: 'ภาคตะวันออกเฉียงเหนือ', value: 'ภาคตะวันออกเฉียงเหนือ'},
                {text: 'ภาคตะวันตก', value: 'ภาคตะวันตก'},
                {text: 'ภาคตะวันออก', value: 'ภาคตะวันออก'},
                {text: 'ภาคใต้', value: 'ภาคใต้'},
			],
			searchCompanyOption: [
				 {text: 'Phone Number', value: 'phone'},
				 {text: 'Company Name', value: 'name'},
			],
			searchPersonalOption: [
				 {text: 'Personal Name', value: 'name'},
				 {text: 'Phone Number', value: 'phone'},
				 {text: 'Email', value: 'email'},
			],
			compSearchBy: '',
			personalSearchBy: '',
            applicationList: [],
            categoryIssueList: [],
            channelList: [
                {id: 'call', name: 'Call'},
                {id: 'app', name: 'App'},
                {id: 'agent', name: 'Agent'},
                {id: 'email', name: 'Email'},
                {id: 'web', name: 'Web'}
            ],
            subjectList: [],
            subsubjectList: [],
            priorityList: [],
            slaVal: '',
            hashTagList: [],
            assignList: [],
            teamList: [],
            formTickets: {
                serviceCode: '',
                customerCode: '',
                branch: '',
                customerCompany: '',
                brand: '',
                customerType: '',
                rm: '',
                customerName: '',
                province: '',
				appName: '',
				region:'',
                channel: '',
                categoryIssue: '',
                otherIssue: '',
                subject: '',
                subSubject: '',
                priority: '',
                sla: '',
                complain: false,
                complainNote: '',
                description: '',
				file1:'',
				file2:'',
				file3:'',
				file4:'',
				file5:'',
				file6:'',
                reqDueDate: '',
                appointment: '',
                assignMyTeam: '',
                continueTo: '',
                hashTag: [],
                reqBy: '',
                contact: '',
                contactType: '',
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
            optionSelect2: {
                ajax: {
                    url: 'https://api.github.com/search/repositories',
                    dataType: 'json',
                }
            },
			contactByPhoneList: [],
			fields: [
				{key: 'phone', label: 'Phone'},
				{key: 'name', label: 'Name'},
				{key: 'type', label: 'Type'}
			],
			fieldsCompany: [
				{key: 'companyName', label: 'Company Name'},
				{key: 'phone1', label: 'Company Phone Number1'},
				{key: 'phone2', label: 'Company Phone Number2'},
				{key: 'phone3', label: 'Company Phone Number3'},
				{key: 'phone4', label: 'Company Phone Number4'},
				{key: 'phone5', label: 'Company Phone Number5'},
			],
			fieldsPersonal: [
				{key: 'firstName', label: 'Personal Firstname'},
				{key: 'lastName', label: 'Personal Lastname'},
				{key: 'phone1', label: 'Phone Number 1'},
				{key: 'phone2', label: 'Phone Number 2'},
				{key: 'phone3', label: 'Phone Number 3'},
				{key: 'email', label: 'Personal Email'},
			],
			keyword:{
				page: 1,
				limit: 50,
				customerType: '',
				province: '',
				region: '',
				insurance: '',
				searchBy: '',
				keyword: '',
				status: '',
				brand: '',
				name: '',
				phone: '',
				email: '',
			},
			totalPersonal: '',
			keywordComp: {
				page: 1,
				limit: 50,
				customerType: '',
				region: '',
				province: '',
				insurance: '',
				searchBy: '',
				keyword: '',
				status: '',
				brand: '',
				phone: '',
				companyName: '',
			},
			totalCompany:'',
			stampServiceCode: false,
			stampCustomerCode: false,
			stampBranch: false,
			stampCustomerCompany: false,
			stampCustomerType: false,
			stampBrand: false,
			stampCustomerName: false
        }),
        validations: {
            getPersonalView: {
                firstname: {
                    required,
                },
                lastname: {
                    required,
                },
                mobile: {
                    required,
                    minLength: minLength(10)
                },
            }
        },
        computed: {
            togglePersonalView() {
                return this.$store.getters.pagePersonalView
            },
            toggleCompanyView() {
                return this.$store.getters.pageCompanyView
            },
            getCompanyById() {
                return this.$store.getters.getCompanyById
            },
            getPersonalView() {
                return this.$store.getters.getPersonalById
            },
            phone: function () {
                return this.$route.query.phone
            },
            editor() {
                return process.client ? require('@ckeditor/ckeditor5-build-classic') : null
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
			userStore() {
				return this.$store.getters.getUserLogin
			},
        },
        mounted() {
            this.getBrand()
            this.getCustomerType()
            this.getCategoryIssue()
            this.getApplicationName()
            this.getSubject()
            this.getTeam()
            this.getHashTag()
            this.getAssignMyTeam()
			this.getContactByPhonePopup()
        },
        methods: {
			getContactByPhonePopup () {
				
            	if (!_.isNil(this.phone)) {
					let loader = this.$loading.show({
						loader: 'spinner'
					})
					this.$contactAdapter.getContactByPhonePopup(this.phone).then(resp => {
						if (!_.isEmpty(resp)) {
							if (resp.length > 1) {
								loader.hide()
								this.contactByPhoneList =  resp
								this.$bvModal.show('popup-phone')
							}else {
								loader.hide()
								this.getHistory(resp)
							}
						}else {
							loader.hide()
							Swal.fire('Warning!', 'ไม่มีข้อมูลของ Contact นี้' +
								'<br>' + 'กรุณาสร้าง Contact หรือเลือก Contact ใหม่', 'warning')
						}
					})
				}else {
					this.formTickets.contactType = ''
				}
			},
			getHistory (data) {
				let loader = this.$loading.show({
					loader: 'spinner'
				})
				if(data[0].companyName){
					loader.hide()
					this.searchCompanyById(data[0]._id)
				}else {
					loader.hide()
					this.searchContactById(data[0].id)
				}
			},
			clearStamp(){
				this.stampServiceCode = false
				this.stampCustomerCode = false
				this.stampBranch = false
				this.stampCustomerCompany = false
				this.stampCustomerType = false
				this.stampBrand = false
				this.stampCustomerName = false
			},
			selectPersonalById(items){
				this.clearStamp()
				this.searchContactById(items[0].id)
				this.$refs.modalPerson.hide()
			},

			selectCompanyById(items){

				
				this.clearStamp()
				this.searchCompanyById(items[0].id)
				this.$refs.modalComp.hide()
			},

			searchCompanyById(id) { 
				this.$contactAdapter.getCompanyViewDataById(id).then(resp => {
					if (!!resp) {
						this.formTickets.contact = resp.id

						if (resp.branch === '' || resp.branch === null) {
							this.formTickets.branch = ''
						}
						else{
							this.formTickets.branch = resp.branch
							this.stampBranch = true
						}

						if (resp.companyName === '' || resp.companyName === null) {
							this.formTickets.customerCompany = ''
						}
						else{
							this.formTickets.customerCompany = resp.companyName
							this.stampCustomerCompany = true
						}

						if (resp.customerType.id === '' || resp.customerType.id === null) {
							this.formTickets.customerType = ''
						}
						else{
							this.formTickets.customerType = resp.customerType.id
							this.stampCustomerType = true
						}

						if (resp.serviceCode === '' || resp.serviceCode === null) {
							this.formTickets.serviceCode = ''
						}
						else{
							this.formTickets.serviceCode = resp.serviceCode
							this.stampServiceCode = true
						}
						
						if (resp.customerCode === '' || resp.customerCode === null) {
							this.formTickets.customerCode = ''
						}
						else{
							this.formTickets.customerCode = resp.customerCode
							this.stampCustomerCode = true
						}

						if (resp.brand.id === '' || resp.brand.id === null) {
							this.formTickets.brand = ''
						}
						else{
							this.formTickets.brand = resp.brand.id
							this.stampBrand = true
						}

						if ( _.isNil(this.$route.query.phone)) {
							this.formTickets.channel = 'agent'
						}
						else{
							this.formTickets.channel = 'call'
						}
						this.formTickets.customerName = ''
						this.formTickets.contactType = 'company'
						this.$store.dispatch('getCompanyById', resp)
						this.$store.dispatch('pageCompanyView', true);
						this.searchByName = ''
						this.searchByPhone = ''
						this.searchByEmail = ''
						this.listTicketByContactId(resp.id)
					} else {
						Swal.fire('Warning!', 'ไม่มีข้อมูลที่ท่านเลือก!', 'warning')
					}
				})
			},
			searchContactById(id) { 
				if (!_.isNil(id)) {
					this.$contactAdapter.getPersonalByid(id).then(resp => {
						if (!!resp) {
							this.formTickets.contact = resp.id
							if (resp.branch === '' || resp.branch === null) {
								this.formTickets.branch = ''
							}
							else{
								this.formTickets.branch = resp.branch
								this.stampBranch = true
							}

							if (resp.firstName === '' || resp.firstName === null) {
								this.formTickets.customerName = ''
							}
							else{
								this.formTickets.customerName = resp.firstName
								this.stampCustomerName = true
							}

							if (resp.customerType.id === '' || resp.customerType.id === null) {
								this.formTickets.customerType = ''
							}
							else{
								this.formTickets.customerType = resp.customerType.id
								this.stampCustomerType = true
							}

							if (resp.brand.id === '' || resp.brand.id === null) {
								this.formTickets.brand = ''
							}
							else{
								this.formTickets.brand = resp.brand.id
								this.stampBrand = true
							}

							if ( _.isNil(this.$route.query.phone)) {
								this.formTickets.channel = 'agent'
							}
							else{
								this.formTickets.channel = 'call'
							}
							this.formTickets.customerCompany = ''
							this.formTickets.serviceCode = ''
							this.formTickets.contactType = 'personal'
							this.$store.dispatch('getPersonalById', resp)
							this.$store.dispatch('pagePersonalView', true);
							this.searchCompanyByPhone = ''
							this.listTicketByContactId(resp.id)
						} else {
							Swal.fire('Warning!', 'ไม่มีข้อมูลที่ท่านเลือก!', 'warning')
						}
					})
				}
			},
			listTicketByContactId(id){
				if(!_.isNil(id)){
					this.$ticketsAdapter.listTicketByContactId(id).then(resp =>{
						this.$store.dispatch('setHistory', resp.data)
					}).catch(err =>{
						this.$swal('Error!','Can not found Ticket<br>'+ err.response.data.message ,'error')
					}).finally(() => {
						this.$bvModal.hide('popup-phone')
					})
				}else{
					this.$bvModal.hide('popup-phone')
					this.$store.dispatch('setHistory', [])
				}
			},
            togglePersonal: function () {
                this.formTickets.contactType = 'personal'
                this.$store.dispatch('pagePersonalView', false);
                this.$store.dispatch('pagePersonalCreate', true);
            },
            toggleCompany: function () {
                this.formTickets.contactType = 'company'
                this.$store.dispatch('pageCompanyView', false);
                this.$store.dispatch('pageCompanyCreate', true);
            },
            getContactType(type) {
            },
            onChange(event) {
                this.file = event.target.files ? event.target.files[0] : null;
            },
            onChangeAssignTo() {
                if (this.formTickets.assignMyTeam !== '') {
                    this.continueToOption = true
                } else {
                    this.continueToOption = false
                }
            },
            onChangeContinueTo() {
                if (this.formTickets.continueTo !== '') {
                    this.assignMyTeamOption = true
                } else {
                    this.assignMyTeamOption = false
                }
			},
			searchPersonal(){
				this.clearBforeSearch('personal')
				let loader = this.$loading.show({
					loader: 'spinner'
				})
				this.isBusy = true
				if ( this.personalSearchBy !== '' || this.personalSearchBy !== null ) {
					if ( this.personalSearchBy == 'name' ) {
						this.keyword.name = this.personalSearchKeyword
					}
					else if ( this.personalSearchBy == 'phone' ){
						this.keyword.phone = this.personalSearchKeyword
					}
					else if ( this.personalSearchBy == 'email' ){
						this.keyword.email = this.personalSearchKeyword
					}
					this.$contactAdapter.searchPersonalList(this.keyword).then(resp => {
						this.totalPersonal = resp.totalAll
						this.contactNameList = resp.data
						loader.hide()
						this.isBusy = false
					})
				}
				else{
					this.$contactAdapter.searchPersonalList(this.keyword).then(resp => {
						this.totalPersonal = resp.totalAll
						this.contactNameList = resp.data
						loader.hide()
						this.isBusy = false
					})
				}
				
			},
			searchCompany(){
				this.clearBforeSearch('company')
				this.isBusy = true
				let loader = this.$loading.show({
					loader: 'spinner'
				})
				if ( this.compSearchBy !== '' ||  this.compSearchBy !== null) {
					if ( this.compSearchBy === 'name' ){
						this.keywordComp.companyName = this.companySearchKeyword
					}
					else if ( this.compSearchBy === 'phone' ){
						this.keywordComp.phone = this.companySearchKeyword
					}
					this.$contactAdapter.searchCompanyList(this.keywordComp).then(resp => {
						this.companyPhoneList = resp.data
						this.totalCompany = resp.totalAll
						loader.hide()
						this.isBusy = false
					})
				}
				else{
					this.$contactAdapter.searchCompanyList(this.keywordComp).then(resp => {
						this.companyPhoneList = resp.data
						this.totalCompany = resp.totalAll
						loader.hide()
						this.isBusy = false
					})
				}
				
			},
			clearBforeSearch(type){
				if ( type === 'personal') {
					this.keyword.page = 1,
					this.keyword.limit = 100,
					this.keyword.customerType = '',
					this.keyword.province = '',
					this.keyword.region = '',
					this.keyword.insurance = '',
					this.keyword.searchBy = '',
					this.keyword.keyword = '',
					this.keyword.status = '',
					this.keyword.brand = '',
					this.keyword.name = '',
					this.keyword.phone = '',
					this.keyword.email = ''
				}
				else if ( type === 'company') {
					this.keywordComp.page= 1,
					this.keywordComp.limit= 100,
					this.keywordComp.customerType= '',
					this.keywordComp.region= '',
					this.keywordComp.province= '',
					this.keywordComp.insurance= '',
					this.keywordComp.searchBy= '',
					this.keywordComp.keyword= '',
					this.keywordComp.status= '',
					this.keywordComp.brand= '',
					this.keywordComp.phone= '',
					this.keywordComp.companyName= ''
				}
				
			},
            getPersonalByName() { //ส่วนดึงไปแสดงใน table ใน modal ในอนาคตใกล้ๆนี้
                this.$ticketsAdapter.getPersonalByName().then(resp => {
                    this.contactNameList = resp
                })
			},
            getPersonalByPhone() {
                this.$ticketsAdapter.getPersonalByPhone().then(resp => {
                    this.contactPhoneList = _.filter(resp, (data) => !_.isNil(data.phone1));
                })
            },
            getPersonalByEmail() {
                this.$ticketsAdapter.getPersonalByEmail().then(resp => {
                    this.contactEmailList = _.filter(resp, (data) => !_.isNil(data.email));
                })
            },
            getCompanyByPhone() {
                this.$ticketsAdapter.getCompanyByPhone().then(resp => {
                    this.companyPhoneList = _.filter(resp, (data) => !_.isEmpty(data.phone1));
                })
            },
            getBrand() {
                this.$masterAdapter.getAllBrand().then(resp => {
                    this.brandList = resp
                })
            },
            getCustomerType() {
                this.$masterAdapter.getAllCustomerTypes().then(resp => {
                    this.customerTypeList = resp
                })
            },
            getCategoryIssue() {
                this.$masterAdapter.getAllCategoryIssue().then(resp => {
                    this.categoryIssueList = resp
                })
            },
            getApplicationName() {
                this.$masterAdapter.getAllApplication().then(resp => {
                    this.applicationList = resp
                })
            },
            getSubject() {
                this.$masterAdapter.getAllSubject().then(resp => {
                    this.subjectList = resp
                })
            },
            getTeam() {
				const nameTeam = this.userStore.team.name
				
                this.$masterAdapter.getAllTeam().then(resp => {
					for (let i = 0; i < resp.length; i++) {
						if ( resp[i].name !== nameTeam ) {
							this.teamList.push(resp[i])
						}
					}
				})
            },
            getHashTag() {
                this.$masterAdapter.getAllHashTag().then(resp => {
                    this.hashTagList = resp
                })
            },
            getAssignMyTeam() {
                this.$masterAdapter.getAllAssignToMyTeam().then(resp => {
                    this.assignList = resp
                })
            },
            getProvinceByRegion(id) {
                this.$contactAdapter.getProvinceByRegion(id).then(resp => {
                    this.provinceList = resp
                })
            },
            createTicket(formTickets) {
            	if (_.isNil(this.formTickets.contact)) {
                    this.$swal("Warning!", "กรุณาเลือก Contact  !", "warning")
                } else if (this.formTickets.contact == '') {
					this.$swal("Warning!", "กรุณาเลือก Contact  !", "warning")
				} else if (this.formTickets.customerType == '' || this.formTickets.appName == '' || this.formTickets.channel == '' || this.formTickets.categoryIssue == '' || this.formTickets.subject == '' || this.formTickets.subSubject == '' || this.formTickets.priority == '' || this.formTickets.reqDueDate == ''  || this.formTickets.appointment == '') {
					this.$swal("Warning!", "บันทึกข้อมูลไม่สำเร็จ กรุณากรอกข้อมูลให้ครบถ้วน!", "warning")
				} else if (this.formTickets.customerType == '5e953437125b915144f92d41' && this.formTickets.brand == '') {
					this.$swal("Warning!", "กรุณาเลือก Brand", "warning")
				} else if (this.formTickets.assignMyTeam == '' && this.formTickets.continueTo == '') {
					this.$swal("Warning!", "กรุณาเลือก Assign to", "warning")
				} else if (isNaN(_.toNumber(formTickets.sla))) {
					this.$swal("Warning!", "ข้อมูล SLA(Min) ไม่ถูกต้อง", "warning")
				} else {
					const data = {
						serviceCode: formTickets.serviceCode,
						customerCode: formTickets.customerCode,
						branch: formTickets.branch,
						customerCompany: formTickets.customerCompany,
						brand: formTickets.brand,
						customerType: formTickets.customerType,
						rm: formTickets.rm,
						customerName: formTickets.customerName,
						region: this.region,
						province: formTickets.province,
						appName: formTickets.appName,
						channel: formTickets.channel,
						categoryIssue: formTickets.categoryIssue,
						otherIssue: formTickets.otherIssue,
						subject: {
							"subject": formTickets.subject,
							"subSubject": formTickets.subSubject,
							"priority": formTickets.priority,
							"sla": Number(formTickets.sla ? formTickets.sla : '0')
						},
						complain: formTickets.complain,
						complainNote: formTickets.complainNote,
						description: formTickets.description,
						file1: formTickets.file1,
						file2: formTickets.file2,
						file3: formTickets.file3,
						file4: formTickets.file4,
						file5: formTickets.file5,
						file6: formTickets.file6,
						reqDueDate: formTickets.reqDueDate,
						appointment: formTickets.appointment,
						assignMyTeam: formTickets.assignMyTeam,
						continueTo: formTickets.continueTo,
						hashtag: formTickets.hashTag,
						reqBy: "Admin UC",//user login
						contactType: formTickets.contactType,
						contact: formTickets.contact,
					}
					this.$ticketsService.createTicket(data).then(resp => {
						if (!!resp) {
							this.$swal("Successful!", "บันทึกข้อมูลสำเร็จ", "success")
							this.$router.push(`/Ticket/View?ticketNo=${resp.id}`)
						}
					}).catch(err => {
						this.$swal("Error!", "บันทึกข้อมูลไม่สำเร็จ กรุณาทำรายการใหม่อีกครั้งค่ะ ! <br>" + err.response.data.message, "error")
					})
				}
            },
            clearData(data) {
                if (data === 'name') {
                    this.searchByPhone = ''
                    this.searchByEmail = ''
                    this.searchCompanyByPhone = ''
                } else if (data === 'phone') {
                    this.searchByName = ''
                    this.searchByEmail = ''
                    this.searchCompanyByPhone = ''
                } else if (data === 'email') {
                    this.searchByName = ''
                    this.searchByPhone = ''
                    this.searchCompanyByPhone = ''
                } else {
                    this.searchByName = ''
                    this.searchByPhone = ''
                    this.searchByEmail = ''
                    this.searchCompanyByPhone = ''
                }
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
        },
        watch: {
            'formTickets.subject'(newData) {
                this.subsubjectList = _.reduce(this.subjectList, (data, sub) => {
                    const subId = _.get(sub, 'id', '')
                    const DataSub = _.get(sub, 'sub', [])
                    if (subId === newData) {
                        data = DataSub
                    }
                    if (_.size(data) === 1) {
                        this.formTickets.subSubject = data[0].id
                    }
                    return data
                }, [])
                this.priorityList = []
            },
            'formTickets.subSubject'(newData) {
                this.priorityList = _.reduce(this.subsubjectList, (data, sla) => {
                    const slaId = _.get(sla, 'id', '')
					const DataSla = _.get(sla, 'SLA', {})
                    if (slaId === newData) {
						if ( DataSla.low !== 0 ) {
							data.push({'key': 'low', 'value': DataSla.low })
						}
						if ( DataSla.medium !== 0 ) {
							data.push({'key': 'medium', 'value': DataSla.medium })
						}
						if ( DataSla.high !== 0 ) {
							data.push({'key': 'high', 'value': DataSla.high })
						}
						if ( DataSla.urgent !== 0 && DataSla.urgent !== undefined && DataSla.urgent !== null ) {
							data.push({'key': 'urgent', 'value': DataSla.urgent })
						}
                    }
                    return data
                }, [])
                this.formTickets.sla = ''
            },
            'formTickets.priority'(newData) {
                this.formTickets.sla = _.reduce(this.priorityList, (data, sla) => {
                    const slaKey = _.get(sla, 'key', '')
                    const dataSla = _.get(sla, 'value', '')
                    if (slaKey === newData) {
                        if (!_.isNil(dataSla)) {
                            data = dataSla.toString()
                        } else {
                            data = dataSla
                        }
                    }
                    return data
                }, [])
            },
        }
    }
</script>

<style lang="scss">
	@import '~scss/vue/_pretty_checkboxes';

	#editor1 {
		min-height: 170px;
	}

	.input {
		border-width: 0 0 1px 0 !important;
		box-shadow: inset 0 0px 0px hsla(0, 0%, 0%, .1) !important;
		border-color: rgba(0, 0, 0, 0.08) !important;
		border-radius: 4px 4px 0 0 !important;

		&:focus {
			border-color: rgba(0, 0, 0, 0.08) !important;
		}
	}

	.container {
		padding: 0px;
	}

	.input-size-default {
		font-size: 0.875rem !important;
	}

	#popup-phone___BV_modal_outer_ {
		z-index: 99999 !important;
	}

	#popup-personal___BV_modal_outer_ {
		z-index: 99999 !important;
	}

	#popup-company___BV_modal_outer_ {
		z-index: 99999 !important;
	}
</style>
