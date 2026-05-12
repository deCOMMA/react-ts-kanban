import { ProtectedRoute } from "@/src/shared/helpers/components";
import { ProjectLayout } from "@/src/widgets/project-layout";

interface ProjectRouteLayoutProps {
    children: React.ReactNode;
    params: Promise<{
        projectId: string;
    }>;
}

export default async function ProjectRouteLayout({
    children,
    params,
}: ProjectRouteLayoutProps) {
    const { projectId } = await params;

    return (
        <ProtectedRoute>
            <ProjectLayout projectId={projectId}>{children}</ProjectLayout>
        </ProtectedRoute>
    );
}