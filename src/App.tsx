import React, { useState, useCallback } from 'react';
import { UserMetrics, Dish, Swaps, RecipeResult } from './types';
import UserForm from './components/UserForm';
import DishSelector from './components/DishSelector';
import CustomizationStudio from './components/CustomizationStudio';
import ResultCard from './components/ResultCard';
import { customizeRecipe } from './services/geminiService';
import { ChefHat, HeartPulse, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [metrics, setMetrics] = useState<UserMetrics>({
    height: 170,
    weight: 70,
    calorieGoal: 2000,
    bmi: 24.2
  });

  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [swaps, setSwaps] = useState<Swaps>({
    riceType: 'white',
    cookingMethod: 'traditional',
    alternatives: 'traditional'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecipeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMetricsChange = useCallback((newMetrics: UserMetrics) => {
    setMetrics(newMetrics);
  }, []);

  const handleCustomize = async () => {
    if (!selectedDish) {
      setError("Please select a dish first!");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const recipe = await customizeRecipe(selectedDish.name, metrics, swaps);
      setResult(recipe);
      // Scroll to result
      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error(err);
      setError("Failed to customize recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-forest-green py-12 px-6 text-center text-white relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-turmeric-yellow p-3 rounded-2xl rotate-12">
              <ChefHat className="w-8 h-8 text-forest-green" />
            </div>
            <h1 className="text-5xl font-black tracking-tighter">MAKAN SEJAHTERA</h1>
          </div>
          <p className="text-turmeric-yellow font-medium tracking-widest uppercase text-sm">
            Malaysian Soul • Healthy Heart • AI Crafted
          </p>
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-turmeric-yellow rounded-full" />
          <div className="absolute bottom-10 right-10 w-48 h-48 border-8 border-turmeric-yellow rounded-full" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 -mt-8 space-y-12 relative z-20">
        {/* User Metrics Section */}
        <section>
          <UserForm onMetricsChange={handleMetricsChange} />
        </section>

        {/* Dish Selection Section */}
        <section>
          <DishSelector 
            selectedDishId={selectedDish?.id || null} 
            onSelect={setSelectedDish} 
          />
        </section>

        {/* Customization Section */}
        <AnimatePresence>
          {selectedDish && (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <CustomizationStudio 
                swaps={swaps} 
                onSwapsChange={setSwaps} 
                onCustomize={handleCustomize}
                loading={loading}
              />
            </motion.section>
          )}
        </AnimatePresence>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl text-center font-bold border border-red-100">
            {error}
          </div>
        )}

        {/* Result Section */}
        <section id="result-section">
          {result ? (
            <ResultCard result={result} />
          ) : !loading && selectedDish && (
            <div className="text-center py-20 opacity-30">
              <Sparkles className="w-12 h-12 mx-auto mb-4" />
              <p className="text-xl font-medium">Customize your {selectedDish.name} above to see the magic</p>
            </div>
          )}
        </section>
      </main>

      {/* Footer Branding */}
      <footer className="mt-20 border-t border-forest-green/10 py-12 text-center">
        <div className="flex items-center justify-center gap-2 text-forest-green/40 font-bold uppercase tracking-widest text-xs">
          <HeartPulse className="w-4 h-4" />
          <span>Makan Sejahtera • 2024</span>
        </div>
      </footer>
    </div>
  );
}
