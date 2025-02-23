//// filepath: /c:/Users/ADMIN/Desktop/Development/Coding/ai-resume-builder/src/components/SectionOrderEditor.tsx
"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

export interface SectionItem {
  id: string;
  title: string;
}

interface SectionOrderEditorProps {
  initialOrder: SectionItem[];
  onOrderChange?: (order: SectionItem[]) => void;
}

export default function SectionOrderEditor({
  initialOrder,
  onOrderChange,
}: SectionOrderEditorProps) {
  const [items, setItems] = useState(initialOrder);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const newOrder = arrayMove(items, oldIndex, newIndex);
      setItems(newOrder);
      onOrderChange && onOrderChange(newOrder);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        {items.map((item) => (
          <SortableItem key={item.id} id={item.id}>
            <div className="cursor-move rounded border bg-gray-100 p-2 text-center">
              {item.title}
            </div>
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
}
