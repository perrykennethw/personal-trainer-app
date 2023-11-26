import Radio from "./Radio";

interface RadioListGroupProps {
    name: string;
    options: RadioOption[];
}

interface RadioOption {
    label: string;
    value: string;
}

function RadioListGroup({ name, options }: RadioListGroupProps) {
  return (
    <>
        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white"></h3>
        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
        {
            options.map((option: RadioOption, index: number) => (
                <Radio
                    key={index}
                    id={`${name}-${option.value}`}
                    name={name}
                    value={option.value}
                    label={option.label}
                />
            ))
        }
        </ul>
    </>
  );
}


export default RadioListGroup;