import React from "react";
import * as Lucide from "lucide-react";

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const LucideIcon: React.FC<LucideIconProps> = ({ name, className = "", size }) => {
  // Get icon component dynamically from lucide-react exports
  const IconComponent = (Lucide as any)[name];
  
  if (!IconComponent) {
    // Return standard fallback icon if name is missing
    return <Lucide.HelpCircle className={className} size={size} />;
  }

  return <IconComponent className={className} size={size} />;
};
