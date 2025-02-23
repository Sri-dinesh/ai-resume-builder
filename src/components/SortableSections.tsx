//// filepath: /c:/Users/ADMIN/Desktop/Development/Coding/ai-resume-builder/src/components/SortableSections.tsx
"use client";

import { useState } from "react";
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

export interface Section {
  id: string;
  component: React.ReactNode;
}

interface SortableSectionsProps {
  sections: Section[];
}

export default function SortableSections({ sections }: SortableSectionsProps) {
  const [items, setItems] = useState<string[]>(
    sections.map((section) => section.id),
  );

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.indexOf(active.id as string);
      const newIndex = items.indexOf(over.id as string);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((id) => {
          const section = sections.find((sec) => sec.id === id);
          return (
            <SortableItem key={id} id={id}>
              {section?.component}
            </SortableItem>
          );
        })}
      </SortableContext>
    </DndContext>
  );
}
