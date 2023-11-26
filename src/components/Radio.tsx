interface RadioProps {
    id: string;
    name: string;
    value: string;
    label: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Radio({ id, name, value, label, onChange }: RadioProps) {
    return (
      <li  className="w-full border-b border-gray-200 rounded-t-lg">
          <div onChange={onChange}  className="flex items-center ps-3">
              <input id={id} type="radio" value={value} name={name} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2"></input>
              <label htmlFor={id} className="w-full py-3 ms-2 text-sm font-medium text-gray-900">{label}</label>
          </div>
      </li>
    );
}

export default Radio;

