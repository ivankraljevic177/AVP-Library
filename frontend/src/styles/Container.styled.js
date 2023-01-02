import styled from "styled-components/macro";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  border: 5px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 24rem;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: #00000;
`;
