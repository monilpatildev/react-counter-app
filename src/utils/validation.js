import { toast } from "react-toastify";

function validateUserEmail(value) {
  if (!value) {
    toast.error("Enter email");
    return false;
  }
  if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)) {
    toast.error("Enter valid email address");
    return  false 
  }
  return true;
}

function validateName(value) {
  if (value.length > 50 || value.length < 5) {
    toast.error("5 to 50 character");
    return false;
  } else if (!/^[a-zA-Z0-9 ]*$/.test(value)) {
    toast.error("No special characters allowed");
    return false;
  }
  return true;
}

export  { validateUserEmail, validateName };
