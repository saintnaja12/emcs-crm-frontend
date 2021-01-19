<template>
  <div id="sc-page-wrapper">
    <no-ssr>
      <div id="sc-page-top-bar" class="sc-top-bar">
        <div class="sc-top-bar-content uk-flex uk-flex-1">
          <h1 class="sc-top-bar-title uk-text-uppercase uk-flex-1">
            Knowledge Base
          </h1>
        </div>
      </div>
	</no-ssr>

    <div id="sc-page-content">
		<div data-uk-grid class="uk-grid" >
			<div class="uk-width-1-4@m uk-first-column uk-text-right">
				<h4 class="uk-margin-mini-top">Search Knowledge</h4>
			</div>
			<div class="uk-width-1-2@m uk-text-center">
				<input placeholder="Input ..." type="text" class="uk-input sc-vue-input sc-input-outline">
			</div>
			<div class="uk-width-1-4@m uk-text-right">
				<div class="uk-width-auto@s">
					<a class="sc-button sc-button-warning sc-button-social" @click="viewHistoryLog()">
						<span>Edit History</span><i class="mdi mdi-playlist-edit"></i>
					</a>
					<a class="sc-button md-bg-light-blue-800 sc-button-social" data-uk-toggle="target: #modal-create-content">
						<span>ADD Content</span><i class="mdi mdi-plus-box"></i>
					</a>
				</div>
			</div>
		</div>
      <div class="uk-child-width-1-1@s uk-grid" data-uk-grid>
        <div>
          <ScCard>
            <ScCardHeader class="md-bg-light-blue-800 sc-light" separator>
              <ScCardTitle>
                Popular
              </ScCardTitle>
            </ScCardHeader>
            <ScCardBody>
              <div class="uk-margin-bottom uk-width-1-6@s uk-align-left">
                <b-form-group
                  label="Show"
                  label-cols-sm="6"
                  label-cols-md="4"
                  label-cols-lg="3"
                  label-align-sm="left"
                  label-size="sm"
                  label-for="perPageSelect"
                  class="mb-0 uk-align-left"
                >
                  <b-form-select
                    id="perPageSelect"
                    v-model="perPagePopular"
                    size="sm"
                    :options="pageOptionsPopular"
                    class="mr-5"
                  ></b-form-select>
                </b-form-group>
              </div>
              <div class="uk-width-1-6@s uk-align-right uk-margin-bottom">
                <input v-model="filterPopular" class="uk-input uk-form-small" type="text" placeholder="Search Popular">
              </div>
              <div class="uk-margin-top">
                <b-table
                  show-empty
                  small
                  stacked="md"
				  :items="popularLists"
                  :fields="fieldsPopular"
                  :current-page="currentPagePopular"
                  :per-page="perPagePopular"
                  :filter="filterPopular"
                >
                  <template v-slot:cell(No)="row">
                    {{ GetIndexRow(currentPagePopular, perPagePopular, row.index) }}
                  </template>
					<template v-slot:cell(category)="row">
						{{ row.item.category }}
					</template>
					<template v-slot:cell(topic)="row">
						{{ row.item.topic }}
					</template>
					<template v-slot:cell(view)="row">
						{{ row.item.view ? row.item.view : 0}}
					</template>
					<template v-slot:cell(refNo)="row">
						{{ row.item.refNo ? row.item.refNo: 0 }}
					</template>
					<template v-slot:cell(createdAt)="row">
						{{ row.item.createdAt }}
					</template>
					<template v-slot:cell(createdBy)="row">
						{{ row.item.createdBy.name }}
					</template>
                  <template v-slot:cell(Action)="row" style="width: 50px">
                    <div class="uk-width-auto uk-grid-medium uk-flex-middle uk-grid" data-uk-grid>
                      	<div class="uk-margin-mini-right">
						  <button class="sc-button sc-button-small md-bg-cyan-600" data-uk-toggle="target: #modal-view-content" v-on:click="contentById(row.item.id)">
							  <i class="mdi mdi-eye md-color-white sc-icon-18"></i>
						  </button>
						</div>
						<div class="uk-margin-remove uk-padding-remove-left uk-margin-mini-right">
							<button class="sc-button sc-button-small md-bg-green-400" data-uk-toggle="target: #modal-edit-content" v-on:click="editContentById(row.item)">
								<i class="mdi mdi-pencil md-color-white sc-icon-18"></i>
							</button>
                      	</div>
						<div class="uk-margin-remove uk-padding-remove-left uk-margin-mini-right">
							<button class="sc-button sc-button-small md-bg-red-600" v-on:click="deleteContent(row.item)">
								<i class="mdi mdi-delete md-color-white sc-icon-18"></i>
							</button>
						</div>
						<div class="uk-margin-remove uk-padding-remove-left">
							<b-button to="" class="sc-button sc-button-small" variant="light" style="cursor: default;" disabled="">
								<i v-if="row.item.file.success === true" class="mdi mdi-paperclip md-color-black sc-icon-18"></i>
								<i v-if="row.item.highlight !== null && row.item.highlight !== 0" class="mdi mdi-pin md-color-black sc-icon-18"></i>
							</b-button>
						</div>
                    </div>
                  </template>
                </b-table>
                <b-pagination
                  v-model="currentPagePopular"
                  :total-rows="totalRowsPopular"
                  :per-page="perPagePopular"
                  class="uk-pagination-right uk-flex-right"
				  size="sm"
                ></b-pagination>
              </div>
            </ScCardBody>
          </ScCard>
        </div>
        <div>
          <ScCard>
            <ScCardHeader class="md-bg-light-blue-800 sc-light" separator>
              <ScCardTitle>
                PR/Announcement
              </ScCardTitle>
            </ScCardHeader>
            <ScCardBody>
              <div class="uk-margin-bottom uk-width-1-6@s uk-align-left">
                <b-form-group
                  label="Show"
                  label-cols-sm="6"
                  label-cols-md="4"
                  label-cols-lg="3"
                  label-align-sm="left"
                  label-size="sm"
                  label-for="perPageSelect"
                  class="mb-0 uk-align-left"
                >
                  <div slot="">
                  </div>
                  <b-form-select
                    id="perPageSelectContent"
                    v-model="perPageContent"
                    size="sm"
                    :options="pageOptionsContent"
                    class="mr-5"
                  ></b-form-select>
                </b-form-group>
              </div>
              <div class="uk-width-1-6@s uk-align-right uk-margin-bottom">
                <input v-model="filterContent" class="uk-input uk-form-small" type="text" placeholder="Search">
              </div>
              <div class="uk-margin-top">
                <b-table
                  show-empty
                  small
                  stacked="md"
				  :items="contentList"
                  :fields="fieldsContent"
                  :current-page="currentPageContent"
                  :per-page="perPageContent"
                  :filter="filterContent"
                  responsive
                >
                  <template v-slot:cell(No)="row">
                    {{ GetIndexRow(currentPageContent, perPageContent, row.index) }}
                  </template>
					<template v-slot:cell(category)="row">
						{{ row.item.category }}
					</template>
					<template v-slot:cell(topic)="row">
						{{ row.item.topic }}
					</template>
					<template v-slot:cell(view)="row">
						{{ row.item.view ? row.item.view : 0}}
					</template>
					<template v-slot:cell(refNo)="row">
						{{ row.item.refNo ? row.item.refNo: 0 }}
					</template>
					<template v-slot:cell(createdAt)="row">
						{{ row.item.createdAt }}
					</template>
					<template v-slot:cell(createdBy)="row">
						{{ row.item.createdBy.name }}
					</template>
                  <template v-slot:cell(Action)="row" style="width: 50px">
                    <div class="uk-width-auto uk-grid-medium uk-flex-middle uk-grid" data-uk-grid>
                      <div class="uk-margin-mini-right">
						  <button class="sc-button sc-button-small md-bg-cyan-600" data-uk-toggle="target: #modal-view-content" v-on:click="contentById(row.item.id)">
							  <i class="mdi mdi-eye md-color-white sc-icon-18"></i>
						  </button>
                      </div>
                      <div class="uk-margin-remove uk-padding-remove-left uk-margin-mini-right">
						  <button class="sc-button sc-button-small md-bg-green-400" data-uk-toggle="target: #modal-edit-content" v-on:click="editContentById(row.item)">
							  <i class="mdi mdi-pencil md-color-white sc-icon-18"></i>
						  </button>
                      </div>
						<div class="uk-margin-remove uk-padding-remove-left uk-margin-mini-right">
							<button class="sc-button sc-button-small md-bg-red-600" v-on:click="deleteContent(row.item)">
								<i class="mdi mdi-delete md-color-white sc-icon-18"></i>
							</button>
						</div>
						<div class="uk-margin-remove uk-padding-remove-left">
							<b-button to="" class="sc-button sc-button-small" variant="light" style="cursor: default;" disabled="">
								<i v-if="row.item.file.success === true" class="mdi mdi-paperclip md-color-black sc-icon-18"></i>
								<i v-if="row.item.highlight !== null && row.item.highlight !== 0" class="mdi mdi-pin md-color-black sc-icon-18"></i>
							</b-button>
						</div>
                    </div>
                  </template>
                </b-table>
                <b-pagination
                  v-model="currentPageContent"
                  :total-rows="totalRowsContent"
                  :per-page="perPageContent"
				  size="sm"
                  class="uk-pagination-right uk-flex-right"
                ></b-pagination>
              </div>
            </ScCardBody>
          </ScCard>
        </div>
      </div>
    </div>
	  <div>
		  <vueper-slides
			  class="no-shadow container"
			  :visible-slides="5"
			  slide-multiple
			  :gap="1"
			  :slide-ratio="1 / 4"
			  :dragging-distance="200"
			  :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }"
			  bullets-outside>
			  <vueper-slide v-for="slide in slides"
							:key="slide.id"
							:title="slide.title"
							:image="slide.img"
			  />
