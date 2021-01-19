import { version } from '~~/package.json';

const state = {
    vxAppVersion: version,
    vxSidebarMainExpanded: true,
    vxSidebarMainAccordionMode: false,
    vxSidebarMainScrollToActive: false,
    vxCardFixed: false,
    vxHeaderExpanded: false,
    vxPageFixed: false,
    vxAppTheme: 'theme-default',
    vxOffcanvasPresent: false,
    vxOffcanvasExpanded: false,
    vxCodeMirrorFullscreen: false,
    vxProgressOverlay: false,
    vxPageScrollbars: true,
    vxFooterActive: false
};
const actions = {

    // ////////////////////////////////////////////
    // SIDEBAR & UI UX
    // ////////////////////////////////////////////

    sidebarMainToggle ({ commit }, expanded) {
        commit('SIDEBAR_MAINTOGGLE', expanded);
    },
    offcanvasToggle ({ commit }, active) {
        commit('OFFCANVAS_TOGGLE', active);
    },
    sidebarMainAccordionModeToggle ({ commit }) {
        commit('SIDEBAR_MAIN_ACCORD');
    },
    sidebarMainScrollToActiveToggle ({ commit }) {
        commit('SIDEBAR_MAIN_SCROLL_ACTIVE');
    },
    setAppTheme ({ commit }, theme) {
        commit('SET_APPTHEME', theme);
    },
    setOffcanvasPresent ({ commit }, present) {
        commit('SET_OFFCANVAS_PROSENT', present);
    },
    cmFullscreenToggle ({ commit }, fullscreen) {
        commit('CM_FULL_SCREENTOGGLE', fullscreen);
    },
    toggleProgressOverlay ({ commit }, active) {
        commit('TOGGLE_PROGRESS_OVERLAY', active);
    },
    togglePageScrollbars ({ commit }, active) {
        commit('TOGGLE_PAGE_SCROLLBARS', active);
    },
    setFooterActive ({ commit }, active) {
        commit('SET_FOOTER_ACTIVE', active);
    },
    setCardFixed ({ commit }, fixed) {
        commit('SET_CARDFIXED', fixed);
    },
    setHeaderExpanded ({ commit }, expanded) {
        commit('SET_HEADER_EXPANDED', expanded);
    },
    setPageFixed ({ commit }, fixed) {
        commit('SET_PAGEFIXED', fixed);
    },
}
const mutations = {
    SIDEBAR_MAINTOGGLE (state, expanded) {
        state.vxSidebarMainExpanded = expanded
    },
    SIDEBAR_MAIN_ACCORD (state) {
        state.vxSidebarMainAccordionMode = !state.vxSidebarMainAccordionMode
    },
    SIDEBAR_MAIN_SCROLL_ACTIVE (state) {
        state.vxSidebarMainScrollToActive = !state.vxSidebarMainScrollToActive
    },
    SET_CARDFIXED (state, fixed) {
        state.vxCardFixed = fixed;
    },
    SET_HEADER_EXPANDED (state, expanded) {
        state.vxHeaderExpanded = expanded;
    },
    SET_PAGEFIXED (state, fixed) {
        state.vxPageFixed = fixed
    },
    SET_APPTHEME (state, theme) {
        state.vxAppTheme = theme
    },
    SET_OFFCANVAS_PROSENT (state, present) {
        state.vxOffcanvasPresent = present
    },
    OFFCANVAS_TOGGLE (state, active) {
        state.vxOffcanvasExpanded = active
    },
    CM_FULL_SCREENTOGGLE (state, fullscreen) {
        state.vxCodeMirrorFullscreen = fullscreen
    },
    TOGGLE_PROGRESS_OVERLAY (state, active) {
        state.vxProgressOverlay = active
    },
    TOGGLE_PAGE_SCROLLBARS (state, active) {
        if (active) {
            this.pageScrollbarEnable();
        } else {
            this.pageScrollbarDisable();
        }
    },
    SET_FOOTER_ACTIVE (state, active) {
        state.vxFooterActive = active
    }
};

const getters = {
    pageFixedState: state => state.vxPageFixed,
    cardFixedState: state => state.vxCardFixed,
    headerExpandedState: state => state.vxHeaderExpanded,
    sidebarMainState: state => state.vxSidebarMainExpanded,
    offcanvasState: state => state.vxOffcanvasExpanded,
    offcanvasPresent: state => state.vxOffcanvasPresent,
    scrollToActive: state => state.vxSidebarMainScrollToActive,
    accordionMode: state => state.vxSidebarMainAccordionMode,
    AppVersion: state => state.vxAppVersion,
    AppTheme: state => state.vxAppTheme,
    fullscreenMirror: state => state.vxCodeMirrorFullscreen,
    footerActive: state => state.vxFooterActive,
};

export default  {
    state,
    actions,
    mutations,
    getters
}
