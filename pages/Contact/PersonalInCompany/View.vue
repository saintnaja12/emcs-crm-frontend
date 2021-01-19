<template>
  <ScCard class="uk-margin-mini-top">
    <ScCardBody>
      <p v-if="!userEditActive" class="sc-text-semibold uk-text-uppercase uk-heading-line">
        <span>PEOPLE CONTACT [{{companyData.companyName}}]</span>
      </p>
      <p v-else class="sc-text-semibold uk-text-uppercase uk-heading-line">
        <span>EDIT PEOPLE [{{companyData.companyName}}]</span>
      </p>
      <transition name="slide-bottom-medium" mode="out-in">
        <div v-if="userEditActive" key="userPreview">
          <div class="sc-round sc-border uk-margin sc-padding">
            <div class="uk-child-width-1-2@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
              <div>
                <label class="uk-form-label">First Name / ชื่อ : <sup>*</sup></label>
                <ScInput v-model="peopleInCompanyById.firstName"></ScInput>
              </div>
              <div>
                <label class="uk-form-label">Surname / นามสกุล :<sup>*</sup></label>
				  <ScInput v-model="peopleInCompanyById.lastName"></ScInput>
              </div>
              <div>
                  <label class="uk-form-label">Position / ตำแหน่ง :</label>
				  <ScInput v-model="peopleInCompanyById.position"></ScInput>
			  </div>
				<div>
					<label class="uk-form-label">
						<i class="mdi mdi-cellphone-iphone"></i>
						Mobile 1 / โทรศัพท์ 1 (หลัก):
					</label>
					<ScInput id="phone1"
							 v-model="peopleInCompanyById.phone1"
							 v-input-mask="{ 'mask': '9', 'repeat': 10,'greedy' : false}"
					></ScInput>
				</div>
				<div>
					<label class="uk-form-label">
						<i class="mdi mdi-cellphone-iphone"></i>
						Mobile 2 / โทรศัพท์ 2 :
					</label>
					<ScInput id="phone2"
							 v-model="peopleInCompanyById.phone2"
							 v-input-mask="{ 'mask': '9', 'repeat': 10,'greedy' : false}"
					></ScInput>
				</div>
				<div>
					<label class="uk-form-label">
						<i class="mdi mdi-cellphone-iphone"></i>
						Mobile 3 / โทรศัพท์ 3 :
					</label>
					<ScInput id="phone3"
							 v-model="peopleInCompanyById.phone3"
							 v-input-mask="{ 'mask': '9', 'repeat': 10,'greedy' : false}"
					></ScInput>
				</div>
				<div>
					<label class="uk-form-label">Email / อีเมล :</label>
					<ScInput v-model="peopleInCompanyById.email"></ScInput>
				</div>
				<div>
					<label class="uk-form-label">Line ID / ไอดีไลน์ :</label>
					<ScInput v-model="peopleInCompanyById.lineId"></ScInput>
				</div>
			</div>
			  <div class="uk-margin-top">
				  <label class="uk-form-label">Note / บันทึก :</label>
				  <ScInput v-model="peopleInCompanyById.note"></ScInput>
			  </div>
			  <div>
				  <label class="uk-form-label">
					  <i class="mdi mdi-routes"></i>
					  Status / สถานะ <span class="text-danger">*</span> :
				  </label>
				  <select id="status" v-model="peopleInCompanyById.status.id" class="uk-select" data-sc-input>
					  <option
						  v-for="option in contactStatus"
						  v-bind:value="option.value"
					  >{{ option.text }}
					  </option>
				  </select>
			  </div>
          </div>
			<p class="sc-text-semibold uk-text-uppercase uk-heading-line">
				<span>Address / ที่อยู่ </span>
			</p>
			<div class="sc-round sc-border uk-margin sc-padding">
				<div class="uk-child-width-1-2@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
					<div class="uk-width-1-2@xl">
						<label class="uk-form-label">
							<i class="mdi mdi-numeric"></i>
							Address / เลขที่ :
						</label>
						<div class="uk-form-controls">
							<ScInput id="address" v-model="peopleInCompanyById.address.address"></ScInput>
						</div>
					</div>
					<div class="uk-width-1-2@xl">
						<label class="uk-form-label">
							<i class="mdi mdi-axis"></i>
							Alley / ซอย :
						</label>
						<div class="uk-form-controls">
							<ScInput id="alley" v-model="peopleInCompanyById.address.alley"></ScInput>
						</div>
					</div>
					<div>
						<div>
							<label class="uk-form-label">
								<i class="mdi mdi-home"></i>
								Subdistrict / แขวง/ตำบล :
							</label>
							<div class="uk-form-controls">
								<div class="autocomplete">
									<ScInput id="subdistrict" v-model="peopleInCompanyById.address.subDistrict" @input="searchDataSubDistrict"></ScInput>
									<ul class="autocomplete-results" v-if="isOpenSubDistrict">
										<li class="autocomplete-result" v-for="item in provinceList" @click="getProvinceById(item.id)">
											{{  }}
											<b>{{item.district}}</b> {{item.amphoe}} {{item.province}} {{item.zipCode}}
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
								<div class="autocomplete">
									<ScInput id="district" v-model="peopleInCompanyById.address.district" @input="searchDataDistrict"></ScInput>
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
						<label class="uk-form-label">
							<i class="mdi mdi-flag-variant"></i>
							Province / จังหวัด:
						</label>
						<div class="uk-form-controls">
							<div class="autocomplete">
								<ScInput id="addressProvince" v-model="peopleInCompanyById.address.province" @input="searchDataProvince"></ScInput>
								<ul class="autocomplete-results"  v-if="isOpenProvince">
									<li class="autocomplete-result" v-for="item in provinceList" @click="getProvinceById(item.id)">
										{{item.district}} {{item.amphoe}} <b>{{item.province}}</b> {{item.zipCode}}
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div>
						<label class="uk-form-label">
							<i class="mdi mdi-mailbox"></i>
							Zip Code / รหัสไปรษณีย์ :
						</label>
						<div class="uk-form-controls">
							<div class="autocomplete">
								<ScInput id="zipCode" v-model="peopleInCompanyById.address.zipCode" @input="searchDataZipCode"></ScInput>
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
        </div>
        <div v-else key="userForm">
          <div class="sc-round sc-border uk-margin sc-padding">
            <ul class="uk-list uk-list-divider">
              <li class="sc-list-group">
                <div class="sc-list-addon">
					<i class="mdi mdi-account-outline"></i>
                </div>
                <div class="sc-list-body">
                  <div class="sc-list-body-inner uk-text-wrap">
                    <strong>First Name / ชื่อ : </strong> {{ peopleInCompanyById.firstName	 }}
                  </div>
				</div>
			  </li>
				<li class="sc-list-group">
					<div class="sc-list-addon">
						<i class="mdi mdi-account-outline"></i>
					</div>
					<div class="sc-list-body">
					<div class="sc-list-body-inner uk-text-wrap">
						<strong>Surname / นามสกุล : </strong> {{ peopleInCompanyById.lastName }}
					</div>
					</div>
				</li>
				<li class="sc-list-group">
					<div class="sc-list-addon">
						<i class="mdi mdi-briefcase-outline"></i>
					</div>
					<div class="sc-list-body">
						<div class="sc-list-body-inner uk-text-wrap">
						<strong>Position / ตำแหน่ง : </strong> {{ peopleInCompanyById.position }}
					</div>
					</div>
				</li>
				<li class="sc-list-group">
					<div class="sc-list-addon">
						<i class="mdi mdi-city-variant-outline"></i>
					</div>
					<div class="sc-list-body">
						<div class="sc-list-body-inner uk-text-wrap">
							<strong>Company Name / บริษัท : </strong> {{ peopleInCompanyById.companyName }}
						</div>
					</div>
				</li>
				<li class="sc-list-group">
					<div class="sc-list-addon">
						<i class="mdi mdi-home-city-outline"></i>
					</div>
					<div class="sc-list-body">
						<div class="sc-list-body-inner uk-text-wrap">
							<strong>Branch / สาขา : </strong> {{ peopleInCompanyById.branch }}
						</div>
					</div>
				</li>
				<li class="sc-list-group">
					<div class="sc-list-addon">
						<i class="mdi mdi-tag-outline"></i>
					</div>
					<div class="sc-list-body">
						<div class="sc-list-body-inner uk-text-wrap">
							<strong>Customer Type / ประเภทลูกค้า : </strong> <span v-if="peopleInCompanyById.customerType">{{ peopleInCompanyById.customerType.name }}</span>
						</div>
					</div>
				</li>
				<li class="sc-list-group">
					<div class="sc-list-addon">
						<i class="mdi mdi-account-group"></i>
					</div>
					<div class="sc-list-body">
						<div class="sc-list-body-inner uk-text-wrap">
							<strong>Brand / ยี่ห้อ : </strong> <span v-if="peopleInCompanyById.brand">{{ peopleInCompanyById.brand.name }}</span>
						</div>
					</div>
				</li>
				<li class="sc-list-group">
					<div class="sc-list-addon">
						<i class="mdi mdi-account-multiple-check"></i>
					</div>
					<div class="sc-list-body">
						<div class="sc-list-body-inner uk-text-wrap">
