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

export const changeSubKriteria = async (req, res) => {
    const { subkriteriaId } = req.params; // ID dari subkriteria yang ingin diubah
    const { subkriteria, bobot } = req.body;

    if (!subkriteria || !bobot) {
        return res.status(400).json({ message: 'Data subkriteria dan bobot harus diisi.' });
    }
    const updateSubKriteriaQuery = `
        UPDATE subkriteria
        SET subkriteria = ?, bobot = ?
        WHERE id = ?
    `;
    try {
        const result = await query(updateSubKriteriaQuery, [subkriteria, bobot, subkriteriaId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Sub kriteria tidak ditemukan.' });
        }
        res.status(200).json({
            message: 'Data subkriteria berhasil diubah.',
        });
    } catch (error) {
        console.error('Error saat mengubah subkriteria:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
};


// hapus subkriteria
export const deleteSubKriteria = async (req, res) => {
    const { subkriteriaId } = req.params; // ID dari kriteria yang ingin dihapus

    const getSubKriteriaQuery = `SELECT 
            subkriteria.id AS subkriteria_id,
            subkriteria.subkriteria,
            kriteria.id AS kriteria_id,
            kriteria.kriteria
        FROM 
            subkriteria
        INNER JOIN 
            kriteria
        ON 
            subkriteria.kriteria_id = kriteria.id
            where subkriteria.id = ?`;

    const deleteSubKriteriaQuery = `DELETE FROM subkriteria WHERE id = ?`;

    try {
        // Ambil nama kriteria terlebih dahulu
        const [subKriteria] = await query(getSubKriteriaQuery, subkriteriaId);

        // Hapus kriteria
        await query(deleteSubKriteriaQuery, subkriteriaId);

        // Kirim respons sukses dengan nama kriteria
        res.status(200).json({message: `Sub Kriteria ${subKriteria.subkriteria} dari kriteria ${subKriteria.kriteria} berhasil dihapus.`});
    } catch (error) {
        console.error('Error:', error); // Log kesalahan untuk debugging
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
};

export const dataSubKriteria = async (req,res) => {
    
    // query tampilkan data
    const selectSubKriteria = 'SELECT * FROM subkriteria ORDER BY bobot DESC'

    try{
        const result = await query(selectSubKriteria)
        res.status(200).json(result)
    }catch(error){
        res.status(500).json({message: 'Terjadi kesalahan pada server.'})
    }
}