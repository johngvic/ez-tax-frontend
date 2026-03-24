"use client"

import styled from 'styled-components';
import { useCallback, useState, useEffect } from 'react';
import FileUploader from '../common/FileUploader';
import { HttpService } from '@/service/http';
import toast from 'react-hot-toast';

interface TaxCalculationSelectorProps {
  token: string;
}

export default function TaxCalculationSelector({ token }: TaxCalculationSelectorProps) {
  const [option, setOption] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedToast = sessionStorage.getItem('pendingToast');
    if (storedToast) {
      try {
        const { type, message } = JSON.parse(storedToast);
        if (type === 'success') {
          toast.success(message);
        } else if (type === 'error') {
          toast.error(message);
        }
        sessionStorage.removeItem('pendingToast');
      } catch (error) {
        console.error('Error parsing stored toast:', error);
        sessionStorage.removeItem('pendingToast');
      }
    }
  }, []);

  const handleFile = (files: File[]) => {
    setFiles(files);
  };

  const handleGenerate = useCallback(async () => {
    if (!option) {
      toast.error('Por favor, selecione um tipo de cálculo.');
      return;
    }
    if (files.length === 0) {
      toast.error('Por favor, selecione um arquivo.');
      return;
    }

    setLoading(true);

    try {
      switch (option) {
        case 'exclusao-pis-cofins':
          const formData = new FormData();
          formData.append('file', files[0]);
          
          const service = new HttpService(token);
          await service.postExclusaoPisCofinsJob(formData);
          
          sessionStorage.setItem('pendingToast', JSON.stringify({
            type: 'success',
            message: 'Relatório enviado com sucesso! Verifique a tabela abaixo para acompanhar o progresso.'
          }));
          
          window.location.reload();

          setFiles([]);
          setOption('');
          break;
        default:
          toast.error('Opção de relatório inválida.');
      }
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      toast.error(`Erro ao enviar relatório: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, [option, files, token]);

  return (
    <Container>
      <Label>Selecione o tipo de cálculo</Label>

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
  flex-direction: column;
  gap: 1.5rem;

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
  background-color: #eeeeed;
  gap: 0.35em;
  padding: .5rem 1.25rem;
  padding-right: 1.25em;
  border: 1px solid #C0C0C0;
  font-weight: 700;
  border-radius: 10px;
  font-size: 1rem;
  transition: .4s;
  cursor: pointer;
  width: 15rem;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
  }

  @media (max-width: 768px) {
    width: fit-content;
    margin-left: 0;
  }
`

const ButtonText = styled.span``