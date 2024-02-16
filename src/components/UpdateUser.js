import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UpdateUser(){

    const { id } = useParams();

    const [name, setName] = useState()
    const [position, setPosition] = useState()
    const [email, setEmail] = useState()
    const [address, setAddress] = useState()
    const [birthday, setBirthday] = useState()
    const [age, setAge] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/get/" + id);
                console.log(response);
                setName(response.data.name);
                setPosition(response.data.position);
                setEmail(response.data.email);
                setAddress(response.data.address);
                setBirthday(response.data.birthday);
                setAge(response.data.age);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []); // empty dependency array to run the effect only once
    
    const navigate = useNavigate()

    const handleUpdate = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3001/update/' + id, { name, position, email, address, birthday, age })
            .then(res => {
                console.log(res);
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
            <form onSubmit={handleUpdate}>
                    <h2>Update User</h2>
                    <div className="mb-2">
                        <label htmlFor= "">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor= "">Position</label>
                        <input
                            type="text"
                            placeholder="Enter Position"
                            className="form-control"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor= "">Email</label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor= "">Address</label>
                        <input
                            type="text"
                            placeholder="Enter Address"
                            className="form-control"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor= "">Birthday</label>
                        <input
                            type="date"
                            placeholder="Enter Birthday"
                            className="form-control"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor= "">Age</label>
                        <input
                            type="text"
                            placeholder="Enter Age"
                            className="form-control"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>


                    <button className="btn btn-success">Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateUser;