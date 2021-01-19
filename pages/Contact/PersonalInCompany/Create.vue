<template>
  <div id="app">
    <ScCard class="uk-margin-mini-top">
      <ScCardBody>
        <p class="sc-text-semibold uk-text-uppercase uk-heading-line">
          <span>ADD PEOPLE IN COMPANY {{companyData.companyName}}</span>
        </p>
        <transition name="slide-bottom-medium" mode="out-in">
          <div class="uk-form-stacked">
            <div class="sc-round sc-border uk-margin sc-padding">
              <div class="uk-child-width-1-2@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
				  <div>
					  <label v-if="$v.formPeopleCompany.firstName.$error" class="uk-form-label sc-vue-errors">
						  <i class="mdi mdi-account-outline"></i>
						  First Name / ชื่อ<span class="text-danger">*</span> :
					  </label>
					  <label v-else class="uk-form-label">
						  <i class="mdi mdi-account-outline"></i>
						  First Name / ชื่อ<span class="text-danger">*</span> :
					  </label>
					  <ScInput id="firstName"
							   v-model="$v.formPeopleCompany.firstName.$model"
							   :error-state="$v.formPeopleCompany.firstName.$error"
							   :validator="$v.formPeopleCompany.firstName"
					  ></ScInput>
				  </div>
				  <div>
					  <label v-if="$v.formPeopleCompany.lastName.$error" class="uk-form-label sc-vue-errors">
						  <i class="mdi mdi-account-outline"></i>
						  Sur Name / นามสกุล<span class="text-danger">*</span> :
					  </label>
					  <label v-else class="uk-form-label">
						  <i class="mdi mdi-account-outline"></i>
						  Sur Name / นามสกุล<span class="text-danger">*</span> :
					  </label>
					  <ScInput id="lastName"
							   v-model="$v.formPeopleCompany.lastName.$model"
							   :error-state="$v.formPeopleCompany.lastName.$error"
							   :validator="$v.formPeopleCompany.lastName"
					  ></ScInput>
				  </div>
				  <div>
					  <div class="uk-margin">
						  <label class="uk-form-label">
							  <i class="mdi mdi-briefcase-outline"></i>
							  Position / ตำแหน่ง<span class="text-danger">*</span> :
						  </label>
						  <div class="uk-form-controls">
							  <ScInput id="position" v-model="formPeopleCompany.position"></ScInput>
						  </div>
					  </div>
				  </div>
				  <div>
					  <label v-if="$v.formPeopleCompany.phone1.$error" class="uk-form-label sc-vue-errors">
						  <i class="mdi mdi-cellphone-iphone"></i>
						  Mobile 1 / โทรศัพท์ 1<span class="text-danger">*</span> :
					  </label>
					  <label v-else class="uk-form-label">
						  <i class="mdi mdi-cellphone-iphone"></i>
						  Mobile 1 / โทรศัพท์ 1<span class="text-danger">*</span> :
					  </label>
					  <ScInput id="mobile1"
							   v-model="$v.formPeopleCompany.phone1.$model"
							   :error-state="$v.formPeopleCompany.phone1.$error"
							   :validator="$v.formPeopleCompany.phone1"
							   v-input-mask="{ 'mask': '9', 'repeat': 10, 'greedy' : false }"
					  ></ScInput>
				  </div>
				  <div>
					  <label class="uk-form-label">
						  <i class="mdi mdi-cellphone-iphone"></i>
						  Mobile 2 / โทรศัพท์ 2 :
					  </label>
					  <ScInput id="mobile2"
							   v-model="formPeopleCompany.phone2"
							   v-input-mask="{ 'mask': '9', 'repeat': 10, 'greedy' : false }"
					  ></ScInput>
				  </div>
				  <div>
					  <label class="uk-form-label">
						  <i class="mdi mdi-cellphone-iphone"></i>
						  Mobile 3 / โทรศัพท์ 3 :
					  </label>
					  <ScInput id="mobile3"
							   v-model="formPeopleCompany.phone3"
							   v-input-mask="{ 'mask': '9', 'repeat': 10, 'greedy' : false }"
					  ></ScInput>
				  </div>
				  <div>
					  <label v-if="$v.formPeopleCompany.email.$error" class="uk-form-label sc-vue-errors">
						  <i class=" mdi mdi-email-outline"></i>
						  Email / อีเมล :
					  </label>
					  <label v-else class="uk-form-label">
						  <i class=" mdi mdi-email-outline"></i>
						  Email / อีเมล :
					  </label>
					  <ScInput id="email"
							   v-model="$v.formPeopleCompany.email.$model"
							   :error-state="$v.formPeopleCompany.email.$error"
							   :validator="$v.formPeopleCompany.email"
					  >

					  </ScInput>
				  </div>
				  <div>
					  <label  class="uk-form-label">
						  <i class="mdi mdi-card-bulleted-outline"></i>
						  Line ID / ไอดีไลน์ :
					  </label>
					  <ScInput id="lineId" v-model="formPeopleCompany.lineId"></ScInput>
				  </div>
				  <div class="uk-margin-top uk-width-1-1@l">
					  <label class="uk-form-label">
						  <i class="mdi mdi-file-document-edit-outline"></i>
						  Note / บันทึก :
					  </label>
					  <ScInput id="note"
							   v-model="formPeopleCompany.note"
					  ></ScInput>
				  </div>
				  <div class="uk-width-1-1@xl">
					  <label class="uk-form-label">
						  <i class="mdi mdi-routes"></i>
						  Status / สถานะ <span class="text-danger">*</span> :
					  </label>
 
					  <select v-model="formPeopleCompany.status.id" class="uk-select" data-sc-input>
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
				  <span>Address / ที่อยู่</span>
			  </p>
			  <div class="sc-round sc-border uk-margin sc-padding">
				  <div class="uk-child-width-1-2@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
					  <div class="uk-width-1-2@xl">
						  <label v-if="$v.formPeopleCompany.address.address.$error" class="uk-form-label sc-vue-errors">
							  <i class="mdi mdi-numeric"></i>
							  Address / เลขที่<span class="text-danger">*</span> :
						  </label>
						  <label v-else class="uk-form-label">
							  <i class="mdi mdi-numeric"></i>
							  Address / เลขที<span class="text-danger">*</span> :
						  </label>
						  <div class="uk-form-controls">
							  <ScInput id="address"
									   v-model="$v.formPeopleCompany.address.address.$model"
									   :error-state="$v.formPeopleCompany.address.address.$error"
									   :validator="$v.formPeopleCompany.address.address"
							  ></ScInput>
						  </div>
					  </div>
					  <div class="uk-width-1-2@xl">
						  <label class="uk-form-label">
							  <i class="mdi mdi-axis"></i>
							  Alley / ซอย :
						  </label>
						  <div class="uk-form-controls">
							  <ScInput id="alley" v-model="formPeopleCompany.address.alley"></ScInput>
						  </div>
					  </div>
					  <div>
						  <div>
							  <label v-if="$v.formPeopleCompany.address.subDistrict.$error" class="uk-form-label sc-vue-errors">
								  <i class="mdi mdi-home"></i>
								  Subdistrict / แขวง/ตำบล<span class="text-danger">*</span> :
							  </label>
							  <label v-else class="uk-form-label">
								  <i class="mdi mdi-home"></i>
								  Subdistrict / แขวง/ตำบล<span class="text-danger">*</span> :
							  </label>
							  <div class="uk-form-controls">
								  <div class="autocomplete">
									  <ScInput id="subdistrict"
											   v-model="$v.formPeopleCompany.address.subDistrict.$model"
											   :error-state="$v.formPeopleCompany.address.subDistrict.$error"
											   :validator="$v.formPeopleCompany.address.subDistrict"
											   @input="searchDataSubDistrict"
									  ></ScInput>
									  <ul class="autocomplete-results" v-if="isOpenSubDistrict">
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
							  <label v-if="$v.formPeopleCompany.address.district.$error" class="uk-form-label sc-vue-errors">
								  <i class="mdi mdi-home"></i>
								  District / เขต/อำเภอ<span class="text-danger">*</span> :
							  </label>
							  <label v-else class="uk-form-label">
								  <i class="mdi mdi-home"></i>
								  District / เขต/อำเภอ<span class="text-danger">*</span> :
							  </label>
							  <div class="uk-form-controls">
								  <div class="autocomplete">
									  <ScInput id="district"
											   v-model="$v.formPeopleCompany.address.district.$model"
											   :error-state="$v.formPeopleCompany.address.district.$error"
											   :validator="$v.formPeopleCompany.address.district"
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
						  <label v-if="$v.formPeopleCompany.address.province.$error" class="uk-form-label sc-vue-errors">
							  <i class="mdi mdi-flag-variant"></i>
							  Province / จังหวัด<span class="text-danger">*</span> :
						  </label>
						  <label v-else class="uk-form-label">
							  <i class="mdi mdi-flag-variant"></i>
							  Province / จังหวัด<span class="text-danger">*</span> :
						  </label>
						  <div class="uk-form-controls">
							  <div class="autocomplete">
								  <ScInput id="addressProvince"
										   v-model="$v.formPeopleCompany.address.province.$model"
										   :error-state="$v.formPeopleCompany.address.province.$error"
										   :validator="$v.formPeopleCompany.address.province"
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
						  <label v-if="$v.formPeopleCompany.address.zipCode.$error" class="uk-form-label sc-vue-errors">
							  <i class="mdi mdi-mailbox"></i>
							  Zip Code / รหัสไปรษณีย์<span class="text-danger">*</span> :
						  </label>
						  <label v-else class="uk-form-label">
							  <i class="mdi mdi-mailbox"></i>
							  Zip Code / รหัสไปรษณีย์<span class="text-danger">*</span> :
						  </label>
						  <div class="uk-form-controls">
							  <div class="autocomplete">
								  <ScInput id="zipCode"
										   v-model="$v.formPeopleCompany.address.zipCode.$model"
										   :error-state="$v.formPeopleCompany.address.zipCode.$error"
										   :validator="$v.formPeopleCompany.address.zipCode"
										   v-input-mask="{ 'mask': '9', 'repeat': 5, 'greedy' : false }"
										   @input="searchDataZipCode"></ScInput>
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

            <a href="javascript:void(0)" class="sc-button sc-button-primary sc-button-social" :disabled="submitStatus === 'PENDING'" @click="createPeopleCompany($event)">
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
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'

