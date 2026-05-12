import { AuthStore } from "@/src/entities/auth";
import { BoardStore } from "@/src/entities/board";
import { ColumnStore } from "@/src/entities/column";
import { CommentStore } from "@/src/entities/comment";
import { FriendStore } from "@/src/entities/friend/inedx";
import { ProjectStore } from "@/src/entities/project";
import { TaskStore } from "@/src/entities/task";
import { UserStore } from "@/src/entities/user";

export class RootStore {
    authStore = new AuthStore();
    userStore = new UserStore();
    projectStore = new ProjectStore();
    boardStore = new BoardStore();
    columnStore = new ColumnStore();
    taskStore = new TaskStore();
    commentStore = new CommentStore();
    friendStore = new FriendStore();
}

export const rootStore = new RootStore();