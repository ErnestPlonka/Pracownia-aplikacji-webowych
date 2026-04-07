import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from './PostID.module.scss';
import type { PostType } from "../../types/Post/Post";
import Comments from "../Comments/Comments";

const PostID = () => {
    const { id } = useParams<{ id: string }>();
    const [entry, setEntry] = useState<PostType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        if (!id) return;
        setIsLoading(true);
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then((data: PostType) => setEntry(data))
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
    }, [id]);

    if (isLoading) return <div className={styles.StatusMessage}>Loading post content...</div>;
    if (isError || !entry) return <div className={styles.ErrorMessage}>Post not found.</div>;

    return (
        <main className={styles.DetailsWrapper}>
            <section className={styles.ContentCard}>
                <header className={styles.ArticleHeader}>
                    <span className={styles.PostIndex}>Post #{entry.id}</span>
                    <h1 className={styles.MainTitle}>{entry.title}</h1>
                </header>
                <article className={styles.ArticleBody}>
                    <p>{entry.body}</p>
                </article>
            </section>

            {/* Przekazujemy id jako prop do komentarzy */}
            <Comments postId={Number(id)} />
        </main>
    );
};

export default PostID;