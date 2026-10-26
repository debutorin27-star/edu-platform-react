import { forwardRef, useImperativeHandle, useRef } from 'react';

const TextField = forwardRef(function TextField(
  { label, icon, className = '', inputClassName = '', ...inputProps },
  ref
) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: (options) => inputRef.current?.focus(options),
  }), []);

  return (
    <label className={className || undefined}>
      {icon && <span aria-hidden="true">{icon}</span>}
      {label}
      <input ref={inputRef} className={inputClassName || undefined} {...inputProps} />
    </label>
  );
});

TextField.displayName = 'TextField';

export default TextField;
