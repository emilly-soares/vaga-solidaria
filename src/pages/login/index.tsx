import React, { FormEvent } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../../services/firebaseConnection';
import { useUser } from '../../contexts/UserContext';
import logoImg from '../../assets/logo.png';
import authentication from '../../assets/authentication.png';
import { FaGoogle } from 'react-icons/fa';
import * as S from './style';

export const Login: React.FC = () => {
    
    const { email, setEmail, password, setPassword, setName } = useUser();
    const navigate = useNavigate();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!email || !password) {
            alert('Preencha todos os campos');
            return;
        }

        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const user = result.user;
            if (user.displayName) {
                setName(user.displayName);
                console.log("Logado com sucesso!");
                navigate('/');
            } else {
                console.log("Nome do usuário não disponível.");
                navigate('/profile');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            if (user.displayName) {
                setName(user.displayName);
                console.log("Logado com sucesso com o Google!");
                navigate('/');
            } else {
                console.log("Nome do usuário não disponível.");
                navigate('/profile');
            }
        } catch (error) {
            console.error('Erro ao fazer login com o Google:', error);
        }
    };

    return (
        <S.Container>

            <S.LeftSection>

                <S.GroupLogo to="/">
                    <S.Logo src={logoImg} alt="Logo VagaSolidária" />
                    <S.PlatformTitle>VagaSolidária</S.PlatformTitle>
                </S.GroupLogo>

                <S.ImageContainer>
                    <S.Authentication src={authentication} alt="Autenticação" />
                </S.ImageContainer>

                <S.Text>Não tem cadastro? </S.Text>
                <S.ButtonRegister to="/register">Cadastre-se</S.ButtonRegister>
                <S.Description>Você encontrará oportunidades para impactar positivamente a comunidade</S.Description>

            </S.LeftSection>


            <S.RightSection>

                <S.Form onSubmit={handleSubmit}>
                    <S.Title>Login</S.Title>
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

                    <S.Button type="submit">Login</S.Button>

                    <S.GoogleButton type="button" onClick={handleGoogleLogin}> <FaGoogle style={{ marginRight: '8px' }} />  Login com Google</S.GoogleButton>

                </S.Form>
            </S.RightSection>
        </S.Container>
    );
};
