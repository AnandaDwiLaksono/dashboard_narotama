/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from "react";

export const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <div>
      <label onClick={()=>window.modalEdit.showModal()} className="label cursor-pointer">
        <input type="checkbox" className="hidden" ref={resolvedRef} {...rest} />
        <span className="label-text btn bg-white shadow-2">✏️</span>
      </label>
    </div>
  );
});


