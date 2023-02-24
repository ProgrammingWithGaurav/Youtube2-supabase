import { useState } from "react";
import { useStateContext } from "../context/StateContext";

function CheckBox() {
  const [isChecked, setIsChecked] = useState(false);
  const { appearance } = useStateContext();

  return (
    <div className="flex items-center">
      <label htmlFor="colorful-checkbox" className="cursor-pointer">
        <div className="relative">
          <input
            id="colorful-checkbox"
            type="checkbox"
            className="sr-only"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <div
            className={`w-6 h-6 border-2 click-show p-1 border-indigo-600 rounded-md ${
              appearance === "dark"
                ? "from-indigo-200 to-rose-300 bg-gradient-to-br"
                : "from-indigo-500 to-indigo-500"
            } absolute top-0 left-0`}
          ></div>
          {isChecked && (
            <div className="absolute top-0 left-1">
              <svg
                className={`w-4 h-4 dark:text-white text-indigo-500 fill-current`}
                viewBox="0 0 12 9"
              >
                <path
                  d="M1 5.5L4.5 9L11 1"
                  stroke={appearance === "dark" ? "white" : "gray"}
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
          )}
        </div>
      </label>
    </div>
  );
}

export default CheckBox;
