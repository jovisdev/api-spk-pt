import { query } from "../database/config.js";

// Controller untuk perhitungan MABAC
export const getPrepareCalculation = async (req, res) => {
    try {
        // Ambil data dari tabel `penilaian`
        const penilaianQuery = `
            SELECT p.alternatif_id, p.kriteria_id, p.nilai, k.bobot, k.jenis 
            FROM penilaian p
            JOIN kriteria k ON p.kriteria_id = k.id
        `;
        const penilaian = await query(penilaianQuery);

        // Ambil daftar alternatif dan kriteria unik
        const alternatifQuery = `SELECT DISTINCT id, nama FROM alternatif`;
        const kriteriaQuery = `SELECT DISTINCT id FROM kriteria`;
        const alternatif = await query(alternatifQuery);
        const kriteria = await query(kriteriaQuery);

        if (penilaian.length === 0 || alternatif.length === 0 || kriteria.length === 0) {
            return res.status(404).json({ message: "Data penilaian, alternatif, atau kriteria tidak ditemukan." });
        }

        // Tahap 1 : Format data ke dalam matriks alternatif-kriteria
        const dataMatrix = {};
        alternatif.forEach((alt) => {
            dataMatrix[alt.id] = {};
            kriteria.forEach((krit) => {
                const nilai = penilaian.find(
                    (p) => p.alternatif_id === alt.id && p.kriteria_id === krit.id
                )?.nilai || 0;
                dataMatrix[alt.id][krit.id] = nilai;
            });
        });

        // Tahap 2 : Normalisasi Matriks
        const normalizedMatrix = {};
        kriteria.forEach((krit) => {        
            const values = Object.values(dataMatrix).map((alt) => alt[krit.id] || 0);
            const max = Math.max(...values);
            const min = Math.min(...values);
        
            alternatif.forEach((alt) => {
                if (!normalizedMatrix[alt.id]) normalizedMatrix[alt.id] = {};
                
                const penilaianKriteria = penilaian.find((p) => p.kriteria_id === krit.id);
        
                if (!penilaianKriteria) {
                    normalizedMatrix[alt.id][krit.id] = 0; // Nilai default jika tidak ditemukan
                    return;
                }
        
                if (max === min) {
                    normalizedMatrix[alt.id][krit.id] = 0; // Hindari pembagian dengan nol
                } else if (penilaianKriteria.jenis === "Benefit") {
                    normalizedMatrix[alt.id][krit.id] = (dataMatrix[alt.id][krit.id] - min) / (max - min);
                } else if (penilaianKriteria.jenis === "Cost") {
                    normalizedMatrix[alt.id][krit.id] = (max - dataMatrix[alt.id][krit.id]) / (max - min);
                } else {
                }
                normalizedMatrix[alt.id][krit.id] = parseFloat(normalizedMatrix[alt.id][krit.id].toFixed(4));
            });
        });
        
        // Tahap 3 : Matriks Ternormalisasi Terbobot
        const weightedMatrix = {};
        kriteria.forEach((krit) => {
            const bobot = penilaian.find((p) => p.kriteria_id === krit.id).bobot;
            alternatif.forEach((alt) => {
                if (!weightedMatrix[alt.id]) weightedMatrix[alt.id] = {};
                weightedMatrix[alt.id][krit.id] = normalizedMatrix[alt.id][krit.id] * bobot + bobot;
                weightedMatrix[alt.id][krit.id] = parseFloat(weightedMatrix[alt.id][krit.id].toFixed(4));
            });
        });

        // Tahap 4 : Menghitung Area Batas
        const borderMatrix = {};
        kriteria.forEach((krit) => {
            // Ambil nilai untuk setiap kriteria dari weightedMatrix
            const values = Object.values(weightedMatrix).map((alt) => alt[krit.id]);

            // Hitung produk dari semua nilai
            const product = values.reduce((acc, val) => acc * val, 1);

            // Hitung geometric mean
            const G = Math.pow(product, 1 / values.length);

            // Simpan hasil ke dalam borderMatrix
            borderMatrix[krit.id] = parseFloat(G.toFixed(4));
        });


        // Tahap 5 : Hitung Jarak ke Area Batas
        const distanceMatrix = {};
        alternatif.forEach((alt) => {
            distanceMatrix[alt.id] = Object.keys(borderMatrix).reduce((sum, kritId) => {
                return sum + (weightedMatrix[alt.id][kritId] - borderMatrix[kritId]);
            }, 0);
            distanceMatrix[alt.id] = parseFloat(distanceMatrix[alt.id].toFixed(4));
        });

        // Tahap 6 : Urutkan Alternatif Berdasarkan Jarak
        const priority = Object.keys(distanceMatrix)
            .map((altId) => ({
                alternatif: alternatif.find((alt) => alt.id == altId).nama,
                score: distanceMatrix[altId],
            }))
            .sort((a, b) => b.score - a.score);

        // Kirim response
        res.status(200).json({
            message: "Perhitungan MABAC berhasil.",
            priority,
            data: {
                dataMatrix,
                normalizedMatrix,
                weightedMatrix,
                borderMatrix,
                distanceMatrix,
            },
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server.", error: error.message });
    }
};