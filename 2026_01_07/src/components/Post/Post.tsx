import {Link} from "react-router";
import style from "./Post.module.scss";

const Post = () => {
    return (
        <div className={style.Post}>
            <h1>Posts</h1>
            <p>There will be posts someday</p>
            <Link to="/" >Go Main</Link>
        </div>
    );
}
export default Post;