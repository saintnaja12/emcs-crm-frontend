<template>
	<div id="modal-view-content" class="uk-modal" data-uk-modal>
		<div id="modal-group-1" class="uk-modal-dialog uk-margin">
			<button class="uk-modal-close-default" type="button" data-uk-close></button>
			<div class="uk-modal-header">
				<h2 class="uk-modal-title">
					<b>{{getDetailContent.topic}}</b>
				</h2>
				<span>Create Date : {{getDetailContent.createdAt}}</span>
				<hr>
			</div>
			<div class="uk-modal-body" data-uk-overflow-auto>
				<div class="uk-padding-small">
					<p v-html="getDetailContent.content"></p>
				</div>
				<span><b>Attachment : </b></span> <a href="javascript:void(0)"
													 @click="downloadAttachment(getDetailContent.file, getDetailContent.file.alt)">{{getDetailContent.file.alt}}</a>
			</div>
			<hr class="uk-margin-remove">
			<div class="uk-modal-footer">
				<div class="row">
					<div class="col-6">
						<p><b>Create Topic By : </b>{{getDetailContent.createdBy.name}} ,<b> Team : </b>{{getDetailContent.createdBy.team.name}}
						</p>
					</div>
					<div class="col-6" align="right">
						<a class="sc-button sc-button-warning sc-button-social"
						   uk-toggle="target: #modal-view-log-content" v-on:click="getLogContent(getDetailContent.id)">
							<span>Edit History Log</span><i class="mdi mdi-playlist-edit"></i>
						</a>
						<button class="sc-button sc-button-secondary uk-modal-close" type="button" @click="closeDetail()">
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
		<!--		view log / remark by content-->
		<div id="modal-view-log-content" class="uk-modal" uk-modal="stack: true">
			<div id="modal-group-2" class="uk-modal-dialog uk-margin">
				<div class="uk-modal-header">
					<h2 class="uk-modal-title">
						Edit History Logs
					</h2>
				</div>
				<div class="uk-modal-body" data-uk-overflow-auto>
					<b-table
						small
						:fields="fieldsLogContent"
						:items="historyLogContent.logs"
						responsive
					>
						<template v-slot:cell(index)="row">
							{{ row.index+1 }}
						</template>
						<template v-slot:cell(topic)="row">
							{{ row.item.topic }}
						</template>
						<template v-slot:cell(refNo)="row">
							{{ row.item.refNo }}
						</template>
						<template v-slot:cell(name)="row">
							{{ row.item.editBy.name }}
						</template>
					</b-table>
				</div>
				<hr class="uk-margin-remove">
				<div class="uk-modal-footer">
					<div class="row">
						<div class="col-6">
						</div>
						<div class="col-6" align="right">
							<button class="sc-button sc-button-primary" type="button"
									uk-toggle="target: #modal-viewRemark" v-on:click="getRemarkContent(historyLogContent.id)">
								<span>Remark</span><i class="mdi mdi-playlist-edit"></i>
							</button>
							<button class="sc-button sc-button-secondary uk-modal-close" type="button">
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="modal-viewRemark" class="uk-flex-top" uk-modal="stack: true">
			<div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
				<button id="modal-group-3" class="uk-modal-close-default" type="button" uk-close></button>
				<div class="uk-modal-header">
					Remark
				</div>
				<div class="uk-modal-body" data-uk-overflow-auto>
					<b-table
						small
						:fields="fieldsRemark"
						:items="remarkContent.logs"
						responsive
					>
						<template v-slot:cell(index)="row">
							{{ row.index+1 }}
						</template>
						<template v-slot:cell(topic)="row">
							{{ row.item.topic }}
						</template>
						<template v-slot:cell(refNo)="row">
							{{ row.item.refNo }}
						</template>
						<template v-slot:cell(name)="row">
							{{ row.item.editBy.name }}
						</template>
					</b-table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "viewDetailContent.vue",
		components: {
		},
		data: () => ({
			historyLogContent: {},
			remarkContent:{},
			fieldsLogContent: [
				{key: 'index', label: 'No.', sortable: false,},
				{key: 'topic', label: 'Topic', sortable: false,},
				{key: 'refNo', label: 'Ref. No/Version', sortable: false,},
				{key: 'editDate', label: 'Edit Date', sortable: false,},
				{key: 'editBy.name', label: 'Edit By', sortable: false}
			],
			fieldsRemark: [
				{key: 'index', label: 'No.', sortable: false,},
				{key: 'editBy.name', label: 'Edit By', sortable: false,},
				{key: 'topic', label: 'Remark', sortable: false,},
			],
		}),
		methods: {
			closeDetail (){
				UIkit.modal('#modal-view-content').hide()
			},
			closeDetailLog (){
				UIkit.modal('#modal-view-log-content').hide()
			},
			getLogContent(id) {
				this.$knowledgeAdapter.getContentLog(id).then(resp => {
					this.historyLogContent = resp
				})
			},
			getRemarkContent(id) {
				this.$knowledgeAdapter.getLogContent(id).then(resp => {
					this.remarkContent = resp
				})
			},
			downloadAttachment(item, nameFile) {
				this.$knowledgeAdapter.downloadFileKnowledge(item.data.link).then(resp => {
					const url = window.URL.createObjectURL(new Blob([resp]))
					const link = document.createElement('a')
					link.href = url
					link.setAttribute('download', nameFile)
					document.body.appendChild(link)
					link.click()
				}).catch((err) => {
					this.$swal("Error!", "download ข้อมุลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง .." + "<br>" + err, "error")
				})
			}
		},
		computed: {
			getDetailContent() {
				return this.$store.getters.getContentById
			}
		}
	}
</script>

<style scoped>

</style>
