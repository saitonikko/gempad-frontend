import React, { useEffect, useState } from 'react';
import {notify} from "../../utils/notifyFunctions";
import SpecialSalePad from '../../components/SpecialSalePad';


export default function Explore({setPage}) {

  useEffect(() => {
    setPage(20);
  }, [])

  return (
    <div className="explore">
      <SpecialSalePad />
      <SpecialSalePad />
      <SpecialSalePad />
      <SpecialSalePad />
      <SpecialSalePad />
      <SpecialSalePad />
    </div>
  )
}