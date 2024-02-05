import React from "react";
// import Header from "./Header";
// import dynamic from "next/dynamic";
import Header from "./header";

interface wrapperProps{
  children: JSX.Element | JSX.Element[]
}

// const Header = dynamic(() => import("./header"));


export default function Wrapper( {children}: wrapperProps ) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
