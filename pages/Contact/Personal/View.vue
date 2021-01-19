<template>
	<ScCard class="uk-margin-mini-top">
		<ScCardBody>
			<p v-if="!userEditActive" class="sc-text-semibold uk-text-uppercase uk-heading-line">
				<span>PERSONAL CONTACT</span>
			</p>
			<p v-else class="sc-text-semibold uk-text-uppercase uk-heading-line">
				<span>EDIT PERSONAL CONTACT</span>
			</p>
			<transition name="slide-bottom-medium" mode="out-in">
				<div v-if="userEditActive" class="uk-form-stacked" key="userPreview">
					<div class="sc-round sc-border uk-margin sc-padding">
						<div class="uk-child-width-1-2@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
							<div>
								<label class="uk-form-label">
									First Name / ชื่อ : <sup>*</sup>
								</label>
								<ScInput v-model="getPersonalView.firstName"></ScInput>
							</div>
							<div>
								<label class="uk-form-label">
									Last Name / นามสกุล :<sup>*</sup>
								</label>
								<ScInput v-model="getPersonalView.lastName"></ScInput>
							</div>
							<div>
								<label class="uk-form-label">
									Position / ตำแหน่ง :
								</label>
								<ScInput v-model="getPersonalView.position"></ScInput>
							</div>
							<div>
								<label class="uk-form-label">
									Company / บริษัท :
								</label>
								<ScInput v-model="getPersonalView.company"></ScInput>
							</div>
							<div class="uk-margin-top uk-width-1-1@l">
								<label class="uk-form-label">
									Branch / สาขา :
								</label>
								<ScInput v-model="getPersonalView.branch"></ScInput>
							</div>
							<div>
								<label class="uk-form-label">
									<i class="mdi mdi-account-group-outline"></i>
									Customer Type / ประเภทลูกค้า :
								</label>
								<div class="uk-form-controls">
									<select id="customerType" v-model="getPersonalView.customerType.id"
											class="uk-select" data-sc-input>
										<option
											v-for="option in customerTypeOption"
											v-bind:value="option.value"
										>{{ option.text }}
										</option>
									</select>
								</div>
							</div>
							<div v-if="getPersonalView.customerType.id === '5e953437125b915144f92d41'">
								<label class="uk-form-label">
									<i class="mdi mdi-tag-outline"></i>
									Brand / ยี่ห้อ :
								</label>
								<select id="brand" v-model="getPersonalView.brand.id" class="uk-select" data-sc-input>
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
									Brand / ยี่ห้อ :
								</label>
								<select id="brand1" v-model="getPersonalView.brand.id" class="uk-select" disabled
										data-sc-input>
									<option value="">
										ไม่ระบุ
									</option>
								</select>
							</div>
							<div class="uk-margin-top uk-width-1-1@l">
