import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expenseSchema, type ExpenseFormData } from "@/lib/validations";
import { Expense } from "@/types";
import Input from "./ui/Input";
import Select from "./ui/Select";
import Button from "./ui/Button";
import { format } from "date-fns";

interface ExpenseFormProps {
  onSubmit: (data: ExpenseFormData) => Promise<void>;
  initialData?: Expense;
  loading?: boolean;
}

const categories = [
  { value: "Food", label: "Food" },
  { value: "Transport", label: "Transport" },
  { value: "Shopping", label: "Shopping" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Health", label: "Health" },
  { value: "Education", label: "Education" },
  { value: "Bills", label: "Bills" },
  { value: "Others", label: "Others" },
];

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  onSubmit,
  initialData,
  loading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          amount: initialData.amount,
          category: initialData.category as ExpenseFormData["category"],
          date: format(new Date(initialData.date), "yyyy-MM-dd"),
        }
      : {
          date: format(new Date(), "yyyy-MM-dd"),
        },
  });

  const handleFormSubmit = async (data: ExpenseFormData) => {
    await onSubmit(data);
    if (!initialData) {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Input
        label="Title"
        {...register("title")}
        error={errors.title?.message}
        placeholder="Enter expense title"
      />

      <Input
        label="Amount"
        type="number"
        step="0.01"
        {...register("amount", { valueAsNumber: true })}
        error={errors.amount?.message}
        placeholder="0.00"
      />

      <Select
        label="Category"
        {...register("category")}
        error={errors.category?.message}
        options={categories}
      />

      <Input
        label="Date"
        type="date"
        {...register("date")}
        error={errors.date?.message}
      />

      <div className="flex justify-end space-x-3">
        <Button type="submit" loading={loading}>
          {initialData ? "Update Expense" : "Add Expense"}
        </Button>
      </div>
    </form>
  );
};

export default ExpenseForm;
