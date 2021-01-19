<template>
	<ScCard class="uk-margin-mini-top">
		<ScCardBody>
			<p v-if="!pageActive" class="sc-text-semibold uk-text-uppercase uk-heading-line">
				<span>COMPANY CONTACT</span>
			</p>
			<p v-else class="sc-text-semibold uk-text-uppercase uk-heading-line">
				<span>EDIT COMPANY</span>
			</p>
			<transition name="slide-bottom-medium" mode="out-in">
				<div v-if="pageActive" class="uk-form-stacked" key="userPreview">
					<div class="sc-round sc-border uk-margin sc-padding">
						<div class="uk-child-width-1-2@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
							<div>
								<label v-if="$v.getCompany.companyName.$error" class="uk-form-label sc-vue-errors">
									Company Name / ชื่อบริษัท :<sup>*</sup>
								</label>
								<label v-else class="uk-form-label">
									Company Name / ชื่อบริษัท :<sup>*</sup>
								</label>
								<ScInput
									v-model="$v.getCompany.companyName.$model"
									:error-state="$v.getCompany.companyName.$error"
									:validator="$v.getCompany.companyName"
								></ScInput>
							</div>
							<div>
								<label v-if="$v.getCompany.branch.$error" class="uk-form-label sc-vue-errors">Branch /
									สาขา :<sup>*</sup></label>
								<label v-else class="uk-form-label">Branch / สาขา :<sup>*</sup></label>
								<ScInput
									v-model="$v.getCompany.branch.$model"
									:error-state="$v.getCompany.branch.$error"
									:validator="$v.getCompany.branch"
								></ScInput>
							</div>
							<div>
								<div class="uk-margin">
									<label class="uk-form-label">Customer Type / ประเภทลูกค้า : <span style="color: red">*</span></label>
									<div class="uk-form-controls">
										<select id="form-h-select1"
												v-model="getCompany.customerType.id"
												class="uk-select"
												data-sc-input
										>
											<option value=""> ไม่ระบุ</option>
											<option
												v-for="option in customerTypeOption"
												:value="option.value"
											>{{ option.text }}
											</option>
										</select>
									</div>
								</div>
							</div>
							<div v-if="getCompany.customerType.id === '5e953437125b915144f92d41'">
								<div class="uk-margin">
									<label class="uk-form-label">Brand / ยี่ห้อ :</label>
									<div v-if="getCompany.brand" class="uk-form-controls">
										<select id="brand"
												v-model="getCompany.brand.id"
												class="uk-select"
											s	data-sc-input>
											<option value=""> ไม่ระบุ</option>
											<option
												v-for="option in brandOption"
												:value="option.value"
											>{{ option.text }}
											</option>
										</select>
									</div>
								</div>
							</div>
							<div v-else>
								<div class="uk-margin">
									<label class="uk-form-label">Brand / ยี่ห้อ : </label>
									<div class="uk-form-controls">
										<select v-model="getCompany.brand.id" class="uk-select" data-sc-input disabled>
											<option value=""> ไม่ระบุ</option>
										</select>
									</div>
								</div>
							</div>
							<div>
								<label class="uk-form-label">Customer Code / รหัสลูกค้า :</label>
								<ScInput v-model="getCompany.customerCode"></ScInput>
							</div>
							<div>
								<label class="uk-form-label">Service Code / รหัสบริการ :</label>
								<ScInput v-model="getCompany.serviceCode"></ScInput>
							</div>
							<div class="uk-margin-top uk-width-1-1@l" v-show="getCompany.customerType.id !== '5e60b2f2eb907fa8ee105d5c'">
