import { useMemo, useState} from "react";
import axios from "axios";
import Select from "react-select";
import { debounce } from "lodash";
import { useLocContext } from "../../context/locationContext";
const apiUrl = process.env.REACT_APP_API_URL;
const customComponents = {
    IndicatorSeparator: () => null,
    DropdownIndicator: () => null,
};
export const DropDown = () => {
    const {setLocation} = useLocContext(); 
    const [options, setOptions] = useState(
        []
    );
const debouncedFetch = useMemo(() => debounce(async (inputValue) => {
  if (inputValue === '') {
    setOptions([]);
    return;
  }

  try {
    let res = await axios.post(`${apiUrl}/getdata/getLocInputInfo`, {
      locName: inputValue,
    });
    setOptions(res.data.options);
  } catch (err) {
    console.error(err);
  }
},200));

const setLocData = (e) =>
  {

   let data = e.label.split(',').map(val => val.trim()); 
  setLocation(data); 
  }

const inputChange = (inputValue) => {
    debouncedFetch(inputValue);
}
  return (
    <Select
      className="sm:w-2/4 w-[70%] "
      options={options}
      onInputChange={inputChange}
      onChange={setLocData}
      placeholder="Enter the name or postal code..."
      noOptionsMessage={() => "No places found"}
      components={customComponents}
      styles={{
          control: (base) => ({
              ...base,
              backgroundColor: "#2F3741",
          color: "#FFFFFF",
          height:'50px',
          borderRadius: "10px",
          border:"#1d62b6ff",
          boxShadow: "none"
        }),
        input: (base) => ({
            ...base,
          color: "#FFFFFF",
          borderRadius: "10px",
        }),
        placeholder: (base) => ({
          ...base,
          color: "#FFFFFF",
        }),
        singleValue: (base) => ({
            ...base,
            color: "#FFFFFF",
        }),
        option: (base, state) => ({
            ...base,
            height: "100%",
            backgroundColor: state.isFocused ? "#374151" : "#21262A",
            color: "#FFFFFF",
            borderRadius: "10px",
        }),
        menuPortal: base => ({ ...base, zIndex: 40 }),
        menu: (base) => ({
          ...base,
          backgroundColor: "#21262A",
          paddingTop:0,
          borderRadius: "10px",
          zIndex:40,
        }),
        menuList: (base) => ({
          ...base,
          paddingTop: 0,
          paddingBottom: 0,
          borderRadius: "10px",
        }),
      }}
    />
  );
};
