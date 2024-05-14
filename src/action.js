// actions.js
export const submitForm = (formData) => {
    return {
      type: 'SUBMIT_FORM',
      payload: formData
    };
  };
  