import { useState } from "react";

function CheckBox(color) {
    const [isChecked, setIsChecked] = useState(false);

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
          <div className={`w-4 h-4 border-2 border-gray-400 rounded-sm bg-gradient-to-br from-white-500 to-${color}-500 absolute top-0 left-0`}></div>
          {isChecked && (
            <div className="absolute top-0 left-0">
              <svg
                className={`w-3 h-3 text-${color} fill-current`}
                viewBox="0 0 12 9"
              >
                <path
                  d="M1 5.5L4.5 9L11 1"
                  stroke="white"
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