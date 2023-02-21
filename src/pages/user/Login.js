import { Field, Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../service/userService";
import { useEffect } from "react";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async (values) => {
        await dispatch(login(values)).then((e) => {
            if (e.payload !== "User not found" && e.payload !== "Wrong password") {
                navigate('/home/albums')
            } else if (e.payload === "User not found" ) {
                alert("User not found");
                navigate('/')
            } else if (e.payload === "Wrong password" ) {
                alert("Wrong password");
                navigate('/')
            } else {
                navigate('/')
            }
        });
    }

    useEffect(() => {
        localStorage.clear();
    }, [])
    
    return (
        <div className="row">
            <div className="col-6 offset-3">
                <h1 className="text-center">Login</h1>
                <Formik
                    initialValues = {
                        {
                            username: '',
                            password: '',
                        }
                    }
                    onSubmit={(values) => {
                        handleLogin(values).then();
                    }}
                >
                    <Form>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Field type="text" name={'username'} className="form-control" id="username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field type="password" name={'password'} className="form-control" id="password" />
                        </div>
                        <div>
                            <button className="btn btn-primary">Login</button>
                            <button className="btn btn-secondary ml-3">
                                <Link to={"/register"} style={{textDecoration: "none", color:"white"}}>Register</Link>
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}