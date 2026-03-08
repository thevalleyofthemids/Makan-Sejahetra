import React from 'react';
import { Dish } from '../types';
import { MALAYSIAN_DISHES } from '../constants';
import { motion } from 'motion/react';

interface DishSelectorProps {
  selectedDishId: string | null;
  onSelect: (dish: Dish) => void;
}

export default function DishSelector({ selectedDishId, onSelect }: DishSelectorProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-forest-green">Select Your Base Dish</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MALAYSIAN_DISHES.map((dish) => (
          <motion.button
            key={dish.id}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(dish)}
            className={`relative overflow-hidden rounded-2xl text-left transition-all ${
              selectedDishId === dish.id 
                ? 'ring-4 ring-turmeric-yellow shadow-lg' 
                : 'bg-white shadow-sm hover:shadow-md'
            }`}
          >
            <img 
              src={dish.image} 
              alt={dish.name} 
              className="w-full h-48 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">{dish.name}</h3>
              <p className="text-sm opacity-70 line-clamp-2">{dish.description}</p>
            </div>
            {selectedDishId === dish.id && (
              <div className="absolute top-4 right-4 bg-turmeric-yellow text-forest-green px-3 py-1 rounded-full text-xs font-bold uppercase">
                Selected
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
