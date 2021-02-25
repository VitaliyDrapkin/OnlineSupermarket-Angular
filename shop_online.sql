CREATE DATABASE  IF NOT EXISTS `shop_online` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `shop_online`;
-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: shop_online
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cartitems`
--

DROP TABLE IF EXISTS `cartitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartitems` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productId` int DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `totalPrice` float DEFAULT NULL,
  `cartId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cartItem-product_idx` (`productId`),
  KEY `cartItem-cart_idx` (`cartId`),
  CONSTRAINT `cartItem-cart` FOREIGN KEY (`cartId`) REFERENCES `carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cartItem-product` FOREIGN KEY (`productId`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartitems`
--

LOCK TABLES `cartitems` WRITE;
/*!40000 ALTER TABLE `cartitems` DISABLE KEYS */;
INSERT INTO `cartitems` VALUES (123,77,3,7.2,44),(124,87,3,14.4,44),(125,92,1,7.2,44),(127,106,3,8.7,44),(128,108,1,12,44),(129,79,1,3.2,44),(130,110,1,4.5,44),(131,85,2,4.2,44),(132,77,1,2.4,45),(133,78,3,7.8,45),(134,79,2,6.4,45),(135,82,2,4.2,46),(136,96,3,6.9,46),(137,101,2,3.6,46);
/*!40000 ALTER TABLE `cartitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cart-users_idx` (`userId`),
  CONSTRAINT `cart-users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (44,321362592,'2021-02-20 16:33:48'),(45,321362592,'2021-02-20 16:43:15'),(46,321362592,'2021-02-20 16:45:47');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (3,'Bakery products'),(1,'Dairy'),(5,'For animals'),(4,'For home'),(2,'Meat products');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  `price` float DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product-category_idx` (`categoryId`),
  CONSTRAINT `product-category` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (77,'Milk 3%',1,2.4,'1613815546601k.png'),(78,'Milk 1%',1,2.6,'16138181474771.png'),(79,'Rivion',1,3.2,'1613818171242n.png'),(80,'Cottage',1,1.8,'1613818198378e.png'),(81,'Yogurt',1,1.8,'1613818221217t.png'),(82,'GO peach',1,2.1,'1613818287717k.png'),(83,'GO ananas',1,2.1,'1613818306543s.png'),(84,'GO kinamon',1,2.1,'1613818334058n.png'),(85,'GO strawberry',1,2.1,'1613818419411t.png'),(86,'Hamburger',2,5.3,'1613818760580r.png'),(87,'Kebab',2,4.8,'1613818816810b.png'),(88,'Lamb kebab',2,7.2,'1613818876015s.png'),(89,'Sausage PREMIUM',2,4.2,'1613818966951t.png'),(90,'Sausage',2,3.6,'1613819071194m.png'),(91,'Spring chicken',2,7.2,'1613819157313t.png'),(92,'Schnitzel',2,7.2,'1613819192420l.png'),(93,'Beef wings',2,7.4,'1613819283864m.png'),(94,'Beef hearts',2,8.2,'1613819479448v.png'),(95,'Beed liver',2,8.2,'1613819550561d.png'),(96,'Bread',3,2.3,'1613820098827d.png'),(97,'Blueberry bread',3,3.6,'1613820150629t.png'),(98,'Whole wheat bread',3,2.5,'1613820184290e.png'),(99,'Cheese borax 100g',3,1.8,'1613820257523a.png'),(100,'Mushroom borax 100g',3,1.8,'1613820301574t.png'),(101,'Potato borax 100g',3,1.8,'1613820335890a.png'),(102,'Chocolate chips',3,4.5,'1613820380308s.png'),(103,'White chocolate cookies',3,3.7,'1613820683853n.png'),(104,'Milk chocolate cookies',3,3.7,'1613820709467v.png'),(105,'Fairy limon',4,9.2,'1613821037057n.png'),(106,'Wipes',4,2.9,'1613821069326m.png'),(107,'Toilet Paper',4,8.4,'1613821101339t.png'),(108,'Floor cleaning',4,12,'1613821130909a.png'),(109,'Disinfectant spray',4,6.5,'1613821155882y.png'),(110,'Bonzo',5,4.5,'1613821342845o.png'),(111,'Treats for dogs',5,7.8,'1613821383234m.png'),(112,'Treats for cats',5,7.8,'1613821407485l.png'),(113,'Food for cats',5,16,'1613821437103m.png'),(114,'Food for dogs',5,8.5,'1613821455831f.png'),(115,'Ultima',5,7.6,'1613821475599a.png');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchases`
--

DROP TABLE IF EXISTS `purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchases` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `cartId` int DEFAULT NULL,
  `totalPrice` float DEFAULT NULL,
  `cityDelivery` varchar(45) DEFAULT NULL,
  `streetDelivery` varchar(45) DEFAULT NULL,
  `dateDelivery` date DEFAULT NULL,
  `datePurchase` date DEFAULT NULL,
  `fourDigits` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `purchases-users_idx` (`userId`),
  KEY `purchases-carts_idx` (`cartId`),
  CONSTRAINT `purchases-carts` FOREIGN KEY (`cartId`) REFERENCES `carts` (`id`),
  CONSTRAINT `purchases-users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchases`
--

LOCK TABLES `purchases` WRITE;
/*!40000 ALTER TABLE `purchases` DISABLE KEYS */;
INSERT INTO `purchases` VALUES (19,321362592,44,61.4,'Petah Tikva','Tel Hay','2021-02-22','2021-02-20',3434),(20,321362592,45,16.6,'Petah Tikva','Tel Hay','2021-02-22','2021-02-20',3333),(21,321362592,46,14.7,'Petah Tikva','Tel Hay','2021-03-01','2021-02-20',2222);
/*!40000 ALTER TABLE `purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `street` varchar(45) DEFAULT NULL,
  `userType` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=987987988 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (321362592,'Vitaliy','Drapkin','drapkinvitaliy@gmail.com','cab11bb70f7466563d4b912d153bd0b5','Petah Tikva','Tel Hay','user'),(777777777,'admin','admin','admin@gmail.com','55716ba2c1f22669f8ef1935d30f3a16','Tel aviv','admin','admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-20 16:52:35
