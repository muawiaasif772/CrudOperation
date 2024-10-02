import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';

const fetchata = async (userid) => {
  try {
    const response = await axios.get(`http://localhost:4000/users/${userid}`);
    console.log(userid)
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

const Read = () => {
  const { userid } = useParams();
  const navigate=useNavigate()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['user', userid],
    queryFn: () => fetchata(userid),
  });
console.log(data)
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="modal-content w-50 p-4 shadow-lg rounded">
        <h1 className="mb-4 text-center">User Details</h1>
         <strong>Name:</strong><p> {data.name}</p>
         <strong>Email: </strong> <p>{data.email}</p>
         <strong>phone:</strong><p>{data.phone}
         </p> 
        <div className="d-flex justify-content-start ">
          <button className="btn btn-secondary me-3" onClick={()=>navigate(-1)}>Back</button>
          <Link to={`/update/${userid}`} className="btn btn-primary">Edit</Link>
        </div>
      </div>
    </div>
  );
};

export default Read;
