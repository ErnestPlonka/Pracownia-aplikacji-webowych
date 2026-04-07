import { useQuery } from "@tanstack/react-query";
import type { PostType } from "../types/Post/Post";

const fetchPosts = async (): Promise<PostType[]> => {
    const res = await fetch('/api/post');
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
};

const fetchPost = async (id: string): Promise<PostType> => {
    const res = await fetch(`/api/post/${id}`);
    if (!res.ok) throw new Error('Failed to fetch post');
    return res.json();
};

export const usePosts = () => useQuery<PostType[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts
});

export const usePost = (id: string | undefined) => useQuery<PostType>({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id!),
    enabled: !!id
});