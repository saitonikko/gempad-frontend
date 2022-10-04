import React, { useEffect, useState } from 'react';
import {notify} from "../../utils/notifyFunctions";


export default function MyContributions({setPage}) {

  useEffect(() => {
    setPage(21);
  }, [])

  return (
    <div className="my-contributions">

    </div>
  )
}