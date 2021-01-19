<template>
	<div id="sc-page-wrapper">
		<no-ssr>
			<div id="sc-page-top-bar" class="sc-top-bar">
				<div class="sc-top-bar-content uk-flex uk-flex-1">
					<h1 class="sc-top-bar-title uk-text-uppercase uk-flex-1">
						Contact
					</h1>
				</div>
			</div>
		</no-ssr>
		<div id="sc-page-content">
			<b-tabs v-model="tabIndex" small >
				<b-tab title="Company" @click="clearUrl()">
					<ContactCompanyList />
				</b-tab>
				<b-tab title="Personal" @click="setDataPersonal()">
					<Personal />
				</b-tab>
			</b-tabs>
		</div>
	</div>
</template>

<script>
    import Personal from './Personal/List'
    import ContactCompanyList from './Company/List'

    export default {
        components: {
			Personal,
            ContactCompanyList,
        },
        data:() => ({
			tabIndex: 0,
			personalDefaultData: {
				id: '',
				address: {
					address: '',
					alley: '',
					subDistrict: '',
					district: '',
					province: '',
					zipCode: ''
				},
				firstName: '',
				lastName: '',
				position: '',
				company: '',
				branch: '',
				brand: {
					id: '',
					name: ''
				},
				customerType: {
					id: '',
					name: ''
				},
				phone1: '',
				phone2: '',
				phone3: '',
				email: '',
				lineId: '',
				note: '',
				partner: '',
				createdAt: '',
				createdBy: {
					name: ''
				},
				updatedAt: '',
				updatedBy: {
					name: ''
				},
			},
			companyDefaultData: {
				id: '',
				companyName: '',
				branch: '',
				partner: [
					{
						id: '',
						name: ''
					}
				],
				phone1: '',
				phone2: '',
				phone3: '',
				phone4: '',
				phone5: '',
				customerType: {
					id: '',
					name: ''
				},
				brand: {
					id: '',
					name: ''
				},
				region: '',
				customerCode: '',
				serviceCode: '',
				taxId: '',
				fax: '',
				website: '',
				certAddress: {
					address: '',
					alley: '',
					subDistrict: '',
					district: '',
					province: '',
					zipCode: '',
				},
				otherAddress: '',
				invoiceAddress: '',
				country: '',
				note: '',
				file1: {
					success: '',
					data: {
						link: ''
					},
					alt: ''
				},
				file2: {
					success: '',
					data: {
						link: ''
					},
					alt: ''
				},
				file3: {
					success: '',
					data: {
						link: ''
					},
					alt: ''
				},
				file4: {
					success: '',
					data: {
						link: ''
					},
					alt: ''
				},
				file5: {
					success: '',
					data: {
						link: ''
					},
					alt: ''
				},
				createdAt: '',
				createdBy: {
					id: '',
					name: '',
					team : {
						id: '',
						name: ''
					}
				},
				updatedAt: '',
				updatedBy: {
					id: '',
					name: '',
					team : {
						id: '',
						name: ''
					},
					username: ''
				},
			}
        }),
		created() {
        	this.tab = this.$route.query.tabIndex
			if(this.tab === 'personal'){
				this.tabIndex = 1
			}else {
				this.$router.push(`/Contact`)
			}
		},
		mounted() {
			this.$store.dispatch('getCompanyById', this.companyDefaultData)
		},
		methods:{
			clearUrl(){
				this.$router.push(`/Contact`)
				this.$store.dispatch('getPersonalById', this.personalDefaultData)

			},
			setDataPersonal(){
				this.$store.dispatch('getCompanyById', this.companyDefaultData)
			}
        }
    }
</script>


