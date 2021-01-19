<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<ScCard>
				<ScCardTitle>Master Data</ScCardTitle>
				<span>{{getBrandList.id}}</span>
				<ScCardBody>
					<ul data-uk-tab="" class="uk-tab">
						<li class="uk-active"><a href="javascript:void(0)" aria-expanded="true" @click="getAllCustomerType()">Customer type</a></li>
						<li><a href="javascript:void(0)" aria-expanded="false" @click="getAllBrand()">Brand</a></li>
						<li><a href="javascript:void(0)" aria-expanded="false" @click="getAllApplications()">Application</a></li>
						<li><a href="javascript:void(0)" aria-expanded="false" @click="getAllSubject()">Subject</a></li>
						<li><a href="javascript:void(0)" aria-expanded="false" @click="getAllCategoryIssue()">Category Issue</a></li>
						<li><a href="javascript:void(0)" aria-expanded="false" @click="getAllTeam()">Assign to (TEAM)</a></li>
						<li><a href="javascript:void(0)" aria-expanded="false" @click="getAllPartner()">Insurance Partner (ในเครือ)</a></li>
						<li><a href="javascript:void(0)" aria-expanded="false" @click="getAllContactGarage()">Insurance Partner (นอกเครือ)</a></li>
						<li><a href="javascript:void(0)" aria-expanded="false" @click="getAllHashtag()">Hashtag</a></li>
						<li><a href="javascript:void(0)" aria-expanded="false" @click="getAllStatus()">Status</a></li>
					</ul>
					<ul class="uk-switcher">
						<!-- Customer Type/ -->
						<li class="uk-active">
							<ScCard>
								<ScCard-header>
									<h4>CREATE CUSTOMER TYPE</h4>
								</ScCard-header>
								<ScCard-body>
									<div class="uk-grid uk-margin-large-bottom uk-margin-large-top" data-uk-grid>
										<div class="uk-width-1-2">
											<label>Customer Type</label>
											<ScInput
												v-model="$v.customerType.$model"
												:error-state="$v.customerType.$error"
												:validator="$v.customerType">
											</ScInput>
										</div>
										<div class="uk-width-1-2">
											<br>
											<button class="sc-button sc-button-primary"
													type="button"
													:disabled="createStatus === 'PENDING'"
													@click="createCustomerType($event)">Save</button>
										</div>
									</div>
								</ScCard-body>
							</ScCard>
							<br>
							<div class="uk-overflow-auto">
								<ScCard>
									<ScCard-header>
										<h5>CUSTOMER TYPE LIST</h5>
									</ScCard-header>
									<ScCardBody>
										<b-table
											:items="getCustomerTypeList"
											:fields="fieldsCustomer">
											<template v-slot:cell(id)="row">
												{{row.index +1}}
											</template>
											<template v-slot:cell(Active)="row">
												<input
													type="checkbox"
													class="uk-checkbox"
													v-model="row.item.used"
													@click="activeData('customerType',row.item.id,$event.target.checked)">
											</template>
											<template v-slot:cell(Edit)="row">
												<a class="sc-button sc-button-warning sc-button-mini" @click="editModal('customerType',row.item)"><i class="mdi mdi-pencil"></i></a>

											</template>
										</b-table>
									</ScCardBody>
								</ScCard>
							</div>
						</li>
						<!-- Brand/-->
						<li>
							<ScCard>
								<ScCard-header>
									<h4>CREATE BRAND</h4>
								</ScCard-header>
								<ScCard-body>
									<div class="uk-grid uk-margin-large-bottom uk-margin-large-top" data-uk-grid>
										<div class="uk-width-1-2">
											<label>Brand</label>
											<ScInput
												v-model="$v.brand.$model"
												:error-state="$v.brand.$error"
												:validator="$v.brand"
											>
											</ScInput>
										</div>
										<div class="uk-width-1-2">
											<br>
											<button class="sc-button sc-button-primary"
													type="button"
													:disabled="createStatus === 'PENDING'"
													@click="createBrand($event)">
												Save
											</button>
										</div>
									</div>
								</ScCard-body>
							</ScCard>
							<br>
							<div class="uk-overflow-auto">
								<ScCard>
									<ScCard-header>
										<h5>BRAND LIST</h5>
									</ScCard-header>
									<ScCardBody>
										<b-table
											:items="getBrandList"
											:fields="fieldsBrand">
											<template v-slot:cell(id)="row">
												{{row.index +1}}
											</template>
											<template v-slot:cell(Active)="row">
												<input
													type="checkbox"
													class="uk-checkbox"
													v-model="row.item.used"
													@click="activeData('brand',row.item.id,$event.target.checked)">
											</template>
											<template v-slot:cell(Edit)="row">
												<a class="sc-button sc-button-warning sc-button-mini" @click="editModal('brand',row.item)"><i class="mdi mdi-pencil"></i></a>
											</template>
										</b-table>
									</ScCardBody>
								</ScCard>
							</div>
						</li>
						<!-- Application/ -->
						<li>
							<ScCard>
								<ScCard-header>
									<h4>CREATE APPLICATION</h4>
								</ScCard-header>
								<ScCard-body>
									<div class="uk-grid uk-margin-large-bottom uk-margin-large-top" data-uk-grid>
										<div class="uk-width-1-2">
											<label>Application</label>
											<ScInput
												v-model="$v.application.$model"
												:error-state="$v.application.$error"
												:validator="$v.application"
											>
											</ScInput>
										</div>
										<div class="uk-width-1-2">
											<br>
											<button class="sc-button sc-button-primary"
													type="button"
													:disabled="createStatus === 'PENDING'"
													@click="createApplication($event)">
												Save
											</button>
										</div>
									</div>
								</ScCard-body>
							</ScCard>
							<br>
							<div class="uk-overflow-auto">
								<ScCard>
									<ScCard-header>
										<h5>APPLICATION LIST</h5>
									</ScCard-header>
									<ScCardBody>
										<b-table
											:items="getApplicationList"
											:fields="fieldsApplication">
											<template v-slot:cell(id)="row">
												{{row.index +1}}
											</template>
											<template v-slot:cell(Active)="row">
												<input
													type="checkbox"
													class="uk-checkbox"
													v-model="row.item.used"
													@click="activeData('application',row.item.id,$event.target.checked)">
											</template>
											<template v-slot:cell(Edit)="row">
												<a class="sc-button sc-button-warning sc-button-mini" @click="editModal('application',row.item)"><i class="mdi mdi-pencil"></i></a>
											</template>
										</b-table>
									</ScCardBody>
								</ScCard>
							</div>
						</li>
						<!-- Subject -->
						<li>
							<ScCard>
								<ScCard-header>
									<h4>CREATE SUBJECT</h4>
								</ScCard-header>
								<ScCard-body>
									<div>
										<b-tabs>
											<transition name="slide-bottom-medium" mode="out-in">
												<b-tab title="Subject">
													<form>
														<div class="uk-grid uk-margin-large-bottom uk-margin-large-top">
															<div class="uk-width-1-2 uk-margin-large-right">
																<label>Subject</label>
																<ScInput
																	v-model="$v.tmpSubject.$model"
																	:error-state="$v.tmpSubject.$error"
																	:validator="$v.tmpSubject"
																>
																</ScInput>
															</div>
														</div>
														<div class="uk-width-1-1 align-content-end">
															<button class="sc-button sc-button-primary"
																	type="button"
																	:disabled="createStatus === 'PENDING'"
																	@click="createMainSubject($event)">
																Save
															</button>
														</div>
													</form>
												</b-tab>
											</transition>
											<transition name="slide-bottom-medium" mode="out-in">
												<b-tab title="Sub-Subject">
													<form>
														<div class="uk-grid uk-margin-large-bottom uk-margin-large-top" data-uk-grid>
															<div class="uk-width-1-2">

																<div class="uk-width-1-1 ">
																	<label for="mainSub">Select Main Subject</label>
																	<select v-model="tmpGroup" name="mainSub" class="form-control" required>
																		<option v-for="item in getMainList" :key="item.id" :value="item.id">{{ item.name }}</option>
																	</select>
																</div>

																<br>
																<div class="uk-width-1-1 ">
																	<label for="subname">Sub-Subject Name</label>
																	<ScInput
																		name="subname"
																		v-model="$v.tmpSubName.$model"
																		:error-state="$v.tmpSubName.$error"
																		:validator="$v.tmpSubName"
																	>
																	</ScInput>
																</div>
															</div>
															<div class="uk-width-1-2">
																<ScCard>
																	<ScCard-header>
																		<label>SLA</label>
																	</ScCard-header>
																	<ScCard-body>
																		<label for="Low">Low</label>
																		<ScInput
																			name="Low"
																			v-model="tmpLow"
																			type="number"
																		></ScInput>
																		<label for="Medium">Medium</label>
																		<ScInput
																			name="medium"
																			v-model="tmpMed"
																			type="number"
																		></ScInput>
																		<label for="High">High</label>
																		<ScInput
																			name="High"
																			v-model="tmpHigh"
																			type="number"
																		></ScInput>
																		<label for="urgent">Urgent</label>
																		<ScInput
																			name="urgent"
																			v-model="tmpUrgent"
																			type="number"
																		></ScInput>

																	</ScCard-body>
																</ScCard>
															</div>
														</div>

														<div class="uk-width-1-1 ">
															<button class="sc-button sc-button-primary uk-align-right"
																	type="button"
																	:disabled="createStatus === 'PENDING'"
																	@click="createSubSubject($event)">
																Save
															</button>
														</div>

													</form>
												</b-tab>
											</transition>
										</b-tabs>
									</div>
								</ScCard-body>
							</ScCard>
							<br>
							<div class="uk-overflow-auto">
								<ScCard>
									<ScCard-header>
										<h5>SUBJECT LIST</h5>
									</ScCard-header>
									<ScCardBody>

										<table class="uk-table uk-table-divider">
											<thead>
												<th>
													<strong>
														<span class="" style="font-size: 18px">Subject Name</span>
													</strong>
												</th>
												<th>
													<strong>
														<span class="" style="font-size: 18px">Sub-Subject Name</span>
													</strong>
												</th>
												<th>
													<strong>
														<span class="" style="font-size: 18px">Type</span>
													</strong>
												</th>
												<th>
													<strong>
														<span class="" style="font-size: 18px">SLA</span>
													</strong>
												</th>
												<th>
													<strong>
														<span style="font-size: 18px">Active</span>
													</strong>
												</th>
												<th class="uk-text-center">
													<strong>
														<span class="" style="font-size: 18px">Edit</span>
													</strong>
												</th>
											</thead>
											<tbody>

											<template  v-for="data in getSubjectList">
												<tr bgcolor="#dcdcdc">
													<td>
														<strong>{{ data.name }}</strong>
													</td>
													<td></td>
													<td>
														<strong>
															{{ data.type }}
														</strong>
													</td>
													<td v-if="data.type === 'SUB'">
														<p>Low: {{ data.SLA.low }} Min</p>
														<p>Medium: {{ data.SLA.medium }} Min</p>
														<p>High: {{ data.SLA.high }} Min</p>
														<p>Urgent: {{ data.SLA.urgent }} Min</p>
													</td>
													<td v-else></td>
													<td>
														<input
															type="checkbox"
															class="uk-checkbox"
															v-model="data.used"
															@click="activeData('subject',data.id,$event.target.checked)">
													</td>
													<td class="uk-text-center">
														<a class="sc-button sc-button-warning sc-button-mini"
														   @click="editModal('subject',data)"
														>
															<i class="mdi mdi-pencil"></i>
														</a>
													</td>
												</tr>

												<tr v-for="sub in data.sub">

													<td></td>
													<td>
														{{ sub.name }}
													</td>
													<td>
														{{ sub.type }}
													</td>
													<td>
														<p>Low: {{ sub.SLA.low }} Min</p>
														<p>Medium: {{ sub.SLA.medium }} Min</p>
														<p>High: {{ sub.SLA.high }} Min</p>
														<p>Urgent: {{ sub.SLA.urgent }} Min</p>
													</td>
													<td>
														<input
															type="checkbox"
															class="uk-checkbox"
															v-model="sub.used"
															@click="activeData('subject',sub.id,$event.target.checked)">
													</td>
													<td class="uk-text-center">
														<a class="sc-button sc-button-primary sc-button-mini"
														   @click="editModal('subSubject',sub)"
														>
															<i class="mdi mdi-pencil"></i>
														</a>
													</td>
												</tr>
											</template>
											</tbody>
										</table>
									</ScCardBody>
								</ScCard>
							</div>
						</li>
						<!-- Category Issue -->
						<li>
							<ScCard>
								<ScCard-header>
									<h4>CREATE CATEGORY ISSUE</h4>
								</ScCard-header>
								<ScCard-body>
									<div class="uk-grid uk-margin-large-bottom uk-margin-large-top" data-uk-grid>
										<div class="uk-width-1-2">
											<label>Category Issue</label>
											<ScInput
												v-model="$v.issue.$model"
												:error-state="$v.issue.$error"
												:validator="$v.issue">
											</ScInput>
										</div>
										<div class="uk-width-1-2">
											<br>
											<button class="sc-button sc-button-primary"
													type="button"
													:disabled="createStatus === 'PENDING'"
													@click="createCategoryIssue($event)">
												Save
											</button>
										</div>
									</div>
								</ScCard-body>
							</ScCard>
							<br>
							<div class="uk-overflow-auto">
								<ScCard>
									<ScCard-header>
										<h5>CATEGORY ISSUE LIST</h5>
									</ScCard-header>
									<ScCardBody>
										<b-table
											:items="getCategoryIssueList"
											:fields="fieldsIssue">
											<template v-slot:cell(id)="row">
												{{row.index +1}}
											</template>
											<template v-slot:cell(Active)="row">
												<input
													type="checkbox"
													class="uk-checkbox"
													v-model="row.item.used"
													@click="activeData('categoryIssue',row.item.id,$event.target.checked)">
											</template>
											<template v-slot:cell(Edit)="row">
												<a class="sc-button sc-button-warning sc-button-mini" @click="editModal('issue',row.item)"><i class="mdi mdi-pencil"></i></a>
											</template>
										</b-table>
									</ScCardBody>
								</ScCard>
							</div>
						</li>
						<!-- Team -->
						<li>
							<ScCard>
								<ScCard-header>
									<h4>CREATE TEAM</h4>
								</ScCard-header>
								<ScCard-body>
									<div class="uk-grid uk-margin-large-bottom uk-margin-large-top" data-uk-grid>
										<div class="uk-width-1-2">
											<label>Team</label>
											<ScInput
												v-model="$v.team.$model"
												:error-state="$v.team.$error"
												:validator="$v.team"
											>
											</ScInput>
										</div>
										<div class="uk-width-1-2">
											<label>Short Name</label>
											<ScInput
												v-model="$v.short.$model"
												:error-state="$v.short.$error"
												:validator="$v.short"
											>
											</ScInput>
										</div>
										<div class="uk-width-1-2">
											<br>
											<button class="sc-button sc-button-primary"
													type="button"
													:disabled="createStatus === 'PENDING'"
													@click="createTeam($event)">
												Save
											</button>
										</div>
									</div>
								</ScCard-body>
							</ScCard>
							<br>
							<div class="uk-overflow-auto">
								<ScCard>
									<ScCard-header>
										<h5>TEAM LIST</h5>
									</ScCard-header>
									<ScCardBody>
										<b-table
											:items="getTeamList"
											:fields="fieldsAssign">
											<template v-slot:cell(id)="row">
												{{row.index +1}}
											</template>
											<template v-slot:cell(Active)="row">
												<input
													type="checkbox"
													class="uk-checkbox"
													v-model="row.item.used"
													@click="activeData('team',row.item.id,$event.target.checked)">
											</template>
											<template v-slot:cell(Edit)="row">
												<a class="sc-button sc-button-warning sc-button-mini" @click="editModal('team',row.item)"><i class="mdi mdi-pencil"></i></a>
											</template>
										</b-table>
									</ScCardBody>
								</ScCard>
							</div>
						</li>
						<!-- Insurance Partner ในเครือ -->
						<li>
							<ScCard>
								<ScCard-header>
									<h4>CREATE INSURANCE PARTNER ในเครือ</h4>
								</ScCard-header>
								<ScCard-body>
									<div class="uk-grid uk-margin-large-bottom uk-margin-large-top" data-uk-grid>
										<div class="uk-width-1-2">
											<label>Insurance Partner ในเครือ</label>
											<ScInput
												v-model="$v.partner.$model"
												:error-state="$v.partner.$error"
												:validator="$v.partner"
											>
											</ScInput>
										</div>
										<div class="uk-width-1-2">
											<br>
											<button class="sc-button sc-button-primary"
													type="button"
													:disabled="createStatus === 'PENDING'"
													@click="createPartner($event)">
												Save
											</button>
										</div>
									</div>
								</ScCard-body>
							</ScCard>
							<br>
							<div class="uk-overflow-auto">
								<ScCard>
									<ScCard-header>
										<h5>INSURANCE PARTNER LIST ในเครือ</h5>
									</ScCard-header>
									<ScCardBody>
										<b-table
											:items="getPartnersList"
											:fields="fieldsInsurance">
											<template v-slot:cell(id)="row">
												{{row.index +1}}
											</template>
											<template v-slot:cell(Active)="row">
												<input
													type="checkbox"
													class="uk-checkbox"
													v-model="row.item.used"
													@click="activeData('insurancePartners',row.item.id,$event.target.checked)">
											</template>
											<template v-slot:cell(Edit)="row">
												<a class="sc-button sc-button-warning sc-button-mini" @click="editModal('partner',row.item)"><i class="mdi mdi-pencil"></i></a>
											</template>
										</b-table>
									</ScCardBody>
								</ScCard>
							</div>
						</li>
