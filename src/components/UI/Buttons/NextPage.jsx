import React from "react";

const NextPage = ({ handler, page, totalPages }) => {
  return (
    <>
      {page < totalPages ? (
        <button className="page-buttons__next" onClick={handler}>
          {page + 1} page →
        </button>
      ) : null}
    </>
  );
};

export default NextPage;