<!--								<label class="uk-form-label">-->
<!--									<i class="mdi mdi-account-multiple-check"></i>-->
<!--									Insurance Partners :-->
<!--								</label>-->
								<label class="uk-form-label">
									<i class="mdi mdi-account-multiple-check"></i>
									Insurance Partners(ในเครือ) :
								</label>
								<MultiSelect
									v-model="getCompany.partnerId"
									:options="msBasicOptions"
								></MultiSelect>
							</div>
							<div class="uk-margin-top uk-width-1-1@l" v-show="getCompany.customerType.id !== '5e60b2f2eb907fa8ee105d5c'">
								<!--								<label class="uk-form-label">-->
								<!--									<i class="mdi mdi-account-multiple-check"></i>-->
								<!--									Insurance Partners :-->
								<!--								</label>-->
								<label class="uk-form-label">
									<i class="mdi mdi-account-multiple-check"></i>
									Insurance Partners(นอกเครือ) :
								</label>
								<MultiSelect
									v-model="getCompany.garageId"
									:options="garageOptions"
								></MultiSelect>
							</div>
							<div class="uk-margin-top uk-width-1-1@l">
								<label class="uk-form-label">Tax ID / เลขประจำตัวผู้เสียภาษี :</label>
								<ScInput v-model="getCompany.taxId"></ScInput>
							</div>
							<div>
								<label v-if="$v.getCompany.phone1.$error" class="uk-form-label sc-vue-errors">Office Phone
									1 : *</label>
								<label v-else class="uk-form-label">Office Phone 1 : <span style="color: red">*</span></label>
								<ScInput
									v-model="$v.getCompany.phone1.$model"
									:error-state="$v.getCompany.phone1.$error"
									:validator="$v.getCompany.phone1"
									v-input-mask="{ 'mask': '9', 'repeat': 10, 'greedy' : false }"
								></ScInput>
							</div>
							<div>
								<label class="uk-form-label">Office Phone 2 : </label>
								<ScInput
									v-model="getCompany.phone2"
									v-input-mask="{ 'mask': '9', 'repeat': 10, 'greedy' : false }"
								></ScInput>
							</div>
							<div>
								<label class="uk-form-label">Office Phone 3 : </label>
								<ScInput
									v-model="getCompany.phone3"
									v-input-mask="{ 'mask': '9', 'repeat': 10, 'greedy' : false }"
								></ScInput>
							</div>
							<div>
								<label class="uk-form-label">Office Phone 4 : </label>
								<ScInput
									v-model="getCompany.phone4"
									v-input-mask="{ 'mask': '9', 'repeat': 10, 'greedy' : false }"
								></ScInput>
							</div>
							<div>
								<label class="uk-form-label">Office Phone 5 : </label>
								<ScInput
									v-model="getCompany.phone5"
									v-input-mask="{ 'mask': '9', 'repeat': 10, 'greedy' : false }"
								></ScInput>
							</div>
							<div>
								<label class="uk-form-label">Fax / เบอร์แฟกซ์ :</label>
								<ScInput v-model="getCompany.fax"></ScInput>
							</div>
							<div>
								<label class="uk-form-label">Website / เว็บไซต์ :</label>
								<ScInput v-model="getCompany.website"></ScInput>
							</div>

							<div>
								<label class="uk-form-label">Country / ประเทศ :</label>
								<ScInput id="form-h-select3" v-model="getCompany.country"></ScInput>
							</div>
							<div class="uk-margin-top uk-width-1-1@l">
								<label class="uk-form-label">Note / บันทึก :</label>
								<ScTextarea
									v-model="getCompany.note"
									:rows="3"
								></ScTextarea>
							</div>
							<div class="uk-width-1-1@xl">
								<label class="uk-form-label">
									<i class="mdi mdi-routes"></i>
									Status / สถานะ <span class="text-danger">*</span> :
								</label>
								<select id="status" v-model="getCompany.status.id" class="uk-select" data-sc-input>
									<option
										v-for="option in contactStatus"
										v-bind:value="option.value"
									>{{ option.text }}
									</option>
								</select>
							</div>
							<span class="sc-text-semibold uk-margin-top uk-width-1-1@l">Attach file : </span>
							<div class="uk-margin-top uk-width-1-1@l">
								<div v-if="getCompany.file1.alt !== ''">
									<div class="uk-width-auto uk-grid-medium uk-flex-middle uk-grid" data-uk-grid>
										<span class="sc-text-semibold">1. </span>
										<a href="javascript:void(0)" @click="downloadFiles(getCompany.file1.data.link,getCompany.file1.alt)">{{
											getCompany.file1.alt }}</a>
										<div>

											<a href="javascript:void(0)"
											   @click="deleteFile('file1',getCompany.file1.data.link)"
											   class="mr-2 ml-2 sc-button sc-button-icon sc-button-small">
												<i class=" md-color-red-600 mdi mdi-delete"></i>
											</a>
										</div>
									</div>
								</div>
								<div v-else>
									<div class="uk-width-1-1@l">
										<b-form-file v-model="fromEdit.file1"></b-form-file>
									</div>
								</div>

							</div>
							<div class="uk-margin-top uk-width-1-1@l">
								<div v-if="getCompany.file2.alt !== ''">
									<div class="uk-width-auto uk-grid-medium uk-flex-middle uk-grid" data-uk-grid>
										<span class="sc-text-semibold">2. </span>
										<a href="javascript:void(0)" @click="downloadFiles(getCompany.file2.data.link,getCompany.file2.alt)">{{
											getCompany.file2.alt }}</a>
										<div>
											<a href="javascript:void(0)"
											   @click="deleteFile('file2',getCompany.file2.data.link)"
											   class="mr-2 ml-2 sc-button sc-button-icon sc-button-small">
												<i class=" md-color-red-600 mdi mdi-delete"></i>
											</a>
										</div>
									</div>
								</div>
								<div v-else>
									<div>
										<b-form-file v-model="fromEdit.file2"></b-form-file>
									</div>
								</div>
							</div>
							<div class="uk-margin-top uk-width-1-1@l">
								<div v-if="getCompany.file3.alt !== ''">
									<div class="uk-width-auto uk-grid-medium uk-flex-middle uk-grid" data-uk-grid>
										<span class="sc-text-semibold">3. </span>
										<a href="javascript:void(0)" @click="downloadFiles(getCompany.file3.data.link,getCompany.file3.alt)">{{
											getCompany.file3.alt}}</a>
										<div>
											<a href="javascript:void(0)"
											   @click="deleteFile('file3',getCompany.file3.data.link)"
											   class="mr-2 ml-2 sc-button sc-button-icon sc-button-small">
												<i class=" md-color-red-600 mdi mdi-delete"></i>
											</a>
										</div>
									</div>
								</div>
								<div v-else>
									<div class="uk-width-1-1@l">
										<b-form-file v-model="fromEdit.file3"></b-form-file>
									</div>
								</div>
							</div>
							<div class="uk-margin-top uk-width-1-1@l">
								<div v-if="getCompany.file4.alt !== ''">
									<div class="uk-width-auto uk-grid-medium uk-flex-middle uk-grid" data-uk-grid>
										<span class="sc-text-semibold">4. </span>
										<a href="javascript:void(0)" @click="downloadFiles(getCompany.file4.data.link,getCompany.file4.alt)">{{
											getCompany.file4.alt }}</a>
										<div>
											<a href="javascript:void(0)"
											   @click="deleteFile('file4',getCompany.file4.data.link)"
											   class="mr-2 ml-2 sc-button sc-button-icon sc-button-small">
												<i class=" md-color-red-600 mdi mdi-delete"></i>
											</a>
										</div>
									</div>
								</div>
								<div v-else>
									<div class="uk-width-1-1@l">
										<b-form-file v-model="fromEdit.file4"></b-form-file>
									</div>
								</div>
							</div>
							<div class="uk-margin-top uk-width-1-1@l">
								<div v-if="getCompany.file5.alt !== ''">
									<div class="uk-width-auto uk-grid-medium uk-flex-middle uk-grid" data-uk-grid>
										<span class="sc-text-semibold">5. </span>
										<a href="javascript:void(0)" @click="downloadFiles(getCompany.file5.data.link,getCompany.file5.alt)">{{
											getCompany.file5.alt }}</a>
										<div>
											<a href="javascript:void(0)"
											   @click="deleteFile('file5',getCompany.file5.data.link)"
											   class="mr-2 ml-2 sc-button sc-button-icon sc-button-small">
												<i class=" md-color-red-600 mdi mdi-delete"></i>
											</a>
										</div>
									</div>
								</div>
								<div v-else>
									<div class="uk-width-1-1@l">
										<b-form-file v-model="fromEdit.file5"></b-form-file>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<p class="sc-text-semibold uk-margin uk-text-uppercase uk-heading-line">
							<span>ที่อยู่ (ภ.พ.20/หนังสือรับรอง)</span>

						</p>
						<div class="sc-round sc-border uk-margin sc-padding">
							<div class="uk-child-width-1-2@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
								<div>
									<label v-if="$v.getCompany.certAddress.address.$error" class="uk-form-label sc-vue-errors">Address
										/ เลขที่ : *</label>
									<label v-else class="uk-form-label">Address / เลขที่ : <span style="color: red">*</span></label>
									<ScInput
										v-model="$v.getCompany.certAddress.address.$model"
										:error-state="$v.getCompany.certAddress.address.$error"
										:validator="$v.getCompany.certAddress.address"
									></ScInput>
								</div>
								<div>
									<label class="uk-form-label">Alley / ซอย : </label>
									<ScInput v-model="getCompany.certAddress.alley"></ScInput>
								</div>
								<div>
									<label v-if="$v.getCompany.certAddress.subDistrict.$error"
										   class="uk-form-label sc-vue-errors">Sub District / แขวง|ตำบล : *</label>
									<label v-else class="uk-form-label">Sub District / แขวง|ตำบล : <span style="color: red">*</span></label>
									<div class="autocomplete">
										<ScInput id="subDistrict"
												 v-model="$v.getCompany.certAddress.subDistrict.$model"
												 :error-state="$v.getCompany.certAddress.subDistrict.$error"
												 :validator="$v.getCompany.certAddress.subDistrict"
												 @input="searchDataSubDistrict"
										></ScInput>
										<ul class="autocomplete-results" v-if="isOpenSubDistrict">
											<li class="autocomplete-result" v-for="item in provinceList"
												@click="getCertAddressProvinceById(item.id)">
												<b>{{item.district}}</b> {{item.amphoe}} {{item.province}}
												{{item.zipCode}}
											</li>
										</ul>
									</div>
								</div>
								<div>
									<label v-if="$v.getCompany.certAddress.district.$error" class="uk-form-label sc-vue-errors">District
										/ เขต|อำเภอ : *</label>
									<label v-else class="uk-form-label">District / เขต|อำเภอ : <span style="color: red">*</span></label>
									<div class="autocomplete">
										<ScInput id="district"
												 v-model="$v.getCompany.certAddress.district.$model"
												 :error-state="$v.getCompany.certAddress.district.$error"
												 :validator="$v.getCompany.certAddress.district"
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
								<div>
									<label v-if="$v.getCompany.certAddress.province.$error" class="uk-form-label sc-vue-errors">Province
										/ จังหวัด : *</label>
									<label v-else class="uk-form-label">Province / จังหวัด : <span style="color: red">*</span></label>
									<div class="autocomplete">
										<ScInput id="addressProvince"
												 v-model="$v.getCompany.certAddress.province.$model"
												 :error-state="$v.getCompany.certAddress.province.$error"
												 :validator="$v.getCompany.certAddress.province"
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
								<div>
									<label v-if="$v.getCompany.certAddress.zipCode.$error" class="uk-form-label sc-vue-errors">Zip
										code / รหัสไปรษณีย์ : *</label>
									<label v-else class="uk-form-label">Zip code / รหัสไปรษณีย์ : <span style="color: red">*</span></label>
									<div class="autocomplete">
										<ScInput id="zipCode"
												 v-model="$v.getCompany.certAddress.zipCode.$model"
												 :error-state="$v.getCompany.certAddress.zipCode.$error"
												 :validator="$v.getCompany.certAddress.zipCode"
												 v-input-mask="{ 'mask': '9', 'repeat': 5, 'greedy' : false }"
												 @input="searchDataZipCode"
										></ScInput>
										<ul class="autocomplete-results" v-if="isOpenZipCode">
											<li class="autocomplete-result" v-for="item in provinceList"
												@click="getCertAddressProvinceById(item.id)">
												{{item.district}} {{item.amphoe}} {{item.province}}
												<b>{{item.zipCode}}</b>
											</li>
										</ul>
										<ScInput id="region" v-model="getCompany.region" hidden></ScInput>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div v-show="getCompany.customerType.id !== '5e60b2f2eb907fa8ee105d5c'">
						<p class="sc-text-semibold uk-margin uk-text-uppercase uk-heading-line">
							<span>ที่ตั้ง (งานตัวถังสี/อื่นๆ)</span>
						</p>
						<div class="sc-round sc-border uk-margin sc-padding" >
							<div class="uk-child-width-1-2@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
								<div
								>
									<label class="uk-form-label">Address / เลขที่ : </label>
									<ScInput v-model="getCompany.otherAddress.address" ></ScInput>
								</div>
								<div>
									<label class="uk-form-label">Alley / ซอย : </label>
									<ScInput v-model="getCompany.otherAddress.alley"></ScInput>
								</div>
								<div>
									<label class="uk-form-label">Sub District / แขวง|ตำบล : </label>
									<div class="autocomplete">
										<ScInput id="otherAddressSubDistrict" v-model="getCompany.otherAddress.subDistrict"
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
								<div>
									<label class="uk-form-label">District / เขต|อำเภอ : </label>
									<div class="autocomplete">
										<ScInput id="otherAddressDistrict" v-model="getCompany.otherAddress.district"
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
								<div>
									<label class="uk-form-label">Province / จังหวัด : </label>
									<div class="autocomplete">
										<ScInput id="otherAddressProvince" v-model="getCompany.otherAddress.province"
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
								<div>
									<label class="uk-form-label">Zip code / รหัสไปรษณีย์ : </label>
									<div class="autocomplete">
										<ScInput id="otherAddressZipCode" v-model="getCompany.otherAddress.zipCode"
												 v-input-mask="{ 'mask': '9', 'repeat': 5, 'greedy' : false }"
												 @input="searchDataOtherZipCode"></ScInput>
										<ul class="autocomplete-results" v-if="isOpenZipCodeOther">
											<li class="autocomplete-result" v-for="item in provinceList"
												@click="getOtherAddressProvinceById(item.id)">
												{{item.district}} {{item.amphoe}} {{item.province}}
												<b>{{item.zipCode}}</b>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div>
						<p class="sc-text-semibold uk-margin uk-text-uppercase uk-heading-line">
							<span>Invoice Address</span>
						</p>
						<div class="sc-round sc-border uk-margin sc-padding">
							<div class="uk-child-width-1-2@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
								<div>
									<label class="uk-form-label">Address / เลขที่ : </label>
									<ScInput v-model="getCompany.invoiceAddress.address"></ScInput>
								</div>
								<div>
									<label class="uk-form-label">Alley / ซอย : </label>
									<ScInput v-model="getCompany.invoiceAddress.alley"></ScInput>
								</div>
								<div>
									<label class="uk-form-label">Sub District / แขวง|ตำบล : </label>
									<div class="autocomplete">
										<ScInput id="invoiceAddressSubDistrict" v-model="getCompany.invoiceAddress.subDistrict"
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
								<div>
									<label class="uk-form-label">District / เขต|อำเภอ : </label>
									<div class="autocomplete">
										<ScInput id="invoiceAddressDistrict" v-model="getCompany.invoiceAddress.district"
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
								<div>
									<label class="uk-form-label">Province / จังหวัด : </label>
									<div class="autocomplete">
										<ScInput id="invoiceAddressProvince" v-model="getCompany.invoiceAddress.province"
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
								<div>
									<label class="uk-form-label">Zip code / รหัสไปรษณีย์ : </label>
									<div class="autocomplete">
										<ScInput id="invoiceAddressZipCode" v-model="getCompany.invoiceAddress.zipCode"
												 v-input-mask="{ 'mask': '9', 'repeat': 5, 'greedy' : false }"
												 @input="searchDataInZipCode"></ScInput>
										<ul class="autocomplete-results" v-if="isOpenZipCodeIn">
											<li class="autocomplete-result" v-for="item in provinceList"
												@click="getInAddressProvinceById(item.id)">
												{{item.district}} {{item.amphoe}} {{item.province}}
												<b>{{item.zipCode}}</b>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div v-else key="userForm">
					<div class="sc-round sc-border uk-margin sc-padding">
						<ul class="uk-list uk-list-divider">

							<li class="sc-list-group">
								<div class="sc-list-addon">
									<i class="mdi mdi-city-variant-outline"></i>
								</div>
								<div class="sc-list-body">
									<div class="sc-list-body-inner uk-text-wrap">
										<strong>Company Name / ชื่อบริษัท : </strong> {{ getCompany.companyName }}
									</div>
								</div>
							</li>
							<li class="sc-list-group">
								<div class="sc-list-addon">
									<i class="mdi mdi-office-building"></i>
								</div>
								<div class="sc-list-body">
									<div class="sc-list-body-inner uk-text-wrap">
										<!-- edit to branch name -->
										<strong>Branch Name / ชื่อสาขา : </strong> {{ getCompany.branch }}
									</div>
								</div>
							</li>
							<li class="sc-list-group">
								<div class="sc-list-addon">
									<i class="mdi mdi-account-multiple-check"></i>
								</div>
								<div class="sc-list-body">
									<div class="sc-list-body-inner uk-text-wrap">
