import React from "react";
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { addContact } from "../Services";
import { Link } from "react-router-dom";

export const AddContact = () => {

  const { dispatch } = useGlobalReducer()
  const [form, setForm] = useState ({name: "", phone:"", email:"", address:""})
  
  const handleChange = (e) => {
    const {id, value} = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const slug = "Martin"
    try {
      const created = await addContact(dispatch, slug, form);
      dispatch({type: 'add_contact', payload: created})
      setForm({name: "", phone:"", email:"", address:""})
    } catch (error) {
        console.error("Error creando contacto")
    }
    
  }
  return (
    <div className="container text-center">
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit}>
            <div className="mb-3 d-flex flex-column text-start">
                <label htmlFor="name" className="form-label">Name</label>
                <input 
                    id="name" 
                    value={form.name} 
                    type="text" 
                    className="form-control" 
                    onChange={handleChange} 
                    placeholder="Name"></input>
            </div>
            <div className="mb-3 d-flex flex-column text-start">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input 
                    id="phone" 
                    value={form.phone} 
                    type="tel" 
                    className="form-control" 
                    onChange={handleChange} 
                    placeholder="Phone"></input>
            </div>
            <div className="mb-3 d-flex flex-column text-start">
                <label htmlFor="email" className="form-label">Email</label>
                <input 
                id="email" 
                value={form.email} 
                type="email" 
                className="form-control" 
                onChange={handleChange} 
                placeholder="Email"></input>
            </div>
            <div className="mb-3 d-flex flex-column text-start">
                <label htmlFor="address" className="form-label">Address</label>
                <input 
                id="address" 
                value={form.address} 
                type="text" 
                className="form-control" 
                onChange={handleChange} 
                placeholder="Address"></input>
            </div>
            <button type="submit" className="mb-3 btn btn-success container">Save</button>
        </form>
      
      <Link to="/Contacts">
        <span className="btn btn-primary btn-lg" href="#" role="button">
          Back Contacts
        </span>
      </Link>
    </div>
  );
};
