import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideSnackbar } from "../Store/Slices/snackbarSlice";

const Snackbar = () => {
  const { message, visible } = useSelector((state) => state.snackbar);
  const dispatch = useDispatch();

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        dispatch(hideSnackbar());
      }, 5000);
    }
  }, [visible, dispatch]);

  return (
    <>
      {visible ? (
        <div className="toaster align-items-center">
          <div className="d-flex ">
            <div className="me-auto">{message}</div>

            <i
              className="bi bi-x-lg ms-auto"
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(hideSnackbar())}
            ></i>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Snackbar;
