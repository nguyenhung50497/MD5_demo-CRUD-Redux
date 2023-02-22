
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import swal from 'sweetalert';
import { useDispatch, useSelector } from "react-redux";
import { getAlbums } from "../../service/albumService";
import { deleteAlbum } from "../../service/albumService";
import {NumberParam, useQueryParam} from "use-query-params";

export default function ListAlbum() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page, setPage] = useSearchParams()
    const page1 = page.get('page') || 1;
    let albums = useSelector(state => {
        if (state.albums.albums !== undefined) {
            return state.albums.albums.albums
        }
    })
    const totalPages = useSelector(state => {
        if (state.albums.albums !== undefined) {
            return state.albums.albums.totalPage;
        }
    })
    const loading = useSelector(state => {
        return state.albums.loading
    })
    const user = useSelector(state => state.user.currentUser)
    useEffect(() => {
        dispatch(getAlbums(page1));
    }, []);
    const handleDelete = (id) => {
        let data = [id, user.token]
        dispatch(deleteAlbum(data)).then((value) => {
            if (value.payload) {dispatch(getAlbums()).then(() => {
                    navigate('/home/albums')
                })
            }
            else {
                swal("You do not own this album!");
            }
        })
    }
    return (
        <div className="container">
            <h1 className="text-center">List Album</h1>
            { loading === true ? 
            <center className="container-fluid" style={{marginTop: '200px'}}>
                <div className="loader"></div>
            </center>
            :
            <>
                <div className="row">
                    <div className="mx-auto row col-8">
                        {albums !== undefined && albums.map(item => (
                            <div className="col-6">
                                <div key={item.idAlbum} className="card" style={{width: '100%', height: '100%', paddingBottom:'30px'}}>
                                    <img key={item.idAlbum} src={item.imageAlbum} className="card-img-top" alt={item.imageAlbum} />
                                    <div className="card-body">
                                        <h1>{item.nameAlbum}</h1>
                                        <p className="card-text"
                                        style={{color: 'orange'}}>{item.idUser !== undefined && item.username}</p>
                                        <p className="card-text">{item.countSong}</p>
                                        { user.idUser === item.idUser &&
                                        <>
                                            <Link to={'/home/edit-album/'+item.idAlbum}><button className="btn btn-primary">Edit</button></Link>
                                            <button className="btn btn-danger" onClick={() => {
                                                swal({
                                                    title: "Are you sure?",
                                                    text: "Delete this album!!!",
                                                    icon: "warning",
                                                    buttons: true,
                                                    dangerMode: true,
                                                })
                                                .then((willDelete) => {
                                                    if (willDelete) {
                                                        handleDelete(item.idAlbum)
                                                        swal("Poof! Your album has been deleted!", {
                                                        icon: "success",
                                                    });
                                                    } else {
                                                    swal("Your album is safe!");
                                                    }
                                                });
                                            }}>Delete</button>
                                        </>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            {(page1 == 1) ?
                                <>
                                    <div className="page-link"><span aria-hidden="true" style={{color:'black'}}>&laquo;</span></div>
                                </>
                                :
                                <>
                                    <button  className="page-link" onClick={() => {
                                        dispatch(getAlbums(page1 - 1));
                                        navigate('/home/albums?page='+(page1-1))
                                    }
                                    }> <span aria-hidden="true">&laquo;</span>
                                    </button>
                                </>
                            }
                        </li>
                        <li className="page-item"><a className="page-link">{page1}/{totalPages}</a></li>
                        <li className="page-item">
                            {(page1 == totalPages) ?
                                <>
                                <div className="page-link"><span aria-hidden="true" style={{color:'black'}}>&raquo;</span></div>
                                </>
                                :
                                <>
                                    <button  className="page-link" onClick={() => {
                                        dispatch(getAlbums(Number(page1) + 1));
                                        navigate('/home/albums?page='+(Number(page1)+1))
                                    }
                                    }> <span aria-hidden="true">&raquo;</span>
                                    </button>
                                </>
                            }
                        </li>
                    </ul>
                </nav>
            </>
            }
        </div>
    )
}
