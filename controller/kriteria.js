import { query } from "../database/config.js"

// Controller untuk menambahkan data kriteria
export const addKriteria = async (req, res) => {
        const { kode, kriteriain, jenis, bobot, tipe } = req.body;

        // Validasi input
        if (!kode || !kriteriain || !jenis || !bobot || !tipe) {
            return res.status(400).json({ message: 'Semua data harus diisi.' });
        }

        // Query untuk menambahkan data ke tabel
        const insertKriteriaQuery = `
            INSERT INTO kriteria (kode, kriteria, jenis, bobot, tipe)
            VALUES (?, ?, ?, ?, ?)
        `;

    try {
        // Eksekusi query
        await query(insertKriteriaQuery,[kode, kriteriain, jenis, bobot, tipe]);
        res.status(201).json({ message: 'Data kriteria berhasil ditambahkan.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
};

// Controller untuk mengubah data kriteria
export const changeKriteria = async (req, res) => {
    const { kriteriaId } = req.params;  // ID dari tugas yang ingin di-update
    const {kode, kriteria, jenis, tipe, bobot } = req.body;

    // Query untuk menambahkan data ke tabel
    const updateKriteriaQuery = `
        UPDATE kriteria
        SET kode = ?, kriteria = ?, jenis = ?, tipe = ?, bobot = ?
        WHERE id = ?
    `;

    try {
        // Eksekusi query
        const result = await query(updateKriteriaQuery,[kode, kriteria, jenis, tipe, bobot, kriteriaId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Kriteria not found' });
        }
        res.status(201).json({ message: 'Data kriteria berhasil diubah.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
    };


// menampilkan seluruh data
export const dataKriteria = async (req,res) => {
    
    // query tampilkan data
    const selectKriteria = 'SELECT * FROM kriteria'

    try{
        const result = await query(selectKriteria)
        res.status(200).json(result)
    }catch(error){
        res.status(500).json({message: 'Terjadi kesalahan pada server.'})
    }
}

// hapus kriteria
export const hapusKriteria = async (req, res) => {
    const { kriteriaId } = req.params; // ID dari kriteria yang ingin dihapus

    const getKriteriaQuery = `SELECT kriteria FROM kriteria WHERE id = ?`;

    const deleteKriteriaQuery = `DELETE FROM kriteria WHERE id = ?`;

    const checkSubKriteriaQuery = `SELECT COUNT(*) AS jumlahSub FROM subkriteria WHERE kriteria_id = ?`;

    try {
        // Ambil nama kriteria terlebih dahulu
        const [kriteria] = await query(getKriteriaQuery, kriteriaId);

        // Periksa apakah kriteria memiliki sub-kriteria
        const [subKriteria] = await query(checkSubKriteriaQuery, kriteriaId);

        // Jika terdapat sub-kriteria, larang penghapusan
        if (subKriteria.jumlahSub > 0) {
            return res.status(304).json({ 
                message: `Kriteria ${kriteria.kriteria} tidak dapat dihapus karena memiliki sub-kriteria.` 
            });
        }

        // Hapus kriteria
        await query(deleteKriteriaQuery, kriteriaId);

        // Kirim respons sukses dengan nama kriteria
        res.status(200).json({message: `Kriteria ${kriteria.kriteria} berhasil dihapus.`});
    } catch (error) {
        console.error('Error:', error); // Log kesalahan untuk debugging
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
};
