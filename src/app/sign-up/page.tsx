'use client'

import styled from 'styled-components';
import * as Clerk from '@clerk/elements/common';
import * as SignUp from '@clerk/elements/sign-up';
import { redirect } from 'next/navigation';
import FieldInput from '@/components/auth/FieldInput'
import Submit from '@/components/auth/Submit';
import { Suspense } from 'react';
import {
  Container,
  GreetingContainer,
  GreetingTextTop,
  FieldsContainer,
  GreetingTextBottomLink
} from '@/components/auth/common';

export default function SignUpPage() {
  return (
    <Container>
      <Suspense>
        <AuthContainer>
          <SignUp.Root>
            <SignUp.Step name="start">

              <GreetingContainer>
                <GreetingTextTop>Cadastre sua conta</GreetingTextTop>
                <GreetingTextBottomLink onClick={() => redirect('/')}>Voltar para tela de login</GreetingTextBottomLink>
              </GreetingContainer>

              <FieldsContainer>
                <FieldInput name='firstName' type='text' placeholder='Nome completo' required />
                <FieldInput name='emailAddress' type='email' placeholder='Email' required />
                <FieldInput name='password' type='password' placeholder='Senha' required />
              </FieldsContainer>

              <Clerk.GlobalError />

              <div id="clerk-captcha" />

              <Submit action='signUp' text='Cadastrar' />
            </SignUp.Step>
          </SignUp.Root>
        </AuthContainer>
      </Suspense>
    </Container>
  )
}

const AuthContainer = styled.div`
  width: 564px;
  height: auto;
  border-radius: 53px;
  border-width: 1px;
  border: 1px solid rgba(29, 54, 77, 1);
  padding-top: 58px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding-bottom: 58px;

  @media (max-width: 767px) {
    width: 100%;
    border-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`
