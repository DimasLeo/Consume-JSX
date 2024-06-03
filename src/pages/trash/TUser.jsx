import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Case from "../../components/Case";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserTrash() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState([]);

    const instance = axios.create({
        baseURL: 'http://localhost:9999/',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    });

    useEffect(() => {
        instance.get('/user/trash', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        .then(res => {
            setUsers(res.data.data);
        })
        .catch(err => {
            if (err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        });
    }, [navigate]);

    const deleteUser = (id) => {
        instance.delete(`/user/permanentDel/${id}`)
        .then(res => {
            setUsers(users.filter(user => user.id !== id));
            toast.success('Data berhasil dihapus');
        })
        .catch(err => {
            setError(err.response.data);
            toast.error('Data gagal dihapus');
        });
    };

    const deleteAllUser = () => {
        instance.delete(`/user/permanent`)
        .then(res => {
            location.reload();
            toast.success('Semua data berhasil dihapus');
        })
        .catch(err => {
            setError(err.response.data);
            toast.error('Semua data gagal dihapus');
        });
    };

    const restoreUser = (id) => {
        instance.put(`/user/restore/${id}`)
        .then(res => {
            setUsers(users.filter(user => user.id !== id));
            toast.success('Data berhasil dikembalikan');
        })
        .catch(err => {
            setError(err.response.data);
            toast.error('Data gagal dikembalikan');
        });
    };

    const restoreAllUser = () => {
        instance.put(`/user/restore`)
        .then(res => {
            location.reload();
            toast.success('Semua data berhasil dikembalikan');
        })
        .catch(err => {
            setError(err.response.data);
            toast.error('Semua data gagal dikembalikan');
        });
    };

    return (
        <Case>
            <div className="block m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="items-center m-5 pb-10 pt-10">
                    <div className="flex justify-between">
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">User Trash</h5>
                        <div className="flex space-x-2">
                            <button type="button" onClick={() => restoreAllUser()} className="px-4 py-2 bg-orange-500 rounded-lg font-bold text-white">Restore All</button>
                            <button type="button" onClick={() => deleteAllUser()} className="px-4 py-2 bg-red-500 rounded-lg font-bold text-white">Delete All</button>
                            <button type="button" onClick={() => navigate('/user')} className="px-4 py-2 bg-blue-500 rounded-lg font-bold text-white">Kembali</button>
                        </div>
                    </div>
                    {Object.keys(error).length > 0 && (
                        <div role="alert">
                            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                Gagal!
                            </div>
                            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                <ul>
                                    {error.message}
                                </ul>
                            </div>
                        </div>
                    )}
                    <div className="flex mt-4 md:mt-6">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-4">No</th>
                                    <th scope="col" className="px-6 py-4">Username</th>
                                    <th scope="col" className="px-6 py-4">Email</th>
                                    <th scope="col" className="px-6 py-4">Role</th>
                                    <th scope="col" className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, id) => (
                                    <tr key={user.id} className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4 text-white">{id + 1}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-white">{user.username}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-white">{user.email}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-white">{user.role}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-white">
                                            <button type="button" onClick={() => restoreUser(user.id)} className="px-4 py-2 bg-orange-500 rounded-lg mr-2 font-bold text-white">Restore</button>
                                            <button type="button" onClick={() => deleteUser(user.id)} className="px-4 py-2 bg-red-500 rounded-lg mr-2 font-bold text-white">Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </Case>
    );
}
