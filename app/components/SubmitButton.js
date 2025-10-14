import { Button } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";

function SubmitButton({ children, ...props }) {
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  };

  // const configButton = {
  //   // variant: "contained",
  //   // color: "primary",
  //   // fullWidth: true,
  //   onClick: handleSubmit,
  // };

  return (
    <Button
      onClick={handleSubmit}
      // {...configButton}
      variant="contained"
      // color="primary"
      // disableElevation
      className="bg-custom-indigo px-[63px] md:px-[106px] py-[10px] rounded-none capitalize"
    >
      {children}
    </Button>
  );
}

export default SubmitButton;
