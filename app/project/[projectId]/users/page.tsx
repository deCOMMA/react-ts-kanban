import { ProjectUsersPage } from "@/src/views/projects/project-users";

interface ProjectUsersRouteProps {
    params: Promise<{
        projectId: string;
    }>;
}

export default async function ProjectUsersRoute({
    params,
}: ProjectUsersRouteProps) {
    const { projectId } = await params;

    return <ProjectUsersPage projectId={projectId} />;
}