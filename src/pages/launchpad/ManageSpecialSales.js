import React, { useEffect, useState } from 'react';
import {notify} from "../../utils/notifyFunctions";


export default function ManageSpcialSales({setPage}) {

  useEffect(() => {
    setPage(35);
  }, [])

  return (
    <div className="manage-special-sales">

    </div>
  )
}