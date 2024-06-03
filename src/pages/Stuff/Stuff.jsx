import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

export default function Stuff() {
    const [stuffs, setStuffs] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentItemToDelete, setCurrentItemToDelete] = useState(null);

    const navigate = useNavigate();

    const instance = axios.create({
        baseURL: 'http://localhost:9999/',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    });

    useEffect(() => {
        instance.get('stuff', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        .then(res => {
            setStuffs(res.data.data);
        })
        .catch(err => {
            if (err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        });
    }, [navigate]);

    const handleDeleteClick = (item) => {
        setCurrentItemToDelete(item);
        setIsDeleteModalOpen(true);
    };

    const deleteStuff = () => {
        instance.delete(`stuff/${currentItemToDelete.id}`)
        .then(res => {
            setStuffs(stuffs.filter(stuff => stuff.id !== currentItemToDelete.id));
            setIsDeleteModalOpen(false);
            setCurrentItemToDelete(null);
            toast.success('Data berhasil dihapus');
        })
        .catch(err => {
            setIsDeleteModalOpen(false);
            toast.error('Gagal menghapus data atau data sudah ada di data lending!');
        });
    };

    return (
        <Case>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-20 py-10">
                <div className="items-center m-5 pb-10 pt-10">
                <div className="flex justify-between">
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">Stuff</h5>
                        <div className="flex space-x-2">
                            <Link to='create' className="px-4 py-1 bg-teal-700 rounded-lg mr-2 font-bold text-white flex items-center">
                                Tambah
                                <FontAwesomeIcon icon="fa-solid fa-plus" className="pl-1 w-4 h-4 text-white" />
                            </Link>
                            <Link to='trash' className="px-4 py-1 bg-yellow-500 rounded-lg font-bold text-black flex items-center">
                                Trash
                                <FontAwesomeIcon icon="fa-solid fa-trash" className="pl-1 w-4 h-4 text-black" />
                            </Link>
                        </div>
                    </div>
                    <div className="flex mt-4 md:mt-6">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="border-b font-medium dark:border-neutral-500 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-4">No</th>
                                    <th scope="col" className="px-6 py-4">Name</th>
                                    <th scope="col" className="px-6 py-4">Category</th>
                                    <th scope="col" className="px-6 py-4">Stock</th>
                                    <th scope="col" className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stuffs.map((stuff, id) => (
                                    <tr key={stuff.id} className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4">{id + 1}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{stuff.name}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{stuff.category}</td>
                                        {stuff.stock ? (
                                            <td className="whitespace-nowrap px-6 py-4">
                                                Total Available: {stuff.stock.total_available} <br />
                                                Total Defect: {stuff.stock.total_defect} <br />
                                            </td>
                                        ) : (
                                            <td className="whitespace-nowrap px-6 py-4">
                                                Stock Belum Ditambahkan
                                            </td>
                                        )}
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <Link to={'/inbound/edit' + stuff.id} className="px-4 py-2 bg-orange-500 rounded-lg mr-2 font-bold text-black">Edit</Link>
                                            <button type="button" onClick={() => handleDeleteClick(stuff)} className="px-4 py-2 bg-red-500 rounded-lg mr-2 font-bold text-black">Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <DeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={deleteStuff} itemName={currentItemToDelete ? currentItemToDelete.name : ''} />
            <ToastContainer />
        </Case>
    );
}
