import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ensureAgenda, deleteContact, getAgenda, updateContact } from "../Services";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const ContactList = () => {

    const { store, dispatch } = useGlobalReducer();
    const slug = "Martin"
    useEffect(() => {
      const newAgenda = (async () => {
        await ensureAgenda(dispatch, slug); 
        await getAgenda(dispatch, slug);
        });
      newAgenda();
    });
    
    return(
        <div className="container">
            <div className="d-flex justify-content-end mb-3">
                <Link to="/AddContact">
                    <button className="btn btn-success">Add Contact</button>
                </Link>
            </div>
            <div>
                <ul className="list-group border">
                   {(store.contacts ?? []).filter(Boolean).map((c) => (
                    <li key={c.id} className="row list-group-item d-flex" >
                        <div className="col-3 p-2 rounded">
                          <img src="data:image/png;base64,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" 
                          alt="" className="rounded-circle img-fluid"/>
                        </div>
                        <div className="col-6 p-2">
                          <h5 className="mb-2">{c.name}</h5>
                          <p>{c.email}</p>
                          <p>{c.phone}</p>
                          <p>{c.address}</p>
                        </div>
                        <div className="col-3 p-2 text-center">
                            <button className="btn btn-danger m-3" 
                              onClick={async () => {
                                alert("Estas seguro de borrar el contacto?")
                                
                                await deleteContact(dispatch, slug, c.id);
                                }}>
                            <i class="bi bi-trash"></i>
                            </button>

                            <button className="btn btn-warning m-3" 
                            onClick={async () => {
                              const edited = {
                                name: prompt("Name", c.name) ?? c.name,
                                phone: prompt("Phone", c.phone) ?? c.phone,
                                email: prompt("Email", c.email) ?? c.email,
                                address: prompt("Address", c.address) ?? c.address
                              }
                              await updateContact(dispatch, slug,  c.id, edited)
                            }}>
                            <i class="bi bi-pencil"></i>
                            </button>
                        </div>
                    </li>
                  ))}
                </ul>
            </div>
            <br />
        
            <Link to="/">
              <button className="btn btn-primary">Back home</button>
            </Link>
        </div>
        );
      };