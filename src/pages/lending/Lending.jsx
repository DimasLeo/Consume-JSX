import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Case from "../../components/Case";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteModal = ({ isOpen, onClose, onConfirm, itemName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="relative bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg z-10 p-6">
                <div className="flex items-center justify-center mb-4">
                    <FontAwesomeIcon icon="fa-solid fa-exclamation-circle" className="text-4xl text-yellow-400" />
                </div>
                <div className="text-center mb-4">
                    <p>Are you sure you want to delete <strong>{itemName}</strong>?</p>
                </div>
                <div className="flex justify-center space-x-4">
                    <button onClick={onConfirm} className="px-4 py-2 bg-red-600 rounded text-white">Yes, I'm sure</button>
                    <button onClick={onClose} className="px-4 py-2 bg-gray-600 rounded text-white">No, cancel</button>
                </div>
            </div>
        </div>
    );
};

export default function Lending() {
    const [lendings, setLendings] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentItemToDelete, setCurrentItemToDelete] = useState(null);
    const [isLogin, setIsLogin] = useState(false);
    const [authUser, setAuthUser] = useState([]);
    const [error, setError] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    const instance = axios.create({
        baseURL: 'http://localhost:9999/',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    });

    useEffect(() => {
        const fetchLendings = async () => {
            try {
                const lendingsResponse = await instance.get('lendings');
                setLendings(lendingsResponse.data.data);
                setIsLogin(true);
                setAuthUser(lendingsResponse.data.data);
                if (location.pathname === '/login') {
                    navigate('/profile');
                }
            } catch (err) {
                if (err.response.status === 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
                }
                setIsLogin(false);
                if (err.response.status === 401 && location.pathname !== '/login') {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login!!!'));
                }
            }
        };

        const fetchProfile = async () => {
            try {
                const profileResponse = await instance.get('profile');
                setIsLogin(true);
                setAuthUser(profileResponse.data.data);
                if (location.pathname === '/login') {
                    navigate('/profile');
                }
            } catch (err) {
                if (err.response.status === 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
                }
                setIsLogin(false);
                if (err.response.status === 401 && location.pathname !== '/login') {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login!!!'));
                }
            }
        };

        fetchLendings();
        fetchProfile();
    }, [navigate, location.pathname]);

    const handleDeleteClick = (item) => {
        setCurrentItemToDelete(item);
        setIsDeleteModalOpen(true);
    };

    const deleteLending = () => {
        instance.delete(`lendings/${currentItemToDelete.id}`)
            .then(res => {
                setLendings(lendings.filter(lending => lending.id !== currentItemToDelete.id));
                setIsDeleteModalOpen(false);
                setCurrentItemToDelete(null);
                toast.success('Data berhasil dihapus');
            })
            .catch(err => {
                setIsDeleteModalOpen(false);
                toast.error('Gagal menghapus data lending!');
            });
    };

    return (
        <Case>
            <div className="block m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="items-center m-5 pb-10 pt-10">
                    {isLogin ? (
                        authUser['role'] === 'admin' ? (
                            <>
                            </>
                        ) : (
                            <div className="flex justify-between">
                                <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">Lending</h5>
                                <Link to='create'className="px-4 py-1 bg-teal-700 rounded-lg mr-2 font-bold text-white flex items-center">
                                    Tambah
                                    <FontAwesomeIcon icon="fa-solid fa-plus" className="pl-1 w-4 h-4 text-inherit" />
                                </Link>
                            </div>
                        )
                    ) : ''}
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
                                    <th scope="col" className="px-6 py-4">User</th>
                                    <th scope="col" className="px-6 py-4">Stuff-id</th>
                                    <th scope="col" className="px-6 py-4">User-id</th>
                                    <th scope="col" className="px-6 py-4">Date</th>
                                    <th scope="col" className="px-6 py-4">Total</th>
                                    <th scope="col" className="px-6 py-4">Note</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lendings.map((lending, id) => (
                                    <tr key={lending.id} className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4  text-white">{id + 1}</td>
                                        <td className="whitespace-nowrap px-6 py-4  text-white">{lending.name}</td>
                                        <td className="whitespace-nowrap px-6 py-4  text-white">{lending.stuff ? lending.stuff.name : ''}</td>
                                        <td className="whitespace-nowrap px-6 py-4  text-white">{lending.user_id}</td>
                                        <td className="whitespace-nowrap px-6 py-4  text-white">{lending.date_time}</td>
                                        <td className="whitespace-nowrap px-6 py-4  text-white">{lending.total_stuff}</td>
                                        <td className="whitespace-nowrap px-6 py-4  text-white">{lending.notes}</td>
                                     
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <DeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={deleteLending} itemName={currentItemToDelete ? currentItemToDelete.name : ''} />
            <ToastContainer />
        </Case>
    );
}
