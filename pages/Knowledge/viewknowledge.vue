<template>
	<b-modal id="modal-knowledge" size="xl" centered no-close-on-backdrop hide-footer scrollable>
		<template v-slot:modal-header="{ close }">
			<h4 v-if="setPage === 'showKnowledge'">
				<i class="mdi mdi-lightbulb-on"></i>
				Knowledge Base
			</h4>
			<h2 class="uk-modal-title" v-else>
				<p style="font-weight: bold;font-size: 25px" class="uk-margin-remove">
					{{ getDetailContent.topic }}
				</p>
				<small class="text-muted" style="font-size: 12px;font-weight: lighter">
					<i class="mdi mdi-account sc-icon-18"></i>
					Update By {{ getDetailContent.createBy ? getDetailContent.createBy : getDetailContent.updateBy }}
					<i class="mdi mdi-calendar-month sc-icon-18"></i>
					Date {{ getDetailContent.createdAt ? getDetailContent.createdAt : getDetailContent.updatedAt }}
				</small>
			</h2>
			<i class="mdi mdi-close" style="cursor: pointer" @click="closePage()"></i>
		</template>
		<div v-if="setPage !== 'viewKnowledge'" class="uk-heading-line uk-padding-small">
			<b-form-input  v-model="keyword" type="text" debounce="500" @input="getSearchAllContent(keyword)" placeholder="Search..."></b-form-input>
			<div v-if="knowledgeList.length === 0" class="uk-margin-large" align="center">
				<p>No data</p>
			</div>
		</div>
		<div v-if="setPage === 'showKnowledge'">
			<div v-for="(contents, index) in knowledgeList" :key="'newContent_' + index" class="uk-padding-small">
				<b-card>
					<b-card-body href="#" disabled class="flex-column align-items-start uk-padding-remove">
						<div class="d-flex w-100 justify-content-between">
							<h5 class="mb-1" style="font-weight: bold;">
								{{ contents.topic }}
							</h5>
						</div>
						<div class="mb-1 uk-text-break uk-text-lighter" v-html="truncate(contents.content)"></div>
						<small class="text-muted" style="font-size: 14px">
							<i class="mdi mdi-account sc-icon-18"></i>
							By {{ contents.createBy }}
							<i class="mdi mdi-calendar-month sc-icon-18"></i>
							{{ contents.createdAt }}
							<i class="mdi mdi-eye sc-icon-18 uk-margin-mini-left"></i>
							View : {{ contents.view ? contents.view : '0' }}
						</small>
						<b-button href="#"
								  variant="info"
								  class="uk-align-right uk-margin-remove"
								  size="sm"
								  @click="showDetailKnowledge(contents.id)"
						>
							Read More
						</b-button>
					</b-card-body>
				</b-card>
			</div>
		</div>
		<div v-if="setPage === 'viewKnowledge'">
			<div class="uk-modal-body" data-uk-overflow-auto>
				<div v-html="getDetailContent.content"></div>
			</div>
		</div>
		<div v-if="setPage === 'viewKnowledge'">
			<small style="font-size: 16px;font-weight: lighter" class="uk-margin-mini-left uk-margin-mini-top text-muted">
				<i class="mdi mdi-eye sc-icon-18"></i> View : {{ getDetailContent.view ? getDetailContent.view : '0' }}
			</small>
			<button class="sc-button sc-button-danger  uk-align-right" type="button" @click="back()">
				Back
			</button>
		</div>
	</b-modal>
</template>

<script>
	import { ScProgressCircular } from '~/components/progress'
	import { Subject, EMPTY, from, of } from 'rxjs'
	import { mergeMap, debounceTime, tap, catchError } from 'rxjs/operators'

	export default {
		name: "Viewknowledge",
		components: {
			ScProgressCircular,
		},
		data: () => ({
			contentLists: [],
			keyword: '',
			searchContent:'',
			setPage: 'showKnowledge',
			searchValue:'',
			contentAllLists:[],
			popular:[],
			subPopular:'',
			btnReplacedContent: true,
			btnContent: 'Click Me',
			btn1Loading: false,
			btn2Loading: false,
			btn1LoadingEnd: false,
			btn2LoadingEnd: false,
			btn3Loading: false,
			btn3LoadingEnd: false,
			overWriteStyle: {
				color: 'red',
				backgroundColor: 'yellow'
			},
			sensitive:false,
			knowledgeList: [],
			getDetailContent:{}
		}),
		computed: {
			cardImgSrc () {
				return require('~/assets/img/no-image.png')
			},
			getContentLists () {
				return this.$store.getters.getContentLists
			},
			searchAllContent () {
				return this.$store.getters.getSearchAllContent
			},
		},
		created() {
			this.searchContent$ = new Subject()
		},
		mounted () {
			this.getContentList()
			this.initObservableSubjects()
		},
		destroyed() {
			$('#modal-knowledge').remove()
			$('#modal-showDetailKnowledge').remove()
		},
		methods: {
			showDetailKnowledge (id) {
				this.$knowledgeAdapter.getContentDetails(id).then(resp => {
					this.getDetailContent = resp
					this.getContentList()
					this.setPage = 'viewKnowledge' ;
				})
			},
			back () {
				this.setPage = 'showKnowledge' ;
			},
			getSearchAllContent (keyword) {
				this.setPage = 'showKnowledge'
				this.keyword = keyword
				this.searchContent$.next(this.keyword)
			},
			truncate(text) {
				return _.truncate(text, {
					length: 100,
					separator: ' '
				})
			},
			initObservableSubjects(){
				this.searchContent$.pipe(
					debounceTime(300),
					mergeMap((keyword) => {
						return from( this.$knowledgeAdapter.getSearchAllContent(keyword)).pipe(
							catchError(e => {
								return of(e)
							}),
						)
					}),
					tap(result => {
						this.knowledgeList = result
					}),
					catchError(e => {
						return EMPTY
					}),
				).subscribe(result => {
					this.knowledgeList = result
				})
			},
			getContentList(){
				this.$knowledgeAdapter.getContentList()
					.then(resp => {
						const filterValues = _.filter(resp.data, (content) => !_.isEmpty(content.category) );
						this.knowledgeList = filterValues
					})
			},
			closePage(){
				this.$bvModal.hide('modal-knowledge')
				this.setPage = "showKnowledge"
				this.keyword = ''
			}
		},
		watch: {
			'keyword' (newValue) {
				if (newValue === '') {
					this.getSearchAllContent(this.keyword)
				}
			}
		}
	}
</script>

<style>
	#modal-knowledge___BV_modal_outer_ {
		z-index: 99999 !important;
	}
</style>
