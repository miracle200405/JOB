function calculateTakeHomePay() {
  const jobTitle = document.getElementById("jobTitle").value;
  const grossPay = parseFloat(document.getElementById("grossPay").value);
  const payPeriod = document.getElementById("payPeriod").value;
  const hoursPerWeek = parseFloat(
    document.getElementById("hoursPerWeek").value
  );
  const taxRate = parseFloat(document.getElementById("taxRate").value) / 100;
  const niRate = parseFloat(document.getElementById("niRate").value) / 100;

  const taxDeduction = grossPay * taxRate;
  const niDeduction = grossPay * niRate;
  const takeHomePay = grossPay - taxDeduction - niDeduction;

  const yearlyPay = payPeriod === "month" ? takeHomePay * 12 : takeHomePay;
  const monthlyPay = yearlyPay / 12;
  const weeklyPay = yearlyPay / 52;
  const hourlyPay = weeklyPay / hoursPerWeek;

  document.getElementById("result").innerHTML = `
        <h2>Results:</h2>
        <p>Job: <a href="vacancies.html?job=${jobTitle}" target="_blank">${jobTitle}</a></p>
        <p>Working ${hoursPerWeek} hours per week for a gross pay of £${grossPay.toFixed(
    2
  )} results in:</p>
        <ul>
            <li>£${hourlyPay.toFixed(2)} per Hour</li>
            <li>£${weeklyPay.toFixed(2)} per Week</li>
            <li>£${monthlyPay.toFixed(2)} per Month</li>
            <li>£${yearlyPay.toFixed(2)} per Year</li>
        </ul>
    `;
}
