import {
    FC,
    ReactElement,
    memo,
    useCallback
} from "react";

type ShortMenuProps = {
  selectedOption: string;
  options: string[];
  onChange: (option: string) => void;
};

const ShortMenu: FC<ShortMenuProps> = (props): ReactElement => {
  const { onChange, options, selectedOption } = props;

  const handleFoodChange = useCallback((option: string) => {
    onChange(option)
  }, [onChange]);

  return (
    <div className="relative w-80 border-none">
      <select
        className="appearance-none w-full py-1 px-2 bg-white text-black"
        id="frm-whatever"
        onChange={(event) => {
          handleFoodChange(event.target.value);
        }}
      >
        {options.map((item, index) => {
          return <option key={item + index}>{item}</option>;
        })}
      </select>
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
    </div>
    </div>
  );
};

export default memo(ShortMenu);
