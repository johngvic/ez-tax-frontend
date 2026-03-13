'use client'

import styled from 'styled-components';
import * as Clerk from '@clerk/elements/common';

type FieldInputProps = {
  name: string;
  type: 'text' | 'email' | 'password';
  placeholder: string;
  required: boolean;
}

export default function FieldInput({ name, type, placeholder, required  }: FieldInputProps) {
  return (
    <Field name={name}>
      <Input type={type} placeholder={placeholder} required={required}/>
      <FieldError />
    </Field>
  )
}

const Field = styled(Clerk.Field)`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;

  @media (max-width: 767px) {
    width: 100%;
  }
`

const FieldError = styled(Clerk.FieldError)`
  color: red;
  width: 400px;
  text-align: justify;
  margin-top: 1rem;
`

const Input = styled(Clerk.Input)`
  width: 400px;
  height: 54px;
  border-radius: 8px;
  border-width: 1px;
  padding-right: 14px;
  padding-left: 14px;
  background-color: inherit;
  border: 1px solid rgba(29, 54, 77, 1);
  outline: none;
  transition: .2s;
  font-family: "Public Sans";
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;

  @media (max-width: 767px) {
    width: 331px;
    align-self: center;
  }
`