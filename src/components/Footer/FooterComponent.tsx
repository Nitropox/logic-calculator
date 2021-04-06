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
  a {
    text-decoration: none;
    color: ${colors.blue};
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
        <b>Adam Rosiak</b> & <b>Adrian Ryniec</b> pod kierunkiem{" "}
        <b>doc. dr Elżbiety Piwowarskiej</b>.{" "}
      </p>
      <p>
        github:{" "}
        <a href="https://github/Nitropox/boolean-calc">
          https://github/Nitropox/boolean-calc
        </a>
      </p>
      <p>
        wykonano w <b>2021</b>
      </p>
    </Footer>
  );
};
