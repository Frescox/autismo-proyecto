-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 21, 2024 at 07:38 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sonrisas_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `child_config`
--

CREATE TABLE `child_config` (
  `id` bigint(20) NOT NULL,
  `child_uuid` varchar(128) NOT NULL,
  `config` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `words` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`words`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `child_config`
--

INSERT INTO `child_config` (`id`, `child_uuid`, `config`, `words`) VALUES
(3, '09260', '{\"header_footer\":\"#00ff88\",\"title\":\"#8eaaf5\",\"text\":\"#fff2f2\",\"bg\":\"#8eaaf5\"}', '[\"Serpiente\"]'),
(4, '71415', '{\"header_footer\":\"#ef0aff\",\"title\":\"#8eaaf5\",\"text\":\"#fff2f2\",\"bg\":\"#8eaaf5\"}', NULL),
(5, '28289', '{\"header_footer\":\"#000000\",\"title\":\"#8eaaf5\",\"text\":\"#fff2f2\",\"bg\":\"#8eaaf5\"}', NULL),
(6, '33598', '{\"header_footer\":\"#ff0000\",\"title\":\"#8eaaf5\",\"text\":\"#fff2f2\",\"bg\":\"#8eaaf5\"}', NULL),
(19, '3240', '{\"header_footer\":\"#4dff00\",\"title\":\"#8eaaf5\",\"text\":\"#fff2f2\",\"bg\":\"#8eaaf5\"}', NULL),
(20, '60516', NULL, NULL),
(21, '12291', '{\"header_footer\":\"#3b3b3b\",\"title\":\"#000000\",\"text\":\"#000000\",\"bg\":\"#949aa8\"}', '[\"Telefono\",\"arbol\",\"Laptop\",\"sal\",\"arbol\",\"arbol\",\"arbol\",\"arbol\",\"arbol\",\"arbol\",\"arbol\",\"arbol\",\"platano\",\"sal\",\"proton\",\"arbol\",\"proton\",\"palabra\",\"ni\\u00f1o\"]'),
(23, '2565', NULL, '[\"hola\",\"adios\"]'),
(24, '35373', NULL, '[\"arbol\",\"arbol\",\"arbol\",\"arbol\",\"arbol\",\"arbol\",\"arbol\",\"arbol\",\"arbol\",\"adios\"]'),
(25, '2868', NULL, '[\"nuevo\"]');

-- --------------------------------------------------------

--
-- Table structure for table `child_notes`
--

CREATE TABLE `child_notes` (
  `id` bigint(20) NOT NULL,
  `child_id` varchar(128) NOT NULL,
  `note` varchar(256) NOT NULL,
  `note_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `child_notes`
--

INSERT INTO `child_notes` (`id`, `child_id`, `note`, `note_date`) VALUES
(1, '12291', 'Hola como estaaaas', '2024-11-19 14:37:20'),
(2, '12291', 'Estoy cansado', '2024-11-19 14:37:28');

-- --------------------------------------------------------

--
-- Table structure for table `child_statistics`
--

CREATE TABLE `child_statistics` (
  `id` bigint(20) NOT NULL,
  `child_id` varchar(128) NOT NULL,
  `session_count` int(11) DEFAULT 0,
  `total_time_seconds` int(11) DEFAULT 0,
  `average_session_time_seconds` float DEFAULT 0,
  `last_session_start` datetime DEFAULT NULL,
  `last_session_end` datetime DEFAULT NULL,
  `total_words` int(11) DEFAULT 0,
  `dominated_words` text DEFAULT NULL,
  `difficult_words` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `child_users`
--

CREATE TABLE `child_users` (
  `id` bigint(20) NOT NULL,
  `tutor_id` varchar(128) NOT NULL,
  `uuid` varchar(128) NOT NULL,
  `name` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `child_users`
--

INSERT INTO `child_users` (`id`, `tutor_id`, `uuid`, `name`) VALUES
(29, '2979', '09260', 'AaJFO8ZCmd2Sv1NMViZPcw=='),
(30, '2979', '71415', 'Ppif+phbI+fHT0CpxlBtFQ=='),
(31, '2979', '28289', 'bwbMPyQ9uCqDXE090gzvjQ=='),
(32, '08463', '33598', 'koZM3bMQRA9/KrGGicQ7yw=='),
(45, '08463', '3240', 'E6knc3TN8BIYjKZx3uF57w=='),
(46, '08463', '60516', 'RcD+XqYZI3gwcsRFpNGqwA=='),
(47, '4405', '12291', 'MD54cn0ai7yvOjmLSeRvJQ=='),
(48, '4405', '2565', 'rzvS/Mdrn7uDd3Z2ltRkjQ=='),
(49, '48092', '35373', 'ioHmeDOjXq/zB7/gmjUw5g=='),
(50, '48092', '2868', 'eWUm55eCrjo1bYKg8Qr6yA==');

-- --------------------------------------------------------

--
-- Table structure for table `tutor_users`
--

CREATE TABLE `tutor_users` (
  `id` bigint(20) NOT NULL,
  `user_id` varchar(128) NOT NULL,
  `user_name` varchar(128) NOT NULL,
  `user_lastname` varchar(128) NOT NULL,
  `user_email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `date` varchar(128) NOT NULL,
  `has_perm` tinyint(1) NOT NULL DEFAULT 0,
  `is_adm` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tutor_users`
--

INSERT INTO `tutor_users` (`id`, `user_id`, `user_name`, `user_lastname`, `user_email`, `password`, `date`, `has_perm`, `is_adm`) VALUES
(50, '08463', 'mg/A95wlcEqcZS8K++L1Dw==', 'P8jRkl8jSf6rAkeO1Xm/qw==', '047d0b51a2f083f6e858c96c94dbb37e', 'c93ccd78b2076528346216b3b2f701e6', '24-11-13', 0, 0),
(51, '2979', 'mg/A95wlcEqcZS8K++L1Dw==', 'AkAS2eeUV2ESDemerypmVQ==', '8d9ba6e325fb95d027a85311b33576fa', 'c93ccd78b2076528346216b3b2f701e6', '24-11-13', 0, 0),
(52, '4405', 'MD54cn0ai7yvOjmLSeRvJQ==', 'oysJDxt3TOcwOrPlyRJFcw==', '0b52f467013c4de5da37ec7d9210485b', 'c48214d919a58f16f4780e92c94c78df', '24-11-19', 0, 0),
(53, '48092', 'ioHmeDOjXq/zB7/gmjUw5g==', 'DP9kKlSsllQbqw/IsPFTpQ==', '976d94fd882d43f445cb03d3076b8278', '2423b1c8171f028ddb8e59570ff8f7ae', '24-11-20', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `child_config`
--
ALTER TABLE `child_config`
  ADD PRIMARY KEY (`id`),
  ADD KEY `child_uuid` (`child_uuid`);

--
-- Indexes for table `child_notes`
--
ALTER TABLE `child_notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `child_id` (`child_id`);

--
-- Indexes for table `child_statistics`
--
ALTER TABLE `child_statistics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `child_id` (`child_id`);

--
-- Indexes for table `child_users`
--
ALTER TABLE `child_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`),
  ADD KEY `tutor_id` (`tutor_id`);

--
-- Indexes for table `tutor_users`
--
ALTER TABLE `tutor_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `child_config`
--
ALTER TABLE `child_config`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `child_notes`
--
ALTER TABLE `child_notes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `child_statistics`
--
ALTER TABLE `child_statistics`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `child_users`
--
ALTER TABLE `child_users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `tutor_users`
--
ALTER TABLE `tutor_users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `child_config`
--
ALTER TABLE `child_config`
  ADD CONSTRAINT `child_config_ibfk_1` FOREIGN KEY (`child_uuid`) REFERENCES `child_users` (`uuid`) ON DELETE CASCADE;

--
-- Constraints for table `child_notes`
--
ALTER TABLE `child_notes`
  ADD CONSTRAINT `child_notes_ibfk_1` FOREIGN KEY (`child_id`) REFERENCES `child_users` (`uuid`) ON DELETE CASCADE;

--
-- Constraints for table `child_statistics`
--
ALTER TABLE `child_statistics`
  ADD CONSTRAINT `child_statistics_ibfk_1` FOREIGN KEY (`child_id`) REFERENCES `child_users` (`uuid`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `child_users`
--
ALTER TABLE `child_users`
  ADD CONSTRAINT `child_users_ibfk_1` FOREIGN KEY (`tutor_id`) REFERENCES `tutor_users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
