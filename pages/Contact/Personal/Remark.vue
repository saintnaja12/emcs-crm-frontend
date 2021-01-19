<template xmlns:v-quill="http://www.w3.org/1999/xhtml">
  <div class="uk-child-width-1-4@l uk-child-width-1-4@s uk-grid-divider uk-grid" data-uk-grid>
    <div id="modal-remarkLogPersonal" data-uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">
          Remark for Update.
        </h2>
		  <div>
			  <b-table
				  :borderless="borderless"
				  responsive
				  :items="getRemarkPersonal"
				  :fields="fields"
				  :per-page="perPage"
				  :current-page="currentPage"
			  >
				  <template v-slot:cell(No)="row">
					  {{ GetIndexRow(currentPage, perPage, row.index) }}
				  </template>
				  <template v-slot:cell(team)="row">
					  {{row.item.team ? row.item.team: '-'}}
				  </template>
				  <template v-slot:cell(agent)="row">
					  {{row.item.agent ? row.item.agent: '-'}}
				  </template>
				  <template v-slot:cell(remark)="row">
					  <p class="uk-text-break">{{ row.item.remark ? replaceItem(row.item.remark): '-'}}</p>
				  </template>
			  </b-table>
			  <b-pagination
				  align="center"
				  v-model="currentPage"
				  :total-rows="rows"
				  :per-page="perPage"
				  aria-controls="my-table"
			  ></b-pagination>
		  </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScInput from '~/components/Input'

export default {
    components: {
        ScInput,
    },
    data: () => ({
        submitStatus: null,
        CheckDate: false,
        editorConfig: {},
        group:'',
        GroupList: [],
		remarkLogList:[],
		currentPage: 1,
		perPage: 10,
		fields: [
			{ key: 'No', label: 'No.', class: 'text-left', isRowHeader: true},
			{ key: 'team', label: 'Team', class: 'text-left'},
			{ key: 'agent', label: 'Agent',  class: 'text-left'},
			{ key: 'remark', label: 'Remark', class: 'text-left', tdClass:'w330'},
		],
		borderless: true,
    }),
    validations: {
    },
    computed:{
		rows () {
			return this.remarkLogList.length
		},
		getRemarkPersonal () {
			console.log('test',this.$store.getters.remarkPersonalById);
			return this.$store.getters.remarkPersonalById
		}
    },
	mounted () {
    },
    methods:{
		replaceItem(data) {
			return _.replace(data, /\\n/g, ' ')
		},
		GetIndexRow (CurrentPage, PerPage, index){
			return ( CurrentPage - 1 ) * PerPage + (index + 1)
		},
    }
}
</script>
<style>
	.w330 {
		width: 330px;
	}
</style>
