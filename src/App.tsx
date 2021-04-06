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
import { useTruthTable } from "./hooks/useTruthTable";

export const App = (): JSX.Element => {
  const input = useInput();
  const { truthTable, tableHeader, clearTruthTable } = useTruthTable(
    input.inputStack,
    input.processing,
    input.setProcessing
  );

  return (
    <Container>
      <InnerWrapper>
        <InputComponent input={input} />
        <VirtualKeyboard input={input} clearTruthTable={clearTruthTable} />
        <OutputComponent />
        <TruthTable truthTable={truthTable} tableHeader={tableHeader} />
      </InnerWrapper>
      <FooterComponent />
    </Container>
  );
};
