import React from "react";

interface ScrollContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollContainer({
  children,
  className = "",
}: ScrollContainerProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="flex overflow-x-auto pb-8 space-x-6 scrollbar-hide snap-x snap-mandatory">
        {children}
      </div>
    </div>
  );
}

interface ScrollItemProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollItem({ children, className = "" }: ScrollItemProps) {
  return (
    <div className={`flex-shrink-0 snap-center ${className}`}>{children}</div>
  );
}
