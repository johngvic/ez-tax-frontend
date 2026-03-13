import styled from 'styled-components';
import LogoutButton from './LogoutButton';

type MobileMenuProps = {
  options: { name: string; path: string }[];
  activePath: string;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

export const MobileMenu = ({ options, activePath, open, setOpen }: MobileMenuProps) => {
  return (
    <>
      <BurgerButton open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </BurgerButton>

      {open && (
        <>
          <Menu open={open}>
            {options.map(({ name, path }) => (
              <Link
                key={name}
                href={path}
                onClick={() => setOpen(false)}
                active={activePath === path}
              >
                {name}
              </Link>
            ))}

            <LogoutButton />
          </Menu>
        </>
      )}
    </>
  );
};

const BurgerButton = styled.div<{ open: boolean }>`
  width: 2rem;
  height: 2rem;
  z-index: 20;
  display: none;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-self: center;
  margin-left: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => (open ? 'black' : '#333')};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;

    &:nth-child(1) {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }
    &:nth-child(2) {
      opacity: ${({ open }) => (open ? 0 : 1)};
      transform: ${({ open }) => (open ? 'translateX(100%)' : 'translateX(0)')};
    }
    &:nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

const Menu = styled.nav<{ open: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  padding-top: 5rem;
  background: #E5E4E2;
  height: 100vh;
  width: 100vw;
  text-align: center;
  position: fixed;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
`;

const Link = styled.a<{ active?: boolean }>`
  padding: .6rem 0;
  font-size: 2rem;
  color: black;
  font-weight: 600;
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
`