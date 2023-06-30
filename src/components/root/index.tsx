import React from 'react';
import Recoil from './recoil';
import ReactQueryProvider from './reactQuery';
import Global from './global';
import Region from '../region';

const Root = ({ children }: React.PropsWithChildren) => {
  return (
    <Recoil>
      <ReactQueryProvider>
        <Global>{children}</Global>
        <Region />
      </ReactQueryProvider>
    </Recoil>
  );
};

export default Root;
