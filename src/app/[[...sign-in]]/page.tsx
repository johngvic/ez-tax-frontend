'use client'

import styled from 'styled-components';
import * as Clerk from '@clerk/elements/common';
import * as SignIn from '@clerk/elements/sign-in';
import { redirect } from 'next/navigation';
import FieldInput from '@/components/auth/FieldInput';
import Submit from '@/components/auth/Submit';
import {
  Container,
  GreetingContainer,
  GreetingTextTop,
  FieldsContainer,
  GreetingTextBottomLink
} from '@/components/auth/common';
import { ClerkProvider } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <Container>
      <AuthContainer>
        <SignIn.Root>
          <SignIn.Step style={{ alignItems: "center" }} name="start">

            <GreetingContainer>
              <GreetingTextTop>Acesse sua conta</GreetingTextTop>
              <GreetingTextBottomContainer>
                <GreetingTextBottom>Não tem acesso a plataforma?</GreetingTextBottom>
                <GreetingTextBottomLink onClick={() => redirect('/sign-up')}>Clique aqui</GreetingTextBottomLink>
              </GreetingTextBottomContainer>
            </GreetingContainer>
            
            <FieldsContainer>
              <FieldInput name='identifier' type='text' placeholder='Email' required />
              <FieldInput name='password' type='password' placeholder='Senha' required />
            </FieldsContainer>

            <Clerk.GlobalError />

            <Submit action='signIn' text='Entrar'/>
          </SignIn.Step>
        </SignIn.Root>
      </AuthContainer>
    </Container>
  )
}

const AuthContainer = styled.div`
  width: 564px;
  height: 400px;
  border-radius: 53px;
  border-width: 1px;
  padding-top: 58px;
  border: 1px solid rgba(29, 54, 77, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 767px) {
    width: 100%;
    border-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`

const GreetingTextBottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
  justify-content: center;
`

const GreetingTextBottom = styled.p`
  margin: 0;
  font-family: "Work Sans";
  font-weight: 400;
  font-size: 14px;
  line-height: 21.98px;
  letter-spacing: 0%;
  text-align: center;
  vertical-align: middle;
`
