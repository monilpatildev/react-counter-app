/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { setLocalStorage } from "../utils/manageStorage.js";
import { getLocalStorage } from "../utils/manageStorage.js";
import { uuidv4 } from "../utils/uuid.js";
import { RxCross2 } from "react-icons/rx";
import InputField from "../components/InputField";

const InputForm = ({ setShowForm, user, setEditContact, editContact }) => {
  const [inputFields, setInputFields] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [profile, setProfile] = useState("");
  const [errors, setErrors] = useState({});
  const [imageError, setImageError] = useState("");
  const [editContactId, setEditContactId] = useState(null);

  useEffect(() => {
    if (editContact) {
      setInputFields({
        name: editContact.name,
        email: editContact.email,
        phone: editContact.phone,
      });
      setProfile(editContact.profile || "");
      setEditContactId(editContact.contactId);
      setShowForm(true);
    }
  }, [editContact]);

  const resetForm = () => {
    setInputFields({ name: "", email: "", phone: "" });
    setProfile("");
    setEditContact(null);
  };

  const handleHideForm = () => {
    setShowForm(false);
    resetForm();
    setImageError({});
    setErrors({});
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
    if (!inputValues.phone) {
      errors.phone = "Enter phone";
    } else if (!/^\d{10}$/.test(inputValues.phone)) {
      errors.phone = "Phone number must be exactly 10 digits.";
    }
    return errors;
  };

  const handlePictureUpload = (e) => {
    const maxSize = 2 * 1024 * 1024;
    const validFormats = ["image/jpeg", "image/png"];
    const file = e.target.files[0];


    if (!file) {
      setProfile("");
      setImageError("Please select a image");
      return;
    } else if (file.size > maxSize) {
      setProfile("");
      setImageError("Image size must be less than 2 MB.");
      return;
    } else if (!validFormats.includes(file.type)) {
      setProfile("");
      setImageError("Please upload a valid image file (jpeg, png).");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setProfile(reader.result);
    reader.readAsDataURL(file);

    setImageError("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateValues(inputFields);
    setErrors(errors);
    if (Object.keys(errors).length > 0 || !profile) {


      if (!profile && imageError === "") {
        setImageError("Please select a image");
      }
      return;
    }

    const newContact = {
      ...inputFields,
      profile,
      refId: user.userId,
      contactId: editContactId || uuidv4(),
    };

    const storedContacts = getLocalStorage("contacts");
    let updatedContacts;

    if (editContactId) {
      const contactIndex = storedContacts.findIndex(
        (contact) => contact.contactId === editContactId
      );

      if (contactIndex !== -1) {
        updatedContacts = [...storedContacts];
        updatedContacts[contactIndex] = newContact;
      }
    } else {
      updatedContacts = [...(storedContacts || []), newContact];
    }
    setLocalStorage("contacts", updatedContacts);
    toast.success(editContactId ? "Contact updated!" : "Contact added!");
    handleHideForm();
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
      id: "phone",
      name: "phone",
      type: "number",
      label: "phone",
      value: inputFields.phone,
      error: errors.phone,
      autoComplete: "phone",
    },
  ];

  return (
    <>
      <div className=" bg-slate-600 absolute w-full h-[113%] top-0 left-0 opacity-50  "></div>
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 absolute top-[15%] left-[37%] w-[500px] bg-slate-100  shadow-lg rounded-md ">
        <div className=" flex justify-end">
          <RxCross2 onClick={handleHideForm} className=" text-2xl" />
        </div>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleFormSubmit}
            method="POST"
            className="space-y-6 text-start"
          >
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
              <div className="flex items-center justify-center w-full gap-7">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                >
                  {profile !== "" ? (
                    <img src={profile} alt="" className="w-24" />
                  ) : (
                    <>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Upload picture</span>{" "}
                      </p>{" "}
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG or JPG (MAX. 2MB)
                      </p>
                    </>
                  )}
                </label>

                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handlePictureUpload}
                />
              </div>
              {imageError !== "" && (
                <p className="text-[12px] text-red-600 mt-0">{imageError}</p>
              )}
            </div>
            <div className=" flex gap-5">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {editContactId ? "Update" : "Add Contact"}
              </button>
              <button
                type="submit"
                onClick={handleHideForm}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>{" "}
        <ToastContainer />
      </div>
    </>
  );
};

export default InputForm;
