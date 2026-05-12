import { ProjectInfoPage } from "@/src/views/projects/project-info";

interface ProjectInfoRouteProps {
    params: Promise<{
        projectId: string;
    }>;
}

export default async function ProjectInfoRoute({
    params,
}: ProjectInfoRouteProps) {
    const { projectId } = await params;

    return <ProjectInfoPage projectId={projectId} />;
}