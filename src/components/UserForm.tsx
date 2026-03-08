import React, { useState, useEffect } from 'react';
import { UserMetrics } from '../types';
import { Calculator, User, Target } from 'lucide-react';

interface UserFormProps {
  onMetricsChange: (metrics: UserMetrics) => void;
}

export default function UserForm({ onMetricsChange }: UserFormProps) {
  const [height, setHeight] = useState<string>('170');
  const [weight, setWeight] = useState<string>('70');
  const [calorieGoal, setCalorieGoal] = useState<string>('2000');

  useEffect(() => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const c = parseFloat(calorieGoal);

    if (h > 0 && w > 0 && c > 0) {
      const bmi = w / ((h / 100) ** 2);
      onMetricsChange({ height: h, weight: w, calorieGoal: c, bmi });
    }
  }, [height, weight, calorieGoal, onMetricsChange]);

  const bmiValue = (parseFloat(weight) / ((parseFloat(height) / 100) ** 2)).toFixed(1);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-forest-green/5 space-y-6">
      <div className="flex items-center gap-2 text-forest-green font-semibold">
        <User className="w-5 h-5" />
        <h2>Your Health Metrics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider opacity-60">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full p-3 bg-fresh-bg rounded-xl border-none focus:ring-2 focus:ring-turmeric-yellow transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider opacity-60">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-3 bg-fresh-bg rounded-xl border-none focus:ring-2 focus:ring-turmeric-yellow transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider opacity-60">Daily Calorie Goal</label>
          <input
            type="number"
            value={calorieGoal}
            onChange={(e) => setCalorieGoal(e.target.value)}
            className="w-full p-3 bg-fresh-bg rounded-xl border-none focus:ring-2 focus:ring-turmeric-yellow transition-all"
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-forest-green text-white rounded-xl">
        <div className="flex items-center gap-3">
          <Calculator className="w-6 h-6 text-turmeric-yellow" />
          <div>
            <p className="text-xs opacity-80">Calculated BMI</p>
            <p className="text-2xl font-bold">{bmiValue}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs opacity-80">Status</p>
          <p className="font-medium">
            {parseFloat(bmiValue) < 18.5 ? 'Underweight' : 
             parseFloat(bmiValue) < 25 ? 'Healthy' : 
             parseFloat(bmiValue) < 30 ? 'Overweight' : 'Obese'}
          </p>
        </div>
      </div>
    </div>
  );
}