<!--								<label class="uk-form-label">-->
<!--									<i class="mdi mdi-account-multiple-check"></i>-->
<!--									Insurance Partners :-->
<!--								</label>-->
								<label class="uk-form-label">
									<i class="mdi mdi-account-multiple-check"></i>
									Insurance Partners (ในเครือ) :
								</label>
								<MultiSelect
									v-model="getPersonalView.partner"
									:options="msBasicOptions"
								></MultiSelect>
							</div>
							<div class="uk-margin-top uk-width-1-1@l">
								<!--								<label class="uk-form-label">-->
								<!--									<i class="mdi mdi-account-multiple-check"></i>-->
								<!--									Insurance Partners :-->
								<!--								</label>-->
								<label class="uk-form-label">
									<i class="mdi mdi-account-multiple-check"></i>
									Insurance Partners (นอกเครือ) :
								</label>
								<MultiSelect
									v-model="getPersonalView.garage"
									:options="garageOptions"
								></MultiSelect>
							</div>
							<div>
								<label class="uk-form-label">
									Mobile 1 / เบอร์โทรศัพท์ 1 :<sup>*</sup>
								</label>
								<ScInput
									v-model="getPersonalView.phone1"
									v-input-mask="{ 'mask': '9', 'repeat': 10, 'greedy' : false }"
								></ScInput>
							</div>
							<div>
								<label class="uk-form-label">
									Mobile 2 / เบอร์โทรศัพท์ 2 :
								</label>
								<ScInput
									v-model="getPersonalView.phone2"
									v-input-mask="{ 'mask': '9', 'repeat': 10, 'greedy' : false }"
								></ScInput>
							</div>
							<div>
								<label class="uk-form-label">
									Mobile 3 / เบอร์โทรศัพท์ 3 :
								</label>
								<ScInput
									v-model="getPersonalView.phone3"
									v-input-mask="{ 'mask': '9', 'repeat': 10, 'greedy' : false }"
								></ScInput>
							</div>
							<div>
								<label class="uk-form-label">
									Line ID / ไอดีไลน์ :
								</label>
								<ScInput v-model="getPersonalView.lineId"></ScInput>
							</div>
							<div class="uk-margin-top uk-width-1-1@l">
								<label class="uk-form-label">
									Email / อีเมล์ :
								</label>
								<ScInput v-model="getPersonalView.email" type="email"></ScInput>
							</div>
							<div class="uk-margin-top uk-width-1-1@l">
								<label class="uk-form-label">
									Note / บันทึก :
								</label>
								<ScTextarea
									v-model="getPersonalView.note"
									:rows="3"
								></ScTextarea>
							</div>
							<div>
								<label class="uk-form-label">
									<i class="mdi mdi-routes"></i>
									Status / สถานะ <span class="text-danger">*</span> :
								</label>
								<select id="status" v-model="getPersonalView.status.id" class="uk-select" data-sc-input>
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
								<label class="uk-form-label">
									<i class="mdi mdi-numeric"></i>
									Address / เลขที่ :
								</label>
								<div class="uk-form-controls">
									<ScInput id="address" v-model="getPersonalView.address.address"></ScInput>
								</div>
							</div>
							<div class="uk-width-1-2@xl">
								<label class="uk-form-label">
									<i class="mdi mdi-axis"></i>
									Alley / ซอย :
								</label>
								<div class="uk-form-controls">
									<ScInput id="alley" v-model="getPersonalView.address.alley"></ScInput>
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
											<ScInput id="subdistrict" v-model="getPersonalView.address.subDistrict"
													 @input="searchDataSubDistrict"></ScInput>
											<ul class="autocomplete-results" v-if="isOpen">
												<li class="autocomplete-result" v-for="item in provinceList"
													@click="getProvinceById(item.id)">
													{{item.district}} {{item.amphoe}} {{item.province}} {{item.zipCode}}
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
											<ScInput id="district" v-model="getPersonalView.address.district"
													 @input="searchDataDistrict"></ScInput>
											<ul class="autocomplete-results" v-if="isOpenDistrict">
												<li class="autocomplete-result" v-for="item in provinceList"
													@click="getProvinceById(item.id)">
													{{item.district}} {{item.amphoe}} {{item.province}} {{item.zipCode}}
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
										<ScInput id="addressProvince" v-model="getPersonalView.address.province"
												 @input="searchDataProvince"></ScInput>
										<ul class="autocomplete-results" v-if="isOpenProvince">
											<li class="autocomplete-result" v-for="item in provinceList"
												@click="getProvinceById(item.id)">
												{{item.district}} {{item.amphoe}} {{item.province}} {{item.zipCode}}
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
										<ScInput id="zipCode" v-model="getPersonalView.address.zipCode"
												 v-input-mask="{ 'mask': '9', 'repeat': 5, 'greedy' : false }"
												 @input="searchDataZipCode"></ScInput>
										<ul class="autocomplete-results" v-if="isOpenZipCode">
											<li class="autocomplete-result" v-for="item in provinceList"
												@click="getProvinceById(item.id)">
												{{item.district}} {{item.amphoe}} {{item.province}} {{item.zipCode}}
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
										<strong>First Name / ชื่อ : </strong> {{ getPersonalView.firstName }}
									</div>
								</div>
							</li>
							<li class="sc-list-group">
								<div class="sc-list-addon">
									<i class="mdi mdi-account-outline"></i>
								</div>
								<div class="sc-list-body">
									<div class="sc-list-body-inner uk-text-wrap">
										<strong>Last Name / นามสกุล : </strong> {{ getPersonalView.lastName }}
									</div>
								</div>
							</li>
							<li class="sc-list-group">
								<div class="sc-list-addon">
									<i class="mdi mdi-briefcase-outline"></i>
								</div>
								<div class="sc-list-body">
									<div class="sc-list-body-inner uk-text-wrap">
										<strong>Position / ตำแหน่ง : </strong> {{ getPersonalView.position }}
									</div>
								</div>
							</li>
							<li class="sc-list-group">
								<div class="sc-list-addon">
									<i class="mdi mdi-city-variant-outline"></i>
								</div>
								<div class="sc-list-body">
									<div class="sc-list-body-inner uk-text-wrap">
										<strong>Company Name / บริษัท : </strong> {{ getPersonalView.company }}
									</div>
								</div>
							</li>
							<li class="sc-list-group">
								<div class="sc-list-addon">
									<i class="mdi mdi-home-city-outline"></i>
								</div>
								<div class="sc-list-body">
									<div class="sc-list-body-inner uk-text-wrap">
										<strong>Branch / สาขา : </strong> {{ getPersonalView.branch }}
									</div>
								</div>
							</li>
							<li class="sc-list-group">
								<div class="sc-list-addon">
									<i class="mdi mdi-account-group-outline"></i>
								</div>
								<div class="sc-list-body">
									<div class="sc-list-body-inner uk-text-wrap">
										<strong>Customer Type / ประเภทลูกค้า : </strong> {{
										getPersonalView.customerType.name }}
									</div>
								</div>
							</li>
							<li class="sc-list-group">
								<div class="sc-list-addon">
									<i class="mdi mdi-tag-outline"></i>
								</div>
								<div class="sc-list-body">
									<div class="sc-list-body-inner uk-text-wrap">
										<strong>Brand / ยี่ห้อ : </strong> {{ getPersonalView.brand.name }}
									</div>
								</div>
							</li>
							<li class="sc-list-group">
								<div class="sc-list-addon">
									<i class="mdi mdi-account-multiple-check"></i>
								</div>
								<div class="sc-list-body">
									<div class="sc-list-body-inner uk-text-wrap">
										<strong>Insurance Partners (ในเครือ) : </strong>
										<button
												v-if="getPersonalView.partnerName"
												v-for="option in getPersonalView.partnerName" disabled
												style="color: #222222">{{ option.name}}
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
										<strong>Insurance Partners (นอกเครือ) : </strong>
										<button v-show="getPersonalView.customerType.id !== '5e60b2f2eb907fa8ee105d5c'"
												v-if="getPersonalView.garageName[0].id !== ''"
												v-for="option in getPersonalView.garageName" disabled
												style="color: #222222">
											{{ option.name }}
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
										<strong>Mobile / เบอร์โทรศัพท์ : </strong>
										<span>{{ getPersonalView.phone1 }}<span v-if="checkEmpty(getPersonalView.phone2)">,</span></span>
										<span>{{ getPersonalView.phone2 }}<span v-if="checkEmpty(getPersonalView.phone3)">,</span></span>
										<span>{{ getPersonalView.phone3 }}</span>
									</div>
								</div>
							</li>
							<li class="sc-list-group">
								<div class="sc-list-addon">
									<i class=" mdi mdi-email-outline"></i>
								</div>
								<div class="sc-list-body">
									<div class="sc-list-body-inner uk-text-wrap">
										<strong>Email / อีเมล์ : </strong> {{ getPersonalView.email }}
									</div>
								</div>
							</li>
							<li class="sc-list-group">
								<div class="sc-list-addon">
									<i class="mdi mdi-card-bulleted-outline"></i>
								</div>
								<div class="sc-list-body">
									<div class="sc-list-body-inner uk-text-wrap">
										<strong>Line ID / ไอดีไลน์ : </strong> {{ getPersonalView.lineId }}
									</div>
								</div>
							</li>
							<li class="sc-list-group">
								<div class="sc-list-addon">
									<i class="mdi mdi-file-document-edit-outline"></i>
								</div>
								<div class="sc-list-body">
									<div class="sc-list-body-inner uk-text-wrap">
										<strong>Note / บันทึก : </strong> {{ getPersonalView.note }}
									</div>
								</div>
							</li>
							<li class="sc-list-group">
								<div class="sc-list-addon">
									<i class="mdi mdi-routes"></i>
								</div>
								<div class="sc-list-body">
									<div class="sc-list-body-inner uk-text-wrap">
										<template v-if="getPersonalView.firstName === ''">
											<strong>Status / สถานะ : </strong>
										</template>
										<template v-else>
											<strong>Status / สถานะ : </strong>
											<span v-if="getPersonalView.status.id === '5f39f8a274601b0bf3bd9e2d'" class="clrBlue">{{ getPersonalView.status.name }}</span>
											<span v-else-if="getPersonalView.status.id === '5f350851cd3d534abee6c6ef'" class="clrGrey">{{ getPersonalView.status.name }}</span>
											<span v-else-if="getPersonalView.status.id === '5f350864cd3d534abee6c6f0'" class="clrRed">{{ getPersonalView.status.name }}</span>
											<span v-else>{{ getPersonalView.status.name }}</span>
										</template>

									</div>
								</div>
							</li>
						</ul>
						<div align="right">
							<span class="uk-label md-bg-grey-500 uk-text-wrap" style="font-size:11px">
								Last Update By : {{ getPersonalView.updatedBy.name ? getPersonalView.updatedBy.name : getPersonalView.createdAt.name }},
								Date : {{ getPersonalView.updatedAt ? getPersonalView.updatedAt : getPersonalView.createdAt  }}
							</span>
						</div>
					</div>
				</div>
			</transition>
			<div class="uk-margin-small-top">
				<transition name="fade" mode="out-in">
					<div v-if="!userEditActive">
						<a href="javascript:void(0)" class="sc-button sc-button-primary sc-button-social mt-2"
						   @click="editPersonal(getPersonalView.id)">
							<span>Edit Personal</span><i class="mdi mdi-pencil-outline"></i>
						</a>
						<a href="javascript:void(0)" class="sc-button sc-button-warning sc-button-social mt-2"
						   @click="viewHistoryPersonal(getPersonalView.id)">
							<span>History Edit Log</span><i class="mdi mdi-playlist-edit"></i>
						</a>
					</div>
					<div v-else>
						<a href="javascript:void(0)" class="sc-button sc-button-primary sc-button-social"
						   data-uk-toggle="target: #modal-addRemarkPersonal">
							<span>SAVE</span><i class="mdi mdi-content-save-outline"></i>
						</a>
						<a href="javascript:void(0)" class="sc-button sc-button-danger sc-button-social"
						   @click.prevent="cancelEdit()">
							<span>Cancel</span><i class="mdi mdi-close-circle-outline"></i>
						</a>
					</div>
				</transition>
			</div>
			<div id="modal-addRemarkPersonal" data-uk-modal>
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
						<button class="sc-button sc-button-flat uk-modal-close" @click="resetInput()" type="button">
							Cancel
						</button>
						<button class="sc-button sc-button-primary"
								type="button"
								:disabled="submitStatus === 'PENDING'"
								@click="updatePersonal(getPersonalView,fromEdit, $event)"
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

    const {first, last, email} = scFakeData;
    const {uniqueID, isHiRes} = scHelpers;
    import {validationMixin} from 'vuelidate'
    import {required, minLength} from 'vuelidate/lib/validators'
    import moment from 'moment-timezone'
    import ScInput from '~/components/Input'
    import ScTextarea from '~/components/Textarea'
    import {catchError, debounceTime, mergeMap, tap} from "rxjs/operators";
    import {EMPTY, from, of, Subject} from "rxjs";
    import _ from "lodash";

    require('~/plugins/velocity.client.js');

    export default {
        components: {
            ScInput,
            ScTextarea,
            MultiSelect: process.client ? () => import('~/components/Multiselect') : null

        },
        mixins: [validationMixin],
        data: () => ({
            userEditActive: false,
            editUserTransition: false,
            submitStatus: null,
            updateBy: 'User Uc',
			brandOption: [],
            customerTypeOption: [],
			insurance: [],
			contactStatus: [],
            searchSubDistrict: '',
            searchDistrict: '',
            searchProvince: '',
            searchZipCode: '',
            isOpen: false,
            isOpenDistrict: false,
            isOpenProvince: false,
            isOpenZipCode: false,
            provinceList: [],
            fromEdit: {
                remark: ''
            },
			statusOption: [
				{text: 'Active', value: 'active'},
				{text: 'In Active', value: 'inactive'},
				{text: 'Locked', value: 'locked'}
			],
			outsideGarageOption: []
        }),
        validations: {
            getPersonalView: {
                firstName: {
                    required,
                },
                lastName: {
                    required,
                },
                phone1: {
                    required,
                    minLength: minLength(9)
                },
            },
			fromEdit: {
            	remark : {
					required
				}
			}
        },
        computed: {
            getPersonalView() {
                return this.$store.getters.getPersonalById
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
        created() {
            this.searchSubDistrict$ = new Subject()
            this.searchDistrict$ = new Subject()
            this.searchProvince$ = new Subject()
            this.searchZipCode$ = new Subject()
        },
        mounted() {
            this.getCustomerTypeOption()
            this.getInsurance()
            this.initObservableSubjectsSubDistrict()
            this.initObservableSubjectsDistrict()
            this.initObservableSubjectsProvince()
            this.initObservableSubjectsZipCode()
			this.setDefaultDataPerson()
			this.getBrand()
			this.getContactStatus()
			this.getOutsideGarage()
        },
        methods: {
            moment: function (date) {
                return moment(date).format('DD/MM/YYYY HH:mm');
            },
            updatePersonal(getPersonalView, fromEdit, e) {
            	let loader = this.$loading.show({
					loader: 'spinner'
				})
                e.preventDefault();
                this.$v.$touch();
                if (this.$v.$invalid) {
                	loader.hide()
                    this.submitStatus = 'ERROR'
                    this.$swal("Warning!", "กรุณากรอกข้อมูลให้ครบถ้วน !", "warning")
                } else {
                    this.submitStatus = 'PENDING';
                    setTimeout(() => {
                        this.submitStatus = 'OK'
                    }, 500)
                    this.$contactService.updatePersonal(getPersonalView, fromEdit).then(resp => {
                        if (resp) {
							loader.hide()
							UIkit.modal('#modal-addRemarkPersonal').hide();
                            this.$emit('contact-personal-update-summit', resp)
                            this.fromEdit.remark = ''
                            this.$swal("Successful", "อัพเดทข้อมูลสำเร็จ", "success")
                            this.userEditActive = !this.userEditActive;

                        }
                    }).catch(err => {
						loader.hide()
                        this.$swal("Error!", "อัพเดทไม่ข้อมูลสำเร็จ กรุณาลองใหม่อีกครั้งค่ะ !" + '<br>' + err, "error")
                    })
                }
            },
            editPersonal(id) {
                if (!_.isNil(id)) {
                    this.userEditActive = !this.userEditActive;
                }
            },
            cancelEdit() {
                this.userEditActive = !this.userEditActive;

            },
            viewHistoryPersonal(id) {
                if (_.isNil(id) || _.isEmpty(id)) {
                    this.$swal("Warning!", "กรุณาเลือก Personal ค่ะ!", "warning")
                    return
                } else {
                    this.$router.push(`Contact/Personal/History?personal=${id}`)
                }
            },
            getCustomerTypeOption() {
                this.$masterAdapter.getAllCustomerTypes().then(resp => {
                    this.customerTypeOption = resp
                })
            },
            getInsurance() {
                this.$masterAdapter.getAllPartner().then(resp => {
                    this.insuranceOption = resp
                })
            },
            searchDataSubDistrict(keyword) {
                this.isOpen = true;
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
								this.getPersonalView.address.subDistrict = ''
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
							this.getPersonalView.address.subDistrict = ''
						})
						this.provinceList = result.data
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
							this.$swal.fire({
								title:'Warning!',
								text:'อำเภอนี้ไม่มีในระบบ กรุณากรอกข้อมูลให้ถูกต้องค่ะ !',
								icon:'warning'
							}).then((resp) => {
								this.getPersonalView.address.district = ''
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
							this.getPersonalView.address.district = ''
						})
						this.provinceList = result.data
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
							this.$swal.fire({
								title:'Warning!',
								text:'จังหวัดนี้ไม่มีในระบบ กรุณากรอกข้อมูลให้ถูกต้องค่ะ !',
								icon:'warning'
							}).then((resp) => {
								this.getPersonalView.address.province = ''
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
							this.getPersonalView.address.province = ''
						})
						this.provinceList = result.data
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
            initObservableSubjectsZipCode() {
                this.searchZipCode$.pipe(
                    debounceTime(300),
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
								this.getPersonalView.address.zipCode = ''
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
							this.getPersonalView.address.zipCode = ''
						})
						this.provinceList = result.data
					}else {
						this.provinceList = result.data
					}
                })
            },
            getProvinceById(id) {
                this.$contactAdapter.getProvinceById(id).then(resp => {
                    this.getPersonalView.address.subDistrict = resp.district
                    this.getPersonalView.address.district = resp.amphoe
                    this.getPersonalView.address.province = resp.province
                    this.getPersonalView.address.zipCode = resp.zipCode
                    this.isOpen = false
                    this.isOpenDistrict = false
                    this.isOpenProvince = false
                    this.isOpenZipCode = false
                })
            },
			resetInput () {
            	this.$v.$reset()
				this.fromEdit.remark = ''
			},
			setDefaultDataPerson () {
				// this.$store.dispatch('getPersonalById', '')
			},
			getBrand(){
				this.$masterAdapter.getAllBrand().then(resp => {
					this.brandOption = resp
				})
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
			getOutsideGarage() {
				this.$masterAdapter.getAllContactedGarage().then(resp => {
					this.outsideGarageOption = resp
				})
			},
        },
        watch: {
            'getPersonalView.address.subDistrict'(newValue) {
                if (this.getPersonalView.address.subDistrict === '') {
                    this.isOpen = false
                }
            },
            'getPersonalView.address.district'(newValue) {
                if (this.getPersonalView.address.district === '') {
                    this.isOpenDistrict = false
                }
            },
            'getPersonalView.address.province'(newValue) {
                if (this.getPersonalView.address.province === '') {
                    this.isOpenProvince = false
                }
            },
            'formPersonal.addressZipCode'(newValue) {
                if (this.getPersonalView.address.zipCode === '') {
                    this.isOpenZipCode = false
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
