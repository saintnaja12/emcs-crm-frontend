<template>
  <header id="sc-header" ref="header">
    <nav class="uk-navbar uk-navbar-container" data-uk-navbar="mode: click; duration: 360">
      <div class="uk-navbar-left nav-overlay-small uk-margin-right uk-navbar-aside">
        <a id="sc-sidebar-main-toggle" href="javascript:void(0)" @click.stop="toggleMainSidebar">
          <i v-if="sidebarMainExpanded" class="mdi mdi-backburger"></i>
          <i v-if="!sidebarMainExpanded" class="mdi mdi-menu"></i>
        </a>
        <div id="headerName" class="sc-brand uk-visible@m">
          <nuxt-link to="/">
            EMCS CRM
          </nuxt-link>
        </div>
      </div>
      <div class="nav-overlay nav-overlay-small uk-navbar-right uk-flex-1" hidden>
        <a class="uk-navbar-toggle uk-visible@l" data-uk-toggle="target: .nav-overlay; animation: uk-animation-slide-top" href="javascript:void(0)">
          <i class="mdi mdi-close sc-icon-24"></i>
        </a>
        <a class="uk-navbar-toggle uk-hidden@l uk-padding-remove-left" data-uk-toggle="target: .nav-overlay-small; animation: uk-animation-slide-top" href="javascript:void(0)">
          <i class="mdi mdi-close sc-icon-24"></i>
        </a>
        <div class="uk-navbar-item uk-width-expand uk-padding-remove-right">
          <form class="uk-search uk-search-navbar uk-width-1-1 uk-flex">
            <input class="uk-search-input" type="search" placeholder="Search..." autofocus>
            <button class="sc-button sc-button-small sc-button-icon sc-button-flat uk-margin-small-left" type="button">
              <i class="mdi mdi-magnify sc-icon-24 md-color-white"></i>
            </button>
          </form>
        </div>
      </div>

      <div class="nav-overlay nav-overlay-small uk-navbar-right">
        <ul class="uk-navbar-nav">
          <li>
            <a href="javascript:void(0)">
              <span class="mdi mdi-email"></span>
            </a>
            <div class="uk-navbar-dropdown sc-padding-remove">
              <div class="uk-panel uk-panel-scrollable uk-height-medium">
                <ul class="uk-list uk-list-divider">
                  <li v-for="message in user.messages" :key="message.id" class="sc-list-group">
                    <div class="sc-list-addon">
                      <img v-if="message.avatar.image" :src="message.avatar.image" class="sc-avatar" alt="">
                      <span v-if="!message.avatar.image" :title="message.from" :class="message.avatar.color" class="sc-avatar-initials">
                        {{ message.from | initials }}
                      </span>
                    </div>
                    <a href="javascript:void(0)" class="sc-list-body">
                      <span class="uk-text-small uk-text-muted uk-width-expand">
                        {{ message.date }}
                      </span>
                      <span class="uk-display-block uk-text-truncate">
                        {{ message.content }}
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
              <nuxt-link to="/views/Email" class="uk-flex uk-text-small sc-padding-small-ends sc-padding">
                Show all in mailbox
              </nuxt-link>
            </div>
          </li>
			<reminderSLA/>
          <li>
			  <span style="color: #ffffff">{{userStore.name}}</span>
			  <a href="javascript:void(0)">
              <img v-rjs="require('~/assets/img/user.png')" :src="user.avatar" alt="" width="35px">
            </a>
            <div class="uk-navbar-dropdown uk-dropdown-small">
              <ul class="uk-nav uk-nav-navbar">
                <li>
					<a data-uk-toggle="target: #modal-change-password">
						Change Password
					</a>
                </li>
                <li>
                  <a @click="logout()">
                    Log Out
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <a v-if="vxOffcanvasPresent" href="javascript:void(0)" class="md-color-white uk-margin-left uk-hidden@l" @click="toggleOffcanvas">
          <i v-show="!vxOffcanvasExpanded" class="mdi mdi-menu"></i><i v-show="vxOffcanvasExpanded" class="mdi mdi-arrow-right"></i>
        </a>
      </div>
      <!--knowledge popup-->
		<!--
      <div class="sc-fab-page-wrapper">
        <a href="javascript:void(0)" class="sc-fab md-bg-amber-600 sc-fab-dark sc-fab-mini" @click="openKnowledge()">
          <i class="mdi mdi-lightbulb-on"></i>
        </a>
      </div>
      <viewknowledge />
      -->
		<div id="modal-change-password" data-uk-modal>
			<div class="uk-modal-dialog uk-modal-body">
				<h2 class="uk-modal-title">
					Change Password
				</h2>
				<hr>
				<div class="uk-grid mt-2" data-uk-grid>

					<div class="uk-width-1-2">
						<div
							class="uk-margin">
							<label>Old password</label>
							<ScInput v-model="form.oldPassword" type="password"></ScInput>
							<label v-if="passwordNotMatch === true" style="color: #dd2c00">Old password doesnt
								match!</label>
						</div>
					</div>
					<div class="uk-width-1-2">
					</div>
					<div class="uk-width-1-2">
						<div
							class="uk-margin">
							<label>New password</label>
							<ScInput v-model="form.newPassword" type="password"></ScInput>
						</div>
					</div>
					<div class="uk-width-1-2">
						<div
							class="uk-margin">
							<label>Confirm new password</label>
							<ScInput v-model="form.confirmNewPassword" type="password"></ScInput>
							<label v-if="confirmPasswordNotMatch === true" style="color: #dd2c00">Confirm password doesnt
								match!</label>
						</div>
					</div>
				</div>
				<div align="right" class="mt-5">
					<a class="sc-button sc-button-primary sc-button-social "
					   @click="changePassword(form)">
						<span>update</span>
						<i class="mdi mdi-content-save-outline"></i>
					</a>
					<button class="sc-button sc-button-danger uk-modal-close">
						<span>Cancel</span><i class="mdi mdi-close-circle-outline"></i>
					</button>
				</div>
			</div>
		</div>
    </nav>
  </header>
