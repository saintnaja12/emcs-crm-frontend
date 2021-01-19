<template>
	<div class="uk-flex uk-flex-center uk-align-center sc-login-page-wrapper  mt-5 ">
		<div
			class="uk-width-2-3@s uk-width-1-2@m uk-width-1-3@l uk-width-1-3@xl uk-align-center mt-5"
		>
			<ScCard hover >
				<ScCardBody class="sc-padding-remove ">
					<div class="uk-grid-divider uk-grid-collapse" data-uk-grid>
						<div class="uk-width-1-3@l uk-flex uk-flex-middle uk-flex-center"
							 :class="'md-bg-light-700'">
							<div class="sc-padding-medium uk-text-center">
								<img v-rjs="require('~/assets/img/emcsLogo.png')" :src="appLogo" alt="" height="250" width="250">
								<hr style="border: 1px solid whitesmoke">
								<h1 style="color: whitesmoke; font-size: 15px">EMCS Thai co.,Ltd.</h1>
							</div>
						</div>
						<div class="uk-width-2-3@l">
							<div class="sc-padding-large" @keydown.enter="login()">
								<ul class="uk-list uk-list-divider">
									<ScInput v-model="loginData.username" class="uk-margin-large-top"
											 placeholder="Username">
										<span slot="icon" class="uk-form-icon" data-uk-icon="icon: user"></span>
									</ScInput>
									<ScInput v-model="loginData.password" class="uk-margin-large-top"
											 placeholder="Password" type="password"
									>
										<span slot="icon" class="uk-form-icon" data-uk-icon="icon: lock"></span>
									</ScInput>
									<div>
										<p v-show="error===true" style="color: #dd2c00">
											Password or username is incorrect. Please try again.
										</p>
									</div>
									<button v-waves.button.light
											style="background-color: #034ea2"
											@click="login()"
											class=" uk-margin-large-top sc-button-large  sc-button sc-button-primary uk-width-1-1">
										LOGIN
									</button>

								</ul>
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
    import Select2 from "~/components/Select2";


    export default {
        layout: 'login',
        components: {
            ScInput,
            Select2,
        },
        data: () => ({
            loginData: {
                username: '',
                password: ''
            },
            error:false,
            selected: null,
            recoverPassEmail: ''
        }),
        computed: {
            appLogo() {
                return require('~/assets/img/emcsLogo.png');
            },
        },
        mounted() {
        },
        methods: {
            login() {
                this.$userService.login(this.loginData).then(resp => {
					this.$router.push(`/Dashboard`)
					this.error = false
                }).catch(err => {
					console.log(err)
					this.error = true
                })
            },
        },
    }
</script>
<style>
	.uk-card {
		/*border-radius: 10px;*/
		/*top: 60%;*/
	}

	.md-bg-light-700 {
		background: #034ea2; /* For browsers that do not support gradients */
		background: -webkit-linear-gradient(left, #034ea2, #5882FA); /* For Safari 5.1 to 6.0 */
		background: -o-linear-gradient(right, #034ea2, #5882FA); /* For Opera 11.1 to 12.0 */
		background: -moz-linear-gradient(right, #034ea2, #5882FA); /* For Firefox 3.6 to 15 */
		background: linear-gradient(to right, #034ea2, #5882FA); /* Standard syntax */
	}

	.uk-input sc-vue-input {
		background: #034ea2;
	}
</style>
