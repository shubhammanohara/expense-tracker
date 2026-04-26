import { CATEGORIES } from "@/src/data";
import { FC } from "react";
import CategoryProgress from "../CategoryProgress";

const CategoriesOverview: FC = () => {
  return (
    <div className="glass-card rounded-lg p-6 flex flex-col justify-between">
      <h3 className="font-headline text-lg font-bold mb-4">Top Categories</h3>
      <div className="space-y-6">
        {CATEGORIES.map((cat) => (
          <div key={cat.name}>
            <CategoryProgress category={cat} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesOverview;
