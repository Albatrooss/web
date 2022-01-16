
import React from 'react';
import styled from 'styled-components';

interface Props {
  
}

const Table: React.FC<Props> = ({  }) => {

  return (
    <Wrapper>
      Table
    </Wrapper>
  )

}
export default Table;

const Wrapper = styled.div`
  background-color: ${({theme}) => theme.color.brown};
`;
