import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  return (
    <Footer>
      <p>{t("footerPart1")}</p>
      <p>
        {" "}
        <b>Adam Rosiak</b>
        {t("footerPart2")} <b>{t("footerPart3")}</b>.{" "}
      </p>
      <p>
        github:{" "}
        <a href="https://github.com/Nitropox/logic-calculator">
          https://github.com/Nitropox/logic-calculator
        </a>
      </p>
      <p>
        {t("footerPart4")} <b>2021</b>
      </p>
    </Footer>
  );
};
