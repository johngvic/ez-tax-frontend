'use client'

import styled, { keyframes } from 'styled-components';
import * as Clerk from '@clerk/elements/common';
import * as SignUp from '@clerk/elements/sign-up';
import * as SignIn from '@clerk/elements/sign-in';

type SubmitProps = {
  action: 'signIn' | 'signUp';
  text: string;
}

export default function Submit({ action, text }: SubmitProps) {

  const renderButton = () => {
    return (
      action == 'signIn' ?
        <SubmitButtonSignIn submit>{text}</SubmitButtonSignIn> :
        <SubmitButtonSignUp submit>{text}</SubmitButtonSignUp>
    )
  }

  const renderLoadingButton = () => {
    return (
      <LoadingContainer>
        <SubmitButtonLoading submit disabled>{text}</SubmitButtonLoading>
        <Spinner/>
      </LoadingContainer>
    )
  }

  return (
    <SubmitContainer>
      <Clerk.Loading>{(isLoading) => (isLoading ? renderLoadingButton() : renderButton())}</Clerk.Loading>
    </SubmitContainer>
  )
}

const SubmitContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 57px;
`

const SubmitButton = styled(SignUp.Action)`
  width: 401px;
  height: 48px;
  border-radius: 500px;
  border: none;
  padding-top: 16px;
  padding-right: 24px;
  padding-bottom: 16px;
  padding-left: 24px;
  background: rgba(0, 137, 128, 1);
  color: rgba(255, 255, 255, 1);
  font-family: "Work Sans";
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0%;
  cursor: pointer;

  @media (max-width: 767px) {
    width: 331px;
  }
`

const SubmitButtonSignIn = styled(SignIn.Action).attrs({ as: SubmitButton })``;
const SubmitButtonSignUp = styled(SignUp.Action).attrs({ as: SubmitButton })``;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
`

const SubmitButtonLoading = styled(SignIn.Action).attrs({ as: SubmitButton })`
  background: #E0E0E0;
  cursor: default;
`

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top: 4px solid white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: ${spin} 1s linear infinite;
`;