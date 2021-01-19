<template>
	<div id="sc-page-wrapper">
		<no-ssr>
			<div id="sc-page-top-bar" class="sc-top-bar">
				<div class="sc-top-bar-content uk-flex uk-flex-1">
					<h1 class="sc-top-bar-title uk-text-uppercase uk-flex-1">
						History Edit Knowledge Log
					</h1>
				</div>
			</div>
		</no-ssr>

		<div id="sc-page-content">
			<div class="uk-grid uk-child-width" uk-grid>
				<div>
					<ScCard class="uk-margin-mini-top">
						<ScCardHeader separator>
							<div>
								<div>
									<ScCardTitle>
										<div>
											<transition name="fade" mode="out-in">
												<div>
													<a class="sc-button sc-button-secondary sc-button-social" @click="backPage()">
														<i class="mdi mdi-arrow-left-bold-circle"></i>
													</a>
												</div>
											</transition>
										</div>
									</ScCardTitle>
								</div>
							</div>
						</ScCardHeader>
						<ScCardBody style="min-height: 710px">
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
										size="sm"
										class="mr-5"
									></b-form-select>
								</b-form-group>
							</div>
							<div class="uk-width-1-6@s uk-align-right uk-margin-bottom">
								<input class="uk-input uk-form-small" type="text" placeholder="Search">
							</div>
							<div class="uk-margin-top">
								<b-table
									sticky-header="550px"
									small
									:fields="fields"
									hover
									responsive
								>
								</b-table>
								<b-pagination>
								</b-pagination>
							</div>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import ScCard from "../../components/card/components/Card";
	export default {
        name: "viewLogAllKnowledge",
		components: {ScCard},
		data: () => ({
			fields: [
				{ key: 'id', label: 'No.', sortable: true, class: 'text-left', isRowHeader: true},
				{ key: 'topic', label: 'Topic', sortable: true, class: 'text-left', isRowHeader: true},
				{ key: 'remark', label: 'Remark', sortable: true, class: 'text-left', isRowHeader: true},
				{ key: 'editAt', label: 'Edit Date', sortable: true, class: 'text-left', isRowHeader: true},
				{ key: 'editBy', label: 'Edit By', sortable: true, class: 'text-left', isRowHeader: true},
			]
		}),
		methods: {
			backPage(){
				this.$router.push(`/Knowledge`)
			}
		}
	}
</script>

<style scoped>

</style>
