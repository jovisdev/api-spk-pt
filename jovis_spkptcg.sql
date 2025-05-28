-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 28 Bulan Mei 2025 pada 07.56
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

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
-- Struktur dari tabel `alternatif`
--

CREATE TABLE `alternatif` (
  `id` int(11) NOT NULL,
  `kode` varchar(50) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `kelamin` varchar(50) NOT NULL,
  `alamat` varchar(50) NOT NULL,
  `usia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data untuk tabel `alternatif`
--

INSERT INTO `alternatif` (`id`, `kode`, `nama`, `kelamin`, `alamat`, `usia`) VALUES
(35, 'A1', 'Arizaldi', 'Laki Laki', 'Jl. Mesjid 28, Sunggal Kanan, kec. Medan Sunggal', 34),
(36, 'A2', 'Beby Salini', 'Perempuan', 'Jl. Abdul Hakim, Tanjung Sari, Kec Medan Selayang', 24),
(37, 'A3', 'Dedek Afrizal', 'Laki Laki', 'Bukit Tempurung, Kuala Simpang, Kab. Aceh Tamiang', 33),
(38, 'A4', 'Dimas Prasetio', 'Laki Laki', 'Kampung Klumpang, Kec. Hamparan Perak', 27),
(39, 'A5', 'Febriara Hutasuhut', 'Perempuan', 'Sunggal, Kec. Medan Sunggal', 30),
(40, 'A6', 'Fikri Haikal', 'Laki Laki', 'Bukit Rata, Kec. Kejurun Muda, Kab. Aceh Tamiang', 24),
(41, 'A7', 'Mei Nanda Sari', 'Perempuan', 'Padang Bulan, Kec. Medan Baru', 25),
(42, 'A8', 'Rizky Aditya', 'Laki Laki', 'Nangka, Kec. Binjai Utara, Kota Binjai', 27),
(45, 'A9', 'Wahyu Nugroho', 'Laki Laki', 'Jl. Ngumban Surbakti, Kec. Medan Selayang', 25);

-- --------------------------------------------------------

--
-- Struktur dari tabel `kriteria`
--

CREATE TABLE `kriteria` (
  `id` int(11) NOT NULL,
  `kode` varchar(50) NOT NULL,
  `kriteria` varchar(50) NOT NULL,
  `jenis` varchar(50) NOT NULL,
  `bobot` double NOT NULL,
  `tipe` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data untuk tabel `kriteria`
--

INSERT INTO `kriteria` (`id`, `kode`, `kriteria`, `jenis`, `bobot`, `tipe`) VALUES
(39, 'C1', 'Penguasaan teknik dan pengetahuan', 'Benefit', 0.3, 'Kuantitatif'),
(40, 'C2', 'Penampilan definisi otot', 'Benefit', 0.2, 'Kualitatif'),
(41, 'C3', 'Etika dan komunikasi', 'Benefit', 0.2, 'Kualitatif'),
(42, 'C4', 'Pengalaman profesi', 'Benefit', 0.15, 'Kuantitatif'),
(43, 'C5', 'Sertifikasi pelatihan / prestasi relevan', 'Benefit', 0.05, 'Kuantitatif'),
(44, 'C6', 'Fleksibilitas jadwal latihan', 'Benefit', 0.05, 'Kualitatif'),
(46, 'C7', 'Usia', 'Cost', 0.05, 'Kuantitatif');

-- --------------------------------------------------------

--
-- Struktur dari tabel `penilaian`
--

CREATE TABLE `penilaian` (
  `id` int(11) NOT NULL,
  `alternatif_id` int(11) NOT NULL,
  `kriteria_id` int(11) NOT NULL,
  `nilai` varchar(65) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data untuk tabel `penilaian`
--

INSERT INTO `penilaian` (`id`, `alternatif_id`, `kriteria_id`, `nilai`) VALUES
(444, 35, 39, '84'),
(445, 35, 40, '5'),
(446, 35, 41, '5'),
(447, 35, 42, '4'),
(448, 35, 43, '3'),
(449, 35, 44, '1'),
(450, 35, 46, '34'),
(451, 36, 39, '86'),
(452, 36, 40, '4'),
(453, 36, 41, '3'),
(454, 36, 42, '0.5'),
(455, 36, 43, '2'),
(456, 36, 44, '1'),
(457, 36, 46, '24'),
(458, 37, 39, '78'),
(459, 37, 40, '4'),
(460, 37, 41, '2'),
(461, 37, 42, '2'),
(462, 37, 43, '1'),
(463, 37, 44, '1'),
(464, 37, 46, '33'),
(465, 38, 39, '88'),
(466, 38, 40, '4'),
(467, 38, 41, '4'),
(468, 38, 42, '2'),
(469, 38, 43, '1'),
(470, 38, 44, '2'),
(471, 38, 46, '27'),
(472, 39, 39, '92'),
(473, 39, 40, '5'),
(474, 39, 41, '3'),
(475, 39, 42, '3.5'),
(476, 39, 43, '3'),
(477, 39, 44, '2'),
(478, 39, 46, '30'),
(479, 40, 39, '84'),
(480, 40, 40, '3'),
(481, 40, 41, '2'),
(482, 40, 42, '1.5'),
(483, 40, 43, '1'),
(484, 40, 44, '2'),
(485, 40, 46, '24'),
(486, 41, 39, '90'),
(487, 41, 40, '4'),
(488, 41, 41, '3'),
(489, 41, 42, '0'),
(490, 41, 43, '1'),
(491, 41, 44, '1'),
(492, 41, 46, '25'),
(493, 42, 39, '90'),
(494, 42, 40, '3'),
(495, 42, 41, '4'),
(496, 42, 42, '2'),
(497, 42, 43, '2'),
(498, 42, 44, '2'),
(499, 42, 46, '27'),
(500, 45, 39, '94'),
(501, 45, 40, '3'),
(502, 45, 41, '3'),
(503, 45, 42, '1'),
(504, 45, 43, '1'),
(505, 45, 44, '2'),
(506, 45, 46, '25');

-- --------------------------------------------------------

--
-- Struktur dari tabel `subkriteria`
--

CREATE TABLE `subkriteria` (
  `id` int(11) NOT NULL,
  `kriteria_id` int(11) NOT NULL,
  `subkriteria` varchar(50) NOT NULL,
  `bobot` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data untuk tabel `subkriteria`
--

INSERT INTO `subkriteria` (`id`, `kriteria_id`, `subkriteria`, `bobot`) VALUES
(82, 40, 'Sangat baik', 5),
(83, 40, 'Baik', 4),
(84, 40, 'Cukup', 3),
(85, 40, 'Kurang', 2),
(86, 40, 'Sangat Kurang', 1),
(87, 41, 'Sangat Baik', 5),
(88, 41, 'Baik', 4),
(89, 41, 'Cukup', 3),
(90, 41, 'Kurang', 2),
(91, 41, 'Sangat Kurang', 1),
(92, 44, 'Ya', 2),
(96, 44, 'Tidak', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `jabatan` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refresh_token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `nama`, `jabatan`, `username`, `password`, `refresh_token`) VALUES
(2, 'Jovis Jocunda', 'Super Admin', 'jovis', '$2a$10$z8hSvAnfBacNBZyJEc/eHuH.z7qI1VXsgck87RYcwcrwc57a7hj4m', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsIm5hbWUiOiJKb3ZpcyBKb2N1bmRhIiwiamFiYXRhbiI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzQ4MTc5NjI2LCJleHAiOjE3NDgyNjYwMjZ9.384tLin1u-v-S1l6goO3URxuefr_Q9dmHDjQSKkl_oU'),
(7, 'Jamalludin Basmalah', 'Manajer', 'jamal', '$2a$10$in4BBxH1E3xsWXtqfZ.M8eQQwCXAdPYB03OAMjYGifTIOBY6YQlmC', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsIm5hbWUiOiJKYW1hbGx1ZGluIEJhc21hbGFoIiwiamFiYXRhbiI6Ik1hbmFqZXIiLCJpYXQiOjE3NDI1NDUzMjUsImV4cCI6MTc0MjYzMTcyNX0.p_aPMlPRriWKUY5yFG58TMHWF1x0KiYeB2DjZRa7Tqk'),
(8, 'Sefti Ibond', 'Koor. Personal Trainer', 'ibond', '$2a$10$/lez45MXkkR2J6SmYBydX.c1z6BX8QIpL4B1SBA6L4JIeLHKT3vpi', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsIm5hbWUiOiJTZWZ0aSBJYm9uZCIsImphYmF0YW4iOiJLb29yLiBQZXJzb25hbCBUcmFpbmVyIiwiaWF0IjoxNzQyNTQ1MzU1LCJleHAiOjE3NDI2MzE3NTV9.JSQG3FGPpL6Kn1LgU2rJHmFsh94EeA87N75AbkKDbX4');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `alternatif`
--
ALTER TABLE `alternatif`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `kriteria`
--
ALTER TABLE `kriteria`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `penilaian`
--
ALTER TABLE `penilaian`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kriteria_id` (`kriteria_id`),
  ADD KEY `alternatif_id` (`alternatif_id`);

--
-- Indeks untuk tabel `subkriteria`
--
ALTER TABLE `subkriteria`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kriteria_id` (`kriteria_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `alternatif`
--
ALTER TABLE `alternatif`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT untuk tabel `kriteria`
--
ALTER TABLE `kriteria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT untuk tabel `penilaian`
--
ALTER TABLE `penilaian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=507;

--
-- AUTO_INCREMENT untuk tabel `subkriteria`
--
ALTER TABLE `subkriteria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `penilaian`
--
ALTER TABLE `penilaian`
  ADD CONSTRAINT `penilaian_ibfk_1` FOREIGN KEY (`kriteria_id`) REFERENCES `kriteria` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `penilaian_ibfk_2` FOREIGN KEY (`alternatif_id`) REFERENCES `alternatif` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `subkriteria`
--
ALTER TABLE `subkriteria`
  ADD CONSTRAINT `subkriteria_ibfk_1` FOREIGN KEY (`kriteria_id`) REFERENCES `kriteria` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
