// // reducers.js
// const initialState = {
//     formData: {}
//   };
  
//   const formReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'SUBMIT_FORM':
//         return {
//           ...state,
//           formData: action.payload
//         };
//       default:
//         return state;
//     }
//   };
  
//   export default formReducer;
// reducers.js
const initialState = {
  formData: {},
  tableData: []
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'SUBMIT_FORM':
          return {
              ...state,
              formData: action.payload
          };
      case 'SET_TABLE_DATA':
          return {
              ...state,
              tableData: action.payload
          };
      case 'UPDATE_ENTRY':
          return {
              ...state,
              tableData: state.tableData.map(entry => 
                  entry.id === action.payload.id ? action.payload : entry
              )
          };
      case 'DELETE_ENTRY':
        return {
          ...state,
          tableData: state.tableData.filter(item => item.id !== action.payload)
      };
      default:
          return state;
  }
};

export default formReducer;

