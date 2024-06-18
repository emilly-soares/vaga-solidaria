import styled from 'styled-components';

export const ProfileContainer = styled.div`
display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

export const ProfileForm = styled.form`
  width: 300px;  
  padding: 20px;
  margin-top: 20px; 
  border-radius: 8px;
  background-color: #f5f5f5;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ProfileTitle = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
`;

export const ProfileLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
`;

export const ProfileInput = styled.input`
  width: 100%; 
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const ProfileButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #8a05be;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold; 
  margin-top: 10px;
`;