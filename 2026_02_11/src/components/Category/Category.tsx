import { Link } from "react-router";
import style from "./Category.module.scss";

const Category = () => {
    return (
        <div className={style.Category}>

            <h1>Category List</h1>
            <ul>
                <li>AI</li>
                <li>Software</li>
                <li>Hardware</li>
                <li>Cybersecurity</li>
            </ul>
            <Link to="/" >Go Main</Link>
        </div>
    );
}
export default Category;