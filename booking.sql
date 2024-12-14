-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 14, 2024 at 10:05 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booking`
--

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `id` int(11) NOT NULL,
  `Book_id` varchar(15) NOT NULL,
  `Member_id` varchar(10) NOT NULL,
  `Book_date` varchar(100) NOT NULL,
  `Book_time` int(11) NOT NULL,
  `Book_person` varchar(10) NOT NULL,
  `status_id` int(11) NOT NULL,
  `img` varchar(255) NOT NULL,
  `Amount` int(11) NOT NULL,
  `time` text NOT NULL,
  `operated_by` varchar(10) DEFAULT NULL,
  `note` varchar(255) NOT NULL,
  `date_pay` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`id`, `Book_id`, `Member_id`, `Book_date`, `Book_time`, `Book_person`, `status_id`, `img`, `Amount`, `time`, `operated_by`, `note`, `date_pay`) VALUES
(12, '20240603135802', '4411', '123', 145, '2', 5, '', 333, '13.0', '3456', 'fasdf', NULL),
(13, '20240603140801', '4411', '2024-06-03', 122, '2', 5, '665db2216389a.jpg', 400, '19:08', '3456', 'asdf', NULL),
(14, '20240604143442', '4411', '2024-06-04', 147, '2', 5, '665f09e295562.jpg', 1000, '19:34', NULL, '', '2024-06-04'),
(15, '20240605051642', '4411', '2024-06-05', 122, '2', 5, '665fd89a344c2.jpg', 700, '11:16', NULL, '', '2024-06-05'),
(16, '20240606043133', '0606041144', '2024-06-06', 149, '1', 5, '66611f85aba39.png', 200, '10:31', NULL, '', '2024-06-06'),
(18, '20240617190610', '4411', '2024-06-17', 125, '2', 5, '66706d025623c.jpg', 800, '02:06', NULL, '', '2024-06-17'),
(19, '20240621173524', '4411', '2024-06-21', 124, '1', 3, '66759dbccc7dc.jpg', 700, '22:37', NULL, '', '2024-06-21');

-- --------------------------------------------------------

--
-- Table structure for table `caddy`
--

CREATE TABLE `caddy` (
  `Caddy_number` int(10) NOT NULL,
  `Caddy_name` varchar(50) NOT NULL,
  `Caddy_lastname` varchar(100) NOT NULL,
  `Caddy_nickname` varchar(10) NOT NULL,
  `Caddy_picture` varchar(100) NOT NULL,
  `caddy_status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `caddy`
--

INSERT INTO `caddy` (`Caddy_number`, `Caddy_name`, `Caddy_lastname`, `Caddy_nickname`, `Caddy_picture`, `caddy_status`) VALUES
(345, 'asfd', 'asdf', 'asfd', '66759b9ca3f64.jpg', 'off'),
(34343, 'asf', 'asf', 'asdf', '66759b9542b31.jpg', 'off'),
(66766, 'grmm', 'lko', 'pam', '6675a407adcfc.png', 'on'),
(66770, 'grmm', 'lko', 'gm', '6675a43591437.png', 'on');

-- --------------------------------------------------------

--
-- Table structure for table `detail_book`
--

