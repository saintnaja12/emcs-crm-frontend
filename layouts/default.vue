<template>
	<div>
		<Header ref="mainHeader"/>
		<Sidebar/>
		<nuxt/>
		<Footer v-if="vxFooterActive"></Footer>
		<StyleSwitcher></StyleSwitcher>
		<ScProgressOverlayRoot></ScProgressOverlayRoot>
<!--		<Session></Session>-->
	</div>
</template>

<script>
    import {mapState} from 'vuex'
    import {scMq} from '~/assets/js/utils'
    import Swal from 'sweetalert2';
    import Header from '~/components/Header.vue';
    import Sidebar from '~/components/Sidebar.vue';
    import Footer from '~/components/Footer.vue';
  //  import Session from '~/components/Session.vue';
    import {ScProgressOverlayRoot} from '~/components/progress'

    // main styles
    require('assets/scss/main.scss');

    export default {
        components: {
            Header,
            Sidebar,
          //  Session,
            StyleSwitcher: () => import('~/components/StyleSwitcher'),
            ScProgressOverlayRoot,
            Footer
        },
        data: () => ({
            HTMLClasses: {
                headerExpandedClass: '',
                sidebarMainExpanded: '',
                activeTheme: '',
                pageFixedClass: '',
                cardFixedClass: '',
                cmFullscreenClass: ''
            },
            footerActive: false
        }),
        computed: {
            vxAppTheme() {
                return this.$store.getters.AppTheme
            },
            vxCardFixed() {
                return this.$store.getters.cardFixedState
            },
            vxPageFixed() {
                return this.$store.getters.pageFixedState
            },
            vxHeaderExpanded() {
                return this.$store.getters.headerExpandedState
            },
            vxSidebarMainExpanded() {
                return this.$store.getters.sidebarMainState
            },
            vxCodeMirrorFullscreen() {
                return this.$store.getters.fullscreenMirror
            },
            vxFooterActive() {
                return this.$store.getters.footerActive
            }
        },

        watch: {
            'vxAppTheme'(theme) {
                this.HTMLClasses.activeTheme = (theme !== 'theme-default') ? 'sc-' + theme : '';
                this.mergeHTMLClasses()
            },
            'vxCardFixed'(value) {
                this.$nextTick(() => {
                    // update header
                    setTimeout(() => {
                        UIkit.update(this.$refs.mainHeader.$el);
                    }, 150);
                    this.HTMLClasses.cardFixedClass = value ? 'sc-card-fixed' : '';
                    this.mergeHTMLClasses()
                })
            },
            'vxPageFixed'(value) {
                // update header
                setTimeout(() => {
                    UIkit.update(this.$refs.mainHeader.$el);
                }, 150);
                this.HTMLClasses.pageFixedClass = value ? 'sc-page-fixed' : '';
                this.mergeHTMLClasses()
            },
            'vxHeaderExpanded'(value) {
                this.HTMLClasses.headerExpandedClass = value ? 'sc-header-expanded' : '';
                this.mergeHTMLClasses()
            },
            'vxSidebarMainExpanded'(value) {
                this.HTMLClasses.sidebarMainExpanded = scMq.mediumMin()
                    ?
                    value ? '' : 'sc-sidebar-main-slide'
                    :
                    value ? 'sc-sidebar-main-visible' : '';
                this.mergeHTMLClasses()
            },
            'vxCodeMirrorFullscreen'(value) {
                this.HTMLClasses.cmFullscreenClass = value ? 'CodeMirror-fullscreen-active' : '';
                this.mergeHTMLClasses()
            },
            'vxFooterActive'(value) {
                this.footerActive = value;
                this.HTMLClasses.cmFullscreenClass = value ? 'sc-footer-active' : '';
                this.mergeHTMLClasses()
            }
        },
        mounted() {
            this.$nextTick(() => {
                if (scMq.mediumMin()) {
                    this.HTMLClasses.sidebarMainExpanded = this.$store.getters.sidebarMainState ? '' : 'sc-sidebar-main-slide';
                    this.mergeHTMLClasses();
                }
            });

            // let timer = null
			//
            // const toFunction = () => {
            //     let timerInterval
            //     clearTimeout(timer)
            //     Swal.fire({
            //         type: 'warning',
            //         title: 'Warning!',
            //         html: 'You have been inactivity. Please response within<br>  <b></b> seconds <br> to continue.',
            //         timer: 1000 * 60 * 3,
            //         showConfirmButton: true,
            //         allowOutsideClick: false,
            //         onBeforeOpen: () => {
            //             timerInterval = setInterval(() => {
            //                 const content = Swal.getContent()
            //                 if (content) {
            //                     const b = content.querySelector('b')
            //                     if (b) {
            //                         b.textContent = Math.floor(Swal.getTimerLeft() / 1000)
            //                     }
            //                 }
            //             }, 250)
            //         },
            //     }).then((result) => {
            //         if (result.value) {
            //             clearTimeout(timer)
            //             this.$userAdapter.CheckSession().then(() => {
            //                 timer = setTimeout(toFunction, 1000 * 60 * 45)
            //             })
            //         } else {
            //             clearInterval(timerInterval)
            //             Swal.fire({
            //                 type: 'warning',
            //                 title: 'Warning!',
            //                 text: 'You have been force logout due to inactivity.',
            //                 showConfirmButton: true,
            //                 allowOutsideClick: false,
            //             }).then(() => {
            //                 localStorage.clear()
            //                 this.$router.push('/login')
            //             })
            //         }
            //     })
            // }
            // document.addEventListener('mouseup', e => {
            //     clearTimeout(timer)
            //     timer = setTimeout(toFunction, 1000 * 60 * 45)
            // })
            // timer = setTimeout(toFunction, 1000 * 60 * 45)
            // this.checkSessionBeforeOpenPage()
            // uncomment following lines to activate user theme
            // hex colors
            // this.htmlClasses.activeTheme = 'sc-theme-user';
            // material design colors
            // this.htmlClasses.activeTheme = 'sc-theme-user-md';
            // this.getHTMLClasses();
        },
        methods: {
            mergeHTMLClasses() {
                const HTML = document.getElementsByTagName("html")[0] || document.querySelector("html");
                HTML.className = Object.keys(this.HTMLClasses).map(key => {
                    return this.HTMLClasses[key]
                }).join(' ').trim();
            },
            checkSessionBeforeOpenPage() {
                this.$userAdapter.checkResp().then(resp => {
                    if (!resp.success) {
                        this.$router.push('/login')

                    }
                })
            }
        },
        beforeDestroy() {
            this.$socketAdapter.disconnect()
            console.log('disconnected')
        }
    }
</script>

<style lang="scss">
	.sc-page-fixed,
	.sc-card-fixed {
		&,
		body,
		#__nuxt,
		#__layout {
			height: 100%;
		}
	}

	@import '~scss/themes/base';
	@import "~scss/themes/theme_a";
	@import "~scss/themes/theme_b";
	@import "~scss/themes/theme_c";
	@import "~scss/themes/theme_d";
	@import "~scss/themes/theme_e";
	@import "~scss/themes/theme_f";
	@import "~scss/themes/theme_g";
	@import "~scss/themes/theme_h";
	@import "~scss/themes/theme_user";
	@import "~scss/themes/theme_user_md";
</style>
