import React from "react";
import { withRouter } from "react-router-dom";

const NotFound404 = props => {
  return (
    <div>
      <h1>Page not found</h1>
    </div>
  );
};

export default withRouter(NotFound404);
