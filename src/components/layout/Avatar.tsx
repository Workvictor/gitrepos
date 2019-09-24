import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{ src: string }>`
  background: url(${({ src }) => src}) no-repeat center;
  width: 40px;
  height: 40px;
  background-size: cover;
  border-radius: 50%;
  overflow: hidden;
`;

interface IAvatar {
  image: string;
}

export const Avatar: React.FC<IAvatar> = ({ image }) => {
  return <Wrapper src={image} />;
};
