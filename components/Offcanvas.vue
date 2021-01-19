<template>
  <div v-if="vxOffcanvasPresent" id="sc-offcanvas" data-uk-offcanvas="flip: true; container: '#nuxt-wrapper'">
    <div class="uk-offcanvas-bar" :class="extraClass">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { scMq } from '~/assets/js/utils'

export default {
    name: 'ScOffcanvas',
    props: {
        extraClass: {
            type: String,
            default: ''
        }
    },
    computed: {
        ...mapState([
            'vxOffcanvasPresent',
            'vxOffcanvasExpanded'
        ]),
        vxOffcanvasExpanded () {
            return this.$store.getters.offcanvasState;
        },
    },
    watch: {
        'vxOffcanvasExpanded' (state) {
            if(scMq.mediumMax()) {
                if (state) {
                    UIkit.offcanvas('#sc-offcanvas').show();
                    if(this.$store.getters.sidebarMainState) {
                        this.$store.dispatch('sidebarMainToggle', false);
                    }
                } else {
                    UIkit.offcanvas('#sc-offcanvas').hide();
                }
            }
        },
        $route () {
            if(this.$store.getters.offcanvasState) {
                this.$store.dispatch('offcanvasToggle', false);
            }
        }
    },
    mounted () {
        const self = this;
        if(scMq.mediumMax()) {
            self.$nextTick(() => {
                self.$store.dispatch('setOffcanvasPresent', true);
            });
        }
    },
    beforeDestroy () {
        this.$store.dispatch('offcanvasToggle', false);
        this.$store.dispatch('setOffcanvasPresent', false);
    },
    methods: {
        hide () {
            this.$store.dispatch('offcanvasToggle', false);
        }
    }
}
</script>
