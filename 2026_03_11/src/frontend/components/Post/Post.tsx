import { Link } from "react-router";
import { usePosts } from "../../hooks/posts";
import style from "./Post.module.scss";
import type {PostType} from "../../types/Post/Post"

const Post = () => {
    const { data: posts, isLoading, isError } = usePosts();

    if (isLoading) return <div className={style.Loader}>Loading data...</div>;
    if (isError) return <div className={style.ErrorMsg}>An unexpected error occurred</div>;

    return (
        <section className={style.ListContainer}>
            <div className={style.GridWrapper}>
                {posts && posts.length > 0 ? (
                    posts.map(({ id, title, body }: PostType) => (
                        <article key={id} className={style.PostCard}>
                            <h3 className={style.CardTitle}>{title}</h3>
                            <p className={style.CardExcerpt}>
                                {body.slice(0, 60)}...
                            </p>
                            <Link to={`/post/${id}`} className={style.DetailsBtn}>
                                Read more
                            </Link>
                        </article>
                    ))
                ) : (
                    <p>Currently, there are no posts to display.</p>
                )}
            </div>
        </section>
    );
};

export default Post;