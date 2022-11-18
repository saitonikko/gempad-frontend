import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRESALES } from '../../graphql/presale/queries';
import {notify} from "../../utils/notifyFunctions";
import PresalePad from '../../components/PresalePad';


export default function Explore({setPage}) {

  const { data, loading, error } = useQuery(GET_ALL_PRESALES);

  useEffect(() => {
    setPage(10);
  }, [])

  return (
    <div className="explore">
      {
        data?.getAllPresales?.map((item, index) => (
          <PresalePad data={item} key={index} />
        ))
      }
    </div>
  )
}