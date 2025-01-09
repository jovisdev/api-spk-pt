import { query } from "../database/config.js";

// Controller untuk menambahkan data penilaian
// export const addPenilaian = async (req, res) => {
//     try {
//         const penilaians = req.body;  // Karena data yang dikirim adalah array
//         if (!Array.isArray(penilaians) || penilaians.length === 0) {
//             return res.status(400).json({ message: 'Data penilaian tidak boleh kosong.' });
//         }

//         // Iterasi untuk setiap data penilaian yang dikirim
//         for (const { alternatif_id, kriteria_id, nilai } of penilaians) {
//             console.log(req.body);

//             // Validasi input
//             if (!alternatif_id || kriteria_id == null || nilai == null) {
//                 return res.status(400).json({ message: 'Semua data harus diisi.' });
//             }

//             // Validasi apakah kriteria_id ada di tabel Kriteria
//             const [kriteria] = await query('SELECT id, kriteria FROM kriteria WHERE id = ?', [kriteria_id]);
//             if (!kriteria) {
//                 return res.status(404).json({ message: `Kriteria dengan ID ${kriteria_id} tidak ditemukan.` });
//             }

//             // Validasi apakah alternatif_id ada di tabel Alternatif
//             const [alternatif] = await query('SELECT id, nama FROM alternatif WHERE id = ?', [alternatif_id]);
//             if (!alternatif) {
//                 return res.status(404).json({ message: `Alternatif dengan ID ${alternatif_id} tidak ditemukan.` });
//             }

//             // Query untuk menambahkan data penilaian
//             const insertPenilaianQuery = `
//                 INSERT INTO penilaian (alternatif_id, kriteria_id, nilai)
//                 VALUES (?, ?, ?)
//             `;
//             await query(insertPenilaianQuery, [alternatif_id, kriteria_id, nilai]);
//         }

//         res.status(201).json({
//             message: 'Semua data penilaian berhasil ditambahkan.',
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ message: 'Terjadi kesalahan pada server.', error: error.message });
//     }
// };

export const upsertPenilaian = async (req, res) => {
    try {
        const penilaians = req.body;
        if (!Array.isArray(penilaians) || penilaians.length === 0) {
            return res.status(400).json({ message: 'Data penilaian tidak boleh kosong.' });
        }

        for (const { alternatif_id, kriteria_id, nilai } of penilaians) {
            console.log(alternatif_id, kriteria_id, nilai);

            // Validasi input
            if (!alternatif_id || kriteria_id == null || nilai == null) {
                return res.status(400).json({ message: 'Semua data harus diisi.' });
            }

            // Validasi apakah kriteria_id ada di tabel Kriteria
            const [kriteria] = await query('SELECT id, kriteria FROM kriteria WHERE id = ?', [kriteria_id]);
            if (!kriteria) {
                return res.status(404).json({ message: `Kriteria dengan ID ${kriteria_id} tidak ditemukan.` });
            }

            // Validasi apakah alternatif_id ada di tabel Alternatif
            const [alternatif] = await query('SELECT id, nama FROM alternatif WHERE id = ?', [alternatif_id]);
            if (!alternatif) {
                return res.status(404).json({ message: `Alternatif dengan ID ${alternatif_id} tidak ditemukan.` });
            }

            // Mengecek apakah penilaian sudah ada untuk alternatif_id dan kriteria_id
            const [existingPenilaian] = await query('SELECT id FROM penilaian WHERE alternatif_id = ? AND kriteria_id = ?', [alternatif_id, kriteria_id]);

            if (existingPenilaian) {
                // Jika penilaian sudah ada, lakukan UPDATE
                const updateQuery = 'UPDATE penilaian SET nilai = ? WHERE id = ?';
                await query(updateQuery, [nilai, existingPenilaian.id]);
            } else {
                // Jika penilaian belum ada, lakukan INSERT
                const insertQuery = 'INSERT INTO penilaian (alternatif_id, kriteria_id, nilai) VALUES (?, ?, ?)';
                await query(insertQuery, [alternatif_id, kriteria_id, nilai]);
            }
        }

        res.status(200).json({
            message: 'Data penilaian berhasil diproses (ditambahkan atau diperbarui).',
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server.', error: error.message });
    }
};


export const deletePenilaian = async (req, res) => {
    // Query untuk menghapus data penilaian
    const deletePenilaianQuery = `
        DELETE FROM penilaian
    `;

    try {
        // Eksekusi query
        const result = await query(deletePenilaianQuery);
        res.status(200).json({ message: 'Data penilaian berhasil dihapus.', result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
}

export const konversiPenilaian = async (req,res) => {
    
    // query tampilkan data
    const selectPenilaian = 'SELECT * FROM penilaian'

    try{
        const result = await query(selectPenilaian)
        res.status(200).json(result)
    }catch(error){
        res.status(500).json({message: 'Terjadi kesalahan pada server.'})
    }
}

export const dataAwalPenilaian = async (req,res) => {
    
    // query tampilkan data
    const selectPenilaian = "SELECT p.id, p.alternatif_id, p.kriteria_id, CASE WHEN k.tipe = 'Kualitatif' THEN (SELECT s.subkriteria FROM subkriteria s WHERE s.kriteria_id = p.kriteria_id AND p.nilai = s.bobot) ELSE CAST(p.nilai AS CHAR) END AS nilai FROM penilaian p INNER JOIN kriteria k ON p.kriteria_id = k.id"

    try{
        const result = await query(selectPenilaian)
        res.status(200).json(result)
    }catch(error){
        res.status(500).json({message: 'Terjadi kesalahan pada server.'})
    }
}
