import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { getLocalStorage, setLocalStorage } from "../utils/manageStorage.js";
import { uuidv4 } from "../utils/uuid.js";
import InputField from "../components/InputField";

const SignUp = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [inputFields, setInputFields] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const storedUserData = getLocalStorage("users") || [];

  const validateValues = (inputValues) => {
    const errors = {};
    if (!inputValues.name) {
      errors.name = "Enter name";
    } else if (inputValues.name.trim().length < 4) {
      errors.name = "Name must be at least 4 characters long.";
    }
    if (!inputValues.email) {
      errors.email = "Enter email";
    } else if (
      !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
        inputValues.email
      )
    ) {
      errors.email = "Enter valid email";
    }
    if (!inputValues.password) {
      errors.password = "Enter password";
    } else if (inputValues.password.trim().length < 5) {
      errors.password = "Password should be more than 5 characters";
    }
    if (!inputValues.confirmPassword) {
      errors.confirmPassword = "Enter confirm password";
    } else if (inputValues.password !== inputValues.confirmPassword) {
      errors.confirmPassword = "Password and confirm password should be same";
    }
    return errors;
  };

  const handleChange = (e) => {
    setInputFields((prevFields) => ({
      ...prevFields,
      [e.target.name]: e.target.value,
    }));
    setErrors((prevErrors) => {
      const fieldErrors = validateValues({
        ...inputFields,
        [e.target.name]: e.target.value,
      });
      return {
        ...prevErrors,
        [e.target.name]: fieldErrors[e.target.name] || "",
      };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = inputFields;
    const errors = validateValues(inputFields);
    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    const existingUser = storedUserData.find((user) => user.email === email);
    if (existingUser) {
      toast.error("Email already exists.");
      return;
    }

    const newUser = {
      name,
      email,
      password,
      userId: uuidv4(),
    };

    const updatedUserData = [...storedUserData, newUser];
    setLocalStorage("users", updatedUserData);

    toast.success("Sign up successfully!", {
      autoClose: 500,
      onClose: () => navigate("/"),
    });
  };

  const inputFieldsArray = [
    {
      id: "name",
      name: "name",
      type: "text",
      label: "Name",
      value: inputFields.name,
      error: errors.name,
      autoComplete: "name",
    },
    {
      id: "email",
      name: "email",
      type: "email",
      label: "Email address",
      value: inputFields.email,
      error: errors.email,
      autoComplete: "email",
    },
    {
      id: "password",
      name: "password",
      type: "password",
      label: "Password",
      value: inputFields.password,
      error: errors.password,
      autoComplete: "current-password",
    },
    {
      id: "confirm-password",
      name: "confirmPassword",
      type: "password",
      label: "Confirm Password",
      value: inputFields.confirmPassword,
      error: errors.confirmPassword,
      autoComplete: "current-confirm-password",
    },
  ];

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign Up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleFormSubmit} method="POST" className="space-y-6">
            {inputFieldsArray.map((field) => (
              <InputField
                key={field.id}
                id={field.id}
                name={field.name}
                type={field.type}
                label={field.label}
                value={field.value}
                error={field.error}
                onChange={handleChange}
                autoComplete={field.autoComplete}
              />
            ))}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already have an Account?
            <Link
              to={"/"}
              className="font-semibold text-indigo-600 hover:text-indigo-500 ml-1"
            >
              Sign In
            </Link>
          </p>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default SignUp;
