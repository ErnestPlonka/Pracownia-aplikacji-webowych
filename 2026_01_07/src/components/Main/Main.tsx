import {Link} from 'react-router'
import style from "./Main.module.scss";
const Main = () => {
    return (
        <div className={style.Main}>
            <h1>Main Page</h1>
            <p>This is our main page. Welcome!</p>
            <ul>
                <li>
                    <Link to="/post">Check out the posts</Link>
                </li>
                <li>
                    <Link to="/category">Check out list of categories</Link>
                </li>
            </ul>
        </div>
    );
}
export default Main;