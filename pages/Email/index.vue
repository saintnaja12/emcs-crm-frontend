<template>
	<div id="sc-page-wrapper" class="uk-flex uk-flex-column" uk-filter="target: .js-filter">
		<div id="sc-page-top-bar" class="sc-top-bar">
			<div class="sc-top-bar-aside uk-visible@l"></div>
			<div class="sc-top-bar-content uk-flex uk-flex-1">
				<h1 class="sc-top-bar-title uk-text-uppercase uk-flex-1">
					Email
				</h1>
			</div>
			<div class="sc-top-bar-aside uk-visible@l"></div>
			<div class="sc-top-bar-content uk-flex-1">
				<b-form-input size="sm" v-model="keyword" @input="searchEmailById(keyword)"
							  placeholder="Search... "></b-form-input>
			</div>
		</div>

		<div id="sc-page-wrapper-inner" class="uk-flex">
			<div id="sc-page-aside" class="uk-visible@m">
				<div class="sc-page-aside-body">
					<ul data-uk-accordion="multiple: true" class="uk-accordion">
						<li class="uk-open">
							<a class="uk-accordion-title" href="javascript:void(0)">
								Tags
							</a>
							<div class="uk-accordion-content">
								<ul class="uk-list">
									<li class="uk-active" uk-filter-control>
										<a href="#">
											  <span class="sc-color-label md-bg-white">
												<i class="mdi mdi-close"></i>
											  </span>All Email
										</a>
									</li>
									<li v-for="tag in tags" :key="tag.name"
										:uk-filter-control="'.' + tagName(tag.name)">
										<a href="#">
											<span class="sc-color-label" :class="[ tag.color ]"></span>
											{{ tag.name }}
										</a>
									</li>
								</ul>
							</div>
						</li>
						<li class="uk-open">
							<a class="uk-accordion-title" href="javascript:void(0)">
								Mailboxes
							</a>
							<div class="uk-accordion-content">
								<ul class="uk-list">
									<li class="uk-active" >
										<a href="javascript:void(0)">
											<i class="mdi mdi-inbox uk-margin-small-right"></i>
											Inbox (24)
										</a>
									</li>
									<li>
										<a href="javascript:void(0)">
											<i class="mdi mdi-inbox-arrow-up uk-margin-small-right"></i>
											Sent
										</a>
									</li>
									<li>
										<a href="javascript:void(0)">
											<i class="mdi mdi-inbox-arrow-down uk-margin-small-right"></i>
											Draft
										</a>
									</li>
									<li>
										<a href="javascript:void(0)">
											<i class="mdi mdi-delete uk-margin-small-right"></i>
											Trash
										</a>
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div id="sc-page-content" class="sc-padding-remove uk-height-1-1">
				<div data-sc-scrollbar="visible-y" class="sc-main-scrollable">
					<div class="sc-message-card sc-message-expanded-single" style="min-height: 100%;">
						<perfect-scrollbar class="uk-height-large ps--active-y ps--focus" style="height: 700px">
							<div class="js-filter">
								<ul v-for="email in emailList"
									:key="email.id"
									class="sc-list-messages"
									:class="[email.ticketStatus === null && email.status === 'unread' ? 'New' :  email.ticketStatus]"
								>
									<li data-index="0" style="opacity: 1; transform: translateY(0%);"
										v-if="email.status === 'unread'">
										<div class="sc-message-card">
											<div data-uk-grid=""
												 class="uk-flex uk-flex-middle sc-message-head uk-grid-collapse uk-grid">
												<div class="uk-flex-1 uk-text-truncate">
													<h2 :title="email.subject"
														class="sc-message-title uk-text-truncate">
														<a @click="viewEmail(email.id)" href="javascript:void(0)"
														   v-highlight="{keyword: keyword, overWriteStyle}">
															{{ email.subject }}
														</a>
													</h2>
													<span
														v-if="email.ticketStatus === null && email.status === 'unread'"
														class="uk-label uk-margin-small-right"
														:class="[tagColor('New')]">
														  New
													  </span>
													<span v-else-if="email.ticketStatus !== null"
														  class="uk-label uk-margin-small-right"
														  :class="[tagColor(email.ticketStatus)]">
														  {{ email.ticketStatus }}
													  </span>
													<span class="uk-text-small uk-text-muted"
														  v-highlight="{keyword: keyword, overWriteStyle}">
														{{ email.emailName }}
													  </span>
													<b class="uk-text-small uk-text-muted"
													   v-highlight="{keyword: keyword, overWriteStyle}">
														({{ email.emailAddress }})
													</b>
												</div>
												<div class="uk-visible@m">
													<div class="sc-message-date">
														{{email.receivedDate}}
													</div>
													<div class="sc-message-actions">
														{{email.receivedDate}}
													</div>
												</div>
											</div>
										</div>
									</li>
									<li data-index="0" style="opacity: 1; transform: translateY(0%);"
										v-else-if="email.status === 'read'">
										<div class="sc-message-card">
											<div data-uk-grid=""
												 class="uk-flex uk-flex-middle sc-message-head uk-grid-collapse uk-grid">
												<div class="uk-flex-1 uk-text-truncate">
													<h2 :title="email.subject"
														class="sc-message-title uk-text-truncate">
														<a @click="viewEmail(email.id)" href="javascript:void(0)"
														   style="color: #8A8888"
														   v-highlight="{keyword: keyword, overWriteStyle}">
															{{ email.subject }}
														</a>
													</h2>
													<span
														v-if="email.ticketStatus === null && email.status === 'unread'"
														class="uk-label uk-margin-small-right"
														:class="[tagColor('New')]">
														  New
													</span>
													<span v-else-if="email.ticketStatus !== null"
														  class="uk-label uk-margin-small-right"
														  :class="[tagColor(email.ticketStatus)]">
														  {{ email.ticketStatus }}
													</span>
													<span class="uk-text-small uk-text-muted"
														  v-highlight="{keyword: keyword, overWriteStyle}">
																	{{ email.emailName }}
																</span>
													<b class="uk-text-small uk-text-muted"
													   v-highlight="{keyword: keyword, overWriteStyle}">
														({{ email.emailAddress }})
													</b>
												</div>
												<div class="uk-visible@m">
													<div class="sc-message-date">
														{{email.receivedDate}}
													</div>
													<div class="sc-message-actions">
														{{email.receivedDate}}
													</div>
												</div>

											</div>
										</div>
									</li>
								</ul>
							</div>
						</perfect-scrollbar>
						<ul hidden="hidden" class="sc-js-message-filter"></ul>
						<div class="overflow-auto uk-padding">
							<div class="m-3">
								<b-pagination
									v-model="currentPage"
									:total-rows="rows"
									:per-page="perPage"
									align="center"
									@input="pageChanged($event)"
								></b-pagination>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!---->
		<div class="sc-fab-page-wrapper uk-hidden@l">
			<a href="javascript:void(0)" class="sc-fab sc-fab-large sc-fab-danger">
				<i class="mdi mdi-plus"></i>
			</a>
		</div>
		<!---->
	</div>
