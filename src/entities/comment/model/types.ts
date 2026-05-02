import type { UserPreview } from "@/src/entities/user";
import type {
  CreateDto,
  UpdateDto,
  RequireFields,
} from "@/src/shared/types/index";

export interface Comment {
  id: string;
  text: string;
  taskId: string;
  author: UserPreview;
  createdAt: string;
  updatedAt: string;
}

export type CreateCommentDto = CreateDto<Comment>;

export type UpdateCommentDto = RequireFields<UpdateDto<Comment>, "text">;
