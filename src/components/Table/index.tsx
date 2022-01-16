import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { useGameContext, useSocketContext } from '../../contexts';
import Opponent from './Opponent';

interface Props {}

const Table: React.FC<Props> = ({}) => {
  const { me, players } = useGameContext();
  const { sit } = useSocketContext();
  const seatOffset = useMemo(() => (me.seat >= 0 ? me.seat : 0), [me.seat]);
  return (
    <Wrapper>
      {[1, 2, 3].map((num, i) => {
        const seat = (seatOffset + num) % 4;
        const player = players[seat];
        return (
          <Seat area={`o${i}`} key={i}>
            {player ? (
              <Opponent
                dealer={true}
                username={player.username}
                data={player}
              />
            ) : (
              <SitBtn onClick={() => sit(seat)}>SEAT {seat}</SitBtn>
            )}
          </Seat>
        );
      })}
      <StyledTable>
        <div className="table"></div>
      </StyledTable>
    </Wrapper>
  );
};
export default Table;

const Wrapper = styled.div`
  flex: 1;
  margin: 0 auto;
  width: min(100%, 1000px);
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: 150px 1fr;
  grid-template-areas:
    '. o1 .'
    'o0 t o2';
`;

const StyledTable = styled.div`
  grid-area: t;
  width: 100%;
  height: 100%;
  background-color: darkgreen;
  ${({ theme }) => css`
    border: 10px solid ${theme.color['white:dutch']};
    border-radius: ${theme.borderRadius};
    box-shadow: ${({ theme }) => theme.boxShadow};
  `}
`;

const Seat = styled.div<{ area: string }>`
  grid-area: ${({ area }) => area};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SitBtn = styled.button`
  border: none;
  padding: 0.5rem 1rem;
  ${({ theme }) => css`
    background-color: ${theme.color.aero};
    color: ${theme.color['white:0']};
    border-radius: ${theme.borderRadius};
  `}

  cursor: pointer;
  transition: all 300ms ease;

  :hover {
    background-color: ${({theme}) => theme.color['aero:dark']};
  }
`;
