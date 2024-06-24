import React, { useState } from 'react';
import { useVacancy, Vacancy } from '../../contexts/VacancyContext';
import * as S from './style';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const ManageVacanciesForm: React.FC = () => {

    const { vacancies, addOrUpdateVacancy, deleteVacancy, companyId } = useVacancy();

    const [editingVacancyId, setEditingVacancyId] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    
    const [status, setStatus] = useState(true);
    const [description, setDescription] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [workload, setWorkload] = useState('');
    const [responsibilities, setResponsibilities] = useState('');
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!companyId) {
            setError('Empresa não encontrada');
            return;
        }

        const vacancyData: Vacancy = {
            id: editingVacancyId ?? '',
            status,
            description,
            jobTitle,
            company_id: companyId,
            workload,
            responsibilities
        };

        try {
            await addOrUpdateVacancy(vacancyData);

            setStatus(true);
            setDescription('');
            setJobTitle('');
            setWorkload('');
            setResponsibilities('');
            setEditingVacancyId(null);
            setIsEditing(false);

        } catch (error) {
            console.error('Erro ao criar/editar vaga:', error);
        }
    };

    const handleEditVacancy = (vacancyId: string) => {

        const vacancyToEdit = vacancies.find((vacancy: Vacancy) => vacancy.id === vacancyId);

        if (vacancyToEdit) {
            setStatus(vacancyToEdit.status);
            setDescription(vacancyToEdit.description);
            setJobTitle(vacancyToEdit.jobTitle);
            setWorkload(vacancyToEdit.workload);
            setResponsibilities(vacancyToEdit.responsibilities);
            setEditingVacancyId(vacancyId);
            setIsEditing(true);
        }
    };

    return (
        <>
            <S.Title>Gerenciar Vagas</S.Title>
            <S.Container>

                <S.FormContainer onSubmit={handleSubmit}>
                    <S.SelectField name="status" value={status.toString()} onChange={(e) => setStatus(e.target.value === 'true')} required>
                        <option value="true">Ativa</option>
                        <option value="false">Inativa</option>
                    </S.SelectField>
                    <S.InputField type="text" name="jobTitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Título do Cargo" required />
                    <S.InputField type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição" required />
                    <S.InputField type="text" name="workload" value={workload} onChange={(e) => setWorkload(e.target.value)} placeholder="Carga Horária" required />
                    <S.TextareaField
                        name="responsibilities"
                        value={responsibilities}
                        onChange={(e) => setResponsibilities(e.target.value)}
                        placeholder="Responsabilidades (ex.: - Planejar e preparar atividades recreativas / Interagir e engajar/ Colaborar com outros voluntários)"
                        required
                    />
                    {error && <S.Error>{error}</S.Error>}
                    <S.SubmitButton type="submit">{isEditing ? 'Editar Vaga' : 'Cadastrar Vaga'}</S.SubmitButton>
                </S.FormContainer>

                <S.VacancyList>
                    <S.VacancyTable>
                        <thead>
                            <tr>
                                <S.TableHeader>ID</S.TableHeader>
                                <S.TableHeader>Status</S.TableHeader>
                                <S.TableHeader>Título do Cargo</S.TableHeader>
                                <S.TableHeader>Descrição</S.TableHeader>
                                <S.TableHeader>Carga Horária</S.TableHeader>
                                <S.TableHeader>Ações</S.TableHeader>
                            </tr>
                        </thead>
                        <S.VacancyTableBody>
                            {vacancies.map((vacancy: Vacancy, index: number) => (
                                <S.TableRow key={vacancy.id} style={{ backgroundColor: index % 2 === 0 ? '#f4f4f4' : 'white' }}>
                                    <S.TableCell>{vacancy.id}</S.TableCell>
                                    <S.TableCell>{vacancy.status ? 'Ativa' : 'Inativa'}</S.TableCell>
                                    <S.TableCell>{vacancy.jobTitle}</S.TableCell>
                                    <S.TableCell>{vacancy.description}</S.TableCell>
                                    <S.TableCell>{vacancy.workload}</S.TableCell>
                                    <S.TableCell>
                                        <S.ActionButton onClick={() => deleteVacancy(vacancy.id!)}><FaTrashAlt /></S.ActionButton>
                                        <S.ActionButton onClick={() => handleEditVacancy(vacancy.id!)}><FaEdit /></S.ActionButton>
                                    </S.TableCell>
                                </S.TableRow>
                            ))}
                        </S.VacancyTableBody>
                    </S.VacancyTable>
                </S.VacancyList>


            </S.Container>
        </>
    );
};

export default ManageVacanciesForm;
