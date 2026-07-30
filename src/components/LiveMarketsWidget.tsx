'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, DollarSign } from 'lucide-react';

interface MarketAsset {
  symbol: string;
  name: string;
  price: string;
  change: number;
  changePercent: string;
  isUp: boolean;
}

const INITIAL_ASSETS: MarketAsset[] = [
  { symbol: 'S&P 500', name: 'S&P 500 Index', price: '5,422.30', change: 18.45, changePercent: '+0.34%', isUp: true },
  { symbol: 'NASDAQ', name: 'Nasdaq 100', price: '19,104.50', change: -82.10, changePercent: '-0.43%', isUp: false },
  { symbol: 'IBEX 35', name: 'IBEX 35 España', price: '11,142.10', change: 44.50, changePercent: '+0.40%', isUp: true },
  { symbol: 'BTC / USD', name: 'Bitcoin Dollar', price: '64,850.00', change: 1205.00, changePercent: '+1.89%', isUp: true },
  { symbol: 'GLD / OUNCE', name: 'Oro de Ley', price: '2,420.50', change: 12.80, changePercent: '+0.53%', isUp: true },
  { symbol: 'BRENT OIL', name: 'Crudo Brent', price: '78.40', change: -1.25, changePercent: '-1.57%', isUp: false },
  { symbol: 'EUR / USD', name: 'Euro / Dólar', price: '1.0854', change: -0.0012, changePercent: '-0.11%', isUp: false },
];

export default function LiveMarketsWidget() {
  const [assets, setAssets] = useState<MarketAsset[]>(INITIAL_ASSETS);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' CET');
    };
    updateTime();

    // Simulating light real-time changes
    const interval = setInterval(() => {
      setAssets((prev) =>
        prev.map((asset) => {
          // 30% chance to update any single asset
          if (Math.random() > 0.3) return asset;

          const priceNum = parseFloat(asset.price.replace(/,/g, ''));
          const direction = Math.random() > 0.48 ? 1 : -1;
          const pctChange = (Math.random() * 0.15) * direction;
          const newPriceNum = priceNum * (1 + pctChange / 100);
          
          let formattedPrice = '';
          if (asset.symbol === 'EUR / USD') {
            formattedPrice = newPriceNum.toFixed(4);
          } else if (asset.symbol === 'BRENT OIL') {
            formattedPrice = newPriceNum.toFixed(2);
          } else {
            formattedPrice = Math.round(newPriceNum * 100 / 100).toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
          }

          const absoluteChange = newPriceNum - parseFloat(asset.price.replace(/,/g, ''));
          const isUp = absoluteChange >= 0;
          const sign = isUp ? '+' : '';
          const formattedPct = `${sign}${pctChange.toFixed(2)}%`;

          return {
            ...asset,
            price: formattedPrice,
            change: parseFloat(absoluteChange.toFixed(2)),
            changePercent: formattedPct,
            isUp,
          };
        })
      );
      updateTime();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full bg-zinc-950/40 border border-zinc-900 rounded-2xl overflow-hidden backdrop-blur-md">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-zinc-900 px-4 py-3 bg-zinc-950/60">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">
            COTIZACIONES GLOBALES // LIVE MARKET
          </span>
        </div>
        <DollarSign className="h-4 w-4 text-zinc-500" />
      </div>

      {/* Asset grid/list */}
      <div className="p-3 space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar flex-grow">
        {assets.map((asset) => (
          <div
            key={asset.symbol}
            className="flex items-center justify-between p-3 rounded-xl border border-zinc-900/60 bg-zinc-950/30 hover:bg-zinc-900/20 hover:border-zinc-850 transition-all duration-200"
          >
            {/* Asset Symbol & Name */}
            <div className="flex flex-col">
              <span className="text-xs font-mono font-bold text-white tracking-wider">
                {asset.symbol}
              </span>
              <span className="text-[9px] font-mono text-zinc-550 mt-0.5">
                {asset.name}
              </span>
            </div>

            {/* Price & Change Indicator */}
            <div className="flex items-center gap-4">
              {/* Numeric price */}
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-zinc-200">
                  {asset.price}
                </span>
                <span
                  className={`text-[8px] font-mono font-bold uppercase block mt-0.5 tracking-tight ${
                    asset.isUp ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {asset.changePercent}
                </span>
              </div>

              {/* Trend Icon button decoration */}
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-lg border font-bold ${
                  asset.isUp
                    ? 'border-emerald-950 text-emerald-400 bg-emerald-950/20'
                    : 'border-red-950 text-red-400 bg-red-950/20'
                }`}
              >
                {asset.isUp ? (
                  <TrendingUp className="h-3.5 w-3.5" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="border-t border-zinc-900 bg-zinc-950/60 p-3 flex justify-between items-center text-[8px] font-mono text-zinc-650">
        <span className="flex items-center gap-1">
          <RefreshCw className="h-2.5 w-2.5 animate-spin" />
          <span>ACTUALIZACIÓN CONTINUA</span>
        </span>
        <span>MADRID TIME: {lastUpdated}</span>
      </div>
    </div>
  );
}
