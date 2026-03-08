import React from 'react';
import { Swaps } from '../types';
import { Sparkles, ChefHat, Leaf, Flame } from 'lucide-react';
import { motion } from 'motion/react';

interface CustomizationStudioProps {
  swaps: Swaps;
  onSwapsChange: (swaps: Swaps) => void;
  onCustomize: () => void;
  loading: boolean;
}

export default function CustomizationStudio({ swaps, onSwapsChange, onCustomize, loading }: CustomizationStudioProps) {
  const updateSwap = (key: keyof Swaps, value: any) => {
    onSwapsChange({ ...swaps, [key]: value });
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-forest-green/5 space-y-8">
      <div className="flex items-center gap-3">
        <ChefHat className="w-8 h-8 text-turmeric-yellow" />
        <h2 className="text-2xl font-bold">Smart Swap Studio</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Rice Type */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-semibold opacity-80">
            <Leaf className="w-4 h-4" />
            <h3>Rice Base</h3>
          </div>
          <div className="flex flex-col gap-2">
            {['white', 'brown', 'cauliflower'].map((type) => (
              <button
                key={type}
                onClick={() => updateSwap('riceType', type)}
                className={`p-3 rounded-xl text-left capitalize transition-all ${
                  swaps.riceType === type 
                    ? 'bg-forest-green text-white font-bold' 
                    : 'bg-fresh-bg hover:bg-forest-green/10'
                }`}
              >
                {type} Rice
              </button>
            ))}
          </div>
        </div>

        {/* Cooking Method */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-semibold opacity-80">
            <Flame className="w-4 h-4" />
            <h3>Cooking Method</h3>
          </div>
          <div className="flex flex-col gap-2">
            {['traditional', 'air-fried', 'grilled'].map((method) => (
              <button
                key={method}
                onClick={() => updateSwap('cookingMethod', method)}
                className={`p-3 rounded-xl text-left capitalize transition-all ${
                  swaps.cookingMethod === method 
                    ? 'bg-forest-green text-white font-bold' 
                    : 'bg-fresh-bg hover:bg-forest-green/10'
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        {/* Alternatives */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-semibold opacity-80">
            <Sparkles className="w-4 h-4" />
            <h3>Ingredient Swap</h3>
          </div>
          <div className="flex flex-col gap-2">
            {['traditional', 'diluted-santan', 'low-fat-milk'].map((alt) => (
              <button
                key={alt}
                onClick={() => updateSwap('alternatives', alt)}
                className={`p-3 rounded-xl text-left capitalize transition-all ${
                  swaps.alternatives === alt 
                    ? 'bg-forest-green text-white font-bold' 
                    : 'bg-fresh-bg hover:bg-forest-green/10'
                }`}
              >
                {alt.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={loading}
        onClick={onCustomize}
        className="w-full py-4 bg-turmeric-yellow text-forest-green font-black text-xl rounded-2xl shadow-lg shadow-turmeric-yellow/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-forest-green"></div>
        ) : (
          <>
            <Sparkles className="w-6 h-6" />
            ARCHITECT MY MEAL
          </>
        )}
      </motion.button>
    </div>
  );
}
