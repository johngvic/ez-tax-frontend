"use client"

import { useState } from 'react';
import styled from 'styled-components';
import FileUploader from '../common/FileUploader';

export default function TaxCalculationSelector() {
  const [option, setOption] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  return (
    <Container>
      <Label>Selecione o relatório</Label>

      <SelectorContainer>
        <Selector name='selectReport' value={option} onChange={(e) => setOption(e.target.value)}>
          <Option value="">-- Selecione uma opção --</Option>
          <Option value="exclusao-pis-cofins" >Exclusão Pis/Cofins</Option>
        </Selector>

        <FileUploader
          onFilesSelected={setSelectedFiles}
          multiple={false}
          maxFiles={1}
          maxSizeMB={200}
        />

        <Button onClick={() => console.log(option)}>
          <ButtonText>Gerar</ButtonText>
        </Button>
      </SelectorContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 4rem;
  margin-top: 30px;

  @media (max-width: 768px) {
    margin: 0;
  }
`

const Label = styled.p`
  font-weight: 600;
`

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`

const Selector = styled.select`
  width: 15rem;
  outline: none;
  padding: .5rem;
  border-radius: 8px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 18rem;
  }
`

const Option = styled.option``

const Button = styled.button`
  margin-left: 1rem;
  background-color: #eeeeed;
  display: flex;
  align-items: center;
  gap: 0.35em;
  padding: .5rem 1.25rem;
  padding-right: 1.25em;
  border: 1px solid #C0C0C0;
  font-weight: 700;
  border-radius: 10px;
  font-size: 1rem;
  transition: .4s;
  cursor: pointer;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
  }

  @media (max-width: 768px) {
    width: fit-content;
    margin-left: 0;
  }
`

const ButtonText = styled.span``