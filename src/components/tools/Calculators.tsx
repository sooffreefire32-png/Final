import React, { useState } from "react";
import { LucideIcon } from "../LucideIcon";

export const Calculators: React.FC = () => {
  const [activeCalc, setActiveCalc] = useState<"scientific" | "loan" | "bmi" | "age">("scientific");

  // Scientific Calc state
  const [calcDisplay, setCalcDisplay] = useState<string>("0");
  const [calcHistory, setCalcHistory] = useState<string>("");

  // Loan Calc state
  const [loanPrincipal, setLoanPrincipal] = useState<number>(350000);
  const [loanRate, setLoanRate] = useState<number>(4.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [loanResult, setLoanResult] = useState<{ monthly: number; totalInterest: number; totalPayment: number } | null>(null);

  // BMI State
  const [bmiWeight, setBmiWeight] = useState<number>(70); // kg
  const [bmiHeight, setBmiHeight] = useState<number>(175); // cm
  const [bmiResult, setBmiResult] = useState<{ bmi: number; category: string; color: string; advice: string } | null>(null);

  // Age State
  const [birthdate, setBirthdate] = useState<string>("1998-05-15");
  const [ageResult, setAgeResult] = useState<{ years: number; months: number; days: number; totalDays: number; nextBirthdayDays: number } | null>(null);

  // Scientific keypad press logic
  const handleKeypress = (key: string) => {
    if (key === "C") {
      setCalcDisplay("0");
      setCalcHistory("");
    } else if (key === "=") {
      try {
        // Safe evaluation of basic mathematical expressions
        // Replace special operator symbols for standard evaluation
        const sanitized = calcDisplay.replace(/×/g, "*").replace(/÷/g, "/");
        const result = eval(sanitized);
        setCalcHistory(`${calcDisplay} =`);
        setCalcDisplay(String(result));
      } catch (e) {
        setCalcDisplay("Error");
      }
    } else if (key === "del") {
      setCalcDisplay(calcDisplay.length > 1 ? calcDisplay.slice(0, -1) : "0");
    } else if (["sin", "cos", "tan", "sqrt", "log"].includes(key)) {
      try {
        const val = parseFloat(calcDisplay);
        let result = 0;
        if (key === "sin") result = Math.sin((val * Math.PI) / 180);
        if (key === "cos") result = Math.cos((val * Math.PI) / 180);
        if (key === "tan") result = Math.tan((val * Math.PI) / 180);
        if (key === "sqrt") result = Math.sqrt(val);
        if (key === "log") result = Math.log10(val);

        setCalcHistory(`${key}(${calcDisplay})`);
        setCalcDisplay(String(Number(result.toFixed(6))));
      } catch (e) {
        setCalcDisplay("Error");
      }
    } else {
      setCalcDisplay(calcDisplay === "0" || calcDisplay === "Error" ? key : calcDisplay + key);
    }
  };

  // Loan calculation logic
  const calculateLoan = (e: React.FormEvent) => {
    e.preventDefault();
    const r = loanRate / 12 / 100;
    const n = loanTermYears * 12;
    const P = loanPrincipal;

    // Monthly repayment formula
    const monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthly * n;
    const totalInterest = totalPayment - P;

    setLoanResult({
      monthly: Math.round(monthly * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalPayment: Math.round(totalPayment * 100) / 100
    });
  };

  // BMI calculation logic
  const calculateBmi = (e: React.FormEvent) => {
    e.preventDefault();
    const hMeter = bmiHeight / 100;
    const bmi = bmiWeight / (hMeter * hMeter);
    let category = "Normal";
    let color = "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20";
    let advice = "You have a healthy body weight. Keep it up!";

    if (bmi < 18.5) {
      category = "Underweight";
      color = "text-blue-500 bg-blue-50 dark:bg-blue-950/20";
      advice = "We recommend eating nutrient-dense foods and strength training.";
    } else if (bmi >= 25 && bmi < 29.9) {
      category = "Overweight";
      color = "text-amber-500 bg-amber-50 dark:bg-amber-950/20";
      advice = "Keep an eye on portion sizes and focus on a robust exercise routine.";
    } else if (bmi >= 30) {
      category = "Obese";
      color = "text-red-500 bg-red-50 dark:bg-red-950/20";
      advice = "Consider consulting a nutritionist or trainer to build wellness targets.";
    }

    setBmiResult({
      bmi: Math.round(bmi * 10) / 10,
      category,
      color,
      advice
    });
  };

  // Birthdate age calculation logic
  const calculateAge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthdate) return;

    const today = new Date();
    const birth = new Date(birthdate);
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      // Find days in previous month
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate total days
    const diffTime = Math.abs(today.getTime() - birth.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Calculate days left to next birthday
    const nextBday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (today > nextBday) {
      nextBday.setFullYear(today.getFullYear() + 1);
    }
    const nextBdayDiff = nextBday.getTime() - today.getTime();
    const nextBirthdayDays = Math.ceil(nextBdayDiff / (1000 * 60 * 60 * 24));

    setAgeResult({
      years,
      months,
      days,
      totalDays,
      nextBirthdayDays
    });
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side Navigation Tabs */}
        <div className="lg:col-span-3 flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800/60 lg:pr-6">
          {[
            { id: "scientific", label: "Scientific Calc", icon: "Hash" },
            { id: "loan", label: "Loan Repayments", icon: "DollarSign" },
            { id: "bmi", label: "Body Mass Index", icon: "Heart" },
            { id: "age", label: "Chronological Age", icon: "Calendar" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCalc(tab.id as any)}
              className={`flex items-center gap-3 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all shrink-0 cursor-pointer w-full text-left ${
                activeCalc === tab.id
                  ? "bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 shadow-md"
                  : "hover:bg-slate-100 dark:hover:bg-slate-950 text-slate-600 dark:text-slate-400"
              }`}
            >
              <LucideIcon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Right Side Workspaces */}
        <div className="lg:col-span-9">
          
          {/* Scientific Calculator Panel */}
          {activeCalc === "scientific" && (
            <div className="max-w-md mx-auto space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900 dark:bg-black text-right border border-slate-800">
                <div className="text-slate-400 font-mono text-xs min-h-[16px] tracking-wide mb-1">
                  {calcHistory}
                </div>
                <div className="text-white font-mono text-2xl md:text-3xl font-semibold tracking-normal break-all select-all">
                  {calcDisplay}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {/* Advanced Row */}
                {["sin", "cos", "tan", "sqrt"].map((btn) => (
                  <button
                    key={btn}
                    onClick={() => handleKeypress(btn)}
                    className="py-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-mono text-xs font-bold uppercase transition-colors hover:bg-slate-200 dark:hover:bg-slate-900 cursor-pointer"
                  >
                    {btn}
                  </button>
                ))}

                {/* Math Keypad Grid */}
                {["C", "(", ")", "÷", "7", "8", "9", "×", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "del", "="].map((btn) => {
                  const isOperator = ["÷", "×", "-", "+", "="].includes(btn);
                  const isAction = ["C", "del", "(", ")"].includes(btn);
                  return (
                    <button
                      key={btn}
                      onClick={() => handleKeypress(btn)}
                      className={`py-3.5 rounded-xl font-mono text-base font-semibold transition-all cursor-pointer ${
                        isOperator
                          ? btn === "="
                            ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10"
                            : "bg-slate-200/60 dark:bg-slate-950 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-900"
                          : isAction
                          ? "bg-slate-100 dark:bg-slate-900/40 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-900"
                          : "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:shadow-sm"
                      }`}
                    >
                      {btn}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Loan Calculator Panel */}
          {activeCalc === "loan" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <form onSubmit={calculateLoan} className="md:col-span-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Loan Principal Amount ($)
                  </label>
                  <input
                    type="number"
                    value={loanPrincipal}
                    onChange={(e) => setLoanPrincipal(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Annual Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    value={loanRate}
                    onChange={(e) => setLoanRate(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Loan Period Term (Years)
                  </label>
                  <input
                    type="number"
                    value={loanTermYears}
                    onChange={(e) => setLoanTermYears(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/10 cursor-pointer"
                >
                  Calculate Repayments
                </button>
              </form>

              <div className="md:col-span-6 p-5 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-center">
                {loanResult ? (
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-blue-500/10 border border-blue-200/50 dark:border-blue-900/40 rounded-xl">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Monthly Installment Payment</span>
                      <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono mt-1">${loanResult.monthly.toLocaleString()}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1">
                        <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Interest</span>
                        <p className="text-base font-bold text-slate-700 dark:text-slate-300 font-mono">${loanResult.totalInterest.toLocaleString()}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Repayment</span>
                        <p className="text-base font-bold text-slate-700 dark:text-slate-300 font-mono">${loanResult.totalPayment.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-slate-400 py-10">
                    <LucideIcon name="PiggyBank" className="mx-auto text-slate-300 dark:text-slate-700 mb-2" size={32} />
                    <p className="text-sm">Click Calculate to view loan amortization summaries.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* BMI Calculator Panel */}
          {activeCalc === "bmi" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <form onSubmit={calculateBmi} className="md:col-span-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={bmiWeight}
                    onChange={(e) => setBmiWeight(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Height (cm)
                  </label>
                  <input
                    type="number"
                    value={bmiHeight}
                    onChange={(e) => setBmiHeight(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/10 cursor-pointer"
                >
                  Calculate BMI Score
                </button>
              </form>

              <div className="md:col-span-6 p-5 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-center">
                {bmiResult ? (
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-white dark:bg-slate-950 border rounded-xl">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Your Calculated BMI</span>
                      <p className="text-3xl font-black text-slate-800 dark:text-slate-100 mt-1">{bmiResult.bmi}</p>
                    </div>

                    <div className={`p-4 rounded-xl border border-slate-200/50 flex justify-between items-center ${bmiResult.color}`}>
                      <span className="text-sm font-bold">Category Rating</span>
                      <span className="text-sm font-bold uppercase tracking-wider">{bmiResult.category}</span>
                    </div>

                    <p className="text-xs text-slate-500 text-center leading-relaxed">
                      {bmiResult.advice}
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-slate-400 py-10">
                    <LucideIcon name="Heart" className="mx-auto text-slate-300 dark:text-slate-700 mb-2 animate-pulse" size={32} />
                    <p className="text-sm">Enter metrics to calculate BMI classifications.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Age Calculator Panel */}
          {activeCalc === "age" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <form onSubmit={calculateAge} className="md:col-span-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Select Your Date of Birth
                  </label>
                  <input
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-mono text-base"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/10 cursor-pointer"
                >
                  Calculate Chronological Age
                </button>
              </form>

              <div className="md:col-span-6 p-5 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-center">
                {ageResult ? (
                  <div className="space-y-4">
                    <div className="text-center p-3 bg-white dark:bg-slate-950 border rounded-xl">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">Current Elapsed Age</span>
                      <p className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">
                        {ageResult.years} Years, {ageResult.months} Months, {ageResult.days} Days
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Total Days Lived</span>
                        <span className="text-sm font-bold font-mono text-slate-700 dark:text-slate-300">{ageResult.totalDays.toLocaleString()} Days</span>
                      </div>
                      <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Until next birthday</span>
                        <span className="text-sm font-bold font-mono text-blue-600 dark:text-blue-400">{ageResult.nextBirthdayDays} Days Left</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-slate-400 py-10">
                    <LucideIcon name="Hourglass" className="mx-auto text-slate-300 dark:text-slate-700 mb-2" size={32} />
                    <p className="text-sm">Select birthdate to calculate elapsed milestones.</p>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
