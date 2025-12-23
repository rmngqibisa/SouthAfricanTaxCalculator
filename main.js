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

  let totalTax = 0;
  let previousThreshold = 0;

  // Calculate taxable amount and total tax
  for (let i = 0; i < taxRates.length; i++) {
    const currentThreshold = taxRates[i].threshold;
    const rate = taxRates[i].rate;

    if (income > currentThreshold) {
      const taxableAmount = currentThreshold - previousThreshold;
      totalTax += taxableAmount * rate / 100;
      previousThreshold = currentThreshold;
    } else {
      const taxableAmount = income - previousThreshold;
      totalTax += taxableAmount * rate / 100;
      break;
    }
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
