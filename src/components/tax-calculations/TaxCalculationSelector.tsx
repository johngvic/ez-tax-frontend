"use client"

import styled from 'styled-components';
import { useCallback, useState } from 'react';
import FileUploader from '../common/FileUploader';
import { HttpService } from '@/service/http';

interface TaxCalculationSelectorProps {
  token: string;
}

export default function TaxCalculationSelector({ token }: TaxCalculationSelectorProps) {
  const [option, setOption] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string>('');

  const handleFile = (file: File | null) => {
    setFiles([file!])
  };

  const handleGenerate = useCallback(async () => {
    if (!option) {
      setError('Por favor, selecione um relatório.');
      return;
    }
    if (files.length === 0) {
      setError('Por favor, selecione um arquivo.');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      switch (option) {
        case 'exclusao-pis-cofins':
          const formData = new FormData();
          formData.append('file', files[0]);
          
          const service = new HttpService(token);
          await service.postExclusaoPisCofinsJob(formData);
          
          setSuccess('Relatório enviado com sucesso! Verifique a tabela abaixo para acompanhar o progresso.');
          setFiles([]);
          setOption('');
          break;
        default:
          setError('Opção de relatório inválida.');
      }
    } catch (e: any) {
      setError(`Erro ao enviar relatório: ${e?.message || String(e)}`);
    } finally {
      setLoading(false);
    }
  }, [option, files, token]);

  return (
    <Container>
      <Label>Selecione o relatório</Label>

      <SelectorContainer>
        <Selector name='selectReport' value={option} onChange={(e) => setOption(e.target.value)}>
          <Option value="">-- Selecione uma opção --</Option>
          <Option value="exclusao-pis-cofins" >Exclusão Pis/Cofins</Option>
        </Selector>

        <FileUploader onFileSelect={handleFile} />

        <Button onClick={handleGenerate} disabled={loading}>
          <ButtonText>{loading ? 'Enviando...' : 'Gerar'}</ButtonText>
        </Button>
      </SelectorContainer>

      {error && <ErrorText>{error}</ErrorText>}
      {success && <SuccessText>{success}</SuccessText>}
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
  gap: 1.5rem;
  align-items: center;

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
  /* margin-left: 1rem; */
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

const ErrorText = styled.p`
  color: red;
  margin-top: 1rem;
  margin-bottom: 0;
`

const SuccessText = styled.p`
  color: green;
  margin-top: 1rem;
  margin-bottom: 0;
`