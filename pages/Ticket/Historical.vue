<template>
		  <div class="uk-card-body">
			  <div class="uk-overflow-auto">
				  <table class="uk-table uk-table-divider" style="cursor: pointer">
					  <thead>
					  <tr>
						  <th class="uk-text-nowrap">Ticket No</th>
						  <th class="uk-text-nowrap">Customer name</th>
						  <th class="uk-text-nowrap">Company</th>
						  <th class="uk-text-nowrap">Customer Type</th>
						  <th class="uk-text-nowrap">Category Issue</th>
						  <th class="uk-text-nowrap">Subject</th>
						  <th class="uk-text-nowrap">Application</th>
						  <th class="uk-text-nowrap">Channel</th>
						  <th class="uk-text-nowrap">Agent</th>
						  <th class="uk-text-nowrap">Last Status</th>
						  <th class="uk-text-nowrap">Last Status Date</th>
					  </tr>
					  </thead>
					  <tbody>
					  <template v-for="item in history">
						  <tr @click="viewTickets(item.ticketNo)" class="dataClass">
							  <td class="uk-text-nowrap" >{{ item.ticketNo ? item.ticketNo : '-'}}</td>
							  <td class="uk-text-nowrap">{{ item.customerName ? item.customerName : '-'}}</td>
							  <td class="uk-text-nowrap">{{ item.customerCompany ? item.customerCompany : '-'}}</td>
							  <td class="uk-text-nowrap">{{ item.customerType.name ? item.customerType.name : '-' }}</td>
							  <td class="uk-text-nowrap">{{ item.categoryIssue.name ? item.categoryIssue.name : '-'}}</td>
							  <td class="uk-text-nowrap">{{ item.subject.name ? item.subject.name : '-'}}</td>
							  <td class="uk-text-nowrap">{{ item.appName.name ? item.appName.name : '-'}}</td>
							  <td class="uk-text-nowrap">{{ item.channel ? item.channel : '-' }}</td>
							  <td class="uk-text-nowrap">{{ item.createdBy.name ? item.createdBy.name  : '-'}}</td>
							  <td class="uk-text-nowrap">{{ item.status ? item.status : '-'}}</td>
							  <td class="uk-text-nowrap">{{ item.updatedAt ? item.updatedAt : item.createdAt }}</td>
						  </tr>
					  </template>
					  </tbody>
				  </table>
			  </div>
		  </div>
</template>
<script>
export default {
    computed: {
        history() {
            return this.$store.getters.getHistory
        },
    },
	data () {
    	return {
			ticketNum:''
		}
	},
    mounted () {
    },
    methods: {
        viewTickets(ticketNo) {
			$("tr").click(function(){
				$(this).addClass("selected").siblings().removeClass("selected");
			});
			this.$router.push({path: `View?ticketNo=${ticketNo}`})
        },

    }
}

</script>
<style lang="scss">
	.dataClass:hover, .dataClass.selected {
		background-color: #f3da82
	}

</style>
