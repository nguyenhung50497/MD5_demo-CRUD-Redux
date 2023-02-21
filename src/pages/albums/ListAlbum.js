
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import { useDispatch, useSelector } from "react-redux";
import { getAlbums } from "../../service/albumService";
import { deleteAlbum } from "../../service/albumService";

export default function ListAlbum() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let {albums} = useSelector(state => state.albums)
    const user = useSelector(state => state.user.currentUser)
    useEffect(() => {
        dispatch(getAlbums());
    }, []);
    const handleDelete = (id) => {
        let data = [id, user.token]
        dispatch(deleteAlbum(data)).then((value) => {
            console.log(value.payload);
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
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Image Album</th>
                        <th colSpan={2} className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {albums.map((item, key) => {
                        return (
                            <tr key={key}>
                                <td>{item.nameAlbum}</td>
                                <td>{item.username}</td>
                                <td><img src={item.imageAlbum} /></td>
                                { user.idUser === item.idUser ? 
                                    <>
                                        <td><Link to={'/home/edit-album/'+item.idAlbum}><button className="btn btn-primary">Edit</button></Link></td>
                                        <td><button className="btn btn-danger" onClick={() => {
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
                                        }}>Delete</button></td>
                                    </> :
                                    <>
                                        <td></td>
                                        <td></td>
                                    </>
                                }
                                
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <br/>
        </div>
    )
}
