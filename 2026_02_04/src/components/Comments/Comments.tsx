import { useEffect, useState } from "react";
import styles from './Comments.module.scss';
import type { Comment } from "../../types/Comment/Comment";

const Comments = ({ postId }: { postId: number }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (!postId) return;

        setIsLoading(true);
        setIsError(false);

        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then(res => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then((json: Comment[]) => setComments(json))
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
    }, [postId]);

    return (
        <div className={styles.CommentList}>
            {isLoading && (
                <div>Loading data...</div>
            )}

            {isError && (
                <div>An unexpected error occurred</div>
            )}

            {!isLoading && !isError && (
                <>
                    <h2 className={styles.CommentListHeading}>
                        Comments
                    </h2>

                    {comments.length === 0 && (
                        <div className={styles.CommentListError}>
                            No comments found for this post
                        </div>
                    )}

                    {comments.map(comment => (
                        <div className={styles.CommentListComment} key={comment.id}>
                            <h4 className={styles.CommentListCommentName}>
                                Title: {comment.name}
                            </h4>
                            <h6 className={styles.CommentListCommentUser}>
                                User: {comment.email}
                            </h6>
                            <p className={styles.CommentListCommentBody}>
                                {comment.body}
                            </p>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default Comments;