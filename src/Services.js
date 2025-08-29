

const URL_BASE = 'https://playground.4geeks.com/contact/agendas'


export const getAgenda = async (dispatch, slug) => {

    try {
        const responseData = await fetch(`${URL_BASE}/${slug}`)
        if(!responseData.ok) {
            throw new Error(`Error ${responseData.status}`)
        }
        const data = await responseData.json();
        
        dispatch({
            type: 'get_agenda',
            payload: data
        });
        
        return data;

    } catch (error) {
        console.log(`Error al cargar las agendas`, error);
    }
};

export const ensureAgenda  = async (dispatch, slug) => {
    try {
        const requestOptions = {
            method: "POST",
            headers: {Accept: "application/json"}
            };

        const responseData = await fetch(`${URL_BASE}/${slug}`);
        if (responseData.ok) return;
        
        if (responseData.status === 404) {
            const responseData = await fetch(`${URL_BASE}/${slug}`, requestOptions)
            const data = await responseData.json();

            dispatch({
            type: 'create_agenda',
            payload: data
            });
            return data;
        };
    } catch (error) {
        console.log('Hubo un error al agregar la agenda: ',error)
    };
};

export const addContact = async (dispatch, slug, body) => {

    try {
        const contact = {
            name: body.name,
            phone: body.phone,
            email: body.email,
            address: body.address
        }
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contact)
            };

            const responseData = await fetch(`${URL_BASE}/${slug}/contacts`, requestOptions)
            if(!responseData.ok) throw new Error(`${responseData.status}`);
            const data = await responseData.json();

            dispatch({
                type: 'add_contact',
                payload: data
            })

            return data, console.log(`El contacto ${body.name} se guardo con exito`)
    } catch (error) {
        console.log('Hubo un error al agregar el contacto: ',error)
    }
}

export const deleteContact = async (dispatch, slug, id) => {
    try {
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type":"application/json" }
        };
        const responseData = await fetch(`${URL_BASE}/${slug}/contacts/${id}`, requestOptions)
        if(!responseData.ok) throw new Error(`${responseData.status}`);
        
        dispatch({
            type: 'delete_contact',
            payload: {id}
        });
        return(true)

    } catch (error) {
        console.log('Hubo un error al borrar el contacto ',error)
        return false;
    }

}

export const updateContact = async (dispatch, slug, id, body) => {
    try {
        const dataToUpdate = {
            name: body.name,
            phone: body.phone,
            email: body.email,
            address: body.address
        }
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify(dataToUpdate)
        }
        const responseData = await fetch(`${URL_BASE}/${slug}/contacts/${id}`, requestOptions)
        if(!responseData.ok) throw new Error(`Error ${responseData.status}`);
        const data = await responseData.json();

        dispatch({
            type: "update_contact",
            payload: data
        })
        return data;

    } catch (error) {
        console.log('Hubo un error al editar el contacto ',error)
    }
}