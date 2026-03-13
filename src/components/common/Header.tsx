"use client"

import styled from 'styled-components';

type HeaderProps = {
  title: string;
  subtitle: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <Container>
      <MainText>{title}</MainText>
      <SubtitleText>{subtitle}</SubtitleText>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 6rem;
  margin-top: 20px;
  margin-left: 4rem;
  align-items: start;
  justify-content: center;

  @media (max-width: 768px) {
    margin: 0 0 0 2rem;
  }
`

const MainText = styled.h1`
  margin: 0 0 5px 0;
`

const SubtitleText = styled.p`
  margin: 0;

  @media (max-width: 768px) {
    display: none;
  }
`