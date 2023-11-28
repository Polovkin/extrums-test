import LoginForm from "../forms/LoginForm";
import {Card, CardBody, CardFooter, CardText, CardTitle} from "react-bootstrap";
import {Link} from "react-router-dom";

const Login = () => {

    return (
        <Card className={'w-25'}>
            <CardBody>
                <CardTitle as={'h3'} className={'mb-4'}>Autorisation</CardTitle>
                <div>
                    <LoginForm/>
                </div>
            </CardBody>
            <CardFooter>
                <CardText className={'d-flex justify-content-between'}>
                    <Link to="/auth/register">Register</Link>
                    <Link to="/auth/forgot-password">Forgot password?</Link>
                </CardText>
            </CardFooter>
        </Card>
    );
}

export default Login;
