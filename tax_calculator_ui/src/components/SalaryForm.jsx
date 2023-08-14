import { Form } from "react-router-dom";
function SalaryForm() {
  return (
    <Form method='POST'>
      <div>
        <label htmlFor="basicSalary">Basic Salary</label>
        <input type="number" name="basicSalary"/>
      </div>
      <div>
        <label>House Rent Allowance</label>
        <input type="number" />
      </div>
      <div>
        <label>Special Allowance</label>
        <input type="number" />
      </div>
      <div>
        <label>Basic Salary</label>
        <input type="number" />
      </div>
      <div>
        <label>Basic Salary</label>
        <input type="number" />
      </div>
      <div>
        <label>Basic Salary</label>
        <input type="number" />
      </div>
    </Form>
  );
}

export default SalaryForm;
