import React, { useEffect, useState } from 'react';
import {notify} from "../../utils/notifyFunctions";


export default function ManagePresales({setPage}) {

  useEffect(() => {
    setPage(34);
  }, [])

  return (
    <div className="manage-presales">

    </div>
  )
}