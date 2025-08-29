import React from "react";


export const initialStore= {
      slug: null,
      contacts: []
    };

export default function storeReducer(store, action = {}) {
  switch(action.type){
      case 'get_agenda': {
        const {slug, id, contacts} = action.payload;
        return {...store, slug, id, contacts: (contacts ?? []).filter(Boolean)};
      };
      case 'create_agenda': {
        const {id, slug} = action.payload;
        return {...store, slug, id, contacts: []};
      };
      case 'add_contact': {
        const contact = action.payload
        return {...store, contacts: [ ...(store.contacts ?? []), contact ]};
      };
      case 'delete_contact': {
        const {id} = action.payload;
        return {...store, contacts: store.contacts.filter(c => c.id !== id)};
      };
      case 'update_contact': {
        const {id, ...rest } = action.payload;
        return {...store, contacts: store.contacts.map(c => c.id === id ? {...c, ...rest } : c)};
      }
      default:
        return store;
    };

}