<!--							<strong>Insurance Partner / พันธมิตรประกันภัย : </strong>-->
							<strong>Insurance Partner (ในเครือ) : </strong>
							<button
									v-for="option in peopleInCompanyById.partner" disabled
									style="color: #222222">{{ option.name }}
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
							<!--							<strong>Insurance Partner / พันธมิตรประกันภัย : </strong>-->
							<strong>Insurance Partner (นอกเครือ) : </strong>
							<button
								v-for="option in peopleInCompanyById.garage" disabled
								style="color: #222222">{{ option.name }}
							</button>
						</div>
					</div>
				</li>
				<li class="sc-list-group">
					<div class="sc-list-addon">
						<i class="mdi mdi-cellphone-iphone"></i>
					</div>
					<div class="sc-list-body">
						<div class="sc-list-body-inner uk-text-wrap">
						<strong>Mobile / โทรศัพท์ : </strong> {{ peopleInCompanyById.phone1 }}
					</div>
					</div>
				</li>
				<li class="sc-list-group">
					<div class="sc-list-addon">
						<i class=" mdi mdi-email-outline"></i>
					</div>
					<div class="sc-list-body">
						<div class="sc-list-body-inner uk-text-wrap">
						<strong>Email / อีเมล : </strong> {{ peopleInCompanyById.email }}
					</div>
                </div>
				</li>
				<li class="sc-list-group">
					<div class="sc-list-addon">
						<i class="mdi mdi-card-bulleted-outline"></i>
					</div>
					<div class="sc-list-body">
						<div class="sc-list-body-inner uk-text-wrap">
							<strong>Line ID / ไอดีไลน์ : </strong> {{ peopleInCompanyById.lineId }}
						</div>
					</div>
				</li>
				<li class="sc-list-group">
					<div class="sc-list-addon">
						<i class="mdi mdi-file-document-edit-outline"></i>
					</div>
					<div class="sc-list-body">
						<div class="sc-list-body-inner uk-text-wrap">
							<strong>Note / บันทึก : </strong> {{ peopleInCompanyById.note }}
						</div>
					</div>
				</li>
				<li class="sc-list-group">
					<div class="sc-list-addon">
						<i class="mdi mdi-routes"></i>
					</div>
					<div class="sc-list-body">
						<div class="sc-list-body-inner uk-text-wrap">
							<template>
								<strong>Status / สถานะ : </strong>
								<span v-if="mapDataStatus(peopleInCompanyById.status)" :class="colorClass">{{ peopleInCompanyById.status.name }}</span>
							</template>
						</div>
					</div>
				</li>
			</ul>
		  </div>
        </div>
      </transition>
      <div class="uk-margin-small-top">
        <transition name="fade" mode="out-in">
          <div v-if="!userEditActive">
			<a href="javascript:void(0)" class="sc-button sc-button-primary sc-button-social" @click="pageEditPeopleInCompany(peopleInCompanyById.id)">
            <span>Edit People</span><i class="mdi mdi-pencil-outline"></i>
          </a>
			<a href="javascript:void(0)" class="sc-button sc-button-warning sc-button-social" @click="viewHistoryLog(peopleInCompanyById.id)">
				<span>History Edit Log</span><i class="mdi mdi-playlist-edit"></i>
			</a>
		  </div>
          <div v-else>
            <a href="javascript:void(0)" class="sc-button sc-button-primary sc-button-social"
			   data-uk-toggle="target: #modal-addRemarkPeople"
			>
              <span>SAVE</span><i class="mdi mdi-content-save-outline"></i>
            </a>
            <a href="javascript:void(0)" class="sc-button sc-button-danger sc-button-social" @click.prevent="cancelEdit()">
              <span>Cancel</span><i class="mdi mdi-close-circle-outline"></i>
            </a>
          </div>
        </transition>
      </div>
		<div class="uk-grid uk-align-right mt-3" data-uk-grid>
			<div>
                  <span class="uk-label md-bg-grey-500 uk-text-wrap" style="font-size:11px">
                    Last Update By : {{ peopleInCompanyByIdUpdate ? peopleInCompanyByIdUpdate.name : peopleInCompanyByIdUpdate}}
                    Last Update : {{ peopleInCompanyById.updatedAt ? peopleInCompanyById.updatedAt : peopleInCompanyById.createdAt }}
                  </span>
			</div>
		</div>
		<div id="modal-addRemarkPeople" data-uk-modal>
			<div class="uk-modal-dialog uk-modal-body">
				<h2 class="uk-modal-title">
					Remark
				</h2>
				<div class="uk-modal-body">
					<div>
						<label class="uk-form-label">
							Remark / บันทึกการแก้ไขข้อมูล :
						</label>
						<ScTextarea
							v-model="$v.fromEdit.remark.$model"
							:error-state="$v.fromEdit.remark.$error"
							:validator="$v.fromEdit.remark"
							:rows="3"
						></ScTextarea>
					</div>
				</div>
				<p class="uk-text-right">
					<button class="sc-button sc-button-flat uk-modal-close" type="button" @click="resetInput()">
						Cancel
					</button>
					<button class="sc-button sc-button-primary"
							type="button"
							:disabled="submitStatus === 'PENDING'"
							@click="updatePeopleInCompany(peopleInCompanyById,fromEdit,companyData, $event)"
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
import ScInput from '~/components/Input'
import ScTextarea from '~/components/Textarea'
import {EMPTY, from, of, Subject} from "rxjs";
import {catchError, debounceTime, mergeMap, tap} from "rxjs/operators";
import {required, minLength} from "vuelidate/lib/validators";
import {validationMixin} from "vuelidate";
import _ from "lodash";
export default {
    components: {
        ScInput,
        ScTextarea,
    },
	mixins: [validationMixin],
    data: () => ({
		basic: {
			model: []
		},
		contactStatus: [],
        userEditActive: false,
        editUserTransition: false,
        submitStatus: null,
		fromEdit:{
			firstName:'',
			lastName:'',
			address: {
				address: '',
				alley: '',
				subDistrict: '',
				district: '',
				province: '',
				zipCode: ''
			},
			email: '',
			position: '',
			phone1: '',
			phone2: '',
			phone3: '',
			lineId: '',
			note: '',
			status:'',
			remark:'',
		},
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
		],
		colorClass: ''
    }),
    validations: {
    	fromEdit: {
			remark: {
				required
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
		peopleInCompanyById (){
			return this.$store.getters.getPeopleById
		},
		companyData(){
			return this.$store.getters.getCompanyById
		},
		peopleInCompanyByIdUpdate (){
			return this.$store.getters.getPeopleById.updateBy
		}
    },
    mounted () {
		this.initObservableSubjectsSubDistrict()
		this.initObservableSubjectsDistrict()
		this.initObservableSubjectsProvince()
		this.initObservableSubjectsZipCode()
		this.getContactStatus()
    },

    methods: {
        cancelEdit () {
            this.userEditActive = !this.userEditActive;
        },
		pageEditPeopleInCompany (id) {
        	if(_.isNil(id) || _.isEmpty(id)){
				this.$swal("Warning!", "กรุณาเลือก People ค่ะ!","warning")
        		return
			}else {
				this.userEditActive = !this.userEditActive;
			}
		},
		updatePeopleInCompany(item,fromEdit,companyData,e){
        	let loader = this.$loading.show({
				loader: 'spinner'
			})
			e.preventDefault();
			this.$v.$touch();
			if (this.$v.$invalid) {
				loader.hide()
				this.submitStatus = 'ERROR'
				this.$swal("Warning!", "กรุณากรอกข้อมูลให้ครบถ้วน !", "warning")
			}else {
				this.$contactService.updatePeopleInCompany(item,fromEdit,companyData).then(resp => {
					if (!!resp) {
						loader.hide()
						UIkit.modal('#modal-addRemarkPeople').hide();
						this.fromEdit.remark = ''
						this.$swal("Successful!", "อัพเดทข้อมูลเรียบร้อยแล้วค่ะ","success")
						this.userEditActive = !this.userEditActive;
						this.$parent.getListPeopleInCompany()
						this.$v.$reset()
					}
				}).catch(err => {
					loader.hide()
					this.$swal("Error!", "อัพเดทข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ!" + '<br>' + err,"error")
					this.$v.$reset()
				})
			}

		},
		viewHistoryLog (id) {
			if(_.isNil(id) || _.isEmpty(id)){
				this.$swal("Warning!", "กรุณาเลือก People ค่ะ!","warning")
				return
			}
			this.$router.push(`History?people=${id}`)
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
						this.peopleInCompanyById.address.subDistrict = ''
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
					this.peopleInCompanyById.address.subDistrict = ''
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
						this.peopleInCompanyById.address.district = ''
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
					this.peopleInCompanyById.address.district = ''
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
						this.$swal("Warning!", "จังหวัดนี้ไม่มีในระบบ กรุณากรอกข้อมูลให้ถูกต้องค่ะ !", "warning")
						this.peopleInCompanyById.address.province = ''
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
					this.peopleInCompanyById.address.province = ''
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
						this.$swal("Warning!", "รหัสไปรษณีย์นี้ไม่มีในระบบ กรุณากรอกข้อมูลให้ถูกต้องค่ะ !", "warning")
						this.peopleInCompanyById.address.zipCode = ''
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
					this.$swal("Warning!", "รหัสไปรษณีย์นี้ไม่มีในระบบ กรุณากรอกข้อมูลให้ถูกต้องค่ะ !", "warning")
					this.peopleInCompanyById.address.zipCode = ''
					this.provinceList = result.data
				}else {
					this.provinceList = result.data
				}
			})
		},
		getProvinceById(id){
			this.$contactAdapter.getProvinceById(id).then(resp => {
				this.peopleInCompanyById.address.subDistrict = resp.district
				this.peopleInCompanyById.address.district = resp.amphoe
				this.peopleInCompanyById.address.province = resp.province
				this.peopleInCompanyById.address.zipCode = resp.zipCode
				this.isOpenSubDistrict = false
				this.isOpenDistrict = false
				this.isOpenProvince = false
				this.isOpenZipCode = false
			})
		},
		resetInput () {
        	this.$v.$reset()
			this.fromEdit.remark = ''
		},
		mapDataStatus (data) {
			if(!_.isNil(data) && !_.isEmpty(data)) {
				if (data.id === '5f39f8a274601b0bf3bd9e2d') {
					this.colorClass = 'clrBlue'
				}else if (data.id === '5f350851cd3d534abee6c6ef'){
					this.colorClass = 'clrGrey'
				}else if (data.id === '5f350864cd3d534abee6c6f0') {
					this.colorClass = 'clrRed'
				}else {
					this.colorClass = ''
				}
			}
			return data
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
		'peopleInCompanyById.addressSubDistrict' (newValue) {
			if(this.peopleInCompanyById.addressSubDistrict === ''){
				this.isOpenSubDistrict = false
			}
		},
		'peopleInCompanyById.addressDistrict' (newValue) {
			if(this.peopleInCompanyById.addressDistrict === ''){
				this.isOpenDistrict = false
			}
		},
		'peopleInCompanyById.addressProvince' (newValue) {
			if(this.peopleInCompanyById.addressProvince === ''){
				this.isOpenProvince = false
			}
		},
		'peopleInCompanyById.addressZipCode' (newValue) {
			if(this.peopleInCompanyById.addressZipCode === ''){
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


