import React, {useEffect, useState} from 'react';
import {Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {addProductRequest} from "./api/api1";

const AddProduct = () => {
    const url="http://localhost:3050/products";
    const initialValues = {name: undefined, price: undefined};

    const  validationSchema= Yup.object().shape(
        {
          name:Yup.string().required(),
          price:Yup.string().required()
        }
    )

    const isEqual=(obj1, obj2)=>{
        console.log("obj1=",obj1);
        console.log("obj2=",obj2);
        if (obj1==obj2){
            return true;
        }
        if(obj1===undefined||obj2===undefined){
            return false;
        }

      for (let key of obj1.keys()){
        if (obj1[key]!==obj2[key]){
            return false;
        }
      }
      return true;

    }

    const [state,setState]=useState({response:undefined, error:undefined, requestData:undefined});

    const addProduct=(values,errors)=>{
        console.log("values",values);
        const equal=isEqual(values,state.requestData);
        if(equal){
            return;
        }
        setState({requestData: values});
    }

    useEffect(

        ()=> {
            if(!state.requestData){
                return;
            }
            addProductRequest( state.requestData)
                .then(response => (setState({...state,response: response.data,error: undefined})))
                .catch(error => (state.error = setState({...state,error: error,response: undefined})))

        },[state.requestData]

    )


    return (
        <div>
            <Formik initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={addProduct}>
                {
                    ({
                         handleChange,
                         handleSubmit,
                         handleBlur,
                         touched,
                         errors
                     }) =>
                        (

                            <form onSubmit={handleSubmit}>

                                <div>
                                    <label>Product name</label>
                                    <input name="name"
                                           onChange={handleChange("name")}
                                           onBlur={handleBlur("name")}/>

                                    <div>
                                        {touched.name && errors.name}
                                    </div>
                                </div>
                                <div>
                                    <label>Price</label>
                                    <input name="price" type="number"
                                           onChange={handleChange("price")}
                                           onBlur={handleBlur("price")}
                                    />
                                    <div>
                                        {touched.price && errors.price}
                                    </div>
                                </div>

                                <button type="submit">submit</button>
                            </form>

                        )
                }

            </Formik>

            <div>
                {state.response?(<h3>Product added</h3>):(<h3>{state.error}</h3>)}
            </div>

        </div>
    );

};

export default AddProduct;
