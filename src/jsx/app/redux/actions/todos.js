import { ADD_TODO,
         REMOVE_TODO,
         COMPLETE_TODO,
         SET_VISIBILITY_FILTER,
         VisibilityFilters } from './actionTypes';

import fetch from 'isomorphic-fetch';

function AsyncTask(callback) {
  if (!callback) throw new Error('Callback required for AsyncTask');

  return new Promise((resolve, reject) => {
    callback((err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

function addTodo(text) {
  return { type: ADD_TODO, text };
}

function addTodoWithDelay(host, text) {
  return function (dispatch) {
    return AsyncTask((done) => {
      console.log('calling AsyncTask');
      setTimeout(() => {
        console.log('dispatched!');
        dispatch(addTodo(text));
        done();
      }, 500);
    });
  }
}

function removeTodo(index) {
  return { type: REMOVE_TODO, index };
}

function completeTodo(index) {
  return { type: COMPLETE_TODO, index };
}

function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}

module.exports = {
  addTodo: addTodo,
  removeTodo: removeTodo,
  completeTodo: completeTodo,
  addTodoWithDelay: addTodoWithDelay,
  setVisibilityFilter: setVisibilityFilter
};
