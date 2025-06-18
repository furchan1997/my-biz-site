function Input({ lable, inputType, ...rest }) {
  return (
    <div className="mb-3 rtl w-100">
      <label className="form-label fw-bold" htmlFor={rest.name}>
        {lable}
        {rest.requried && <span className="text-danger ms-1">*</span>}
      </label>
      <input
        type={inputType}
        className="form-control border-2 border-primary"
        id={rest.name}
        {...rest}
      />
      ;
      {rest.error && (
        <div className="invalid-feedback d-block">{rest.error}</div>
      )}
    </div>
  );
}

export default Input;
