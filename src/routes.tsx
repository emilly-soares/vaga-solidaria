import { createBrowserRouter } from 'react-router-dom';
//import { UserProvider } from './contexts/UserContext';
import { Login } from './pages/login';
import { Register } from './pages/register';


const router = createBrowserRouter([
    {

        // element: (
        //     <UserProvider>
        //          <Layout />
        //     </UserProvider>
        // ),

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
])
export { router }