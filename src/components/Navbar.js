/* eslint-disable jsx-a11y/anchor-is-valid */
import { useSelector } from "react-redux";
import {Link, useNavigate} from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const user = useSelector( state => {
        return state.user.currentUser
    })
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <Link class="navbar-brand" to="/home/albums">Home</Link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                                Add
                            </a>
                            <div class="dropdown-menu">
                                <Link class="dropdown-item" to="/home/create-album">Album</Link>
                                <Link class="dropdown-item" to="/home/create-song">Song</Link>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                        <li class="nav-item active">
                            <Link class="nav-link" to="/home/albums">Albums <span class="sr-only">(current)</span></Link>
                        </li>
                        <li class="nav-item active">
                            <Link class="nav-link" to="/home/songs">Songs <span class="sr-only">(current)</span></Link>
                        </li>
                    </ul>
                    <ul class="navbar-nav mr-auto">
                        <input class="form-control mr-sm-2 ml-5" type="search" placeholder="Search" aria-label="Search" style={{width: '500px'}} />
                    </ul>
                    <div class="btn-group">
                        <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                            {user.username}
                        </button>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item btn text-danger" onClick={() => {
                                localStorage.clear();
                                navigate('/')
                            }}>Logout</a>
                        </div>
                    </div>
                    <img className="ml-3" src={user.avatar} alt={user.avatar} style={{width: "50px", height: '50px', borderRadius: '25%'}} />
                </div>
            </nav>
        </>
    )
}