</template>

<script>
import { scMq } from '~/assets/js/utils'
import ScInput from '~/components/Input'
import Swal from 'sweetalert2';
import viewknowledge from "../pages/Knowledge/viewknowledge";
import reminderSLA from "../pages/Ticket/reminderSLA";

export default {
    components: {
        viewknowledge,
		reminderSLA,
		ScInput
    },
    data: () => ({
		form: {
			oldPassword: '',
			newPassword: '',
			confirmNewPassword: '',
		},
        user: {
            avatar: require('~/assets/img/user.png'),
            messages: [
                {
                    "id": 1,
                    "from": "Daisy Hopkins",
                    "avatar": {
                        "color": "md-bg-purple-500 md-color-white"
                    },
                    "date": "21-10-2019",
                    "content": "แจ้งปัญหาระบบไวไฟขัดข้อง ที่โรงเรียนเชียงราย"
                },
                {
                    "id": 2,
                    "from": "Daisy Hopkins",
                    "avatar": {
                        "color": "md-bg-purple-500 md-color-white"
                    },
                    "date": "21-10-2019",
                    "content": "แจ้งปัญหาระบบไวไฟขัดข้อง ที่โรงเรียนเชียงราย"
                },
                {
                    "id": 3,
                    "from": "Daisy Hopkins",
                    "avatar": {
                        "color": "md-bg-purple-500 md-color-white"
                    },
                    "date": "21-10-2019",
                    "content": "แจ้งปัญหาระบบไวไฟขัดข้อง ที่โรงเรียนเชียงราย"
                },
                {
                    "id": 4,
                    "from": "Daisy Hopkins",
                    "avatar": {
                        "color": "md-bg-purple-500 md-color-white"
                    },
                    "date": "21-10-2019",
                    "content": "แจ้งปัญหาระบบไวไฟขัดข้อง ที่โรงเรียนเชียงราย"
                },
                {
                    "id": 5,
                    "from": "Daisy Hopkins",
                    "avatar": {
                        "color": "md-bg-purple-500 md-color-white"
                    },
                    "date": "21-10-2019",
                    "content": "แจ้งปัญหาระบบไวไฟขัดข้อง ที่โรงเรียนเชียงราย"
                },
            ],
            alerts: [
                {
                    id: 1,
                    text: 'Ticket \t\n' +
						'3045677 Over SLA',
                    icon: 'mdi-alert-outline',
                    color: 'md-color-red-600'
                },
            ]
        },
        sidebarMainExpanded: true,
        offcanvasExpanded: false,
        offcanvasPresent: false,
        logo: require('~/assets/img/LOGOBlisstel.png'),
        alertsEmpty: null,
		passwordNotMatch: false,
		confirmPasswordNotMatch: false,
    }),
    computed: {
        vxSidebarMainExpanded () {
            return this.$store.getters.sidebarMainState;
        },
        vxOffcanvasExpanded () {
            return this.$store.getters.offcanvasState;
        },
        vxOffcanvasPresent () {
            return this.$store.getters.offcanvasPresent;
        },
		userStore() {
			return this.$store.getters.getUserLogin
		},
    },
    watch: {
        'vxSidebarMainExpanded' (state) {
            this.sidebarMainExpanded = state;
        },
        'vxOffcanvasExpanded' (state) {
            this.offcanvasExpanded = state;
        },
        'vxOffcanvasPresent' (state) {
            this.offcanvasPresent = state;
        }
    },
    mounted () {
        const self = this;
        self.$nextTick(() => {
            if(scMq.mediumMin()) {
                self.sidebarMainExpanded = this.vxSidebarMainExpanded;
            } else {
                self.sidebarMainExpanded = false;
                // sidebar events
                // UIkit.util.on(document, 'hide', '#sc-sidebar-main', function () {
                // 	self.$store.commit('sidebarMainToggle', false);
                // });
                // UIkit.util.on(document, 'hide', '#sc-offcanvas', function () {
                // 	self.$store.commit('offcanvasToggle', false);
                // });
            }
        });
        // sticky header
        var options = scMq.mediumMax() ? { showOnUp: true, animation: "uk-animation-slide-top" } : {};
        UIkit.sticky(this.$refs.header, options);
    },
    methods: {
        toggleMainSidebar () {
            let state = !this.sidebarMainExpanded;
            this.$store.dispatch('sidebarMainToggle', state);
        },
        toggleOffcanvas () {
            let state = !this.offcanvasExpanded;
            this.$store.dispatch('offcanvasToggle', state);
        },
		logout() {
			localStorage.clear();
			this.$router.push(`/login`);
		},
		changePassword(data) {
			if(this.form.confirmNewPassword === this.form.newPassword){
				this.$userAdapter.changePassword(data).then(resp => {
					UIkit.modal('#modal-change-password').hide();
					if (resp.data === true) {
						Swal.fire('Successful!', 'บันทึกข้อมูลเรียบร้อยแล้ว', 'success')
						this.passwordNotMatch = false
						this.$router.push(`/login`);

					} else {
						this.passwordNotMatch = true
					}
				}).catch((err) => {
					Swal.fire('Error!', 'บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งค่ะ !!! <br/>' + err.response.data.message, 'error')
					this.passwordNotMatch = false
				})
			}
			else {
				this.confirmPasswordNotMatch = true
			}
		},
		openKnowledge() {
        	this.$bvModal.show('modal-knowledge')
		}
    }
}
</script>
<style>
	#headerName a{
		color: white;
		text-transform: none;
	}
</style>
