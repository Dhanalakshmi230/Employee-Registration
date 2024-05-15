// action.js
import axios from 'axios';

export const SET_TABLE_DATA = 'SET_TABLE_DATA';
export const UPDATE_ENTRY = 'UPDATE_ENTRY';
export const DELETE_ENTRY = 'DELETE_ENTRY';

const apiUrl = 'https://63cfb761e52f587829a384e5.mockapi.io';
export const submitForm = (formData) => ({
  type: 'SUBMIT_FORM',
  payload: formData
});
export const setTableData = (data) => ({
    type: SET_TABLE_DATA,
    payload: data
});

export const updateEntry = (updatedata) => ({
    type: UPDATE_ENTRY,
    payload: updatedata
});

export const deleteEntry = (id) => ({
    type: DELETE_ENTRY,
    payload: id
});

export const fetchTableData = () => {
    return async (dispatch) => {
        try {
            const result = await axios.get(`${apiUrl}/Form`);
            dispatch(setTableData(result.data));
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };
};

