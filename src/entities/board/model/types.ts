import type { Column } from "@/src/entities/column";
import type { CreateDto, UpdateDto } from "@/src/shared/types/index";

export interface Board {
  id: string;
  title: string;
  projectId: string;
  columns?: Column[];

  createdAt: string;
  updatedAt: string;
}

export type CreateBoardDto = CreateDto<Board>;
export type UpdateBoardDto = UpdateDto<Board>;
