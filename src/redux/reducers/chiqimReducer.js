import {createAction, createReducer} from '@reduxjs/toolkit';

export const addChiqim = createAction('ADD_CHIQIM')
export const editChiqim = createAction('EDIT_CHIQIM')
export const deleteChiqim = createAction('DELETE_CHIQIM')


export default createReducer({chiqimlar: [], chiqim: {}}, {

    [addChiqim.type]: (state, action) => {
        let date = new Date();
        state.chiqim = {
            id: state.chiqimlar.length === 0 ? 1 : state.chiqimlar[state.chiqimlar.length - 1].id + 1,
            userId: action.payload.userId,
            kassaId: action.payload.kassaId,
            amount: action.payload.amount,
            date: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
        }
        state.chiqimlar.push(state.chiqim)
    },

    [editChiqim.type]: (state, action) => {
        state.chiqimlar.map(item => {
            if (item.id === action.payload.chiqimId) {
                item.userId = action.payload.userId
                item.kassaId = action.payload.kassaId
                item.amount = action.payload.amount
            }
        })
    },

    [deleteChiqim.type]: (state, action) => {
        state.chiqimlar.map((item, index) => item.id === action.payload && state.chiqimlar.splice(index, 1))
    }
})

