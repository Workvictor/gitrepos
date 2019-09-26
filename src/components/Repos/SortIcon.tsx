import React from 'react';
import { Remove, KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';

interface ISortIcon {
  index: number;
}

export const SortIcon: React.FC<ISortIcon> = ({ index }) => {
  switch (index) {
    case 1:
      return <KeyboardArrowUp />;
    case -1:
      return <KeyboardArrowDown />;
    default:
      return <Remove />;
  }
};
