/* eslint-disable react/prop-types */
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { getLocalStorage } from "../utils/manageStorage.js";
import InputField from "../components/InputField";

export default function SignIn({ setIsLoggedIn }) {
  const [, setCookie] = useCookies("");
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const storedUserData = getLocalStorage("users");

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

  const validateValues = (inputValues) => {
    const errors = {};
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
    }
    return errors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = inputFields;
    const errors = validateValues(inputFields);
    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    const existingUser = storedUserData.find(
      (item) => item.email === email && item.password === password
    );

    if (!existingUser) {
      toast.error("Invalid email or password");
      return;
    }

    toast.success("Sign in successfully", {
      autoClose: 800,
      onClose: () => setIsLoggedIn(true),
    });

    setCookie("logged-user", existingUser.userId);
  };
  const inputFieldsArray = [
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
  ];
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
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
                Sign in
              </button>{" "}
            </div>
          </form>
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not have account?
            <Link
              to={"signUp"}
              className="font-semibold text-indigo-600 hover:text-indigo-500 ml-1"
            >
              Sign up
            </Link>
          </p>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
