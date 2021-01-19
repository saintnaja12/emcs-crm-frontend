import UserService from '~/services/user';
import ContactService from '~/services/contact';
import knowledgeService from '~/services/knowledge';
import TicketsService from '~/services/tickets';
import reportService from '~/services/report';
import dashboardService from '~/services/dashboard';
import masterService from '~/services/master';
import emailService from '~/services/email';
import SocketService from '~/services/socket'

// import profileService from '~/services/profile';

export default (ctx, inject) => {
    const service = UserService(ctx.app.$userAdapter,ctx.app.store);
    inject('userService', service());
    const contact_service = ContactService(ctx.app.$contactAdapter, ctx.app.store);
    inject('contactService', contact_service());
    const Knowledge_Service = knowledgeService(ctx.app.$knowledgeAdapter, ctx.app.store);
    inject('knowledgeService', Knowledge_Service());
    const Tickets_Service = TicketsService(ctx.app.$ticketsAdapter, ctx.app.store);
    inject('ticketsService', Tickets_Service());
	const Report_Service = reportService(ctx.app.$reportAdapter, ctx.app.store);
	inject('reportService', Report_Service());
	const Master_Service = masterService(ctx.app.$masterAdapter, ctx.app.store);
	inject('masterService', Master_Service());
	const Dashboard_Service = dashboardService(ctx.app.$ticketsAdapter, ctx.app.store ,ctx.app.$masterAdapter);
	inject('dashboardService', Dashboard_Service());
	const Email_Service = emailService(ctx.app.$emailAdapter, ctx.app.store );
	inject('emailService', Email_Service());
	const socketService = SocketService(ctx.app.$socketAdapter, ctx.app.store)
	const socketMessageService = socketService()
	ctx.app.$socketAdapter.registerHandler(socketMessageService)
	inject('socketService', socketService())
	// const Profile_Service = profileService(ctx.app.$profileAdapter, ctx.app.store);
	// inject('profileService', Profile_Service());
}
