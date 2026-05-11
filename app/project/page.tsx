import { ProtectedRoute } from "@/src/shared/helpers/components";
import { ProjectsPage } from "@/src/views/projects";

export default function ProjectsRoute() {
    return (
        <ProtectedRoute>
            <ProjectsPage />
        </ProtectedRoute>
    );
}