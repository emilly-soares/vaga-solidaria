import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useCompany } from '../../contexts/CompanyContext';
import * as S from './style';

interface Company {
  id: string;
  cnpj: string;
  phone: string;
  ie: string;
  corporateReason: string;
  fantasyName: string;
  street: string;
  numberStreet: string;
  neighborhood: string;
  userId: string;
  logoUrl?: string;
}

const Company: React.FC = () => {
    const { companies } = useCompany();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(companies);

    useEffect(() => {
        setFilteredCompanies(
            companies.filter((company: Company) =>
                company.corporateReason.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, companies]);

    const handleViewOpportunities = (companyId: string) => {
        // navigate(/opportunities)
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
                        placeholder="Pesquisar pela razão social..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch color="white" size={20} style={{ margin: '0 10px' }} />
                </S.SearchWrapper>
            </S.SearchContainer>

            <S.Container>
                {filteredCompanies.map((company: Company) => (
                    <S.Card key={company.id}>
                        {company.logoUrl && (
                            <S.CardImage
                                src={company.logoUrl}
                                alt={`${company.fantasyName} logo`}
                                onError={handleImageError}
                            />
                        )}
                        <S.CardContent>
                            <S.CardTitle>{company.fantasyName}</S.CardTitle>
                            <S.CardText>{company.phone}</S.CardText>
                            <S.CardText>{`${company.street}, ${company.numberStreet}, ${company.neighborhood}`}</S.CardText>
                            <S.ViewButton onClick={() => handleViewOpportunities(company.id)}>Ver Oportunidades</S.ViewButton>
                        </S.CardContent>
                    </S.Card>
                ))}
            </S.Container>
        </>
    );
};

export default Company;
