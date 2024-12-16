import express from "express";
import { login, register } from "../controller/users.js";
import { addKriteria } from "../controller/kriteria.js";
import { addSubkriteria } from "../controller/subkriteria.js";
import { addAlternatif } from "../controller/alternatif.js";
import { addPenilaian } from "../controller/penilaian.js";
import { calculateMABAC } from "../controller/mabac.js";

const router = express.Router();

// users
router.post('/login', login)
router.post('/register', register)

// kriteria
router.post('/addkriteria', addKriteria)

// subkriteria
router.post('/addsubkriteria', addSubkriteria)

// alternatif
router.post('/addalternatif', addAlternatif)

// penilaian
router.post('/addpenilaian', addPenilaian)

// perhitungan
router.get('/kalkulasi', calculateMABAC)

export default router;