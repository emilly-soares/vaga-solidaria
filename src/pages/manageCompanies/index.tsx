import React, { useState, useEffect } from 'react';
import { db, storage } from '../../services/firebaseConnection';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as S from './style';

export interface Company {
    id: string;
    cnpj: string;
    phone: string;
    ie: string;
    corporateReason: string;
    fantasyName: string;
    street: string;
    numberStreet: string;
    neighborhood: string;
    logo: string;
}

const ManageCompaniesForm: React.FC = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [cnpj, setCnpj] = useState('');
    const [phone, setPhone] = useState('');
    const [ie, setIe] = useState('');
    const [corporateReason, setCorporateReason] = useState('');
    const [fantasyName, setFantasyName] = useState('');
    const [street, setStreet] = useState('');
    const [numberStreet, setNumberStreet] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [logo, setLogo] = useState<File | null>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        loadCompanies();
    }, []);

    const loadCompanies = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'companies'));
            const companiesList: Company[] = [];
            querySnapshot.forEach((doc) => {
                companiesList.push({ id: doc.id, ...doc.data() } as Company);
            });
            setCompanies(companiesList);
        } catch (error) {
            console.error('Erro ao carregar empresas:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            let logoUrl = '';
            if (logo) {
                const logoRef = ref(storage, `logos/${logo.name}`);
                await uploadBytes(logoRef, logo);
                logoUrl = await getDownloadURL(logoRef);
            }

            const companyData = {
                cnpj,
                phone,
                ie,
                corporateReason,
                fantasyName,
                street,
                numberStreet,
                neighborhood,
                logo: logoUrl,
            };

            if (editingCompanyId) {
                const companyRef = doc(db, 'companies', editingCompanyId);
                await updateDoc(companyRef, companyData);
            } else {
                await addDoc(collection(db, 'companies'), companyData);
            }

            setCnpj('');
            setPhone('');
            setIe('');
            setCorporateReason('');
            setFantasyName('');
            setStreet('');
            setNumberStreet('');
            setNeighborhood('');
            setLogo(null);
            setEditingCompanyId(null);
            loadCompanies();
        } catch (error) {
            console.error('Erro ao criar/editar empresa:', error);
            setError('Erro ao criar/editar empresa');
        }
    };

    const handleDeleteCompany = async (companyId: string) => {
        try {
            await deleteDoc(doc(db, 'companies', companyId));
            setConfirmDeleteModalOpen(false); 
            loadCompanies();
        } catch (error) {
            console.error('Erro ao excluir empresa:', error);
            setError('Erro ao excluir empresa');
        }
    };

    const [editingCompanyId, setEditingCompanyId] = useState<string | null>(null);
    const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState<boolean>(false);
    const [companyIdToDelete, setCompanyIdToDelete] = useState<string>('');

    const handleEditCompany = (company: Company) => {
        setCnpj(company.cnpj);
        setPhone(company.phone);
        setIe(company.ie);
        setCorporateReason(company.corporateReason);
        setFantasyName(company.fantasyName);
        setStreet(company.street);
        setNumberStreet(company.numberStreet);
        setNeighborhood(company.neighborhood);
        setEditingCompanyId(company.id);
    };

    const openConfirmDeleteModal = (companyId: string) => {
        setCompanyIdToDelete(companyId);
        setConfirmDeleteModalOpen(true);
    };

    const closeConfirmDeleteModal = () => {
        setConfirmDeleteModalOpen(false);
        setCompanyIdToDelete('');
    };

    return (
        <S.Container>
            {confirmDeleteModalOpen && (
                <S.Modal>
                    <S.ModalContent>
                        <p>Você deseja realmente excluir esta empresa?</p>
                        <S.ModalActions>
                            <S.ActionButton onClick={() => handleDeleteCompany(companyIdToDelete)}>Sim</S.ActionButton>
                            <S.ActionButton onClick={closeConfirmDeleteModal}>Cancelar</S.ActionButton>
                        </S.ModalActions>
                    </S.ModalContent>
                </S.Modal>
            )}
            <S.CompanyList>
                <S.VacancyTable>
                    <thead>
                        <tr>
                            <S.TableHeader>CNPJ</S.TableHeader>
                            <S.TableHeader>Nome Fantasia</S.TableHeader>
                            <S.TableHeader>Razão Social</S.TableHeader>
                            <S.TableHeader>Inscrição Estadual</S.TableHeader>
                            <S.TableHeader>Telefone</S.TableHeader>
                            <S.TableHeader>Rua</S.TableHeader>
                            <S.TableHeader>Número</S.TableHeader>
                            <S.TableHeader>Bairro</S.TableHeader>
                            <S.TableHeader>Logo</S.TableHeader>
                            <S.TableHeader>Ações</S.TableHeader>
                        </tr>
                    </thead>
                    <S.CompanyTableBody>
                        {companies.map((company) => (
                            <S.TableRow key={company.id}>
                                <S.TableCell>{company.cnpj}</S.TableCell>
                                <S.TableCell>{company.fantasyName}</S.TableCell>
                                <S.TableCell>{company.corporateReason}</S.TableCell>
                                <S.TableCell>{company.ie}</S.TableCell>
                                <S.TableCell>{company.phone}</S.TableCell>
                                <S.TableCell>{company.street}</S.TableCell>
                                <S.TableCell>{company.numberStreet}</S.TableCell>
                                <S.TableCell>{company.neighborhood}</S.TableCell>
                                <S.TableCell>
                                    <img src={company.logo} alt="Logo da Empresa" style={{ width: '50px', height: '50px' }} />
                                </S.TableCell>
                                <S.TableCell>
                                    <S.ActionButtons onClick={() => handleEditCompany(company)}>Editar</S.ActionButtons>
                                    <S.ActionButtons onClick={() => openConfirmDeleteModal(company.id)}>Excluir</S.ActionButtons>
                                </S.TableCell>
                            </S.TableRow>
                        ))}
                    </S.CompanyTableBody>
                </S.VacancyTable>
            </S.CompanyList>
            <S.FormContainer onSubmit={handleSubmit}>
                <S.Title>Formulário</S.Title>
                <S.InputField
                    type="text"
                    name="cnpj"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    placeholder="CNPJ"
                    required
                />
                <S.InputField
                    type="text"
                    name="fantasyName"
                    value={fantasyName}
                    onChange={(e) => setFantasyName(e.target.value)}
                    placeholder="Nome Fantasia"
                    required
                />
                <S.InputField
                    type="text"
                    name="corporateReason"
                    value={corporateReason}
                    onChange={(e) => setCorporateReason(e.target.value)}
                    placeholder="Razão Social"
                    required
                />
                <S.InputField
                    type="text"
                    name="ie"
                    value={ie}
                    onChange={(e) => setIe(e.target.value)}
                    placeholder="Inscrição Estadual"
                    required
                />
                <S.InputField
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Telefone"
                    required
                />
                <S.InputField
                    type="text"
                    name="street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Rua"
                    required
                />
                <S.InputField
                    type="text"
                    name="numberStreet"
                    value={numberStreet}
                    onChange={(e) => setNumberStreet(e.target.value)}
                    placeholder="Número"
                    required
                />
                <S.InputField
                    type="text"
                    name="neighborhood"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    placeholder="Bairro"
                    required
                />
                <S.InputField
                    type="file"
                    name="logo"
                    onChange={(e) => setLogo(e.target.files ? e.target.files[0] : null)}
                />
                <S.SubmitButton type="submit">{editingCompanyId ? 'Salvar Alterações' : 'Adicionar Empresa'}</S.SubmitButton>
                {error && <S.Error>{error}</S.Error>}
            </S.FormContainer>
        </S.Container>
    );
};

export default ManageCompaniesForm;
