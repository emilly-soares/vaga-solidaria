import React, { FormEvent, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebaseConnection';
import authentication from '../../assets/authentication.png';
import * as S from './style';
import { useUser } from '../../contexts/UserContext';
import logoImg from '../../assets/logo.png';

export const Register: React.FC = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');

    const navigate = useNavigate();

    const { setName: setContextName, setEmail: setContextEmail } = useUser();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!email || !password || !name) {
            alert('Preencha todos os campos Obrigatórios');
            return;
        }

        try {

            const result = await createUserWithEmailAndPassword(auth, email, password);

            const user = result.user;

            await updateProfile(user, { displayName: name });

            setContextName(name);
            setContextEmail(email);

            console.log("Usuário cadastrado com sucesso!");
            navigate('/');
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
        }
    };

    return (

        <S.Container>

            <S.LeftSection>

                <S.GroupLogo to="/" >
                    <S.Logo src={logoImg} alt="Logo VagaSolidária" />
                    <S.PlatformTitle>VagaSolidária</S.PlatformTitle>
                </S.GroupLogo>

                <S.ImageContainer>
                    <S.Authentication src={authentication} alt="Autenticação" />
                </S.ImageContainer>

                <S.Text>Já tem cadastro? </S.Text>
                <S.ButtonRegister to="/login">Acessar</S.ButtonRegister>
                <S.Description>Você encontrará oportunidades para impactar positivamente a comunidade</S.Description>

            </S.LeftSection>


            <S.RightSection>

            <S.Form onSubmit={handleSubmit}>
                <S.Title>Cadastro</S.Title>
                <S.FormGroup>
                    <S.Label htmlFor="name">Nome:</S.Label>
                    <S.Input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                    />
                </S.FormGroup>
                <S.FormGroup>
                    <S.Label htmlFor="email">Email de usuário:</S.Label>
                    <S.Input
                        type="text"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </S.FormGroup>
                <S.FormGroup>
                    <S.Label htmlFor="password">Senha:</S.Label>
                    <S.Input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </S.FormGroup>
                <S.Button type="submit">Cadastrar</S.Button>
            </S.Form>

            </S.RightSection>

        </S.Container>
    );
};
