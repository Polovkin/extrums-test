import {Link} from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 text-center">
                    <h1>404</h1>
                    <h2>Page not found</h2>
                    <Link to={'/'}>Go to home page</Link>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound;
