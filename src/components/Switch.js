import React from 'react';
import './Switch.css';

const Switch = ({ isOn, handleToggle, onColor }) => {
	return (
	  <>
	  <p>Ativar / Suspender</p>
		<input
		  checked={isOn}
		  onChange={handleToggle}
		  className="react-switch-checkbox"
		  id={`react-switch-new`}
		  type="checkbox"
		/>
		<label
		  style={{ background: isOn && '#06D6A0' }}
		  className="react-switch-label"
		  htmlFor={`react-switch-new`}
		>
		  <span className={`react-switch-button`} />
		</label>
	  </>
	);
  };

export default Switch;

