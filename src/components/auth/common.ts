'use client'

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  background: linear-gradient(177deg, rgba(250, 250, 250, 1) 0%, rgba(224, 224, 224, 1) 100%);

  @media (max-width: 767px) {
    justify-content: end;
  }
`

export const GreetingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export const GreetingTextTop = styled.p`
  margin: 0;
  font-family: "Montserrat";
  font-weight: 600;
  font-size: 36px;
  line-height: 24px;
  letter-spacing: -1%;
  text-align: center;

  @media (max-width: 767px) {
    font-size: 24px;
  }
`

export const GreetingTextBottomLink = styled.a`
  font-family: "Work Sans";
  font-weight: 600;
  font-size: 14px;
  line-height: 21.98px;
  letter-spacing: 0%;
  text-align: center;
  vertical-align: middle;
  text-decoration: underline;
  text-decoration-style: solid;
  text-decoration-thickness: 0%;
  color: rgba(0, 209, 196, 1);
  cursor: pointer;
`

export const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 58px;
  gap: 25px;

  @media (max-width: 767px) {
    width: 100%;
  }
`
