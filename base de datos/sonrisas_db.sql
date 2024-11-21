-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 21, 2024 at 10:56 AM
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
(56, '4044', '9u9f3gV9I9/FXdXgceZUFg==', '50MY5khs3L05Bfv01f7xtg==', 'e72e8328842d839eb9cef42ec0958eb6', '81dc9bdb52d04dc20036dbd8313ed055', '24-11-21', 1, 1);

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `child_notes`
--
ALTER TABLE `child_notes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `child_statistics`
--
ALTER TABLE `child_statistics`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `child_users`
--
ALTER TABLE `child_users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `tutor_users`
--
ALTER TABLE `tutor_users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

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
