import _ from "lodash";
import qs from 'qs'


export default ($contactAdapter, $store) => () => ({

    createCompany(data) {
    	const certAddress = {
			address: data.certAddress.address,
			alley: data.certAddress.alley,
            district: data.certAddress.district,
            subDistrict: data.certAddress.subDistrict,
            province: data.certAddress.province,
            zipCode: data.certAddress.zipCode
        }
        const otherAddress = {
			address: data.otherAddress.address,
			alley: data.otherAddress.alley,
            district: data.otherAddress.district,
            subDistrict: data.otherAddress.subDistrict,
            province: data.otherAddress.province,
            zipCode: data.otherAddress.zipCode
        }
        const invoiceAddress = {
			address: data.invoiceAddress.address,
			alley: data.invoiceAddress.alley,
            district: data.invoiceAddress.district,
            subDistrict: data.invoiceAddress.subDistrict,
            province: data.invoiceAddress.province,
            zipCode: data.invoiceAddress.zipCode
        }
		let brand = ''
		if (data.customerType === '5e953437125b915144f92d41') {
			brand = data.brand
		}else {
			brand = ''
		}
		const partner = _.join(data.insurancePartners,',')
		const garage = _.join(data.garage,',')
        const formData = new FormData()
		formData.append('companyName', data.companyName)
        formData.append('branch', data.branch)
        formData.append('customerType', data.customerType)
        formData.append('brand', brand)
        formData.append('customerCode', data.customerCode)
        formData.append('serviceCode', data.serviceCode)
		formData.append('partner', partner)
        formData.append('taxId', data.taxId)
        formData.append('phone1', data.phone1)
        formData.append('phone2', data.phone2)
        formData.append('phone3', data.phone3)
        formData.append('phone4', data.phone4)
        formData.append('phone5', data.phone5)
        formData.append('fax', data.fax)
        formData.append('website', data.website)
        formData.append('country', data.country)
        formData.append('note', data.note)
        formData.append('status', data.status.id)
        formData.append('region', data.certAddress.region)
        formData.append('certAddress', JSON.stringify(certAddress))
        formData.append('otherAddress', JSON.stringify(otherAddress))
        formData.append('invoiceAddress', JSON.stringify(invoiceAddress))
		formData.append('file1', data.file1)
		formData.append('file2', data.file2)
		formData.append('file3', data.file3)
		formData.append('file4', data.file4)
		formData.append('file5', data.file5)
		formData.append('garage', garage)
        return $contactAdapter.createCompany(formData).then(resp => {
            return resp
        })
    },
    getContact(id) {
        return $contactAdapter.getContact(id).then(resp => {
            $store.dispatch('getContact', resp)
        })
    },
    getViewContact(id) {
        if (!_.isNil(id)) {
            return $contactAdapter.getViewContact(id).then(resp => {
                $store.dispatch('getViewContact', resp)
            })
        }
    },
    updateCompanyContact(getCompanyById, fromEdit) {
    	const id = getCompanyById.id
		const certAddress = {
			address: getCompanyById.certAddress.address,
			alley: getCompanyById.certAddress.alley,
			district: getCompanyById.certAddress.district,
			subDistrict: getCompanyById.certAddress.subDistrict,
			province: getCompanyById.certAddress.province,
			zipCode: getCompanyById.certAddress.zipCode
		}
		const otherAddress = {
			address: getCompanyById.otherAddress.address,
			alley: getCompanyById.otherAddress.alley,
			district: getCompanyById.otherAddress.district,
			subDistrict: getCompanyById.otherAddress.subDistrict,
			province: getCompanyById.otherAddress.province,
			zipCode: getCompanyById.otherAddress.zipCode
		}
		const invoiceAddress = {
			address: getCompanyById.invoiceAddress.address,
			alley: getCompanyById.invoiceAddress.alley,
			district: getCompanyById.invoiceAddress.district,
			subDistrict: getCompanyById.invoiceAddress.subDistrict,
			province: getCompanyById.invoiceAddress.province,
			zipCode: getCompanyById.invoiceAddress.zipCode
		}
		let brand = ''
		if (getCompanyById.customerType.id === '5e953437125b915144f92d41') {
			brand = getCompanyById.brand.id
		}else {
			brand = ''
		}
		const partner = _.join(_.map(getCompanyById.partnerId),',')
		const garage = _.join(_.map(getCompanyById.garageId),',')
		const formData = new FormData()
		formData.append('companyName', getCompanyById.companyName)
		formData.append('branch', getCompanyById.branch)
		formData.append('customerType', getCompanyById.customerType.id)
		formData.append('brand', brand)
		formData.append('customerCode', getCompanyById.customerCode)
		formData.append('serviceCode', getCompanyById.serviceCode)
		formData.append('partner', partner)
		formData.append('taxId', getCompanyById.taxId)
		formData.append('phone1', getCompanyById.phone1 ?getCompanyById.phone1: '')
		formData.append('phone2', getCompanyById.phone2 ?getCompanyById.phone2: '')
		formData.append('phone3', getCompanyById.phone3 ?getCompanyById.phone3: '')
		formData.append('phone4', getCompanyById.phone4 ?getCompanyById.phone4: '')
		formData.append('phone5', getCompanyById.phone5 ?getCompanyById.phone5: '')
		formData.append('fax', getCompanyById.fax)
		formData.append('website', getCompanyById.website)
		formData.append('country', getCompanyById.country)
		formData.append('note', getCompanyById.note)
		formData.append('status', getCompanyById.status.id)
		formData.append('region', getCompanyById.region)
		formData.append('certAddress', JSON.stringify(certAddress))
		formData.append('otherAddress', JSON.stringify(otherAddress))
		formData.append('invoiceAddress', JSON.stringify(invoiceAddress))
		formData.append('remark', JSON.stringify(fromEdit.remark))
		formData.append('file1', fromEdit.file1)
		formData.append('file2', fromEdit.file2)
		formData.append('file3', fromEdit.file3)
		formData.append('file4', fromEdit.file4)
		formData.append('file5', fromEdit.file5)
		formData.append('garage', garage)
        return $contactAdapter.updateCompanyContact(formData,id).then(resp => {
            return resp
        })
    },
	createPeopleCompany(data,company){
    	const obj = {
			firstName: data.firstName,
			lastName: data.lastName,
			address: {
				address: data.address.address,
				alley: data.address.alley,
				subDistrict: data.address.subDistrict,
				district: data.address.district,
				province: data.address.province,
				zipCode: data.address.zipCode,
			},
			company: company.id,
			email: data.email,
			position: data.position,
			phone1: data.phone1,
			phone2: data.phone2,
			phone3: data.phone3,
			lineId: data.lineId,
			note: data.note,
			status: data.status.id

		}
		const removeEmpty = (obj) => {
			Object.keys(obj).forEach(key => {
				if (_.isObject(obj[key])) removeEmpty(obj[key]);
				if (_.isNumber(obj[key])){

				}else if(_.isNil(obj[key]) || _.isEmpty(obj[key]) ){
					delete obj[key];
				}
			});
			return obj;
		};
		const item = removeEmpty(obj)
    	return $contactAdapter.createPeopleCompany(item).then(resp => {
    		return resp
		})
	},
	updatePeopleInCompany(data,fromData){
    	const obj = {
			id: data.id,
			firstName: data.firstName,
			lastName: data.lastName,
			address: {
				address: data.address.address,
				alley: data.address.alley,
				subDistrict: data.address.subDistrict,
				district: data.address.district,
				province: data.address.province,
				zipCode: data.address.zipCode,
			},
			email: data.email,
			position: data.position,
			phone1: data.phone1,
			phone2: data.phone2,
			phone3: data.phone3,
			lineId: data.lineId,
			note: data.note,
			status: data.status.id,
			remark: fromData.remark,
		}
		const removeEmpty = (obj) => {
			Object.keys(obj).forEach(key => {
				if (_.isObject(obj[key])) removeEmpty(obj[key]);
				if (_.isNumber(obj[key])){

				}else if(_.isNil(obj[key]) || _.isEmpty(obj[key]) ){
					delete obj[key];
				}
			});
			return obj;
		};
		const item = removeEmpty(obj)
		return $contactAdapter.updatePeopleInCompany(item).then(resp => {
			return resp
		})
	},
	createPersonal(data){
		let brand = ''
		if (data.customerType === '5e953437125b915144f92d41') {
			brand = data.brand
		}else {
			brand = ''
		}
		const obj = {
			firstName: data.firstName,
			lastName: data.lastName,
			position: data.position,
			company: data.company,
			branch: data.branch,
			brand: brand,
			customerType: data.customerType,
			phone1: data.phone1,
			phone2: data.phone2,
			phone3: data.phone3,
			email: data.email,
			lineId: data.lineId,
			note: data.note,
			status: data.status,
			partner: data.partner,
			garage: data.garage,
			address: {
				address: data.addressAddress,
				alley: data.addressAlley,
				district: data.addressDistrict,
				subDistrict: data.addressSubDistrict,
				province: data.addressProvince,
				zipCode: data.addressZipCode,
			},
		}
		return $contactAdapter.createPersonal(obj).then(resp => {
			return resp
		})
	},
	updatePersonal(data,fromEdit){
		let brand = ''
		if (data.customerType.id === '5e953437125b915144f92d41') {
			brand = data.brand.id
		}else {
			brand = ''
		}
		const obj = {
			id: data.id,
			firstName: data.firstName,
			lastName: data.lastName,
			position: data.position,
			company: data.company,
			branch: data.branch,
			brand: brand,
			customerType: data.customerType.id,
			phone1: data.phone1,
			phone2: data.phone2,
			phone3: data.phone3,
			email: data.email,
			lineId: data.lineId,
			note: data.note,
			status: data.status.id,
			partner: data.partner,
			garage: data.garage,
			address: {
				address: data.address.address,
				alley: data.address.alley,
				subDistrict: data.address.subDistrict,
				district: data.address.district,
				province: data.address.province,
				zipCode: data.address.zipCode,
			},
			remark:fromEdit.remark
		}
		return $contactAdapter.updatePersonal(obj).then(resp => {
			return resp
		})
	},
	searchSubDistrict(keyword){
		const obj = {
			district: keyword
		}
		let str = qs.stringify(obj);
		return $contactAdapter.findProvince(str).then(resp => {
			return resp
		})
	},
	searchDistrict(keyword){
		const obj = {
			subDistrict: keyword
		}
		let str = qs.stringify(obj);
		return $contactAdapter.findProvince(str).then(resp => {
			return resp
		})
	},
	searchProvince(keyword){
		const obj = {
			province: keyword
		}
		let str = qs.stringify(obj);
		return $contactAdapter.findProvince(str).then(resp => {
			return resp
		})
	},
	searchZipCode(keyword){
		const obj = {
			zipCode: keyword
		}
		let str = qs.stringify(obj);
		return $contactAdapter.findProvince(str).then(resp => {
			return resp
		})
	},
	searchPersonal(keyword){
		const obj = {
			customerType:keyword.customerType,
			province:keyword.province,
			region:keyword.region,
			insurance:keyword.insurance,
			searchBy:keyword.searchBy,
			keyword:keyword.keyword,
		}
		const removeEmpty = (obj) => {
			Object.keys(obj).forEach(key => {
				if (_.isObject(obj[key])) removeEmpty(obj[key]);
				if (_.isNumber(obj[key])){

				}else if(_.isNil(obj[key]) || _.isEmpty(obj[key]) ){
					delete obj[key];
				}
			});
			return obj;
		};
		const data = removeEmpty(obj)
		let str = qs.stringify(data);
		return $contactAdapter.searchPersonal(str).then(resp =>{
			return resp
		})
	}
})
