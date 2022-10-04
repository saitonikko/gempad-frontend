import React, { useEffect, useState } from 'react';
import { OutlinedInput2, DateTimeInput } from '../../components/CustomizeMui';
import { notify } from "../../utils/notifyFunctions";


export default function CreateLock({ setPage }) {

  useEffect(() => {
    setPage(40);
  }, [])

  return (
    <div class="create-lock">
      <div className="card">
        <div className="title">Create Your Locks for Free</div>
        <OutlinedInput2 label="Token or LP Token Address" />
        <OutlinedInput2 label="Amount" />
        <DateTimeInput label="Lock Until" />
        <div className="btn-container">
          <div className="default-btn">Lock</div>
        </div>
      </div>
    </div>
  )
}