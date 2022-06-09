import React,{ useState }  from 'react'

import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;


const Loader = () => {
    const override = css`
  display: block;
  margin: 0 auto;
  color:black;
  margin-top: 250px;
  border-color: red;
`;
    const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#ffffff");
  
    return (
      <div className="sweet-loading text-center">
        
  
        <HashLoader color="black" loading={loading} css={override} size={80} />
      </div>
    );
}

export default Loader