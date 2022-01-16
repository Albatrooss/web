import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card as CardType } from '../../types';
import Card from './Card';

const cards: CardType[] = [
  '9h',
  '10h',
  'jh',
  'qh',
  'kh',
  'ah',
  '9d',
  '9c',
  '10c',
  'jc',
  'qc',
  'kc',
  'ac',
  '10d',
  'jd',
  'qd',
  'kd',
  'ad',
  '9s',
  '10s',
  'js',
  'qs',
  'ks',
  'as',
];

const MainPageArt: React.FC = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setOpen(prev => !prev);
    }, 3000);
    () => clearInterval(interval);
  }, []);
  return (
    <Wrapper>
      <Center open={open}>
        {cards.map((card, i) => (
          <CardWrapper angle={open ? i * 15 : 0} key={i}>
            <Card size="lg" value={card} noMargin />
          </CardWrapper>
        ))}
      </Center>
    </Wrapper>
  );
};
export default MainPageArt;

const Wrapper = styled.div`
  margin-top: 2rem;
  width: 100px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Center = styled.div<{ open: boolean }>`
  position: relative;
  width: 1px;
  height: 1px;
  margin-left: ${({ open }) => (open ? 1.5 : 0)}rem;
  transition: all 300ms ease-in-out;
  > div {
  box-shadow: ${({theme, open}) => open ? theme.boxShadow : 0};
  }
`;

const CardWrapper = styled.div<{ angle: number }>`
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -3rem;
  transform: rotate(${({ angle }) => angle}deg);
  transform-origin: 25% 80%;

  transition: transform 300ms ease-in-out;
`;
