<template>
  <div id="sc-page-wrapper">
    <div id="sc-page-content">
      <ScCard>
        <ScCardTitle>
          Colorpicker
        </ScCardTitle>
        <ScCardBody>
          <div class="uk-grid" data-uk-grid>
            <div class="uk-width-1-4@m">
              <label>Default</label>
              <div>
                <no-ssr>
                  <ScColorpicker v-model="cpColor1" size="large" :close-on-select="false"></ScColorpicker>
                </no-ssr>
              </div>
              <span class="uk-form-help-block uk-margin-remove-left">
                closeOnSelect: false
              </span>
            </div>
            <div class="uk-width-1-4@m">
              <label>Selected color</label>
              <div>
                <no-ssr>
                  <ScColorpicker v-model="cpColor2" size="large"></ScColorpicker>
                </no-ssr>
              </div>
            </div>
            <div class="uk-width-1-2@m">
              <label>Inline</label>
              <div>
                <no-ssr>
                  <ScColorpicker v-model="cpColor3" :inline="true"></ScColorpicker>
                </no-ssr>
              </div>
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
        ScColorpicker: process.client ? () => import('~/components/Colorpicker') : null,
    },
    data: () => ({
        cpColor1: '',
        cpColor2: '#039be5',
        cpColor3: ''
    })
}
</script>
