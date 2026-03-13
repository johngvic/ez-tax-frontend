import { SignOutButton } from "@clerk/nextjs";
import { Power } from 'lucide-react';
import styled from "styled-components";

export default function LogoutButton() {
  return (
    <Button>
      <Power />
    </Button>
  )
}

const Button = styled(SignOutButton)`
  padding: 10px 20px;
  background-color: #fca5a5;
  margin-top: auto;
  margin-bottom: 2rem;
  margin-left: 2rem;
  width: 1rem;
  color: #7f1d1d;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s ease;
  align-self: flex-start;
  cursor: pointer;
  
  &:hover {
    background-color: #f87171;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(127, 29, 29, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    margin-bottom: 10rem;
    margin-left: 0;
    width: 3rem;
    align-self: center;
  }
`