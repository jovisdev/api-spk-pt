import express from "express";
import { deleteUser, getUsers, login, register } from "../controller/users.js";
import { addKriteria, changeKriteria, dataKriteria, hapusKriteria } from "../controller/kriteria.js";
import { addSubkriteria, changeSubKriteria, dataSubKriteria, deleteSubKriteria } from "../controller/subkriteria.js";
import { addAlternatif, changeAlternatif, dataAlternatif, deleteAlternatif } from "../controller/alternatif.js";
import { dataAwalPenilaian, deletePenilaian, konversiPenilaian, upsertPenilaian } from "../controller/penilaian.js";
import { addResult, getPrepareCalculation, getResult } from "../controller/mabac.js";

const router = express.Router();

// users
router.post('/login', login)
router.post('/register', register)
router.get('/users', getUsers)
router.delete('/deleteuser/:userId', deleteUser)

// kriteria
router.post('/addkriteria', addKriteria)
router.put('/changekriteria/:kriteriaId', changeKriteria)
router.delete('/deletekriteria/:kriteriaId', hapusKriteria)
router.get('/kriteria', dataKriteria)

// subkriteria
router.post('/addsubkriteria', addSubkriteria)
router.put('/changesubkriteria/:subkriteriaId', changeSubKriteria)
router.delete('/deletesubkriteria/:subkriteriaId', deleteSubKriteria)
router.get('/subkriteria', dataSubKriteria)

// alternatif
router.post('/addalternatif', addAlternatif)
router.put('/changealternatif/:alternatifId', changeAlternatif)
router.delete('/deletealternatif/:alternatifId', deleteAlternatif)
router.get('/alternatif', dataAlternatif)

// penilaian
router.post('/addpenilaian', upsertPenilaian)
router.delete('/deletepenilaian/:penilaianId', deletePenilaian)
router.get('/konversinilai', konversiPenilaian)
router.get('/datapenilaian', dataAwalPenilaian)

// perhitungan
router.get('/getdataprepare', getPrepareCalculation)
router.get('/dataresult', getResult)
router.post('/addresult', addResult)

export default router;