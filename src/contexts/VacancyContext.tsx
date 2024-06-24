import { createContext, useState, ReactNode, Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { db } from '../services/firebaseConnection';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';


export interface Vacancy {
  id: string;
  status: boolean;
  description: string;
  jobTitle: string;
  idCompany: string;
  workload: string;
  responsibilities: string;
  companyId: string;
}

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

interface VacancyContextData {
  vacancies: Vacancy[];
  companies: Company[];
  setVacancies: Dispatch<SetStateAction<Vacancy[]>>;
  loadVacancies: () => Promise<void>;
  addVacancy: (vacancy: Omit<Vacancy, 'id'>) => Promise<void>;
  updateVacancy: (id: string, vacancy: Omit<Vacancy, 'id'>) => Promise<void>;
  deleteVacancy: (id: string) => Promise<void>;
  getVacancyById: (id: string) => Vacancy | undefined;
  getCompanyById: (id: string) => Company | undefined;
}

const VacancyContext = createContext<VacancyContextData | undefined>(undefined);

export const VacancyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);

  const loadVacancies = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'vacancies'));
      const vacanciesList: Vacancy[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      } as Vacancy));
      setVacancies(vacanciesList);
    } catch (error) {
      console.error('Erro ao carregar vagas:', error);
    }
  };

  const addVacancy = async (vacancy: Omit<Vacancy, 'id'>) => {
    try {
      await addDoc(collection(db, 'vacancies'), vacancy);
      await loadVacancies();
    } catch (error) {
      console.error('Erro ao adicionar vaga:', error);
    }
  };

  const updateVacancy = async (id: string, vacancy: Omit<Vacancy, 'id'>) => {
    try {
      const vacancyDocRef = doc(db, 'vacancies', id);
      await updateDoc(vacancyDocRef, vacancy);
      await loadVacancies();
    } catch (error) {
      console.error('Erro ao atualizar vaga:', error);
    }
  };

  const deleteVacancy = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'vacancies', id));
      await loadVacancies();
    } catch (error) {
      console.error('Erro ao excluir vaga:', error);
    }
  };

  const getVacancyById = (id: string): Vacancy | undefined => {
    return vacancies.find(vacancy => vacancy.id === id);
  };

  const getCompanyById = (id: string): Company | undefined => {
    return companies.find(company => company.id === id);
  };

  useEffect(() => {
    loadVacancies();
  }, []);

  return (
    <VacancyContext.Provider value={{ vacancies, companies, setVacancies, loadVacancies, addVacancy, updateVacancy, deleteVacancy, getVacancyById, getCompanyById }}>
      {children}
    </VacancyContext.Provider>
  );
};

export const useVacancy = (): VacancyContextData => {
  const context = useContext(VacancyContext);
  if (!context) {
    throw new Error('useVacancy must be used within a VacancyProvider');
  }
  return context;
};

export default VacancyContext;
