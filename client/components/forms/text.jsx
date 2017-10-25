export default ({ label, placeholder, id, name, value, onChange }) => (
  <div className="form-control">
    <label htmlFor={id}>{label}:</label>
    <input type="text" name={name} id={id} value={value} onChange={onChange} />
  </div>
)
