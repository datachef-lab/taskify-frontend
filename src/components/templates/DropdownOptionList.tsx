import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, X, Edit, Check } from "lucide-react";

export interface DropdownItem {
  id: string;
  name: string;
  order: number;
}

interface DropdownOptionListProps {
  options: DropdownItem[];
  onAddOption: (option: Omit<DropdownItem, "id">) => void;
  onUpdateOption: (id: string, option: Partial<DropdownItem>) => void;
  onDeleteOption: (id: string) => void;
}

export function DropdownOptionList({
  options,
  onAddOption,
  onUpdateOption,
  onDeleteOption,
}: DropdownOptionListProps) {
  const [newOption, setNewOption] = useState<Omit<DropdownItem, "id">>({
    name: "",
    order: options.length + 1,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedOption, setEditedOption] = useState<Partial<DropdownItem>>({});

  const handleAddOption = () => {
    if (!newOption.name.trim()) {
      return;
    }

    onAddOption(newOption);
    setNewOption({ name: "", order: options.length + 1 });
  };

  const startEditing = (option: DropdownItem) => {
    setEditingId(option.id);
    setEditedOption({ ...option });
  };

  const saveEdit = (id: string) => {
    if (!editedOption.name?.trim()) {
      return;
    }

    onUpdateOption(id, editedOption);
    setEditingId(null);
    setEditedOption({});
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedOption({});
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Option Name</label>
        <div className="flex gap-2">
          <Input
            placeholder="Enter option name"
            value={newOption.name}
            onChange={(e) =>
              setNewOption({ ...newOption, name: e.target.value })
            }
          />
          <Button
            onClick={handleAddOption}
            disabled={!newOption.name.trim()}
            size="sm"
          >
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
      </div>

      {options.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="w-[120px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {options.map((option) => (
              <TableRow key={option.id}>
                <TableCell>
                  {editingId === option.id ? (
                    <Input
                      value={editedOption.name || ""}
                      onChange={(e) =>
                        setEditedOption({
                          ...editedOption,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    option.name
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {editingId === option.id ? (
                    <div className="flex space-x-1 justify-end">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => saveEdit(option.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={cancelEdit}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex space-x-1 justify-end">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => startEditing(option)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onDeleteOption(option.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-sm text-muted-foreground p-3 border rounded-md text-center">
          No options added yet
        </div>
      )}
    </div>
  );
}
