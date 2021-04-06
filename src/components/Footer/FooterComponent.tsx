import React from "react";
import styled from "styled-components";
import { colors } from "../../colors";

const Footer = styled.footer`
  width: 100%;
  padding: 20px;
  border-top: 1px solid ${colors.greyLight};
  background-color: #ebebeb;
  text-align: center;
  font-size: 12px;
  color: #737373;
  margin-top: auto;
  p {
    margin: 5px 0;
    padding: 0;
  }
`;

export const FooterComponent = (): JSX.Element => {
  return (
    <Footer>
      <p>
        Kalkualtor do minimilizacji wyrażeń logicznych realizowany w ramach
        Projektu Zespołowego @ PW OKNO
      </p>
      <p>
        {" "}
        Adam Rosiak & Adrian Ryniec pod kierunkiem dr Elżbiety Piwowarskiej.{" "}
      </p>
      <p>github: https://github/Nitropox/boolean-calc</p>
      <p>2021</p>
    </Footer>
  );
};
