export default function Card({ ming, pela }) {
    return (
        <>
        <div className="bg-gray-800 border-t border-gray-600 shadow rounded-lg w-3/4 p-10 mt-20 ">
                <h1 className="text-white">Minggu: {ming}</h1>
                <p className="text-white">Pelajaran: {pela}</p>

                </div>
        </>
    )
}