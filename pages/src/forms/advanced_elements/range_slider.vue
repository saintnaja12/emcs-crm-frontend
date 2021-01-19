<template>
  <div id="sc-page-wrapper">
    <div id="sc-page-content">
      <ScCard>
        <ScCardBody>
          <div class="uk-child-width-1-3@l uk-child-width-1-2@m uk-grid uk-grid-divider" data-uk-grid>
            <div>
              <no-ssr>
                <IonRangeSlider v-model="rangeSlider.a"
                                :settings="{min: 100, max: 1000}"
                ></IonRangeSlider>
              </no-ssr>
              <span class="sc-color-secondary uk-text-small">Data: {{ rangeSlider.a }}</span>
            </div>
            <div>
              <no-ssr>
                <IonRangeSlider v-model="rangeSlider.b"
                                :settings="{type: 'double', grid: true, min: 0, max: 1000, prefix: '$'}"
                ></IonRangeSlider>
              </no-ssr>
              <span class="sc-color-secondary uk-text-small">Data: {{ rangeSlider.b }}</span>
            </div>
            <div>
              <no-ssr>
                <IonRangeSlider v-model="rangeSlider.c"
                                :settings="{grid: true, from: 5, values: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']}"
                ></IonRangeSlider>
              </no-ssr>
              <span class="sc-color-secondary uk-text-small">Data: {{ rangeSlider.c }}</span>
            </div>
          </div>
          <hr>
          <div class="uk-child-width-1-3@l uk-child-width-1-2@m uk-grid uk-grid-divider" data-uk-grid>
            <div>
              <no-ssr>
                <IonRangeSlider v-model="rangeSlider.d"
                                :settings="{grid: true, min: 18, max: 70, from: 30, prefix: 'Age ', max_postfix: '+'}"
                ></IonRangeSlider>
              </no-ssr>
              <span class="sc-color-secondary uk-text-small">Data: {{ rangeSlider.d }}</span>
            </div>
            <div>
              <no-ssr>
                <IonRangeSlider v-model="rangeSlider.e"
                                :settings="{type: 'double', min: 1000000, max: 2000000, grid: true, force_edges: true}"
                ></IonRangeSlider>
              </no-ssr>
              <span class="sc-color-secondary uk-text-small">Data: {{ rangeSlider.e }}</span>
            </div>
            <div>
              <no-ssr>
                <IonRangeSlider v-model="rangeSlider.f"
                                :settings="{type: 'single', min: 0, max: 10, step: 2.34, grid: true, grid_snap: true}"
                ></IonRangeSlider>
              </no-ssr>
              <span class="sc-color-secondary uk-text-small">Data: {{ rangeSlider.f }}</span>
            </div>
          </div>
        </ScCardBody>
      </ScCard>
    </div>
  </div>
</template>

<script>
export default {
    components: {
        IonRangeSlider: process.client ? () => import('~/components/RangeSlider') : null
    },
    data: () => ({
        rangeSlider: {
            a: 550,
            b: '200;800',
            c: 5,
            d: 30,
            e: '1000000;2000000',
            f: 0
        }
    })
}
</script>
