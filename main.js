// Tax calculation function
function calculateTax(income) {
  // South African tax rates for 2021/2022
  const taxRates = [
    { threshold: 186400, rate: 0 },
    { threshold: 309350, rate: 18 },
    { threshold: 427100, rate: 26 },
    { threshold: 544875, rate: 31 },
    { threshold: 662000, rate: 36 },
    { threshold: 766325, rate: 39 },
    { threshold: Infinity, rate: 45 }
  ];

  // Taxable income
  let taxableIncome = income;

  // Taxable amount and total tax
  let taxableAmount = 0;
  let totalTax = 0;

  // Calculate taxable amount and total tax
  for (let i = 0; i < taxRates.length; i++) {
    if (taxableIncome > taxRates[i].threshold) {
      taxableAmount = taxRates[i].threshold;
      totalTax += (taxableIncome - taxableAmount) * taxRates[i].rate / 100;
    } else {
      taxableAmount = taxableIncome;
      totalTax += taxableIncome * taxRates[i].rate / 100;
      break;
    }
    taxableIncome -= taxableAmount;
  }

  // Return total tax
  return totalTax;
}

// Chat functionality
const chat = document.getElementById("chat");
chat.addEventListener("submit", function(event) {
  event.preventDefault();
  const income = document.getElementById("income").value;
  const tax = calculateTax(income);
  const message = `Your tax is R ${tax}.`;
  document.getElementById("result").innerHTML = message;
});

// Document submission
const fileInput = document.getElementById("file");
fileInput.addEventListener("change", function() {
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = function() {
    const income = reader.result;
    const tax = calculateTax(income);
    const message = `Your tax is R ${tax}.`;
    document.getElementById("result").innerHTML = message;
  };
  reader.readAsText(file);
});