</template>
<script>
    import {Subject, EMPTY, from, of} from 'rxjs'
    import {mergeMap, debounceTime, tap, catchError} from 'rxjs/operators'

    require('~/plugins/scrollable');
    export default {
        components: {
            ScOffcanvas: process.client ? () => import('~/components/Offcanvas') : null
        },
        data: () => ({
            emailList: [],
            keyword: '',
            searchEmail: '',
            overWriteStyle: {
                color: 'red',
                backgroundColor: 'yellow'
            },
            currentPage: 1,
            perPage: 10,
            totalPages: '',
            limit: 10,
            mailboxOffcanvas: true,
            tags: [
                {
                    id: 'new',
                    name: 'New',
                    color: 'md-bg-red-400'

                },
                {
                    id: 'open',
                    name: 'Open',
                    color: 'md-bg-blue-400'

                },
                {
                    id: 'in-progress',
                    name: 'In Progress',
                    color: 'md-bg-amber-400'
                },
                {
                    id: 'pending-internal',
                    name: 'Pending (Internal)',
                    color: 'md-bg-deep-purple-500'

                },
                {
                    id: 'pending-customer',
                    name: 'Pending (Customer)',
                    color: 'md-bg-deep-purple-500'

                },
                {
                    id: 'close',
                    name: 'Close',
                    color: 'md-bg-green-400'
                },
                {
                    id: 'acknowledge',
                    name: 'Acknowledge',
                    color: 'md-bg-brown-400'
                },
                {
                    id: 'solving',
                    name: 'Solving',
                    color: 'md-bg-pink-300'
                },
                {
                    id: 'cancel',
                    name: 'Reject / Cancel',
                    color: 'md-bg-grey-400'
                },

            ],
        }),
        created() {
            this.searchEmail$ = new Subject()
        },
        computed: {
            getEmailTotal() {
                return this.$store.getters.getEmailTotal
            },
            rows() {
                return this.totalPages
            }
        },
        mounted() {
            this.getListEmail(this.currentPage)
            this.initObservableSubjects()
        },
        methods: {
            getListEmail() {
                if (_.isNil(this.currentPage)) {
                    return
                }
                const list = {
                    "page": this.currentPage,
                    "limit": this.limit,
                }
                this.$emailService.getListEmailAll(list).then(resp => {
                    this.emailList = resp.data
                    this.totalPages = resp.totalAll
                })
            },
            viewEmail(id) {
                this.$emailAdapter.readedEmail(id).then(resp => {
                    return resp
                })
                this.$router.push(`/Email/DetailEmail?email=${id}`)
            },
            searchEmailById(keyword) {
                this.keyword = keyword
                this.searchEmail$.next(this.keyword)
            },
            initObservableSubjects() {
                this.searchEmail$.pipe(
                    debounceTime(300),
                    mergeMap((keyword) => {
                        return from(this.$emailService.searchEmail(keyword, this.currentPage, this.limit)).pipe(
                            catchError(e => {
                                return of(e)
                            }),
                        )
                    }),
                    tap(result => {
                        this.emailList = result.data
                        if (this.keyword === '') {
                            this.totalPages = result.totalAll
                        } else {
                            this.totalPages = result.total
                        }
                    }),
                    catchError(e => {
                        return EMPTY
                    }),
                ).subscribe(result => {
                    this.emailList = result.data
                    if (this.keyword === '') {
                        this.totalPages = result.totalAll
                    } else {
                        this.totalPages = result.total
                    }
                })
            },
            tagColor(tag) {
                let _tag = this.tags.filter(obj => {
                    return obj.name === tag;
                });
                return _tag[0].color;
            },
            tagName(name) {
                if (!name) {
                    return
                }
                return name;
            },
            pageChanged(event) {
                this.currentPage = event
                this.getListEmail(this.currentPage)
            }
        },
        watch: {
            'getEmailTotal'() {
                this.getListEmail()
            },
        }
    }
</script>
<style lang="scss">
	@import '~scss/vue/_pretty_checkboxes';
	@import "~scss/common/md_colors";
	@import "~scss/common/variables_mixins";
	@import "~scss/pages/mailbox";

	.pagination {
		list-style-type: none;
	}

	.pagination-item {
		display: inline-block;
	}

</style>

