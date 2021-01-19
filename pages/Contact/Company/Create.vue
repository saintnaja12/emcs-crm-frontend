<template>
	<div id="app">
		<ScCard class="uk-margin-mini-top">
			<ScCardBody>
				<p class="sc-text-semibold uk-text-uppercase uk-heading-line">
					<span>ADD COMPANY</span>
				</p>
				<transition name="slide-bottom-medium" mode="out-in">
					<div class="uk-form-stacked">
						<div class="sc-round sc-border uk-margin sc-padding">
							<div class="uk-child-width-1-2@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
								<div class="uk-margin-top uk-width-1-1@l">
									<label v-if="$v.formCompany.companyName.$error" class="uk-form-label sc-vue-errors">
										<i class="mdi mdi-city-variant-outline"></i>
										Company Name / ชื่อบริษัท : *
									</label>
									<label v-else class="uk-form-label">
										<i class="mdi mdi-city-variant-outline"></i>
										Company Name / ชื่อบริษัท : <span style="color: red">*</span>
									</label>
									<ScInput
										id="companyName"
										v-model="$v.formCompany.companyName.$model"
										:error-state="$v.formCompany.companyName.$error"
										:validator="$v.formCompany.companyName"
									></ScInput>
								</div>
								<div class="uk-margin-top uk-width-1-1@l">
									<label v-if="$v.formCompany.branch.$error" class="uk-form-label sc-vue-errors">
										<i class="mdi mdi-home-city-outline"></i>
										Branch / สาขา : *
									</label>
									<label v-else class="uk-form-label">
										<i class="mdi mdi-home-city-outline"></i>
										Branch / สาขา : <span style="color: red">*</span>
									</label>
									<ScInput
										id="branch"
										v-model="$v.formCompany.branch.$model"
										:error-state="$v.formCompany.branch.$error"
										:validator="$v.formCompany.branch"
									></ScInput>
								</div>
								<div>
									<div class="uk-margin">
										<label class="uk-form-label sc-vue-errors"
											   v-if="$v.formCompany.customerType.$error">
											<i class="mdi mdi-account-group-outline"></i>
											Customer Type / ประเภทลูกค้า : *
										</label>
										<label class="uk-form-label" v-else>
											<i class="mdi mdi-account-group-outline"></i>
											Customer Type / ประเภทลูกค้า : <span style="color: red">*</span>
										</label>
										<div class="uk-form-controls">
											<select
												id="customer-Type"
												v-model="$v.formCompany.customerType.$model"
												class="uk-select"
												:validator="$v.formCompany.customerType"
												:error-state="$v.formCompany.customerType.$error"
												data-sc-input
											>
												<option value="">
													ไม่ระบุ
												</option>
												<option
													v-for="option in customerTypeOption"
													v-bind:value="option.value"
												>{{ option.text }}
												</option>
											</select>
										</div>
									</div>
								</div>
								<div v-if="formCompany.customerType === '5e953437125b915144f92d41'">
									<label class="uk-form-label">
										<i class="mdi mdi-tag-outline"></i>
										Brand / ยี่ห้อ :
									</label>
										<select v-model="formCompany.brand" class="uk-select" data-sc-input>
											<option value="">
												ไม่ระบุ
											</option>
											<option
												v-for="option in brandOption"
												v-bind:value="option.value"
											>{{ option.text }}
											</option>
										</select>

								</div>
								<div v-else>
									<label class="uk-form-label">
										<i class="mdi mdi-tag-outline"></i>
										Brand / ยี่ห้อ :
									</label>

									<select disabled='true' v-model="formCompany.brand" class="uk-select" data-sc-input>
										<option value="">
											ไม่ระบุ
										</option>
									</select>

								</div>
								<div>
									<label class="uk-form-label">
										<i class="mdi mdi-account-badge-horizontal-outline"></i>
										Customer Code / รหัสลูกค้า :
									</label>
									<ScInput id="customerCode" v-model="formCompany.customerCode"></ScInput>
								</div>
								<div>
									<label class="uk-form-label">
										<i class="mdi mdi-toolbox-outline"></i>
										Service Code / รหัสบริการ :
									</label>
									<ScInput id="serviceCode" v-model="formCompany.serviceCode"></ScInput>
								</div>

								<div class="uk-margin-top uk-width-1-1@l" v-show="formCompany.customerType !== '5e60b2f2eb907fa8ee105d5c'" >