<!--										<strong>Insurance Partners / พันธมิตรประกันภัย : </strong>-->
										<strong>Insurance Partners (ในเครือ) : </strong>
										<button v-show="getCompany.customerType.id !== '5e60b2f2eb907fa8ee105d5c'"
												v-if="getCompany.partner[0].id !== ''"
												v-for="option in getCompany.partner" disabled
												style="color: #222222">
											{{ option.name }}
										</button>
									</div>
								</div>
							</li>
							<li class="sc-list-group">
								<div class="sc-list-addon">
									<i class="mdi mdi-account-multiple-check"></i>
								</div>
								<div class="sc-list-body">
									<div class="sc-list-body-inner uk-text-wrap">
										<!--										<strong>Insurance Partners / พันธมิตรประกันภัย : </strong>-->
										<strong>Insurance Partners (นอกเครือ) : </strong>
										<button v-show="getCompany.customerType.id !== '5e60b2f2eb907fa8ee105d5c'"
												v-if="getCompany.garage[0].id !== ''"
												v-for="option in getCompany.garage" disabled
												style="color: #222222">
											{{ option.name }}
										</button>
									</div>
								</div>
							</li>
							<li class="sc-list-group">
								<div class="sc-list-addon">
									<i class="mdi mdi-phone"></i>
								</div>
								<div class="sc-list-body">
									<div class="sc-list-body-inner uk-text-wrap">
										<strong>Office Phone / เบอร์โทร สนง. : </strong>
										<span class="wrap" >{{ getCompany.phone1 }}<span v-if="checkEmpty(getCompany.phone2)">,</span></span>
										<span class="wrap" >{{ getCompany.phone2 }}<span v-if="checkEmpty(getCompany.phone3)">,</span></span>
										<span class="wrap" >{{ getCompany.phone3 }}<span v-if="checkEmpty(getCompany.phone4)">,</span></span>
										<span class="wrap" >{{ getCompany.phone4 }}<span v-if="checkEmpty(getCompany.phone5)">,</span></span>
										<span class="wrap" >{{ getCompany.phone5 }}</span>
									</div>
								</div>
							</li>
							<li class="sc-list-group">
								<div class="sc-list-addon">
									<i class="mdi mdi-account-group-outline"></i>
								</div>
								<div class="sc-list-body">
									<div class="sc-list-body-inner uk-text-wrap">
										<strong>Customer Type / ประเภทลูกค้า : </strong>
										<span v-if="getCompany.customerType">
											{{ getCompany.customerType.name }}
										</span>
									</div>
								</div>
							</li>
							<li class="sc-list-group">
								<div class="sc-list-addon">
									<i class="mdi mdi-tag-outline"></i>
								</div>
								<div class="sc-list-body">
									<div class="sc-list-body-inner uk-text-wrap">
										<strong>Brand / ยี่ห้อ : </strong>
										<span v-if="getCompany.brand">
											{{ getCompany.brand.name }}
										</span>
									</div>
								</div>
							</li>
							<li class="sc-list-group">
								<div class="sc-list-addon">
									<i class="mdi mdi-map-marker-outline"></i>
								</div>
								<div class="sc-list-body">
									<div class="sc-list-body-inner uk-text-wrap">
										<strong>Region / ภาค : </strong> {{ getCompany.region }}
									</div>
								</div>
							</li>
							<li class="sc-list-group">
								<div class="sc-list-addon">
									<i class="mdi mdi-account-badge-horizontal-outline"></i>
								</div>
								<div class="sc-list-body">
									<div class="sc-list-body-inner uk-text-wrap">
										<strong>Customer Code / รหัสลูกค้า : </strong> {{ getCompany.customerCode }}
									</div>
								</div>
							</li>
							<li class="sc-list-group">
								<div class="sc-list-addon">
									<i class="mdi mdi-toolbox-outline"></i>
								</div>
								<div class="sc-list-body">
									<div class="sc-list-body-inner uk-text-wrap">
										<strong>Service Code / รหัสบริการ : </strong> {{ getCompany.serviceCode }}
									</div>
								</div>
							</li>
							<li class="sc-list-group">
								<div class="sc-list-addon">
									<i class="mdi mdi-barcode-scan"></i>
								</div>
								<div class="sc-list-body">
									<div class="sc-list-body-inner uk-text-wrap">
										<strong>Tax ID / เลขประจำตัวผู้เสียภาษี : </strong> {{ getCompany.taxId }}
									</div>
								</div>
							</li>
							<li class="sc-list-group">
								<div class="sc-list-addon">
									<i class="mdi mdi-fax"></i>
								</div>
								<div class="sc-list-body">
									<div class="sc-list-body-inner uk-text-wrap">
										<strong>Fax / แฟกซ์ : </strong> {{ getCompany.fax }}
									</div>
								</div>
							</li>
							<li class="sc-list-group">
								<div class="sc-list-addon">
									<i class="mdi mdi-sitemap"></i>
								</div>
								<div class="sc-list-body">
									<div class="sc-list-body-inner uk-text-wrap">
										<strong>Website / เว็บไซต์ : </strong> {{ getCompany.website }}
									</div>
								</div>
							</li>
							<li class="sc-list-group">
								<div class="sc-list-addon">
									<i class="mdi mdi-globe-model"></i>
								</div>
								<div class="sc-list-body">
									<div class="sc-list-body-inner uk-text-wrap">
										<strong>Country / ประเทศ : </strong> {{ getCompany.country }}
									</div>
								</div>
							</li>
							<li class="sc-list-group">
								<div class="sc-list-addon">
									<i class="mdi mdi-file-document-edit-outline"></i>
								</div>
								<div class="sc-list-body">
									<div class="sc-list-body-inner uk-text-wrap">
										<strong>Note / บันทึก : </strong> {{ getCompany.note }}
									</div>
								</div>
							</li>
							<li class="sc-list-group">
								<div class="sc-list-addon">
									<i class="mdi mdi-routes"></i>
								</div>
								<div class="sc-list-body">
									<div class="sc-list-body-inner uk-text-wrap">
										<template v-if="getCompany.companyName === ''">
											<strong>Status / สถานะ : </strong>
										</template>
										<template v-else>
											<strong>Status / สถานะ : </strong>
											<span v-if="getCompany.status.id === '5f39f8a274601b0bf3bd9e2d'" class="clrBlue">{{ getCompany.status.name }}</span>
											<span v-else-if="getCompany.status.id === '5f350851cd3d534abee6c6ef'" class="clrGrey">{{ getCompany.status.name }}</span>
											<span v-else-if="getCompany.status.id === '5f350864cd3d534abee6c6f0'" class="clrRed">{{ getCompany.status.name }}</span>
											<span v-else >{{ getCompany.status.name }}</span>
										</template>



									</div>
								</div>
							</li>

						</ul>
					</div>
					<p class="sc-text-semibold uk-margin uk-text-uppercase uk-heading-line">
						<span>ที่อยู่ (ภ.พ.20/หนังสือรับรอง)</span>
					</p>
					<div class="sc-round sc-border uk-margin sc-padding">
						<template v-if="getCompany.certAddress.address !== '' ">
							<span class="sc-color-secondary uk-text-medium">เลขที่ {{ getCompany.certAddress.address }}</span>
							<span class="sc-color-secondary uk-text-medium">ซอย {{ getCompany.certAddress.alley }}</span>
							<span class="sc-color-secondary uk-text-medium">ตำบล {{ getCompany.certAddress.subDistrict }}</span>
							<span class="sc-color-secondary uk-text-medium">อำเภอ {{ getCompany.certAddress.district }}</span>
							<span class="sc-color-secondary uk-text-medium">จังหวัด {{ getCompany.certAddress.province }}</span>
							<span class="sc-color-secondary uk-text-medium">รหัสไปรษณีย์ {{ getCompany.certAddress.zipCode }}</span>
						</template>

					</div>

					<div v-show="getCompany.customerType.id !== '5e60b2f2eb907fa8ee105d5c'">
						<p class="sc-text-semibold uk-margin uk-text-uppercase uk-heading-line">
							<span>ที่ตั้ง (งานตัวถังสี/อื่นๆ)</span>
						</p>
						<div class="sc-round sc-border uk-margin sc-padding">
					<span v-if="getCompany.otherAddress" class="sc-color-secondary uk-text-medium">เลขที่ {{ getCompany.otherAddress.address }}</span>
							<span
								v-if="getCompany.otherAddress"
								class="sc-color-secondary uk-text-medium">ซอย {{ getCompany.otherAddress.alley }}</span>
							<span
								v-if="getCompany.otherAddress"
								class="sc-color-secondary uk-text-medium">ตำบล {{ getCompany.otherAddress.subDistrict }}</span>
							<span
								v-if="getCompany.otherAddress"
								class="sc-color-secondary uk-text-medium">อำเภอ {{ getCompany.otherAddress.district }}</span>
							<span
								v-if="getCompany.otherAddress"
								class="sc-color-secondary uk-text-medium">จังหวัด {{ getCompany.otherAddress.province }}</span>
							<span
								v-if="getCompany.otherAddress"
								class="sc-color-secondary uk-text-medium">รหัสไปรษณีย์ {{ getCompany.otherAddress.zipCode }}</span>
						</div>
					</div>
					<p class="sc-text-semibold uk-margin uk-text-uppercase uk-heading-line">
						<span>Invoice Address</span>
					</p>
					<div class="sc-round sc-border uk-margin sc-padding">
					<span
						v-if="getCompany.invoiceAddress"
						class="sc-color-secondary uk-text-medium">เลขที่ {{ getCompany.invoiceAddress.address }}</span>
						<span
							v-if="getCompany.invoiceAddress"
							class="sc-color-secondary uk-text-medium">ซอย {{ getCompany.invoiceAddress.alley }}</span>
						<span
							v-if="getCompany.invoiceAddress"
							class="sc-color-secondary uk-text-medium">ตำบล {{ getCompany.invoiceAddress.subDistrict }}</span>
						<span
							v-if="getCompany.invoiceAddress"
							class="sc-color-secondary uk-text-medium">อำเภอ {{ getCompany.invoiceAddress.district }}</span>
						<span
							v-if="getCompany.invoiceAddress"
							class="sc-color-secondary uk-text-medium">จังหวัด {{ getCompany.invoiceAddress.province }}</span>
						<span
							v-if="getCompany.invoiceAddress"
							class="sc-color-secondary uk-text-medium">รหัสไปรษณีย์ {{ getCompany.invoiceAddress.zipCode }}</span>
					</div>
					<div class="sc-round sc-border uk-margin sc-padding">
						<div>
							<span class="sc-text-semibold">Attach file : </span>
							<div v-if="getCompany.file1.alt">
								<span class="sc-text-semibold">1.</span>
								<a href="javascript:void(0)" @click="downloadFiles(getCompany.file1.data.link,getCompany.file1.alt)">{{
									getCompany.file1.alt}}</a>
							</div>
							<div v-if="getCompany.file2.alt">
								<span class="sc-text-semibold">2.</span>
								<a href="javascript:void(0)" @click="downloadFiles(getCompany.file2.data.link,getCompany.file2.alt)">{{
									getCompany.file2.alt}}</a>
							</div>
							<div v-if="getCompany.file3.alt">
								<span class="sc-text-semibold">3.</span>
								<a href="javascript:void(0)" @click="downloadFiles(getCompany.file3.data.link,getCompany.file3.alt)">{{
									getCompany.file3.alt}}</a>
							</div>
							<div v-if="getCompany.file4.alt">
								<span class="sc-text-semibold">4.</span>
								<a href="javascript:void(0)" @click="downloadFiles(getCompany.file4.data.link,getCompany.file4.alt)">{{
									getCompany.file4.alt}}</a>
							</div>
							<div v-if="getCompany.file5.alt">
								<span class="sc-text-semibold">5.</span>
								<a href="javascript:void(0)" @click="downloadFiles(getCompany.file5.data.link,getCompany.file5.alt)">{{
									getCompany.file5.alt}}</a>
							</div>
						</div>
					</div>
				</div>
			</transition>
			<div class="uk-margin-small-top">
				<transition name="fade" mode="out-in">
					<div v-if="!pageActive">
						<a href="javascript:void(0)" class="sc-button sc-button-primary sc-button-social mt-2"
						   @click="editCompanyContact(getCompany.id)">
							<span>Edit Company</span><i class="mdi mdi-pencil-outline"></i>
						</a>
						<a href="javascript:void(0)" class="sc-button sc-button-success sc-button-social mt-2"
						   @click="viewPeopleInCompany(getCompany.id)">
							<span>View people</span><i class="mdi mdi-account-group"></i>
						</a>

						<a href="javascript:void(0)" class="sc-button sc-button-warning sc-button-social mt-2"
						   @click="viewHistoryLog(getCompany.id)">
							<span>History Edit Log</span><i class="mdi mdi-playlist-edit"></i>
						</a>

					</div>

					<div v-else>
						<a href="javascript:void(0)"
						   class="sc-button sc-button-primary sc-button-social"
						   @click="checkRequiredInput(getCompany, $event)"
						>
							<span>SAVE</span><i class="mdi mdi-content-save-outline"></i>
						</a>
						<a href="javascript:void(0)" class="sc-button sc-button-danger sc-button-social"
						   @click="cancelEdit()">
							<span>Cancel</span><i class="mdi mdi-close-circle-outline"></i>
						</a>
					</div>
				</transition>
			</div>
			<div class="uk-grid uk-align-right uk-margin-top" data-uk-grid>
				<div>
                  <span class="uk-label md-bg-grey-500" style="font-size:11px">
                    <span style="color: #fffdfb;">Created By :</span>
					    {{ getCompany.createdBy ? getCompany.createdBy.name : '' }}
					<span style="color: #f7fff2;">Date :</span>
					  	{{ getCompany.createdAt ? getCompany.createdAt : '' }}
                  </span>
				</div>
				<div class="uk-margin-remove">
				<span class="uk-label md-bg-blue-grey-500" style="font-size:11px">
                    <span style="color: #f8fffa;">last updated by :</span>
					  {{ getCompany.updatedBy ? getCompany.updatedBy.name : '' }} ,
					<span style="color: #f8fffa;">Date :</span>
					  {{ getCompany.updatedAt ? getCompany.updatedAt : '' }}
                  </span>
				</div>
			</div>
			<div id="modal-addRemarkUpdateCompany" data-uk-modal>
				<div class="uk-modal-dialog uk-modal-body">
					<h2 class="uk-modal-title">
						Remark
					</h2>
					<div class="uk-modal-body">
						<label class="uk-form-label">
							Remark / บันทึกการแก้ไขข้อมูล :
						</label>
						<div>
							<ScTextarea
								:rows="3"
								v-model="fromEdit.remark"
							></ScTextarea>
						</div>
					</div>
					<p class="uk-text-right">
						<button class="sc-button sc-button-flat uk-modal-close" @click="resetInput()" type="button">
							Cancel
						</button>
						<button class="sc-button sc-button-primary"
								type="button"
								:disabled="submitStatus === 'PENDING'"
								@click="updateCompanyContact(getCompany, fromEdit, $event)"
						>
							Save
						</button>
					</p>
				</div>
			</div>
		</ScCardBody>
	</ScCard>

