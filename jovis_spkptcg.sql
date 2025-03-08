-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 08, 2025 at 07:44 PM
-- Server version: 8.0.41-cll-lve
-- PHP Version: 8.3.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jovis_spkptcg`
--

-- --------------------------------------------------------

--
-- Table structure for table `alternatif`
--

CREATE TABLE `alternatif` (
  `id` int NOT NULL,
  `kode` varchar(50) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `kelamin` varchar(50) NOT NULL,
  `alamat` varchar(50) NOT NULL,
  `usia` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `alternatif`
--

INSERT INTO `alternatif` (`id`, `kode`, `nama`, `kelamin`, `alamat`, `usia`) VALUES
(23, 'A2', 'Beby Salini', 'Perempuan', 'Jl. Abdul Hakim, Tanjung Sari, Kec Medan Selayang', 24),
(24, 'A3', 'Dedek Afrizal', 'Laki Laki', 'Bukit Tempurung, Kuala Simpang, Kab. Aceh Tamiang', 33),
(25, 'A4', 'Dimas Prasetio', 'Laki Laki', 'Kampung Klumpang, Kec. Hamparan Perak', 27),
(26, 'A5', 'Febriara Hutasuhut', 'Perempuan', 'Sunggal, Kec. Medan Sunggal', 30),
(28, 'A7', 'Mei Nanda Sari', 'Perempuan', 'Padang Bulan, Kec. Medan Baru', 25),
(29, 'A8', 'Rizky Aditya', 'Laki Laki', 'Nangka, Kec. Binjai Utara, Kota Binjai', 27),
(30, 'A9', 'Wahyu Nugroho', 'Laki Laki', 'Jl. Ngumban Surbakti, Kec. Medan Selayang', 25),
(31, 'A1', 'Arizaldi', 'Laki Laki', 'Jl. Mesjid 28, Sunggal Kanan, kec. Medan Sunggal', 34),
(32, 'A6', 'Fikri Haikal', 'Laki Laki', 'Bukit Rata, Kec. Kejurun Muda, Kab. Aceh Tamiang', 24);

-- --------------------------------------------------------

--
-- Table structure for table `kriteria`
--

CREATE TABLE `kriteria` (
  `id` int NOT NULL,
  `kode` varchar(50) NOT NULL,
  `kriteria` varchar(50) NOT NULL,
  `jenis` varchar(50) NOT NULL,
  `bobot` double NOT NULL,
  `tipe` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `kriteria`
--

INSERT INTO `kriteria` (`id`, `kode`, `kriteria`, `jenis`, `bobot`, `tipe`) VALUES
(28, 'C1', 'Penguasaan teknik dan pengetahuan', 'Benefit', 0.3, 'Kuantitatif'),
(29, 'C2', 'Penampilan definisi otot', 'Benefit', 0.2, 'Kualitatif'),
(30, 'C3', 'Etika dan komunikasi', 'Benefit', 0.2, 'Kualitatif'),
(31, 'C4', 'Pengalaman profesi', 'Benefit', 0.15, 'Kuantitatif'),
(32, 'C5', 'Sertifikasi pelatihan / prestasi relevan', 'Benefit', 0.05, 'Kuantitatif'),
(33, 'C6', 'Fleksibilitas jadwal latihan', 'Benefit', 0.05, 'Kualitatif'),
(34, 'C7', 'Usia', 'Cost', 0.05, 'Kuantitatif');

-- --------------------------------------------------------

--
-- Table structure for table `penilaian`
--

CREATE TABLE `penilaian` (
  `id` int NOT NULL,
  `alternatif_id` int NOT NULL,
  `kriteria_id` int NOT NULL,
  `nilai` varchar(65) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subkriteria`
--

CREATE TABLE `subkriteria` (
  `id` int NOT NULL,
  `kriteria_id` int NOT NULL,
  `subkriteria` varchar(50) NOT NULL,
  `bobot` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `subkriteria`
--

INSERT INTO `subkriteria` (`id`, `kriteria_id`, `subkriteria`, `bobot`) VALUES
(65, 29, 'Sangat Baik', 5),
(66, 30, 'Sangat Kurang', 1),
(67, 33, 'Sedang', 2),
(68, 30, 'Sangat Baik', 5),
(69, 29, 'Baik', 4),
(70, 29, 'Cukup', 3),
(71, 29, 'Kurang', 2),
(72, 29, 'Sangat Kurang', 1),
(73, 30, 'Baik', 4),
(74, 30, 'Cukup', 3),
(75, 30, 'Kurang', 2),
(76, 33, 'Tinggi', 3),
(77, 33, 'Rendah', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `nama` varchar(50) NOT NULL,
  `jabatan` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refresh_token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nama`, `jabatan`, `username`, `password`, `refresh_token`) VALUES
(2, 'Jovis Jocunda', 'Super Admin', 'jovis', '$2a$10$z8hSvAnfBacNBZyJEc/eHuH.z7qI1VXsgck87RYcwcrwc57a7hj4m', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsIm5hbWUiOiJKb3ZpcyBKb2N1bmRhIiwiamFiYXRhbiI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzQxNDM3NDY0LCJleHAiOjE3NDE1MjM4NjR9.nWd2hb8jrVzFtf4EDuWje9ziV0kboLUw20Dh8T4N6yk'),
(6, 'Jamaluddin bas', 'Manajer', 'jamal', '$2a$10$PHwNlQWB4qwOrW2HgYzNIeuJcMkw4LPXWKd6RQp9trhSh78PzWPDu', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsIm5hbWUiOiJKYW1hbHVkZGluIGJhcyIsImphYmF0YW4iOiJNYW5hamVyIiwiaWF0IjoxNzM4MzAwMDMwLCJleHAiOjE3MzgzODY0MzB9.QtP4BJFDqsIUfIQcphO28kEB6GDvf2eDcKLKP0P7WHw');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alternatif`
--
ALTER TABLE `alternatif`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kriteria`
--
ALTER TABLE `kriteria`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `penilaian`
--
ALTER TABLE `penilaian`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kriteria_id` (`kriteria_id`),
  ADD KEY `alternatif_id` (`alternatif_id`);

--
-- Indexes for table `subkriteria`
--
ALTER TABLE `subkriteria`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kriteria_id` (`kriteria_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alternatif`
--
ALTER TABLE `alternatif`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `kriteria`
--
ALTER TABLE `kriteria`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `penilaian`
--
ALTER TABLE `penilaian`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=366;

--
-- AUTO_INCREMENT for table `subkriteria`
--
ALTER TABLE `subkriteria`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `penilaian`
--
ALTER TABLE `penilaian`
  ADD CONSTRAINT `penilaian_ibfk_1` FOREIGN KEY (`kriteria_id`) REFERENCES `kriteria` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `penilaian_ibfk_2` FOREIGN KEY (`alternatif_id`) REFERENCES `alternatif` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `subkriteria`
--
ALTER TABLE `subkriteria`
  ADD CONSTRAINT `subkriteria_ibfk_1` FOREIGN KEY (`kriteria_id`) REFERENCES `kriteria` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
