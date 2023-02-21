import { Link } from "react-router-dom";

export default function Register() {
    return (
        <div className="row">
            <div className="col-6 offset-3">
                <h1 className="text-center">Register</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address/Username</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">Signup</button>
                        <button className="btn btn-secondary ml-3">
                            <Link to={"/"} style={{textDecoration: "none", color:"white"}}>Login</Link>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}