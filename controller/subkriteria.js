import { query } from "../database/config.js"

// Controller untuk menambahkan data subkriteria
export const addSubkriteria = async (req, res) => {
    try {
        const { kriteria_id, subkriteria, bobot } = req.body;

        // Validasi input
        if (!kriteria_id || !subkriteria || !bobot) {
            return res.status(400).json({ message: 'Semua data harus diisi.' });
        }

        // Query untuk menambahkan data ke tabel Subkriteria
        const insertSubKriteriaquery = `
            INSERT INTO subkriteria (kriteria_id, subkriteria, bobot)
            VALUES (?, ?, ?)
        `;

        // Eksekusi query
        await query(insertSubKriteriaquery,[kriteria_id, subkriteria, bobot]);

        res.status(201).json({ message: 'Data subkriteria berhasil ditambahkan.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
};

export const dataSubKriteria = async (req,res) => {
    
    // query tampilkan data
    const selectSubKriteria = 'SELECT * FROM subkriteria'

    try{
        const result = await query(selectSubKriteria)
        res.status(200).json(result)
    }catch(error){
        res.status(500).json({message: 'Terjadi kesalahan pada server.'})
    }
}