import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyBXLBc1ipr5oirUDWBOzqE3n1TZRUwB4Kc',
        libraries: 'places'
    }
});
