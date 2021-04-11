import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled, { css, CSSProp } from "styled-components";

interface Props {
  lang: string;
}

const LangContainer = styled.div`
  display: flex;
  margin: 10px 10px 0 auto;
`;
const LangCircle = styled.button<Props>`
  width: 32px;
  height: 32px;
  margin: 0 2px;
  border: 2px solid white;
  border-radius: 100%;

  cursor: pointer;
  transition: transform 100ms ease-in, border-color 100ms ease-in;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    border: 2px solid red;
  }

  ${({ lang }: Props): CSSProp =>
    (lang === "en" &&
      css`
        background: url("https://www.countryflags.io/gb/flat/64.png") no-repeat
          center;
      `) ||
    css`
      background: url("https://www.countryflags.io/pl/flat/64.png") no-repeat
        center;
    `};

  &:focus {
    outline: none;
  }
`;

export const LangSwitch = (): JSX.Element => {
  const [showSecondLng, setShowSecondLng] = useState<boolean>(false);
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const changeLanguage = (lng: string) => {
    if (!showSecondLng) {
      setShowSecondLng(true);
    } else {
      i18n.changeLanguage(lng);
      setShowSecondLng(false);
    }
  };

  return (
    <LangContainer>
      {showSecondLng && (
        <LangCircle
          lang={currentLang === "pl" ? "en" : "pl"}
          onClick={(): void =>
            changeLanguage(currentLang === "pl" ? "en" : "pl")
          }
        />
      )}
      <LangCircle
        lang={currentLang}
        onClick={(): void => changeLanguage(currentLang)}
      />
    </LangContainer>
  );
};
