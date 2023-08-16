import { useEffect, useState } from "react";
import Card from "./Card";
import "./SalaryDetail.css";

function SalaryDetail() {
  const [salaryDetails, setSalaryDetails] = useState();

  useEffect(() => {
    async function fetchSalaryDetails() {
      const response = await fetch("http://localhost:8080/salary/user1");

      if (!response.ok) {
        console.log("no response ");
        return {};
      }

      const data = await response.json();

      setSalaryDetails(data);
    }

    fetchSalaryDetails();
  }, []);

  return (
    <section className="detail-section">
    <Card className="detail-card">
      <h1>Salary Details</h1>
      {salaryDetails ? (
        salaryDetails.data.map((salaryObj) => {
          console.log(salaryObj.id)
          if (salaryObj.id !== "otherAllowances") {
            return (
              <div key={salaryObj.id} className="detail">
                <label className="detail-label">{salaryObj.label}</label>
                <span className="detail-value">{salaryObj.value}</span>
              </div>
            );
          } else {
            return salaryObj.value.map((allowances) => (
              <div key={allowances.id} className="detail">
                <label className="detail-label">{allowances.label}</label>
                <span className="detail-value">{allowances.value}</span>
              </div>
            ));
          }
        })
      ) : (
        <div>Loading..</div>
      )}
    </Card>
    <Card className="detail-card">
      <h1>Totals</h1>
    </Card>

    </section>
  );
}

export default SalaryDetail;
