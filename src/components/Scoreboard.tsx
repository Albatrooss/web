import React from 'react';
import styled, { css } from 'styled-components';
import { scoreAngleCalculator } from '../util';
import Card from './Card';

interface Props {
  me?: boolean;
  red: boolean
  score: number;
}

const Scoreboard: React.FC<Props> = ({ me, red, score }) => {
  return (
    <Wrapper me={me}>
      {/* <Text>Score</Text> */}
      <CardWrapper>
        <Card size={me ? 'lg' : 'sm'} value={`5${red ? 'd' : 's'}`} noMargin />
      </CardWrapper>
      <CardWrapper data={scoreAngleCalculator(score)}>
        <Card size={me ? 'lg' : 'sm'} value={score >=5 ? `5${red ? 'h' : 'c'}` : 'back'} noMargin />
      </CardWrapper>
    </Wrapper>
  );
};
export default Scoreboard;

const Wrapper = styled.div<{me?: boolean}>`
  position: relative;
  width: ${({me}) => me ? 6 : 3}rem;
  height: ${({me}) => me ? 8.25 : 4.125}rem;
`;

const CardWrapper = styled.div<{ data?: { angle: number; pos: string } }>`
  position: absolute;
  ${({ data }) =>
    data &&
    css`
      transform: rotate(${data.angle}deg);
      transform-origin: ${data.pos};
    `}

    transition: all 300ms ease;
`;

const Text = styled.div`
  text-align: center;
  padding: 1rem;
  font-weight: 900;
  font-size: 1.4rem;
`;
