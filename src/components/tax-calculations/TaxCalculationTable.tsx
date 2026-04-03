'use client'

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HttpService } from '@/service/http';
import { DownloadIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { ExclusaoPisCofinsJob, TaxCalculationType, ExclusaoPisCofinsStatus } from '@/types/TaxCalculations';

interface TaxCalculationTableProps {
  token: string;
}

export default function TaxCalculationTable({ token }: TaxCalculationTableProps) {
  const [jobs, setJobs] = useState<ExclusaoPisCofinsJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const columns: string[] = ['ID', 'CNPJ', 'Tipo', 'Criado em', 'Status', 'Download'];

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

  return (
    <Container>
      <ContainerTitle>
        <Title>Histórico de Cálculos</Title>
      </ContainerTitle>

      {
        loading ? (
          <InfoContainer>Carregando histórico...</InfoContainer>
        ) : error ? (
          <GenericErrorContainer>Erro ao carregar cálculos: {error}</GenericErrorContainer>
        ) :
        jobs.length === 0 ? (
          <InfoContainer>Nenhum cálculo realizado ainda.</InfoContainer>
        ) : (
          <div style={{ overflowY: 'auto', justifyContent: 'center', display: 'flex' }}>
            <StyledTable>
              <TableHeader>
                <tr>
                  {columns.map((column, index) => (
                    <Th key={index}>{column}</Th>
                  ))}
                </tr>
              </TableHeader>
              <tbody>
                {jobs.map((row, rowIndex) => (
                  <Tr key={rowIndex}>
                    {columns.map((column, colIndex) => (
                      <Td key={colIndex}>
                        {column === 'ID' && row.calculationId}
                        {column === 'CNPJ' && row.cnpj}
                        {column === 'Tipo' && parseCalculationType(row.type)}
                        {column === 'Criado em' && formatDate(row.createdAt)}
                        {column === 'Status' && parseStatus(row.status)}
                        {column === 'Download' && (
                          <DownloadButton onClick={() => handleDownload(row.calculationId, row.cnpj)}>
                            <DownloadIcon width={15} />
                          </DownloadButton>
                        )}
                      </Td>
                    ))}
                  </Tr>
                ))}
              </tbody>
            </StyledTable>
          </div>)
      }

      {/* <PaginationContainer>
        <PageActionButton>
          <ChevronLeftIcon width={15} />
        </PageActionButton>

        <PageNumberButton active={true}>1</PageNumberButton>

        <PageActionButton>
          <ChevronRightIcon width={15} />
        </PageActionButton>
      </PaginationContainer> */}

    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 4rem;
  border-radius: .5rem;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  background-color: #FCFCFC;
  width: 57vw;
  height: 80vh;
  

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const ContainerTitle = styled.div`
  width: 100%;
  height: 3rem;
  background: #00294A;
  display: flex;
  align-items: center;
  justify-content: left;
  border-radius: .5rem .5rem 0 0;
`

const Title = styled.label`
  font-weight: 600;
  color: #FFFFFF;
  margin: 0;
  padding-left: 1rem;
`;

const StyledTable = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin: 1rem;
  width: 65rem;
`;

const TableHeader = styled.thead`
  background-color: #f9f9f9;
`;

const Th = styled.th`
  padding: 1rem 1.25rem;
  text-align: left;
  font-weight: 800;
  color: black;
  border-bottom: 1px solid #e0e0e0;
  white-space: nowrap;
`;

const Td = styled.td`
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f0f0f0;
  color: black;
`;

const Tr = styled.tr`
  &:last-child td {
    border-bottom: none;
  }

  &:hover {
    background-color: #fafafa;
  }
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
  margin: 2rem;
  padding: 1rem;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: .6rem;
`;

const InfoContainer = styled.div`
  margin: 2rem 1rem;
  color: #555;
  font-weight: bold;
`

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: .4rem;
  width: 20rem;
  height: 2rem;
  justify-self: center;
  align-self: center;
  justify-content: center;
`

const PageActionButton = styled.button`
  background-color: #F9F8FA;
  border: 1px solid #E0E0E0;
  padding: 2px 7px;
  border-radius: .6rem;
  align-content: center;
  text-align: center;
  cursor: pointer;
`

const PageNumberButton = styled.button<{ active?: boolean }>`
  background-color: ${props => props.active ? '#002A4C' : '#F9F8FA'};
  color: ${props => props.active ? 'white' : '#333'};
  border: ${props => props.active ? 'none' : '1px solid #E0E0E0'};
  padding: 2px 10px;
  border-radius: .6rem;
  align-content: center;
  text-align: center;
  width: 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${props => props.active ? '#002A4C' : '#002a4cbe'};
    color: ${props => props.active ? 'white' : 'white'};
  }
`