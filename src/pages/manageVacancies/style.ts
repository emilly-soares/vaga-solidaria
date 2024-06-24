import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: center;
    align-items: center;
    margin: 0 auto;
    width: 98%;
`;

export const FormContainer = styled.form`
    width: 35%;
    padding: 20px;
    padding-right: 15rem;
`;

export const Title = styled.h1`
    font-size: 28px;
    color: #d03e0d;
    margin-top: 1rem;
    text-align: center;
`;

export const InputField = styled.input`
    margin-bottom: 10px;
    padding: 5px;
    height: 35px;
    width: 100%;
    border: 1px solid #ccc;
    font-size: 16px;
`;


export const SubmitButton = styled.button`
    font-size: 16px;
    background-color: #5187F0;
    color: #fff;
    padding: 10px;
    border: none;
    cursor: pointer;
    width: 100%;
    height: 50px;
    margin-top: 20px;
    &:hover {
        background-color: #5187CC;
    }
`;

export const Error = styled.p`
    color: red;
    margin-top: 10px;
`;

export const VacancyList = styled.div`
    width: 70%;
    padding: 20px;
`;

export const VacancyListItem = styled.li`
    list-style-type: none;
    margin-bottom: 10px;
`;

export const EditButton = styled.button`
    background-color: #5187F0;
    color: #fff;
    border: none;
    padding: 5px 10px;
    margin-left: 10px;
    cursor: pointer;
`;

export const DeleteButton = styled.button`
    background-color: #ff0000;
    color: #fff;
    border: none;
    padding: 5px 10px;
    margin-left: 10px;
    cursor: pointer;
`;

export const TableHeader = styled.th`
    background-color: #5187F0;
    color: #fff;
    padding: 10px;
    text-align: left;
`;


export const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f4f4f4;
    }
`;

export const TableCell = styled.td`
    padding: 20px;
`;

export const VacancyTable = styled.table`
    width: 70%;
    border-collapse: collapse;
`;

export const TextareaField = styled.textarea`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    resize: vertical; 
    line-height: 2; 

    background: repeating-linear-gradient(
        white, 
        white 25px, 
        #f4f4f4 26px
    );
    outline: none;

    &:focus {
        border-color: #007bff;
    }
`;

export const ActionButton = styled.button`
  background-color: #007bff;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  margin-right: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5187F0;
  }
`;

export const ActionButtons = styled.button`
  color: #333;
  border: none;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const ModalActions = styled.div`
  margin-top: 20px;
`;


export const VacancyTableBody = styled.tbody``;


export const SelectField = styled.select`
    margin-bottom: 10px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    background-color: #fff;
    color: #333;
`;

export const ExportButton = styled.button`
    font-size: 16px;
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    margin-top: 20px;

    &:hover {
        background-color: #45a049;
    }`;

