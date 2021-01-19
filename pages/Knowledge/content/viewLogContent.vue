<template>
	<div>
		<h1></h1>
	</div>
</template>

<script>
    export default {
        name: "viewLogContent",
		data: () => ({
			historyLogContent: {
				id: '',
					knowledgeId: '',
					logs: [
					{
						topic: '',
						refNo: '',
						remark: '',
						editDate: '',
						editBy: {
							id: '',
							name: '',
							team: {
								id: '',
								name: ''
							}
						}
					}
				],
				createdAt: ''
			},
			fieldsLogContent: [
				{key: 'index', label: 'No.', sortable: false,},
				{key: 'topic', label: 'Topic', sortable: false,},
				{key: 'refNo', label: 'Ref. No/Version', sortable: false,},
				{key: 'editDate', label: 'Edit Date', sortable: false,},
				{key: 'editBy.name', label: 'Edit By', sortable: false}
			],
		}),
		methods: {
        	getLogContent() {
        		this.$knowledgeAdapter.getLogContent(id).then(resp => {
					this.historyLogContent = resp
				})
			}
		},
    }
</script>

<style scoped>

</style>
