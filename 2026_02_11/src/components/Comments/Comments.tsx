import { useComments } from "../../hooks/comment";
import style from './Comments.module.scss';
import type {Comment} from "../../types/Comment/Comment";
const Comments = ({ postId }: { postId: number }) => {
    const { data: discussion, isLoading, isError } = useComments(postId);

    return (
        <section className={style.CommentList}>
            <h3 className={style.CommentListHeading}>Comments</h3>

            {isLoading && <div>Fetching user opinions...</div>}
            {isError && <div className={style.CommentListError}>Problem loading comments.</div>}

            <div className={style.FadeIn}>
                {discussion?.map((comment: Comment) => (
                    <article className={style.CommentListComment} key={comment.id}>
                        <h4 className={style.CommentListCommentName}>{comment.name}</h4>
                        <p className={style.CommentListCommentUser}>{comment.email}</p>
                        <p className={style.CommentListCommentBody}>{comment.body}</p>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Comments;