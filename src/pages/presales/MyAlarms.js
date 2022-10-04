import React, { useEffect, useState } from 'react';
import { notify } from "../../utils/notifyFunctions";


export default function MyAlarms({ setPage }) {

  useEffect(() => {
    setPage(13);
  }, [])

  return (
    <div className="my-alarms">
      my-alarms
    </div>
  )
}