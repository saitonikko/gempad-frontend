import React from 'react';
import Header from "./Header";
import Sidebar from "./Sidebar";


export default function Layout({ children, page }) {
  return (
    <>
      <div className="page-content">
        <Header page={page} />
        {children}
      </div>
      <Sidebar page={page} />
    </>
  )
}
