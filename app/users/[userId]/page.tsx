import { ProtectedRoute } from "@/src/shared/helpers/components";
import { UserProfilePage } from "@/src/views/users/user-profile";

interface UserProfileRouteProps {
    params: Promise<{
        userId: string;
    }>;
}

export default async function UserProfileRoute({
    params,
}: UserProfileRouteProps) {
    const { userId } = await params;

    return (
        <ProtectedRoute>
            <UserProfilePage userId={userId} />
        </ProtectedRoute>
    );
}