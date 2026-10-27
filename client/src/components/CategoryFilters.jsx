import React from 'react';
import { Search, X, SlidersHorizontal, Sparkles } from 'lucide-react';

const CategoryFilters = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  totalResults,
}) => {
  return (
    <div className="space-y-4">
      {/* Top Bar: Search Input & Sort Dropdown */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-festive-gold/70" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search 100+ offers (e.g., iPhone, Tanishq, Swiggy, Gold...)"
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-festive-deepMaroon/80 border border-festive-gold/30 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-festive-gold focus:ring-1 focus:ring-festive-gold shadow-inner transition"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort & Results Count */}
        <div className="flex items-center justify-between md:justify-end gap-3">
          <span className="text-xs text-festive-goldLight/80 font-medium">
            Showing <strong className="text-festive-goldGlow">{totalResults}</strong> offers
          </span>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-festive-gold/80" />
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-festive-deepMaroon/90 border border-festive-gold/30 text-xs sm:text-sm text-slate-100 rounded-lg px-3 py-2 focus:outline-none focus:border-festive-gold cursor-pointer"
            >
              <option value="featured">Featured & Popular</option>
              <option value="popular">Most Claimed Deals</option>
              <option value="discount">Highest Discount</option>
              <option value="price-low">Offer Price: Low to High</option>
              <option value="price-high">Offer Price: High to Low</option>
              <option value="newest">Recently Added</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills (Horizontal Scrollable) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-festive-gold via-festive-amber to-festive-gold text-festive-dark shadow-gold-glow scale-105 font-bold'
                  : 'bg-festive-deepMaroon/70 text-slate-300 border border-festive-gold/25 hover:border-festive-gold/60 hover:text-festive-goldLight'
              }`}
            >
              {isSelected && <Sparkles className="w-3 h-3 text-festive-dark" />}
              <span>{cat.name}</span>
              {typeof cat.count === 'number' && (
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected
                      ? 'bg-festive-dark/20 text-festive-dark'
                      : 'bg-festive-royalRed/50 text-festive-goldLight border border-festive-gold/20'
                  }`}
                >
                  {cat.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilters;
