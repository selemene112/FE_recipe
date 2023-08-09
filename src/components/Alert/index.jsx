import React, { Fragment } from 'react';

export default function Alert({ type, message }) {
  return (
    <>
      <Fragment>
        <div className={`col-3 alert alert-${type || 'primary'}`}>{message}</div>
      </Fragment>
    </>
  );
}
