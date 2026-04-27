/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Icons from "lucide-react";
import { Categories } from "../data";

export default function CategoryProgress({
  category,
}: {
  category: Categories;
}) {
  const IconComponent = (Icons as any)[category.icon] || Icons.CircleHelp;

  const colors: Record<string, string> = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    tertiary: "bg-tertiary",
  };

  const textColors: Record<string, string> = {
    primary: "text-primary",
    secondary: "text-secondary",
    tertiary: "text-tertiary",
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-3">
          <IconComponent className={`w-5 h-5 ${textColors[category.color]}`} />
          <span className="font-semibold">{category.name}</span>
        </div>
        <span className="font-bold">{category.percentage}%</span>
      </div>
      <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
        <div
          className={`h-full ${colors[category.color]}`}
          style={{ width: `${category.percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
