import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function EmpEdit() {
    
    const [id, empId] = useState("");
    const [name, nameEdit] = useState("");
    const [email, emailEdit] = useState("");
    const [address, addressEdit] = useState("");
    const [phone, phoneEdit] = useState("");

    const { empid } = useParams();
    const navigate = useNavigate();

    // initial fetch data    
    useEffect(() => {
        const fetchExistingData = async () => {
            try {
                const response = await fetch(`http://localhost:3031/employee/${empid}`);
                const data = await response.json();
                empId(data.id);
                nameEdit(data.name);
                emailEdit(data.email);
                addressEdit(data.address);
                phoneEdit(data.phone);
            } catch (error) {
                console.log({ Result: error.message });
            }
        }
        fetchExistingData();
    }, [empid]);

    // initial fetch data edit   
    const handleSubmit = async (e) => {
        e.preventDefault();
        const empData = { id, name, email, address, phone };

        try {
            const url = (`http://localhost:3031/employee/${empid}`);
            const createPost = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(empData),
            };

            const fetchData = await fetch(url, createPost);
            if (fetchData) {
                alert("Edit successfully!")
                navigate("/");
            };
        } catch (error) {
            console.log({ Result: error.message });
        }
    };


    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-4 mx-auto">
                    <form onSubmit={handleSubmit} className="container mt-3">
                        <div className="card" style={{ "textAlign": "left" }}>
                            <div className="card-title heading">
                                <h5>Edit Employee</h5>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label className="hiddenInUi">ID</label>
                                            <input value={id} disabled="disabled" className="form-control hiddenInUi"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 mt-2">
                                        <div className="form-group">
                                            <label>Name:</label>
                                            <input value={name} required onChange={e => nameEdit(e.target.value)} className='form-control'></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 mt-2">
                                        <div className="form-group">
                                            <label>Email:</label>
                                            <input value={email} required onChange={e => emailEdit(e.target.value)} className='form-control'></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 mt-2">
                                        <div className="form-group">
                                            <label>Address:</label>
                                            <textarea value={address} required onChange={e => addressEdit(e.target.value)} className='form-control'></textarea>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 mt-2">
                                        <div className="form-group">
                                            <label>Phone:</label>
                                            <input value={phone} required onChange={e => phoneEdit(e.target.value)} className='form-control'></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 mt-3 btn_container">
                                <div className="form-group">
                                    <Link to="/" className="btn_back">Cancel</Link>
                                    <button className="btn_save" type="submit">Add</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EmpEdit