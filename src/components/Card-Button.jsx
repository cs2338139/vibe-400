import { useRef, useState } from 'react';

import PropTypes from 'prop-types';

CardButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default function CardButton({ className, children }) {
  const button = useRef();
  const [buttonState, setButtonState] = useState(false);
  function Click() {
    setButtonState(!buttonState);

    if (buttonState) {
      button.current.style.color = 'rgb(243,238,229)';
      button.current.style.backgroundColor = 'rgb(40,142,62)';
    } else {
      button.current.style.color = null;
      button.current.style.backgroundColor = null;
    }
  }

  return (
    <div className={`flex grow items-end justify-start ${className}`}>
      <button
        className="h-[2.5rem] w-[8.1875rem] rounded-full bg-sec-3 text-pr-2 transition-all duration-300 hover:w-[20rem] hover:bg-pr-2 hover:text-sec-3"
        onClick={Click}
        ref={button}>
        {children}
      </button>
    </div>
  );
}
