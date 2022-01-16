import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useGameContext } from '../contexts';
import { bounce, fadeIn, fadeOut } from 'react-animations';

const fadeOutAnimation = keyframes`${fadeOut}`;

const Message: React.FC = () => {
  const { message } = useGameContext();
  console.log(message);
  return (
    <Wrapper visible={message.visible}>
      <MessageBox>
        <Text>
          {message.msg}
          {message.visible}
        </Text>
      </MessageBox>
    </Wrapper>
  );
};
export default Message;

const Wrapper = styled.div<{ visible: boolean }>`
  position: fixed;
  width: 100vw;
  padding: 1rem;
  display: flex;
  pointer-events: none;

  transition: opacity 1000ms ease;
  ${({ visible }) =>
    !visible &&
    css`animation: 1s ${fadeOutAnimation}`} forwards;
`;
const MessageBox = styled.div`
  background-color: ${({ theme }) => theme.color['white:0']};
  max-width: min(600px, 90%);
  min-height: 50px;
  margin: 0 auto;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.color.red};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;
const Text = styled.p`
  color: ${({ theme }) => theme.color.black};
`;
