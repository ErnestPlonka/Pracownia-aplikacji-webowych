import { useQuery } from "@tanstack/react-query";
import type { Comment } from "../types/Comment/Comment";

const fetchComments = async (postId: number): Promise<Comment[]> => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    if (!res.ok) throw new Error("Failed to fetch comments");
    return res.json();
};

export const useComments = (postId: number) => useQuery<Comment[]>({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
    enabled: !!postId
});