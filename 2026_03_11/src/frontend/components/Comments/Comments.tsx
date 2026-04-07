import { useComments, useAddComment } from "../../hooks/comment";
import style from './Comments.module.scss';
import {useState} from "react";
import type {Comment} from "../../types/Comment/Comment";
import postID from "../PostID/PostID";
const Comments = ({ postId }: { postId: number }) => {
    const { data: discussion, isLoading, isError } = useComments(postId);
    const addComment = useAddComment(postID);

    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async () => {
        if (!author.trim() || !content.trim()) return;
        await addComment.mutateAsync({ author, content });
        setAuthor('');
        setContent('');
    };
    return (
        <section className={style.CommentList}>
            <h3 className={style.CommentListHeading}>Comments</h3>

            {isLoading && <div>Fetching user opinions...</div>}
            {isError && <div className={style.CommentListError}>Problem loading comments.</div>}

            <div className={style.CommentListForm}>
                <input
                    placeholder="Your name"
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                />
                <textarea
                    placeholder="Write a comment..."
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <button
                    onClick={handleSubmit}
                    disabled={addComment.isPending || !author.trim() || !content.trim()}
                >
                    {addComment.isPending ? 'Sending...' : 'Add comment'}
                </button>
            </div>

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