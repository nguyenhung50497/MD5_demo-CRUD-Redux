import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addAlbum } from "../../service/albumService";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {storage} from "../../upload/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const validateSchema = Yup.object().shape({
    nameAlbum: Yup.string()
        .min(2, "Too short!")
        .max(50, "Too long!")
        .required("Required"),
})

export default function CreateALbum() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector( state => state.user.currentUser);
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progress, setProgress] = useState(0);
    const handleChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImages((prevState) => [...prevState, newImage]);
        }
    };
    const handleUpload = () => {
        const promises = [];
        if (images.length > 0) {
            images.map((image) => {
                const storageRef = ref(storage, `images/${image.name}`);
                const uploadTask = uploadBytesResumable(storageRef, image);
                promises.push(uploadTask);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        setProgress(progress);
                    },
                    (error) => {
                        console.log(error);
                    },
                    async () => {
                        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
                            setUrls(prevState => [...prevState, downloadURLs])
                        });
                    }
                );
            });
        }
        Promise.all(promises)
            .then(() => alert("All images uploaded"))
            .catch((err) => console.log(err));
    };
    const handleAdd = (values) => {
        let data = [{...values, imageAlbum: urls[0]}, user.token]
        dispatch(addAlbum(data)).then(() => {
            navigate('/home/albums')
        })
    }
    return (
        <center>
            <div className="container row">
                <div className="col-8">
                    <h1>Create Album</h1>
                    <Formik 
                        initialValues={{
                            nameAlbum: '',
                            idUser: user.idUser,
                            countSong: 0,
                        }}

                        validationSchema={validateSchema}

                        onSubmit={(values) => {
                            handleAdd(values);
                        }}
                    >
                        <Form>
                            <div class="form-group">
                                <label for="exampleFormControlInput1"><strong>Name Album</strong></label>
                                <Field type="text" name={'nameAlbum'} class="form-control" id="exampleFormControlInput1" placeholder="Name album"/>
                                <ErrorMessage name={'nameAlbum'}></ErrorMessage>
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlFile1"><strong>Upload Image Album</strong></label>
                                <input type="file" class="form-control-file" id="exampleFormControlFile1" multiple onChange={handleChange} />
                                <br/>
                                <button type="button" className="btn btn-secondary" onClick={() => dispatch(handleUpload)}>Upload</button>
                            </div>
                            <br/>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </Form>
                    </Formik>
                </div>
                <div className="col-4">
                    <img className="mt-5" src={urls[0]} alt={urls[0]} />
                </div>
            </div>
        </center>
    )
}
