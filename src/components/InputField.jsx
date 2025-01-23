/* eslint-disable react/prop-types */

const InputField = ({
  id,
  name,
  type,
  label,
  value,
  error,
  onChange,
  autoComplete,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm/6 font-medium text-gray-900">
        {label}
        <span className="ml-1 text-red-600">*</span>
      </label>
      <div className="mt-2">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 ${
            error ? "outline-red-500" : "outline-indigo-600"
          }`}
        />
        {error && <p className="text-[12px] text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default InputField;
