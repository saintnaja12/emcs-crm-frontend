<template>
	<div id="app">
		<ScCard class="uk-margin-mini-top">
			<ScCardBody>
				<p class="sc-text-semibold uk-text-uppercase uk-heading-line">
					<span>ADD PERSONAL</span>
				</p>
				<transition name="slide-bottom-medium" mode="out-in">
					<div class="uk-form-stacked">
						<div class="sc-round sc-border uk-margin sc-padding">
							<div class="uk-child-width-1-2@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
								<div class="uk-width-1-2@xl">
									<label v-if="$v.formPersonal.firstName.$error" class="uk-form-label sc-vue-errors">
										<i class="mdi mdi-account-outline"></i>
										First Name / ชื่อ <span class="text-danger">*</span> :
									</label>
									<label v-else class="uk-form-label">
										<i class="mdi mdi-account-outline"></i>
										First Name / ชื่อ <span class="text-danger">*</span> :
									</label>
									<ScInput
										id="firstname"
										v-model="$v.formPersonal.firstName.$model"
										:error-state="$v.formPersonal.firstName.$error"
										:validator="$v.formPersonal.firstName"
									></ScInput>
								</div>
								<div class="uk-width-1-2@xl">
									<label v-if="$v.formPersonal.lastName.$error" class="uk-form-label sc-vue-errors">
										<i class="mdi mdi-account-outline"></i>
										Last Name / นามสกุล <span class="text-danger">*</span> :
									</label>
									<label v-else class="uk-form-label">
										<i class="mdi mdi-account-outline"></i>
										Last Name / นามสกุล <span class="text-danger">*</span> :
									</label>
									<ScInput
										id="lastname"
										v-model="$v.formPersonal.lastName.$model"
										:error-state="$v.formPersonal.lastName.$error"
										:validator="$v.formPersonal.lastName"
									></ScInput>
								</div>
								<div>
									<label class="uk-form-label">
										<i class="mdi mdi-briefcase-outline"></i>
										Position / ตำแหน่ง :
									</label>
									<ScInput id="position" v-model="formPersonal.position"></ScInput>
								</div>
								<div>
									<label v-if="$v.formPersonal.company.$error" class="uk-form-label sc-vue-errors">
										<i class="mdi mdi-city-variant-outline"></i>
										Company / บริษัท <span class="text-danger">*</span> :
									</label>
									<label v-else class="uk-form-label">
										<i class="mdi mdi-city-variant-outline"></i>
										Company / บริษัท <span class="text-danger">*</span> :
									</label>
									<ScInput id="company"
											 v-model="$v.formPersonal.company.$model"
											 :error-state="$v.formPersonal.company.$error"
											 :validator="$v.formPersonal.company"
									></ScInput>
								</div>
								<div class="uk-margin-top uk-width-1-1@l">
									<label class="uk-form-label">
										<i class="mdi mdi-home-city-outline"></i>
										Branch / สาขา :
									</label>
									<ScInput id="branch" v-model="formPersonal.branch"></ScInput>
								</div>
								<div>
									<label v-if="$v.formPersonal.customerType.$error" class="uk-form-label sc-vue-errors">
										<i class="mdi mdi-account-group-outline"></i>
										Customer Type / ประเภทลูกค้า <span class="text-danger">*</span> :
									</label>
									<label v-else class="uk-form-label">
										<i class="mdi mdi-account-group-outline"></i>
										Customer Type / ประเภทลูกค้า <span class="text-danger">*</span> :
									</label>
									<div class="uk-form-controls">
										<select id="customerType"
												v-model="$v.formPersonal.customerType.$model"
												:error-state="$v.formPersonal.customerType.$error"
												:validator="$v.formPersonal.customerType"
												class="uk-select" data-sc-input>
											<option
												v-for="option in customerTypeOption"
												v-bind:value="option.value"
											>{{ option.text }}</option>
										</select>
									</div>
								</div>
								<div v-if="formPersonal.customerType === '5e953437125b915144f92d41'" >
									<label class="uk-form-label">
										<i class="mdi mdi-tag-outline"></i>
										Brand / ยี่ห้อ <span class="text-danger">*</span> :
									</label>
									<select id="brand" v-model="formPersonal.brand" class="uk-select" data-sc-input>
										<option value="">
											ไม่ระบุ
										</option>
										<option
											v-for="option in brandOption"
											v-bind:value="option.value"
										>{{ option.text }}</option>
									</select>
								</div>
								<div v-else>
									<label class="uk-form-label">
										<i class="mdi mdi-tag-outline"></i>
										Brand / ยี่ห้อ <span class="text-danger">*</span> :
									</label>
									<select id="brand1" v-model="formPersonal.brand" class="uk-select" disabled data-sc-input>
										<option value="">
											ไม่ระบุ
										</option>
									</select>
								</div>
								<div class="uk-margin-top uk-width-1-1@l">
