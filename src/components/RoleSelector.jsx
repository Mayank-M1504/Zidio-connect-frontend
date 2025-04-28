import React from 'react';

const roles = [
  { value: '', label: 'Select Role' },
  { value: 'admin', label: 'Admin' },
  { value: 'company', label: 'Company' },
  { value: 'student', label: 'Student' },
];

const RoleSelector = ({ value, onChange, error, className = '', labelClassName = '', errorClassName = '' }) => (
  <div>
    <label className={labelClassName}>Role</label>
    <select
      value={value}
      onChange={onChange}
      className={className}
    >
      {roles.map((role) => (
        <option key={role.value} value={role.value} disabled={role.value === ''}>
          {role.label}
        </option>
      ))}
    </select>
    {error && <p className={errorClassName}>{error}</p>}
  </div>
);

export default RoleSelector; 