<!--			  <vueper-slide v-for="thumbnail in getContentList.thumbnail" :key="thumbnail" />-->
		  </vueper-slides>
	  </div>
	  <createContent/>
	  <viewDetailContent/>
	  <editContent/>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import createContent from "./content/createContent";
import viewDetailContent from "./content/viewDetailContent";
import editContent from "./content/editContent";

export default {
    name: "Knowledge",
    components: {
		VueperSlides,
		VueperSlide,
		createContent,
		viewDetailContent,
		editContent
    },

    data: () => ({
		slides: [
			{
				id:1,
				title: 'Slide #1',
				img:'https://picsum.photos/250/250/?image=54'
			},
			{
				id:2,
				title: 'Slide #2',
				img:'https://picsum.photos/250/250/?image=54'
			},
			{
				id:3,
				title: 'Slide #3',
				img:'https://picsum.photos/250/250/?image=54'
			},
			{
				id:4,
				title: 'Slide #4',
				img:'https://picsum.photos/250/250/?image=54'
			},
			{
				id:5,
				title: 'Slide #5',
				img:'https://picsum.photos/250/250/?image=54'
			},
			{
				id:6,
				title: 'Slide #6',
				img:'https://picsum.photos/250/250/?image=54'
			},
			{
				id:7,
				title: 'Slide #7',
				img:'https://picsum.photos/250/250/?image=54'
			},
			{
				id:8,
				title: 'Slide #8',
				img:'https://picsum.photos/250/250/?image=54'
			},
			{
				id:9,
				title: 'Slide #9',
				img:'https://picsum.photos/250/250/?image=54'
			},
			{
				id:10,
				title: 'Slide #10',
				img:'https://picsum.photos/250/250/?image=54'
			}
		],
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
        fieldsContent: [
            { key: 'No', label: 'No.', sortable: false, class: 'text-left', sortDirection: 'asc'},
			{ key: 'category', label: 'Category', sortable: false, class: 'text-left'},
			{ key: 'topic', label: 'Topic', sortable: false, class: 'text-left'},
			{ key: 'view', label: 'View', sortable: false, class: 'text-center'},
			{ key: 'refNo', label: 'Version', sortable: false, class: 'text-center'},
            { key: 'createdAt', label: 'Create Date', sortable: false, class: 'text-left'},
            { key: 'createdBy', label: 'Create By', sortable: false, class: 'text-left'},
            { key: 'Action', label: 'Action', tdClass: 'ActionWidth' }
        ],
		contentList: [],
        totalRowsContent: 1,
        currentPageContent: 1,
        perPageContent: 10,
        pageOptionsContent: [10, 25, 50, 100],
        filterContent: null,
        fieldsPopular: [
			{ key: 'No', label: 'No.', sortable: false, class: 'text-left', sortDirection: 'asc'},
			{ key: 'category', label: 'Category', sortable: false, class: 'text-left'},
			{ key: 'topic', label: 'Topic', sortable: false, class: 'text-left'},
			{ key: 'view', label: 'View', sortable: false, class: 'text-center'},
			{ key: 'refNo', label: 'Version', sortable: false, class: 'text-center'},
			{ key: 'createdAt', label: 'Create Date', sortable: false, class: 'text-left'},
			{ key: 'createdBy', label: 'Create By', sortable: false, class: 'text-left'},
			{ key: 'Action', label: 'Action', tdClass: 'ActionWidth' }
        ],
        popularLists:[],
        totalRowsPopular: 1,
        currentPagePopular: 1,
        perPagePopular: 10,
        pageOptionsPopular: [10, 25, 50, 100],
        filterPopular: null,
		isBusy: false,
    }),
    computed: {
    },
    watch: {
    },
    mounted () {
    	this.getContentList()
		this.getPopularList()
    },
    methods: {
		GetIndexRow (CurrentPage, PerPage, index){
			return ( CurrentPage - 1 ) * PerPage + (index + 1)
		},
		getContentList() {
    		this.$knowledgeAdapter.getContentList().then(resp => {
				this.contentList = resp.data
			})
		},
		getPopularList() {
			this.$knowledgeAdapter.getPopularList().then(resp => {
				this.popularLists = resp.data
			})
		},
		contentById (id) {
			this.$knowledgeAdapter.getContentDetails(id).then(resp => {
				this.$store.dispatch('contentById', _.cloneDeep(resp))
			})
		},
		editContentById (data) {
			let loader = this.$loading.show({
				loader : 'spinner'
			})
			this.$store.dispatch('contentById', _.cloneDeep(data)).then(
				loader.hide()
			)
			this.getContentList()
			this.getPopularList()
		},
		deleteContent (item) {
				let loader = this.$loading.show({
					loader : 'spinner',
				})
				this.$swal.fire({
					title: 'Confirm Delete!',
					text: 'Are you sure you want to delete this, item?',
					showConfirmButton: true,
					allowOutsideClick: false,
					showCancelButton: true,
					cancelButtonColor: '#ff7674',
				}).then((result) => {
					loader.hide()
					if (result.value) {
						this.$knowledgeAdapter.deleteContent(item).then(resp => {
							this.$swal('Deleted!','ข้อมูลสำเร็จแล้ว','success')
							return resp
						})
					}
					this.getContentList()
					this.getPopularList()
				}).catch(err => {
				this.$swal("Error!", "มีบางอย่างผิดพลาด" + "<br>" + err + "<br>" + err.response.data.message, "error")
					this.getPopularList()
					this.getContentList()
			})
		},
		viewHistoryLog (){
			this.$router.push(`/Knowledge/historyLogAllKnowledge`)
		}
    }
}
</script>