<!--						นอกเครือ-->
						<li>
							<ScCard>
								<ScCard-header>
									<h4>CREATE INSURANCE PARTNER นอกเครือ</h4>
								</ScCard-header>
								<ScCard-body>
									<div class="uk-grid uk-margin-large-bottom uk-margin-large-top" data-uk-grid>
										<div class="uk-width-1-2">
											<label>Insurance Partner นอกเครือ</label>
											<ScInput
												v-model="$v.contactGaragePartner.$model"
												:error-state="$v.contactGaragePartner.$error"
												:validator="$v.contactGaragePartner"
											>
											</ScInput>
										</div>
										<div class="uk-width-1-2">
											<br>
											<button class="sc-button sc-button-primary"
													type="button"
													:disabled="createStatus === 'PENDING'"
													@click="createContactGarage($event)">
												Save
											</button>
										</div>
									</div>
								</ScCard-body>
							</ScCard>
							<br>
							<div class="uk-overflow-auto">
								<ScCard>
									<ScCard-header>
										<h5>INSURANCE PARTNER LIST นอกเครือ</h5>
									</ScCard-header>
									<ScCardBody>
										<b-table
											:items="getContactGarageList"
											:fields="fieldsContactGarage">
											<template v-slot:cell(id)="row">
												{{row.index +1}}
											</template>
											<template v-slot:cell(used)="row">
												<input
													type="checkbox"
													class="uk-checkbox"
													v-model="row.item.used"
													@click="activeData('contactedGarage',row.item.id,$event.target.checked)"
												>
											</template>
											<template v-slot:cell(Edit)="row">
												<a class="sc-button sc-button-warning sc-button-mini" @click="editModal('contactedGarage',row.item)"><i class="mdi mdi-pencil"></i></a>
											</template>
										</b-table>
									</ScCardBody>
								</ScCard>
							</div>
						</li>
						<!-- Hashtag -->
						<li>
							<ScCard>
								<ScCard-header>
									<h4>CREATE HASHTAG</h4>
								</ScCard-header>
								<ScCard-body>
									<div class="uk-grid uk-margin-large-bottom uk-margin-large-top" data-uk-grid>
										<div class="uk-width-1-2">
											<label>Hashtag</label>
											<ScInput
												v-model="$v.hashtag.$model"
												:error-state="$v.hashtag.$error"
												:validator="$v.hashtag"
											>
											</ScInput>
										</div>
										<div class="uk-width-1-2">
											<br>
											<button class="sc-button sc-button-primary"
													type="button"
													:disabled="createStatus === 'PENDING'"
													@click="createHashtag($event)">
												Save
											</button>
										</div>
									</div>
								</ScCard-body>
							</ScCard>
							<br>
							<div class="uk-overflow-auto">
								<ScCard>
									<ScCard-header>
										<h5>HASHTAG LIST</h5>
									</ScCard-header>
									<ScCardBody>
										<b-table
											:items="getHashtagList"
											:fields="fieldsHashtag">
											<template v-slot:cell(id)="row">
												{{row.index +1}}
											</template>
											<template v-slot:cell(Active)="row">
												<input
													type="checkbox"
													class="uk-checkbox"
													v-model="row.item.used"
													@click="activeData('hashtag',row.item.id,$event.target.checked)">
											</template>
											<template v-slot:cell(Edit)="row">
												<a class="sc-button sc-button-warning sc-button-mini" @click="editModal('hashtag',row.item)"><i class="mdi mdi-pencil"></i></a>
											</template>
										</b-table>
									</ScCardBody>
								</ScCard>
							</div>
						</li>
