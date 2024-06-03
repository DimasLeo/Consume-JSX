import { useState } from "react";
import Case from "../../components/Case";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserCreate() {
    const [forms, setForms] = useState({
        username: '',
        email: '',
        password: '',
        role: '',
    });

    const [error, setError] = useState([]);

    const navigate = useNavigate();

    const instance = axios.create({
        baseURL: 'http://localhost:9999/',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        },
    });

    const handleCreateUser = (event) => {
        event.preventDefault();

        instance.post('/user/create', forms)
            .then(res => {
                navigate('/user');
            })
            .catch(err => {
                setError(err.response.data.data);
                console.log(err.response);
            });
    };

    return (
        <Case>
            <div className="block m-auto h-screen bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="items-center m-5 pb-10 pt-10">
                    {error.length > 0 && (
                        <div role="alert">
                            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                Gagal!
                            </div>
                            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                <ul>
                                    {error.map((errMsg, index) => (
                                        <li key={index}>{errMsg}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                    <div className="flex justify-center">
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">User</h5>
                    </div>
                    <form onSubmit={handleCreateUser} className="max-w-sm mx-auto">
                        <div className="mb-5">
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">UserName</label>
                            <input type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ketik UserName Anda" required onChange={e => setForms({ ...forms, username: e.target.value })} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="kole@gmail.com" required onChange={e => setForms({ ...forms, email: e.target.value })} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" id="password" placeholder="*********" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={e => setForms({ ...forms, password: e.target.value })} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                            <select id="role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={e => setForms({ ...forms, role: e.target.value })}>
                                <option value="" selected disabled>Pilih Role</option>
                                <option value="admin">Admin</option>
                                <option value="staff">Staff</option>
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </Case>
    );
}