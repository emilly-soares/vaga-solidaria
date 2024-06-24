import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useVacancy, Vacancy, Company } from '../../contexts/VacancyContext'; 
import * as S from './style';


const VacancyDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { getVacancyById, getCompanyById } = useVacancy(); 
    const [vacancy, setVacancy] = useState<Vacancy | null>(null);
    const [company, setCompany] = useState<Company | null>(null);
    const [availability, setAvailability] = useState<string>('');

    
    useEffect(() => {
        if (id) { 
            const vacancyData = getVacancyById(id);
            if (vacancyData) {
                setVacancy(vacancyData);
                const companyData = getCompanyById(vacancyData.idCompany);
                if (companyData) {
                    setCompany(companyData);
                } else {
                    setCompany(null);
                }
            } else {
                setVacancy(null);
                setCompany(null);
            }
        }
    }, [id, getVacancyById, getCompanyById]);


    const handleApply = () => {
        console.log('Candidatar-se com disponibilidade:', availability);
    };

    const address = company ? `${company.street} ${company.numberStreet}, ${company.neighborhood}` : '';
    console.log(address);

    return (
        <>
            <S.Container>
                <S.SectionTitle>
                    <span>Sobre a </span>
                    <span className="highlight">Oportunidade</span>
                </S.SectionTitle>

                <S.DetailsContainer>
                    <S.DetailsLeft>
                        <S.JobTitleContainer>
                            <S.JobTitle>{vacancy?.jobTitle}</S.JobTitle>
                            <S.JobDetails> Presencial: {vacancy?.workload}</S.JobDetails>
                        </S.JobTitleContainer>

                        <S.Text>
                            Ao se tornar um {vacancy?.jobTitle}, você terá a oportunidade de contribuir para momentos inesquecíveis e experiências enriquecedoras para pessoas de todas as idades.
                        </S.Text>

                        <S.Text>
                            <strong>Sobre a Vaga:</strong> {vacancy?.description}
                        </S.Text>

                        <S.Text>
                            <strong>Responsabilidades:</strong> {vacancy?.responsibilities}
                        </S.Text>

                        <S.Text>
                            <strong>Benefícios:</strong>
                            <ul>
                                <li>Desenvolvimento de habilidades de liderança, comunicação e resolução de problemas.</li>
                                <li>Oportunidade de fazer parte de uma comunidade engajada e promover o bem-estar.</li>
                                <li>Satisfação pessoal ao ver o impacto positivo que suas atividades têm nas vidas dos participantes.</li>
                                <li>Certificado de voluntariado reconhecendo suas contribuições.</li>
                            </ul>
                            Se você está buscando uma maneira divertida e significativa de dedicar seu tempo, a vaga de {vacancy?.jobTitle} pode ser a escolha perfeita para você!
                        </S.Text>

                        <S.Text>
                            <strong>Como se Candidatar:</strong> Se você está animado para se juntar a nós como um {vacancy?.jobTitle}, descreva sua disponibilidade de horário, com o máximo de detalhes e clique no botão "Candidatar-se" abaixo.
                            Ficamos ansiosos para receber sua inscrição e explorar essa jornada juntos!
                        </S.Text>

                        <S.TextInput
                            type="text"
                            placeholder="Descreva sua disponibilidade de horário"
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value)}
                        />

                        <S.Button onClick={handleApply}>Candidatar-se</S.Button>
                    </S.DetailsLeft>

                    <S.DetailsRight>
                        <iframe
                            width="80%"
                            height="500"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBvynskStAY8dOhT8gw0DIaUDSm0fGgcPw&q=${encodeURIComponent(address)}`}
                        />

                        {company && (
                            <>
                                <S.CompanyInfo>
                                    <S.CompanyAddress>{address}, Nova Andradina - MS, 79750-000</S.CompanyAddress>
                                    <S.CompanyName>{company.fantasyName}</S.CompanyName>
                                    {company.logo && <S.CompanyLogo src={`http://localhost:3003/uploads/${company.logo}`} alt={`${company.fantasyName} logo`} />}
                                    <S.CompanyPhone href={`https://wa.me/${company.phone.replace(/\D/g, '')}`} target="_blank">
                                        {company.phone}
                                    </S.CompanyPhone>
                                </S.CompanyInfo>
                            </>
                        )}
                    </S.DetailsRight>
                </S.DetailsContainer>

         

                <S.FirstSection>
                    <S.Caption>Você encontrará oportunidades para impactar positivamente a comunidade!</S.Caption>
                    <S.RegisterButton to='/register'>Cadastre-se</S.RegisterButton>
                </S.FirstSection>
            </S.Container>
 
        </>
    );
};

export default VacancyDetails;
