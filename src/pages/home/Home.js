
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";

export default function Home() {
    return (
        <div className="row">
            <div className="col-12">
                <Navbar></Navbar>
                <hr/>
                <Outlet></Outlet>
            </div>
        </div>
    )
}
