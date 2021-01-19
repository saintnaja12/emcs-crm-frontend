<template>
	<div id="modal-create-content" class="uk-modal" data-uk-modal>
		<div class="uk-modal-dialog">
			<button class="uk-modal-close-default" type="button" data-uk-close></button>
			<div class="uk-modal-header">
				<h2 class="uk-modal-title">
					Create Content
				</h2>
				<h6 class="uk-heading-line mt-3">
					<span>Content</span>
				</h6>
			</div>
			<div class="uk-modal-body" data-uk-overflow-auto>
				<div class="uk-margin">
					<label>Category : </label>
					<ScInput v-model="form.category" placeholder="Enter category..." aria-required="true"></ScInput>
				</div>
				<div class="uk-margin">
					<label>Topic : </label>
					<ScInput v-model="form.topic" placeholder="Enter topic..."></ScInput>
				</div>
				<div class="uk-margin">
					<label>Content :</label>
					<vue-editor v-model="form.content" useCustomImageHandler :editorToolbar="customToolbar"></vue-editor>
				</div>
				<div class="uk-margin">
					<b-row>
						<b-col cols="2">
							<label>Attachment : </label>
						</b-col>
						<b-col cols="8">
							<b-form-file v-model="form.attachment" plain></b-form-file>
						</b-col>
					</b-row>
				</div>
				<div class="uk-margin">
					<label>Ref. No/Version : </label>
					<ScInput v-model="form.refNo" placeholder="Enter Ref. No/Version..."></ScInput>
				</div>
				<h6 class="uk-heading-line mt-3">
					<span>Highlight</span>
				</h6>
				<b-row class="uk-margin-top">
					<b-col cols="3">
						<div>
							<input class="uk-checkbox" type="checkbox" v-model="form.highlight"> <label> Set at highlight </label>
						</div>
					</b-col>
					<b-col cols="8">
						<b-row align-h="start" v-if="form.highlight === true">
							<b-col cols="3">
								<label>Position : </label>
							</b-col>
							<b-col cols="4">
								<b-form-select size="sm" :options="getPosition" v-model="form.position" ></b-form-select>
							</b-col>
						</b-row>
					</b-col>
				</b-row>
				<div class="uk-margin">
					<b-row v-if="form.highlight === true">
						<b-col cols="2">
							<label>Thumbnail : </label>
						</b-col>
						<b-col cols="8">
							<b-form-file v-model="form.thumbnail" accept="image/jpeg ,image/png" plain></b-form-file>
						</b-col>
					</b-row>
				</div>

			</div>
			<hr class="uk-margin-remove">
			<div class="uk-modal-footer" align="right">
				<button class="sc-button sc-button-primary" type="button" @click="createContent">
					Save
				</button>
				<button class="sc-button sc-button-secondary" type="reset" @click="cancelContent()">
					Cancel
				</button>
			</div>
		</div>
	</div>

</template>

<script>
	import ScInput from '~/components/Input'
	import { VueEditor, Quill } from "vue2-editor";
	if(process.client) {
		require('~/plugins/quill');
	}
	export default {
        name: "createContent",
		components:{
			ScInput,
			VueEditor
		},
		data: () => ({
			form: {
				category:'',
				topic:'',
				content:'',
				attachment:'',
				refNo: '1',
				highlight: false,
				position:'',
				thumbnail:'',
			},
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
        		//Check Position/Highlight Empty
        		let num = 1
				let sum = []
				for (num = 1; num <= 20; num++){
					sum.push({
						text:num,
						value:num
					})
				}
				return sum
			}
		},
		methods: {
        	createContent () {
				let loader = this.$loading.show({
					loader : 'spinner',
				})
        		this.$knowledgeService.createContent(this.form).then(resp => {
					loader.hide()
        			if(resp){
        				//$swal = Sweet Alert
						this.$swal("Successful!", "บันทึกข้อมูลสำเร็จ", "success")
						UIkit.modal('#modal-create-content').hide();
						this.getParent()
						this.resetInputField()
					}
				}).catch(err => {
					loader.hide()
					this.$swal("Error!", "บันทึกข้อมูลไม่สำเร็จ" + "<br>" + err + "<br>" + err.response.data.message, "error")
					UIkit.modal('#modal-create-content').hide();
					this.resetInputField()

				})
			},
			cancelContent () {
				UIkit.modal('#modal-create-content').hide();
			},
			getParent (){
				this.$parent.getContentList()
				this.$parent.getPopularList()
			},
			resetInputField () {
				this.form = {
					category:'',
					topic:'',
					content:'',
					attachment:'',
					refNo: '1',
					highlight: false,
					position:'',
					thumbnail:'',
				}
			}
		}
    }
</script>

<style scoped>

</style>
