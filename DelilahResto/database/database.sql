SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `delilah_resto_db` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `delilah_resto_db`;

DROP TABLE IF EXISTS `Orders`;
CREATE TABLE `Orders` (
  `order_id` int(11) NOT NULL,
  `order_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `order_state` enum('new','cooking','confirmed','sending','canceled','delivered') DEFAULT 'new',
  `order_description` varchar(255) NOT NULL,
  `order_form_payment` enum('cash','card') DEFAULT NULL,
  `order_total_price` double(40,2) NOT NULL,
  `order_id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `Orders` (`order_id`, `order_time`, `order_state`, `order_description`, `order_form_payment`, `order_total_price`, `order_id_user`) VALUES
(1, '2020-06-23 17:05:27', 'cooking', '2 hamburguesas', 'cash', 36000.00, 1),
(12, '2020-06-23 18:39:01', 'new', '3 pizzas y 1 hamburguesa', 'cash', 63000.00, 1),
(18, '2020-06-23 18:48:36', 'new', '3 pizzas y 1 hamburguesa', 'cash', 63000.00, 1),
(19, '2020-06-23 19:01:08', 'new', '1 perro caliente y 1 hamburguesa', 'cash', 28000.00, 5),
(20, '2020-06-23 22:26:49', 'new', '1 pizza', 'card', 15000.00, 5),
(21, '2020-06-30 18:25:41', 'new', '1 pizza y 2 hamburguesas', 'card', 15000.00, 8);

DROP TABLE IF EXISTS `Order_detail`;
CREATE TABLE `Order_detail` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `Order_detail` (`order_id`, `product_id`, `quantity`) VALUES
(1, 1, 2),
(12, 3, 3),
(12, 1, 1),
(18, 3, 3),
(18, 1, 1),
(19, 2, 1),
(19, 1, 1),
(20, 3, 1),
(21, 3, 1),
(21, 1, 2);

DROP TABLE IF EXISTS `Products`;
CREATE TABLE `Products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_price` double(40,2) NOT NULL,
  `product_description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `Products` (`product_id`, `product_name`, `product_price`, `product_description`) VALUES
(1, 'hamburguesa doble', 18000.00, 'hamburguesa de queso simple carne de 120 g con queso mozzarella, salsa de tomate, mayonesa, mostaza, pan artesanal, encurtidos y tomate, cebolla y lechuga romana'),
(2, 'Perro caliente', 10000.00, 'perro caliente especial'),
(3, 'Pizza', 15000.00, 'contiene queso, salsa de tomate, piña y trozos de jamón'),
(7, 'Tacos', 14000.00, 'mexicano con carne y queso');

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_lastname` varchar(255) NOT NULL,
  `user_mail` varchar(255) NOT NULL,
  `user_phone` bigint(11) DEFAULT NULL,
  `user_address` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_active` tinyint(1) NOT NULL DEFAULT 0,
  `user_admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `Users` (`user_id`, `user_name`, `user_lastname`, `user_mail`, `user_phone`, `user_address`, `user_password`, `user_active`, `user_admin`) VALUES
(1, 'Juan', 'Rojas', 'juan@correo.com', 3012392132, 'calle 54 # 54 5', '123456789', 0, 1),
(5, 'Pedro', 'Rodriguez', 'pedro@correo.com', 124132321, 'calle 25 # 27 5', '123456789', 0, 0),
(8, 'Jose', 'Perez', 'jose@correo.com', 3212837253, 'calle 12 # 6 87', '123456789', 0, 0);


ALTER TABLE `Orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `order_id_user` (`order_id_user`);

ALTER TABLE `Order_detail`
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

ALTER TABLE `Products`
  ADD PRIMARY KEY (`product_id`);

ALTER TABLE `Users`
  ADD PRIMARY KEY (`user_id`);


ALTER TABLE `Orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

ALTER TABLE `Products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

ALTER TABLE `Users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;


ALTER TABLE `Orders`
  ADD CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`order_id_user`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `Order_detail`
  ADD CONSTRAINT `Order_detail_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Order_detail_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `Products` (`product_id`);
COMMIT;