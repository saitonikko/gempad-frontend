import React, { useEffect, useState } from 'react';
import { notify } from "../../utils/notifyFunctions";


export default function MyContributions({ setPage }) {

  useEffect(() => {
    setPage(12);
  }, [])

  return (
    <div className="my-contributions">
      my-contributions"
    </div>
  )
}