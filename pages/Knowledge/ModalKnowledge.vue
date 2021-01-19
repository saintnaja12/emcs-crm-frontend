<template>
	<div id="modal-knowledge" class="uk-modal" uk-modal>
		<div class="uk-modal-dialog">
			<button class="uk-modal-close-default" type="button" uk-close></button>
			<div class="uk-modal-header">
				<h2 class="uk-modal-title">
					<span><i class="mdi mdi-lightbulb-on"></i></span> Knowledge Base
				</h2>
			</div>
			<div class="uk-grid" uk-grid>
				<div class="uk-width-1-4@m uk-first-column uk-text-right">
					<h6 class="uk-margin-mini-top">Search :</h6>
				</div>
				<div class="uk-width-1-2@m uk-text-center">
					<input placeholder="Input ..." type="text"
						   class="uk-input sc-vue-input sc-input-outline uk-form-small">
				</div>
			</div>
			<div class="uk-modal-body" uk-overflow-auto>
				<h3>Popular List</h3>
				<div class="uk-margin" v-for="contentList in contentLists">
					<div class="uk-card uk-card-default uk-card-small uk-card-body">
						<div class="uk-card-badge uk-label">Polular</div>
						<h5 class="uk-card-title">{{contentList.topic}}</h5>
						<p v-html="limitContent(contentList.content)"></p>
						<div class="uk-card-footer">
						</div>
					</div>
				</div>
				<hr>
				<h3>Content List</h3>
				<div class="uk-margin" v-for="contentList in contentLists">
					<div class="uk-card uk-card-default uk-card-small uk-card-body">
						<h5 class="uk-card-title">{{contentList.topic}}</h5>
						<p v-html="limitContent(contentList.content)"></p>
						<div class="uk-card-footer" align="right">
							<button class="sc-button sc-button-primary" type="button" uk-toggle="target: #modal-view-content" @click="contentById(contentList.id)">
								Read more
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<viewDetailContent/>
	</div>
</template>
<script>
	import viewDetailContent from "./content/viewDetailContent";
	export default {
		name: "ModalKnowledge",
		components: {
			viewDetailContent
		},
		data: () => ({
			popularLists: [],
			contentLists: []
		}),
		methods: {
			getContentList() {
				this.$knowledgeAdapter.getContentList().then(resp => {
					console.log(resp.data)
					this.contentLists = resp.data
				})
			},
			getPopularList() {
				this.$knowledgeAdapter.getPopularList().then(resp => {
					console.log(resp.data)
					this.popularLists = resp.data
				})
			},
			limitContent(data) {
				return _.truncate(data, {
					'length': 50
				})
			},
			contentById(id) {
				console.log(id)
				this.$knowledgeAdapter.getContentDetails(id).then(resp => {
					this.$store.dispatch('contentById', _.cloneDeep(resp))
				})
			},
		},
		created() {
			this.getPopularList()
			this.getContentList()
		}
	}

</script>

<style scoped>

</style>
