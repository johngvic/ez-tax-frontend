"use client"

import styled from "styled-components";
import TaxCalculationSelector from "@/components/tax-calculations/TaxCalculationSelector";
import TaxCalculationTable from "@/components/tax-calculations/TaxCalculationTable";

interface TaxCalculationContentProps {
  token: string;
}

export default function TaxCalculationContent({ token }: TaxCalculationContentProps) {
  return (
    <Container>
      <TaxCalculationSelector token={token} />
      <TaxCalculationTable token={token} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  margin: 8rem 0 0 19rem;

  @media (max-width: 768px) {
    position: fixed;
    margin: 7rem 0 0 4rem;
    text-align: center;
    z-index: -1;
  }
`