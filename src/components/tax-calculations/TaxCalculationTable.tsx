'use client'

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HttpService } from '@/service/http';
import { DownloadIcon } from 'lucide-react';
import { ExclusaoPisCofinsJob, TaxCalculationType, ExclusaoPisCofinsStatus } from '@/types/TaxCalculations';

interface TaxCalculationTableProps {
  token: string;
}

export default function TaxCalculationTable({ token }: TaxCalculationTableProps) {
  const [jobs, setJobs] = useState<ExclusaoPisCofinsJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const service = new HttpService(token);
      try {
        const data = await service.getExclusaoPisCofinsJobs();
        setJobs(data);
      } catch (e: any) {
        setError(e?.message || String(e));
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [token]);

  const parseStatus = (status: ExclusaoPisCofinsStatus) => {
    switch (status) {
      case ExclusaoPisCofinsStatus.Pending:
        return 'Pendente';
      case ExclusaoPisCofinsStatus.Processing:
        return 'Em andamento';
      case ExclusaoPisCofinsStatus.Completed:
        return 'Concluído';
      default:
        return 'N/A';
    }
  }

  const parseCalculationType = (type: TaxCalculationType) => {
    switch (type) {
      case TaxCalculationType.ExclusaoPisCofins:
        return 'Exclusão Pis/Cofins';
      default:
        return 'N/A';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const time = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return `${day}/${month}/${year} às ${time}`;
  };

  const handleDownload = async (calculationId: string, cnpj: string) => {
    const service = new HttpService(token);
    try {
      const blob = await service.downloadExclusaoPisCofinsJob(calculationId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${cnpj}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (e: any) {
      alert(`Download failed: ${e?.message || String(e)}`);
    }
  };

  if (loading) return <div style={{ marginLeft: '4rem' }}>Loading...</div>;
  if (error) return <GenericErrorContainer>Erro: {error}</GenericErrorContainer>;

  return (
    <Container>
      <Title>Histórico de Cálculos</Title>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>CNPJ</Th>
            <Th>Cálculo</Th>
            <Th>Data Criação</Th>
            <Th>Status</Th>
            <Th>Download</Th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.calculationId}>
              <Td>{job.calculationId}</Td>
              <Td>{job.cnpj}</Td>
              <Td>{parseCalculationType(job.type)}</Td>
              <Td>{formatDate(job.createdAt)}</Td>
              <Td>{parseStatus(job.status)}</Td>
              <Td style={{ textAlign: 'center' }}>
                {job.status === ExclusaoPisCofinsStatus.Completed && (
                  <DownloadButton onClick={() => handleDownload(job.calculationId, job.cnpj)}>
                    <DownloadIcon width={15} />
                  </DownloadButton>
                )}
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 4rem;

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const Title = styled.label`
  margin: 0 0 1rem 0;
  font-weight: 600;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px 14px;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px 14px;
`;

const DownloadButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 2px 10px;
  border-radius: .6rem;
  align-content: center;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const GenericErrorContainer = styled.div`
  margin-left: 4rem;
  margin-top: 5rem;
  padding: 1rem;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: .6rem;
`;
