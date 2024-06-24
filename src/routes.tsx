import { createBrowserRouter } from 'react-router-dom';
import { Login } from './pages/login';
import { Register } from './pages/register';
import ManageVacanciesForm from './pages/manageVacancy';
import { UserProvider } from './contexts/UserContext';
import { Layout } from './components/layout';
import ManageCompaniesForm from './pages/manageCompanies';
import Home from './pages/Home';
import { CompanyProvider } from './contexts/CompanyContext';
import { VacancyProvider } from './contexts/VacancyContext';
import Companies from './pages/Companies';

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
            }
        ]
    },
    {

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
