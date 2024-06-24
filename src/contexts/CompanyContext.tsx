import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { db } from '../services/firebaseConnection';
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
  userId: string;
  logoUrl?: string;
}

interface CompanyContextData {
  companies: Company[];
  setCompanies: Dispatch<SetStateAction<Company[]>>;
  loadCompanies: () => void;
}

export const CompanyContext = createContext<CompanyContextData>({
  companies: [],
  setCompanies: () => {},
  loadCompanies: () => {},
});

export const CompanyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [companies, setCompanies] = useState<Company[]>([]);

  const loadCompanies = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'companies'));
      const storage = getStorage();
      const companyList = await Promise.all(querySnapshot.docs.map(async (doc) => {
        const data = doc.data() as Omit<Company, 'id' | 'logoUrl'> & { logo?: string };
        let logoUrl: string | undefined;
        if (data.logo) {
          logoUrl = await getDownloadURL(ref(storage, data.logo));
        }
        return { id: doc.id, ...data, logoUrl };
      }));
      setCompanies(companyList);
    } catch (error) {
      console.error('Erro ao carregar empresas:', error);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  return (
    <CompanyContext.Provider value={{ companies, setCompanies, loadCompanies }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
};
