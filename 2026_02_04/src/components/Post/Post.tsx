import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { PostType } from "../../types/Post/Post";
import styles from "./Post.module.scss";

const Post = () => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then((json: PostType[]) => setPosts(json))
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) return <div className={styles.Loader}>Loading data...</div>;
    if (isError) return <div className={styles.ErrorMsg}>An unexpected error occurred</div>;

    return (
        <section className={styles.ListContainer}>
            <div className={styles.GridWrapper}>
                {posts.length > 0 ? (
                    posts.map(({ id, title, body }) => (
                        <article key={id} className={styles.PostCard}>
                            <h3 className={styles.CardTitle}>{title}</h3>
                            <p className={styles.CardExcerpt}>
                                {body.slice(0, 60)}...
                            </p>
                            <Link to={`/post/${id}`} className={styles.DetailsBtn}>
                                Read more
                            </Link>
                        </article>
                    ))
                ) : (
                    <p>No posts available to display.</p>
                )}
            </div>
        </section>
    );
};

export default Post;