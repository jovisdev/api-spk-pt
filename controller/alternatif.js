import { query } from "../database/config.js";

// Controller untuk menambahkan data alternatif
export const addAlternatif = async (req, res) => {
    try {
        const { kode, nama, kelamin, alamat, usia } = req.body;

        // Validasi input
        if (!kode || !nama || !kelamin || !alamat || !usia) {
            return res.status(400).json({ message: 'Semua data harus diisi.' });
        }

        // Validasi usia
        if (typeof usia !== 'number' || usia <= 0) {
            return res.status(400).json({ message: 'Usia harus berupa angka positif.' });
        }

        // Query untuk menambahkan data ke tabel Alternatif
        const insertAlternatifQuery = `
            INSERT INTO alternatif (kode, nama, kelamin, alamat, usia)
            VALUES (?, ?, ?, ?, ?)
        `;

        // Eksekusi query
        await query(insertAlternatifQuery, [kode, nama, kelamin, alamat, usia]);

        res.status(201).json({ message: 'Data alternatif berhasil ditambahkan.' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server.', error: error.message });
    }
};

// Controller untuk mengubah data kriteria
export const changeAlternatif = async (req, res) => {
    const { alternatifId } = req.params;  // ID dari tugas yang ingin di-update
    const {kode, nama, kelamin, alamat, usia } = req.body;

    // Query untuk menambahkan data ke tabel
    const updateAlternatifQuery = `
        UPDATE alternatif
        SET kode = ?, nama = ?, kelamin = ?, alamat = ?, usia = ?
        WHERE id = ?
    `;

    try {
        // Eksekusi query
        const result = await query(updateAlternatifQuery,[kode, nama, kelamin, alamat, usia, alternatifId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Alternatif not found' });
        }
        res.status(201).json({ message: 'Data alternatif berhasil diubah.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
};

// hapus kriteria
export const deleteAlternatif = async (req, res) => {
    const { alternatifId } = req.params; // ID dari kriteria yang ingin dihapus

    const getAlternatifQuery = `SELECT nama FROM alternatif WHERE id = ?`;

    const deleteAlternatifQuery = `DELETE FROM alternatif WHERE id = ?`;

    try {
        // Ambil nama alternatif terlebih dahulu
        const [alternatif] = await query(getAlternatifQuery, alternatifId);

        // Hapus kriteria
        await query(deleteAlternatifQuery, alternatifId);

        // Kirim respons sukses dengan nama kriteria
        res.status(200).json({message: `alternatif atas ${alternatif.nama} berhasil dihapus.`});
    } catch (error) {
        console.error('Error:', error); // Log kesalahan untuk debugging
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
};

export const dataAlternatif = async (req,res) => {
    
    // query tampilkan data
    const selectAlternatif = 'SELECT * FROM alternatif ORDER BY nama asc'

    try{
        const result = await query(selectAlternatif)
        res.status(200).json(result)
    }catch(error){
        res.status(500).json({message: 'Terjadi kesalahan pada server.'})
    }
}
