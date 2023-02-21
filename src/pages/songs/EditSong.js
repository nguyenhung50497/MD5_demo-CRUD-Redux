/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import customAxios from "../../service/api";
const validateSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Too short!")
        .max(50, "Too long!")
        .required("Required"),
    description: Yup.string()
        .min(2, "Too short!")
        .max(50, "Too long!")
        .required("Required"),
    action: Yup.string()
        .min(2, "Too short!")
        .max(50, "Too long!")
        .required("Required"),
})

export default function EditSong() {
    const navigate = useNavigate();
    const {id} = useParams();
    let [song, setSong] = useState({});
    useEffect(() => {
        customAxios.get('students/'+ id).then(res => {
            setSong(res.data);
        })
    }, []);
    console.log(song);
    return (
        <center>
            <h1>Edit Song</h1>
            <Formik 
                initialValues={{
                    nameSong: song.nameSong,
                    singer: song.singer,
                    author: song.author,
                    category: song.nameCategory
                }}
                validationSchema={validateSchema}
                onSubmit={(value) => {
                    customAxios.put('students/'+ id, value).then(() => {
                        alert('Song updated successfully');
                        navigate('/home');
                    });
                }}
                enableReinitialize={true}
            >
                <Form>
                    <table>
                        <tr>
                            <td>
                                Name: 
                            </td>
                            <td>
                                <Field name= {'nameSong'}></Field><br/>
                            </td>
                            <td>
                                <ErrorMessage name={'nameSong'}></ErrorMessage><br/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Singer: 
                            </td>
                            <td>
                                <Field name= {'singer'}></Field><br/>
                            </td>
                            <td>
                                <ErrorMessage name={'singer'}></ErrorMessage><br/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Author: 
                            </td>
                            <td>
                                <Field name= {'author'}></Field><br/>
                            </td>
                            <td>
                                <ErrorMessage name={'author'}></ErrorMessage><br/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Category: 
                            </td>
                            <td>
                                <Field name= {'category'}></Field><br/>
                            </td>
                            <td>
                                <ErrorMessage name={'category'}></ErrorMessage><br/>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button className="btn btn-primary">Save</button><br/>
                            </td>
                            <td></td>
                        </tr>
                    </table>
                </Form>
            </Formik>
        </center>
    )
}
