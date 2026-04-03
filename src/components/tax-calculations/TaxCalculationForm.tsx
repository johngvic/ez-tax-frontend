"use client"

import styled from 'styled-components';
import { useCallback, useState, useEffect } from 'react';
import FileUploader from '../common/FileUploader';
import { HttpService } from '@/service/http';
import toast from 'react-hot-toast';

interface TaxCalculationFormProps {
  token: string;
}

export default function TaxCalculationForm({ token }: TaxCalculationFormProps) {
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

          files.forEach((file) => {
            formData.append('files', file);
          });

          const service = new HttpService(token);
          await service.postExclusaoPisCofinsJob(formData);

          sessionStorage.setItem('pendingToast', JSON.stringify({
            type: 'success',
            message: 'Arquivos enviados com sucesso! O relatório estará disponível para download assim que o processamento for concluído.'
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
      <ContainerTitle>Cálculos Fiscais</ContainerTitle>

      <SelectorContainer>

        <div>
          <Label>Selecione o tipo de cálculo</Label>
          <Selector name='selectReport' value={option} onChange={(e) => setOption(e.target.value)}>
            <Option value="">-- Selecione uma opção --</Option>
            <Option value="exclusao-pis-cofins" >Exclusão Pis/Cofins</Option>
          </Selector>
        </div>

        <div>
          <Label>Selecionar arquivo(s)</Label>
          <FileUploader onFileSelect={handleFile} />
        </div>
        
        <Button onClick={handleGenerate} disabled={loading} style={loading ? { cursor: 'default', backgroundColor: '#cccccc' } : {  }}>
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
  border-radius: .5rem;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  background-color: #FCFCFC;
  height: 46vh;

  @media (max-width: 768px) {
    margin: 0;
  }
`

const ContainerTitle = styled.div`
  width: 20rem;
  height: 3rem;
  background: #00294A;
  display: flex;
  align-items: center;
  justify-content: left;
  border-radius: .5rem .5rem 0 0;
  padding-left: 1rem;
  font-weight: 600;
  color: #FFFFFF;
`

const Label = styled.p`
  font-weight: 600;
  margin-bottom: .5rem;
  margin-top: 0;
`

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem 1rem 1rem;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`

const Selector = styled.select`
  width: 95%;
  outline: none;
  padding: .5rem;
  border-radius: 8px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  cursor: pointer;
  width: 100%;

  @media (max-width: 768px) {
    width: 18rem;
  }
`

const Option = styled.option``

const Button = styled.button`
  height: 2.3rem;
  background-color: #012A49;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  color: #FFFFFF;
  border: 0;
  border-radius: .5rem;
  cursor: pointer;
`

const ButtonText = styled.span`

`