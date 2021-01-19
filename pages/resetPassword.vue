<template>
  <div class="uk-flex uk-flex-center uk-flex-middle sc-login-page-wrapper">
    <div class="uk-width-2-3@s uk-width-1-2@m uk-width-1-3@l uk-width-1-4@xl uk-margin-auto-vertical">
      <ScCard>
        <ScCardBody>
          <div class="sc-login-page-logo">
            <img v-rjs="require('~/assets/img/logo_alt@2x.png')" :src="appLogo" alt="">
          </div>
          <div id="sc-login-form" class="sc-toggle-login-register sc-toggle-login-password">
            <div class="sc-login-page-inner">
              <div class="uk-margin-medium">
                <ScInput v-model="resetPasswordData.passwordNew" type="password">
                  <label>
                    รหัสผ่านใหม่
                  </label>
                </ScInput>
              </div>
              <div class="uk-margin-medium">
                <ScInput v-model="resetPasswordData.passwordCon" type="password">
                  <label>
                    ยืนยันรหัสผ่าน
                  </label>
                </ScInput>
              </div>
              <div class="uk-margin-large-top">
                <nuxt-link to="/dashboard/v1"
                           class="sc-button sc-button-large sc-button-block sc-button-danger"
                >
                  รีเซ็ตรหัสผ่าน
                </nuxt-link>
                <div class="uk-margin-large-top uk-flex uk-flex-middle uk-flex-center">
                  <nuxt-link to="./login_page" class="sc-text-semibold">
                    ยกเลิก
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </ScCardBody>
      </ScCard>
    </div>
  </div>
</template>

<script>
import ScInput from '~/components/Input'

export default {
    head () {
        return {
            'title': 'Reset Password '
        }
    },
    layout: 'login_page',
    components: {
        ScInput,
    },
    data: () => ({
        resetPassword: 'resetpassword',
        resetPasswordData: {
            passwordNew: '',
            passwordCon: '',
        },
    }),
    computed: {
        appLogo () {
            return require('~/assets/img/logo_alt.png');
        },
    },
    methods: {},
}
</script>
