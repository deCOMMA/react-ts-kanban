import { ProtectedRoute } from "@/src/shared/helpers/components/";
import { ProjectKanbanPage } from "@/src/views/projects/project-kanban";

interface ProjectKanbanRouteProps {
    params: Promise<{
        projectId: string;
    }>;
}

export default async function ProjectKanbanRoute({
    params,
}: ProjectKanbanRouteProps) {
    const { projectId } = await params;

    return (
        <ProtectedRoute>
            <ProjectKanbanPage projectId={projectId} />
        </ProtectedRoute>
    );
}