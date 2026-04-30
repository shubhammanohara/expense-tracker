interface AmountInputProps {
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
}

export default function AmountInput({
  value,
  onChange,
  required = false,
}: AmountInputProps) {
  return (
    <section className="text-center py-4">
      <label className="block font-body text-sm font-semibold text-on-surface-variant opacity-60 mb-2">
        Total Expense
      </label>
      <div className="flex items-center justify-center gap-1">
        <span className="text-3xl font-headline font-bold text-primary-container">₹</span>
        <input
          className="bg-transparent border-none text-6xl md:text-7xl font-headline font-extrabold tracking-tight text-on-surface focus:ring-0 w-full max-w-[280px] text-center p-0"
          placeholder="0.00"
          type="number"
          min={0}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
      </div>
    </section>
  );
}