<!--									<label class="uk-form-label">-->
<!--										<i class="mdi mdi-account-multiple-check"></i>-->
<!--										Insurance Partners :-->
<!--									</label>-->
									<label class="uk-form-label">
										<i class="mdi mdi-account-multiple-check"></i>
										Insurance Partners (ในเครือ) :
									</label>
									<MultiSelect
										v-model="formCompany.insurancePartners"
										:options="msBasicOptions"
									></MultiSelect>
								</div>
								<div class="uk-margin-top uk-width-1-1@l" v-show="formCompany.customerType !== '5e60b2f2eb907fa8ee105d5c'" >
									<!--									<label class="uk-form-label">-->
									<!--										<i class="mdi mdi-account-multiple-check"></i>-->
									<!--										Insurance Partners :-->
									<!--									</label>-->
									<label class="uk-form-label">
										<i class="mdi mdi-account-multiple-check"></i>
										Insurance Partners (นอกเครือ) :
									</label>
									<MultiSelect
										v-model="formCompany.garage"
										:options="garageOption"
									></MultiSelect>
								</div>
								<div class="uk-margin-top uk-width-1-1@l">
									<label class="uk-form-label">
										<i class="mdi mdi-barcode-scan"></i>
										Tax ID / เลขประจำตัวผู้เสียภาษี :
									</label>
									<ScInput id="company" v-model="formCompany.taxId"></ScInput>
								</div>
								<div class="uk-width-1-2@xl">
									<label class="uk-form-label sc-vue-errors" v-if="$v.formCompany.phone1.$error">
										<i class="mdi mdi-cellphone-iphone"></i>
										Office Phone 1 : *
									</label>
									<label class="uk-form-label" v-else>
										<i class="mdi mdi-cellphone-iphone"></i>
										Office Phone 1 : <span style="color: red">*</span>
									</label>
									<ScInput
										id="phone1"
										v-model="$v.formCompany.phone1.$model"
										:error-state="$v.formCompany.phone1.$error"
										:validator="$v.formCompany.phone1"
										v-input-mask="{ 'mask': '9', 'repeat': 10, 'greedy' : false }"
									></ScInput>
								</div>
								<div class="uk-width-1-2@xl">
									<label class="uk-form-label">
										<i class="mdi mdi-cellphone-iphone"></i>
										Office Phone 2 :
									</label>
									<ScInput
										id="phone2"
										v-model="formCompany.phone2"
										v-input-mask="{ 'mask': '9', 'repeat': 10, 'greedy' : false }"
									></ScInput>
								</div>
								<div class="uk-width-1-2@xl">
									<label class="uk-form-label">
										<i class="mdi mdi-cellphone-iphone"></i>
										Office Phone 3 :
									</label>
									<ScInput
										id="phone3"
										v-model="formCompany.phone3"
										v-input-mask="{ 'mask': '9', 'repeat': 10, 'greedy' : false }"
									></ScInput>
								</div>
								<div class="uk-width-1-2@xl">
									<label class="uk-form-label">
										<i class="mdi mdi-cellphone-iphone"></i>
										Office Phone 4 :
									</label>
									<ScInput
										id="phone4"
										v-model="formCompany.phone4"
										v-input-mask="{ 'mask': '9', 'repeat': 10, 'greedy' : false }"
									></ScInput>
								</div>
								<div class="uk-width-1-2@xl">
									<label class="uk-form-label">
										<i class="mdi mdi-cellphone-iphone"></i>
										Office Phone 5 :
									</label>
									<ScInput
										id="phone5"
										v-model="formCompany.phone5"
										v-input-mask="{ 'mask': '9', 'repeat': 10, 'greedy' : false }"
									></ScInput>
								</div>
								<div class="uk-width-1-2@xl">
									<label class="uk-form-label">
										<i class="mdi mdi-fax"></i>
										Fax :
									</label>
									<ScInput id="fax" v-model="formCompany.fax">
									</ScInput>
								</div>
								<div class="uk-width-1-2@xl">
									<label class="uk-form-label">
										<i class="mdi mdi-sitemap"></i>
										Website / เว็บไซต์ :
									</label>
									<ScInput id="website" v-model="formCompany.website">
									</ScInput>
								</div>
								<div class="uk-width-1-2@xl">
									<label class="uk-form-label">
										<i class="mdi mdi-globe-model"></i>
										Country / ประเทศ :
									</label>
									<ScInput id="country" v-model="formCompany.country">
									</ScInput>
								</div>
								<div class="uk-margin-top uk-width-1-1@l">
									<label class="uk-form-label">
										<i class="mdi mdi-file-document-edit-outline"></i>
										Note / บันทึก :
									</label>
									<ScTextarea
										id="remark"
										v-model="formCompany.note"
										:rows="3"
									></ScTextarea>
								</div>
								<div class="uk-width-1-1@xl">
									<label class="uk-form-label">
										<i class="mdi mdi-routes"></i>
										Status / สถานะ <span class="text-danger">*</span> :
									</label>
									<select v-model="formCompany.status.id" class="uk-select" data-sc-input>
										<option
											v-for="option in contactStatus"
											v-bind:value="option.value"
										>{{ option.text }}
										</option>
									</select>
								</div>
							</div>
						</div>
						<p class="sc-text-semibold uk-text-uppercase uk-heading-line">
							<span>ที่อยู่ (ภ.พ.20/หนังสือรับรอง)</span>
						</p>
						<div class="sc-round sc-border uk-margin sc-padding">
							<div class="uk-child-width-1-2@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
								<div class="uk-width-1-2@xl">
									<label class="uk-form-label sc-vue-errors"
										   v-if="$v.formCompany.certAddress.address.$error">
										<i class="mdi mdi-numeric"></i>
										Address / เลขที่ : *
									</label>
									<label class="uk-form-label" v-else>
										<i class="mdi mdi-numeric"></i>
										Address / เลขที่ : <span style="color: red">*</span>
									</label>
									<ScInput
										id="addressNo"
										v-model="$v.formCompany.certAddress.address.$model"
										:error-state="$v.formCompany.certAddress.address.$error"
										:validator="$v.formCompany.certAddress.address"
									></ScInput>
								</div>
								<div class="uk-width-1-2@xl">
									<label class="uk-form-label">
										<i class="mdi mdi-axis"></i>
										Alley / ซอย :
									</label>
									<ScInput id="soi" v-model="formCompany.certAddress.alley"></ScInput>
								</div>
								<div>
									<div>
										<label class="uk-form-label sc-vue-errors"
											   v-if="$v.formCompany.certAddress.subDistrict.$error">
											<i class="mdi mdi-home"></i>
											Subdistrict / แขวง/ตำบล : *
										</label>
										<label class="uk-form-label" v-else>
											<i class="mdi mdi-home"></i>
											Subdistrict / แขวง/ตำบล : <span style="color: red">*</span>
										</label>
										<div class="uk-form-controls">
											<!-- ตำบล/แขวง -->
											<div class="autocomplete">
												<ScInput
													id="subdistrict"
													v-model="$v.formCompany.certAddress.subDistrict.$model"
													:error-state="$v.formCompany.certAddress.subDistrict.$error"
													:validator="$v.formCompany.certAddress.subDistrict"
													@input="searchDataSubDistrict"
												></ScInput>
												<ul class="autocomplete-results" v-if="isOpen">
													<li class="autocomplete-result" v-for="item in provinceList"
														@click="getCertAddressProvinceById(item.id)">
														<b>{{item.district}}</b> {{item.amphoe}} {{item.province}}
														{{item.zipCode}}
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<div>
									<div>
										<label class="uk-form-label sc-vue-errors"
											   v-if="$v.formCompany.certAddress.district.$error">
											<i class="mdi mdi-home"></i>
											District / เขต/อำเภอ : *
										</label>
										<label class="uk-form-label" v-else>
											<i class="mdi mdi-home"></i>
											District / เขต/อำเภอ : <span style="color: red">*</span>
										</label>
										<div class="uk-form-controls">
											<!-- อำเภอ/เขต -->
											<div class="autocomplete">
												<ScInput
													id="district"
													v-model="$v.formCompany.certAddress.district.$model"
													:error-state="$v.formCompany.certAddress.district.$error"
													:validator="$v.formCompany.certAddress.district"
													@input="searchDataDistrict"
												></ScInput>
												<ul class="autocomplete-results" v-if="isOpenDistrict">
													<li class="autocomplete-result" v-for="item in provinceList"
														@click="getCertAddressProvinceById(item.id)">
														{{item.district}} <b>{{item.amphoe}}</b> {{item.province}}
														{{item.zipCode}}
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<div class="uk-margin-top uk-width-1-1@l">
									<label class="uk-form-label sc-vue-errors"
										   v-if="$v.formCompany.certAddress.province.$error">
										<i class="mdi mdi-flag-variant"></i>
										Province / จังหวัด: *
									</label>
									<label class="uk-form-label" v-else>
										<i class="mdi mdi-flag-variant"></i>
										Province / จังหวัด: <span style="color: red">*</span>
									</label>
									<div class="uk-form-controls">
										<div class="autocomplete">
											<ScInput
												id="addressProvince"
												v-model="$v.formCompany.certAddress.province.$model"
												:error-state="$v.formCompany.certAddress.province.$error"
												:validator="$v.formCompany.certAddress.province"
												@input="searchDataProvince"
											></ScInput>
											<ul class="autocomplete-results" v-if="isOpenProvince">
												<li class="autocomplete-result" v-for="item in provinceList"
													@click="getCertAddressProvinceById(item.id)">
													{{item.district}} {{item.amphoe}} <b>{{item.province}}</b>
													{{item.zipCode}}
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div class="uk-margin-top uk-width-1-1@l">
									<label class="uk-form-label sc-vue-errors"
										   v-if="$v.formCompany.certAddress.zipCode.$error">
										<i class="mdi mdi-mailbox"></i>
										Zip Code / รหัสไปรษณีย์ : *
									</label>
									<label class="uk-form-label" v-else>
										<i class="mdi mdi-mailbox"></i>
										Zip Code / รหัสไปรษณีย์ : <span style="color: red">*</span>
									</label>
									<div class="uk-form-controls">
										<!-- รหัสไปรษณีย์ -->
										<div class="autocomplete">
											<ScInput
												id="zipCode"
												v-model="$v.formCompany.certAddress.zipCode.$model"
												:error-state="$v.formCompany.certAddress.zipCode.$error"
												:validator="$v.formCompany.certAddress.zipCode"
												v-input-mask="{ 'mask': '9', 'repeat': 5, 'greedy' : false }"
												@input="searchDataZipCode"
											></ScInput>
											<ul class="autocomplete-results" v-if="isOpenZipCode">
												<li class="autocomplete-result" v-for="item in provinceList"
													@click="getCertAddressProvinceById(item.id)">
													{{item.district}} {{item.amphoe}} {{item.province}} <b>{{item.zipCode}}</b>
												</li>
											</ul>
											<ScInput id="region" v-model="formCompany.certAddress.region" hidden></ScInput>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div v-show="formCompany.customerType !== '5e60b2f2eb907fa8ee105d5c'" >
							<p class="sc-text-semibold uk-text-uppercase uk-heading-line">
								<span>ที่ตั้ง (งานตัวถังสี/อื่นๆ)</span>
							</p>

							<div class="sc-round sc-border uk-margin sc-padding" >
								<div class="uk-child-width-1-2@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
									<div class="uk-width-1-2@xl">
										<label class="uk-form-label">
											<i class="mdi mdi-numeric"></i>
											Address / เลขที่ :
										</label>
										<ScInput id="addressNo1" v-model="formCompany.otherAddress.address"></ScInput>
									</div>
									<div class="uk-width-1-2@xl">
										<label class="uk-form-label">
											<i class="mdi mdi-axis"></i>
											Alley / ซอย :
										</label>
										<ScInput id="soi1" v-model="formCompany.otherAddress.alley"></ScInput>
									</div>
									<div>
										<div>
											<label class="uk-form-label">
												<i class="mdi mdi-home"></i>
												Subdistrict / แขวง/ตำบล :
											</label>
											<div class="uk-form-controls">
												<!-- ตำบล/แขวง -->
												<div class="autocomplete">
													<ScInput id="otherAddressSubDistrict"
															 v-model="formCompany.otherAddress.subDistrict"
															 @input="searchDataOtherSubDistrict"></ScInput>
													<ul class="autocomplete-results" v-if="isOpenOther">
														<li class="autocomplete-result" v-for="item in provinceList"
															@click="getOtherAddressProvinceById(item.id)">
															<b>{{item.district}}</b> {{item.amphoe}} {{item.province}}
															{{item.zipCode}}
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
									<div>
										<div>
											<label class="uk-form-label">
												<i class="mdi mdi-home"></i>
												District / เขต/อำเภอ :
											</label>
											<div class="uk-form-controls">
												<!-- อำเภอ/เขต -->
												<div class="autocomplete">
													<ScInput id="otherAddressDistrict"
															 v-model="formCompany.otherAddress.district"
															 @input="searchDataOtherDistrict"></ScInput>
													<ul class="autocomplete-results" v-if="isOpenDistrictOther">
														<li class="autocomplete-result" v-for="item in provinceList"
															@click="getOtherAddressProvinceById(item.id)">
															{{item.district}} <b>{{item.amphoe}}</b> {{item.province}}
															{{item.zipCode}}
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
									<div class="uk-margin-top uk-width-1-1@l">
										<label class="uk-form-label">
											<i class="mdi mdi-flag-variant"></i>
											Province / จังหวัด:
										</label>
										<div class="uk-form-controls">
											<div class="autocomplete">
												<ScInput id="otherAddressProvince"
														 v-model="formCompany.otherAddress.province"
														 @input="searchDataOtherProvince"></ScInput>
												<ul class="autocomplete-results" v-if="isOpenProvinceOther">
													<li class="autocomplete-result" v-for="item in provinceList"
														@click="getOtherAddressProvinceById(item.id)">
														{{item.district}} {{item.amphoe}} <b>{{item.province}}</b>
														{{item.zipCode}}
													</li>
												</ul>
											</div>

										</div>
									</div>
									<div class="uk-margin-top uk-width-1-1@l">
										<label class="uk-form-label">
											<i class="mdi mdi-mailbox"></i>
											Zip Code / รหัสไปรษณีย์ :
										</label>
										<div class="uk-form-controls">
											<!-- รหัสไปรษณีย์ -->
											<div class="autocomplete">
												<ScInput id="otherAddressZipCode" v-model="formCompany.otherAddress.zipCode"
														 v-input-mask="{ 'mask': '9', 'repeat': 5, 'greedy' : false }"
														 @input="searchDataOtherZipCode"></ScInput>
												<ul class="autocomplete-results" v-if="isOpenZipCodeOther">
													<li class="autocomplete-result" v-for="item in provinceList"
														@click="getOtherAddressProvinceById(item.id)">
														{{item.district}} {{item.amphoe}} {{item.province}} <b>{{item.zipCode}}</b>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>


						<p class="sc-text-semibold uk-text-uppercase uk-heading-line">
							<span>Invoice Address</span>
						</p>
						<div class="sc-round sc-border uk-margin sc-padding">
							<div class="uk-child-width-1-2@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
								<div class="uk-width-1-2@xl">
									<label class="uk-form-label">
										<i class="mdi mdi-numeric"></i>
										Address / เลขที่ :
									</label>
									<ScInput id="addressNo2" v-model="formCompany.invoiceAddress.address"></ScInput>
								</div>
								<div class="uk-width-1-2@xl">
									<label class="uk-form-label">
										<i class="mdi mdi-axis"></i>
										Alley / ซอย :
									</label>
									<ScInput id="soi2" v-model="formCompany.invoiceAddress.alley"></ScInput>
								</div>
								<div>
									<div>
										<label class="uk-form-label">
											<i class="mdi mdi-home"></i>
											Subdistrict / แขวง/ตำบล :
										</label>
										<div class="uk-form-controls">
											<!-- ตำบล/แขวง -->
											<div class="autocomplete">
												<ScInput id="invoiceAddressSubDistrict"
														 v-model="formCompany.invoiceAddress.subDistrict"
														 @input="searchDataInSubDistrict"></ScInput>
												<ul class="autocomplete-results" v-if="isOpenIn">
													<li class="autocomplete-result" v-for="item in provinceList"
														@click="getInAddressProvinceById(item.id)">
														<b>{{item.district}}</b> {{item.amphoe}} {{item.province}}
														{{item.zipCode}}
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<div>
									<div>
										<label class="uk-form-label">
											<i class="mdi mdi-home"></i>
											District / เขต/อำเภอ :
										</label>
										<div class="uk-form-controls">
											<!-- อำเภอ/เขต -->
											<div class="autocomplete">
												<ScInput id="invoiceAddressDistrict"
														 v-model="formCompany.invoiceAddress.district"
														 @input="searchDataInDistrict"></ScInput>
												<ul class="autocomplete-results" v-if="isOpenDistrictIn">
													<li class="autocomplete-result" v-for="item in provinceList"
														@click="getInAddressProvinceById(item.id)">
														{{item.district}} <b>{{item.amphoe}}</b> {{item.province}}
														{{item.zipCode}}
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<div class="uk-margin-top uk-width-1-1@l">
									<label class="uk-form-label">
										<i class="mdi mdi-flag-variant"></i>
										Province / จังหวัด:
									</label>
									<div class="uk-form-controls">
										<div class="autocomplete">
											<ScInput id="invoiceAddressProvince"
													 v-model="formCompany.invoiceAddress.province"
													 @input="searchDataInProvince"></ScInput>
											<ul class="autocomplete-results" v-if="isOpenProvinceIn">
												<li class="autocomplete-result" v-for="item in provinceList"
													@click="getInAddressProvinceById(item.id)">
													{{item.district}} {{item.amphoe}} <b>{{item.province}}</b>
													{{item.zipCode}}
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div class="uk-margin-top uk-width-1-1@l">
									<label class="uk-form-label">
										<i class="mdi mdi-mailbox"></i>
										Zip Code / รหัสไปรษณีย์ :
									</label>
									<div class="uk-form-controls">
										<div class="autocomplete">
											<ScInput id="invoiceAddressZipCode"
													 v-model="formCompany.invoiceAddress.zipCode"
													 v-input-mask="{ 'mask': '9', 'repeat': 5, 'greedy' : false }"
													 @input="searchDataInZipCode"></ScInput>
											<ul class="autocomplete-results" v-if="isOpenZipCodeIn">
												<li class="autocomplete-result" v-for="item in provinceList"
													@click="getInAddressProvinceById(item.id)">
													{{item.district}} {{item.amphoe}} {{item.province}} <b>{{item.zipCode}}</b>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
						<p class="sc-text-semibold uk-text-uppercase uk-heading-line">
							<span>Attach Files</span>
						</p>
						<div class="sc-round sc-border uk-margin sc-padding">
							<div class="uk-child-width-1-2@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
								<div class="uk-width-1-1@l">
									<b-form-file v-model="formCompany.file1"></b-form-file>
								</div>
								<div class="uk-width-1-1@l">
									<b-form-file v-model="formCompany.file2"></b-form-file>
								</div>
								<div class="uk-width-1-1@l">
									<b-form-file v-model="formCompany.file3"></b-form-file>
								</div>
								<div class="uk-width-1-1@l">
									<b-form-file v-model="formCompany.file4"></b-form-file>
								</div>
								<div class="uk-width-1-1@l">
									<b-form-file v-model="formCompany.file5"></b-form-file>
								</div>
							</div>
						</div>

						<a href="javascript:void(0)" class="sc-button sc-button-primary sc-button-social"
						   :disabled="submitStatus === 'PENDING'" @click="createCompany($event)">
							<span>SAVE</span><i class="mdi mdi-content-save-outline"></i>
						</a>
						<a href="javascript:void(0)" class="sc-button sc-button-danger sc-button-social"
						   @click="toggleData">
							<span>Cancel</span><i class="mdi mdi-close-circle-outline"></i>
						</a>
					</div>
				</transition>
			</ScCardBody>
		</ScCard>
	</div>
