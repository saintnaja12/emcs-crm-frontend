<template>
  <div id="sc-page-wrapper" class="uk-flex uk-flex-column sc-filtered-items">
    <div id="sc-page-top-bar" class="sc-top-bar">
      <div class="sc-top-bar-content uk-flex uk-flex-1">
        <h1 class="sc-top-bar-title uk-text-uppercase uk-flex-1">
          Email
        </h1>
      </div>
      <div class="sc-top-bar-aside uk-visible@l"></div>
      <div class="sc-top-bar-content uk-flex-1">
        <!--<div class="sc-actions uk-margin-medium-left">
					<a href="javascript:void(0)"
						data-uk-tooltip="Reply"
						title="Reply"
						class="sc-actions-icon waves-effect waves-block"
						aria-expanded="false"
					><i class="mdi mdi-reply"></i></a>
					<a href="javascript:void(0)"
						data-uk-tooltip="Archive"
						title=""
						class="sc-actions-icon waves-effect waves-block"
						aria-expanded="false"
					><i class="mdi mdi-archive"></i></a>
					<a href="javascript:void(0)"
						data-uk-tooltip="Delete"
						title="Delete"
						class="sc-actions-icon sc-js-block-wave waves-effect waves-block"
						aria-expanded="false"
					><i class="mdi mdi-delete-outline"></i></a>
				</div>-->
      </div>
    </div> <div class="uk-flex uk-height-1-1">
      <div id="sc-page-aside" class="uk-visible@m">
        <div class="sc-page-aside-body">
          <ul data-uk-accordion="multiple: true" class="uk-accordion" style="">
            <li class="uk-open">
              <a href="javascript:void(0)" class="uk-accordion-title">
                Tags
              </a>
              <div class="uk-accordion-content" aria-hidden="false">
                <ul class="uk-list">
                  <li data-uk-filter-control="" class="sc-js-filter-clear uk-active">
                    <a href="javascript:void(0)"><span class="sc-color-label md-bg-white sc-color-label-clear"></span>All Folders
                    </a>
                  </li>
                  <li data-uk-filter-control="filter: .sc-js-tag-work">
                    <a href="javascript:void(0)"><span class="sc-color-label md-bg-red-400"></span>
                      New
                    </a>
                  </li><li data-uk-filter-control="filter: .sc-js-tag-todo">
                    <a href="javascript:void(0)"><span class="sc-color-label md-bg-amber-400"></span>
                      processing
                    </a>
                  </li>
                  <li data-uk-filter-control="filter: .sc-js-tag-important">
                    <a href="javascript:void(0)"><span class="sc-color-label md-bg-green-400"></span>
                      close
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div id="sc-page-content" class="sc-padding-remove uk-height-1-1">
        <ul v-for="email in email" :key="email.id" class="sc-list-messages sc-js-message-filter">
          <li data-index="0" class="" style="opacity: 1; transform: translateY(0%);">
            <div class="sc-message-card">
              <div data-uk-grid="" class="uk-flex uk-flex-middle sc-message-head uk-grid-collapse uk-grid">
                <div class="uk-flex uk-flex-middle uk-margin-mini-right sc-js-el-hide uk-first-column">
                  <!--<div class="p-icon pretty" p-checkbox="">
										<input type="checkbox" value="false">
										<div class="state">
											<i class="icon mdi mdi-check"></i> <label></label>
										</div>
									</div>-->
                </div>
                <div class="uk-flex-1 uk-text-truncate">
                  <h2 title="Dohowo uzawak dop bov ensed tesocje muonese fodil fi igbidkiv hogu di dirzijfoh ci efuwu tu." class="sc-message-title uk-text-truncate">
                    <nuxt-link :to="{name: 'views-DetailEmail'}">
                      {{ email.title }}
                    </nuxt-link>
                  </h2>
                  <span v-if="email.status === 'New'" class="uk-label uk-margin-small-right md-bg-red-400">
                    {{ email.status }}
                  </span>
                  <span v-if="email.status === 'processing'" class="uk-label uk-margin-small-right md-bg-amber-400">
                    {{ email.status }}
                  </span>
                  <span v-if="email.status === 'close'" class="uk-label uk-margin-small-right md-bg-green-400">
                    {{ email.status }}
                  </span>
                  <span class="uk-text-small uk-text-muted">
                    {{ email.emailAddress }}
                  </span>
                </div>
                <div class="uk-visible@m">
                  <div class="sc-message-date">
                    Sat, Feb 16th 16:17
                  </div>
                  <div class="sc-message-actions">
                    <a href="javascript:void(0)"
                       data-uk-tooltip=""
                       title=""
                       class="mdi mdi-delete sc-js-message-remove"
                       aria-expanded="false"
                    ></a>
                    <a href="javascript:void(0)"
                       data-uk-tooltip=""
                       title=""
                       class="mdi mdi-archive"
                       aria-expanded="false"
                    ></a>
                    <a href="javascript:void(0)"
                       data-uk-tooltip=""
                       title=""
                       class="mdi mdi-email-open"
                       aria-expanded="false"
                    ></a>
                  </div>
                </div>
                <div class="sc-js-el-show">
                  <a href="javascript:void(0)" class="sc-message-close sc-js-message-close"><i class="mdi mdi-close"></i></a>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <ul hidden="hidden" class="sc-js-message-filter"></ul>
      </div>
    </div> <!---->
    <div class="sc-fab-page-wrapper uk-hidden@l">
      <a href="javascript:void(0)" class="sc-fab sc-fab-large sc-fab-danger"><i class="mdi mdi-plus"></i></a>
    </div>
  </div>