import ScInput from '~/components/Input'
import ScTextarea from '~/components/Textarea'

import { scFakeData } from '~/assets/js/utils'
import _ from "lodash";
import {EMPTY, from, of, Subject} from "rxjs";
import {catchError, debounceTime, mergeMap, tap} from "rxjs/operators";
const { name } = scFakeData;

require('~/plugins/jquery');
if(process.client) {
	require('~/assets/js/vendor/jquery.quicksearch.js');
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
		basic: {
			model: []
		},
		contactStatus: [],
        formPeopleCompany:{
			firstName:'',
			lastName:'',
			address: {
				address: '',
				alley: '',
				subDistrict: '',
				district: '',
				province: '',
				zipCode: '',
			},
			company:'',
			email:'',
			position:'',
			phone1:'',
			phone2:'',
			phone3:'',
			lineId:'',
			note:'',
			status:{
				id: '',
				name: ''
			}
		},
		brandOption: [],
		customerTypeOption: [],
		insuranceOption:[],
		provinceList:[],
		searchSubDistrict:'',
		searchDistrict:'',
		searchProvince:'',
		searchZipCode:'',
		isOpenSubDistrict: false,
		isOpenDistrict: false,
		isOpenProvince: false,
		isOpenZipCode: false,
		statusOption: [
			{text: 'Active', value: 'active'},
			{text: 'In Active', value: 'inactive'},
			{text: 'Locked', value: 'locked'}
		]
    }),
	computed: {
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
		companyData(){
			return this.$store.getters.getCompanyById
		},
	},
    validations: {
        formPeopleCompany: {
            firstName: {
                required,
            },
            lastName: {
                required,
            },
			phone1: {
                required,
                minLength: minLength(10)
            },
			email:{
            	email,
			},
			position: {
            	required
			},
			address: {
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
        }
    },
	created() {
		this.companyId = this.$route.query.company
		this.searchSubDistrict$ = new Subject()
		this.searchDistrict$ = new Subject()
		this.searchProvince$ = new Subject()
		this.searchZipCode$ = new Subject()
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
    },
    methods: {
        toggleData () {
			this.$store.dispatch('pagePeopleInCompanyView', true);
			this.$store.dispatch('pagePeopleInCompanyCreate', false);
        },
		createPeopleCompany (e) {
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

				this.$contactService.createPeopleCompany(this.formPeopleCompany,this.companyData).then(resp => {
					if (!!resp) {
						this.$swal("Successful", "บันทึกข้อมูลสำเร็จ", "success")
						this.toggleData()
						this.$parent.getListPeopleInCompany()
					}
				}).catch(err => {
					this.$swal("Error!", "บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ!!" + '<br>' + err, "error")
					this.toggleData()
				})
			}
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
			this.isOpenSubDistrict = true;
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
						this.$swal("Warning!", "ตำบลนี้ไม่มีในระบบ กรุณากรอกข้อมูลให้ถูกต้องค่ะ !", "warning")
						this.formPeopleCompany.address.subDistrict = ''
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
					this.$swal("Warning!", "ตำบลนี้ไม่มีในระบบ กรุณากรอกข้อมูลให้ถูกต้องค่ะ !", "warning")
					this.formPeopleCompany.address.subDistrict = ''
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
						this.$swal("Warning!", "อำเภอนี้ไม่มีในระบบ กรุณากรอกข้อมูลให้ถูกต้องค่ะ !", "warning")
						this.formPeopleCompany.address.district = ''
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
					this.formPeopleCompany.address.district = ''
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
						this.$swal("Warning!", "จังหวัดนี้ไม่มีในระบบ กรุณากรอกข้อมูลให้ถูกต้องค่ะ !", "warning")
						this.formPeopleCompany.address.province = ''
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
					this.formPeopleCompany.address.province = ''
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
						this.$swal("Warning!", "จังหวัดนี้ไม่มีในระบบ กรุณากรอกข้อมูลให้ถูกต้องค่ะ !", "warning")
						this.formPeopleCompany.address.zipCode = ''
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
					this.formPeopleCompany.address.zipCode = ''
				}else {
					this.provinceList = result.data
				}
			})
		},
		getProvinceById(id){
			this.$contactAdapter.getProvinceById(id).then(resp => {
				this.formPeopleCompany.address.subDistrict = resp.district
				this.formPeopleCompany.address.district = resp.amphoe
				this.formPeopleCompany.address.province = resp.province
				this.formPeopleCompany.address.zipCode = resp.zipCode
				this.isOpenSubDistrict = false
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
		}
    },
	watch:{
		'formPeopleCompany.addressSubDistrict' (newValue) {
			if(this.formPeopleCompany.addressSubDistrict === ''){
				this.isOpenSubDistrict = false
			}
		},
		'formPeopleCompany.addressDistrict' (newValue) {
			if(this.formPeopleCompany.addressDistrict === ''){
				this.isOpenDistrict = false
			}
		},
		'formPeopleCompany.addressProvince' (newValue) {
			if(this.formPeopleCompany.addressProvince === ''){
				this.isOpenProvince = false
			}
		},
		'formPeopleCompany.addressZipCode' (newValue) {
			if(this.formPeopleCompany.addressZipCode === ''){
				this.isOpenZipCode = false
			}
		}
	}

}
</script>
<style lang="scss">
	.input {
		border-width: 0 0 1px 0 !important;
		box-shadow: inset 0 0px 0px hsla(0,0%,0%,.1) !important;
		border-color: rgba(0, 0, 0, 0.08)!important;
		border-radius: 4px 4px 0 0 !important;
		 &:focus {
			 border-color:rgba(0, 0, 0, 0.08) !important;
		 }
	}
	.container {
		padding: 0px;
	}
	.input-size-default {
		font-size: 0.875rem !important;
	}
</style>



