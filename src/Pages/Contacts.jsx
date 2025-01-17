/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import ContactList from "../components/ContactList";
import { useNavigate } from "react-router";
import { setLocalStorage } from "../utils/manageStorage.js";
import ExportContact from "../components/ExportContact";
import ImportContact from "../components/ImportContact";

export default function Contacts() {
  const [inputFields, setInputFields] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [profile, setProfile] = useState("");
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [editContactId, setEditContactId] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["logged-user"]);

  const navigate = useNavigate();
  const storedUserData = JSON.parse(localStorage.getItem("users")) || [];

  const validateValues = (inputValues) => {
    const errors = {};
    if (inputValues.name.trim().length < 4) {
      errors.name = "Name must be at least 4 characters long.";
    }
    if (
      !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
        inputValues.email
      )
    ) {
      errors.email = "Enter email";
    }
    if (!/^\d{10}$/.test(inputValues.phone)) {
      errors.phone = "Phone number must be exactly 10 digits.";
    }
    return errors;
  };

  useEffect(() => {
    const fetchUser = () => {
      const loggedInUser = cookies["logged-user"];
      console.log(loggedInUser);

      const existingUser = storedUserData.find(
        (item) => item.userId === loggedInUser.userId
      );
      if (existingUser) setUser(existingUser);
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setInputFields({ name: "", email: "", phone: "" });
    setProfile("");
    setEditContactId(null);
  };

  const handlePictureUpload = (e) => {
    const maxSize = 2 * 1024 * 1024;
    const validFormats = ["image/jpeg", "image/png"];
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > maxSize) {
      toast.error("Image size must be less than 2 MB.");
      return;
    }
    if (!validFormats.includes(file.type)) {
      toast.error("Please upload a valid image file (jpeg, png).");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setProfile(reader.result);
    reader.readAsDataURL(file);
  };

  const handleToggleForm = () => {
    setShowForm(true);
    resetForm();
  };

  const handleHideForm = () => {
    setShowForm(false);
    resetForm();
    setErrors({});
  };

  const handleEditContact = (contact) => {
    setEditContactId(contact.contactId);
    setInputFields({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    });
    setProfile(contact.profile || "");
    setShowForm(true);
  };

  const handleDeleteContact = (contactId) => {
    const updatedContacts = user.contacts.filter(
      (contact) => contact.contactId !== contactId
    );
    const updatedUser = { ...user, contacts: updatedContacts };

    const userIndex = storedUserData.findIndex((u) => u.email === user.email);
    if (userIndex !== -1) storedUserData[userIndex] = updatedUser;

    setLocalStorage("users", storedUserData);
    setLocalStorage("logged-user", updatedUser);
    setUser(updatedUser);
  };
  function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
      (
        +c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
      ).toString(16)
    );
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const errors = validateValues(inputFields);
    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    if (profile === "") {
      toast.error("Please add a profile picture.");
      return;
    }
    const newContact = {
      ...inputFields,
      profile,
      contactId: editContactId || uuidv4(),
    };

    const updatedContacts = editContactId
      ? user.contacts.map((contact) =>
          contact.contactId === editContactId ? newContact : contact
        )
      : [...(user.contacts || []), newContact];
    const updatedUser = { ...user, contacts: updatedContacts };

    const userIndex = storedUserData.findIndex((u) => u.email === user.email);
    if (userIndex !== -1) storedUserData[userIndex] = updatedUser;

    setLocalStorage("users", storedUserData);
    setLocalStorage("logged-user", updatedUser);
    setUser(updatedUser);

    toast.success(editContactId ? "Contact updated!" : "Contact added!");
    handleHideForm();
  };

  const handleUserLogout = () => {
    toast.success("Log out successfully");
    setTimeout(() => {
      removeCookie("logged-user", { path: "/" });
      navigate("/");
    }, [1500]);
  };

  return (
    <>
      <div>
        <div className="flex justify-end relative">
          <button
            onClick={handleUserLogout}
            className="flex w-24 m-3 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Log out
          </button>
        </div>
        <div className="bg-white py-5 sm:py-10">
          <div className="mx-auto px-6 lg:px-8">
            {user ? (
              <>
                <div className="flex justify-between w-full mb-10">
                  <h2 className="text-4xl font-semibold text-gray-900">
                    Welcome, {user.name}
                  </h2>{" "}
                  <div className="flex items-center gap-3">
                    <ImportContact />
                    <ExportContact userContact={user.contacts} />
                    <button
                      onClick={handleToggleForm}
                      className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500"
                    >
                      Add Contact
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <h2 className="text-4xl font-semibold text-gray-900">
                Loading user...
              </h2>
            )}
            <ContactList
              userData={user.contacts}
              onEdit={handleEditContact}
              onDelete={handleDeleteContact}
            />
            {showForm && (
              <>
                <div className=" bg-slate-600 absolute w-full h-[907px] top-0 left-0 opacity-50"></div>
                <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 absolute top-[15%] left-[40%] w-[500px] bg-slate-100 shadow-lg rounded-md ">
                  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                      onSubmit={handleFormSubmit}
                      method="POST"
                      className="space-y-6"
                    >
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Name
                        </label>
                        <div className="mt-2">
                          <input
                            id="name"
                            name="name"
                            type="name"
                            autoComplete="name"
                            value={inputFields.name}
                            onChange={handleChange}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                          {errors.name && (
                            <p className="text-[12px] text-red-600">
                              {errors.name}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={inputFields.email}
                            onChange={handleChange}
                            autoComplete="email"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                          {errors.email && (
                            <p className="text-[12px] text-red-600">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="number"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Number
                          </label>
                        </div>
                        <div className="mt-2">
                          <input
                            name="phone"
                            type="number"
                            value={inputFields.phone}
                            onChange={handleChange}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                          {errors.phone && (
                            <p className="text-[12px] text-red-600">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-center w-full gap-7">
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                        >
                          {profile ? (
                            <img src={profile} alt="" className="w-24" />
                          ) : (
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Preview</span>{" "}
                            </p>
                          )}
                        </label>
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Upload picture
                              </span>{" "}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PNG or JPG (MAX. 2MB)
                            </p>
                          </div>
                          <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            onChange={handlePictureUpload}
                          />
                        </label>
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
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
