import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useVacancy, Vacancy } from '../../contexts/VacancyContext'; 
import * as S from './style'; 
import { useNavigate } from 'react-router-dom';


const VacancyList: React.FC = () => {
    const { vacancies } = useVacancy(); 
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredVacancies, setFilteredVacancies] = useState<Vacancy[]>(vacancies);
    const navigate = useNavigate();
    useEffect(() => {
        setFilteredVacancies(
            vacancies.filter((vacancy: Vacancy) =>
                vacancy.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, vacancies]);

    const handleViewVacancy = (vacancyId: string) => {
        navigate(`/vacancy/${vacancyId}`)
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = '/path/to/default-image.png';
    };

    return (
        <>
            <S.SearchContainer>
                <S.SearchWrapper>
                    <S.SearchInput
                        type="text"
                        placeholder="Pesquisar pelo título da vaga..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch color="white" size={20} style={{ margin: '0 10px' }} />
                </S.SearchWrapper>
            </S.SearchContainer>

            <S.Container>
                {filteredVacancies.map((vacancy: Vacancy) => (
                    <S.Card key={vacancy.id}>
                     
                        <S.CardContent>
                            <S.CardTitle>{vacancy.jobTitle}</S.CardTitle>
                            <S.CardText>{vacancy.description}</S.CardText>
                            <S.ViewButton onClick={() => handleViewVacancy(vacancy.id)}>Ver Detalhes da Vaga</S.ViewButton>
                        </S.CardContent>
                    </S.Card>
                ))}
            </S.Container>
        </>
    );
};

export default VacancyList;