<style lang="scss">
	@import "~scss/common/md_colors";
	@import "~scss/common/variables_mixins";
	@import "~scss/pages/chat";
	@import '~scss/common/variables_mixins';

	.cot{
		background-color: white;
	}
	.cot:hover{
		background-color: #dcedc8;
	}
	.cot1{
		color: white;
	}
	.hide {
		display: none;
	}
	.display_content{
		display: block;
	}
	.rightBt{
		margin-right: 20px;
	}
	.categoryWidth {
		min-width: 550px;
	}
	.ActionWidth {
		min-width: 75px;
	}
	.ql-editor {
		min-height: 200px;
		max-height: 400px;
		overflow-y: auto;
	}
	.ql-container {
		font-family: "Roboto", Arial, Helvetica, sans-serif;
		font-size: 14px;
	}
	.ql-toolbar {
		background: #eee;
	}
	.ql-container {
		background: #fff;
	}
	.ql-editor h1,
	.ql-editor h2,
	.ql-editor h3,
	.ql-editor h4 {
		margin-bottom: 8px;
	}
	.ql-snow.ql-toolbar button,
	.ql-snow .ql-toolbar button {
		padding: 4px 8px;
		height: 26px;
		width: 34px;
		transition: all 140ms ease;
	}
	.ql-snow.ql-toolbar button:hover,
	.ql-snow .ql-toolbar button:hover,
	.ql-snow.ql-toolbar button:focus,
	.ql-snow .ql-toolbar button:focus,
	.ql-snow.ql-toolbar button.ql-active,
	.ql-snow .ql-toolbar button.ql-active,
	.ql-snow.ql-toolbar .ql-picker-label:hover,
	.ql-snow .ql-toolbar .ql-picker-label:hover,
	.ql-snow.ql-toolbar .ql-picker-label.ql-active,
	.ql-snow .ql-toolbar .ql-picker-label.ql-active {
		background: rgba(0,0,0,.05);
		border-radius: 3px;
	}
	.ql-snow .ql-tooltip {
		z-index: 2000;
		@include box-shadow(4);
		border-radius: $border-radius;
		border: none;
		padding: 8px 12px;
	}
	.vueperslide {
		color: red;
		font-size: xx-large;
		opacity: 0.8;
	}
	.vueperslide:hover {
		opacity: 1.0;
	}
</style>
