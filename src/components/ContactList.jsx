/* eslint-disable react/prop-types */


const ContactList = ({ userData, onEdit ,onDelete }) => {

console.log(userData);

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
                className="size-16 rounded-full bg-gray-50 object-cover"
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
                onClick={() => onDelete(contact.contactId)}
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
