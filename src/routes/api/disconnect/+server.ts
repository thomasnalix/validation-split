import type {RequestHandler} from "../../../../.svelte-kit/types/src/routes/api/profile/$types";

export const POST: RequestHandler = async ({cookies}) => {
    try {
        cookies.delete('email', {
            path: '/',
            httpOnly: false,
            secure: false,
        });

        return new Response("Successfully deleted cookie");
    } catch (error: any) {
        return new Response("Error when deleting cookie", {status: 500});
    }
};
