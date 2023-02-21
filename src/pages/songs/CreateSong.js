import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
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

export default function CreateSong() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector( state => state.user.currentUser);
    const handleAdd = (values) => {
        let data = {...values, user: {id: user.id}}
    }
    return (
        <center>
            <h1>Create Song</h1>
            <Formik 
                initialValues={{
                    nameSong: '',
                    singer: '',
                    author: '',
                    category: ''
                }}
                validationSchema={validateSchema}
                onSubmit={(value) => {
                    
                }}
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
