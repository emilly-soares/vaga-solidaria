import { useUser } from '../../contexts/UserContext';
import logoImg from '../../assets/logo.png';
import * as S from './style';

export function Header() {
    const { name } = useUser();

    return (
        <S.HeaderContainer>
            <S.GroupLogo to="/">
                <S.Logo src={logoImg} alt="Logo VagaSolidária" />
                <S.PlatformTitle>VagaSolidária</S.PlatformTitle>
            </S.GroupLogo>
            <S.LinksContainer>
                <S.CenteredLink to="/vacancies">Oportunidades</S.CenteredLink>
                <S.CenteredLink to="/companies">Empresas</S.CenteredLink>
                {name ? (
                    <S.StyledLink to="/login" as="span">Olá, {name}</S.StyledLink>
                ) : (
                    <>
                        <S.StyledLink to="/login">Login</S.StyledLink>
                        <S.StyledLink to="/register">Cadastre-se</S.StyledLink>
                    </>
                )}
            </S.LinksContainer>
        </S.HeaderContainer>
    );
}
