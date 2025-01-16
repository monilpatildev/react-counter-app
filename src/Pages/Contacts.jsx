/* eslint-disable react-hooks/exhaustive-deps */
// import { useState, useEffect } from "react";
// // import {  } from "react-router";
// import { toast, ToastContainer } from "react-toastify";
// import ContactList from "../components/ContactList";
// import { useNavigate } from "react-router";

// export default function Contacts() {
//   const [user, setUser] = useState({});
//   const [showForm, setShowForm] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [profile, setProfile] = useState("");

//   const navigate = useNavigate();

//   const storedUserData = JSON.parse(localStorage.getItem("users")) || [];

//   useEffect(() => {
//     const fetchUser = async () => {
//       const loggedInUser = await JSON.parse(
//         localStorage.getItem("logged-user")
//       );
//       const existingUser = storedUserData.find(
//         (item) => item.email === loggedInUser.email
//       );
//       setUser(existingUser);
//       console.log(existingUser.contacts);
//     };
//     fetchUser();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user.contacts]);

//   const handleToggleForm = async () => {
//     setShowForm(!showForm);
//   };
//   const handleHideForm = () => {
//     setShowForm(false);
//   };

//   const handlePictureUpload = async (e) => {
//     function validateUserImage(image) {
//       const validFormats = ["image/jpeg", "image/png"];
//       const maxSize = 2 * 1024 * 1024;
//       if (!image) {
//         toast.error("Please select an image");
//         return false;
//       } else {
//         if (image.size > maxSize) {
//           toast.error("Image size should be 2 MB");
//           return false;
//         } else if (!validFormats.includes(image.type)) {
//           toast.error("Please select a valid image file (jpeg, png)");
//           return false;
//         }
//       }
//       return true;
//     }