<!--						Status Contact-->
						<li>
							<ScCard>
								<ScCard-header>
									<h4>Create Status Contact</h4>
								</ScCard-header>
								<ScCard-body>
									<div class="uk-grid uk-margin-large-bottom uk-margin-large-top" data-uk-grid>
										<div class="uk-width-1-2">
											<label>Status Contact</label>
											<ScInput
												v-model="$v.status.$model"
												:error-state="$v.status.$error"
												:validator="$v.status"
											>
											</ScInput>
										</div>
										<div class="uk-width-1-2">
											<br>
											<button class="sc-button sc-button-primary"
													type="button"
													:disabled="createStatus === 'PENDING'"
													@click="createStatusList($event)"
											>
												Save
											</button>
										</div>
									</div>
								</ScCard-body>
							</ScCard>
							<br/>
							<div class="uk-overflow-auto">
								<ScCard>
									<ScCard-header>
										<h5>STATUS LIST</h5>
									</ScCard-header>
									<ScCardBody>
										<b-table
											:items="getStatusList"
											:fields="fieldsStatus">
											<template v-slot:cell(id)="row">
												{{row.index +1}}
											</template>
											<template v-slot:cell(used)="row">
												<input
													type="checkbox"
													class="uk-checkbox"
													v-model="row.item.used"
													@click="activeData('status',row.item.id,$event.target.checked)">
											</template>
											<template v-slot:cell(Edit)="row">
												<a class="sc-button sc-button-warning sc-button-mini" @click="editModal('status',row.item)"><i class="mdi mdi-pencil"></i></a>
											</template>
										</b-table>
									</ScCardBody>
								</ScCard>
							</div>
						</li>
					</ul>
				</ScCardBody>
			</ScCard>
		</div>
		<b-modal ref="modal-view" size="md" scrollable hide-footer hide-backdrop title="Detail" centered="centered">
			<div class="d-block text-center">
				<template>
					<div>
						<label class="uk-form-label">Edit {{ modalState }}</label>
						<br>
						<ScInput v-model="$v.detail.$model" :error-state="$v.detail.$error" :validator="$v.detail"></ScInput>
						<label v-if="!$v.detail.required" class="sc-vue-errors">Field is required</label>
						<br>

						<div v-if="modalState === 'team'">
							<label>Short Name</label>
							<ScInput v-model="$v.shortName.$model" :error-state="$v.shortName.$error" :validator="$v.shortName"></ScInput>
							<label v-if="!$v.shortName.required" class="sc-vue-errors">Field is required</label>
						</div>

						<div class="text-left" v-if="modalState === 'subSubject'">
							<label>Low</label>
							<ScInput v-model="edLow" type="number"></ScInput>
							<label>Medium</label>
							<ScInput v-model="edMed" type="number"></ScInput>
							<label>High</label>
							<ScInput v-model="edHigh" type="number"></ScInput>
							<label>Urgent</label>
							<ScInput v-model="edUrgent" type="number"></ScInput>
						</div>
						<p class="uk-text-right mt-2">
							<button class="sc-button sc-button-primary" type="button" :disabled="editStatus === 'PENDING'" @click="updateData(detail,editDetail,$event)">
								Update
							</button>
						</p>
					</div>
				</template>
			</div>
		</b-modal>
	</div>
