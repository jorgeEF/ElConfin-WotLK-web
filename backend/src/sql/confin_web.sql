-- --------------------------------------------------------
-- Host:                         192.168.1.10
-- Versión del servidor:         8.4.4 - MySQL Community Server - GPL
-- SO del servidor:              Linux
-- HeidiSQL Versión:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para confin_web
CREATE DATABASE IF NOT EXISTS `confin_web` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `confin_web`;

-- Volcando estructura para tabla confin_web.comments
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author_id` int NOT NULL,
  `post_id` int NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `visible` bit(1) NOT NULL DEFAULT (1),
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_comments_users` (`author_id`),
  KEY `FK_comments_posts` (`post_id`),
  CONSTRAINT `FK_comments_posts` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `FK_comments_users` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Volcando datos para la tabla confin_web.comments: ~0 rows (aproximadamente)

-- Volcando estructura para tabla confin_web.config
CREATE TABLE IF NOT EXISTS `config` (
  `id` int NOT NULL AUTO_INCREMENT,
  `param` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `value` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `description` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Volcando datos para la tabla confin_web.config: ~0 rows (aproximadamente)

-- Volcando estructura para tabla confin_web.posts
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `author_id` int NOT NULL DEFAULT (0),
  `category_id` int NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `visible` bit(1) NOT NULL DEFAULT (1),
  `main_page` bit(1) NOT NULL DEFAULT (0),
  PRIMARY KEY (`id`),
  KEY `FK_posts_users` (`author_id`),
  KEY `FK_posts_post_categories` (`category_id`) USING BTREE,
  CONSTRAINT `FK_posts_post_categories` FOREIGN KEY (`category_id`) REFERENCES `post_categories` (`id`),
  CONSTRAINT `FK_posts_users` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Volcando datos para la tabla confin_web.posts: ~2 rows (aproximadamente)
INSERT IGNORE INTO `posts` (`id`, `title`, `content`, `author_id`, `category_id`, `created_at`, `visible`, `main_page`) VALUES
	(1, 'Portal de El Confín Gaming', 'En el portal de El Confín Gaming vas a encontrar todas las novedades de la comunidad.', 1, 1, '2025-01-31 13:45:43', b'1', b'1'),
	(2, 'Servidor World of Warcraft', 'Ya esta disponible nuestro servidor World of Warcraft 3.3.5a Wrath of the Lych King. Te esperamos!', 1, 2, '2025-01-31 14:36:52', b'1', b'0');

-- Volcando estructura para tabla confin_web.post_categories
CREATE TABLE IF NOT EXISTS `post_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `description` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Volcando datos para la tabla confin_web.post_categories: ~2 rows (aproximadamente)
INSERT IGNORE INTO `post_categories` (`id`, `name`, `description`) VALUES
	(1, 'novedades', 'novedades de el confin'),
	(2, 'wow_novedades', 'novedades wow');

-- Volcando estructura para tabla confin_web.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Volcando datos para la tabla confin_web.roles: ~3 rows (aproximadamente)
INSERT IGNORE INTO `roles` (`id`, `name`) VALUES
	(1, 'admin'),
	(2, 'cm'),
	(3, 'usuario');

-- Volcando estructura para tabla confin_web.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `password` binary(32) NOT NULL,
  `online` tinyint NOT NULL DEFAULT (0),
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `role` int NOT NULL DEFAULT (3),
  `banned` bit(1) NOT NULL DEFAULT (0),
  `banned_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `FK_users_roles` (`role`),
  CONSTRAINT `FK_users_roles` FOREIGN KEY (`role`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Volcando datos para la tabla confin_web.users: ~2 rows (aproximadamente)
INSERT IGNORE INTO `users` (`id`, `username`, `email`, `password`, `online`, `created_at`, `role`, `banned`, `banned_at`) VALUES
	(1, 'admin', 'jorgefemenia@gmail.com', _binary 0x94d9ecadba85b97ae982b69cb8235d71446b27523d80d654f09e003022b36bb7, 0, '2025-01-28 23:08:54', 1, b'0', NULL),
	(2, 'jeFFFFFFFx', 'jefponja@gmail.com', _binary 0xac8c7d135985254b6bac3520720d09e954892b68cac6cedddb5804d81f9187fb, 0, '2025-01-28 23:27:27', 1, b'0', NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
