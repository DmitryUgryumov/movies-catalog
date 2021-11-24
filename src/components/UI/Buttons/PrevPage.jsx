import React from 'react'

const PrevPage = ({ handler, page }) => {
  return (
    <>
      {
        page > 1
          ? <button className='page-buttons__prev' onClick={handler}>← {page - 1} page</button>
          : null
      }
    </>
  )
}

export default PrevPage