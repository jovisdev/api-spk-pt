import { query } from "../database/config.js";

// Controller untuk menambahkan data penilaian
export const addPenilaian = async (req, res) => {
    try {
        const { alternatif_id, kriteria_id, nilai } = req.body;

        // Validasi input
        if (!alternatif_id || nilai == null) {
            return res.status(400).json({ message: 'Semua data harus diisi.' });
        }

        // Validasi apakah kriteria_id ada di tabel Kriteria
        const [kriteria] = await query('SELECT id, kriteria FROM kriteria WHERE id = ?', [kriteria_id]);
        if (kriteria.length === 0) {
            return res.status(404).json({ message: 'Kriteria dengan ID tersebut tidak ditemukan.' });
        }

        // Validasi apakah alternatif_id ada di tabel Alternatif
        const [alternatif] = await query('SELECT id, nama FROM alternatif WHERE id = ?', [alternatif_id]);
        if (alternatif.length === 0) {
            return res.status(404).json({ message: 'Alternatif dengan ID tersebut tidak ditemukan.' });
        }

        // Query untuk menambahkan data penilaian
        const insertPenilaianQuery = `
            INSERT INTO penilaian (alternatif_id, kriteria_id, nilai)
            VALUES (?, ?, ?)
        `;

        const nama = alternatif.nama
        const namaKriteria = kriteria.kriteria

        // Eksekusi query
        await query(insertPenilaianQuery, [alternatif_id, kriteria_id, nilai]);

        res.status(201).json({ message: 'Data penilaian berhasil ditambahkan.', nama, namaKriteria});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server.', error: error.message });
    }
};

export const dataPenilaian = async (req,res) => {
    
    // query tampilkan data
    const selectPenilaian = 'SELECT * FROM penilaian'

    try{
        const result = await query(selectPenilaian)
        res.status(200).json(result)
    }catch(error){
        res.status(500).json({message: 'Terjadi kesalahan pada server.'})
    }
}
