/* eslint-disable react/prop-types */
import { getLocalStorage } from "../utils/manageStorage";
// import { useId} from "react"; 
import {  useState } from "react";
import Pagination from "./Pagination";

const ContactList = ({ user, onEdit, onDelete, searchedData }) => {
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const storedContacts = getLocalStorage("contacts");
  // const componentId = useId();  

  const filteredContacts = storedContacts.filter(
    (contact) => contact.refId === user.userId
  );
  let slicedContactsData;
  if (filteredContacts) {
    slicedContactsData = filteredContacts;
  }
  if (searchedData) {
    const filteredContacts = storedContacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchedData.toLowerCase()) ||
        contact.phone.includes(searchedData) ||
        contact.email.includes(searchedData)
    );
    slicedContactsData = filteredContacts;
  }

  const totalPages = Math.ceil(slicedContactsData.length / itemsPerPage);
  const remainingItems = Math.ceil(slicedContactsData.length % itemsPerPage);

  const currentData = slicedContactsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className=" min-h-[655px]">
        <div className="grid grid-cols-3 gap-10 ">
          {currentData && currentData.length > 0 ? (
            currentData.map((contact) => (
              <div
                key={contact.contactId}
                className="p-4 border rounded-lg shadow-md flex flex-col justify-between items-center gap-y-6"
              >
                <div className="relative flex flex-col items-center gap-y-6 justify-center">
                  <img
                    alt=""
                    src={contact.profile}
                    className="size-28 rounded-full bg-gray-50 object-cover"
                  />
                  <div className="text-md/6 flex flex-col items-center gap-y-1 justify-center text-center">
                    <h2 className="font-semibold text-gray-900 text-ellipsis whitespace-nowrap overflow-hidden w-[250px]">
                      {contact.name}
                    </h2>
                    <p className="text-gray-600 text-ellipsis whitespace-nowrap overflow-hidden w-[200px] ">
                      {contact.email}
                    </p>
                    <p className="text-gray-600">{contact.phone}</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <button
                    onClick={() => onEdit(contact)}
                    className="bg-indigo-600 text-white px-5 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(contact.contactId)}
                    className="bg-red-600 text-white px-5 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className=" w-full  text-2xl">No contacts found.</p>
          )}
        </div>
      </div>
      {totalPages !== 1 || totalPages !== 0 ? (
        <Pagination
          currentPage={currentPage}
          setItemsPerPage={setItemsPerPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          remainingItems={remainingItems}
          filteredContacts={filteredContacts}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ContactList;
