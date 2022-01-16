import React from 'react';
import styled from 'styled-components';
import { Card as CardType } from '../../types';

const cardMap: Record<CardType, string> = {
  '9s': 'spades/spades-r09',
  '9d': 'diamonds/diamonds-r09',
  '9h': 'hearts/hearts-r09',
  '9c': 'clubs/clubs-r09',
  '10s': 'spades/spades-r10',
  '10d': 'diamonds/diamonds-r10',
  '10h': 'hearts/hearts-r10',
  '10c': 'clubs/clubs-r10',
  js: 'spades/spades-J',
  jd: 'diamonds/diamonds-J',
  jh: 'hearts/hearts-J',
  jc: 'clubs/clubs-J',
  qs: 'spades/spades-Q',
  qd: 'diamonds/diamonds-Q',
  qh: 'hearts/hearts-Q',
  qc: 'clubs/clubs-Q',
  ks: 'spades/spades-K',
  kd: 'diamonds/diamonds-K',
  kh: 'hearts/hearts-K',
  kc: 'clubs/clubs-K',
  as: 'spades/spades-A',
  ad: 'diamonds/diamonds-A',
  ah: 'hearts/hearts-A',
  ac: 'clubs/clubs-A',
  back: 'backs/blue',
};

interface CardProps {
  size?: 'md' | 'lg';
  value: CardType;
  noMargin?: boolean;
}

const Card: React.FC<CardProps> = ({ size = 'md', value, noMargin }) => {
  return <Wrapper size={size} card={value} noMargin={noMargin} />;
};
export default Card;

const Wrapper = styled.div<{
  size: 'md' | 'lg';
  card: CardType;
  noMargin?: boolean;
}>`
  margin: ${({ noMargin }) => (noMargin ? 0 : '5px 5px 50px 5px')};
  cursor: pointer;
  width: ${({size}) => size === 'md' ? 4 : 6}rem;
  height: ${({size}) => size === 'md' ? 5.5 : 8.25}rem;

  background-color: #fff;
  border-radius: 0.2rem;
  border: 1px solid #c3c3c3;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;
  background-image: url(/cards/${({ card }) => cardMap[card]}.svg);
`;
