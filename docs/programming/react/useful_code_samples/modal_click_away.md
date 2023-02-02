# Modal click away

Custom hook:

```jsx

import { useEffect, useRef } from "react";

export function useClickAway(ref, onClickAway) {
  // Keep a mutable reference to click away callback
  // and change it every time the component using it changes
  // using 'useRef' here will make sure that we have a mutable
  // and single callback lying around.
  const callbackRef = useRef(onClickAway);
  useEffect(() => {
    callbackRef.current = onClickAway;
  }, [onClickAway]);

  // listen for click events on ref element
  // attaching a handler and calling the callback if necessary
  useEffect(() => {
    const onPointerDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callbackRef.current(event);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [ref]);
}

```

Usage:


```jsx

import React, { useRef } from "react";
import { useClickAway } from "./useClickAway";

export default function Modal({ onClose }) {
  const modalRef = useRef(null);

  useClickAway(modalRef, () => {
    onClose();
  });

  return (
    <div className="shadow-overlay">
      <div ref={modalRef} className="my-modal">
        <div className="modal-header">Super important Action</div>
        <div className="modal-body">
          This is an important message. read it carefully.
        </div>
        <div className="modal-footer">
          <button onClick={onClose}>Cancel</button>
          <button>Ok</button>
        </div>
      </div>
    </div>
  );
}

```