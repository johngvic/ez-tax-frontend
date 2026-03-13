import { AuthProvider } from '@/contexts/AuthContext';
import { ClerkProvider } from '@clerk/nextjs';
import StyledComponentsRegistry from '@/lib/registry';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ClerkProvider
          appearance={{
            cssLayerName: 'clerk',
          }}
          signInFallbackRedirectUrl='/dashboard'
          signUpFallbackRedirectUrl='/dashboard'
          afterSignOutUrl='/'
        >
          <AuthProvider>
            <StyledComponentsRegistry>
              {children}
            </StyledComponentsRegistry>
          </AuthProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}