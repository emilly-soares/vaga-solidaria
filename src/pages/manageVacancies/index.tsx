import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebaseConnection';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { useVacancy, Vacancy } from '../../contexts/VacancyContext';
import * as S from './style';

export interface Company {
    id: string;
    fantasyName: string;
}

const ManageVacanciesForm: React.FC = () => {
    const { vacancies, loadVacancies, addVacancy, updateVacancy, deleteVacancy } = useVacancy();
    const [companies, setCompanies] = useState<Company[]>([]);

    const [status, setStatus] = useState<boolean>(false);
    const [description, setDescription] = useState<string>('');
    const [jobTitle, setJobTitle] = useState<string>('');
    const [workload, setWorkload] = useState<string>('');
    const [responsibilities, setResponsibilities] = useState<string>('');
    const [idCompany, setIdCompany] = useState<string>('');

    const [error, setError] = useState<string>('');
    const [editingVacancyId, setEditingVacancyId] = useState<string | null>(null);

    const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState<boolean>(false);
    const [vacancyIdToDelete, setVacancyIdToDelete] = useState<string>('');

    useEffect(() => {
        loadVacancies();
        loadCompanies();
    }, []);

    const loadCompanies = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'companies'));
            const companiesList: Company[] = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            } as Company));
            setCompanies(companiesList);
        } catch (error) {
            console.error('Erro ao carregar empresas:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const vacancyData = {
            status,
            description,
            jobTitle,
            workload,
            responsibilities,
            idCompany,
        };

        try {
            if (editingVacancyId) {
                await updateVacancy(editingVacancyId, vacancyData);
            } else {
                await addVacancy(vacancyData);
            }

            setStatus(false);
            setDescription('');
            setJobTitle('');
            setWorkload('');
            setResponsibilities('');
            setIdCompany('');
            setEditingVacancyId(null);
        } catch (error) {
            console.error('Erro ao adicionar/editar vaga:', error);
            setError('Erro ao adicionar/editar vaga');
        }
    };

    const handleEditVacancy = (vacancy: Vacancy) => {
        setStatus(vacancy.status);
        setDescription(vacancy.description);
        setJobTitle(vacancy.jobTitle);
        setWorkload(vacancy.workload);
        setResponsibilities(vacancy.responsibilities);
        setIdCompany(vacancy.idCompany);
        setEditingVacancyId(vacancy.id);
    };

    const handleDeleteVacancy = async (vacancyId: string) => {
        try {
            await deleteVacancy(vacancyId); 
            closeConfirmDeleteModal();
            loadVacancies(); 
        } catch (error) {
            console.error('Erro ao excluir vaga:', error);
            setError('Erro ao excluir vaga');
        }
    };

    const openConfirmDeleteModal = (vacancyId: string) => {
        setVacancyIdToDelete(vacancyId);
        setConfirmDeleteModalOpen(true);
    };

    const closeConfirmDeleteModal = () => {
        setConfirmDeleteModalOpen(false);
        setVacancyIdToDelete('');
    };

    return (
        <S.Container>

            {confirmDeleteModalOpen && (
                <S.Modal>
                    <S.ModalContent>
                        <p>Você deseja realmente excluir esta vaga?</p>
                        <S.ModalActions>
                            <S.ActionButton onClick={() => handleDeleteVacancy(vacancyIdToDelete)}>Sim</S.ActionButton>
                            <S.ActionButton onClick={closeConfirmDeleteModal}>Cancelar</S.ActionButton>
                        </S.ModalActions>
                    </S.ModalContent>
                </S.Modal>
            )}


            <S.VacancyList>
                <S.VacancyTable>
                    <thead>
                        <tr>
                            <S.TableHeader>Status</S.TableHeader>
                            <S.TableHeader>Descrição</S.TableHeader>
                            <S.TableHeader>Título do Trabalho</S.TableHeader>
                            <S.TableHeader>Empresa</S.TableHeader>
                            <S.TableHeader>Carga Horária</S.TableHeader>
                            <S.TableHeader>Responsabilidades</S.TableHeader>
                            <S.TableHeader>Ações</S.TableHeader>
                        </tr>
                    </thead>
                    <S.VacancyTableBody>
                        {vacancies.map((vacancy) => (
                            <S.TableRow key={vacancy.id}>
                                <S.TableCell>{vacancy.status ? 'Ativo' : 'Inativo'}</S.TableCell>
                                <S.TableCell>{vacancy.description}</S.TableCell>
                                <S.TableCell>{vacancy.jobTitle}</S.TableCell>
                                <S.TableCell>{companies.find(company => company.id === vacancy.idCompany)?.fantasyName || 'N/A'}</S.TableCell>
                                <S.TableCell>{vacancy.workload}</S.TableCell>
                                <S.TableCell>{vacancy.responsibilities}</S.TableCell>
                                <S.TableCell>
                                    <S.ActionButtons onClick={() => handleEditVacancy(vacancy)}>Editar</S.ActionButtons>
                                    <S.ActionButtons onClick={() => openConfirmDeleteModal(vacancy.id)}>Excluir</S.ActionButtons>
                                </S.TableCell>
                            </S.TableRow>
                        ))}
                    </S.VacancyTableBody>
                </S.VacancyTable>
            </S.VacancyList>

            <S.FormContainer onSubmit={handleSubmit}>
                <S.Title>Formulário de Vagas</S.Title>
                <S.SelectField name="status" value={status.toString()} onChange={(e) => setStatus(e.target.value === 'true')} required>
                    <option value="true">Ativa</option>
                    <option value="false">Inativa</option>
                </S.SelectField>
                <S.InputField
                    type="text"
                    name="jobTitle"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="Título do Trabalho"
                    required
                />
                <S.InputField
                    type="text"
                    name="workload"
                    value={workload}
                    onChange={(e) => setWorkload(e.target.value)}
                    placeholder="Carga Horária"
                    required
                />
                <S.TextareaField
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descrição"
                    required
                />
                <S.SelectField
                    name="idCompany"
                    value={idCompany}
                    onChange={(e) => setIdCompany(e.target.value)}
                    required
                >
                    <option value="">Selecione uma Empresa</option>
                    {companies.map((company) => (
                        <option key={company.id} value={company.id}>
                            {company.fantasyName}
                        </option>
                    ))}
                </S.SelectField>
                <S.TextareaField
                    name="responsibilities"
                    value={responsibilities}
                    onChange={(e) => setResponsibilities(e.target.value)}
                    placeholder="Responsabilidades"
                    required
                />
                <S.SubmitButton type="submit">{editingVacancyId ? 'Salvar Alterações' : 'Adicionar Vaga'}</S.SubmitButton>
                {error && <S.Error>{error}</S.Error>}
            </S.FormContainer>
        </S.Container>
    );
};

export default ManageVacanciesForm;
