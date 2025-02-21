import React, { useState } from 'react';
import { Wind, Sun, Leaf, Calculator, ArrowRight, Home } from 'lucide-react';

type EnergySource = 'solar' | 'wind' | 'conventional';

interface CalculationResult {
  yearlySavings: number;
  co2Reduction: number;
  treeEquivalent: number;
}

function App() {
  const [monthlyUsage, setMonthlyUsage] = useState<number>(1000);
  const [energySource, setEnergySource] = useState<EnergySource>('solar');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateImpact = () => {
    // Average electricity cost per kWh
    const conventionalRate = 0.14;
    const greenEnergyRates = {
      solar: 0.10,
      wind: 0.09,
      conventional: conventionalRate
    };

    // CO2 emissions per kWh (in kg)
    const conventionalEmissions = 0.85;
    const greenEmissions = {
      solar: 0.05,
      wind: 0.04,
      conventional: conventionalEmissions
    };

    const yearlyUsage = monthlyUsage * 12;
    const conventionalCost = yearlyUsage * conventionalRate;
    const greenCost = yearlyUsage * greenEnergyRates[energySource];
    const yearlySavings = conventionalCost - greenCost;

    const conventionalYearlyCO2 = yearlyUsage * conventionalEmissions;
    const greenYearlyCO2 = yearlyUsage * greenEmissions[energySource];
    const co2Reduction = conventionalYearlyCO2 - greenYearlyCO2;

    // One tree absorbs about 22kg of CO2 per year
    const treeEquivalent = Math.round(co2Reduction / 22);

    setResult({
      yearlySavings,
      co2Reduction,
      treeEquivalent
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <Leaf className="w-8 h-8 text-green-500" />
              <h1 className="text-3xl font-bold text-gray-800">Green Energy Calculator</h1>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Energy Usage (kWh)
                </label>
                <div className="flex items-center">
                  <Home className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="number"
                    value={monthlyUsage}
                    onChange={(e) => setMonthlyUsage(Number(e.target.value))}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    placeholder="Enter monthly usage in kWh"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Green Energy Source
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setEnergySource('solar')}
                    className={`flex items-center justify-center gap-2 p-4 rounded-lg border ${
                      energySource === 'solar'
                        ? 'bg-yellow-100 border-yellow-500 text-yellow-700'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Sun className="w-5 h-5" />
                    Solar Energy
                  </button>
                  <button
                    onClick={() => setEnergySource('wind')}
                    className={`flex items-center justify-center gap-2 p-4 rounded-lg border ${
                      energySource === 'wind'
                        ? 'bg-blue-100 border-blue-500 text-blue-700'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Wind className="w-5 h-5" />
                    Wind Energy
                  </button>
                </div>
              </div>

              <button
                onClick={calculateImpact}
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Calculator className="w-5 h-5" />
                Calculate Impact
                <ArrowRight className="w-5 h-5" />
              </button>

              {result && (
                <div className="mt-8 space-y-4 bg-gray-50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Impact</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <p className="text-sm text-gray-500">Yearly Savings</p>
                      <p className="text-2xl font-bold text-green-600">
                        ${result.yearlySavings.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <p className="text-sm text-gray-500">CO₂ Reduction</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {result.co2Reduction.toFixed(1)} kg
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <p className="text-sm text-gray-500">Equivalent to Trees</p>
                      <p className="text-2xl font-bold text-emerald-600">
                        {result.treeEquivalent} trees
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;