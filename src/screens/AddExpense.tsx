import { format, formatISO } from "date-fns";
import { ArrowLeft, CheckCircle, Trash } from "lucide-react";
import { useState } from "react";

import { Transaction } from "../api/transactionService";
import AmountInput from "../components/AmountInput";
import Button from "../components/Button";
import CategoryPicker from "../components/CategoryPicker";
import { Input, Select, TextArea } from "../components/Input";
import RawMessageViewer from "../components/RawMessageViewer/RawMessageViewer";
import {
  useCreateTransaction,
  useDeleteTransaction,
  useUpdateTransaction,
} from "../hooks/useTransaction";
import { Category, PaymentMethod, TransactionType } from "../types";
import {
  PAYMENT_METHOD_BANK_TRANSFER,
  PAYMENT_METHOD_CARD,
  PAYMENT_METHOD_CASH,
  PAYMENT_METHOD_UPI,
} from "../utils/constants";

interface AddExpenseProps {
  onCancel: () => void;
  onSuccess: () => void;
  transaction?: Transaction;
}

const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
  { value: PAYMENT_METHOD_CASH, label: "Cash" },
  { value: PAYMENT_METHOD_CARD, label: "Card" },
  { value: PAYMENT_METHOD_UPI, label: "UPI" },
  { value: PAYMENT_METHOD_BANK_TRANSFER, label: "Bank Transfer" },
];

const paymentOptions = PAYMENT_METHODS.map((m) => ({
  label: m.label,
  value: m.value,
}));

export const AddExpense = ({ onCancel, onSuccess, transaction }: AddExpenseProps) => {
  const isEditing = !!transaction;

  const [amount, setAmount] = useState(isEditing ? transaction.amount.toString() : "");
  const [category, setCategory] = useState<Category | null>(
    isEditing ? transaction.category : null,
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | "">(
    isEditing ? transaction.paymentMethod : "",
  );
  const [date, setDate] = useState(
    format(isEditing ? new Date(transaction.date) : new Date(), "yyyy-MM-dd'T'HH:mm"),
  );
  const [merchant, setMerchant] = useState<string>(isEditing ? transaction.merchant : "");
  const [description, setDescription] = useState(
    isEditing ? transaction.description : "",
  );

  const { mutate: createTransaction, isPending } = useCreateTransaction();
  const { mutate: updateTransaction, isPending: isUpdating } = useUpdateTransaction();
  const { mutate: deleteTransaction, isPending: isDeleting } = useDeleteTransaction();

  const handleSubmit = () => {
    if (!amount || !category || !paymentMethod) return;

    const body = {
      amount: parseFloat(amount),
      type: "expense" as TransactionType,
      category,
      paymentMethod: paymentMethod as PaymentMethod,
      date: formatISO(new Date(date)),
      description,
      merchant,
    };

    if (isEditing) {
      updateTransaction({ id: transaction._id, body }, { onSuccess });
    } else {
      createTransaction(body, { onSuccess });
    }
  };

  const handleDelete = () => {
    if (!isEditing) return;
    deleteTransaction(transaction._id, { onSuccess });
  };

  return (
    <div className="space-y-6 pb-44">
      <header className="flex items-center gap-3">
        <Button variant="tertiary" size="md" iconOnly onClick={onCancel}>
          <ArrowLeft size={18} />
        </Button>

        <span className="font-headline text-lg font-bold">
          {isEditing ? "Edit Transaction" : "Add Expense"}
        </span>
      </header>

      <AmountInput value={amount} onChange={setAmount} />

      {/* Details Card */}
      <div className="glass-card rounded-lg p-5 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Merchant"
            type="text"
            value={merchant}
            required
            onChange={(e) => setMerchant(e.target.value)}
          />

          <Input
            label="Date & Time"
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <Select
            label="Payment Method"
            options={paymentOptions}
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
            placeholder="Select payment"
          />
        </div>

        <TextArea
          label="Notes"
          placeholder="What was this expense for?"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <CategoryPicker value={category} onChange={setCategory} />

      <RawMessageViewer message={transaction?.rawMessage || ""} />

      {/* Sticky Save Bar ABOVE NAV */}
      {/* Sticky Action Bar */}
      <div className="fixed bottom-21.5 left-0 right-0 z-40 px-4">
        <div className="glass-card rounded-3xl p-3 shadow-2xl">
          <div className="flex gap-3">
            {/* Cancel */}
            <Button size="lg" variant="tertiary" className="flex-1" onClick={onCancel}>
              Cancel
            </Button>

            {/* Save */}
            <Button
              size="lg"
              variant="primary"
              loading={isPending || isUpdating}
              className="flex-2"
              onClick={handleSubmit}
            >
              <CheckCircle size={18} />

              {isEditing ? "Update" : "Save"}
            </Button>
          </div>

          {isEditing && (
            <Button
              size="md"
              variant="danger"
              loading={isDeleting}
              className="w-full mt-3"
              onClick={handleDelete}
            >
              <Trash size={18} />
              Delete Transaction
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
