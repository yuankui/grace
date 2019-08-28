const {createStore, applyMiddleware} = require("redux");
const promiseMiddleware =  require('redux-promise').default;

function reducer(state = {name: "yuankui"}, action) {
    if (action.type === 'update_name') {
        return {
            name: action.name,
        }
    }
}


const store = createStore(reducer, applyMiddleware(promiseMiddleware));

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            type: "update_name",
            name: "wangfang",
        })
    }, 2500);
});

const dispatch = store.dispatch(promise);

dispatch.then(value => {
    console.log(value);

    console.log(store.getState());
});