CREATE TABLE `detail_book` (
  `id` int(11) NOT NULL,
  `Book_id` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Caddy_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `drive_golf`
--

CREATE TABLE `drive_golf` (
  `id_drive` char(15) NOT NULL,
  `id_log` int(11) NOT NULL,
  `date_drive` date NOT NULL,
  `time_drive` text NOT NULL,
  `status_id` int(11) NOT NULL,
  `reserve_by` varchar(10) NOT NULL,
  `img_drive` varchar(255) NOT NULL,
  `price_drive` int(11) NOT NULL,
  `operated_by` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `drive_golf`
--

INSERT INTO `drive_golf` (`id_drive`, `id_log`, `date_drive`, `time_drive`, `status_id`, `reserve_by`, `img_drive`, `price_drive`, `operated_by`) VALUES
('', 2, '2024-06-17', 'jjlji', 16, '4411', '', 33, '3w343'),
('20240623140317', 2, '2024-06-23', '2', 11, '4411', '66780f050a5fc.jpg', 100, '');

-- --------------------------------------------------------

--
-- Table structure for table `golf_course`
--

CREATE TABLE `golf_course` (
  `Course_id` int(11) NOT NULL,
  `Course_time` varchar(200) NOT NULL,
  `Course_name` varchar(100) NOT NULL,
  `price_id` int(11) NOT NULL,
  `Course_detail` varchar(400) NOT NULL,
  `Course_date` date NOT NULL,
  `count` int(11) NOT NULL,
  `promotion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `golf_course`
--

INSERT INTO `golf_course` (`Course_id`, `Course_time`, `Course_name`, `price_id`, `Course_detail`, `Course_date`, `count`, `promotion`) VALUES
(122, '11:54', 'hole18', 1, 'fsafหกดผอ', '2024-06-21', 2, 200),
(124, '11:54', 'hole9', 3, 'how to asdf', '2024-06-21', 2, NULL),
(125, '15:30', 'hole9', 2, 'how to asdf', '2024-06-17', 2, NULL),
(128, '11:00', 'hole18', 1, 'fsaf', '2024-06-16', 2, 1100),
(134, '6:16', 'hole18', 1, 'fsafq', '2024-06-16', 2, NULL),
(138, '15:30', 'hole9', 1, 'how to asdf', '2024-06-16', 2, NULL),
(139, '15:40', 'hole9', 2, 'asfd', '2024-06-16', 2, NULL),
(141, '15:30', 'hole9', 1, '', '2024-06-16', 2, NULL),
(142, '15:30', 'hole9', 1, '', '2024-06-16', 2, NULL),
(145, '6:00', 'hole18', 1, 'asf', '2024-06-16', 2, NULL),
(147, '6:08', 'hole18', 1, 'asdf', '2024-06-16', 2, NULL),
(148, '6:16', 'hole18', 2, '', '2024-06-16', 2, NULL),
(149, '15:30', 'hole9', 2, '', '2024-06-16', 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `hole_price`
--

CREATE TABLE `hole_price` (
  `id` int(11) NOT NULL,
  `hole_name` varchar(50) NOT NULL,
  `Price_hole` int(11) NOT NULL,
  `promotion_price` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hole_price`
--

INSERT INTO `hole_price` (`id`, `hole_name`, `Price_hole`, `promotion_price`) VALUES
(1, 'hole9', 300, 0),
(2, 'hole18', 600, 0),
(3, 'drive', 50, 0),
(4, 'caddy', 300, 0),
(5, 'Cart', 400, 0),
(6, 'hole9_holiday', 600, 0),
(7, 'hole18_holiday', 1200, 1100);

-- --------------------------------------------------------

--
-- Table structure for table `level`
--

CREATE TABLE `level` (
  `id` int(11) NOT NULL,
  `Level_id` varchar(10) NOT NULL,
  `Level_name` varchar(50) NOT NULL,
  `Level_surname` varchar(50) NOT NULL,
  `Level_tel` varchar(10) NOT NULL,
  `Level_user` varchar(50) NOT NULL,
  `Level_password` varchar(50) NOT NULL,
  `position_id` int(11) NOT NULL,
  `Level_picture` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `level`
--

INSERT INTO `level` (`id`, `Level_id`, `Level_name`, `Level_surname`, `Level_tel`, `Level_user`, `Level_password`, `position_id`, `Level_picture`) VALUES
(12, '34534', 'asfd', 'asdf', '0839075663', 'admin', 'admin', 1, '665db42a85f17.jpg'),
(13, '3w343', 'asdfqq', 'asfd', '0839076635', 'qq', '123', 1, '665db4446d2a8.jpg'),
(14, '1234der', 'asdf', 'asdf', '0839075663', 'ee', 'ee', 1, '665dba7806d0c.jpg'),
(15, '3456', 'asf', 'asadf', '0839076635', 'ca', 'ca', 2, ''),
(16, '33333', 'asdf', 'aaa', '0839076635', 'ma', 'ma', 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `log_golf_driving`
--

CREATE TABLE `log_golf_driving` (
  `id` int(11) NOT NULL,
  `log_name` varchar(25) NOT NULL,
  `status_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `log_golf_driving`
--

INSERT INTO `log_golf_driving` (`id`, `log_name`, `status_id`) VALUES
(1, 'log 12q', 6),
(2, 'log 2', 7),
(3, 'log 3', 6),
(4, 'log 4', 6),
(6, 'log 6', 6),
(7, 'log 7', 6),
(9, 'log 9', 7),
(10, 'log 10', 7),
(12, 'log 111', 7),
(14, 'log 11', 6);

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `Member_id` varchar(10) NOT NULL,
  `Member_identification` varchar(13) NOT NULL,
  `Member_firstname` varchar(50) NOT NULL,
  `Member_lastname` varchar(100) NOT NULL,
  `Member_gender` varchar(6) NOT NULL,
  `nationnality_id` int(11) NOT NULL,
  `Member_tel` varchar(10) NOT NULL,
  `Member_email` varchar(100) NOT NULL,
  `Member_lineid` varchar(100) NOT NULL,
  `Member_user` varchar(50) NOT NULL,
  `Member_password` varchar(255) NOT NULL,
  `user_level` int(11) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`Member_id`, `Member_identification`, `Member_firstname`, `Member_lastname`, `Member_gender`, `nationnality_id`, `Member_tel`, `Member_email`, `Member_lineid`, `Member_user`, `Member_password`, `user_level`, `status`) VALUES
('0606041144', '1420901384407', 'siri', 'awata', 'Female', 2, '0619134574', 'pasmk1923@gmail.comm', 'pamsk.163', 'pamm', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 12, 'สมาชิกปกติ'),
('1214100200', '1420901384408', 'siriyakorn', 'awata', 'Female', 1, '0619134574', 'admin@gmail.com', 'pamsk.163', 'aa', 'f6e0a1e2ac41945a9aa7ff8a8aaa0cebc12a3bcc981a929ad5cf810a090e11ae', 12, 'สมาชิกปกติ'),
('4411', '1329901097549', 'onanong11212', 'penthai', 'Female', 2, '0980825095', 's6506021421011@email.kmutnb.ac.th', '0906183668', 'nat1', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 12, 'สมาชิกปกติ'),
('่11111', '1329901097531', 'aa', 'aa', 'Male', 1, '0839076635', 's6506021421013@email.kmutnb.ac.th', '0610307021', 'nn', '77b7e1336bc5493c938ad8a554cac8384c0eaa155e004d7c74cdbc149a4535c3', 12, 'สมาชิกปกติ');

-- --------------------------------------------------------

--
-- Table structure for table `nationnality`
--

CREATE TABLE `nationnality` (
  `nationnality_id` int(11) NOT NULL,
  `nationnality_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `nationnality`
--

INSERT INTO `nationnality` (`nationnality_id`, `nationnality_name`) VALUES
(1, 'Thailand'),
(2, 'Japan'),
(3, 'Korea'),
(4, 'Taiwan'),
(5, 'Philippines');

-- --------------------------------------------------------

--
-- Table structure for table `position`
--

CREATE TABLE `position` (
  `position_id` int(11) NOT NULL,
  `position_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `position`
--

INSERT INTO `position` (`position_id`, `position_name`) VALUES
(1, 'Admin'),
(2, 'Cashier'),
(3, 'Manager'),
(12, 'member1');

-- --------------------------------------------------------

--
-- Table structure for table `price`
--

CREATE TABLE `price` (
  `price_id` int(11) NOT NULL,
  `price_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `price`
--

INSERT INTO `price` (`price_id`, `price_name`) VALUES
(1, '900'),
(2, '300'),
(3, '600'),
(34532, '1200'),
(34533, '1100'),
(34535, '700'),
(34536, '180'),
(34537, '800'),
(34539, '400\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `status_id` int(11) NOT NULL,
  `status_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`status_id`, `status_name`) VALUES
(1, 'สมาชิกๅ'),
(2, 'ระงับใช้ชั่วคราว'),
(3, 'Inspecting'),
(5, 'Payment completed'),
(6, 'ว่าง'),
(7, 'ไม่ว่าง'),
(11, 'Waiting for payment'),
(12, 'ยกเลิก'),
(16, 'เสร็จสิ้น');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Book_id` (`Book_id`),
  ADD KEY `foreign key Member_id` (`Member_id`),
  ADD KEY `status_id` (`status_id`),
  ADD KEY `Book_time` (`Book_time`),
  ADD KEY `operated_by` (`operated_by`);

--
-- Indexes for table `caddy`
--
ALTER TABLE `caddy`
  ADD PRIMARY KEY (`Caddy_number`),
  ADD KEY `caddy_status` (`caddy_status`);

--
-- Indexes for table `detail_book`
--
ALTER TABLE `detail_book`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Caddy_number` (`Caddy_number`),
  ADD KEY `Book_id` (`Book_id`);

--
-- Indexes for table `drive_golf`
--
ALTER TABLE `drive_golf`
  ADD PRIMARY KEY (`id_drive`),
  ADD KEY `id_log` (`id_log`),
  ADD KEY `status_id` (`status_id`);

--
-- Indexes for table `golf_course`
--
ALTER TABLE `golf_course`
  ADD PRIMARY KEY (`Course_id`),
  ADD KEY `price_id` (`price_id`);

--
-- Indexes for table `hole_price`
--
ALTER TABLE `hole_price`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `level`
--
ALTER TABLE `level`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Level_id` (`Level_id`),
  ADD KEY `position_id` (`position_id`);

--
-- Indexes for table `log_golf_driving`
--
ALTER TABLE `log_golf_driving`
  ADD PRIMARY KEY (`id`),
  ADD KEY `status_id` (`status_id`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`Member_id`),
  ADD UNIQUE KEY `Member_identification` (`Member_identification`),
  ADD UNIQUE KEY `Member_email` (`Member_email`),
  ADD KEY `nationnality_id` (`nationnality_id`),
  ADD KEY `status_id` (`status`),
  ADD KEY `user_level` (`user_level`);

--
-- Indexes for table `nationnality`
--
ALTER TABLE `nationnality`
  ADD PRIMARY KEY (`nationnality_id`);

--
-- Indexes for table `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`position_id`);

--
-- Indexes for table `price`
--
ALTER TABLE `price`
  ADD PRIMARY KEY (`price_id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`status_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `caddy`
--
ALTER TABLE `caddy`
  MODIFY `Caddy_number` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66771;

--
-- AUTO_INCREMENT for table `detail_book`
--
ALTER TABLE `detail_book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `golf_course`
--
ALTER TABLE `golf_course`
  MODIFY `Course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=156;

--
-- AUTO_INCREMENT for table `hole_price`
--
ALTER TABLE `hole_price`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `level`
--
ALTER TABLE `level`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `log_golf_driving`
--
ALTER TABLE `log_golf_driving`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `nationnality`
--
ALTER TABLE `nationnality`
  MODIFY `nationnality_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `position`
--
ALTER TABLE `position`
  MODIFY `position_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `price`
--
ALTER TABLE `price`
  MODIFY `price_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34540;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `book`
--
ALTER TABLE `book`
  ADD CONSTRAINT `book_ibfk_1` FOREIGN KEY (`Member_id`) REFERENCES `member` (`Member_id`),
  ADD CONSTRAINT `book_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `status` (`status_id`),
  ADD CONSTRAINT `book_ibfk_3` FOREIGN KEY (`Book_time`) REFERENCES `golf_course` (`Course_id`),
  ADD CONSTRAINT `book_ibfk_4` FOREIGN KEY (`operated_by`) REFERENCES `level` (`Level_id`);

--
-- Constraints for table `detail_book`
--
ALTER TABLE `detail_book`
  ADD CONSTRAINT `detail_book_ibfk_1` FOREIGN KEY (`Caddy_number`) REFERENCES `caddy` (`Caddy_number`),
  ADD CONSTRAINT `detail_book_ibfk_2` FOREIGN KEY (`Book_id`) REFERENCES `book` (`Book_id`);

--
-- Constraints for table `drive_golf`
--
ALTER TABLE `drive_golf`
  ADD CONSTRAINT `drive_golf_ibfk_1` FOREIGN KEY (`id_log`) REFERENCES `log_golf_driving` (`id`),
  ADD CONSTRAINT `drive_golf_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `status` (`status_id`);

--
-- Constraints for table `golf_course`
--
ALTER TABLE `golf_course`
  ADD CONSTRAINT `golf_course_ibfk_1` FOREIGN KEY (`price_id`) REFERENCES `price` (`price_id`);

--
-- Constraints for table `level`
--
ALTER TABLE `level`
  ADD CONSTRAINT `level_ibfk_1` FOREIGN KEY (`position_id`) REFERENCES `position` (`position_id`),
  ADD CONSTRAINT `position_id` FOREIGN KEY (`position_id`) REFERENCES `position` (`position_id`);

--
-- Constraints for table `log_golf_driving`
--
ALTER TABLE `log_golf_driving`
  ADD CONSTRAINT `log_golf_driving_ibfk_1` FOREIGN KEY (`status_id`) REFERENCES `status` (`status_id`);

--
-- Constraints for table `member`
--
ALTER TABLE `member`
  ADD CONSTRAINT `member_ibfk_3` FOREIGN KEY (`nationnality_id`) REFERENCES `nationnality` (`nationnality_id`),
  ADD CONSTRAINT `member_ibfk_4` FOREIGN KEY (`user_level`) REFERENCES `position` (`position_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
