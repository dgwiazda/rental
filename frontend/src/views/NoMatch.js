import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  #noMatch {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1000px;
    height: 420px;
  }
`;
function NoMatch() {
  return (
    <Styles>
      <div id="noMatch">
        <h1>Error 404: no match</h1>
      </div>
    </Styles>
  );
}

export default NoMatch;
