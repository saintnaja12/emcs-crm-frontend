<template>
	<b-modal ref="modal-viewPartner">
		{{ getPartnerDetail }}
	</b-modal>

<!--	<div ref="modal-viewPartner"-->
<!--		 class="uk-modal"-->
<!--		 bg-close="false"-->
<!--		 data-uk-modal-->
<!--	>-->
<!--		<div class="uk-modal-dialog uk-modal-body">-->
<!--			<h2 class="uk-modal-title">-->
<!--				Details-->
<!--			</h2>-->
<!--			<div>-->
<!--				<b-table-->
<!--					:items="getPartnerDetail"-->
<!--				>-->

<!--				</b-table>-->
<!--			</div>-->
<!--			<br>-->
<!--			<p class="uk-text-right">-->
<!--				<button class="sc-button sc-button-flat uk-modal-close"-->
<!--						type="button"-->
<!--				>-->
<!--					Cancel-->
<!--				</button>-->
<!--			</p>-->
<!--		</div>-->
<!--	</div>-->
</template>

<script>
    export default {
        name: "viewPartner",
		methods:{

		},
		computed:{
        	getPartnerDetail(){
				return this.$store.getters.getPartnerDetail
			}
		},
		mounted() {
		}
	}
</script>

<style scoped>

</style>
