import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
`;

export const GroupLogo = styled(Link)`
  position: relative;
`;

export const Logo = styled.img`
    width: 150px; 
    height: auto; 
    margin-right: 0.2rem; 
    margin-top: -2rem;
`;

export const PlatformTitle = styled.h1`
    font-size: 20px;
    font-weight: bold;
    margin: 0;
    position: absolute;
    top: 40%;
    left: 22%;
    transform: translate(-50%, -50%);
    color: #FFF;
`;


export const LeftSection = styled.div`
  width: 50%;
  padding-left: 20px;
  background-color: #5187F0; 
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const RightSection = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

export const Vacancy = styled.img`
  width: 200px; 
  height: auto;
`;

export const Authentication = styled.img`
  width: 500px; 
  height: auto; 
`;

export const Text = styled.h2`
  color: #fff;
  margin-left: 10%;
`;

export const Description = styled.h3`
  color: #fff;
  margin-left: 10%;
`;

export const Form = styled.form`
  width: 70%;
  max-width: 400px;
  padding: 40px;
  background-color: #FFF;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 20px;
  color: #333;
`;

export const Input = styled.input`
  margin-bottom: 10px;
  padding: 5px;
  height: 35px;
  width: 400px;
  border: 1px solid #ccc; 
  font-size: 16px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #5187F0;
  color: #FFF;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 10px;
  height: 50px;
  &:hover {
    background-color: #4169E1;
  }
`;

export const ButtonRegister = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-top: 10px;
  cursor: pointer;
  border: 1px solid;
  width: 30%;
  height: 30px;
  font-weight: bold;
  padding: 1rem 1rem;
  margin-left: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
