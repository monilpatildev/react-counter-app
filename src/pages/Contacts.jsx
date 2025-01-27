/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { setLocalStorage } from "../utils/manageStorage.js";
import { getLocalStorage } from "../utils/manageStorage.js";
import { uuidv4 } from "../utils/uuid.js";
import { RxCross2 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import ContactList from "../components/ContactList.jsx";
import ExportContact from "../components/ExportContact.jsx";
import ImportContact from "../components/ImportContact.jsx";
import InputForm from "../components/InputForm.jsx";
import Cookies from "js-cookie";

export default function Contacts({ setIsLoggedIn }) {
  const [userID, setUserID] = useState("");
  const [user, setUser] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editContact, setEditContact] = useState(null);
  const [importedContact, setImportedContact] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [searchedData, setSearchData] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [cookies] = useCookies();

  useEffect(() => {
    const fetchUser = () => {
      const loggedInUserId = cookies["logged-user"];
      const storedUserData = getLocalStorage("users");
      const existingUser = storedUserData.find(
        (item) => item.userId === loggedInUserId
      );
      if (existingUser) {
        setUserID(loggedInUserId);
        setUser(existingUser);
      }
    };
    fetchUser();
  }, [importedContact, contacts]);

  const handleToggleForm = () => {
    setShowForm(true);
  };

  const handleEditContact = (contact) => {
    setEditContact(contact);
    setShowForm(true);
  };

  const handleImportData = (importedData) => {
    setImportedContact(importedData);
    const storedContacts = getLocalStorage("contacts");
    for (const importedNewUser of importedData) {
      importedNewUser.contactId = uuidv4();
      importedNewUser.refId = userID;
      storedContacts.push(importedNewUser);
    }
    setLocalStorage("contacts", storedContacts);
  };

  const handleDeleteContact = (contactId) => {
    const storedContacts = getLocalStorage("contacts");
    const updatedContacts = storedContacts.filter(
      (contact) => contact.contactId !== contactId
    );
    if (confirm("Are you sure to delete the contact?")) {
      setLocalStorage("contacts", updatedContacts);
      setContacts(updatedContacts);
    }
  };

  const handleSearchData = (e) => {
    setTimeout(() => {
      setSearchData(e.target.value);
    }, 1000);
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    toast.success("Logged out successfully", {
      autoClose: 800,
      onClose: () => setIsLoggedIn(false),
    });
    Cookies.remove("logged-user");
  };

  return (
    <>
      <div className="text-center">
        <div>
          <GiHamburgerMenu
            onClick={toggleDrawer}
            className=" m-5 text-3xl cursor-pointer"
            data-drawer-target="drawer-navigation"
            data-drawer-show="drawer-navigation"
            aria-controls="drawer-navigation"
          />
          {isOpen && (
            <div
              className=" bg-black absolute w-full h-full top-0 left-0 opacity-25 z-10"
              onClick={toggleDrawer}
            ></div>
          )}

          <div
            id="drawer-navigation"
            className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform bg-white  shadow-xl ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            tabIndex="-1"
            aria-labelledby="drawer-navigation-label"
          >
            <h5
              id="drawer-navigation-label"
              className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
            >
              Menu
            </h5>
            <button
              type="button"
              onClick={toggleDrawer}
              className="text-gray-400 bg-transparent  hover:bg-gray-200  rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center  "
            >
              <RxCross2
                onClick={toggleDrawer}
                className=" text-2xl cursor-pointer"
              />
            </button>
            <div className="py-4 overflow-y-auto">
              <ul className="space-y-2 font-medium">
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-grey-300 group"
                  >
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      <ImportContact onImport={handleImportData} />
                    </span>
                  </a>
                </li>
                <li>
                  <div className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-grey-300 group">
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      <ExportContact userID={userID} />
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-between relative items-center mx-10 pt-2">
          <h2 className="text-4xl font-semibold text-gray-900">
            {user.name ? `Welcome, ${user.name}` : "Welcome"}
          </h2>
          <button
            onClick={handleLogout}
            className="flex w-24  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Log out
          </button>
        </div>
        <div className="bg-white py-5 sm:py-5 ">
          <div className="mx-auto px-6 lg:px-10">
            {user ? (
              <>
                <div className="flex justify-between w-full mb-5">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Your Contacts
                  </h2>{" "}
                  <div className="flex items-center gap-3">
                    <input
                      type="search"
                      onChange={handleSearchData}
                      className="block w-half rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2  sm:text-sm/6 focus:outline-indigo-600"
                      placeholder="Search "
                    />

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
              user={user}
              searchedData={searchedData}
              onEdit={handleEditContact}
              onDelete={handleDeleteContact}
            />

            {userID && showForm ? (
              <InputForm
                user={user}
                setShowForm={setShowForm}
                setEditContact={setEditContact}
                editContact={editContact}
              />
            ) : (
              ""
            )}
          </div>{" "}
        </div>
      </div>

      <ToastContainer />
    </>
  );
}
