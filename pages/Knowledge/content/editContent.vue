<template>
	<div id="modal-edit-content" class="uk-modal" data-uk-modal>
		<div class="uk-modal-dialog">
			<button class="uk-modal-close-default" type="button" data-uk-close></button>
			<div class="uk-modal-header">
				<h2 class="uk-modal-title">
					Edit Content
				</h2>
				<h6 class="uk-heading-line mt-3">
					<span>Content</span>
				</h6>
			</div>
			<div class="uk-modal-body" data-uk-overflow-auto>
				<div class="uk-margin">
					<label for="category">Category : </label>
					<ScInput id="category" v-model="getContentToEdit.category" placeholder="Enter category..."></ScInput>
				</div>
				<div class="uk-margin">
					<label for="topic">Topic : </label>
					<ScInput id="topic" v-model="getContentToEdit.topic" placeholder="Enter topic..."></ScInput>
				</div>
				<div class="uk-margin">
					<label for="content">Content :</label>
					<vue-editor id="content" v-model="getContentToEdit.content" useCustomImageHandler :editorToolbar="customToolbar"></vue-editor>
				</div>
				<div class="uk-margin">
					<b-row>
						<b-col cols="2">
							<label for="update-file">Attachment : </label>
						</b-col>
						<b-col cols="8">
							<b-form-file
								id="update-file"
								:placeholder=getContentToEdit.file.alt
							></b-form-file>
						</b-col>
					</b-row>
				</div>
				<div class="uk-margin">
					<label for="ref-number">Ref. No/Version : </label>
					<ScInput id="ref-number" v-model="getContentToEdit.refNo" placeholder="Enter Ref. No/Version..."></ScInput>
				</div>
				<h6 class="uk-heading-line mt-3">
					<span>Highlight</span>
				</h6>
				<b-row class="uk-margin-top">
					<b-col cols="3">
						<div>
							<input class="uk-checkbox" type="checkbox" v-model="getContentToEdit.highlight"> <label> Set at highlight </label>
						</div>
					</b-col>
					<b-col cols="8">
<!--						check highlight from position label-->
						<b-row align-h="start" v-if="getContentToEdit.highlight != null">
							<b-col cols="3">
								<label for="setPosition">Position : </label>
							</b-col>
							<b-col cols="4">
								<b-form-select id="setPosition" size="sm" :options="getPosition" v-model="getContentToEdit.highlight"></b-form-select>
							</b-col>
						</b-row>
					</b-col>
				</b-row>
				<div class="uk-margin">
					<b-row v-if="getContentToEdit.highlight != null">
						<b-col cols="2">
							<label for="upload-thumbnail">Thumbnail : </label>
						</b-col>
						<b-col cols="8">
							<b-form-file
								id="upload-thumbnail"
								:placeholder=getContentToEdit.thumbnail.alt
								accept="image/jpeg, image/png"
							></b-form-file>
						</b-col>
					</b-row>
				</div>
			</div>
			<hr class="uk-margin-remove">
			<div class="uk-modal-footer" align="right">
				<button class="sc-button sc-button-primary" type="button" data-uk-toggle="target: #modal-addRemarkContent">
					Update
				</button>
				<button class="sc-button sc-button-secondary" type="reset" v-on:click="cancelContent">
					Cancel
				</button>
			</div>
		</div>
		<div id="modal-addRemarkContent" class="uk-modal uk-margin" uk-modal="stack: true">
			<div class="uk-modal-dialog">
				<div class="uk-modal-header">
					<h2 class="uk-modal-title">
						Remark
					</h2>
				</div>
				<div class="uk-modal-body" data-uk-overflow-auto>
					<label class="uk-form-label">
						Remark / บันทึกการแก้ไขข้อมูล :
					</label>
					<ScTextarea
						:rows="3"
					></ScTextarea>
				</div>
				<hr class="uk-margin-remove">
				<div class="uk-modal-footer">
					<div class="row">
						<div class="col-6">
						</div>
						<div class="col-6" align="right">
							<button class="sc-button sc-button-flat uk-modal-close">
								Cancel
							</button>
							<button class="sc-button sc-button-primary"
									type="button"
									:disabled="submitStatus === 'PENDING'"
									v-on:click="updateContent(getContentToEdit,formEdit,$event)"
							>
								SAVE
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import ScInput from '~/components/Input'
	import { VueEditor, Quill } from "vue2-editor";
	import axios from 'axios'
	import Buttons from "../../src/components/buttons";
	import ScTextarea from "../../../components/Textarea";
	if(process.client) {
		require('~/plugins/quill');
	}
	export default {
		name: "editContent",
		components:{
			ScTextarea,
			Buttons,
			ScInput,
			VueEditor
		},
		data: () => ({
			submitStatus: null,
			formEdit: {
				category :'',
				topic:'',
				content:'',
				file:'',
				refNo: '',
				highlight: '',
				position:'',
				thumbnail:'',
				remark:''
			},
			EditId : '',
			customToolbar: [
				['bold', 'italic', 'underline', 'strike'],
				[{ 'list': 'ordered' }, { 'list': 'bullet' }],
				[{ 'indent': '-1' }, { 'indent': '+1' }],
				[{ 'direction': 'rtl' }],
				[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
				[{ 'color': [] }, { 'background': [] }],
				[{ 'align': [] }],
				['clean'],
				['link', 'image']
			],
			selected: null,
		}),
		computed: {
			getPosition () {
				let num = 1
				let sum = []
				for (num = 1; num < 20; num++){
					sum.push({
						text:num,
						value:num
					})
				}
				return sum
			},
			getContentToEdit () {
				return this.$store.getters.getContentById
			}
		},
		methods: {
			updateContent (getContentToEdit, formEdit) {
				this.$knowledgeService.editContent(getContentToEdit, formEdit)
					.then(resp => {
						if(resp){
							//$swal = Sweet Alert
							this.$swal("Successful!", "อัพเดทข้อมุลสำเร็จ", "success")
							UIkit.modal('#modal-edit-content').hide();
							UIkit.modal('#modal-addRemarkContent').hide();
							this.getParent()
							this.resetInputField()
						}
					}).catch(err => {
						this.$swal("Error!", "อัพเดทข้อมูลไม่สำเร็จ" + "<br>" + err + "<br>" + err.response.data.message, "error")
						UIkit.modal('#modal-edit-content').hide();
						UIkit.modal('#modal-addRemarkContent').hide();
						this.getParent()
						this.resetInputField()
					})
			},
			cancelContent () {
				UIkit.modal('#modal-edit-content').hide();
			},
			getParent (){
				this.$parent.getContentList()
				this.$parent.getPopularList()
			},
			resetInputField () {
				this.formEdit = {
					category:'',
					topic:'',
					content:'',
					attachment:'',
					refNo: '1',
					highlight: false,
					position:'',
					thumbnail:'',
					file: ''
				}
			},
		},
		mounted() {
		}
	}
</script>

<style scoped>

</style>
