import express from "express";
import { login, register } from "../controller/users.js";
import { addKriteria, changeKriteria, dataKriteria, hapusKriteria } from "../controller/kriteria.js";
import { addSubkriteria, dataSubKriteria } from "../controller/subkriteria.js";
import { addAlternatif, dataAlternatif } from "../controller/alternatif.js";
import { addPenilaian, dataPenilaian } from "../controller/penilaian.js";
import { calculateMABAC } from "../controller/mabac.js";

const router = express.Router();

// users
router.post('/login', login)
router.post('/register', register)

// kriteria
router.post('/addkriteria', addKriteria)
router.put('/changekriteria/:kriteriaId', changeKriteria)
router.delete('/deletekriteria/:kriteriaId', hapusKriteria)
router.get('/kriteria', dataKriteria)

// subkriteria
router.post('/addsubkriteria', addSubkriteria)
router.get('/subkriteria', dataSubKriteria)

// alternatif
router.post('/addalternatif', addAlternatif)
router.get('/alternatif', dataAlternatif)

// penilaian
router.post('/addpenilaian', addPenilaian)
router.get('/penilaian', dataPenilaian)

// perhitungan
router.get('/kalkulasi', calculateMABAC)

export default router;