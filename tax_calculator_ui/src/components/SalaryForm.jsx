import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import "./SalaryForm.css";

const INITIAL_STATE = {
  basic: 0,
  hra: 0,
  specialAllowance: 0,
  employerEPFContribution: 0,
  otherAllowances: {},
};

function formReducer(state, action) {
  if (action.type === "BASIC") {
    return { ...state, basic: action.payload };
  }

  if (action.type === "HRA") {
    return { ...state, hra: action.payload };
  }

  if (action.type === "SPECIAL") {
    return { ...state, specialAllowance: action.payload };
  }

  // Employer EPF
  if (action.type === "EEPF") {
    return { ...state, employerEPFContribution: action.payload };
  }

  if (action.type === "OTHERS") {
    const { otherAllowances } = state;

    const { label, value } = action.payload || {};

    otherAllowances[label] = value;

    return { ...state, otherAllowances: otherAllowances };
  }

  if (action.type === "UPDATEDEFAULTS") {
    return { ...state, ...action.payload };
  }

  return state;
}

const LABELS = {
  basic: "Basic",
  hra: "House Rent Allowance",
  specialAllowance: "Special Allowance",
  employerEPFContribution: "Employer EPF Contribution",
};

function SalaryForm() {
  const [additionalField, setAdditionalField] = useState("");
  const [formData, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const navigate = useNavigate();

  const { otherAllowances, ...defaultAllowances } = formData;

  function addFieldHandler(e) {
    e.preventDefault();
    const fieldValue = e.target.value;
    if (!fieldValue) {
      return
    }

    dispatch({
      type: "OTHERS",
      payload: {
        label: fieldValue,
        value: 0,
      }
    });

    setAdditionalField("");
  }

  async function submitForm(e) {
    e.preventDefault();

    let  payload  = { ...formData };
    payload["userId"] = "user1";

    console.log(JSON.stringify(payload))
    const response = await fetch("http://localhost:8080/salary", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await response.json();

    navigate("/salarydetails");
  }

  function handleKeyPress(e) {
    if (e.keyCode === 13) {
      addFieldHandler(e);
    }
  }

  function onChangeHandler(e) {
    setAdditionalField(e.target.value);
  }

  function handleFieldUpdate(e, field) {
    if (field in formData) {
      const updatedField = {};
      updatedField[field] = e.target.value;
      dispatch({
        type: "UPDATEDEFAULTS",
        payload: updatedField,
      });
    } else {
      dispatch({
        type: "OTHERS",
        payload: {
          label: field,
          value: e.target.value,
        }
      });
    }
  }

  function getFieldValue(field) {
    const { otherAllowances } = formData;

    const fieldValue = field in otherAllowances ? otherAllowances[field] : formData[field]

    return fieldValue
  }

  const renderInput = (data) =>
    Object.keys(data).map((field) =>{ 

      let labelName = LABELS[field] ? LABELS[field] : field
      let fieldValue = getFieldValue(field)

      return (
      <div key={field}>
        <label className="form-label" htmlFor={field}>{labelName}</label>
        <input
          type="number"
          name={field}
          className="form-input"
          placeholder={`Enter ${labelName}`}
          onChange={(e) => handleFieldUpdate(e, field)}
          value={fieldValue || ''}
        />
      </div>
    )});

  return (
    <Card className="form-card">
      <form onSubmit={submitForm} className="form">
        {renderInput(defaultAllowances)}
        {renderInput(otherAllowances)}
        <div>
          <input
            type="text"
            name="AdditionalComponent"
            onKeyDown={handleKeyPress}
            onChange={onChangeHandler}
            className="additional-field"
            placeholder="Enter Additional Salary component (optional)"
            value={additionalField}
          />
          <button
            type="button"
            onClick={addFieldHandler}
            className="additional-field-button"
          >
            Add
          </button>
        </div>
        <button>Save Details</button>
      </form>
    </Card>
  );
}

export default SalaryForm;
