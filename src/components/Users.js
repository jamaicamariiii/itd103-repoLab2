import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Users() {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/')
      .then(res => {
        console.log(res);
        setData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/deleteuser/' + id)
      .then(res => {
        console.log(res);
        // Update the state after successful deletion
        setData(data.filter(user => user._id !== id));
      })
      .catch(err => console.log(err));
  }

  const handleSearch = () => {
    // You can perform additional actions here if needed
    // For now, it just prints the search term to the console
    console.log('Search term:', searchTerm);
  }

  const filteredData = data.filter(user => {
    // You can customize this condition based on your search requirements
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.birthday.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.age.toString().includes(searchTerm)
    );
  });

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-65 bg-white rounded p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Link to="/create" className="btn btn-success btn-sm">
            Add +
          </Link>
          <div className="d-flex">
            <input
              type="text"
              placeholder="Search"
              className="form-control me-2"
              style={{ width: '800px' }} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Email</th>
              <th>Address</th>
              <th>Birthday</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.position}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user.birthday}</td>
                  <td>{user.age}</td>
                  <td>
                    <Link to={`edit/${user._id}`} className="btn btn-sm btn-success me-2">
                      Update
                    </Link>
                    <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
