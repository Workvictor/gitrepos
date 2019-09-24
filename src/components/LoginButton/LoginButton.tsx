import React from 'react';

import { CustomButton } from '../CustomButton';

export const LoginButton = () => {
  return (
    <CustomButton
      href="https://github.com/login/oauth/authorize?client_id=08807a0b282ee2d2b960"
      variant="outlined"
    >
      Log in with github
    </CustomButton>
  );
};
