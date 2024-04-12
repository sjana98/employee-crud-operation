import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { MdModeEdit, MdDelete } from "react-icons/md";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { Modal } from 'react-bootstrap';

function EmpListing() {
    // Employee Listing start //
    const [empdata, setEmpdatachange] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3031/employee");
                const data = await response.json();
                setEmpdatachange(data);
            } catch (error) {
                console.log({ Result: error.message });
            }
        }
        fetchData();
    }, []);


    const removeEmp = (id) => {   // remove individual data
        const confirmed = window.confirm("Are you sure you want to delete this?");
        if (confirmed) {
            const removeEmpl = empdata.filter(emp => emp.id !== id);
            setEmpdatachange(removeEmpl);
        };
    };

    const allDelete = () => {    // remove all data
        const confirmed = window.confirm("Are you sure you want to delete all data?");
        if (confirmed) {
            setEmpdatachange([]);
        };
    };
    // Employee Listing end //


    // New Employee Add Modal start //
    const [ID, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const empData = { name, email, phone, address };

        try {
            const url = "http://localhost:3031/employee";
            const createPost = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(empData),
            };

            const fetchData = await fetch(url, createPost);
            if (fetchData) {
                alert("Employee has been added successfully!")
                window.location.reload();
            };
        } catch (error) {
            console.log({ Result: error.message });
        }
    };
    // New Employee Add Modal end //



    return (
        <div className='container'>
            {/* Employee Listing start */}
            <div className="card-title mt-4 mb-3 d-flex justify-content-start">
                <h5>Employee CRUD Operations:</h5>
            </div>
            <div className="card" style={{ backgroundColor: '#f5f5f5' }}>
                <div className="card-body">
                    <div className='d-flex justify-content-between align-items-center' style={{ height: '55px', backgroundColor: '#435d7d' }}>
                        <div className='text-white ms-4'>Manage Employees</div>
                        <div className='me-4'>
                            <Link onClick={allDelete} className='deleteEmpBtn'><FaMinusCircle className='minusIcon' /> Delete</Link>
                            <Link onClick={handleShowModal} className='addEmpBtn'><FaPlusCircle className='plusIcon' /> Add New Employees</Link>
                        </div>
                    </div>

                    <table className='table text-start '>
                        <thead>
                            <tr>
                                <th className='ps-5'>Name</th>
                                <th className='ps-5'>Email</th>
                                <th className='ps-5'>Address</th>
                                <th className='ps-5'>Phone</th>
                                <th className='ps-5'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='table_details'>
                            {empdata &&
                                empdata.map(item => (
                                    <tr key={item.id}>
                                        <td className='ps-5'>{item.name}</td>
                                        <td className='ps-5'>{item.email}</td>
                                        <td className='ps-5'>{item.address}</td>
                                        <td className='ps-5'>{item.phone}</td>
                                        <td className='ps-5'>
                                            <Link to={`/employee/edit/${item.id}`}><MdModeEdit style={{ color: '#ffc720', marginRight: "8px" }} /></Link>
                                            <Link onClick={() => removeEmp(item.id)}><MdDelete style={{ color: '#f5564a' }} /></Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Employee Listing end */}

            {/* New Employee Add Modal start*/}
            <Modal show={showModal} onHide={handleCloseModal} dialogClassName="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Add Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <form onSubmit={handleSubmit} className="container mt-3">
                            <div style={{ "textAlign": "left" }}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label className="hiddenInUi">ID</label>
                                            <input value={ID} disabled="disabled" className="form-control hiddenInUi"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 mt-2">
                                        <div className="form-group">
                                            <label>Name:</label>
                                            <input value={name} required onChange={e => setName(e.target.value)} className='form-control'></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 mt-2">
                                        <div className="form-group">
                                            <label>Email:</label>
                                            <input value={email} required onChange={e => setEmail(e.target.value)} className='form-control'></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 mt-2">
                                        <div className="form-group">
                                            <label>Address:</label>
                                            <textarea value={address} required onChange={e => setAddress(e.target.value)} className='form-control'></textarea>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 mt-2">
                                        <div className="form-group">
                                            <label>Phone:</label>
                                            <input value={phone} required onChange={e => setPhone(e.target.value)} className='form-control'></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer className="custom-footer">
                    <Link onClick={handleCloseModal} className="btn_back">Cancel</Link>
                    <button onClick={handleSubmit} className="btn_save" type="submit">Add</button>
                </Modal.Footer>
            </Modal>
            {/* New Employee Add Modal end*/}

        </div>
    )
}

export default EmpListing