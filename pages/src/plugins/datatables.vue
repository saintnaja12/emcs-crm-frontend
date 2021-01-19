<template>
  <div id="sc-page-wrapper">
    <div id="sc-page-content">
      <ScCard>
        <ScCardTitle>
          Zero configuration
        </ScCardTitle>
        <ScCardBody>
          <no-ssr>
            <Datatable id="sc-basic-table"
                       ref="basicTable"
                       :data="dtAData"
                       @initComplete="dtBasicInitialized"
            >
              <tfoot slot="footer">
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Position</th>ด
                  <th>Salary</th>
                  <th class="uk-text-nowrap">
                    Start date
                  </th>
                  <th>Office</th>
                  <th>Extn.</th>
                </tr>
              </tfoot>
            </Datatable>
          </no-ssr>
        </ScCardBody>
      </ScCard>
      <ScCard class="uk-margin-top">
        <ScCardTitle>
          Vertical Scroll
        </ScCardTitle>
        <ScCardBody>
          <no-ssr>
            <Datatable id="sc-dt-scroll-v"
                       ref="vScrollTable"
                       :data="dtBData"
                       :options="dtBOptions"
            ></Datatable>
          </no-ssr>
        </ScCardBody>
      </ScCard>
      <ScCard class="uk-margin-top">
        <ScCardHeader separator>
          <div class="uk-flex-middle uk-grid-small uk-grid" data-uk-grid>
            <div class="uk-flex-1">
              <ScCardTitle>
                Show / hide columns dynamically
              </ScCardTitle>
              <ScCardMeta>
                localStorage
              </ScCardMeta>
            </div>
            <div class="uk-width-auto@s">
              <button class="sc-button sc-button-primary sc-button-flex" type="button">
                Toggle Columns <i class="mdi mdi-chevron-down uk-margin-small-left"></i>
              </button>
              <div class="uk-dropdown uk-width-small" data-uk-drop="mode: click">
                <div class="sc-padding-small">
                  <div v-for="(checkbox, index) in dtCHeaders" :key="index" class="uk-margin-small">
                    <PrettyCheck
                      class="p-icon"
                      :value="index"
                      :checked="checkbox.checked"
                      :disabled="checkbox.disabled"
                      @change="toggleCol($event, index)"
                    >
                      <i slot="extra" class="icon mdi mdi-check"></i>
                      {{ checkbox.name }}
                    </PrettyCheck>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScCardHeader>
        <ScCardBody>
          <no-ssr>
            <Datatable id="sc-dt-columns-toggle"
                       ref="colToggleTable"
                       :data="dtCData"
                       :options="dtCOptions"
                       @initComplete="dtCInitialized"
            ></Datatable>
          </no-ssr>
        </ScCardBody>
      </ScCard>
      <ScCard class="uk-margin-top">
        <ScCardHeader separator>
          <div class="uk-flex-middle uk-grid-small uk-grid" data-uk-grid>
            <div class="uk-flex-1">
              <ScCardTitle>
                Buttons
              </ScCardTitle>
            </div>
            <div class="uk-width-auto@s">
              <div id="sc-dt-buttons"></div>
            </div>
          </div>
        </ScCardHeader>
        <ScCardBody>
          <no-ssr>
            <Datatable
              id="sc-dt-buttons-table"
              ref="buttonsTable"
              :data="dtDData"
              :options="dtDOptions"
              :buttons="true"
              @initComplete="dtButtonsInitialized"
            ></Datatable>
          </no-ssr>
        </ScCardBody>
      </ScCard>
    </div>
  </div>
</template>

<script>
import PrettyCheck from 'pretty-checkbox-vue/check';
const rows = require('~/data/pages/datatables.json');

export default {
    components: {
        Datatable: process.client ? () => import('~/components/datatables/Datatables') : null,
        PrettyCheck
    },
    data: () => ({
        basicTable: null,
        dtAData: JSON.parse(JSON.stringify(rows)),
        dtBData: JSON.parse(JSON.stringify(rows)),
        dtBOptions: {
            "scrollY": "200px",
            "scrollCollapse": true,
            "paging": false,
            responsive: 'responsiveModal'
        },
        dtCData: JSON.parse(JSON.stringify(rows)),
        dtCHeaders: [],
        dtCOptions: {
            "pagingType": "full_numbers",
            select: true,
            "stateSave": true,
            stateSaveCallback (settings, data) {
                localStorage.setItem( 'dtC', JSON.stringify(data) )
            },
            stateLoadCallback (settings) {
                return JSON.parse( localStorage.getItem( 'dtC' ) )
            }
        },
        dtDData: JSON.parse(JSON.stringify(rows)),
        dtDOptions: {
            buttons: [
                {
                    extend: "copyHtml5",
                    className: "sc-button",
                    text: 'Copy'
                },
                {
                    extend: "csvHtml5",
                    className: "sc-button",
                    text: 'CSV '
                },
                {
                    extend: "excelHtml5",
                    className: "sc-button",
                    text: 'Excel '
                },
                {
                    extend: "pdfHtml5",
                    className: "sc-button sc-button-icon",
                    text: '<i class="mdi mdi-file-pdf md-color-red-800"></i>'
                },
                {
                    extend: "print",
                    className: "sc-button sc-button-icon",
                    text: '<i class="mdi mdi-printer"></i>',
                    title: 'Custom Title',
                    messageTop: 'Custom message on the top',
                    messageBottom: 'Custom message on the bottom',
                    autoPrint: true
                }
            ]
        }
    }),
    methods: {
        dtBasicInitialized () {
            // basic table manipulation

            this.basicTable = this.$refs.basicTable.$dt;

            // Go to last page
            this.basicTable.page('last').draw('page');
            setTimeout(() => {
                // add new row
                this.dtAData.push({
                    "id": "1000",
                    "name": "New User",
                    "position": "New position",
                    "salary": "$222,222",
                    "start_date": "2018\/03\/22",
                    "office": "New York",
                    "extn": "1111"
                })
            }, 1000);
            setTimeout(() => {
                // go to first page
                this.basicTable.page('first').draw('page');
            }, 1200);
            setTimeout(() => {
                // remove row (id = '4')
                var index = this.dtAData.map(obj => {
                    return obj.id
                }).indexOf('3');
                this.dtAData.splice(index, 1);
            }, 2000);
        },
        dtCInitialized () {
            const ls = JSON.parse( localStorage.getItem( 'dtC' ) );
            this.$refs.colToggleTable.headers.forEach( (value, i) => {
                this.dtCHeaders.push({
                    'name': value,
                    checked: ls.columns[i].visible,
                    disabled: i === 0
                })
            });
        },
        dtButtonsInitialized () {
            // append buttons to custom container
            this.$refs.buttonsTable.$dt.buttons().container().appendTo(document.getElementById('sc-dt-buttons'))
        },
        toggleCol (e, col) {
            var column = this.$refs.colToggleTable.$dt.column(col);
            column.visible(e).draw('page');
        }
    }
}
</script>

<style lang="scss">
	@import "~scss/common/md_colors";
	@import "~scss/common/variables_mixins";
	@import "~scss/plugins/datatables";
	@import '~scss/vue/_pretty_checkboxes';
</style>
