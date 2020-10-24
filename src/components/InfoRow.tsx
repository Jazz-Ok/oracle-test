import React from 'react';
import styled from 'styled-components';
import {FormattedMessage} from 'react-intl';
import Item from './Item';

interface IInfoRow {
  rowName: string;
  rowData: string | string[];
}

interface IPlanetStyles {
  fullwidth?: boolean;
}

const StyledInfoRow = styled.li`
  display: flex;
  flex-wrap: wrap;
  padding: 3px;
  border: 1px solid #000;
`;

const StyledInfoRowKey = styled.span`
  flex-basis: ${({fullwidth}: IPlanetStyles) => (fullwidth ? '100%' : 'auto')};
  font-weight: bold;
`;

const StyledInfoRowValue = styled.span`
  margin-left: auto;
`;

const StyledItemList = styled.ul`
  padding-left: 10px;
  list-style-type: none;
`;

const renderList = (rowName: string, rowData: string[]) =>
  rowData.length > 0 && (
    <StyledInfoRow>
      <StyledInfoRowKey fullwidth>
        <FormattedMessage id={rowName} />
      </StyledInfoRowKey>
      <StyledItemList>
        {rowData?.map((el) => (
          <Item key={el} url={el} />
        ))}
      </StyledItemList>
    </StyledInfoRow>
  );

const renderItem = (rowName: string, rowData: string) =>
  rowData.length > 0 && (
    <StyledInfoRow>
      <StyledInfoRowKey>
        <FormattedMessage id={rowName} />
      </StyledInfoRowKey>
      <StyledInfoRowValue>{rowData}</StyledInfoRowValue>
    </StyledInfoRow>
  );

const InfoRow: React.FC<IInfoRow> = ({rowName, rowData}) => {
  if (rowData.constructor === Array) {
    return renderList(rowName, rowData);
  } else {
    return renderItem(rowName, rowData as string);
  }
};
export default InfoRow;