</template>

<script>
    import {scHelpers, scVars, scFakeData} from "~/assets/js/utils";
    import {validationMixin} from 'vuelidate'
    import {required, minLength} from 'vuelidate/lib/validators'
    import ScInput from '~/components/Input'
    import ScTextarea from '~/components/Textarea'
    import moment from 'moment'
    import _ from "lodash";
    import {EMPTY, from, of, Subject} from "rxjs";
    import {catchError, debounceTime, mergeMap, tap} from "rxjs/operators";

    const {first, last, email, name} = scFakeData;
    const {uniqueID, isHiRes} = scHelpers;
    if (process.client) {
        require('~/plugins/velocity.client.js');
        require('~/plugins/jquery');
        require('~/assets/js/vendor/jquery.quicksearch.js');
        require('~/plugins/inputmask');
    }

    export default {
        components: {
            moment,
            ScInput,
            ScTextarea,
            MultiSelect: process.client ? () => import('~/components/Multiselect') : null,
        },
        data: () => ({
            basic: {
                model: []
            },
            pageActive: false,
            editUserTransition: false,
            submitStatus: null,
            brandOption: [],
			customerTypeOption: [],
			contactStatus: [],
            fromEdit: {
            	companyName: '',
				branch: '',
				insurancePartners: [],
                phone1: '',
                phone2: '',
                phone3: '',
                phone4: '',
                phone5: '',
				customerType: {
            		id: '',
					name: ''
				},
				brand: '',
				customerCode: '',
				serviceCode: '',
				taxId: '',
				fax: '',
				website: '',
				country: '',
				note: '',
				certAddress: {
            		address: '',
					alley: '',
					subDistrict: '',
					district: '',
					province: '',
					zipCode: '',
				},
				otherAddress: {
            		address: '',
					alley: '',
					subDistrict: '',
					district: '',
					province: '',
					zipCode: ''
				},
				status: {
					id: '',
					name: ''
				},
				invoiceAddress: {
            		address: '',
					alley: '',
					subDistrict: '',
					district: '',
					province: '',
					zipCode: ''
				},
                remark: '',
                file1: '',
                file2: '',
                file3: '',
                file4: '',
                file5: '',
            },
            provinceList: [],
            searchSubDistrict: '',
            searchDistrict: '',
            searchProvince: '',
            searchZipCode: '',
            isOpenSubDistrict: false,
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
			oldDataCompany:{},
			statusOption: [
				{text: 'Active', value: 'active'},
				{text: 'In Active', value: 'inactive'},
				{text: 'Locked', value: 'locked'}
			],
			outsideGarageOption:[]

        }),
        mixins: [validationMixin],
        validations: {
            getCompany: {
                companyName: {
                    required
                },
                branch: {
                    required,
                },
                customerType: {
                    required
                },
                certAddress: {
                	address: {
						required
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
				phone1: {
					required,
					minLength: minLength(9)
				},
            },
        },
        computed: {
            getCompany() {
                return this.$store.getters.getCompanyById
            },
			getPartner() {
            	return this.$store.getters.getCompanyById.partner
			},
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
			garageOptions() {
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
        created() {
            this.searchSubDistrict$ = new Subject()
            this.searchDistrict$ = new Subject()
            this.searchProvince$ = new Subject()
            this.searchZipCode$ = new Subject()

        },
        mounted() {
            this.getCustomerType()
            this.getBrand()
            this.getInsurance()
            this.initObservableSubjectsSubDistrict()
            this.initObservableSubjectsDistrict()
            this.initObservableSubjectsProvince()
			this.initObservableSubjectsZipCode()
			this.getContactStatus()
			this.getGarage()
        },
		destroyed() {
        	$('#modal-addRemarkUpdateCompany').remove()
		},
		methods: {
            moment: function (date) {
                return moment(date).format('DD/MM/YYYY HH:mm');
            },
            deleteFile(key, fileName) {
				let loader = this.$loading.show({
					loader: 'spinner'
				})
                this.$swal.fire({
                    title: 'Confirm Delete!',
                    text: 'Are you sure you want to delete this item?',
                    showConfirmButton: true,
                    allowOutsideClick: false,
                    showCancelButton: true,
                    cancelButtonColor: '#ff7674',
                }).then((result) => {
                    if (result.value) {
                        var obj = {}
                         obj[key] = fileName;
                        this.$contactAdapter.deleteFile(this.getCompany.id,obj).then(resp => {
                            loader.hide()
                        	this.$emit('contact-company-update-summit', resp.data)
                            this.$swal("Successful!", "ลบไฟล์เรียบร้อยแล้วค่ะ", "success")
							this.fromEdit[key] = ''
                        }).catch(err => {
                        	loader.hide()
                            this.$swal("Error!", "ลบไฟล์ไม่สำเร็จ กรุณาทำรายการใหม่อีกครั้งค่ะ ! <br>" + err, "error")
                        })
                    } else if(result.dismiss) {
						loader.hide()
					}
                })
            },
			checkRequiredInput(getCompany, e){
				e.preventDefault();
				this.$v.$touch();
				if (this.$v.$invalid) {
					this.submitStatus = 'ERROR'
					this.$swal("Warning", "กรุณากรอกข้อมูลให้ครบถ้วน", "warning")
				}else {
					this.submitStatus = 'PENDING';
					setTimeout(() => {
						this.submitStatus = 'OK'
					}, 500)
					UIkit.modal('#modal-addRemarkUpdateCompany').show()
				}
			},
            updateCompanyContact(getCompany, fromEdit) {
            	let loader = this.$loading.show({
					loader: 'spinner'
				})
            	if(fromEdit.remark === ''){
            		loader.hide()
					this.$swal("Warning", "กรุณากรอก Remark", "warning")
				}else {
					this.$contactService.updateCompanyContact(getCompany, fromEdit).then(resp => {
						if (!!resp) {
							loader.hide()
							UIkit.modal('#modal-addRemarkUpdateCompany').hide();
							this.$emit('contact-company-update-summit', resp)
							this.$swal("Successful!", "อัพเดทข้อมูลเรียบร้อยแล้วค่ะ", "success")
							this.pageActive = !this.pageActive;
							this.$store.dispatch('getCompany', {})
							this.fromEdit.remark = ''
							this.$v.$reset()
							this.$parent.getContactCompanyList()
						}
					}).catch(err => {
						loader.hide()
						this.$swal("Error!", "บันทึกข้อมูลไม่สำเร็จ กรุณาทำรายการใหม่อีกครั้งค่ะ ! <br>" + err, "error")
						this.$v.$reset()
					})
				}
            },
            editCompanyContact(id) {
                if (_.isNil(id) || _.isEmpty(id)) {
                    this.$swal("Warning!", "กรุณาเลือก Company ที่ต้องการแก้ไขค่ะ!", "warning")
                } else {
                    this.getCompany.partner = []
                    this.$contactAdapter.getCompanyViewDataById(id).then(resp => {
                        this.$store.dispatch('getCompany', resp)
                        this.$store.dispatch('getCompanyById',resp)
                        this.pageActive = !this.pageActive
                    })
                }
            },
            cancelEdit() {
                this.pageActive = !this.pageActive
            },
            viewPeopleInCompany(id) {
                if (_.isNil(id) || _.isEmpty(id)) {
                    this.$swal("Warning!", "กรุณาเลือก Company ค่ะ!", "warning")
                    return
                }
				this.$store.dispatch('getDetailPeopleInCompanyById', {})
                this.$router.push(`/Contact/PersonalInCompany/list?company=${id}`)
            },
            viewHistoryLog(id) {
                if (_.isNil(id) || _.isEmpty(id)) {
                    this.$swal("Warning!", "กรุณาเลือก Company ค่ะ!", "warning")
					return
                }
                this.$router.push(`/Contact/Company/History?company=${id}`)
            },
            downloadFiles(item,nameFile) {
                this.$contactAdapter.downloadFiles(item).then(resp => {
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
				this.insuranceOption = []
                this.$masterAdapter.getAllPartner().then(resp => {
					this.insuranceOption = resp
                })
            },
            searchDataSubDistrict(keyword) {
                this.isOpenSubDistrict = true;
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
                        this.provinceList = result.data
                    }),
                    catchError(e => {
                        return EMPTY
                    }),
                ).subscribe(result => {
                    this.provinceList = result.data
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
                this.searchSubDistrict$.next(this.keyword)
            },
            searchDataInDistrict(keyword) {
                this.isOpenDistrictIn = true;
                this.keyword = keyword
                this.searchSubDistrict$.next(this.keyword)
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
                        this.provinceList = result.data
                    }),
                    catchError(e => {
                        return EMPTY
                    }),
                ).subscribe(result => {
                    this.provinceList = result.data
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
                        this.provinceList = result.data
                    }),
                    catchError(e => {
                        return EMPTY
                    }),
                ).subscribe(result => {
                    this.provinceList = result.data
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
                        this.provinceList = result.data
                    }),
                    catchError(e => {
                        return EMPTY
                    }),
                ).subscribe(result => {
                    this.provinceList = result.data
                })
            },
            getCertAddressProvinceById(id) {
                this.$contactAdapter.getProvinceById(id).then(resp => {
                    this.getCompany.certAddress.subDistrict = resp.district
                    this.getCompany.certAddress.district = resp.amphoe
                    this.getCompany.certAddress.province = resp.province
                    this.getCompany.certAddress.zipCode = resp.zipCode
                    this.getCompany.certAddress.region = resp.geoName
                    this.isOpenSubDistrict = false
                    this.isOpenDistrict = false
                    this.isOpenProvince = false
                    this.isOpenZipCode = false
                })
            },
            getOtherAddressProvinceById(id) {
                this.$contactAdapter.getProvinceById(id).then(resp => {
                    this.getCompany.otherAddress.subDistrict = resp.district
                    this.getCompany.otherAddress.district = resp.amphoe
                    this.getCompany.otherAddress.province = resp.province
                    this.getCompany.otherAddress.zipCode = resp.zipCode
                    this.getCompany.otherAddress.region = resp.geoName
                    this.isOpenOther = false
                    this.isOpenDistrictOther = false
                    this.isOpenProvinceOther = false
                    this.isOpenZipCodeOther = false
                })
            },
            getInAddressProvinceById(id) {
                this.$contactAdapter.getProvinceById(id).then(resp => {
                    this.getCompany.invoiceAddress.subDistrict = resp.district
                    this.getCompany.invoiceAddress.district = resp.amphoe
                    this.getCompany.invoiceAddress.province = resp.province
                    this.getCompany.invoiceAddress.zipCode = resp.zipCode
                    this.getCompany.invoiceAddress.region = resp.geoName
                    this.isOpenIn = false
                    this.isOpenDistrictIn = false
                    this.isOpenProvinceIn = false
                    this.isOpenZipCodeIn = false
                })
            },
			resetInput () {
				this.fromEdit.remark = ''
				this.$v.$reset()
			},
			checkEmpty (data) {
            	return !_.isEmpty(data) && !_.isNil(data)
			},
			mapDataStatus (data) {
				let map = ''
				if (data === 'active') {
					map = 'Active'
				}else if (data === 'inactive') {
					map = 'In Active'
				}else if (data === 'locked') {
					map = 'Locked'
				}else {
					map = ''
				}
				return map
			},
			getContactStatus(){
				this.$masterAdapter.getContactStatus().then(resp => {
					this.contactStatus.push({ 'value' : "" , 'text' : '-Select Status-' })
					for (let i = 0; i < resp.length ; i++) {
						this.contactStatus.push({ 'value' : resp[i].id , 'text' : resp[i].name })
					}
				})
			},
			getGarage() {
				this.$masterAdapter.getAllContactedGarage().then(resp => {
					this.outsideGarageOption = resp
				})
			},
        },
        watch: {
            'getCompany.certSubDistrict'() {
                if (this.getCompany.certSubDistrict === '') {
                    this.isOpenSubDistrict = false
                }
            },
            'getCompany.certDistrict'() {
                if (this.getCompany.certDistrict === '') {
                    this.isOpenDistrict = false
                }
            },
            'getCompany.certProvince'() {
                if (this.getCompany.certProvince === '') {
                    this.isOpenProvince = false
                }
            },
            'getCompany.certZipCode'() {
                if (this.getCompany.certZipCode === '') {
                    this.isOpenZipCode = false
                }
            },
            'getCompany.otherSubDistrict'() {
                if (this.getCompany.otherSubDistrict === '') {
                    this.isOpenOther = false
                }
            },
            'getCompany.otherDistrict'() {
                if (this.getCompany.otherDistrict === '') {
                    this.isOpenDistrictOther = false
                }
            },
            'formCompany.otherProvince'() {
                if (this.getCompany.otherProvince === '') {
                    this.isOpenProvinceOther = false
                }
            },
            'getCompany.otherZipCode'() {
                if (this.getCompany.otherZipCode === '') {
                    this.isOpenZipCodeOther = false
                }
            },
            'getCompany.invoiceSubDistrict'() {
                if (this.getCompany.invoiceSubDistrict === '') {
                    this.isOpenIn = false
                }
            },
            'getCompany.invoiceDistrict'() {
                if (this.getCompany.invoiceDistrict === '') {
                    this.isOpenDistrictIn = false
                }
            },
            'getCompany.invoiceProvince'() {
                if (this.getCompany.invoiceProvince === '') {
                    this.isOpenProvinceIn = false
                }
            },
            'getCompany.invoiceZipCode'() {
                if (this.getCompany.invoiceZipCode === '') {
                    this.isOpenZipCodeIn = false
                }
            },
        }
    }
</script>

<style lang="scss">
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
	.wrap {
		word-wrap: break-word;
	}
	.clrRed{
		color: rgb(255, 51, 51);
	}

	.clrBlue{
		color: blue;
	}

	.clrGrey{
		color: rgb(177, 177, 177);
	}
</style>


