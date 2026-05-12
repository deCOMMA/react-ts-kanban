import { ProtectedRoute } from "@/src/shared/helpers/components";
import { ProfileLayout } from "@/src/views/profile/profile-layout";

export default function ProfileRouteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute>
            <ProfileLayout>{children}</ProfileLayout>
        </ProtectedRoute>
    );
}