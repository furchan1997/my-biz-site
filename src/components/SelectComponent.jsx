function SelectComponent({
  label,
  value,
  option = [],
  onChange,
  error,
  ...rest
}) {
  return (
    <div className="mb-3 rtl w-100">
      <label htmlFor={rest.name} className="form-label fw-bold">
        {label}
      </label>

      <select
        className="form-select border-2 border-primary"
        name={rest.name}
        id={rest.name}
        onChange={onChange}
        value={value}
        {...rest}
      >
        <option>בחר</option>

        {option.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
}

export default SelectComponent;
