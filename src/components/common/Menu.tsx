"use client"

import styled from 'styled-components';
import { LayoutDashboard, CalculatorIcon } from 'lucide-react';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { MobileMenu } from './MobileMenu';
import LogoutButton from './LogoutButton';
import BrandIcon from '@/assets/brand.png';

type MenuProps = {
  isAdmin: boolean;
}

export default function Menu({ isAdmin }: MenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const options = [
    {
      name: 'Dashboard',
      icon: <LayoutDashboard width={20} />,
      path: '/dashboard'
    },
    ...(isAdmin ? [{
      name: 'Cálculos Fiscais',
      icon: <CalculatorIcon width={20} />,
      path: '/tax-calculations'
    }] : [])
  ]

  const redirect = (path: string) => {
    router.push(path)
  }

  return (
    <>
      <AsideMenu>
        <Brand>
          <img src={BrandIcon.src} alt="Brand Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </Brand>
        <MenuItensList>
          {options.map(({ icon, name, path }) => (
            <MenuItensOption
              key={name}
              active={pathname === path}
              onClick={() => redirect(path)}
            >
              {icon}
              <MenuItensOptionText>
                {name}
              </MenuItensOptionText>
            </MenuItensOption>
          ))}
        </MenuItensList>
        <LogoutButton />
      </AsideMenu>

      <MobileMenu options={options} activePath={pathname} open={menuOpen} setOpen={setMenuOpen} />
    </>
  )
}

const AsideMenu = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 300px;
  background: #F7F7F7;
  transition: transform 0.3s ease;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;

  @media (max-width: 768px) {
    display: none;
  }
`

const MenuItensList = styled.ul`
  list-style: none;
  margin-top: 30px;
  margin-left: 0;
  padding: 0 2rem;
`

const MenuItensOption = styled.li<{ active?: boolean }>`
  display: flex;
  margin: 12px 0;
  align-items: center;
  border-radius: .8rem;
  transition: all 0.2s ease;
  padding: .5rem .8rem;
  border: 1px solid #E5E4E2;

  &:hover {
    cursor: pointer;
    background: #FFFFFF;
    transform: translateY(-1px);
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }

  ${({ active }) =>
    active &&
    `
      cursor: pointer;
      background: #FFFFFF;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    `}
`;

const MenuItensOptionText = styled.a`
  color: black;
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
  margin-left: 1rem;
`

const Brand = styled.div`
  margin: 1rem;
  width: auto;
  height: 6rem;
`
