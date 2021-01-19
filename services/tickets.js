export default ($ticketsAdapter, $store) => () => ({
	createTicket (data) {
		const formData = new FormData()
		if (data.continueTo !== ''){
			formData.append('continueTo', data.continueTo)
		}
		if (data.assignMyTeam !== '') {
			formData.append('assignMyTeam', data.assignMyTeam)
		}
		if(data.reqDueDate !== ''){
			formData.append('reqDueDate', _.toString(new Date(data.reqDueDate).getTime()))
		}
		if(data.appointment !== ''){
			formData.append('appointmentDate', _.toString(new Date(data.appointment).getTime()))
		}
		formData.append('serviceCode', data.serviceCode)
		formData.append('customerCode', data.customerCode)
		formData.append('branch', data.branch)
		formData.append('customerCompany', data.customerCompany)
		formData.append('brand', data.brand)
		formData.append('customerType', data.customerType)
		formData.append('rm', data.rm)
		formData.append('customerName', data.customerName)
		formData.append('province', data.province)
		formData.append('appName', data.appName)
		formData.append('channel', data.channel)
		formData.append('categoryIssue', data.categoryIssue)
		formData.append('otherIssue', data.otherIssue)
		formData.append('subject', JSON.stringify(data.subject))
		formData.append('complain', data.complain)
		formData.append('complainNote', data.complainNote)
		formData.append('description', data.description)
		formData.append('region', data.region)
		// _.forEach(data.file, (fileData, index) => {
		// 	formData.append(`files`, fileData)
		// })
		formData.append('file1',data.file1)
		formData.append('file2',data.file2)
		formData.append('file3',data.file3)
		formData.append('file4',data.file4)
		formData.append('file5',data.file5)
		formData.append('file6',data.file6)
		// !_.isNaN(data.reqDueDate) ? formData.append('reqDueDate', new Date(data.reqDueDate).getTime()):formData.append('reqDueDate', data.reqDueDate)
		// !_.isNaN(data.appointment) ? formData.append('appointmentDate',new Date(data.appointment).getTime()): formData.append('appointmentDate',data.appointment)
		// formData.append('reqDueDate', req)
		// formData.append('appointmentDate', app)
		formData.append('hashtag', data.hashtag)
		formData.append('reqBy', data.reqBy)
		formData.append('contactType', data.contactType)
		formData.append('contact', data.contact)
		return $ticketsAdapter.createTickets(formData).then(resp => {
			return resp
		})
	},
})
