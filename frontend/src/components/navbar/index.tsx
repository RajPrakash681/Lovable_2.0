import styled from "styled-components";
import NavbarItem from "./item";

interface NavbarItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface NavbarProps {
  items: NavbarItem[];
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {
  return (
    <Container>
      {items.map((item, index) => (
        <NavbarItem key={index} {...item} />
      ))}
    </Container>
  );
};

export default Navbar;

const Container = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 32px;
  padding-top: 16px;
`; 