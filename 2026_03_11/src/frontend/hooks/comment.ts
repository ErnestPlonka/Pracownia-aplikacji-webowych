import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Comment } from "../types/Comment/Comment";

const fetchComments = async (postId: number): Promise<Comment[]> => {
    const res = await fetch(`/api/comment/post/${postId}`);
    if (!res.ok) throw new Error('Failed to fetch comments');
    return res.json();
};

export const useComments = (postId: number) => useQuery<Comment[]>({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
    enabled: !!postId
});
export const useAddComment = (postId: string | undefined) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: { author: string; content: string }) => {
            const res = await fetch('/api/comment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, postId: Number(postId) })
            });
            if (!res.ok) throw new Error('Failed to add comment');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', postId] });
        }
    });
};