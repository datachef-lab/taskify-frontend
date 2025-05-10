import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, X, Edit, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export interface CheckboxItem {
  id: string;
  name: string;
  isCheckedByDefault: boolean;
  order: number;
}

interface CheckboxOptionListProps {
  options: CheckboxItem[];
  onAddOption: (option: Omit<CheckboxItem, "id">) => void;
  onUpdateOption: (id: string, option: Partial<CheckboxItem>) => void;
  onDeleteOption: (id: string) => void;
}

export function CheckboxOptionList({
  options,
  onAddOption,
  onUpdateOption,
  onDeleteOption,
}: CheckboxOptionListProps) {
  const [newOption, setNewOption] = useState<Omit<CheckboxItem, "id">>({
    name: "",
    isCheckedByDefault: false,
    order:
      (options.length > 0 ? Math.max(...options.map((o) => o.order)) : 0) + 1,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedOption, setEditedOption] = useState<Partial<CheckboxItem>>({});

  const handleAddOption = () => {
    if (!newOption.name.trim()) {
      // Don't add empty options
      return;
    }

    onAddOption(newOption);
    setNewOption({
      name: "",
      isCheckedByDefault: false,
      order: options.length + 1,
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewOption({ ...newOption, name: e.target.value });
  };

  const startEditing = (option: CheckboxItem) => {
    setEditingId(option.id);
    setEditedOption({ ...option });
  };

  const saveEdit = (id: string) => {
    if (editedOption.name?.trim() === "") {
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
      <h3 className="text-sm font-medium">Checkbox Options</h3>

      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <Label htmlFor="new-option-name">Name</Label>
          <Input
            id="new-option-name"
            value={newOption.name}
            onChange={handleNameChange}
            placeholder="Enter option name"
          />
        </div>

        <div className="flex items-center gap-2 h-10">
          <Checkbox
            id="default-checked"
            checked={newOption.isCheckedByDefault}
            onCheckedChange={(checked) =>
              setNewOption({
                ...newOption,
                isCheckedByDefault: checked === true,
              })
            }
          />
          <Label htmlFor="default-checked" className="text-sm">
            Checked by default
          </Label>
        </div>

        <Button
          onClick={handleAddOption}
          disabled={!newOption.name.trim()}
          className="flex gap-1 items-center"
        >
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>

      {options.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Default State</TableHead>
              <TableHead className="text-right">Actions</TableHead>
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
                    <span>{option.name}</span>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === option.id ? (
                    <Checkbox
                      checked={editedOption.isCheckedByDefault}
                      onCheckedChange={(checked) =>
                        setEditedOption({
                          ...editedOption,
                          isCheckedByDefault: checked === true,
                        })
                      }
                    />
                  ) : (
                    <Badge
                      variant={
                        option.isCheckedByDefault ? "default" : "outline"
                      }
                    >
                      {option.isCheckedByDefault ? "Checked" : "Unchecked"}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {editingId === option.id ? (
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={cancelEdit}>
                        <X className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => saveEdit(option.id)}
                        disabled={!editedOption.name?.trim()}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex justify-end gap-2">
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
                        className="text-destructive"
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
        <div className="text-center py-4 text-muted-foreground">
          No options added yet. Use the form above to add your first option.
        </div>
      )}
    </div>
  );
}
