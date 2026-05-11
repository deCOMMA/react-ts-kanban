import { ProtectedRoute } from "@/src/shared/helpers/components/index";
import { CreateProjectPage } from "@/src/views/projects/projcet-new/";

export default function CreateProjectRoute() {
    return (
        <ProtectedRoute>
            <CreateProjectPage />
        </ProtectedRoute>
    );
}