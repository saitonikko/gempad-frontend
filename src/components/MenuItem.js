import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import up from "../assets/img/icons/up.svg";
import down from "../assets/img/icons/down.svg";

function MenuItem({ page, logo, title, subtitles }) {

  const [isFold, setIsFold] = useState(true);

  useEffect(() => {
    // console.log(page / 10)
    // console.log(subtitles[0].page / 10)
    if(parseInt(page / 10) == subtitles[0].page / 10) {
      setIsFold(false)
    }
  }, [page])

  return (
    <>
      <div className="title" onClick={() => setIsFold((prev) => !prev)}>
        <div className="logo"><img src={logo} /></div>
        <span>{title}</span>
        {subtitles && <img className="fold-btn" src={isFold? down: up} />}
      </div>
      { 
        !isFold &&
        subtitles?.map((item, index) => (
          <Link className={item.page === page ? "subtitle-active" : "subtitle"} to={item.link} key={index}>
            <div className="logo"><span className="dot" /></div>
            <span>{item.name}</span>
          </Link>
        ))
      }
    </>
  )
}

export default MenuItem