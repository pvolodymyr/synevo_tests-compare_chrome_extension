import styled from "styled-components";

export const Modal = styled.div`
  position: fixed;
  inset: 10px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  background-color: #f4f4f4;
  border: 2px solid #0053a0;
  box-shadow: 0px 4px 25px 0px #333;
`;

export const Body = styled.div`
  padding: 0 0 40px;
  flex-grow: 1;
  overflow: auto;
`;
