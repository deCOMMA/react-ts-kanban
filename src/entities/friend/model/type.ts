export type FriendRequestStatus = "pending" | "accepted" | "rejected";

export interface FriendRequest {
    id: string;
    fromUserId: string;
    toUserId: string;
    status: FriendRequestStatus;
    createdAt: string;
    updatedAt: string;
}

export interface Friendship {
    id: string;
    userIds: [string, string];
    createdAt: string;
}