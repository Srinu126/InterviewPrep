/**
 * useImperativeHandle is a React Hook that lets you customize the handle exposed as a ref.
 * It is typically used in combination with forwardRef to control what values or methods the parent component can access on a child component.
 * It is typically used to expose custom methods or properties to the parent, and it helps avoid exposing unnecessary internal details of the child component.
 */

import { forwardRef, useImperativeHandle, useRef } from "react";

const UseImperativeHandle = () => {
  const ref = useRef<HTMLInputElement | null>(null);
  return (
    <div className="m-3">
      <h1>useImperativeHandle Demo</h1>
      <button
        className="p-3 bg-slate-700 text-white hover:opacity-90 rounded-lg"
        onClick={() => {
          if (ref.current) {
            ref.current.focus();
          }
        }}
      >
        Click to focus the input
      </button>
      <ChildComp ref={ref} />
    </div>
  );
};

const ChildComp = forwardRef((_props, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useImperativeHandle(
    ref,
    () => {
      return {
        focus() {
          if (inputRef.current) inputRef.current.focus();
        },
        scroll() {
          if (inputRef.current) inputRef.current.scrollIntoView();
        },
      };
    },
    []
  );
  return (
    <>
      <h1>Child Component</h1>
      <input
        className="w-3/4 p-3 bg-slate-200 rounded-lg"
        type="text"
        ref={inputRef}
      />
    </>
  );
});

export default UseImperativeHandle;
