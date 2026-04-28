import { Plus, Trash2, ArrowRight, Settings } from "lucide-react";
import Button from "./Button";

export default function Example() {
  return (
    <div className="space-y-8 p-8 bg-surface min-h-screen">
      {/* LARGE */}
      <div className="flex flex-wrap gap-4">
        <Button size="lg" variant="primary">
          Login <ArrowRight size={18} />
        </Button>

        <Button size="lg" variant="secondary">
          Continue
        </Button>

        <Button size="lg" variant="tertiary">
          Skip
        </Button>

        <Button size="lg" variant="danger">
          Delete <Trash2 size={18} />
        </Button>

        <Button size="lg" variant="outline-primary">
          Upgrade
        </Button>

        <Button size="lg" variant="outline-danger">
          Remove
        </Button>

        <Button iconOnly size="lg" variant="outline-secondary">
          <Plus size={20} />
        </Button>
      </div>

      {/* MEDIUM */}
      <div className="flex flex-wrap gap-4">
        <Button size="md" variant="primary">
          Save
        </Button>

        <Button size="md" iconOnly variant="outline-secondary">
          <Settings size={18} />
        </Button>
      </div>

      {/* SMALL */}
      <div className="flex flex-wrap gap-4">
        <Button size="sm" variant="primary">
          Add <Plus size={16} />
        </Button>

        <Button size="sm" variant="outline-tertiary">
          Cancel
        </Button>

        <Button size="sm" iconOnly variant="danger">
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
}
