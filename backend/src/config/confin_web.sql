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
  `1` int NOT NULL AUTO_INCREMENT,
  `author_id` int NOT NULL,
  `post_id` int NOT NULL,
  `text` text COLLATE utf8mb4_bin NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `visible` bit(1) NOT NULL DEFAULT (1),
  PRIMARY KEY (`1`),
  KEY `FK_comments_users` (`author_id`),
  KEY `FK_comments_posts` (`post_id`),
  CONSTRAINT `FK_comments_posts` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `FK_comments_users` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Volcando datos para la tabla confin_web.comments: ~0 rows (aproximadamente)

-- Volcando estructura para tabla confin_web.config
CREATE TABLE IF NOT EXISTS `config` (
  `id` int NOT NULL AUTO_INCREMENT,
  `param` varchar(50) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `value` varchar(50) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `description` varchar(50) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Volcando datos para la tabla confin_web.config: ~0 rows (aproximadamente)

-- Volcando estructura para tabla confin_web.posts
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `text` text COLLATE utf8mb4_bin NOT NULL,
  `author_id` int NOT NULL DEFAULT (0),
  `category` int NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `visible` bit(1) NOT NULL DEFAULT (1),
  PRIMARY KEY (`id`),
  KEY `FK_posts_users` (`author_id`),
  KEY `FK_posts_post_categories` (`category`),
  CONSTRAINT `FK_posts_post_categories` FOREIGN KEY (`category`) REFERENCES `post_categories` (`id`),
  CONSTRAINT `FK_posts_users` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Volcando datos para la tabla confin_web.posts: ~0 rows (aproximadamente)

-- Volcando estructura para tabla confin_web.post_categories
CREATE TABLE IF NOT EXISTS `post_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `description` tinytext COLLATE utf8mb4_bin,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Volcando datos para la tabla confin_web.post_categories: ~6 rows (aproximadamente)
INSERT IGNORE INTO `post_categories` (`id`, `name`, `description`) VALUES
	(1, 'novedades', 'novedades de el confin'),
	(2, 'avisos', 'avisos de el confin'),
	(3, 'historias', 'historias de el confin'),
	(4, 'wow_novedades', 'novedades wow'),
	(5, 'wow_avisos', 'avisos wow'),
	(6, 'wow_historias', 'historias wow');

-- Volcando estructura para tabla confin_web.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Volcando datos para la tabla confin_web.roles: ~3 rows (aproximadamente)
INSERT IGNORE INTO `roles` (`id`, `name`) VALUES
	(1, 'admin'),
	(2, 'moderador'),
	(3, 'usuario');

-- Volcando estructura para tabla confin_web.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `username` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `email` varchar(50) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `password` binary(32) NOT NULL,
  `online` tinyint NOT NULL DEFAULT (0),
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `role` int NOT NULL,
  `banned` bit(1) NOT NULL DEFAULT (0),
  `banned_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `FK_users_roles` (`role`),
  CONSTRAINT `FK_users_roles` FOREIGN KEY (`role`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Volcando datos para la tabla confin_web.users: ~0 rows (aproximadamente)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