</template>
<script>
import ScCard from "../../components/card/components/Card";
export default {
    components: {},
    data: () => ({
        email: [
            {
                id:'1',
                title: 'แจ้งปัญหาระบบไวไฟขัดข้อง ที่โรงเรียนเชียงราย',
                emailAddress: 'usertest@gmail.com',
                status:'New'
            },
            {
                id:'2',
                title: 'แจ้งปัญหาระบบไวไฟขัดข้อง ที่โรงเรียนเชียงราย',
                emailAddress: 'usertest04585412@gmail.com',
                status:'New'
            },
            {
                id:'3',
                title: 'แจ้งปัญหาระบบไวไฟขัดข้อง ที่โรงเรียนเชียงราย',
                emailAddress: 'usertest0135@gmail.com',
                status:'New'
            },
            {
                id:'4',
                title: 'แจ้งปัญหาระบบไวไฟขัดข้อง ที่โรงเรียนเชียงราย',
                emailAddress: 'usertest@gmail.com',
                status:'New'
            },
            {
                id:'5',
                title: 'แจ้งปัญหาระบบไวไฟขัดข้อง ที่โรงเรียนเชียงราย',
                emailAddress: 'usertest@gmail.com',
                status:'New'
            },
            {
                id:'6',
                title: 'แจ้งปัญหาการใช้งานอินเตอร์เน็ตในพื้นที่ เชียงใหม่',
                emailAddress: 'usertest@gmail.com',
                status:'processing'
            },
            {
                id:'7',
                title: 'แจ้งปัญหาระบบไวไฟขัดข้อง ที่โรงเรียนเชียงราย',
                emailAddress: 'usertest0110@gmail.com',
                status:'close'
            },
            {
                id:'7',
                title: 'แจ้งปัญหาระบบไวไฟขัดข้อง ที่โรงเรียนเชียงราย',
                emailAddress: 'usertest0110@gmail.com',
                status:'close'
            },
            {
                id:'7',
                title: 'แจ้งปัญหาระบบไวไฟขัดข้อง ที่โรงเรียนเชียงราย',
                emailAddress: 'usertest0110@gmail.com',
                status:'close'
            },
            {
                id:'7',
                title: 'แจ้งปัญหาระบบไวไฟขัดข้อง ที่โรงเรียนเชียงราย',
                emailAddress: 'usertest0110@gmail.com',
                status:'close'
            },
            {
                id:'7',
                title: 'แจ้งปัญหาระบบไวไฟขัดข้อง ที่โรงเรียนเชียงราย',
                emailAddress: 'usertest0110@gmail.com',
                status:'close'
            }
        ]
    }),
    methods: {
        showMessage (e, message) {
            var excludedEl = closest(e.target, function (el) {
                return el.className ? el.className.includes('pretty') || el.className.includes('sc-message-actions') : null;
            });
            if (!excludedEl) {
                this.$router.push({ name: 'views-DetailEmail', params: { id: email.id } });
            }
        },
        closeMessage (e) {
            e.preventDefault();
            this.$router.push({ name: 'pages-mailbox' });
        },
        composeMessage () {
            this.$router.push({ name: 'pages-mailbox-compose' });
        },
        toggleAllMessages (state) {
            this.$store.commit('mailbox/toggleMessages', state);
            this.messages.forEach((k) => {
                this.messageSelected[k.id] = state
            });
        },
        toggleMessage (value, message) {
            let params = {
                id: message.id,
                value: value
            };
            this.$store.commit('mailbox/toggleMessage', params);
            let checkboxes = this.messages.map((k) => {
                return k.selected
            });
            let someChecked = checkboxes.some(cb => cb === true);
            let allChecked = checkboxes.every(cb => cb === true);
            if (allChecked) {
                this.mailbox.checkAll = true;
                this.mailbox.checkAllInd = false
            } else if (someChecked) {
                this.mailbox.checkAllInd = true
            } else {
                this.mailbox.checkAll = false;
                this.mailbox.checkAllInd = false
            }
        },
        messageTagColor (tag) {
            let _tag = this.tags.filter(obj => {
                return obj.name === tag;
            });
            return _tag[0].color;
        },
        tagName (name) {
            if(!name) {
                return
            }
            // lowercase + remove whitespaces
            return 'sc-js-tag-' + name.toLowerCase().replace(/ /g, '');
        }
    }
}
</script>
<style lang="scss">
	@import '~scss/vue/_pretty_checkboxes';
	@import "~scss/common/md_colors";
	@import "~scss/common/variables_mixins";
	@import "~scss/pages/mailbox";
</style>

