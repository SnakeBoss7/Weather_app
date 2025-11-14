import { useEffect, useRef, useState, useCallback } from "react";
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
  const { setLocation } = useLocContext();
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Track the latest request to handle race conditions
  const requestIdRef = useRef(0);
  const abortControllerRef = useRef(null);

  // Cleanup function
  useEffect(() => {
    return () => {
      // Cancel any pending debounced calls on unmount
      debouncedFetch.cancel();
      // Abort any in-flight requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const fetchLocations = async (inputValue, requestId) => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    try {
      setIsLoading(true);
      
      const res = await axios.post(
        `${apiUrl}/getdata/getLocInputInfo`,
        { locName: inputValue },
        { 
          signal: abortControllerRef.current.signal,
          timeout: 8000 
        }
      );

      // Only update if this is the latest request
      if (requestId === requestIdRef.current) {
        setOptions(res.data.options || []);
      }
    } catch (err) {
      // Ignore abort errors
      if (axios.isCancel(err) || err.name === 'AbortError') {
        return;
      }
      
      console.error('Location fetch error:', err);
      
      // Only update if this is the latest request
      if (requestId === requestIdRef.current) {
        setOptions([]);
      }
    } finally {
      // Only update loading state if this is the latest request
      if (requestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  };

  // Use useCallback to memoize the debounced function properly
  const debouncedFetch = useCallback(
    debounce((inputValue) => {
      if (!inputValue || inputValue.trim() === '') {
        setOptions([]);
        setIsLoading(false);
        return;
      }

      // Increment request ID for race condition handling
      requestIdRef.current += 1;
      fetchLocations(inputValue.trim(), requestIdRef.current);
    }, 400),
    [] // Empty dependency array - function is stable
  );

  const handleInputChange = (inputValue, { action }) => {

    if (action === 'input-change') {
      debouncedFetch(inputValue);
    }
  };

  const handleChange = (selectedOption) => {
    if (selectedOption?.value) {
      setLocation(selectedOption.value);
    }
  };

  return (
    <Select
      className="sm:w-2/4 w-[70%]"
      options={options}
      onInputChange={handleInputChange}
      onChange={handleChange}
      placeholder="Enter the name or postal code..."
      noOptionsMessage={() => isLoading ? "Loading..." : "No places found"}
      isLoading={isLoading}
      components={customComponents}
      isClearable
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: "#2F3741",
          color: "#FFFFFF",
          height: '50px',
          borderRadius: "10px",
          border: "1px solid #1d62b6ff",
          boxShadow: "none",
          "&:hover": {
            border: "1px solid #1d62b6ff",
          }
        }),
        input: (base) => ({
          ...base,
          color: "#FFFFFF",
        }),
        placeholder: (base) => ({
          ...base,
          color: "#9CA3AF",
        }),
        singleValue: (base) => ({
          ...base,
          color: "#FFFFFF",
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused ? "#374151" : "#21262A",
          color: "#FFFFFF",
          cursor: "pointer",
          "&:active": {
            backgroundColor: "#4B5563",
          }
        }),
        menuPortal: (base) => ({ 
          ...base, 
          zIndex: 9999 
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: "#21262A",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
        }),
        menuList: (base) => ({
          ...base,
          padding: 0,
          maxHeight: "300px",
        }),
        loadingIndicator: (base) => ({
          ...base,
          color: "#1d62b6ff",
        }),
      }}
      menuPortalTarget={document.body}
    />
  );
};