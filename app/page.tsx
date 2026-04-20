import Image from "next/image";
import styled from "styled-components";

const Wrapper = styled.main`
  min-height: 100vh;
  padding: 24px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
`;
export default function Home() {
  return (
    <Wrapper>
      <Title>Привет, styled-components</Title>
    </Wrapper>
  );
}
