import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Case from "../../components/Case";
import axios from "axios";

export default function InboundCreate() {
    const [dataStuff, setDataStuff] = useState([]);
    const [error, setError] = useState({});
    const [success, setSuccess] = useState(false);

    const [forms, setForms] = useState({
        stuff_id: '',
        total: '',
        date: '',
        proff_file: null
    });

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:9999/stuff', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setDataStuff(res.data.data);
        })
        .catch(err => {
            console.log(err);
            if (err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        });
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForms({ ...forms, [name]: value });
    };

    const handleFileChange = (event) => {
        const { name, files } = event.target;
        setForms({ ...forms, [name]: files[0] });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate form data
        if (!forms.stuff_id || !forms.total || !forms.date || !forms.proff_file) {
            setError({ message: 'All fields are required' });
            return;
        }

        const formData = new FormData();
        formData.append('stuff_id', forms.stuff_id);
        formData.append('total', forms.total);
        formData.append('date', forms.date);
        formData.append('proff_file', forms.proff_file);

        axios.post('http://localhost:9999/InboundStuff/create', formData, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(res => {
            setSuccess(true);
            setError({});
            console.log(res);
        })
        .catch(err => {
            if (err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            } else {
                setError(err.response.data);
                console.log(err);
            }
        });
    };

    return (
        <Case>
            <div className="py-8 px-4 mx-auto max-w-2x1 lg:py-16"></div>
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-white dark:text-white">Add a new Inbound Stuff Data</h2>
                {success && (
                    <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:text-green-400" role="alert">
                        <span className="font-medium">Success! <span> check inbound data in <b><Link to="/inbound">this pages</Link></b></span></span>
                    </div>
                )}
                {error.message && (
                    <div role="alert">
                        <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">Gagal</div>
                        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                            <ul>
                                <li>{error.message}</li>
                            </ul>
                        </div>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="date" className="block mb-2 text-sm font-medium text-white dark:text-white">Date</label>
                            <input type="date" name="date" id="date" className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleInputChange} />
                        </div>
                        <div>
                            <label htmlFor="stuff" className="block mb-2 text-sm font-medium text-white dark:text-white">Stuff</label>
                            <select id="stuff" name="stuff_id" className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleInputChange}>
                                <option hidden disabled selected>Select Stuff</option>
                                {dataStuff.map((stuff, index) => (
                                    <option key={index} value={stuff.id}>{stuff.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="total" className="block mb-2 text-sm font-medium text-white dark:text-white">Total Stuff</label>
                            <input type="number" name="total" id="total" className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleInputChange} />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="proff_file" className="block mb-2 text-sm font-medium text-white dark:text-white">Proff File</label>
                            <input type="file" name="proff_file" id="proff_file" className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleFileChange} />
                        </div>
                    </div>
                    <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Add Inbound
                    </button>
                </form>
            </div>
        </Case>
    );
}
