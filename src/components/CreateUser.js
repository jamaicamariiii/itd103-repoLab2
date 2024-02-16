import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateUser(){

    const [name, setName] = useState("")
    const [position, setPosition] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [birthday, setBirthday] = useState("")
    const [age, setAge] = useState("")


    const navigate = useNavigate()

    const addUserToDatabase = async () => {
        try {
          const response = await axios.post("https://jsonplaceholder.typicode.com/users", {
            name,
            position,
            email,
            address: 
            birthday,
            age,
          });
    
          console.log("User added to the database:", response.data);
          navigate("/");
        } catch (error) {
          console.error("Error adding user to the database:", error);
        }
      };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        addUserToDatabase();
        axios.post('http://localhost:3001/create', { name, position, email, address, birthday, age })
            .then(res => {
                console.log(res);
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
             <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h2>Add User</h2>
                    <div className="mb-2">
                        <label htmlFor= "">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor= "">Position</label>
                        <input
                            type="text"
                            placeholder="Enter Position"
                            className="form-control"
                            onChange={(e) => setPosition(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor= "">Email</label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor= "">Address</label>
                        <input
                            type="text"
                            placeholder="Enter Address"
                            className="form-control"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor= "">Birthday</label>
                        <input
                            type="date"
                            placeholder="Enter Birthday"
                            className="form-control"
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor= "">Age</label>
                        <input
                            type="text"
                            placeholder="Enter Age"
                            className="form-control"
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>


                    <button className="btn btn-success">Submit</button>
                </form>
             </div>
        </div>
    )
}

export default CreateUser;