import React, { useEffect, useState } from 'react';
import { notify } from "../../utils/notifyFunctions";


export default function QuickView({ setPage }) {

  useEffect(() => {
    setPage(11);
  }, [])

  return (
    <div className="quick-view">
      quick-view
    </div>
  )
}