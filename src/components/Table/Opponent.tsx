import React from 'react';
import styled from 'styled-components';
import Card from '../Card';
import { Card as CardType, Player } from '../../../types';
import { angleCalculator } from '../../util';

interface Props {
  username: string;
  data: Player;
  dealer: boolean;
}

const Opponent: React.FC<Props> = ({username, data}) => {
  const { hand, isReady } = data;
  return (
    <Wrapper>
      <Username turn={true} isReady={isReady}>{username}</Username>
      <HandWrapper>
        <Anchor>
          {hand.map((card, i) => (
            <CardWrapper angle={angleCalculator(i, hand.length)}>
              <Card value={card} key={i} size="sm" noMargin />
            </CardWrapper>
          ))}
        </Anchor>
      </HandWrapper>
    </Wrapper>
  );
};
export default Opponent;

const Wrapper = styled.div`
  padding: 1rem;
`;
const Username = styled.h6<{ turn: boolean, isReady: boolean }>`
  font-size: ${({ turn }) => (turn ? 1.5 : 1.2)}rem;
  text-align: center;
  text-transform: capitalize;
  color: ${({theme, isReady}) => theme.color[isReady ? 'black' : 'grey'] };
`;
const HandWrapper = styled.div`
  width: 100px;
  height: 80px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const Anchor = styled.div`
  position: relative;
  width: 1px;
  height: 1px;
`;

const CardWrapper = styled.div<{ angle: number }>`
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -1.5rem;
  transform: rotate(${({ angle }) => angle}deg);
  transform-origin: 25% 80%;

  transition: transform 300ms ease-in-out;
`;
