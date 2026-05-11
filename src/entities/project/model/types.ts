import type { UserPreview } from "@/src/entities/user";
import type { Board } from "@/src/entities/board";
import type { CreateDto, UpdateDto } from "@/src/shared/types/index";

export interface Project {
  id: string;
  title: string;
  description?: string;
  key: string;
  owner: string;
  members: UserPreview[];
  boards?: Board[];
  createdAt: string;
  updatedAt: string;
}

export type CreateProjectDto = CreateDto<Project>;
export type UpdateProjectDto = UpdateDto<Project>;
