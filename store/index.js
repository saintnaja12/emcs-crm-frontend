import Vuex from 'vuex';
import Page from './page';
import User from './user';
import task_board from './task_board';
import Mailbox from './mailbox';
import Contact from "./contact";
import Knowledge from "./knowledge";
import Master from "./master";
import Tickets from "./tickets";
import HistoryLog from "./historyLog";
import Reminder from "./reminder";
const createStore = () => {
    return new Vuex.Store({
        namespaced: true,
        modules: {
            Page,
            task_board: task_board,
            Mailbox,
            User,
            Contact,
            Knowledge,
			Tickets,
			Master,
			HistoryLog,
			Reminder
        }
    });
};

export default createStore