<!--									<label class="uk-form-label">-->
<!--										<i class="mdi mdi-account-multiple-check"></i>-->
<!--										Insurance Partners :-->
<!--									</label>-->
									<label class="uk-form-label">
										<i class="mdi mdi-account-multiple-check"></i>
										Insurance Partners (ในเครือ) :
									</label>
									<MultiSelect
										v-model="formPersonal.partner"
										:options="msBasicOptions"
									></MultiSelect>
								</div>
								<div class="uk-margin-top uk-width-1-1@l">
									<!--									<label class="uk-form-label">-->
									<!--										<i class="mdi mdi-account-multiple-check"></i>-->
									<!--										Insurance Partners :-->
									<!--									</label>-->
									<label class="uk-form-label">
										<i class="mdi mdi-account-multiple-check"></i>
										Insurance Partners (นอกเครือ) :
									</label>
									<MultiSelect
										v-model="formPersonal.garage"
										:options="garageOptions"
									></MultiSelect>
								</div>
								<div>
									<label v-if="$v.formPersonal.phone1.$error" class="uk-form-label sc-vue-errors">
										<i class="mdi mdi-cellphone-iphone"></i>
										Mobile 1 / โทรศัพท์ 1 (หลัก) <span class="text-danger">*</span>:
									</label>
									<label v-else class="uk-form-label">
										<i class="mdi mdi-cellphone-iphone"></i>
										Mobile 1 / โทรศัพท์ 1 (หลัก) <span class="text-danger">*</span>:
									</label>
									<ScInput id="phone1"
											 v-model="$v.formPersonal.phone1.$model"
											 :error-state="$v.formPersonal.phone1.$error"
											 :validator="$v.formPersonal.phone1"
											 v-input-mask="{ 'mask': '9', 'repeat': 10, 'greedy' : false }"
									></ScInput>
								</div>
								<div>
									<label class="uk-form-label">
										<i class="mdi mdi-cellphone-iphone"></i>
										Mobile 2 / โทรศัพท์ 2 :
									</label>
									<ScInput
										id="phone2"
										v-model="formPersonal.phone2"
										v-input-mask="{ 'mask': '9', 'repeat': 10, 'greedy' : false }"
									></ScInput>
								</div>
								<div>
									<label class="uk-form-label">
										<i class="mdi mdi-cellphone-iphone"></i>
										Mobile 3 / โทรศัพท์ 3 :
									</label>
									<ScInput id="phone3"
											 v-model="formPersonal.phone3"
											 v-input-mask="{ 'mask': '9', 'repeat': 10, 'greedy' : false }"
									></ScInput>
								</div>
								<div>
									<div>
										<label class="uk-form-label">
											<i class="mdi mdi-card-bulleted-outline"></i>
											Line ID / ไอดีไลน์ :
										</label>
										<div class="uk-form-controls">
											<ScInput id="line" v-model="formPersonal.lineId"></ScInput>
										</div>
									</div>
								</div>
								<div class="uk-margin-top uk-width-1-1@l">
									<label v-if="$v.formPersonal.email.$error" class="uk-form-label sc-vue-errors">
										<i class=" mdi mdi-email-outline"></i>
										Email / อีเมล <span class="text-danger">*</span>:
									</label>
									<label v-else class="uk-form-label">
										<i class=" mdi mdi-email-outline"></i>
										Email / อีเมล <span class="text-danger">*</span>:
									</label>
									<div class="uk-form-controls">
										<ScInput id="email"
												 v-model="$v.formPersonal.email.$model"
												 :error-state="$v.formPersonal.email.$error"
												 :validator="$v.formPersonal.email"
										></ScInput>
									</div>
								</div>
								<div class="uk-margin-top uk-width-1-1@l">
									<label class="uk-form-label">
										<i class="mdi mdi-file-document-edit-outline"></i>
										Note / บันทึก :
									</label>
									<ScTextarea
										id="note"
										v-model="formPersonal.note"
										:rows="1"
									></ScTextarea>
								</div>
								<div class="uk-width-1-1@xl">
									<label class="uk-form-label">
										<i class="mdi mdi-routes"></i>
										Status / สถานะ <span class="text-danger">*</span> :
									</label>
									<select v-model="formPersonal.status" class="uk-select" data-sc-input>
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
							<span>Address / ที่อยู่ </span>
						</p>
						<div class="sc-round sc-border uk-margin sc-padding">
							<div class="uk-child-width-1-2@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
								<div class="uk-width-1-2@xl">
									<label v-if="$v.formPersonal.addressAddress.$error" class="uk-form-label sc-vue-errors">
										<i class="mdi mdi-numeric"></i>
										Address / เลขที่ <span class="text-danger">*</span> :
									</label>
									<label v-else class="uk-form-label">
										<i class="mdi mdi-numeric"></i>
										Address / เลขที่ <span class="text-danger">*</span> :
									</label>
									<div class="uk-form-controls">
										<ScInput id="address"
												 v-model="$v.formPersonal.addressAddress.$model"
												 :error-state="$v.formPersonal.addressAddress.$error"
												 :validator="$v.formPersonal.addressAddress"
										></ScInput>
									</div>
								</div>
								<div class="uk-width-1-2@xl">
									<label class="uk-form-label">
										<i class="mdi mdi-axis"></i>
										Alley / ซอย :
									</label>
									<div class="uk-form-controls">
										<ScInput id="alley" v-model="formPersonal.addressAlley"></ScInput>
									</div>
								</div>
								<div>
									<div>
										<label v-if="$v.formPersonal.addressSubDistrict.$error" class="uk-form-label sc-vue-errors">
											<i class="mdi mdi-home"></i>
											Subdistrict / แขวง/ตำบล <span class="text-danger">*</span> :
										</label>
										<label v-else class="uk-form-label">
											<i class="mdi mdi-home"></i>
											Subdistrict / แขวง/ตำบล <span class="text-danger">*</span> :
										</label>
										<div class="uk-form-controls">
											<div class="autocomplete">
												<ScInput id="subdistrict"
														 v-model="$v.formPersonal.addressSubDistrict.$model"
														 :error-state="$v.formPersonal.addressSubDistrict.$error"
														 :validator="$v.formPersonal.addressSubDistrict"
														 @input="searchDataSubDistrict"
												>
												</ScInput>
												<ul class="autocomplete-results" v-if="isOpen">
													<li class="autocomplete-result" v-for="item in provinceList" @click="getProvinceById(item.id)">
														<b>{{item.district}}</b> {{item.amphoe}} {{item.province}} {{item.zipCode}}
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<div>
									<div>
										<label v-if="$v.formPersonal.addressDistrict.$error" class="uk-form-label sc-vue-errors">
											<i class="mdi mdi-home"></i>
											District / เขต/อำเภอ <span class="text-danger">*</span> :
										</label>
										<label v-else class="uk-form-label">
											<i class="mdi mdi-home"></i>
											District / เขต/อำเภอ <span class="text-danger">*</span> :
										</label>
										<div class="uk-form-controls">
											<div class="autocomplete">
												<ScInput id="district"
														 v-model="$v.formPersonal.addressDistrict.$model"
														 :error-state="$v.formPersonal.addressDistrict.$error"
														 :validator="$v.formPersonal.addressDistrict"
														 @input="searchDataDistrict"
												></ScInput>
												<ul class="autocomplete-results" v-if="isOpenDistrict">
													<li class="autocomplete-result"  v-for="item in provinceList" @click="getProvinceById(item.id)">
														{{item.district}} <b>{{item.amphoe}}</b> {{item.province}} {{item.zipCode}}
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<div>
									<label v-if="$v.formPersonal.addressProvince.$error" class="uk-form-label sc-vue-errors">
										<i class="mdi mdi-flag-variant"></i>
										Province / จังหวัด <span class="text-danger">*</span> :
									</label>
									<label v-else class="uk-form-label">
										<i class="mdi mdi-flag-variant"></i>
										Province / จังหวัด <span class="text-danger">*</span> :
									</label>
									<div class="uk-form-controls">
										<div class="autocomplete">
											<ScInput id="addressProvince"
													 v-model="$v.formPersonal.addressProvince.$model"
													 :error-state="$v.formPersonal.addressProvince.$error"
													 :validator="$v.formPersonal.addressProvince"
													 @input="searchDataProvince"
											></ScInput>
											<ul class="autocomplete-results"  v-if="isOpenProvince">
												<li class="autocomplete-result" v-for="item in provinceList" @click="getProvinceById(item.id)">
													{{item.district}} {{item.amphoe}} <b>{{item.province}}</b> {{item.zipCode}}
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div>
									<label v-if="$v.formPersonal.addressZipCode.$error" class="uk-form-label sc-vue-errors">
										<i class="mdi mdi-mailbox"></i>
										Zip Code / รหัสไปรษณีย์ <span class="text-danger">*</span> :
									</label>
									<label v-else class="uk-form-label">
										<i class="mdi mdi-mailbox"></i>
										Zip Code / รหัสไปรษณีย์ <span class="text-danger">*</span> :
									</label>
									<div class="uk-form-controls">
										<div class="autocomplete">
											<ScInput id="zipCode"
													 v-model="$v.formPersonal.addressZipCode.$model"
													 :error-state="$v.formPersonal.addressZipCode.$error"
													 :validator="$v.formPersonal.addressZipCode"
													 v-input-mask="{ 'mask': '9', 'repeat': 5, 'greedy' : false }"
													 @input="searchDataZipCode"
											></ScInput>
											<ul class="autocomplete-results"  v-if="isOpenZipCode">
												<li class="autocomplete-result" v-for="item in provinceList" @click="getProvinceById(item.id)">
													{{item.district}} {{item.amphoe}} {{item.province}} <b>{{item.zipCode}}</b>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
						<a href="javascript:void(0)" class="sc-button sc-button-primary sc-button-social" :disabled="submitStatus === 'PENDING'" @click="createPersonal($event)">
							<span>SAVE</span><i class="mdi mdi-content-save-outline"></i>
						</a>
						<a href="javascript:void(0)" class="sc-button sc-button-danger sc-button-social" @click="toggleData">
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
	import { Subject, EMPTY, from, of } from 'rxjs'
	import { mergeMap, debounceTime, tap, catchError } from 'rxjs/operators'
	import _ from "lodash";
	import { validationMixin } from 'vuelidate'
	import { required, minLength , email} from 'vuelidate/lib/validators'
	if(process.client) {
		require('~/plugins/inputmask');
	}
	export default {
		components: {
			ScInput,
			ScTextarea,
			MultiSelect: process.client ? () => import('~/components/Multiselect') : null
		},
		mixins: [validationMixin],
		data: () => ({
			submitStatus: null,
			formPersonal:{
				firstName: "",
				lastName: "",
				position: "",
				company: "",
				branch: "",
				brand: "",
				customerType: "",
				phone1: "",
				phone2: "",
				phone3: "",
				email: "",
				lineId: "",
				note: "",
				status: "active",
				partner:[],
				garage:[],
				addressAddress: "",
				addressAlley: "",
				addressSubDistrict: "",
				addressDistrict: "",
				addressProvince: "",
				addressZipCode: ""

			},
			brandOption: [],
			customerTypeOption: [],
			insuranceOption:[],
			provinceList:[],
			searchSubDistrict:'',
			searchDistrict:'',
			searchProvince:'',
			searchZipCode:'',
			isOpen: false,
			isOpenDistrict: false,
			isOpenProvince: false,
			isOpenZipCode: false,
			contactStatus: [],
			outsideGarageOption: []
		}),
		validations: {
			formPersonal: {
				firstName: {
					required,
				},
				lastName: {
					required,
				},
				company: {
					required,
				},
				customerType:{
					required
				},
				phone1: {
					required,
					minLength: minLength(9)
				},
				email:{
					email,
				},
				addressAddress:{
					required
				},
				addressSubDistrict:{
					required
				},
				addressDistrict:{
					required
				},
				addressProvince:{
					required
				},
				addressZipCode:{
					required
				},
			},
		},
		created() {
			this.searchSubDistrict$ = new Subject()
			this.searchDistrict$ = new Subject()
			this.searchProvince$ = new Subject()
			this.searchZipCode$ = new Subject()
		},
		computed:{
			msBasicOptions () {
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
			garageOptions () {
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
		mounted () {
			this.getCustomerTypeOption()
			this.initObservableSubjectsSubDistrict()
			this.initObservableSubjectsDistrict()
			this.initObservableSubjectsProvince()
			this.initObservableSubjectsZipCode()
			this.getInsurance()
			this.getBrand()
			this.getContactStatus()
			this.getOutsideGarage()
		},

		methods: {
			toggleData () {
				this.$store.dispatch('pagePersonalView', true);
				this.$store.dispatch('pagePersonalCreate', false);

			},
			createPersonal (e) {
				e.preventDefault();
				this.$v.$touch();
				if (this.$v.$invalid) {
					this.submitStatus = 'ERROR'
					this.$swal("Warning", "กรุณากรอกข้อมูลให้ครบถ้วน", "warning")
				} else {
					this.submitStatus = 'PENDING';
					setTimeout(() => {
						this.submitStatus = 'OK'
					}, 500)

					this.$contactService.createPersonal(this.formPersonal).then(resp => {
						if (!!resp) {
							this.$swal("Successful", "บันทึกข้อมูลสำเร็จ", "success")
                            this.$emit('contact-personal-save-summit',resp)
							this.clearFormCreate()
							this.toggleData()
						}
					}).catch(err => {
						this.$swal("Error!", "บันทึกข้อมูลไม่สำเร็จ กรุณากรอกข้อมูลให้ครบถ้วนค่ะ!!" + '<br>' + err, "error")
					})
				}
			},
			clearFormCreate() {
				this.formPersonal.firstName = ''
				this.formPersonal.lastName = ''
				this.formPersonal.position = ''
				this.formPersonal.company = ''
				this.formPersonal.branch = ''
				this.formPersonal.branch = ''
				this.formPersonal.customerType = ''
				this.formPersonal.phone1 = ''
				this.formPersonal.phone2 = ''
				this.formPersonal.phone3 = ''
				this.formPersonal.lineId = ''
				this.formPersonal.email = ''
				this.formPersonal.note = ''
				this.formPersonal.partner = []
				this.formPersonal.addressAddress = ''
				this.formPersonal.addressAlley = ''
				this.formPersonal.addressSubDistrict = ''
				this.formPersonal.addressDistrict = ''
				this.formPersonal.addressProvince = ''
				this.formPersonal.addressZipCode = ''
			},

			getCustomerTypeOption(){
				this.$masterAdapter.getAllCustomerTypes().then(resp => {
					this.customerTypeOption = resp
				})
			},
			getInsurance(){
				this.$masterAdapter.getAllPartner().then(resp => {
					this.insuranceOption = resp
				})
			},
			getBrand(){
				this.$masterAdapter.getAllBrand().then(resp => {
					this.brandOption = resp
				})
			},
			searchDataSubDistrict(keyword){
				this.isOpen = true;
				this.keyword = keyword
				this.searchSubDistrict$.next(this.keyword)
			},
			initObservableSubjectsSubDistrict(){
				this.searchSubDistrict$.pipe(
					debounceTime(1200),
					mergeMap((keyword) => {
						return from( this.$contactService.searchSubDistrict(keyword)).pipe(
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
								this.formPersonal.addressSubDistrict = ''
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
						}).then((resp) => {
							this.formPersonal.addressSubDistrict = ''
						})
						this.provinceList = result.data
					}else {
						this.provinceList = result.data
					}
				})
			},
			searchDataDistrict(keyword){
				this.isOpenDistrict = true;
				this.keyword = keyword
				this.searchDistrict$.next(this.keyword)
			},
			initObservableSubjectsDistrict(){
				this.searchDistrict$.pipe(
					debounceTime(1200),
					mergeMap((keyword) => {
						return from( this.$contactService.searchDistrict(keyword)).pipe(
							catchError(e => {
								return of(e)
							}),
						)
					}),
					tap(result => {
						if(result.total === 0 && this.keyword !== ''){
							this.$swal.fire({
								title:'Warning!',
								text:'อำเภอนี้ไม่มีในระบบ กรุณากรอกข้อมูลให้ถูกต้องค่ะ !',
								icon:'warning'
							}).then((resp) => {
								this.formPersonal.addressDistrict = ''
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
							text:'อำเภอนี้ไม่มีในระบบ กรุณากรอกข้อมูลให้ถูกต้องค่ะ !',
							icon:'warning'
						}).then((resp) => {
							this.formPersonal.addressDistrict = ''
						})
						this.provinceList = result.data
					}else {
						this.provinceList = result.data
					}
				})
			},
			searchDataProvince(keyword){
				this.isOpenProvince = true
				this.keyword = keyword
				this.searchProvince$.next(this.keyword)
			},
			initObservableSubjectsProvince(){
				this.searchProvince$.pipe(
					debounceTime(1200),
					mergeMap((keyword) => {
						return from( this.$contactService.searchProvince(keyword)).pipe(
							catchError(e => {
								return of(e)
							}),
						)
					}),
					tap(result => {
						if(result.total === 0 && this.keyword !== ''){
							this.$swal.fire({
								title:'Warning!',
								text:'จังหวัดนี้ไม่มีในระบบ กรุณากรอกข้อมูลให้ถูกต้องค่ะ !',
								icon:'warning'
							}).then((resp) => {
								this.formPersonal.addressProvince = ''
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
							text:'จังหวัดนี้ไม่มีในระบบ กรุณากรอกข้อมูลให้ถูกต้องค่ะ !',
							icon:'warning'
						}).then((resp) => {
							this.formPersonal.addressProvince = ''
						})
						this.provinceList = result.data
					}else {
						this.provinceList = result.data
					}
				})
			},
			searchDataZipCode(keyword){
				this.isOpenZipCode = true
				this.keyword = keyword
				this.searchZipCode$.next(this.keyword)
			},
			initObservableSubjectsZipCode(){
				this.searchZipCode$.pipe(
					debounceTime(1200),
					mergeMap((keyword) => {
						return from( this.$contactService.searchZipCode(keyword)).pipe(
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
								this.formPersonal.addressZipCode = ''
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
							text:'รหัสไปรษณีย์นี้ไม่มีในระบบ กรุณากรอกข้อมูลให้ถูกต้องค่ะ !',
							icon:'warning'
						}).then((resp) => {
							this.formPersonal.addressZipCode = ''
						})
						this.provinceList = result.data
					}else {
						this.provinceList = result.data
					}
				})
			},
			getProvinceById(id){
				this.$contactAdapter.getProvinceById(id).then(resp => {
					this.formPersonal.addressSubDistrict = resp.district
					this.formPersonal.addressDistrict = resp.amphoe
					this.formPersonal.addressProvince = resp.province
					this.formPersonal.addressZipCode = resp.zipCode
					this.isOpen = false
					this.isOpenDistrict = false
					this.isOpenProvince = false
					this.isOpenZipCode = false
				})
			},
			getContactStatus(){
				this.$masterAdapter.getContactStatus().then(resp => {
					this.contactStatus.push({ 'value' : "" , 'text' : '-Select Status-' })
					for (let i = 0; i < resp.length ; i++) {
						this.contactStatus.push({ 'value' : resp[i].id , 'text' : resp[i].name })
					}
				})
			},
			getOutsideGarage() {
				this.$masterAdapter.getAllContactedGarage().then(resp => {
					this.outsideGarageOption = resp
				})
			},
		},
		watch:{
			'formPersonal.addressSubDistrict' (newValue) {
				if(this.formPersonal.addressSubDistrict === ''){
					this.isOpen = false
				}
			},
			'formPersonal.addressDistrict' (newValue) {
				if(this.formPersonal.addressDistrict === ''){
					this.isOpenDistrict = false
				}
			},
			'formPersonal.addressProvince' (newValue) {
				if(this.formPersonal.addressProvince === ''){
					this.isOpenProvince = false
				}
			},
			'formPersonal.addressZipCode' (newValue) {
				if(this.formPersonal.addressZipCode === ''){
					this.isOpenZipCode = false
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
	.autocomplete {
		display: inline-block;
		position: relative;
		border-width: 0 0 1px 0 !important;
		box-shadow: inset 0 0px 0px rgba(0, 0, 0,0.8) !important;
		border-color: rgba(0, 0, 0, 0.05) !important;
		border-radius: 4px 4px 0 0 !important;
		max-width: 100%;
		width: 100%;
		padding: 0 0 0 0px;
		overflow: visible;
		vertical-align: middle;
		&:focus {
			border-color:rgba(0, 0, 0, 0.08) !important;
			outline: -webkit-focus-ring-color auto 0px;
		}
	}

	.autocomplete-results {
		position: absolute;
		border: 1px solid #d4d4d4;
		border-bottom: 1px solid #d4d4d4;
		border-top: none;
		margin-bottom: 10px;
		z-index: 9999999;
		top: 100%;
		left: 0;
		right: 0;
		overflow: auto;
		width: 100%;
		max-height: 200px;
		padding: 2px;
		cursor: pointer;
		background-color: #fff;
	}

	.autocomplete-result {
		padding: 10px;
		cursor: pointer;
		background-color: #fff;
		border-bottom: 1px solid #d4d4d4;
		width: 100%;
		height: 100%;
	}

	.autocomplete-result.is-active,
	.autocomplete-result:hover {
		background-color: DodgerBlue !important;
		color: #ffffff;
	}

</style>
