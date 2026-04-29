import { Input, Select, TextArea } from "./Input";

export default function Example() {
  return (
    <div className="max-w-md space-y-6 p-6 bg-surface min-h-screen">
      <Input label="Email" type="email" placeholder="name@mail.com" />

      <Input label="Password" type="password" placeholder="••••••••" />

      <Input label="Amount" type="number" placeholder="0.00" />

      <Input label="Date" type="date" />

      <Input label="Date & Time" type="datetime-local" />

      <Select
        label="Category"
        options={[
          { label: "Food", value: "food" },
          { label: "Travel", value: "travel" },
          { label: "Bills", value: "bills" },
        ]}
      />

      <TextArea label="Description" placeholder="Write expense note..." />

      <TextArea label="Notes" rows={7} />

      <TextArea label="Comment" error="Required field" />
    </div>
  );
}
