import React from 'react'
import {Link} from "react-router-dom";

const NextPage = ({ handler, page, totalPages }) => {
  return (
    <>
      {
        page < totalPages
          ? <button className='page-buttons__next' onClick={handler}>{page + 1} page →</button>
          // ? <button className='page-buttons__next' onClick={handler}>
          //   <Link to={`/catalog/${page + 1}`}>
          //     {page + 1} page →
          //   </Link>
          // </button>
          : null
      }
    </>
  )
}

export default NextPage