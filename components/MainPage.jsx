import { deleteRecord, getRecords } from '@/utils/recordsFunction';
import React, { useEffect, useState } from 'react'
import Spinner from './Spinner';
import { useRouter } from 'next/router';

const MainPage = () => {
    
    const router=useRouter();
    const [ data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const fetchRecords = async () => {
        try {
        const response= await getRecords();
        setData(response);
        setIsLoading(false);
        } catch(error) {


        console.log(response);
        setIsLoading(false);
        }
    }

    const handleDeletRecords = async(id) => 
        {
            try {
                const response = await deleteRecord(id);
                
                if (response?.acknowledged) {
                    const newData = data.filter(el => el._id !== id);
                    setData(newData);

                }
            } catch(error) {
                console.log(error);
            }
        };

        const handleEditRecords = (id) => {
            router.push('/edit?id=${id}');
        }

    useEffect(() => {
        fetchRecords();
    }, []);


    if (isLoading) {
        return <Spinner/>;
    }

    return (

<div className="p-4 flex-wrap flex gap-4">
        {data?.map(record => (
            <div key={record._id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{record.name}</h5>

    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> {record.description}</p>
    <button 
        type="button"
        onClick={() => handleEditRecords(record._id)}
         className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Update</button>
    <button 
    type="button"
    onClick={() => handleDeletRecords(record._id) }
     className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
        Delete</button>
        
</div>

        ))}

</div>
    )
}

export default MainPage
