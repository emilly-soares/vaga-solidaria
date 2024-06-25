import { render, fireEvent, waitFor } from '@testing-library/react';
import { Login } from './index';
import { UserProvider } from '../../contexts/UserContext';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('firebase/auth', () => {
  const actualAuth = jest.requireActual('firebase/auth');
  return {
    ...actualAuth,
    getAuth: jest.fn(() => ({
      signInWithEmailAndPassword: jest.fn(),
      signInWithPopup: jest.fn(),
    })),
  };
});

describe('Login', () => {
  const mockSignInWithEmailAndPassword = require('firebase/auth').signInWithEmailAndPassword;
  const mockSignInWithPopup = require('firebase/auth').signInWithPopup;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderLogin = () => {
    return render(
      <UserProvider>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </UserProvider>
    );
  };

  test('should update email and password input fields', () => {
    const { getByLabelText } = renderLogin();
    
    const emailInput = getByLabelText('Email de usuário:') as HTMLInputElement;
    const passwordInput = getByLabelText('Senha:') as HTMLInputElement;
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('should call signInWithEmailAndPassword on form submit', async () => {
    mockSignInWithEmailAndPassword.mockResolvedValue({
      user: { email: 'test@example.com', displayName: null }
    });

    const { getByLabelText, getByText } = renderLogin();
    
    fireEvent.change(getByLabelText('Email de usuário:') as HTMLInputElement, { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Senha:') as HTMLInputElement, { target: { value: 'password123' } });
    
    fireEvent.click(getByText('Login'));

    await waitFor(() => {
      expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'test@example.com', 'password123');
    });
  });

  test('should set name based on email if displayName is null', async () => {
    mockSignInWithEmailAndPassword.mockResolvedValue({
      user: { email: 'test@example.com', displayName: null }
    });

    const { getByLabelText, getByText } = renderLogin();

    fireEvent.change(getByLabelText('Email de usuário:') as HTMLInputElement, { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Senha:') as HTMLInputElement, { target: { value: 'password123' } });

    fireEvent.click(getByText('Login'));

    await waitFor(() => {
      expect(mockSignInWithEmailAndPassword).toHaveBeenCalled();
    });
  });

  test('should call signInWithPopup on Google login button click', async () => {
    mockSignInWithPopup.mockResolvedValue({
      user: { email: 'test@example.com', displayName: 'Test User' }
    });

    const { getByText } = renderLogin();
    
    fireEvent.click(getByText(/Login com Google/i));

    await waitFor(() => {
      expect(mockSignInWithPopup).toHaveBeenCalled();
    });
  });
});
