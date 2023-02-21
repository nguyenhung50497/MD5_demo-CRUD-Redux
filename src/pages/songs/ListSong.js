
import { useEffect } from "react"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSongs } from "../../service/songService";

export default function ListSong() {
    const dispatch = useDispatch();
    let {songs} = useSelector(state => state.songs)
    useEffect(() => {
        dispatch(getSongs());
    }, []);
    return (
        <div className="container">
            <h1 className="text-center">List Song</h1>
            <table className="table table-striped">
                <tr>
                    <th>Name</th>
                    <th>Singer</th>
                    <th>Author</th>
                    <th>Album</th>
                    <th>Image</th>
                    <th>Category</th>
                    <th colSpan={2} className="text-center">Action</th>
                </tr>
                <tbody>
                    {songs.map((item, key) => {
                        return (
                            <tr key={key}>
                                <td>{item.nameSong}</td>
                                <td>{item.singer}</td>
                                <td>{item.author}</td>
                                <td>{item.nameAlbum}</td>
                                <td><img src={item.image} /></td>
                                <td>{item.nameCategory}</td>
                                <td><Link to={'/home/edit-song/'+item.idSong}><button className="btn btn-primary">Edit</button></Link></td>
                                <td><Link to={'/home/delete-song/'+item.idSong}><button className="btn btn-danger">Delete</button></Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <br/>
        </div>
    )
}
