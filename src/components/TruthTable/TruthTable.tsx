/* eslint-disable react/no-array-index-key */
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { colors } from "../../colors";
import { Label } from "../LayoutElements/Label";

const Table = styled.div`
  margin-bottom: 50px;
  max-width: 100%;
`;

const Row = styled.div`
  display: flex;
`;

const HeaderCell = styled.div`
  text-align: center;
  padding: 14px 0;
  width: 90px;
  height: 48px;
  background-color: ${colors.greyLight};
  border: 1px solid white;
  color: ${colors.greyDark};
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:last-of-type {
    background-color: ${colors.greyMedium};
  }
`;

const TableCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 48px;
  border: 1px solid ${colors.greyLight};
  background-color: white;
  &:last-of-type {
    background-color: ${colors.greyWhite};
  }
`;
interface Props {
  truthTable: string[][];
  tableHeader: string[];
}

export const TruthTable = ({ truthTable, tableHeader }: Props): JSX.Element => {
  const { t } = useTranslation();

  if (!truthTable.length) {
    return <></>;
  }

  return (
    <Table>
      <Label text={t("truthTable")} />
      <Row>
        {tableHeader.map(
          (cell, index): ReactNode => (
            <HeaderCell key={`cell-${cell}-${index}`}>{cell}</HeaderCell>
          )
        )}
      </Row>
      {truthTable.map(
        (row, index): ReactNode => (
          <Row key={`row-${row}-${index}`}>
            {row.map((cell, i) => (
              <TableCell key={`cell-${cell}-${i}`}>{cell}</TableCell>
            ))}
          </Row>
        )
      )}
    </Table>
  );
};
