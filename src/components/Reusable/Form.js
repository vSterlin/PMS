import styled from "styled-components";

const StyledForm = styled.form`
  margin: 0 20px;
  margin-top: 20px;
  padding: 0 300px;
  /* text-align: center; */
  & > * > input,
  textarea {
    padding: 5px;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  margin-bottom: 10px;
`;

const before = `
&> * {
  border-width: 1px;
  border-radius: 3px; 
  border-color: red;
}
&:before{
  content: 'Required';
  color: red;
  font-size: 10px;
}`;

const StyledInputWrapper = styled.div`
  ${({ error }) => (error ? before : null)}
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 200px;
  margin-bottom: 10px;
  resize: none;
`;

const StyledSelect = styled.select`
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
`;

export {
  StyledForm,
  StyledInput,
  StyledTextArea,
  StyledSelect,
  StyledInputWrapper,
};
