import { query } from "../database/config.js";

// Controller untuk menambahkan data alternatif
export const addAlternatif = async (req, res) => {
    try {
        const { kode, nama, kelamin, alamat, usia } = req.body;

        // Validasi input
        if (!kode || !nama || !kelamin || !alamat || !usia) {
            return res.status(400).json({ message: 'Semua data harus diisi.' });
        }

        // Validasi jenis_kelamin
        const validJenisKelamin = ['Laki-laki', 'Perempuan'];
        if (!validJenisKelamin.includes(kelamin)) {
            return res.status(400).json({ message: 'Jenis kelamin harus Laki-laki atau Perempuan.' });
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

export const dataAlternatif = async (req,res) => {
    
    // query tampilkan data
    const selectAlternatif = 'SELECT * FROM alternatif'

    try{
        const result = await query(selectAlternatif)
        res.status(200).json(result)
    }catch(error){
        res.status(500).json({message: 'Terjadi kesalahan pada server.'})
    }
}
