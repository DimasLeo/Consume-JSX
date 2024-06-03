import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Case from "../../components/Case";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";

const DeleteModal = ({ isOpen, onClose, onConfirm, itemName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="relative bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg z-10 p-6">
                <div className="flex items-center justify-center mb-4">
                    <FontAwesomeIcon icon={faExclamationCircle} className="text-4xl text-yellow-400" />
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

const Popup = ({ message, onClose, isError }) => {
    const bgColor = isError ? "bg-red-500" : "bg-green-500";
    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div className={`${bgColor} text-white p-4 rounded-lg shadow-lg`}>
                <div className="flex items-center justify-between">
                    <span>{message}</span>
                    <button onClick={onClose} className="ml-4">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function StuffStock() {
    const [stuffs, setStuffs] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentItemToDelete, setCurrentItemToDelete] = useState(null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    const navigate = useNavigate();

    const instance = axios.create({
        baseURL: 'http://localhost:9999/',
        headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    });

    useEffect(() => {
        instance.get('StuffStock')
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

    const deleteStuffStock = () => {
        instance.delete(`StuffStock/${currentItemToDelete.id}`)
        .then(res => {
            setStuffs(stuffs.filter(stuff => stuff.id !== currentItemToDelete.id));
            setIsDeleteModalOpen(false);
            setCurrentItemToDelete(null);
            setShowSuccessPopup(true);
            setSuccessMessage('Data berhasil dihapus');
            setTimeout(() => {
                setShowSuccessPopup(false);
                setSuccessMessage('');
            }, 1000);
        })
        .catch(err => {
            setIsDeleteModalOpen(false);
            setShowErrorPopup(true);
            setTimeout(() => {
                setShowErrorPopup(false);
            }, 2000);
        });
    };

    return (
        <Case>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-20 py-10">
                <div className="items-center m-5 pb-10 pt-10">
                    <div className="flex justify-between">
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">StuffStock</h5>
                        <Link to='create' className="px-4 py-1 bg-teal-700 rounded-lg mr-2 font-bold text-white flex items-center">
                            Tambah
                            <FontAwesomeIcon icon={faPlus} className="pl-1 w-4 h-4 text-white" />
                        </Link> 
                    </div>
                    {showSuccessPopup && <Popup message={successMessage} onClose={() => setShowSuccessPopup(false)} />}
                    {showErrorPopup && <Popup message="Gagal menghapus data atau data sudah ada di data lending!" onClose={() => setShowErrorPopup(false)} isError />}
                    <div className="flex mt-4 md:mt-6">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="border-b font-medium dark:border-neutral-500 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-4">No</th>
                                    <th scope="col" className="px-6 py-4">Stuff_id</th>
                                    <th scope="col" className="px-6 py-4">Total A</th>
                                    <th scope="col" className="px-6 py-4">Total D</th>
                                    <th scope="col" className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stuffs.map((StuffStock, id) => (
                                    <tr key={StuffStock.id} className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4">{id + 1}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{StuffStock.stuff_id}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{StuffStock.total_available}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{StuffStock.total_defec}</td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <button type="button" onClick={() => handleDeleteClick(StuffStock)} className="px-4 py-2 bg-red-500 rounded-lg mr-2 font-bold text-black">Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <DeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={deleteStuffStock} itemName={currentItemToDelete ? currentItemToDelete.name : ''} />
        </Case>
    );
}
