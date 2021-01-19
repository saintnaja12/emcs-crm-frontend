<template>
  <aside id="sc-sidebar-main">
    <div id="sc-sidebar-main-offcanvas-bar" class="uk-offcanvas-bar">
      <ScMenuList :menu-data="menuEntries" :is-parent="true"></ScMenuList>
    </div>
  </aside>
</template>

<script>
import ScMenuList from './MenuList'
import { scMq } from '~/assets/js/utils'
import { menuEntries } from '~/assets/js/utils/sidebar_menu'

export default {
    components: {
        ScMenuList
    },
    data: () => ({
        menuEntries
    }),
    computed: {
        vxSidebarMainExpanded () {
            return this.$store.getters.sidebarMainState
        },
        vxAppVersion () {
            return this.$store.getters.AppVersion
        }
    },
    watch: {
        'vxSidebarMainExpanded' (state) {
            if(scMq.mediumMax()) {
                if (state) {
                    UIkit.offcanvas('#sc-sidebar-main').show();
                    if(this.$store.getters.offcanvasState) {
                        this.$store.dispatch('offcanvasToggle', false);
                    }
                } else {
                    UIkit.offcanvas('#sc-sidebar-main').hide();
                }
            }
        },
        $route () {
            if(scMq.mediumMax()) {
                this.$store.dispatch('sidebarMainToggle', false);
            }
        }
    },
    mounted () {
        const self = this;
        if(scMq.mediumMax()) {
            // activate UIKit offcanvas
            UIkit.offcanvas(document.getElementById('sc-sidebar-main'), {
                overlay: true,
                container: '#nuxt-wrapper'
            });
            self.$store.dispatch('sidebarMainToggle', false);
        }
    }
}
</script>

<style>
</style>
