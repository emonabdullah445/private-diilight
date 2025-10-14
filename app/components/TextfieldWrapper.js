import { TextField } from "@mui/material";
import { useField, ErrorMessage } from "formik";

function TextfieldWrapper({ name, helpertext, ...props }) {
  const [field, meta] = useField(name);

  const configTextfield = {
    ...field,
    ...props,
    fullWidth: true,
    // variant: "outlined",
    variant: "standard",
    color: "primary",
    helperText: helpertext,
  };

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  // if (meta && meta.touched && meta.error) {
  //   configTextfield.error = true;
  //   configTextfield.helperText = meta.error;
  // }

  return <TextField {...configTextfield} />;

  // <p className="absolute -bottom-4 text-red-600 text-xs">
  //         <ErrorMessage {...props} />
  //       </p>
}

export default TextfieldWrapper;
