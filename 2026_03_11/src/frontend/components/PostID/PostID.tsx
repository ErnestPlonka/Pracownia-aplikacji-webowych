import { useParams } from "react-router";
import { usePost } from "../../hooks/posts";
import style from '../PostID.module.scss';
import Comments from "../Comments/Comments";

const PostID = () => {
    const { id } = useParams<{ id: string }>();
    const { data: entry, isLoading, isError } = usePost(id);

    if (isLoading) return <div className={style.StatusMessage}>Loading post content...</div>;
    if (isError || !entry) return <div className={style.ErrorMessage}>Entry not found.</div>;

    return (
        <main className={style.DetailsWrapper}>
            <section className={style.ContentCard}>
                <header className={style.ArticleHeader}>
                    <span className={style.PostIndex}>Post #{entry.id}</span>
                    <h1 className={style.MainTitle}>{entry.title}</h1>
                </header>

                <article className={style.ArticleBody}>
                    <p>{entry.body}</p>
                </article>
            </section>

            <Comments postId={entry.id} />
        </main>
    );
};

export default PostID;