import React, { useState } from "react";
import { Edit2, Trash2, Calendar, DollarSign } from "lucide-react";
import { Expense, ExpenseFormData } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Card, CardContent } from "./ui/Card";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import ExpenseForm from "./ExpenseForm";

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (id: string, data: ExpenseFormData) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  loading?: boolean;
}

const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  onEdit,
  onDelete,
  loading,
}) => {
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleEdit = async (data: ExpenseFormData) => {
    if (editingExpense) {
      await onEdit(editingExpense._id, data);
      setEditingExpense(null);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await onDelete(id);
    setDeletingId(null);
  };

  const getCategoryVariant = (
    category: string
  ):
    | "default"
    | "food"
    | "transport"
    | "shopping"
    | "entertainment"
    | "health"
    | "education"
    | "bills"
    | "others" => {
    switch (category) {
      case "Food":
        return "food";
      case "Transport":
        return "transport";
      case "Shopping":
        return "shopping";
      case "Entertainment":
        return "entertainment";
      case "Health":
        return "health";
      case "Education":
        return "education";
      case "Bills":
        return "bills";
      case "Others":
        return "others";
      default:
        return "default";
    }
  };

  if (expenses.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <DollarSign className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No expenses found
          </h3>
          <p className="text-gray-500">
            Start by adding your first expense above.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {expenses.map((expense) => (
                    <tr key={expense._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {expense.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-green-600">
                          {formatCurrency(expense.amount)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={getCategoryVariant(expense.category)}>
                          {expense.category}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(expense.date)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingExpense(expense)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(expense._id)}
                            loading={deletingId === expense._id}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {expenses.map((expense) => (
            <Card key={expense._id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{expense.title}</h3>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingExpense(expense)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(expense._id)}
                      loading={deletingId === expense._id}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold text-green-600">
                    {formatCurrency(expense.amount)}
                  </span>
                  <Badge variant={getCategoryVariant(expense.category)}>
                    {expense.category}
                  </Badge>
                </div>
                <div className="text-sm text-gray-500 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(expense.date)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingExpense}
        onClose={() => setEditingExpense(null)}
        title="Edit Expense"
      >
        {editingExpense && (
          <ExpenseForm
            onSubmit={handleEdit}
            initialData={editingExpense}
            loading={loading}
          />
        )}
      </Modal>
    </>
  );
};

export default ExpenseList;
