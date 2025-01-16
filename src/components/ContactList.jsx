/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// const ContactList = ({ userData }) => {
//   // const handleEditContact = (contactId) => {
//   //   const storedUserData = JSON.parse(localStorage.getItem("users"));
//   //   const loggedUser = JSON.parse(localStorage.getItem("logged-user"));
//   //   const userIndex = storedUserData.findIndex(
//   //     (user) => user.email === loggedUser.email
//   //   );

//   //   if (userIndex !== -1) {
//   //     const updatedContacts = storedUserData[userIndex].contacts.filter(
//   //       (contact) => contact.contactId !== contactId
//   //     );
//   //     storedUserData[userIndex].contacts = updatedContacts;
//   //     localStorage.setItem("users", JSON.stringify(storedUserData));

//   //     localStorage.setItem(
//   //       "logged-user",
//   //       JSON.stringify(storedUserData[userIndex])
//   //     );
//   //   }
//   // };
//   const handleDeleteContact = (contactId) => {
//     const storedUserData = JSON.parse(localStorage.getItem("users"));
//     const loggedUser = JSON.parse(localStorage.getItem("logged-user"));
//     const userIndex = storedUserData.findIndex(
//       (user) => user.email === loggedUser.email
//     );

//     if (userIndex !== -1) {
//       const updatedContacts = storedUserData[userIndex].contacts.filter(
//         (contact) => contact.contactId !== contactId
//       );
//       storedUserData[userIndex].contacts = updatedContacts;
//       localStorage.setItem("users", JSON.stringify(storedUserData));

//       localStorage.setItem(
//         "logged-user",
//         JSON.stringify(storedUserData[userIndex])
//       );
//       // window.location.reload();
//     }
//   };

//   return (
//     <>
//       <div className="mx-auto grid max-w-2xl grid-cols-3 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 md:grid-cols-2">
//         {userData ? (
//           userData.map((post) => (
//             <article
//               className="flex flex-row max-w-2xl w-full p-8 items-center border border-gray-400 rounded-md justify-between"
//               key={post.contactId}
//             >
//               <div className="relative flex items-center gap-x-4">
//                 <img
//                   alt=""
//                   src={post.profile}
//                   className="size-10 rounded-full bg-gray-50"
//                 />
//                 <div className="text-sm/6">
//                   <h2 className="font-semibold text-gray-900">{post.name}</h2>
//                   <p className="text-gray-600">{post.email}</p>
//                   <p className="text-gray-600">{post.phone}</p>
//                 </div>
//               </div>
//               <div className="flex gap-5">
//                 <button
//                   type="submit"
//                   className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                   // onClick={() => handleEditContact(post.contactId)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   type="submit"
//                   className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                   onClick={() => handleDeleteContact(post.contactId)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </article>
//           ))
//         ) : (
//           <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
//             No contacts available
//           </h2>
//         )}
//       </div>
//     </>
//   );
// };

// export default ContactList;

const ContactList = ({ userData, onEdit }) => {
  const handleDeleteContact = (contactId) => {
    const storedUserData = JSON.parse(localStorage.getItem("users"));
    const loggedUser = JSON.parse(localStorage.getItem("logged-user"));
    const userIndex = storedUserData.findIndex(
      (user) => user.email === loggedUser.email
    );

    if (userIndex !== -1) {
      const updatedContacts = storedUserData[userIndex].contacts.filter(
        (contact) => contact.contactId !== contactId
      );
      storedUserData[userIndex].contacts = updatedContacts;
      localStorage.setItem("users", JSON.stringify(storedUserData));
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {userData && userData.length > 0 ? (
        userData.map((contact) => (
          <div
            key={contact.contactId}
            className="p-4 border rounded flex justify-between items-center"
          >
            <div className="relative flex items-center gap-x-4">
              <img
                alt=""
                src={contact.profile}
                className="size-10 rounded-full bg-gray-50"
              />
              <div className="text-sm/6">
                <h2 className="font-semibold text-gray-900">{contact.name}</h2>
                <p className="text-gray-600">{contact.email}</p>
                <p className="text-gray-600">{contact.phone}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(contact)}
                className="bg-indigo-600 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteContact(contact.contactId)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No contacts found.</p>
      )}
    </div>
  );
};

export default ContactList;
