import React, { useEffect, useState } from 'react';
import {notify} from "../../utils/notifyFunctions";
import PresalePad from '../../components/PresalePad';


export default function Explore({setPage}) {

  useEffect(() => {
    setPage(10);
  }, [])

  return (
    <div className="explore">
      <PresalePad />
      <PresalePad />
      <PresalePad />
      <PresalePad />
      <PresalePad />
      <PresalePad />
    </div>
  )
}