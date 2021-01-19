export const menuEntries = [
	{
		section_title: "menu"
	},
	{
		id: 1,
		title: "Dashboard",
		icon: "mdi mdi-view-dashboard-variant",
		page: "/Dashboard"
	},
	{
		id: 2,
		title: "Contact",
		icon: "mdi mdi-account-card-details",
		page: "/Contact"
	},
	{
		id: 3,
		title: "Ticket",
		icon: "mdi mdi-book-minus-multiple",
		page: "/Ticket"
	},

	{
		id: 4,
		title: "Email",
		icon: "mdi mdi-email",
		page: "/Email"
	},
	{
		id: 6,
		title: "Knowledge",
		icon: "mdi mdi-lightbulb-on",
		page: "/Knowledge"
	},
	{
		id: 7,
		title: "Report",
		icon: "mdi mdi-chart-bar",
		isOpen: false,
		level: 0,
		submenu: [
			{
				id: 71,
				title: "Ticket Report",
				page: "/Report/Ticket"
			},
			{
				id: 72,
				title: "Agent Report",
				page: "/Report/Agent"
			},
			{
				id: 73,
				title: "TeamWork Report",
				page: "/Report/TeamWork"
			},
			{
				id: 74,
				title: "ACD Call Report",
				page: "/Report/ACDCall"
			},
			{
				id: 75,
				title: "Abandon Call Report",
				page: "/Report/AbandonCall"
			},
			{
				id: 76,
				title: "Feedback Call Report",
				page: "/Report/FeedbackCall"
			},
			{
				id: 77,
				title: "Customer Zone Report",
				page: "/Report/CustomerZone"
			},
			{
				id: 78,
				title: "Satisfaction Survey",
				page: "/Report/SatisfactionSurvey"
			},
			{
				id: 79,
				title: "Hashtag",
				page: "/Report/Hashtag"
			},
			{
				id: 80,
				title: "Ticket Summary",
				page: "/Report/TicketSummary"
			},
			{
				id: 81,
				title: "Channel Report",
				page: "/Report/Channel"
			},
			{
				id: 82,
				title: "Satisfaction Survey Summary",
				page: "/Report/SatisfactionSurveySummary"
			}
		]
	},

	{
		section_title: "Admin"
	},
	/*{
		id: 8,
		title: "Management",
		icon: "mdi mdi-settings",
		page: "/views/Management"
	},*/
	{
		id: 8,
		title: "Management",
		icon: "mdi mdi-settings",
		isOpen: false,
		level: 0,
		submenu: [
			{
				id: 83,
				title: "Role Management",
				page: "/Management/Role"
			},
			{
				id: 84,
				title: "Grant Roles",
				page: "/Management/GrantRole"
			},
			{
				id: 85,
				title: "User Management",
				page: "/Management/User"
			},
		]
	},
	{
		id: 9,
		title: "Master Data",
		icon: "mdi mdi-format-list-bulleted",
		page: "/Master"
	},

];
