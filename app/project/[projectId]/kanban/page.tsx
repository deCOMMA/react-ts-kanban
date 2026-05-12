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

    return <ProjectKanbanPage projectId={projectId} />;
}