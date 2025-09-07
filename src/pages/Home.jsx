import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ContactList } from "./Contacts.jsx";


export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (
		<div className="text-center mt-5">
			<h1 className="mb-3">Welcome to the contact list of Martin</h1>
			<ContactList/>
		</div>
	);
}; 