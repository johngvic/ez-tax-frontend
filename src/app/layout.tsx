import { AuthProvider } from '@/contexts/AuthContext';
import { ClerkProvider } from '@clerk/nextjs';
import StyledComponentsRegistry from '@/lib/registry';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ClerkProvider
          appearance={{
            cssLayerName: 'clerk',
          }}
          signInFallbackRedirectUrl='/tax-calculations'
          signUpFallbackRedirectUrl='/tax-calculations'
          afterSignOutUrl='/'
        >
          <AuthProvider>
            <StyledComponentsRegistry>
              {children}
            </StyledComponentsRegistry>
            <Toaster 
              position="bottom-right" 
              toastOptions={{
                style: {
                  minWidth: '300px',
                  maxWidth: '500px',
                },
              }}
            />
          </AuthProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}