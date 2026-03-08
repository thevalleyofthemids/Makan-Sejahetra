import React from 'react';
import { RecipeResult } from '../types';
import { Info, Utensils, ListChecks, Activity } from 'lucide-react';
import { motion } from 'motion/react';

interface ResultCardProps {
  result: RecipeResult;
}

export default function ResultCard({ result }: ResultCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl overflow-hidden shadow-xl border border-forest-green/5"
    >
      <div className="bg-forest-green p-8 text-white">
        <h2 className="text-3xl font-black mb-4">{result.modifiedName}</h2>
        <div className="flex gap-4 items-start bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
          <Info className="w-6 h-6 text-turmeric-yellow shrink-0 mt-1" />
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-turmeric-yellow mb-1">Architect's Note</p>
            <p className="text-sm leading-relaxed opacity-90">{result.architectNote}</p>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-10">
        {/* Nutrition Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Calories', value: result.nutrition.calories, unit: 'kcal', color: 'bg-turmeric-yellow/10 text-turmeric-yellow' },
            { label: 'Protein', value: result.nutrition.protein, unit: 'g', color: 'bg-blue-50 text-blue-600' },
            { label: 'Fat', value: result.nutrition.fat, unit: 'g', color: 'bg-red-50 text-red-600' },
            { label: 'Carbs', value: result.nutrition.carbs, unit: 'g', color: 'bg-green-50 text-green-600' },
            { label: 'Fiber', value: result.nutrition.fiber, unit: 'g', color: 'bg-orange-50 text-orange-600' },
          ].map((stat) => (
            <div key={stat.label} className={`p-4 rounded-2xl ${stat.color} flex flex-col items-center justify-center text-center`}>
              <p className="text-[10px] font-bold uppercase tracking-tighter opacity-70 mb-1">{stat.label}</p>
              <p className="text-xl font-black">{stat.value}<span className="text-xs font-normal ml-0.5">{stat.unit}</span></p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Ingredients */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-forest-green border-b-2 border-turmeric-yellow pb-2 w-fit">
              <Utensils className="w-5 h-5" />
              <h3 className="font-bold text-xl">Ingredients</h3>
            </div>
            <ul className="space-y-3">
              {result.ingredients.map((item, i) => (
                <li key={i} className="flex gap-3 items-start text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-turmeric-yellow mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-forest-green border-b-2 border-turmeric-yellow pb-2 w-fit">
              <ListChecks className="w-5 h-5" />
              <h3 className="font-bold text-xl">Cooking Steps</h3>
            </div>
            <div className="space-y-6">
              {result.steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-forest-green text-white text-[10px] font-bold shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
