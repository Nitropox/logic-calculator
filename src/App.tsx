import "./utils/i18n";
import { FooterComponent } from "./components/Footer/FooterComponent";
import { InputComponent } from "./components/Input/InputCompoennt";
import {
  Container,
  InnerWrapper,
} from "./components/LayoutElements/MainContainer";
import { OutputComponent } from "./components/Output/Output";
import { TruthTable } from "./components/TruthTable/TruthTable";
import { VirtualKeyboard } from "./components/VirtualKeoyboard/VirtualKeyboard";
import { useInput } from "./hooks/useInput";
import { useMinimize } from "./hooks/useMinimize";
import { useTruthTable } from "./hooks/useTruthTable";
import { LangSwitch } from "./components/LangSwitch/LangSwitch";

export const App = (): JSX.Element => {
  const input = useInput();
  const { truthTable, tableHeader, clearTruthTable } = useTruthTable(input);
  const { minifiedExpression, clearOutput } = useMinimize(
    input.inputValue,
    input.processing
  );

  return (
    <Container>
      <LangSwitch />
      <InnerWrapper>
        <InputComponent input={input} ref={input.inputRef} />
        <VirtualKeyboard
          input={input}
          clearTruthTable={clearTruthTable}
          clearOutput={clearOutput}
        />
        <OutputComponent minifiedExpression={minifiedExpression} />
        <TruthTable truthTable={truthTable} tableHeader={tableHeader} />
      </InnerWrapper>
      <FooterComponent />
    </Container>
  );
};
