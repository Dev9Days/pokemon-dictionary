"use client";

import React from "react";
import { RecoilRoot } from "recoil";

const Recoil = ({ children }: React.PropsWithChildren) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default Recoil;
