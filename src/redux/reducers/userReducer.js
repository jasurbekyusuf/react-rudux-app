import { createReducer} from '@reduxjs/toolkit';
import {createAction} from '@reduxjs/toolkit';

export const addUser = createAction('ADD_USER')
export const editUser = createAction('EDIT_USER')
export const deleteUser = createAction('DELETE_USER')

export default createReducer({
    users: [
        {
            id: 1,
            name: 'Akbar',
            phone: 1112233
        },
        {
            id: 2,
            name: 'Abror',
            phone: 2224488
        }
    ], user: {}
}, {

    [addUser.type]: (state, action) => {
        state.user = {
            id: state.users.length === 0 ? 1 : state.users[state.users.length - 1].id + 1,
            name: action.payload.name,
            phone: action.payload.phone
        }
        state.users.push(state.user)
    },

    [editUser.type]: (state, action) => {
        state.users.map(item => {
            if (item.id === action.payload.userId) {
                item.name = action.payload.name
                item.phone = action.payload.phone
            }
        })
    },

    [deleteUser.type]: (state, action) => {
        state.users.map((item, index) => item.id === action.payload && state.users.splice(index, 1))
    }
})


