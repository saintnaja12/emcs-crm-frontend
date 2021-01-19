import {company} from "../assets/js/utils/fakeData";
import _ from 'lodash'

export default ($knowledgeAdapter, $store) => () => ({
	createContent(data) {
		const formData = new FormData()
		formData.append('category', data.category)
		formData.append('topic', data.topic)
		formData.append('content', data.content)
		formData.append('file', data.attachment ? data.attachment: null)
		formData.append('refNo', data.refNo)
		formData.append('highlight', data.position)
		formData.append('thumbnail', data.thumbnail ? data.thumbnail: null)
		return $knowledgeAdapter.createContent(formData).then(resp => {
			return resp
		})
	},
	editContent(data) {
		const formData = new FormData()
		formData.append('category',data.category)
		formData.append('topic',data.topic)
		formData.append('content',data.content)
		formData.append('file', data.file ? data.file: null)
		formData.append('refNo', data.refNo)
		formData.append('highlight', data.position)
		formData.append('thumbnail', data.thumbnail ? data.thumbnail: null)
		return $knowledgeAdapter.editContent(formData , data).then(resp => {
			return resp
		})
	}
})
