import React from "react";
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';

const NotFound = (props) => {
  const history = useHistory();

  return (
    <>
      <p>잘못된 페이지 입니다. </p>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          history.replace("/");
        }}
      >
        뒤로가기
      </Button>
    </>
  );
};

export default NotFound;
