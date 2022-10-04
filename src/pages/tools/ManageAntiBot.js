import React, { useEffect, useState } from 'react';
import { OutlinedInput1 } from '../../components/CustomizeMui';
import { notify } from "../../utils/notifyFunctions";


export default function ManageAntiBot({ setPage }) {

  useEffect(() => {
    setPage(53);
  }, [])

  return (
    <div className="manage-antibot">
      <div className="card">
        <div className="title">Manage Anti-Bot</div>
        <OutlinedInput1 label={"Token Address"} />
      </div>
    </div>
  )
}