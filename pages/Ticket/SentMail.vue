<template>
  <div>
	  <transition name="slide-bottom-medium" mode="out-in">
		  <div class="uk-form-stacked">
			  <div class="sc-round sc-border">
				  <div class="sc-padding">
					  <div class="uk-child-width-1-1@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
						  <div class="uk-form-label">
							  <label>To :</label>
							  <ScInput v-model="formMail.to" type="email" disabled></ScInput>
						  </div>
					  </div>
					  <div class="uk-child-width-1-2@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
						  <div>
							  <ScInput v-model="formMail.cc" type="email">
								  <label>CC :</label>
							  </ScInput>
						  </div>
						  <div>
							  <ScInput v-model="formMail.bcc" type="email">
								  <label>BCC :</label>
							  </ScInput>
						  </div>
					  </div>
					  <div class="uk-child-width-1-1@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
						  <div class="uk-margin-top">
							  <label class="uk-form-label uk-margin-mini-bottom">Message :</label>
							  <div id="editor1"
								   v-quill:myQuillEditor="editorOption"
								   class="quill-editor"
								   v-model="formMail.message"
							  >
							  </div>
						  </div>
						  <div class="uk-margin-top uk-margin-mini-bottom">
							  <b-form-file multiple v-model="formMail.file"></b-form-file>
						  </div>
					  </div>
				  </div>
			  </div>
			  <div class="btn uk-align-right">
				  <a href="javascript:void(0)" class="sc-button sc-button-primary sc-button-social" @click="sendEmail($event)">
					  <span>SEND</span><i class="mdi mdi-send"></i>
				  </a>
				  <a href="javascript:void(0)" class="sc-button sc-button-danger sc-button-social" @click="resetFormEmail()">
					  <span>RESET</span><i class="mdi mdi-lock-reset"></i>
				  </a>
			  </div>
		  </div>
	  </transition>
  </div>
</template>
<script>
	import ScInput from '~/components/Input'
	import ScTextarea from '~/components/Textarea'
	import Select2 from "~/components/Select2";
export default {
    components: {
		ScInput,
		ScTextarea,
		Select2,
    },
    data: () => ({
		formMail:{
			to: '',
			cc: '',
			bcc: '',
			message: '',
			file: '',
			createBy: '',
		},
        editorOption: {
            modules: {
                toolbar: [
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
                imageResize: true
            }
        },
    }),
    computed: {

    },
    mounted () {
    },
    methods: {
		sendEmail(){
			this.$emailAdapter.createEmail(this.formMail).then(resp =>{
                this.$swal("Successful!", "บันทึกข้อมูลไม่สำเร็จ ", "success")
				this.resetFormEmail()
			}).catch(err => {
                this.$swal("Error!", "บันทึกข้อมูลไม่สำเร็จ <br/>" + err.response.data.message, "error")
			})
		},
        resetFormEmail(){
			this.formMail.to = ''
			this.formMail.cc = ''
			this.formMail.bcc = ''
			this.formMail.message = ''
			this.formMail.file = ''
			this.formMail.assign = ''
		},


    }
}
</script>
