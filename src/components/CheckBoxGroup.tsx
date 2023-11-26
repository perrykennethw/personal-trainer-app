interface CheckBoxGroupProps {
    label: string;
    options: CheckBoxOption[];
    selected: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface CheckBoxOption {
    label: string;
    value: string;
}

function CheckBoxGroup({ label, options, selected, onChange }: CheckBoxGroupProps) {
    return (
        <>
        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">{label}</h3>
        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
            {
            options.map((option: CheckBoxOption, index) => (
                <li key={index} className="w-full border-b border-gray-200 rounded-t-lg">
                <div className="flex items-center ps-3">
                    <input
                    id={`${option.value}`}
                    type="checkbox"
                    value={option.value}
                    name={option.label}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2"
                    checked={selected.includes(option.value)}
                    onChange={onChange}
                    />
                    <label htmlFor={option.value} className="w-full py-3 ms-2 text-sm font-medium text-gray-900">{option.label}</label>
                </div>
                </li>
            ))
            }
        </ul>
        </>
    );
}

export default CheckBoxGroup;