"use client"

import { useState } from 'react';
import { HttpService } from '@/service/http';
import styled from "styled-components"

export default function DashboardContent({ token }: { token: string }) {

  const [status, setStatus] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    const service = new HttpService(token);
    try {
      const res = await service.getStatus();
      setStatus(res);
      setError(null);
    } catch (e: any) {
      setError(e?.message || String(e));
    }
  };


  return (
    <Container>
      <div style={{ border: '1px solid black', width: '10rem', height: '10rem' }} >TBD</div>
      <div style={{ border: '1px solid black', width: '10rem', height: '10rem' }} >TBD</div>


      <div>
        <button onClick={handleClick}>CLICK</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {status && <pre>{JSON.stringify(status, null, 2)}</pre>}
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  position: absolute;
  margin: 10rem 0 0 23rem;

  @media (max-width: 768px) {
    margin: 8rem;
    flex-direction: column;
    z-index: -1;
  }
`