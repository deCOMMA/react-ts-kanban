import { ProtectedRoute } from "@/src/shared/helpers/components";
import { ProfilePage } from "@/src/views/profile";

export default function ProfileRoute() {
    return (
        <ProtectedRoute>
            <ProfilePage />
        </ProtectedRoute>
    );
}