</template>

<script>

    import ScInput from '~/components/Input'
    import ScTextarea from '~/components/Textarea'
    import {Subject, EMPTY, from, of} from 'rxjs'
    import {mergeMap, debounceTime, tap, catchError} from 'rxjs/operators'
    import _ from "lodash";
    import {validationMixin} from 'vuelidate'
    import {required, minLength} from 'vuelidate/lib/validators'

    if (process.client) {
        require('~/plugins/inputmask');
    }
    export default {
        components: {
            ScInput,
            ScTextarea,
            MultiSelect: process.client ? () => import('~/components/Multiselect') : null
        },
        data: () => ({
            submitStatus: null,
            formCompany: {
            	companyName: '',
				branch: '',
				insurancePartners: [],
				phone1: '',
				phone2: '',
				phone3: '',
				phone4: '',
				phone5: '',
				customerType: '',
				brand: '',
				customerCode: '',
				serviceCode:'',
				taxId: '',
				fax: '',
				website: '',
				country: '',
				note: '',
				status: {
					id: '',
					name:''
				},
				certAddress: {
            		address: '',
					alley: '',
					subDistrict: '',
					district: '',
					province: '',
					zipCode: ''
				},
				otherAddress: {
            		address: '',
					alley: '',
					subDistrict: '',
					district: '',
					province: '',
					zipCode: ''
				},
				invoiceAddress: {
            		address: '',
					alley: '',
					subDistrict: '',
					district: '',
					province: '',
					zipCode: ''
				},
				file1 : {
            		success: '',
					data: {
            			link:''
					},
					alt: ''
				},
				file2 : {
					success: '',
					data: {
						link:''
					},
					alt: ''
				},
				file3 : {
					success: '',
					data: {
						link:''
					},
					alt: ''
				},
				file4 : {
					success: '',
					data: {
						link:''
					},
					alt: ''
				},
				file5 : {
					success: '',
					data: {
						link:''
					},
					alt: ''
				},
				garage:''
			},
			contactStatus: [],
            brandOption: [],
            customerTypeOption: [],
            insuranceOption: [],
            countryOption: [
                {text: 'ไทย', value: 'ไทย'},
                {text: 'ลาว', value: 'ลาว'},
                {text: 'เวียดนาม', value: 'เวียดนาม'},
            ],
            provinceList: [],
            searchSubDistrict: '',
            searchDistrict: '',
            searchProvince: '',
            searchZipCode: '',
            isOpen: false,
            isOpenDistrict: false,
            isOpenProvince: false,
            isOpenZipCode: false,
            isOpenOther: false,
            isOpenDistrictOther: false,
            isOpenProvinceOther: false,
            isOpenZipCodeOther: false,
            isOpenIn: false,
            isOpenDistrictIn: false,
            isOpenProvinceIn: false,
            isOpenZipCodeIn: false,
			statusOption: [
				{text: 'Active', value: 'active'},
				{text: 'In Active', value: 'inactive'},
				{text: 'Locked', value: 'locked'}
			],
			outsideGarageOption: [],
        }),
        mixins: [validationMixin],
        validations: {
            formCompany: {
                companyName: {
                    required,
                },
                branch: {
                    required,
                },
				phone1: {
                    required,
                    minLength: minLength(9)
                },
                customerType: {
                    required
                },
                certAddress: {
                    address: {
                        required,
                    },
                    subDistrict: {
                        required
                    },
                    district: {
                        required
                    },
                    province: {
                        required
                    },
                    zipCode: {
                        required
                    }
				},
				status: {
					id: {
						required
					}
				}
            }
        },
        created() {
            this.searchSubDistrict$ = new Subject()
            this.searchDistrict$ = new Subject()
            this.searchProvince$ = new Subject()
            this.searchZipCode$ = new Subject()
        },
        computed: {
            msBasicOptions() {
                const result = []
                const item = this.insuranceOption
                _.forEach(item, (data) => {
                    result.push({
                        'value': data.id,
                        'text': data.name,
                    })
                })
                return result
            },
			garageOption() {
				const result = []
				const item = this.outsideGarageOption
				_.forEach(item, (data) => {
					result.push({
						'value': data.id,
						'text': data.name,
					})
				})
				return result
			},
        },
        mounted() {
            this.initObservableSubjectsSubDistrict()
            this.initObservableSubjectsDistrict()
            this.initObservableSubjectsProvince()
            this.initObservableSubjectsZipCode()
            this.getCustomerType()
            this.getBrand()
			this.getInsurance()
			this.getContactStatus()
			this.getOutsideGarage()
        },
        methods: {
            toggleData() {
                this.$store.dispatch('pageCompanyView', true);
                this.$store.dispatch('pageCompanyCreate', false);
            },
            createCompany(e) {
            	let loader = this.$loading.show({
					loader: 'spinner'
				})
                e.preventDefault();
                this.$v.$touch();
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
					loader.hide()
                    this.$swal("Warning", "กรุณากรอกข้อมูลให้ครบถ้วน", "warning")
                } else {
                    this.submitStatus = 'PENDING';
                    setTimeout(() => {
                        this.submitStatus = 'OK'
                    }, 500)
                    this.$contactService.createCompany(this.formCompany).then(resp => {
                        if (resp) {
							loader.hide()
                            this.$swal("Successful!", "บันทึกข้อมูลสำเร็จ", "success")
                            this.$emit('contact-company-save-summit',resp)
							this.clearFormCreate()
							this.$parent.getContactCompanyList()
                        }
                    }).catch(err => {
                    	loader.hide()
                        this.$swal("Error!", "บันทึกข้อมูลไม่สำเร็จ กรุณาทำรายการใหม่อีกครั้งค่ะ ! <br>" + err, "error")
                    })
                }
            },
            clearFormCreate() {
                this.formCompany.companyName = ''
                this.formCompany.branch = ''
                this.formCompany.customerType = []
                this.formCompany.brand = []
                this.formCompany.customerCode = ''
                this.formCompany.serviceCode = ''
                this.formCompany.insurancePartners = []
                this.formCompany.taxId = ''
                this.formCompany.phone1 = ''
                this.formCompany.phone2 = ''
                this.formCompany.phone3 = ''
                this.formCompany.phone4 = ''
                this.formCompany.phone5 = ''
                this.formCompany.fax = ''
                this.formCompany.website = ''
                this.formCompany.country = ''
                this.formCompany.note = ''
                this.formCompany.status = ''
                this.formCompany.certAddress.address = ''
                this.formCompany.certAddress.alley = ''
                this.formCompany.certAddress.district = ''
                this.formCompany.certAddress.subDistrict = ''
                this.formCompany.certAddress.province = ''
                this.formCompany.certAddress.zipCode = ''
                this.formCompany.certAddress.region = ''
                this.formCompany.otherAddress.alley = ''
                this.formCompany.otherAddress.district = ''
                this.formCompany.otherAddress.subDistrict = ''
                this.formCompany.otherAddress.province = ''
                this.formCompany.otherAddress.zipCode = ''
                this.formCompany.invoiceAddress.address = ''
                this.formCompany.invoiceAddress.alley = ''
                this.formCompany.invoiceAddress.district = ''
                this.formCompany.invoiceAddress.subDistrict = ''
                this.formCompany.invoiceAddress.province = ''
                this.formCompany.invoiceAddress.zipCode = ''
                this.formCompany.file1 = ''
                this.formCompany.file2 = ''
                this.formCompany.file3 = ''
                this.formCompany.file4 = ''
                this.formCompany.file5 = ''

            },
            getCustomerType() {
                this.$masterAdapter.getAllCustomerTypes().then(resp => {
                    this.customerTypeOption = resp
                })
            },
            getBrand() {
                this.$masterAdapter.getAllBrand().then(resp => {
                    this.brandOption = resp
                })
            },
            getInsurance() {
                this.$masterAdapter.getAllPartner().then(resp => {
                    this.insuranceOption = resp
                })
            },
			getOutsideGarage() {
				this.$masterAdapter.getAllContactedGarage().then(resp => {
					this.outsideGarageOption = resp
				})
			},
            searchDataSubDistrict(keyword) {
                this.isOpen = true;
                this.keyword = keyword
                this.searchSubDistrict$.next(this.keyword)
            },
            searchDataOtherSubDistrict(keyword) {
                this.isOpenOther = true;
                this.keyword = keyword
                this.searchSubDistrict$.next(this.keyword)
            },
            searchDataInSubDistrict(keyword) {
                this.isOpenIn = true;
                this.keyword = keyword
                this.searchSubDistrict$.next(this.keyword)
            },
            initObservableSubjectsSubDistrict() {
                this.searchSubDistrict$.pipe(
                    debounceTime(1200),
                    mergeMap((keyword) => {
                        return from(this.$contactService.searchSubDistrict(keyword)).pipe(
                            catchError(e => {
                                return of(e)
                            }),
                        )
                    }),
                    tap(result => {
						if(result.total === 0 && this.keyword !== ''){
							this.$swal.fire({
								title:'Warning!',
								text:'ตำบลนี้ไม่มีในระบบ กรุณากรอกข้อมูลให้ถูกต้องค่ะ !',
								icon:'warning'
							}).then((resp) => {
								this.formCompany.certAddress.subDistrict = ''
							})
							this.provinceList = result.data
						}else {
							this.provinceList = result.data
						}
                    }),
                    catchError(e => {
                        return EMPTY
                    }),
                ).subscribe(result => {
					if(result.total === 0 && this.keyword !== ''){
						this.$swal.fire({
							title:'Warning!',
							text:'ตำบลนี้ไม่มีในระบบ กรุณากรอกข้อมูลให้ถูกต้องค่ะ !',
							icon:'warning'
						})
						this.formCompany.certAddress.subDistrict = ''
					}else {
						this.provinceList = result.data
					}
                })
            },

            searchDataDistrict(keyword) {
                this.isOpenDistrict = true;
                this.keyword = keyword
                this.searchDistrict$.next(this.keyword)
            },
            searchDataOtherDistrict(keyword) {
                this.isOpenDistrictOther = true;
                this.keyword = keyword
                this.searchDistrict$.next(this.keyword)
            },
            searchDataInDistrict(keyword) {
                this.isOpenDistrictIn = true;
                this.keyword = keyword
                this.searchDistrict$.next(this.keyword)
            },

            initObservableSubjectsDistrict() {
                this.searchDistrict$.pipe(
                    debounceTime(1200),
                    mergeMap((keyword) => {
                        return from(this.$contactService.searchDistrict(keyword)).pipe(
                            catchError(e => {
                                return of(e)
                            }),
                        )
                    }),
                    tap(result => {
						if(result.total === 0 && this.keyword !== ''){
							this.$swal("Warning!", "อำเภอนี้ไม่มีในระบบ กรุณากรอกข้อมูลให้ถูกต้องค่ะ !", "warning")
							this.formCompany.certAddress.district = ''
							this.provinceList = result.data
						}else {
							this.provinceList = result.data
						}
                    }),
                    catchError(e => {
                        return EMPTY
                    }),
                ).subscribe(result => {
					if(result.total === 0 && this.keyword !== ''){
						this.$swal("Warning!", "อำเภอนี้ไม่มีในระบบ กรุณากรอกข้อมูลให้ถูกต้องค่ะ !", "warning")
						this.formCompany.certAddress.district = ''
					}else {
						this.provinceList = result.data
					}
                })
            },
            searchDataProvince(keyword) {
                this.isOpenProvince = true
                this.keyword = keyword
                this.searchProvince$.next(this.keyword)
            },
            searchDataOtherProvince(keyword) {
                this.isOpenProvinceOther = true
                this.keyword = keyword
                this.searchProvince$.next(this.keyword)
            },
            searchDataInProvince(keyword) {
                this.isOpenProvinceIn = true
                this.keyword = keyword
                this.searchProvince$.next(this.keyword)
            },
            initObservableSubjectsProvince() {
                this.searchProvince$.pipe(
                    debounceTime(1200),
                    mergeMap((keyword) => {
                        return from(this.$contactService.searchProvince(keyword)).pipe(
                            catchError(e => {
                                return of(e)
                            }),
                        )
                    }),
                    tap(result => {
						if(result.total === 0 && this.keyword !== ''){
							this.$swal("Warning!", "จังหวัดนี้ไม่มีในระบบ กรุณากรอกข้อมูลให้ถูกต้องค่ะ !", "warning")
							this.formCompany.certAddress.province = ''
							this.provinceList = result.data
						}else {
							this.provinceList = result.data
						}
                    }),
                    catchError(e => {
                        return EMPTY
                    }),
                ).subscribe(result => {
					if(result.total === 0 && this.keyword !== ''){
						this.$swal("Warning!", "จังหวัดนี้ไม่มีในระบบ กรุณากรอกข้อมูลให้ถูกต้องค่ะ !", "warning")
						this.formCompany.certAddress.province = ''
					}else {
						this.provinceList = result.data
					}
                })
            },
            searchDataZipCode(keyword) {
                this.isOpenZipCode = true
                this.keyword = keyword
                this.searchZipCode$.next(this.keyword)
            },
            searchDataOtherZipCode(keyword) {
                this.isOpenZipCodeOther = true
                this.keyword = keyword
                this.searchZipCode$.next(this.keyword)
            },
            searchDataInZipCode(keyword) {
                this.isOpenZipCodeIn = true
                this.keyword = keyword
                this.searchZipCode$.next(this.keyword)
            },
            initObservableSubjectsZipCode() {
                this.searchZipCode$.pipe(
                    debounceTime(1200),
                    mergeMap((keyword) => {
                        return from(this.$contactService.searchZipCode(keyword)).pipe(
                            catchError(e => {
                                return of(e)
                            }),
                        )
                    }),
                    tap(result => {
						if(result.total === 0 && this.keyword !== ''){
							this.$swal.fire({
								title:'Warning!',
								text:'รหัสไปรษณีย์นี้ไม่มีในระบบ กรุณากรอกข้อมูลให้ถูกต้องค่ะ !',
								icon:'warning'
							}).then((resp) => {
								this.formCompany.certAddress.subDistrict = ''
							})
						}else {
							this.provinceList = result.data
						}
                    }),
                    catchError(e => {
                        return EMPTY
                    }),
                ).subscribe(result => {
					if(result.total === 0 && this.keyword !== ''){
						this.$swal.fire({
							title:'Warning!',
							text:'รหัสไปรษณีย์ไม่มีในระบบ กรุณากรอกข้อมูลให้ถูกต้องค่ะ !',
							icon:'warning'
						}).then((resp) => {
							this.formCompany.certAddress.subDistrict = ''
						})
					}else {
						this.provinceList = result.data
					}
                })
            },
            getCertAddressProvinceById(id) {

                this.$contactAdapter.getProvinceById(id).then(resp => {
                    this.formCompany.certAddress.subDistrict = resp.district
                    this.formCompany.certAddress.district = resp.amphoe
                    this.formCompany.certAddress.province = resp.province
                    this.formCompany.certAddress.zipCode = resp.zipCode
                    this.formCompany.certAddress.region = resp.geoName
                    this.isOpen = false
                    this.isOpenDistrict = false
                    this.isOpenProvince = false
                    this.isOpenZipCode = false
                })
            },
            getOtherAddressProvinceById(id) {
                this.$contactAdapter.getProvinceById(id).then(resp => {
                    this.formCompany.otherAddress.subDistrict = resp.district
                    this.formCompany.otherAddress.district = resp.amphoe
                    this.formCompany.otherAddress.province = resp.province
                    this.formCompany.otherAddress.zipCode = resp.zipCode
                    this.formCompany.certAddress.region = resp.geoName
                    this.isOpenOther = false
                    this.isOpenDistrictOther = false
                    this.isOpenProvinceOther = false
                    this.isOpenZipCodeOther = false
                })
            },
            getInAddressProvinceById(id) {
                this.$contactAdapter.getProvinceById(id).then(resp => {
                    this.formCompany.invoiceAddress.subDistrict = resp.district
                    this.formCompany.invoiceAddress.district = resp.amphoe
                    this.formCompany.invoiceAddress.province = resp.province
                    this.formCompany.invoiceAddress.zipCode = resp.zipCode
                    this.formCompany.certAddress.region = resp.geoName
                    this.isOpenIn = false
                    this.isOpenDistrictIn = false
                    this.isOpenProvinceIn = false
                    this.isOpenZipCodeIn = false
                })
			},
			getContactStatus(){
				this.$masterAdapter.getContactStatus().then(resp => {
					this.contactStatus.push({ 'value' : "" , 'text' : '-Select Status-' })
					for (let i = 0; i < resp.length ; i++) {
						this.contactStatus.push({ 'value' : resp[i].id , 'text' : resp[i].name })
					}
				})
			}

        },
        watch: {
            'formCompany.certAddress.subDistrict'() {
                if (this.formCompany.certAddress.subDistrict === '') {
                    this.isOpen = false
                }
            }
            ,
            'formCompany.certAddress.district'() {
                if (this.formCompany.certAddress.district === '') {
                    this.isOpenDistrict = false
                }
            }
            ,
            'formCompany.certAddress.province'() {
                if (this.formCompany.certAddress.province === '') {
                    this.isOpenProvince = false
                }
            }
            ,
            'formCompany.certAddress.zipCode'() {
                if (this.formCompany.certAddress.zipCode === '') {
                    this.isOpenZipCode = false
                }
            }
            ,
            'formCompany.otherAddress.subDistrict'() {
                if (this.formCompany.otherAddress.subDistrict === '') {
                    this.isOpenOther = false
                }
            }
            ,
            'formCompany.otherAddress.district'() {
                if (this.formCompany.otherAddress.district === '') {
                    this.isOpenDistrictOther = false
                }
            }
            ,
            'formCompany.otherAddress.province'() {
                if (this.formCompany.otherAddress.province === '') {
                    this.isOpenProvinceOther = false
                }
            }
            ,
            'formCompany.otherAddress.zipCode'() {
                if (this.formCompany.otherAddress.zipCode === '') {
                    this.isOpenZipCodeOther = false
                }
            }
            ,
            'formCompany.invoiceAddress.subDistrict'() {
                if (this.formCompany.invoiceAddress.subDistrict === '') {
                    this.isOpenIn = false
                }
            }
            ,
            'formCompany.invoiceAddress.district'() {
                if (this.formCompany.invoiceAddress.district === '') {
                    this.isOpenDistrictIn = false
                }
            }
            ,
            'formCompany.invoiceAddress.province'() {
                if (this.formCompany.invoiceAddress.province === '') {
                    this.isOpenProvinceIn = false
                }
            }
            ,
            'formCompany.invoiceAddress.zipCode'() {
                if (this.formCompany.invoiceAddress.zipCode === '') {
                    this.isOpenZipCodeIn = false
                }
            }
        }

    }
</script>
<style lang="scss">
	.container {
		padding: 0px;
	}

	.input-size-default {
		font-size: 0.875rem !important;
	}
</style>



