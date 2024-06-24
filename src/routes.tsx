import { createBrowserRouter } from 'react-router-dom';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { UserProvider } from './contexts/UserContext';
import { Layout } from './components/layout';
import ManageCompaniesForm from './pages/manageCompanies';
import Home from './pages/Home';
import { CompanyProvider } from './contexts/CompanyContext';
import { VacancyProvider } from './contexts/VacancyContext';
import Companies from './pages/Companies';
import Vacancies from "./pages/Vacancies"
import ManageVacanciesForm from './pages/manageVacancies';
import VacancyDetails from './pages/VacancyDetails';
import { Outlet } from "react-router-dom";
const router = createBrowserRouter([
    {
        element: (
            <CompanyProvider>
                <VacancyProvider>
                    <UserProvider>
                        <Layout />
                    </UserProvider>
                </VacancyProvider>
            </CompanyProvider>
        ),
        children: [
            {
                path: '/vacancy',
                element: <ManageVacanciesForm />
            },
            {
                path: '/company',
                element: <ManageCompaniesForm />
            },
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/companies',
                element: <Companies />
            },
            {
                path: '/vacancies',
                element: <Vacancies />
            },
            {
                path: '/vacancy/:id',
                element: <VacancyDetails />
            }
        ]
    },
    {
        element: (
            <UserProvider>
                <Outlet />
            </UserProvider>
        ),
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            }
        ]
    }
]);

export { router };
