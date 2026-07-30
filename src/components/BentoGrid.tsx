import React from 'react';

interface BentoGridProps {
  children: React.ReactNode;
}

export default function BentoGrid({ children }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 auto-rows-[300px] w-full">
      {children}
    </div>
  );
}
