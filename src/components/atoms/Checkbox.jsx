import { useEffect, useImperativeHandle, useRef } from 'react';
import styles from './Checkbox.module.css';
import utilities from '../../styles/atomUtilities.module.css';

/** Case à cocher native avec état mixte facultatif et rappel recevant un booléen. */
export default function Checkbox({
  variant = 'default',
  size = 'md',
  radius,
  indeterminate = false,
  invalid = false,
  id,
  name,
  value,
  checked,
  defaultChecked,
  disabled = false,
  required = false,
  autoFocus = false,
  onChange,
  onCheckedChange,
  onFocus,
  onBlur,
  ref,
  className,
  ...props
}) {
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => inputRef.current, []);
  useEffect(() => {
    inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return (
    <input
      {...props}
      ref={inputRef}
      type="checkbox"
      id={id}
      name={name}
      value={value}
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      required={required}
      autoFocus={autoFocus}
      aria-invalid={invalid || props['aria-invalid']}
      onChange={(event) => {
        onChange?.(event);
        onCheckedChange?.(event.target.checked, event);
      }}
      onFocus={onFocus}
      onBlur={onBlur}
      className={`${styles.base} ${styles[variant] || ''} ${styles[size] || ''} ${utilities[radius] || ''} ${className || ''}`.trim()}
    />
  );
}
