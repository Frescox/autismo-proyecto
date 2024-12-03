-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-12-2024 a las 10:13:32
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sonrisas_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `child_config`
--

CREATE TABLE `child_config` (
  `id` bigint(20) NOT NULL,
  `child_uuid` varchar(128) NOT NULL,
  `config` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `words` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`words`)),
  `profile_pic` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `child_config`
--

INSERT INTO `child_config` (`id`, `child_uuid`, `config`, `words`, `profile_pic`) VALUES
(1, '86231', NULL, '[\"arbol\"]', NULL),
(2, '1551', '{\"header_footer\":\"#000000\",\"title\":\"#ffffff\",\"text\":\"#ffffff\",\"bg\":\"#525660\"}', NULL, NULL),
(3, '28957', NULL, NULL, NULL),
(4, '80977', NULL, '[]', NULL),
(5, '4947', NULL, NULL, NULL),
(6, '35688', '{\"header_footer\":\"#2b81ab\",\"title\":\"#ebeffa\",\"text\":\"#ba8787\",\"bg\":\"#f5bd8e\"}', '[\"Platano\"]', NULL),
(7, '4499', '{\"header_footer\":\"#5eba86\",\"title\":\"#cdd0db\",\"text\":\"#938080\",\"bg\":\"#e1d493\"}', '[\"Plato\",\"Salm\\u00f3n\",\"Marcos\"]', NULL),
(9, '67680', '{\"header_footer\":\"#70e1bf\",\"title\":\"#8f8a8a\",\"text\":\"#8d8b8b\",\"bg\":\"#516db8\"}', '[\"Platano\",\"Arbol\",\"Luna\",\"comida\",\"Gelatina\"]', NULL),
(10, '19071', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `child_notes`
--

CREATE TABLE `child_notes` (
  `id` bigint(20) NOT NULL,
  `child_id` varchar(128) NOT NULL,
  `note` varchar(256) NOT NULL,
  `note_date` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `child_notes`
--

INSERT INTO `child_notes` (`id`, `child_id`, `note`, `note_date`) VALUES
(1, '86231', 'Hola', '2024-11-23'),
(2, '86231', 'Adios', '2024-11-23'),
(3, '28957', 'Esta es mi primera nota', '2024-11-27'),
(4, '28957', 'Esta es mi segunda nota', '2024-11-27'),
(5, '28957', 'Son las 6 de la mañana', '2024-11-27'),
(6, '80977', 'Sopas', '2024-12-02'),
(7, '35688', 'HOL', '2024-11-29'),
(11, '67680', 'Hola como estas', '2024-11-29'),
(12, '67680', 'Quiero jugar', '2024-11-29'),
(13, '80977', 'Nieve', '2024-12-02'),
(14, '80977', 'Este es un buen dia', '2024-12-02'),
(15, '67680', 'Esta es la nota 1', '2024-12-02'),
(16, '67680', 'Esta es la nota 2', '2024-12-02'),
(17, '67680', 'Esta es la nota 3', '2024-12-02'),
(18, '67680', 'Esta es la nota 4', '2024-12-02'),
(19, '67680', 'Esta es la nota 5', '2024-12-02'),
(20, '80977', 'Bienvenida Sol', '2024-12-02'),
(21, '67680', 'Holaaaa', '2024-12-02'),
(22, '67680', 'Quiero manzana', '2024-12-02'),
(23, '4499', 'Hola esto es rial', '2024-12-02'),
(24, '67680', 'Luis', '2024-12-02'),
(25, '67680', 'Hola como estas', '2024-12-02'),
(26, '28957', 'Esta es la nota 1', '2024-12-03'),
(27, '28957', 'Esta es la nota 2', '2024-12-03'),
(28, '28957', 'Esta es la nota 3', '2024-12-03'),
(29, '28957', 'Esta es la nota 4', '2024-12-03'),
(30, '28957', 'Esta es la nota 5', '2024-12-03'),
(31, '28957', 'Esta es la ultima nota de verificación', '2024-12-03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `child_statistics`
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

--
-- Volcado de datos para la tabla `child_statistics`
--

INSERT INTO `child_statistics` (`id`, `child_id`, `session_count`, `total_time_seconds`, `average_session_time_seconds`, `last_session_start`, `last_session_end`, `total_words`, `dominated_words`, `difficult_words`) VALUES
(1, '86231', 1, 2, 2, '2024-11-23 21:44:15', '2024-11-23 21:44:18', 0, '', ''),
(2, '28957', 5, 89, 17.8, '2024-11-28 23:00:28', '2024-11-28 23:00:43', 0, 'árbol,pajaro,libro', ''),
(3, '80977', 19, 36, 1.89474, '2024-12-02 17:13:38', '2024-12-02 17:13:40', 0, '', ''),
(4, '35688', 4, 27, 6.75, '2024-12-02 17:05:27', '2024-12-02 17:05:29', 0, 'zapato', ''),
(5, '4499', 2, 152, 76, '2024-12-02 19:15:13', '2024-12-02 19:17:15', 0, 'gato', ''),
(7, '4947', 1, 3, 3, '2024-11-29 02:38:25', '2024-11-29 02:38:28', 0, '', ''),
(8, '67680', 16, 1703, 106.438, '2024-12-02 23:54:52', '2024-12-02 23:54:53', 0, 'nube,pelota,coche,pajaro,león,gelatina,pato,montaña,leche,luna,ratón,helado,zapato', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `child_users`
--

CREATE TABLE `child_users` (
  `id` bigint(20) NOT NULL,
  `tutor_id` varchar(128) NOT NULL,
  `uuid` varchar(128) NOT NULL,
  `name` varchar(128) NOT NULL,
  `profile_pic` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `child_users`
--

INSERT INTO `child_users` (`id`, `tutor_id`, `uuid`, `name`, `profile_pic`) VALUES
(52, '5273', '86231', 'MD54cn0ai7yvOjmLSeRvJQ==', 'images/profile_pic/6743bbdc64b34_fondo6.jpeg'),
(53, '5273', '1551', '7JYinVmZrFHuyxso9v6cxw==', 'images/profile_pic/67439f5654bbe_inventario.png'),
(54, '81157', '28957', 'hJ6YY0XYEHU2UpvcQw8YVw==', NULL),
(55, '81157', '80977', 'YB1iTGJFNb/V8ECG0w320A==', 'images/profile_pic/67497995cb2e7_Captura de pantalla 2024-05-09 200103.png'),
(56, '81157', '4947', '3WH3seoojsY/hVOCm9cCm/ZdC7A7Ua5m3t0Am4hcMc4=', 'images/profile_pic/674990eb56115_Captura de pantalla 2024-09-02 194637.png'),
(57, '81157', '35688', '2Lo4I/lKbmjn5QEQs/zgmg==', 'images/profile_pic/6749964d8cf45_Captura de pantalla 2024-10-08 222228.png'),
(58, '81157', '4499', 'Fy6KzDyKkjhJO9S+rSqd5g==', NULL),
(60, '81157', '67680', '07h0WJ8MI5cGh17W447qgg==', 'images/profile_pic/674eb96c8e422_Captura de pantalla 2024-10-10 121642.png'),
(61, '81157', '19071', 'XEs73AEdSGo+nZm97SBygg==', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tutor_users`
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
  `is_adm` tinyint(1) NOT NULL DEFAULT 0,
  `profile_picture` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tutor_users`
--

INSERT INTO `tutor_users` (`id`, `user_id`, `user_name`, `user_lastname`, `user_email`, `password`, `date`, `has_perm`, `is_adm`, `profile_picture`) VALUES
(56, '4044', '9u9f3gV9I9/FXdXgceZUFg==', '50MY5khs3L05Bfv01f7xtg==', 'e72e8328842d839eb9cef42ec0958eb6', '81dc9bdb52d04dc20036dbd8313ed055', '24-11-21', 1, 1, NULL),
(57, '5273', 'MD54cn0ai7yvOjmLSeRvJQ==', 'oysJDxt3TOcwOrPlyRJFcw==', '0b52f467013c4de5da37ec7d9210485b', 'c48214d919a58f16f4780e92c94c78df', '24-11-24', 1, 0, NULL),
(58, '81157', 'j/gTLMvKAtu/OC0eNzes9A==', '9q0LrDzQYjKIO8GiFoTwRA==', '2efc0b7a51a7aaab0f1665e7b2286e7d', '81dc9bdb52d04dc20036dbd8313ed055', '24-11-27', 1, 0, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `child_config`
--
ALTER TABLE `child_config`
  ADD PRIMARY KEY (`id`),
  ADD KEY `child_uuid` (`child_uuid`);

--
-- Indices de la tabla `child_notes`
--
ALTER TABLE `child_notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `child_id` (`child_id`);

--
-- Indices de la tabla `child_statistics`
--
ALTER TABLE `child_statistics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `child_id` (`child_id`);

--
-- Indices de la tabla `child_users`
--
ALTER TABLE `child_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`),
  ADD KEY `tutor_id` (`tutor_id`);

--
-- Indices de la tabla `tutor_users`
--
ALTER TABLE `tutor_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `child_config`
--
ALTER TABLE `child_config`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `child_notes`
--
ALTER TABLE `child_notes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `child_statistics`
--
ALTER TABLE `child_statistics`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `child_users`
--
ALTER TABLE `child_users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT de la tabla `tutor_users`
--
ALTER TABLE `tutor_users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `child_config`
--
ALTER TABLE `child_config`
  ADD CONSTRAINT `child_config_ibfk_1` FOREIGN KEY (`child_uuid`) REFERENCES `child_users` (`uuid`) ON DELETE CASCADE;

--
-- Filtros para la tabla `child_notes`
--
ALTER TABLE `child_notes`
  ADD CONSTRAINT `child_notes_ibfk_1` FOREIGN KEY (`child_id`) REFERENCES `child_users` (`uuid`) ON DELETE CASCADE;

--
-- Filtros para la tabla `child_statistics`
--
ALTER TABLE `child_statistics`
  ADD CONSTRAINT `child_statistics_ibfk_1` FOREIGN KEY (`child_id`) REFERENCES `child_users` (`uuid`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `child_users`
--
ALTER TABLE `child_users`
  ADD CONSTRAINT `child_users_ibfk_1` FOREIGN KEY (`tutor_id`) REFERENCES `tutor_users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
