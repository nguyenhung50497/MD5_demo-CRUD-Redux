import {Link, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useState } from "react";
import swal from 'sweetalert';
import {storage} from "../../upload/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { register } from "../../service/userService";
const validateSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, "Too short!")
        .max(50, "Too long!")
        .required("Required"),
    password: Yup.string()
        .min(2, "Too short!")
        .max(50, "Too long!")
        .required("Required"),
})

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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

    const handleRegister = (values) => {
        let data = {...values, avatar: urls[0]}
        dispatch(register(data)).then((value) =>{
            console.log(value);
            if (value.payload === 'Username already registered') {
                swal('Username already registered')
                navigate('/register')
            } else {
                navigate('/')
            }
        })
    }

    return (
        <div className="row">
            <div className="col-8 offset-3">
                <h1 className="text-center">Register</h1>
                <div className="row">
                <div className="col-7">
                    <Formik
                        initialValues={{
                            username: '',
                            password: '',
                        }}

                        validationSchema={validateSchema}

                        onSubmit={(values) => {
                            handleRegister(values);
                        }}
                    >
                        <Form>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Field type="text" name={'username'} className="form-control" id="username" />
                                <alert className="text-danger"><ErrorMessage name={'username'}></ErrorMessage></alert>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field type="password" name={'password'} className="form-control" id="password" />
                                <alert className="text-danger"><ErrorMessage name={'password'}></ErrorMessage></alert>
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlFile1"><strong>Upload Image Album</strong></label>
                                <input type="file" class="form-control-file" id="exampleFormControlFile1" multiple onChange={handleChange} />
                                <br/>
                                <button type="button" className="btn btn-secondary" onClick={() => dispatch(handleUpload)}>Upload</button>
                            </div>
                            <div>
                                <button type="button" className="btn btn-secondary">
                                    <Link to={"/"} style={{textDecoration: "none", color:"white"}}>Login</Link>
                                </button>
                                <button type="submit" className="btn btn-primary ml-3">Signup</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
                <div className="col-5">
                    <img className="mt-1" src={urls[0]} alt={urls[0]} />
                </div>
            </div>
            </div>
        </div>
    )
}