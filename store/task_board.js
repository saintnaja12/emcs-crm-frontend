const tasks = require('~/data/pages/tasks.json');

let others = tasks.filter(obj => {
    return obj.list === '';
});
let todo = tasks.filter(obj => {
    return obj.list === 'todo';
});
let in_progress = tasks.filter(obj => {
    return obj.list === 'in_progress';
});
let testing = tasks.filter(obj => {
    return obj.list === 'testing';
});
let done = tasks.filter(obj => {
    return obj.list === 'done';
});

const state = {
    tasks: {
        'others': others,
        'todo': todo,
        'inProgress': in_progress,
        'testing': testing,
        'done': done
    }
};

const mutations = {
    updateTasks (state, value) {
        console.log(value);
    },
    replaceList (state, params ) {
        state.tasks[params.list] = params.dragList
    },
    removeTaskFromList (state, params ) {
        var index = state.tasks[params.list].map(function (item) {
            return item.id
        }).indexOf(params.id);
        state.tasks[params.list].splice(index, 1);
    }
};

const getters = {
    tasks (state) {
        return state.tasks
    }
};
export default  {
    state,
    // actions,
    mutations,
    getters
}

