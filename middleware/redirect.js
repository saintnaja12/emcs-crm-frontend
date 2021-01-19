import * as _ from 'lodash'
import * as QueryString from 'qs'
import * as jwt from 'jsonwebtoken'

export default function ({route, redirect, $axios, store}) {
	let localToken = localStorage.getItem('token')
	let user = store.getters.getUserLogin

	let mapPath = new Map()
	mapPath.set('/Dashboard', "dashboard")
	mapPath.set('/Contact', "contact")
	mapPath.set('/Ticket', "ticket")
	mapPath.set('/Ticket/Create', "ticket")
	mapPath.set('/Ticket/View', "ticket")
	mapPath.set('/Ticket/OverSLA', "ticket")
	mapPath.set('/Email/Email', "email"),
	mapPath.set('/Email/DetailEmail', "email"),
	mapPath.set('/Knowledge', "knowledge")
	mapPath.set('/Report/AbandonCall', "report")
	mapPath.set('/Report/ACDCall', "report")
	mapPath.set('/Report/Agent', "report")
	mapPath.set('/Report/Channel', "report")
	mapPath.set('/Report/CustomerZone', "report")
	mapPath.set('/Report/FeedbackCall', "report")
	mapPath.set('/Report/Hashtag', "report")
	mapPath.set('/Report/SatisfactionSurvey', "report")
	mapPath.set('/Report/SatisfactionSurveySummary', "report")
	mapPath.set('/Report/TeamWork', "report")
	mapPath.set('/Report/Ticket', "report")
	mapPath.set('/Report/TicketSummary', "report")
	mapPath.set('/Management/Role', "management")
	mapPath.set('/Management/User', "management")
	mapPath.set('/MasterData/Cause', "management")
	mapPath.set('/MasterData/Project', "management")
	mapPath.set('/MasterData/SRType', "management")
	mapPath.set('/MasterData/Site', "management")

	function checkPermissions(permissions, path) {
		if(_.indexOf(permissions, path) === -1 ){
			localStorage.clear();
			redirect('/login')
		}
	}
	if (route.path !== '/login') {
		if(_.isNil(localToken)) {
			localStorage.clear();
			redirect('/login')
		}
		else{
			let dataToken = jwt.decode(localToken, {complete: true})
			let user = {
				id: dataToken.payload.id,
				name: dataToken.payload.name,
				email: dataToken.payload.email,
				department: dataToken.payload.department,
				roles: dataToken.payload.roles,
				isSuspended: dataToken.payload.isSuspended,
				permissions: dataToken.payload.permissions,
				iat: dataToken.payload.iat,
				exp: dataToken.payload.exp,
				team: {
					id: dataToken.payload.team.id,
					name: dataToken.payload.team.name
				}
			}
			store.dispatch('setUser', user)
			let permission = dataToken.payload.permissions
			store.dispatch('setPermission', permission);
			if (route.path === '/'){
				redirect('/Dashboard')
			}
			// checkPermissions(user.permissions, mapPath.get(route.path))

		}
	}
}