</template>
<script>
	import { scColors } from '~/assets/js/utils';
	import insuranceMain from "./insurance/insuranceMain";
	import ScCard from "../../components/card/components/Card";
	import Buttons from "../src/components/buttons";
	import viewPartner from "./insurance/Details/viewPartner";
	import ScInput from "../../components/Input";
	import { validationMixin } from 'vuelidate'
	import { required } from 'vuelidate/lib/validators'
	import Swal from 'sweetalert2';
	import moment from "moment";
	import Select2 from "../../components/Select2";
	import {extend} from "../../assets/js/utils/helpers";

	export default {
		name: "Master",
		components: {Select2, ScInput, Buttons, ScCard,viewPartner,insuranceMain},
		mixins: [validationMixin],
		data: () => ({
			fieldsCustomer: [
				{key: 'id', label: 'ID'},
				{key: 'name', label: 'Customer-Type'},
				{key: 'Active', label: 'Active'},
				{key: 'Edit', label: 'Edit'}
			],
			fieldsBrand: [
				{key: 'id', label: 'ID'},
				{key: 'name', label: 'Brand'},
				{key: 'Active', label: 'Active'},
				{key: 'Edit', label: 'Edit'}
			],
			fieldsApplication: [
				{key: 'id', label: 'ID'},
				{key: 'name', label: 'Application'},
				{key: 'Active', label: 'Active'},
				{key: 'Edit', label: 'Edit'}
			],
			fieldsSubject: [
				{key: 'id', label: 'ID'},
				{key: 'name', label: 'Subject'},
				{key: 'SLA', label: 'SLA'},
				{key: 'type', label: 'Type'},
				{key: 'Active', label: 'Active'},
				{key: 'Edit', label: 'Edit'}
			],
			fieldsIssue: [
				{key: 'id', label: 'ID'},
				{key: 'name', label: 'Category Issue'},
				{key: 'Active', label: 'Active'},
				{key: 'Edit', label: 'Edit'}
			],
			fieldsAssign: [
				{key: 'id', label: 'ID'},
				{key: 'name', label: 'Assign To'},
				{key: 'shortName', label: 'Short Name'},
				{key: 'Active', label: 'Active'},
				{key: 'Edit', label: 'Edit'}
			],
			fieldsInsurance: [
				{key: 'id', label: 'ID'},
				{key: 'name', label: 'Insurance Partner (ในเครือ)'},
				{key: 'Active', label: 'Active'},
				{key: 'Edit', label: 'Edit'}
			],
			fieldsContactGarage: [
				{key: 'id', label: 'ID'},
				{key: 'name', label: 'Insurance Partner (นอกเครือ)'},
				{key: 'used', label: 'Active'},
				{key: 'Edit', label: 'Edit'}
			],
			fieldsHashtag: [
				{key: 'id', label: 'ID'},
				{key: 'name', label: 'Hashtag'},
				{key: 'Active', label: 'Active'},
				{key: 'Edit', label: 'Edit'}
			],
			slaSelect: [
				{ id: 'urgent' , label: 'Urgent' },
				{ id: 'low' , label: 'Low' },
				{ id: 'medium' , label: 'Medium' },
				{ id: 'high' , label: 'High' }
			],
			fieldsStatus: [
				{key:'id', label: 'ID'},
				{key: 'name', label: 'Status'},
				{key: 'createdAt', label: 'Created At'},
				{key: 'updatedAt', label: 'Updated At'},
				{key: 'used', label: 'Active'},
				{key: 'Edit', label: 'Edit'},
			],
			subjectSla: {
				sla: "",
				slaTime: ""
			},
			subjectsSla: [],

			modalState: "",
			createState: "",
			createStatus: null,
			usedStatus: true,
			customerType: "",
			brand: "",
			application: "",
			team: "",
			short: "",
			hashtag: "",
			partner: "",
			contactGaragePartner: "",
			status: "",
			issue: "",
			errorText: "",
			detail: "",
			shortName: "",
			editDetail: [],
			editStatus: null,
			tmpSubject: "",
			formSubject: {
				subject: ""
			},
			tmpSubName: "",
			tmpUrgent:'',
			tmpLow:'',
			tmpHigh:'',
			tmpMed:'',
			tmpGroup:"",
			formSubSubject: {
				name: "",
				lowSla: "",
				medSla: "",
				highSla: "",
				group:""
			},
			edLow: 0,
			edMed: 0,
			edHigh: 0,
			edUrgent:0,
			subjectLenght: 0,
			getMainList:[],
			sub: {
				sla: '',
				slaTime: 0,
			}
		}),
		validations: {
			customerType: { required },
			brand: { required },
			application: { required },
			team: { required },
			short: { required },
			hashtag: { required },
			partner: { required },
			issue: { required },
			detail: { required },
			shortName: { required },
			tmpSubject : { required },
			tmpSubName: { required },
			tmpGroup: { required },
			status: { required },
			contactGaragePartner: { required }
		},
		mounted() {
			this.getAllCustomerType()
			this.getMainSubject()
			this.mainSubject()
		},
		methods: {
			getAllPartner(){
				this.$masterService.getAllPartner()
			},
			getAllHashtag(){
				this.$masterService.getAllHashtag()
			},
			getAllCustomerType(){
				this.$masterService.getAllCustomerType()
			},
			getAllBrand(){
				this.$masterService.getAllBrand()
			},
			getAllApplications(){
				this.$masterService.getAllApplications()
			},
			getAllCategoryIssue(){
				this.$masterService.getAllCategoryIssue()
			},
			getAllTeam(){
				this.$masterService.getAllTeam()
			},
			getAllSubject(){
				this.$masterService.getAllSubject()
			},
			getMainSubject(){
				this.$masterService.mainSubject()
			},
			getAllStatus(){
				this.$masterService.getAllStatus()
			},
			getAllContactGarage(){
				this.$masterService.getAllContactedGarage()
			},

			createCustomerType(e){
				if (_.isEmpty(this.customerType)){
					e.preventDefault();
					this.$v.$touch();
					if (this.$v.$invalid) {
						this.createStatus = 'ERROR'
						Swal.fire('Warning!','กรุณากรอกข้อมูลให้ครบ', 'warning')
					} else {
						this.createStatus = 'PENDING';
						setTimeout(() => {
							this.createStatus = 'OK'
						}, 500)
					}
				}else {
					if ( !_.some(this.getCustomerTypeList , { 'name': this.customerType })  ){
						this.$masterService.createCustomerType(this.customerType)
							.then(resp => {
								if (!!resp) {
									Swal.fire('Successful!','บันทึกข้อมูลสำเร็จ', 'success')
									this.$store.dispatch('setCauseList', true)
									this.customerType = ""
								}else {
									this.errorText =  resp
									Swal.fire('Error!','บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ !' + errorText, 'error')
								}
							}).catch(error => {
							this.errorText =  error
							Swal.fire('Error!','บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ !' + errorText, 'error')
						})
					}
					else{
						Swal.fire('Error!', 'มีข้อมูลนี้อยู่ในระบบแล้ว ไม่สามารถบันทึกได้ ', 'error')
					}
				}
			},
			createBrand(e){
				if (_.isEmpty(this.brand)){
					e.preventDefault();
					this.$v.$touch();
					if (this.$v.$invalid) {
						this.createStatus = 'ERROR'
						Swal.fire('Warning!','กรุณากรอกข้อมูลให้ครบ', 'warning')
					} else {
						this.createStatus = 'PENDING';
						setTimeout(() => {
							this.createStatus = 'OK'
						}, 500)
					}
				}else {
					if ( !_.some(this.getBrandList , { 'name': this.brand })  ){
						this.$masterService.createBrand(this.brand)
							.then(resp => {
								if (!!resp) {
									Swal.fire('Successful!','บันทึกข้อมูลสำเร็จ', 'success')
									this.$store.dispatch('setBrandList', true)
									this.brand = ""
								}else {
									this.errorText =  resp
									Swal.fire('Error!','บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ !' + errorText, 'error')
								}
							}).catch(error => {
							this.errorText =  error
							Swal.fire('Error!','บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ !' + errorText, 'error')
						})
					}
					else{
						Swal.fire('Error!', 'มีข้อมูลนี้อยู่ในระบบแล้ว ไม่สามารถบันทึกได้ ', 'error')
					}

				}
			},
			createStatusList(e){
				if (_.isEmpty(this.status)){
					e.preventDefault();
					this.$v.$touch();
					if (this.$v.$invalid) {
						this.createStatus = 'ERROR'
						Swal.fire('Warning!','กรุณากรอกข้อมูลให้ครบ', 'warning')
					} else {
						this.createStatus = 'PENDING';
						setTimeout(() => {
							this.createStatus = 'OK'
						}, 500)
					}
				}else {
					if ( !_.some(this.getStatusList , { 'name': this.status })  ){
						this.$masterService.createStatus(this.status)
							.then(resp => {
								if (!!resp) {
									Swal.fire('Successful!','บันทึกข้อมูลสำเร็จ', 'success')
									this.$store.dispatch('setStatusList', true)
									this.status = ""
								}else {
									this.errorText =  resp
									Swal.fire('Error!','บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ !' + errorText, 'error')
								}
							}).catch(error => {
							this.errorText =  error
							Swal.fire('Error!','บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ !' + errorText, 'error')
						})
					}
					else{
						Swal.fire('Error!', 'มีข้อมูลนี้อยู่ในระบบแล้ว ไม่สามารถบันทึกได้ ', 'error')
					}

				}
			},
			createApplication(e){
				if (_.isEmpty(this.application)){
					e.preventDefault();
					this.$v.$touch();
					if (this.$v.$invalid) {
						this.createStatus = 'ERROR'
						Swal.fire('Warning!','กรุณากรอกข้อมูลให้ครบ', 'warning')
					} else {
						this.createStatus = 'PENDING';
						setTimeout(() => {
							this.createStatus = 'OK'
						}, 500)
					}
				}else {
					if ( !_.some(this.getApplicationList , { 'name': this.application })  ){
						this.$masterService.createApplication(this.application)
							.then(resp => {
								if (!!resp) {
									Swal.fire('Successful!','บันทึกข้อมูลสำเร็จ', 'success')
									this.$store.dispatch('setApplicationList', true)
									this.brand = ""
								}else {
									this.errorText =  resp
									Swal.fire('Error!','บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ !' + errorText, 'error')
								}
							}).catch(error => {
							this.errorText =  error
							Swal.fire('Error!','บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ !' + errorText, 'error')
						})
					}
					else{
						Swal.fire('Error!', 'มีข้อมูลนี้อยู่ในระบบแล้ว ไม่สามารถบันทึกได้ ', 'error')
					}


				}
			},
			createCategoryIssue(e){
				if (_.isEmpty(this.issue)){
					e.preventDefault();
					this.$v.$touch();
					if (this.$v.$invalid) {
						this.createStatus = 'ERROR'
						Swal.fire('Warning!','กรุณากรอกข้อมูลให้ครบ', 'warning')
					} else {
						this.createStatus = 'PENDING';
						setTimeout(() => {
							this.createStatus = 'OK'
						}, 500)
					}
				}else {
					if ( !_.some(this.getCategoryIssueList , { 'name': this.issue })  ){
						this.$masterService.createCategoryIssue(this.issue)
							.then(resp => {
								if (!!resp) {
									Swal.fire('Successful!','บันทึกข้อมูลสำเร็จ', 'success')
									this.$store.dispatch('setCategoryIssueList', true)
									this.issue = ""
								}else {
									this.errorText =  resp
									Swal.fire('Error!','บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ !' + errorText, 'error')
								}
							}).catch(error => {
							this.errorText =  error
							Swal.fire('Error!','บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ !' + errorText, 'error')
						})
					}
					else{
						Swal.fire('Error!', 'มีข้อมูลนี้อยู่ในระบบแล้ว ไม่สามารถบันทึกได้ ', 'error')
					}

				}
			},
			createTeam(e){
				if (_.isEmpty(this.team && this.short)){
					e.preventDefault();
					this.$v.$touch();
					if (this.$v.$invalid) {
						this.createStatus = 'ERROR'
						Swal.fire('Warning!','กรุณากรอกข้อมูลให้ครบ', 'warning')
					} else {
						this.createStatus = 'PENDING';
						setTimeout(() => {
							this.createStatus = 'OK'
						}, 500)
					}
				}else {
					if ( !_.some(this.getTeamList , { 'name': this.team })  ){
						this.$masterService.createTeam(this.team,this.short)
							.then(resp => {
								if (!!resp) {
									Swal.fire('Successful!','บันทึกข้อมูลสำเร็จ', 'success')
									this.$store.dispatch('setTeamList', true)
									this.team = ""
									this.short = ""
								}else {
									this.errorText =  resp
									Swal.fire('Error!','บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ !' + errorText, 'error')
								}
							}).catch(error => {
							this.errorText =  error
							Swal.fire('Error!','บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ !' + errorText, 'error')
						})
					}
					else{
						Swal.fire('Error!', 'มีข้อมูลนี้อยู่ในระบบแล้ว ไม่สามารถบันทึกได้ ', 'error')
					}

				}
			},
			createPartner(e){
				if (_.isEmpty(this.partner)){
					e.preventDefault();
					this.$v.$touch();
					if (this.$v.$invalid) {
						this.createStatus = 'ERROR'
						Swal.fire('Warning!','กรุณากรอกข้อมูลให้ครบ', 'warning')
					} else {
						this.createStatus = 'PENDING';
						setTimeout(() => {
							this.createStatus = 'OK'
						}, 500)
					}
				}else {
					if ( !_.some(this.getPartnersList , { 'name': this.partner })  ){
						this.$masterService.createPartner(this.partner)
							.then(resp => {
								if (!!resp) {
									Swal.fire('Successful!','บันทึกข้อมูลสำเร็จ', 'success')
									this.$store.dispatch('setPartnersLists', true)
									this.partner = ""
								}else {
									this.errorText =  resp
									Swal.fire('Error!','บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ !' + errorText, 'error')
								}
							}).catch(error => {
							this.errorText =  error
							Swal.fire('Error!','บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ !' + errorText, 'error')
						})
					}
					else{
						Swal.fire('Error!', 'มีข้อมูลนี้อยู่ในระบบแล้ว ไม่สามารถบันทึกได้ ', 'error')
					}

				}
			},
			createContactGarage(e){
				if (_.isEmpty(this.contactGaragePartner)){
					e.preventDefault();
					this.$v.$touch();
					if (this.$v.$invalid) {
						this.createStatus = 'ERROR'
						Swal.fire('Warning!','กรุณากรอกข้อมูลให้ครบ', 'warning')
					} else {
						this.createStatus = 'PENDING';
						setTimeout(() => {
							this.createStatus = 'OK'
						}, 500)
					}
				}else {
					if ( !_.some(this.getContactGarageList , { 'name': this.contactGaragePartner })  ){
						this.$masterService.createContactGarage(this.contactGaragePartner)
							.then(resp => {
								if (!!resp) {
									Swal.fire('Successful!','บันทึกข้อมูลสำเร็จ', 'success')
									this.$store.dispatch('setPartnersLists', true)
									this.partner = ""
								}else {
									this.errorText =  resp
									Swal.fire('Error!','บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ !' + errorText, 'error')
								}
							}).catch(error => {
							this.errorText =  error
							Swal.fire('Error!','บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ !' + errorText, 'error')
						})
					}
					else{
						Swal.fire('Error!', 'มีข้อมูลนี้อยู่ในระบบแล้ว ไม่สามารถบันทึกได้ ', 'error')
					}

				}
			},
			createHashtag(e){
				if (_.isEmpty(this.hashtag)){
					e.preventDefault();
					this.$v.$touch();
					if (this.$v.$invalid) {
						this.createStatus = 'ERROR'
						Swal.fire('Warning!','กรุณากรอกข้อมูลให้ครบ', 'warning')
					} else {
						this.createStatus = 'PENDING';
						setTimeout(() => {
							this.createStatus = 'OK'
						}, 500)
					}
				}else {
					if ( !_.some(this.getHashtagList , { 'name': this.hashtag })  ){
						this.$masterService.createHashtag(this.hashtag)
							.then(resp => {
								if (!!resp) {
									Swal.fire('Successful!','บันทึกข้อมูลสำเร็จ', 'success')
									this.$store.dispatch('setHashtagList', true)
									this.hashtag = ""
								}else {
									this.errorText =  resp
									Swal.fire('Error!','บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ !' + errorText, 'error')
								}
							}).catch(error => {
							this.errorText =  error
							Swal.fire('Error!','บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ !' + errorText, 'error')
						})
					}
					else{
						Swal.fire('Error!', 'มีข้อมูลนี้อยู่ในระบบแล้ว ไม่สามารถบันทึกได้ ', 'error')
					}

				}
			},
			createMainSubject(e){
				if ( _.isEmpty(this.tmpSubject) ){

					e.preventDefault();
					this.$v.$touch();
					if (this.$v.$invalid) {
						this.createStatus = 'ERROR'
						Swal.fire('Warning!','กรุณากรอกข้อมูลให้ครบ', 'warning')
					} else {
						this.createStatus = 'PENDING';
						setTimeout(() => {
							this.createStatus = 'OK'
						}, 500)
					}

				}else {
					if ( !_.some(this.getSubjectList , { 'name': this.tmpSubject })  ){
						this.formSubject.subject = this.tmpSubject
						this.$masterService.createMainSubject(this.formSubject)
							.then(resp => {
								if (!!resp) {
									Swal.fire('Successful!','บันทึกข้อมูลสำเร็จ', 'success')
									this.$store.dispatch('setSubjectList', true)
									this.mainSubject()

								}else {
									this.errorText =  resp
									Swal.fire('Error!','บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ !' + errorText, 'error')
								}
							}).catch(error => {
							this.errorText =  error
							Swal.fire('Error!','บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ !' + errorText, 'error')
						})
					}
					else{
						Swal.fire('Error!', 'มีข้อมูลนี้อยู่ในระบบแล้ว ไม่สามารถบันทึกได้ ', 'error')
					}

				}
			},
			createSubSubject(e){
				if ( ( _.isEmpty(this.tmpSubName && this.tmpGroup ))){
					e.preventDefault();
					this.$v.$touch();
					if (this.$v.$invalid) {
						this.createStatus = 'ERROR'
						Swal.fire('Warning!','กรุณากรอกข้อมูลให้ครบ', 'warning')
					} else {
						this.createStatus = 'PENDING';
						setTimeout(() => {
							this.createStatus = 'OK'
						}, 500)
					}
				}
				else {
					this.formSubSubject.group = this.tmpGroup
					this.formSubSubject.name = this.tmpSubName
					if ( this.tmpLow === '' || this.tmpLow === null ) {
						this.formSubSubject.lowSla = '0'
					}
					else{
						this.formSubSubject.lowSla = this.tmpLow
					}
					if ( this.tmpMed === '' || this.tmpMed === null ) {
						this.formSubSubject.medSla = '0'
					}
					else{
						this.formSubSubject.medSla = this.tmpLow
					}
					if ( this.tmpHigh === '' || this.tmpHigh === null ) {
						this.formSubSubject.highSla = '0'
					}
					else{
						this.formSubSubject.highSla = this.tmpHigh
					}
					if ( this.tmpUrgent === '' || this.tmpUrgent === null ) {
						this.formSubSubject.urgentSla = '0'
					}
					else{
						this.formSubSubject.urgentSla = this.tmpUrgent
					}
					this.$masterService.createSubSubject(this.formSubSubject)
						.then(resp => {
							if (!!resp) {
								Swal.fire('Successful!','บันทึกข้อมูลสำเร็จ', 'success')
								this.$store.dispatch('setSubjectList', true)
							}else {
								this.errorText =  resp
								Swal.fire('Error!','บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ !' + errorText, 'error')
							}
						}).catch(error => {
						this.errorText =  error
						Swal.fire('Error!','บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ !' + errorText, 'error')
					})
				}
			},

			editModal(state,item){
				this.detail = item.name
				this.editDetail = item
				if ( state === 'subSubject'){
					this.edUrgent = _.toString(this.editDetail.SLA.urgent)
					this.edLow = _.toString(this.editDetail.SLA.low)
					this.edMed = _.toString(this.editDetail.SLA.medium)
					this.edHigh = _.toString(this.editDetail.SLA.high)
				}
				else if ( state === 'team' ){
					this.shortName = this.editDetail.shortName
 				}
				this.modalState = state
				this.$refs['modal-view'].show()
			},

			updateData (data, detail, e) {
				if (this.detail === '' ){
					e.preventDefault();
					this.$v.$touch();
					if (this.$v.$invalid) {
						this.editStatus = 'ERROR'
					} else {
						this.editStatus = 'PENDING';
						setTimeout(() => {
							this.editStatus = 'OK'
						}, 500)
					}
				}
				else {
					if ( this.modalState === 'customerType') {
						if ( !_.some(this.getCustomerTypeList , { 'name': this.detail }) ){
							this.$masterService.updateDataMaster(data,detail,this.modalState,this.usedStatus).then(resp => {
								if (!!resp) {
									Swal.fire('Successful!','บันทึกข้อมูลเรียบร้อยแล้ว', 'success')
									this.$refs['modal-view'].hide()
								}
							}).catch(err => {
								Swal.fire('Error!', 'บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ! <br/>' + err.response.data.message, 'error')
							})
						}
						else{
							Swal.fire('Error!', 'มีข้อมูลนี้อยู่ในระบบแล้ว ไม่สามารถบันทึกได้ ', 'error')
						}
					}
					else if ( this.modalState === 'brand'){
						if ( !_.some(this.getBrandList , { 'name': this.detail }) ){
							this.$masterService.updateDataMaster(data,detail,this.modalState).then(resp => {
								if (!!resp) {
									Swal.fire('Successful!','บันทึกข้อมูลเรียบร้อยแล้ว', 'success')
									this.$refs['modal-view'].hide()
								}
							}).catch(err => {
								Swal.fire('Error!', 'บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ! <br/>' + err.response.data.message, 'error')
							})
						}
						else{
							Swal.fire('Error!', 'มีข้อมูลนี้อยู่ในระบบแล้ว ไม่สามารถบันทึกได้ ', 'error')
						}

					}
					else if ( this.modalState === 'application'){
						if ( !_.some(this.getApplicationList , { 'name': this.detail }) ){
							this.$masterService.updateDataMaster(data,detail,this.modalState).then(resp => {
								if (!!resp) {
									Swal.fire('Successful!','บันทึกข้อมูลเรียบร้อยแล้ว', 'success')
									this.$refs['modal-view'].hide()
								}
							}).catch(err => {
								Swal.fire('Error!', 'บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ! <br/>' + err.response.data.message, 'error')
							})
						}
						else{
							Swal.fire('Error!', 'มีข้อมูลนี้อยู่ในระบบแล้ว ไม่สามารถบันทึกได้ ', 'error')
						}

					}
					else if ( this.modalState === 'issue'){
						if ( !_.some(this.getCategoryIssueList , { 'name': this.detail }) ){
							this.$masterService.updateDataMaster(data,detail,this.modalState).then(resp => {
								if (!!resp) {
									Swal.fire('Successful!','บันทึกข้อมูลเรียบร้อยแล้ว', 'success')
									this.$refs['modal-view'].hide()
								}
							}).catch(err => {
								Swal.fire('Error!', 'บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ! <br/>' + err.response.data.message, 'error')
							})
						}
						else{
							Swal.fire('Error!', 'มีข้อมูลนี้อยู่ในระบบแล้ว ไม่สามารถบันทึกได้ ', 'error')
						}

					}
					else if ( this.modalState === 'team'){
						detail.shortName = this.shortName
						this.$masterService.updateTeam(data,detail).then(resp => {
							if (!!resp) {
								Swal.fire('Successful!','บันทึกข้อมูลเรียบร้อยแล้ว', 'success')
								this.$refs['modal-view'].hide()
							}
						}).catch(err => {
							Swal.fire('Error!', 'บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ! <br/>' + err.response.data.message, 'error')
						})
					}
					else if ( this.modalState === 'partner'){
						if ( !_.some(this.getPartnersList , { 'name': this.detail }) ){
							this.$masterService.updateDataMaster(data,detail,this.modalState).then(resp => {
								if (!!resp) {
									Swal.fire('Successful!','บันทึกข้อมูลเรียบร้อยแล้ว', 'success')
									this.$refs['modal-view'].hide()
								}
							}).catch(err => {
								Swal.fire('Error!', 'บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ! <br/>' + err.response.data.message, 'error')
							})
						}
						else{
							Swal.fire('Error!', 'มีข้อมูลนี้อยู่ในระบบแล้ว ไม่สามารถบันทึกได้ ', 'error')
						}

					}
					else if ( this.modalState === 'contactedGarage'){
						if ( !_.some(this.getContactGarageList , { 'name': this.contactGaragePartner }) ){
							this.$masterService.updateDataMaster(data,detail,this.modalState).then(resp => {
								if (!!resp) {
									Swal.fire('Successful!','บันทึกข้อมูลเรียบร้อยแล้ว', 'success')
									this.$refs['modal-view'].hide()
								}
							}).catch(err => {
								Swal.fire('Error!', 'บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ! <br/>' + err.response.data.message, 'error')
							})
						}
						else{
							Swal.fire('Error!', 'มีข้อมูลนี้อยู่ในระบบแล้ว ไม่สามารถบันทึกได้ ', 'error')
						}

					}
					else if ( this.modalState === 'hashtag'){
						if ( !_.some(this.getHashtagList , { 'name': this.detail }) ){
							this.$masterService.updateDataMaster(data,detail,this.modalState).then(resp => {
								if (!!resp) {
									Swal.fire('Successful!','บันทึกข้อมูลเรียบร้อยแล้ว', 'success')
									this.$refs['modal-view'].hide()
								}
							}).catch(err => {
								Swal.fire('Error!', 'บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ! <br/>' + err.response.data.message, 'error')
							})
						}
						else{
							Swal.fire('Error!', 'มีข้อมูลนี้อยู่ในระบบแล้ว ไม่สามารถบันทึกได้ ', 'error')
						}

					}
					else if ( this.modalState === 'subject'){
						if ( !_.some(this.getSubjectList , { 'name': this.detail }) ){
							this.$masterService.updateDataMaster(data,detail,this.modalState).then(resp => {
								if (!!resp) {
									Swal.fire('Successful!','บันทึกข้อมูลเรียบร้อยแล้ว', 'success')
									this.$refs['modal-view'].hide()
								}
							}).catch(err => {
								Swal.fire('Error!', 'บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ! <br/>' + err.response.data.message, 'error')
							})
						}
						else{
							Swal.fire('Error!', 'มีข้อมูลนี้อยู่ในระบบแล้ว ไม่สามารถบันทึกได้ ', 'error')
						}

					}
					else if ( this.modalState === 'subSubject'){
						detail.SLA.urgent = _.toNumber(this.edUrgent)
						detail.SLA.low = _.toNumber(this.edLow)
						detail.SLA.medium = _.toNumber(this.edMed)
						detail.SLA.high = _.toNumber(this.edHigh)
						this.$masterService.updateSubSubject(data,detail).then(resp => {
							if (!!resp) {
								Swal.fire('Successful!','บันทึกข้อมูลเรียบร้อยแล้ว', 'success')
								this.modalState = ""
								this.$refs['modal-view'].hide()
							}
						}).catch(err => {
							Swal.fire('Error!', 'บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ! <br/>' + err.response.data.message, 'error')
						})
					}
					else if ( this.modalState === 'status'){
						if ( !_.some(this.getStatusList , { 'name': this.status }) ){
							this.$masterService.updateDataMaster(data,detail,this.modalState).then(resp => {
								if (!!resp) {
									Swal.fire('Successful!','บันทึกข้อมูลเรียบร้อยแล้ว', 'success')
									this.$refs['modal-view'].hide()
								}
							}).catch(err => {
								Swal.fire('Error!', 'บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ! <br/>' + err.response.data.message, 'error')
							})
						}
						else{
							Swal.fire('Error!', 'มีข้อมูลนี้อยู่ในระบบแล้ว ไม่สามารถบันทึกได้ ', 'error')
						}

					}
				}
			},

			activeData(state ,id,name ,active) {
				this.$masterAdapter.activeData(state ,id ,name ,active).then(resp => {
					if (resp){
						Swal.fire('Successful!', 'บันทึกข้อมูลสำเร็จ', 'success')
						this.$masterService.reCallMain()
					}
				}).catch(err => {
					Swal.fire('Error!', 'บันทึกข้อมูลไม่สำเร็จ! กรุณาทำรายการใหม่อีกครั้งค่ะ! <br/>' + err.response.data.message, 'error')
				})
			},

			addNewSubSla() {

				this.subjectLenght = this.subjectsSla.length
				if ( this.subjectLenght < 3 ){
					this.subjectsSla.push( $.extend({},this.subjectSla) )
				}
				else{
					Swal.fire('Error!', 'ไม่สามารถเพิ่มข้อมูลได้ เนื่องจากเกินจำนวน SLA ที่กำหนด', 'error')
				}
			},

			removeSubSla(index) {
				this.$delete(this.subjectsSla, index)
			},
			mainSubject(){
				this.$masterService.mainSubject().then(resp => {
					this.getMainList = resp
				})
			}

		},
		watch: {
		},
		computed: {
			getPartnersList(){
				return this.$store.getters.getPartnersList
			},
			getHashtagList(){
				return this.$store.getters.getHashtagList
			},
			getCustomerTypeList(){
				return this.$store.getters.getCustomerTypeList
			},
			getBrandList(){
				return this.$store.getters.getBrandList
			},
			getApplicationList(){
				return this.$store.getters.getApplicationList
			},
			getCategoryIssueList(){
				return this.$store.getters.getCategoryIssueList
			},
			getTeamList(){
				return this.$store.getters.getTeamList
			},
			getSubjectList(){
				return this.$store.getters.getSubjectList
			},
			getStatusList(){
				return this.$store.getters.getStatusList
			},
			getContactGarageList(){
				return this.$store.getters.getContactGarageList
			}
		}
	}
</script>

<style scoped>

</style>
