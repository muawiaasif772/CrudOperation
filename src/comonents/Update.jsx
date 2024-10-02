import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";

const fetchata = async (userid) => {
  try {
    const response = await axios.get(`http://localhost:4000/users/${userid}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

const updateUser = async (userid, values) => {
  try {
    const response = await axios.put(`http://localhost:4000/users/${userid}`, values);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update data");
  }
};

const Update = () => {
  const { userid } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", userid],
    queryFn: () => fetchata(userid)
  });

  const { mutate } = useMutation({
    mutationFn: (values) => updateUser(userid, values),
    onSuccess: () => {
      navigate("/"); 
    },
  });

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!values.name) newErrors.name = "Name is required";
    if (!values.email) newErrors.email = "Email is required";
    if (!values.phone) newErrors.phone = "Phone number is required";
    
    return newErrors;
  };

  useEffect(() => {
    if (data) {
      setValues({
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    for(let key in formErrors){
        if(formErrors.hasOwnProperty(key)){
            setErrors(formErrors)
        }
        return
    }

    mutate(values);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="modal-content w-50 p-4 shadow-lg rounded">
        <h1 className="mb-4 text-center">Update User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              
              className={`form-control  ${errors.name ? "is-invalid" : ""}`}
              id="name"
              placeholder="Enter name"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
            {errors.name && (
              <p className="invalid-feedback">
                {errors.name}
              </p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              placeholder="Enter email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
            {errors.email && (
              <div className="text-danger">
                {errors.email}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              id="phone"
              placeholder="Enter phone number"
              value={values.phone}
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
            />
            {errors.phone && (
              <p className="text-danger">
                {errors.phone}
              </p>
            )}
          </div>
          <div className="d-flex justify-content-start">
            <button type="submit" className="btn btn-primary me-3">
              Update
            </button>
            <Link to="/" className="btn btn-secondary">
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
