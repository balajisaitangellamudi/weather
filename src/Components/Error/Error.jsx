import React from "react";

const Error = (props) => {
  const { statusCode, msg } = props;
  return (
    <div className="text-center">
      <h1>{statusCode}</h1>
      <div>{msg}</div>
    </div>
  );
};

export default Error;
