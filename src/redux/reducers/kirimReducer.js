import {createAction, createReducer} from '@reduxjs/toolkit';

export const addKirim = createAction('ADD_KIRIM')
export const editKirim = createAction('EDIT_KIRIM')
export const deleteKirim = createAction('DELETE_KIRIM')


export default createReducer({kirimlar: [], kirim: {}}, {

    [addKirim.type]: (state, action) => {
        let date = new Date();
        state.kirim = {
            id: state.kirimlar.length === 0 ? 1 : state.kirimlar[state.kirimlar.length - 1].id + 1,
            userId: action.payload.userId,
            kassaId: action.payload.kassaId,
            amount: action.payload.amount,
            date: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
        }
        state.kirimlar.push(state.kirim)
    },

    [editKirim.type]: (state, action) => {
        state.kirimlar.map(item => {
            if (item.id === action.payload.kirimId) {
                item.userId = action.payload.userId
                item.kassaId = action.payload.kassaId
                item.amount = action.payload.amount
            }
        })
    },

    [deleteKirim.type]: (state, action) => {
        state.kirimlar.map((item, index) => item.id === action.payload && state.kirimlar.splice(index, 1))
    }
})

