import React from "react";
import axios from "axios";
import { useMutation, useQuery,  } from "@tanstack/react-query";
import { Link } from "react-router-dom";
const FetchUsers = async () => {
  try {
    const res = await axios.get("http://localhost:4000/users");
    return res.data;
  } catch (error) {
    throw new Error("fail to fetch", error);
  }
};
const deleteUsers = async (userid) => {
  const confirm = window.confirm("would you like to Delete");
  if (confirm) {
    axios.delete(`http://localhost:4000/users/${userid}`);
  }
};

const Home = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKeyL: ["users"],
    queryFn: FetchUsers,
  });
  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id) => deleteUsers(id),
    
  });
  console.log(data);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }
  return (
    <div>
      <div class="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
        <h1 class="mb-4">List Of Users</h1>

        <div class="w-75 bg-white border p-4 rounded shadow">
          <div class="d-flex justify-content-end mb-3">
            <Link to={"/creat"} class="btn btn-success">
              Add+
            </Link>
          </div>
          <table class="table table-bordered table-hover">
            <thead>
              <tr class="bg-secondary text-white text-center">
                <th class="p-3">ID</th>
                <th class="p-3">Name</th>
                <th class="p-3">Email</th>
                <th class="p-3">Phone</th>
                <th class="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((el) => (
                <tr class="text-center" key={el.id}>
                  <td class="p-3">{el.id}</td>
                  <td class="p-3 text-capitalize">{el.name}</td>
                  <td class="p-3">{el.email}</td>
                  <td class="p-3">{el.phone}</td>
                  <td class="p-3">
                    <Link
                      to={`/read/${el.id}`}
                      class="btn btn-sm btn-primary me-2"
                    >
                      Read
                    </Link>
                    <Link
                      to={`/update/${el.id}`}
                      class="btn btn-sm btn-info me-2"
                    >
                      Edit
                    </Link>
                    <button
                      class="btn btn-sm btn-danger"
                      onClick={() => deleteMutate(el.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
