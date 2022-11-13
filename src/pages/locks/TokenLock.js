import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { notify } from "../../utils/notifyFunctions";
import { useQuery } from '@apollo/client';
import { OutlinedInput2 } from '../../components/CustomizeMui';
import { GET_ALL_LOCKS } from '../../graphql/lock/queries';
import logo from "../../assets/img/icons/logo.svg";
import { isAddress } from '../../utils/contractFunctions';

export default function TokenLock({ setPage }) {

  const { data, loading, error } = useQuery(GET_ALL_LOCKS, {
    variables: {
      isLpToken: false
    }
  });
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    setSearchResult(null);
    if (isAddress(search)) {
      data?.getAllLocks?.map((item, index) => {
        if (item.tokenAddress.toUpperCase() === search.toUpperCase())
          setSearchResult(item);
      })
    }
  }, [search])

  useEffect(() => {
    setPage(41);
  }, [])

  return (
    <div className="token-lock">
      <div className="card">
        <OutlinedInput2 label="Search By Token Address" value={search} setValue={setSearch} />
        {
          loading &&
          <>
            <table>
              <tr>
                <th>Token</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </table>
            <div>
              <div className="tip">Data loading...</div>
            </div>
          </>
        }
        {
          error &&
          <>
            <table>
              <tr>
                <th>Token</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </table>
            <div className="tip">
              <div className="tip">Data fetch error!</div>
            </div>
          </>
        }
        {
          data?.getAllLocks?.length === 0 &&
          <>
            <table>
              <tr>
                <th>Token</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </table>
            <div>
              <div className="tip">No Data!</div>
            </div>
          </>
        }
        {
          search?.length !== 0 && searchResult &&
          <table>
            <tr>
              <th>Token</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
            <tr>
              <td className="left">
                <img src={logo} />
                <div className="title">
                  <div className="name">{searchResult?.name}</div>
                  <div className="symbol">{searchResult?.symbol}</div>
                </div>
              </td>
              <td>{searchResult?.amount}</td>
              <td><Link to={`/locks/token_lock/${searchResult?.tokenAddress}`}>View</Link></td>
            </tr>
          </table>
        }
        {
          data?.getAllLocks?.length !== 0 && search?.length === 0 &&
          <table>
            <tr>
              <th>Token</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
            {
              data?.getAllLocks?.map((item, index) => (
                <tr key={index}>
                  <td className="left">
                    <img src={logo} />
                    <div className="title">
                      <div className="name">{item.name}</div>
                      <div className="symbol">{item.symbol}</div>
                    </div>
                  </td>
                  <td>{item.amount}</td>
                  <td><Link to={`/locks/token_lock/${item.tokenAddress}`}>View</Link></td>
                </tr>
              ))
            }
          </table>
        }
      </div>
    </div>
  )
}