import { createContext, useContext, useState, type PropsWithChildren } from 'react';

export const demoLogin = { email: 'admin@almox.app', password: 'Almox123' };
interface AuthState {
  signedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}
const AuthContext = createContext<AuthState | null>(null);
export function AuthProvider({ children }: PropsWithChildren) {
  const [signedIn, setSignedIn] = useState(false);
  async function login(email: string, password: string) {
    await new Promise(resolve => setTimeout(resolve, 600));
    const ok = email.trim().toLowerCase() === demoLogin.email && password === demoLogin.password;
    if (ok) setSignedIn(true);
    return ok;
  }
  return <AuthContext.Provider value={{ signedIn, login, logout: () => setSignedIn(false) }}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('AuthProvider ausente.');
  return value;
}
