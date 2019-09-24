import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const CustomButton = styled(Button)`
  &&& {
    box-shadow: ${({ theme }) => theme.palette.shadow};
    border-color: currentColor;
    color: inherit;
  }
`;
