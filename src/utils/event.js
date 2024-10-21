export const handleKeyDown = (action, event) => {
  event.key === "Enter" && action();
};

export const handleOnChange = (
  event,
  setField,
  setError,
  setSuccess = null
) => {
  setField(event.target.value);
  setError(null);

  setSuccess && setSuccess(null);
};