//     const file = e.target.files[0];
//     const imageValidated = validateUserImage(file);
//     if (imageValidated) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setProfile(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   function uuidv4() {
//     return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
//       (
//         +c ^
//         (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
//       ).toString(16)
//     );
//   }
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     const newContact = {
//       name,
//       email,
//       phone,
//       profile,
//       contactId: uuidv4(),
//     };

//     if (user && user.email) {
//       const existingUserIndex = storedUserData.findIndex(
//         (item) => item.email === user.email
//       );

//       console.log(existingUserIndex);

//       if (existingUserIndex !== -1) {
//         user.contacts = user.contacts || [];
//         user.contacts.push(newContact);
//         storedUserData.splice(existingUserIndex, 1, user);
//         localStorage.setItem("users", JSON.stringify(storedUserData));
//         console.log("Updated users data:", storedUserData);
//       } else {
//         console.error("User not found in storedUserData");
//       }
//     } else {
//       console.error("Invalid user data");
//     }
//     setShowForm(false);
//     setEmail("");
//     setName("");
//     setPhone("");
//   };

//   const handleUserLogout = () => {
//     localStorage.removeItem("logged-user");
//     navigate("/");
//   };
//   return (
//     <>
//       <div>
//         <div className=" flex justify-end relative">
//           <button
//             onClick={handleUserLogout}
//             type="submit"
//             className="flex w-24 m-3  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           >
//             Log out
//           </button>
//         </div>
//         <div className="bg-white py-24 sm:py-32 ">
//           <div className="mx-auto  px-6 lg:px-8">
//             <div className="mx-auto  lg:mx-0">
//               {user ? (
//                 <>
//                   <div className=" flex justify-between w-full">
//                     <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl mb-5">
//                       Welcome, {user.name}
//                     </h2>
//                     <span>
//                       {showForm ? (
//                         ""
//                       ) : (
//                         <button
//                           onClick={handleToggleForm}
//                           type="submit"
//                           className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                         >
//                           Add Contact
//                         </button>
//                       )}
//                     </span>{" "}
//                   </div>
//                 </>
//               ) : (
//                 <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
//                   Loading user...
//                 </h2>
//               )}
//             </div>
//             <ContactList userData={user.contacts} />
//             {showForm && (
//               <>
//                 <div className=" bg-slate-600 absolute w-full h-full top-0 left-0 opacity-50"></div>
//                 <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 absolute top-[15%] left-[40%] w-[500px] bg-slate-100 shadow-lg rounded-md ">
//                   <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//                     <form
//                       onSubmit={handleFormSubmit}
//                       method="POST"
//                       className="space-y-6"
//                     >
//                       <div>
//                         <label
//                           htmlFor="name"
//                           className="block text-sm/6 font-medium text-gray-900"
//                         >
//                           Name
//                         </label>
//                         <div className="mt-2">
//                           <input
//                             id="name"
//                             name="name"
//                             type="name"
//                             required
//                             autoComplete="name"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                           />
//                         </div>
//                       </div>
//                       <div>
//                         <label
//                           htmlFor="email"
//                           className="block text-sm/6 font-medium text-gray-900"
//                         >
//                           Email address
//                         </label>
//                         <div className="mt-2">
//                           <input
//                             id="email"
//                             name="email"
//                             type="email"
//                             required
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             autoComplete="email"
//                             className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                           />
//                         </div>
//                       </div>
//                       <div>
//                         <div className="flex items-center justify-between">
//                           <label
//                             htmlFor="number"
//                             className="block text-sm/6 font-medium text-gray-900"
//                           >
//                             Number
//                           </label>
//                         </div>
//                         <div className="mt-2">
//                           <input
//                             id="number"
//                             name="number"
//                             type="number"
//                             required
//                             value={phone}
//                             onChange={(e) => setPhone(e.target.value)}
//                             autoComplete="current-number"
//                             className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                           />
//                         </div>
//                       </div>

//                       <div className="flex items-center justify-center w-full">
//                         <label
//                           htmlFor="dropzone-file"
//                           className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
//                         >
//                           <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                             <svg
//                               className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
//                               aria-hidden="true"
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 20 16"
//                             >
//                               <path
//                                 stroke="currentColor"
//                                 d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//                               />
//                             </svg>
//                             <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                               <span className="font-semibold">
//                                 Upload picture
//                               </span>{" "}
//                               or drag and drop
//                             </p>
//                             <p className="text-xs text-gray-500 dark:text-gray-400">
//                               PNG or JPG (MAX. 2MB)
//                             </p>
//                           </div>
//                           <input
//                             id="dropzone-file"
//                             type="file"
//                             className="hidden"
//                             onChange={handlePictureUpload}
//                           />
//                         </label>
//                       </div>

//                       <div className=" flex gap-5">
//                         <button
//                           type="submit"
//                           className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                         >
//                           Add Contact
//                         </button>
//                         <button
//                           type="submit"
//                           onClick={handleHideForm}
//                           className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//                 <ToastContainer />
//               </>
//             )}
//           </div>
//         </div>
//         <ToastContainer />
//       </div>
//     </>
//   );
// }


import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import ContactList from "../components/ContactList";
import { useNavigate } from "react-router";

export default function Contacts() {
  const [user, setUser] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profile, setProfile] = useState("");
  const [editContactId, setEditContactId] = useState(null); // New state for editing

  const navigate = useNavigate();
  const storedUserData = JSON.parse(localStorage.getItem("users")) || [];

  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = await JSON.parse(
        localStorage.getItem("logged-user")
      );
      const existingUser = storedUserData.find(
        (item) => item.email === loggedInUser.email
      );
      setUser(existingUser);
    };
    fetchUser();
  }, [user.contacts]);

  const handleToggleForm = () => {
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setProfile("");
    setEditContactId(null);
  };

  const handlePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditContact = (contact) => {
    setEditContactId(contact.contactId);
    setName(contact.name);
    setEmail(contact.email);
    setPhone(contact.phone);
    setProfile(contact.profile || "");
    setShowForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const updatedContact = {
      name,
      email,
      phone,
      profile,
      contactId: editContactId,
    };

    const existingUserIndex = storedUserData.findIndex(
      (item) => item.email === user.email
    );

    if (existingUserIndex !== -1) {
      if (editContactId) {
        const contactIndex = user.contacts.findIndex(
          (c) => c.contactId === editContactId
        );
        user.contacts[contactIndex] = updatedContact;
      } else {
        user.contacts = user.contacts || [];
        user.contacts.push(updatedContact);
      }

      storedUserData[existingUserIndex] = user;
      localStorage.setItem("users", JSON.stringify(storedUserData));
      setUser({ ...user });
    }

    resetForm();
    setShowForm(false);
  };

  const handleUserLogout = () => {
    localStorage.removeItem("logged-user");
    navigate("/");
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
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto px-6 lg:px-8">
            {user ? (
              <>
                <div className="flex justify-between w-full">
                  <h2 className="text-4xl font-semibold text-gray-900">
                    Welcome, {user.name}
                  </h2>
                  <button
                    onClick={handleToggleForm}
                    className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500"
                  >
                    Add Contact
                  </button>
                </div>
              </>
            ) : (
              <h2 className="text-4xl font-semibold text-gray-900">
                Loading user...
              </h2>
            )}
            <ContactList userData={user.contacts} onEdit={handleEditContact} />
            {showForm && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded shadow-md">
                  <form onSubmit={handleFormSubmit}>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      required
                      className="w-full p-2 mb-2 border rounded"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                      className="w-full p-2 mb-2 border rounded"
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone"
                      required
                      className="w-full p-2 mb-2 border rounded"
                    />
                    <input
                      type="file"
                      onChange={handlePictureUpload}
                      className="mb-4"
                    />
                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded"
                      >
                        {editContactId ? "Save Changes" : "Add Contact"}
                      </button>
                      <button
                        type="button"
                        onClick={handleHideForm}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
