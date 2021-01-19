export default ($emailAdapter, $store, $axios) => () => ({
	searchEmail(keyword, pageNumber,limit){
		const obj = {
			"keyword": keyword,
			"page": pageNumber,
			"limit": limit
		}
		return $emailAdapter.findEmail(obj).then(resp => {
			return resp
		})
	},
	getListEmailAll(obj) {
		return $emailAdapter.getListEmailAll(obj).then(resp => {
			return resp
		})
	},
})
