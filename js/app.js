function formatINR(val) {
  if (isNaN(val) || !isFinite(val)) return "₹0";
  return new Intl.NumberFormat('en-IN', { 
    style: 'currency', 
    currency: 'INR', 
    maximumFractionDigits: 0 
  }).format(val);
}

function calculateSIP() {
  const P = parseFloat(document.getElementById('sipAmount').value) || 0;
  const annualRate = parseFloat(document.getElementById('sipRate').value) || 0;
  const years = parseFloat(document.getElementById('sipYears').value) || 0;

  const i = (annualRate / 100) / 12;
  const n = years * 12;

  if (P <= 0 || n <= 0) {
    document.getElementById('investedResult').innerText = formatINR(0);
    document.getElementById('gainResult').innerText = formatINR(0);
    document.getElementById('totalResult').innerText = formatINR(0);
    return;
  }

  const totalVal = i === 0 ? P * n : P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const invested = P * n;
  const returns = totalVal - invested;

  document.getElementById('investedResult').innerText = formatINR(invested);
  document.getElementById('gainResult').innerText = formatINR(returns);
  document.getElementById('totalResult').innerText = formatINR(totalVal);
}

function calculateEMI() {
  const P = parseFloat(document.getElementById('loanAmount').value) || 0;
  const annualRate = parseFloat(document.getElementById('loanRate').value) || 0;
  const years = parseFloat(document.getElementById('loanYears').value) || 0;

  const r = (annualRate / 100) / 12;
  const n = years * 12;

  if (P <= 0 || n <= 0) {
    document.getElementById('monthlyEmiResult').innerText = formatINR(0);
    document.getElementById('totalInterestResult').innerText = formatINR(0);
    document.getElementById('totalPaymentResult').innerText = formatINR(0);
    return;
  }

  let emi = 0;
  if (r === 0) {
    emi = P / n;
  } else {
    emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  const totalPay = emi * n;
  const totalInt = totalPay - P;

  document.getElementById('monthlyEmiResult').innerText = formatINR(emi);
  document.getElementById('totalInterestResult').innerText = formatINR(totalInt);
  document.getElementById('totalPaymentResult').innerText = formatINR(totalPay);
}

function switchTab(type) {
  const sipSec = document.getElementById('sipSection');
  const emiSec = document.getElementById('emiSection');
  const sipBtn = document.getElementById('sipTabBtn');
  const emiBtn = document.getElementById('emiTabBtn');

  const activeClass = "py-2 px-6 font-semibold border-b-2 border-indigo-600 text-indigo-600";
  const inactiveClass = "py-2 px-6 font-semibold border-b-2 border-transparent text-slate-500 hover:text-indigo-600";

  if (type === 'sip') {
    sipSec.classList.remove('hidden');
    emiSec.classList.add('hidden');
    sipBtn.className = activeClass;
    emiBtn.className = inactiveClass;
  } else {
    emiSec.classList.remove('hidden');
    sipSec.classList.add('hidden');
    emiBtn.className = activeClass;
    sipBtn.className = inactiveClass;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  calculateSIP();
  calculateEMI();
});