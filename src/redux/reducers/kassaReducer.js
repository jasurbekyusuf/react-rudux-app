import { createReducer} from "@reduxjs/toolkit";
import {createAction} from "@reduxjs/toolkit";

export const addKassa = createAction('ADD_KASSA')
export const editKassa = createAction('EDIT_KASSA')
export const deleteKassa = createAction('DELETE_KASSA')

export default createReducer({
    kassalar: [
        {
            id: 1,
            name: 'kassa1'
        },
        {
            id: 2,
            name: 'kassa2',
        }
    ], kassa: {}
},
    {

    [addKassa.type] : (state, action) => {
        state.kassa = {
            id: state.kassalar.length === 0 ? 1 : state.kassalar[state.kassalar.length - 1].id + 1,
            name: action.payload,
        }
        state.kassalar.push(state.kassa)
    },

    [editKassa.type]: (state, action) => {
        state.kassalar.map(item => {
            if (item.id === action.payload.kassaId) {
                item.name = action.payload.name
            }
        })
    },

    [deleteKassa.type]: (state, action) => {
        state.kassalar.map((item, index) => item.id === action.payload && state.kassalar.splice(index, 1))
    }
})


