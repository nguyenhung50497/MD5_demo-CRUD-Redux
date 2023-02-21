import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Admin from './pages/admin/Admin';
import ListSong from './pages/songs/ListSong';
import CreateSong from './pages/songs/CreateSong';
import EditSong from './pages/songs/EditSong';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import { useDispatch, useSelector } from "react-redux";
import ListAlbum from './pages/albums/ListAlbum';
import CreateALbum from './pages/albums/CreateAlbum';
import EditALbum from './pages/albums/EditAlbum';


function App() {
    const user = useSelector( state => state.user.currentUser);
    return (
        <>
            <div className="container-fluid">
                <Routes>
                    <Route path={'/'} element={<Login></Login>}></Route>
                    <Route path={'/register'} element={<Register></Register>}></Route>
                    {
                        user !== "User not found" && user !== "Wrong password" ? 
                        <Route path={'home'} element={<Home/>}>
                            <Route path={'albums'} element={<ListAlbum/>}></Route>
                            <Route path={'create-album'} element={<CreateALbum/>}></Route>
                            <Route path={'edit-album/:id'} element={<EditALbum/>}></Route>
                            <Route path={'songs'} element={<ListSong/>}></Route>
                            <Route path={'create-song'} element={<CreateSong/>}></Route>
                            <Route path={'edit-song/:id'} element={<EditSong/>}></Route>
                        </Route> :
                        <Route path={'*'} element={<Login></Login>}></Route>
                    }
                    <Route path={'/admin'} element={<Admin/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;
