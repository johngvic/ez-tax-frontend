"use client"

import styled from "styled-components";
import TaxCalculationSelector from "@/components/tax-calculations/TaxCalculationSelector";

export default function TaxCalculationContent() {
  return (
    <Container>
      <TaxCalculationSelector/>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  position: absolute;
  margin: 8rem 0 0 19rem;

  @media (max-width: 768px) {
    position: fixed;
    margin: 7rem 0 0 4rem;
    text-align: center;
    z-index: -1;
  }
`