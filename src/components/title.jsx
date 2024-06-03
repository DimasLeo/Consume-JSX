export default function Title({ nama, nis, bell, ray }) {
    return (
        <>
            
                <h1 className="text-white">Nama: {nama}</h1>
                <p className="text-white">Nis: {nis}</p>
                <p className="text-white">Rombel: {bell}</p>
                <p className="text-white">Rayon: {ray}</p>
        </>

    )
}