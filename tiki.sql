-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 08, 2022 at 08:19 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tiki`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `id_address` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `address_name` int(11) NOT NULL,
  `detail_address` text DEFAULT NULL,
  `id_village` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`id_address`, `id_user`, `address_name`, `detail_address`, `id_village`) VALUES
(1, 14, 1, '0 thanh sơn', 1),
(2, 14, 2, '05 hà an', 4);

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `image` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `banner`
--

INSERT INTO `banner` (`id`, `name`, `image`) VALUES
(1, 'slider_home_top', '6d1081c182e499deccfe69b0ca9267cb.png.webp'),
(2, 'slider_home_top', 'a3b1f110674e3f26e9261ae91a13785c.png.webp'),
(3, 'slider_home_top', 'a63a6f4da7d8c4eaf8ddd5bf0d08b215.png.webp'),
(4, 'slider_home_top', '5007997d70a63c80f485b9d5f8de3f0d.png.webp'),
(5, 'slider_home_top', '3fcc916825ec67ad18f6c65ad9e52be9.png.webp'),
(6, 'banner_home_top', 'af3448aca37a32e3ef189321fd8e2814.png.webp'),
(7, 'banner_home_middle_1_left', '30144f1203eeb3113245ae21335a9c9c.png.webp'),
(8, 'banner_home_middle_1_right', 'dc8b727682f614ac2d937b0b4f6aa012.png.webp'),
(9, 'banner_home_middle_1_center', 'a68af2c379a0a944735c61f7c1a76deb.png.webp'),
(10, 'banner_home_middle_2', 'deec428f1587420a01cfb1dacf229478.png.webp'),
(11, 'banner_home_middle_2', '3c94d7fd2c6e56e08fd9cbfcc8022788.png.webp'),
(12, 'banner_home_middle_2', 'cfffb96d7d8d89b4573defccfa1e623a.png.webp'),
(13, 'banner_home_middle_2', '8449cbe5de3e95e7a490934e6cb3c2df.png.webp'),
(14, 'banner_home_bottom', '3af1c9afc403aba2cc9ab88aeb872d69.png.webp'),
(15, 'banner_home_bottom', 'fe573a1bc3cb2f8d9027c6bcab4c5fe4.png.webp'),
(16, 'banner_home_bottom', 'abb14b96fb7aa25be2f2902d0e3d6712.png.webp');

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `id_brand` int(11) NOT NULL,
  `brand_name` text NOT NULL,
  `brand_type` text DEFAULT NULL,
  `brand_image` text DEFAULT NULL,
  `slogan` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`id_brand`, `brand_name`, `brand_type`, `brand_image`, `slogan`) VALUES
(1, 'tp-link', 'genuine', 'b35306f6cd5f0da4354cd68fd8f160f2.jpg.webp', ''),
(2, 'vinamilk', 'genuine', '072bf4a3d07151518c7b43757bcb3434.png.webp', ''),
(3, 'Sabeco', 'genuine', '0c9ff41b64f251a7a2308a80fe2589a5.png.webp', ''),
(4, 'Lanenige', 'genuine', '48e3b4a02d7d11f332b1615b6b6a74bf.png.webp', ''),
(5, 'Anta', 'genuine', '6676fe9a5755ce4be3e8aa9f785315bf.jpg.webp', ''),
(6, 'Vua nệm', 'genuine', 'b4475a5b38917c51c1652432aacb2d62.png.webp', ''),
(7, 'pampers', 'genuine', '40443bec7984c782a4058f655eb9e732.png.webp', ''),
(8, 'Oribe', 'genuine', '8bdcb1f34df63a0b373cf71ff5d12b13.png.webp', '');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id_cart` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_shop` int(11) NOT NULL,
  `id_product` varchar(50) NOT NULL,
  `id_size` int(11) DEFAULT NULL,
  `id_color` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id_cart`, `id_user`, `id_shop`, `id_product`, `id_size`, `id_color`, `quantity`) VALUES
(1, 23, 3, 'PD003', 1, 2, 3),
(2, 23, 1, 'PD001', 5, 4, 3),
(3, 23, 4, 'PD004', 7, NULL, 4),
(17, 23, 5, 'PD006', NULL, NULL, 2),
(21, 23, 1, 'PD001', 2, 2, 5),
(23, 23, 1, 'PD001', 1, 2, 3),
(24, 23, 4, 'PD012', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id_cate` int(11) NOT NULL,
  `cate_name` text NOT NULL,
  `img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id_cate`, `cate_name`, `img`) VALUES
(1, 'Men\'s fashion', 'img'),
(2, 'market', 'img'),
(3, 'department store', ''),
(4, 'house', ''),
(5, 'electronic', ''),
(6, 'digital device', ''),
(7, 'Phone', ''),
(8, 'Mom & Baby', ''),
(9, 'Beautify', ''),
(10, 'Appliances', 'Female\'s Fashion'),
(11, 'balo & vali', ''),
(12, 'accessory', ''),
(13, 'clock', ''),
(14, 'laptop', ''),
(15, 'car', ''),
(16, 'book', ''),
(17, 'sport', ''),
(18, 'camera', ''),
(19, 'Female\'s Fashion', '');

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `id_city` int(11) NOT NULL,
  `city_name` text CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`id_city`, `city_name`) VALUES
(1, 'Đà Nẵng'),
(2, 'Quảng Nam'),
(3, 'Hồ Chí Minh'),
(4, 'Hà Nội'),
(5, 'Hải Phòng'),
(6, 'Cần Thơ'),
(7, 'Quảng Ngãi');

-- --------------------------------------------------------

--
-- Table structure for table `color`
--

CREATE TABLE `color` (
  `id_color` int(11) NOT NULL,
  `id_product` varchar(50) NOT NULL,
  `color_name` text NOT NULL,
  `color_quantity` int(11) DEFAULT NULL,
  `color_image` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `color`
--

INSERT INTO `color` (`id_color`, `id_product`, `color_name`, `color_quantity`, `color_image`) VALUES
(1, 'PD001', 'Vàng', 200, '1'),
(2, 'PD001', 'Trắng nâu', 200, '177'),
(3, 'PD003', 'đen', 200, '178'),
(4, 'PD003', 'nâu', 200, '179');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id_cmt` int(11) NOT NULL,
  `id_product` varchar(50) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_parent` int(11) DEFAULT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id_cmt`, `id_product`, `id_user`, `id_parent`, `content`) VALUES
(1, 'PD001', 6, NULL, 'tôi đã thực hiện được'),
(2, 'PD003', 2, NULL, 'hướng dẫn chưa được chi tiết ');

-- --------------------------------------------------------

--
-- Table structure for table `config`
--

CREATE TABLE `config` (
  `id_config` int(11) NOT NULL,
  `id_product` varchar(50) NOT NULL,
  `config_name` text NOT NULL,
  `config_quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `detail_order`
--

CREATE TABLE `detail_order` (
  `id_detail_order` int(11) NOT NULL,
  `id_order` int(11) NOT NULL,
  `id_product` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detail_order`
--

INSERT INTO `detail_order` (`id_detail_order`, `id_order`, `id_product`, `quantity`, `price`) VALUES
(1, 3, 'PD003', 100, 110000),
(2, 3, 'PD005', 100, 200000),
(3, 2, 'PD003', 100, 30000);

-- --------------------------------------------------------

--
-- Table structure for table `detail_promotion`
--

CREATE TABLE `detail_promotion` (
  `id_promotion` int(11) NOT NULL,
  `id_product` varchar(50) NOT NULL,
  `remaining_quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detail_promotion`
--

INSERT INTO `detail_promotion` (`id_promotion`, `id_product`, `remaining_quantity`) VALUES
(1, 'PD001', 10),
(1, 'PD002', 11),
(1, 'PD003', 11),
(1, 'PD004', 2),
(1, 'PD005', 11),
(1, 'PD006', 11);

-- --------------------------------------------------------

--
-- Table structure for table `district`
--

CREATE TABLE `district` (
  `id_district` int(11) NOT NULL,
  `district_name` text CHARACTER SET utf8 NOT NULL,
  `id_city` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `district`
--

INSERT INTO `district` (`id_district`, `district_name`, `id_city`) VALUES
(1, 'Hải Châu', 1),
(2, 'Cẩm Lệ', 1),
(3, 'Thanh Khê', 1),
(4, 'Liên Chiểu', 1),
(5, 'Ngũ Hành Sơn', 1),
(6, 'Sơn Trà', 1),
(7, 'Hòa Vang', 1),
(8, 'Hoàng Sa', 1);

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `id_img` int(11) NOT NULL,
  `id_product` varchar(50) NOT NULL,
  `image_name` text DEFAULT NULL,
  `image_link` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`id_img`, `id_product`, `image_name`, `image_link`) VALUES
(1, 'PD001', NULL, '1da14c66148dfa52d7bb2cdc3d6b1e94.png.webp'),
(2, 'PD002', NULL, '0e76ff00526d4c30810693d8074f3987.png.webp'),
(3, 'PD002', NULL, '19271bda2acaf6b46d10d64b5028cc03.jpg.webp'),
(4, 'PD003', NULL, 'a04f8df01e737d52d0e284eab45f98a3.jpg.webp'),
(6, 'PD003', NULL, 'f0794783f68bf6c0c828b8d055111a3b.jpg.webp'),
(12, 'PD003', NULL, '05bd5f887defd065090e0d258a132a62.jpg.webp'),
(14, 'PD003', NULL, 'fc102b802ef441468d145cb85f9f188a.jpg.webp'),
(15, 'PD004', NULL, 'c6233b9cf5225a8c2e8dd4513377587c.jpg.webp'),
(16, 'PD004', NULL, '23d7ae3e934e88827a7904782e90c0e8.jpg.webp'),
(121, 'PD005', NULL, '5902348798cc799725ec13d31e5ab631.jpg.webp'),
(122, 'PD005', NULL, 'bba8654e46e2881ae1e1a55b824284a6.jpg.webp'),
(123, 'PD006', NULL, '67e78740ef04cefec6b19e958ca35ff4.jpg.webp'),
(152, 'PD006', NULL, 'shopping.png'),
(157, 'PD012', NULL, 'f20a0f45ef3784ab3fafa43cfadc5aa1.jpg.webp'),
(158, 'PD012', NULL, '2d73c32427c2dbe16e95fa948fdb7432.jpg.webp'),
(159, 'PD014', NULL, 'fa4de2f6ddecbda8ab13561e75123a1f.jpg.webp'),
(160, 'PD014', NULL, '2bc09e4668aaae049f944896c4564cb0.png.webp'),
(161, 'PD015', NULL, '721f2779c1e98478e519494e2e48ecb6.jpg.webp'),
(162, 'PD015', NULL, 'e08d8ee741280328a5ca19f175c8725d.jpg.webp'),
(167, 'PD007', NULL, '0761c119ae0645b3031b7f546160b4e3.jpg.webp'),
(168, 'PD007', NULL, 'e076edffb68c675710fa0fb3f678a781.jpg (1).webp'),
(169, 'PD011', NULL, 'e563dc0fae452b65eae37ec28adbc563.png.webp'),
(170, 'PD011', NULL, '430135f90ebee744a0de4fc2e12ae3a2.png.webp'),
(171, 'PD016', NULL, '82de01aef730dcbe0804f000c9e413f7.jpg.webp'),
(172, 'PD016', NULL, '3f42cdfcccd8680f90e0f566384a1948.jpg.webp'),
(173, 'PD003', NULL, '2b74c9cc9b4b0fca0ed1125203704869.jpg'),
(174, 'PD003', NULL, 'download.jpg'),
(175, 'PD003', NULL, 'H17BU20003.jpg'),
(176, 'PD003', NULL, '99edae2cc38ff918c74b595ea2e46307.jpg'),
(177, 'PD001', NULL, 'downloadtrangnau.jpg'),
(178, 'PD003', NULL, '3b870440ae742b93a470e3e09763bef2.jpg'),
(179, 'PD003', NULL, 'balo-kim-long-032-nau-2.jpg\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id_order` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_address` int(11) DEFAULT NULL,
  `date_create` datetime NOT NULL DEFAULT current_timestamp(),
  `date_received` datetime DEFAULT NULL,
  `id_village` int(11) DEFAULT NULL,
  `detail_address` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id_order`, `id_user`, `id_address`, `date_create`, `date_received`, `id_village`, `detail_address`) VALUES
(2, 1, NULL, '2022-08-14 09:19:39', '2022-08-14 14:08:19', 4, '02 thanh sơn'),
(3, 2, NULL, '2022-08-14 09:20:06', '2022-08-14 14:08:19', 5, '02 thanh hải');

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

CREATE TABLE `permission` (
  `id_permission` int(11) NOT NULL,
  `name` varchar(30) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `permission`
--

INSERT INTO `permission` (`id_permission`, `name`) VALUES
(1, 'Khách hàng'),
(2, 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id_product` varchar(50) NOT NULL,
  `id_shop` int(11) DEFAULT NULL,
  `id_type` int(11) DEFAULT NULL,
  `id_promotion` int(11) DEFAULT NULL,
  `id_brand` int(11) DEFAULT NULL,
  `product_name` text NOT NULL,
  `description` text NOT NULL,
  `quantity` int(11) NOT NULL,
  `status` varchar(50) CHARACTER SET utf8 DEFAULT NULL CHECK (`status` in ('visible','disable')),
  `price` decimal(15,2) NOT NULL,
  `note` text DEFAULT NULL,
  `view` int(11) DEFAULT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id_product`, `id_shop`, `id_type`, `id_promotion`, `id_brand`, `product_name`, `description`, `quantity`, `status`, `price`, `note`, `view`, `date`) VALUES
('PD001', 1, 1, 1, 1, 'Áo Polo YODY Nam Cafe Phối Nẹp Trẻ Trung Chống Tia UV Hữu Hiệu - APM3635', 'Salad bơ sốt muối là món ăn quen thuộc với các gia đình yêu thích ẩm thực, văn hóa và con người Nhật Bản. Nếu ăn đúng cách và không quá nhiều, thì bơ là loại quả tốt cho sức khỏe. Một loạt các nghiên cứu cho thấy việc tăng cường tiêu thụ bơ giúp giảm nguy cơ bệnh tim, tiểu đường và béo phì, hỗ trợ giảm cân, tăng năng lượng, tốt cho mái tóc và làn da.', 1000, 'visible', '379000.00', 'https://bep360.net/cach-lam-salad-bo-sot-muoi-thom-ngon-de-lam-tai-nha.html', 233, '2022-06-22 10:06:33'),
('PD002', 2, 3, 1, 2, 'Áo vest nam 1 nút ôm body màu đen chất liệu co dãn , thoáng mát', 'Gỏi thịt gà cuộn bơ là món ăn quen thuộc với rất nhiều gia đình, đặc biệt là các gia đình quan tâm đến chế độ dinh dưỡng và những đồ ăn lành mạnh, healthy. Trong những ngày nóng bức này thì lựa chọn món gỏi là vô cùng hợp lý.', 1000, 'visible', '598.00', 'https://bep360.net/cach-lam-goi-thit-ga-cuon-bo-thom-ngon-hap-dan-cuc-don-gian.html', 5, '2022-06-07 10:49:05'),
('PD003', 3, 9, 1, 4, 'Combo 4 quần lót nam tam giác Bamboo Organic mềm mịn thoáng mát thấm hút mồ hôi - MRM Manlywear - Màu Ngẫu Nhiên', 'Mì udon chanh lạnh là món ăn mùa hè giúp giảm cân từng gây bão mạng xã hội Nhật khoảng năm 2018. Món ăn tuy có thịt nhưng cực kì thanh đạm luôn nhé!', 1000, 'visible', '200000.00', 'https://bep360.net/cach-lam-mi-udon-chanh-lanh-thom-ngon-dung-chuan-vi-nhat-ban.html', 0, '2022-06-22 10:08:28'),
('PD004', 4, 5, 1, 5, 'Áo sơ mi nam trơn tay dài cao cấp Lados - 779 chất kate lụa mềm mát, thấm hút mồ hôi', 'Cá hồi sốt chanh mật ong là món ăn vô cùng phổ biến tại Châu Âu, thường được phục vụ như món chính trong các nhà hàng cao cấp. Cá hồi tươi ngon được rưới sốt chanh mật ong chua chua, ngọt ngọt, vừa bổ dưỡng lại rất hấp dẫn.', 1000, 'visible', '200000.00', 'https://bep360.net/cach-lam-ca-hoi-sot-chanh-mat-ong-thom-ngon-bo-duong.html', 6, '2022-06-07 11:00:43'),
('PD005', 1, 6, 1, 6, 'Quần Jean Nam Đen Trơn cao cấp thương hiệu Chandi, phong cách tôn dáng nam tính chất jean co dãn Mẫu J20', 'Thịt cuộn trứng om xì dầu là món ăn vô cùng phổ biến tại Nhật Bản, được lấy cảm hứng từ món teriyaki quen thuộc. Đưa lên miệng cắn 1 miếng, đầu tiên lưỡi cảm nhận được là sốt teriyaki đậm đà, ngọt dịu, sau đó là lớp thịt mọng nước, tiếp theo là lòng trắng trơn mềm, sau cùng vị mềm mịn xen lẫn bùi bùi của lòng đỏ. ', 1, 'visible', '133300.00', 'https://bep360.net/cach-lam-thit-cuon-trung-om-xi-dau-kieu-nhat-thom-ngon-dung-vi.html', 10, '2022-06-07 11:27:24'),
('PD006', 5, 10, 1, 8, 'Áo bơi nam dài tay Isla Vista BWMT001', 'Cơm ngô ngọt đậu Hà Lan là món ăn vô cùng quen thuộc với nhiều gia đình, đặc biệt là các gia đình yêu thích ẩm thực Nhật Bản. Đây là món cơm có cách làm nhanh, ăn ngon, đủ tinh bột, chất xơ, chất đạm và đẹp mắt. Ngô ngọt lật sật, đậu Hà Lan bùi bùi, quyện với hạt cơm dẻo mềm.', 1, 'disable', '133300.00', 'https://bep360.net/cach-lam-com-ngo-ngot-dau-ha-lan-thom-ngon-hap-dan.html', 10, '2022-06-07 11:27:25'),
('PD007', 6, 26, NULL, 5, 'Balo công sở, đi làm, đựng laptop, máy tính 13 inch, 14 inch, 15.6 inch, chống sốc dành cho người đi làm, sinh viên, học sinh cao cấp', 'Siro hoa bồ công anh là loại siro rất phổ biến tại Nhật Bản, ngoài việc có thể dùng để pha trà, nấu ăn thì siro hoa bồ công anh cũng có tác dụng rất tốt trong việc chăm sóc da mặt, làm trẻ hóa da và giúp cân bằng nội tiết đấy.', 2, 'visible', '133300.00', 'https://bep360.net/cach-lam-siro-hoa-bo-cong-anh-don-gian-ma-rat-nhieu-cong-dung.html', 0, '2022-06-22 10:05:08'),
('PD011', 7, 27, NULL, 5, 'Điện Thoại OPPO RENO7 4G (8GB/128GB) - Hàng Chính Hãng', 'Đậu phụ là món ăn quen thuộc của nhiều gia đình, có thể chế biến thành nhiều món ăn. Nếu bạn thích tự tay làm ra những miếng đậu phụ thơm ngon hãy tham khảo bài viết sau đây', 1, 'visible', '7250000.00', 'Chúc bạn thành công', 0, '2022-06-21 21:45:12'),
('PD012', 4, 22, NULL, NULL, 'Yêu Thầm', 'Món Tây nhưng quá quen với người Việt chính là bánh pizza. Bánh pizza lúc nào cũng rất bắt mắt bởi phần nhân bên trên đầy màu sắc tươi sáng từ đủ loại nguyên liệu như rau củ, hải sản cùng lớp phủ phô mai vàng óng.\r\n\r\nĐế bánh mềm vừa phải khi ăn lại không bị ngán bởi chúng đã được nướng nóng giòn vô cùng, phần sốt cà chua đậm đà quyện với rau củ ngọt thanh cùng hải sản tươi, khi ăn rất ngọt thịt.\r\n\r\nĐặc biệt có thêm phần phô mai tan chảy bên trên, thơm lừng, béo ngậy làm cho món bánh pizza tăng thêm phần hấp dẫn.', 2, 'visible', '159250.00', 'Chúc bạn thành công', 0, '2022-06-21 21:44:56'),
('PD014', 1, 24, NULL, NULL, 'Ghế Văn Phòng Thời Trang & thiết kế Ergonomic 8723-XAM (giúp làm việc cả ngày không lo mệt mỏi)', 'Trứng ngâm trà được xem như là một món ăn nhẹ độc đáo và phổ biến của người Trung Hoa. Bên cạnh việc chứa đựng những giá trị truyền thống của dân tộc thì nó còn là một món ăn chứa nhiều chất dinh dưỡng nhưng lại chế biến rất đơn giản, mang lại may mắn đối với người Trung Hoa. Sau đây Bách hóa XANH sẽ gợi ý cho bạn cách làm món trứng ngâm trà này nhé!', 2, 'visible', '961000.00', 'Chúc bạn thành công', 0, '2022-06-21 21:47:27'),
('PD015', 2, 25, NULL, NULL, 'Máy tính bán háng OS-A2, màn hình LCD rộng , rõ nét, thiết kế cực đẹp, chất lượng cao(tiêu chuẩn Châu Âu-CE)', 'OSALO là thương hiệu máy tính rất thông dụng và nổi tiếng được bán hầu hết trên các sàn thương mại điện tử lơn trên thế giới. Đây là thương hiệu được đăng ký độc quyền nên tất cả sản phẩm của OSALO đều được hiểm soát và quản lý chặt chẻ nên chất lượng luôn được đảm bảo. Sản phẩm máy tính COSALO được xuất khẩu toàn thế giới và rất được tất cả mọi giới ưa chuộng .\n\nMáy tính OSALO OS-A2 là một sản phẩm được giành cho những nhà bán hàng,showroom, cửa hàng vật tư thiết bị. Với thiết kế cực kỳ tinh xảo và đẹp mắt giúp bạn tự tin và thoải mái trong thao tác khi tính toán.\n\nMáy tính có màn hình LCD rộng và sắc nét với 12 chữ số , 2 hàng\n\nBàn phím cực lỳ êm nhẹ với những nút phím lớn dễ bấm và chóng mòn\n\nMáy có 2 nguồn năng lượng ánh sáng và pin AAA giúp máy vận hành liên tục . Khi có  ánh sáng đủ mạnh(chỉ 1 cần bóng đèn  ) thì máy sử dụng năng lượng ánh sáng , còn khi không có ánh sáng thì máy chuyển qua sử dụng năng lượng từ Pin .\n\nChất liệu: nhựa cao cấp\n\nKích thước : 108x 160 x 32(mm)\n\nTrọng lượng: 132g', 2, 'visible', '170000.00', 'Chú ý lửa nhỏ , cho nước chanh vào cuối cùng', 0, '2022-06-21 21:47:03'),
('PD016', 6, 29, NULL, NULL, '[Chỉ Giao HCM] - Dưa Hấu Ruột Đỏ (bán theo trái 3kg) - Chuẩn An toàn Vietgap', 'Thương hiệu: 3Sạch Food\r\nXuất xứ: Việt Nam\r\nVới sản phẩm tươi sống, trọng lượng thực tế có thể chênh lệch khoảng 10%.\r\n\r\nDưa hấu là một trong những loại trái cây yêu thích của nhiều người vào mỗi dịp hè nóng bức. Loại quả này không chỉ có vị ngọt thanh mát mà còn mang lại nhiều lợi ích nhất định cho sức khỏe bởi chúng chứa nhiều thành phần dinh dưỡng thiết yếu, như vitamin, khoáng chất và các hợp chất thực vật.', 100, 'visible', '110000.00', NULL, 0, '2022-07-08 08:34:36');

-- --------------------------------------------------------

--
-- Table structure for table `promotion`
--

CREATE TABLE `promotion` (
  `id_promotion` int(11) NOT NULL,
  `promotion_name` text NOT NULL,
  `percent` int(11) NOT NULL,
  `promotion_quantity` int(11) DEFAULT NULL,
  `date_begin` datetime NOT NULL DEFAULT current_timestamp(),
  `date_end` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `promotion`
--

INSERT INTO `promotion` (`id_promotion`, `promotion_name`, `percent`, `promotion_quantity`, `date_begin`, `date_end`) VALUES
(1, 'Thích thì khuyến mãi', 24, 11, '2022-07-05 14:19:36', '2022-07-05 23:59:59');

-- --------------------------------------------------------

--
-- Table structure for table `rate`
--

CREATE TABLE `rate` (
  `id_rate` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_product` varchar(50) NOT NULL,
  `star` int(11) NOT NULL,
  `content` text DEFAULT NULL,
  `date_rate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rate`
--

INSERT INTO `rate` (`id_rate`, `id_user`, `id_product`, `star`, `content`, `date_rate`) VALUES
(1, 6, 'PD001', 5, NULL, '2022-06-30 16:33:04'),
(2, 6, 'PD002', 4, NULL, '2022-06-30 16:35:12'),
(3, 1, 'PD003', 4, 'a bit itchy', '2022-06-30 16:35:12'),
(4, 2, 'PD003', 5, 'too small for my penis', '2022-06-30 16:35:12'),
(5, 6, 'PD004', 3, NULL, '2022-06-30 16:35:12'),
(6, 6, 'PD005', 3, NULL, '2022-06-30 16:35:12'),
(7, 11, 'PD005', 3, NULL, '2022-06-30 16:35:12'),
(8, 7, 'PD006', 3, NULL, '2022-06-30 16:35:12'),
(9, 3, 'PD007', 5, NULL, '2022-06-30 16:35:12'),
(10, 10, 'PD004', 4, NULL, '2022-06-30 16:35:12'),
(11, 8, 'PD001', 5, NULL, '2022-06-30 16:35:12');

-- --------------------------------------------------------

--
-- Table structure for table `shop`
--

CREATE TABLE `shop` (
  `id_shop` int(11) NOT NULL,
  `shop_name` text NOT NULL,
  `avatar` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shop`
--

INSERT INTO `shop` (`id_shop`, `shop_name`, `avatar`) VALUES
(1, 'Baby Shop', 'avatar-anime.jpg'),
(2, 'Realized shop', 'anh-dai-dien-avt-anime-1.jpg'),
(3, 'Tân Hoàn Minh', 'avatar-anime (1).jpg'),
(4, 'Oh My God', 'unnamed.png'),
(5, 'Thiên Shop', 'unnamed.png'),
(6, 'Realized Kiss', 'unnamed.png'),
(7, 'Listen you', 'unnamed.png'),
(23, 'Surprised ', 'unnamed.png');

-- --------------------------------------------------------

--
-- Table structure for table `size`
--

CREATE TABLE `size` (
  `id_size` int(11) NOT NULL,
  `id_product` varchar(50) DEFAULT NULL,
  `size_name` text DEFAULT NULL,
  `size_quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `size`
--

INSERT INTO `size` (`id_size`, `id_product`, `size_name`, `size_quantity`) VALUES
(1, 'PD001', '2XL', 10),
(2, 'PD001', 'XL', 10),
(3, 'PD002', 'L', 10),
(4, 'PD002', 'XL', 400),
(5, 'PD003', 'L', 10),
(6, 'PD003', 'XL', 400),
(7, 'PD004', 'XL', 1000),
(8, 'PD005', 'S', 1000);

-- --------------------------------------------------------

--
-- Table structure for table `type`
--

CREATE TABLE `type` (
  `id_type` int(11) NOT NULL,
  `id_cate` int(11) NOT NULL,
  `type_name` text NOT NULL,
  `type_image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `type`
--

INSERT INTO `type` (`id_type`, `id_cate`, `type_name`, `type_image`) VALUES
(1, 1, 'Men T Shirt', 'men-s-fancy-t-shirt-500x500.jpg'),
(2, 1, 'Men Shirt', 'new-spring-double-pocket-mens-fashion-shirt-brand-men-long-sleeved-solid-shirts-slim-fit-casual-men-shirt-social-extra-image-2.jpg'),
(3, 1, 'Men Vest', 'enbrown-men-vest-vest-wessi-446387-18-B.jpg'),
(4, 1, 'Men Hoodie', 'download.webp'),
(5, 1, 'Men Sweatshirts', 'best-sweatshirts-for-men-2-1584619611.jpg'),
(6, 1, 'Men pants', 'ICPANS-Pants-Full-Length-Cotton-Pants-Men-regular-Zipper-men-pants-casual-mens-business-trousers-pants.jpg_Q90.jpg_.webp'),
(7, 1, 'Men sleepwear', 'Black-Men-Nightwear-Shirt-Pants-Sleep-Pajamas-Sets-Long-Sleeve-Sleepwear-Spring-Autumn-Silky-Nightgown-Robe.jpg_Q90.jpg_.webp'),
(8, 1, 'Men couple clothes', '61Ez3OOpaiL._AC_UX385_.jpg'),
(9, 1, 'Men underwear', 'download.jpg'),
(10, 1, 'Men swimwear', 'Felventura-men-swimwear-dubai-ravello-italy-yellow-shorts-600x600.jpg'),
(11, 1, 'Men big size', 'e13dfc04ba88763e0e345311b8990fda.jpg'),
(18, 16, 'Short story', '4d3636aadb471cad0bf2f45d681e4f23.jpg.webp'),
(19, 9, 'Kem chống nắng', '132da4f9427abce92522b00dd357359a.jpg.webp'),
(20, 4, 'kitchen accessories', '95675c22554f8fb0c017892dd5a3c44a.jpg.webp'),
(21, 16, 'life skills book - thinking', 'e6d54019a2079b9565114bce93b245b7.jpg.webp'),
(22, 16, 'comic', 'a70f1b4320b7d2fd31897a7c4efc2f34.jpg.webp'),
(23, 16, 'novel', '2a6154ba08df6ce6161c13f4303fa19e.jpg.webp'),
(24, 4, 'office chair', '083a92d36771b3bbf4bb8ecd94bcd9ce.jpg.webp'),
(25, 5, 'calculator ', '89dd1956824d05cd40ceb6ddedde48a4.jpg.webp'),
(26, 11, 'balo', '4387e015b20cefd0111a6a34f7e285e8.jpg.webp'),
(27, 7, 'Oppo', '637613342139496099_oppo-reno6z-dd.jpg'),
(28, 2, 'gas-rice-wrater', '093b1ef4402f1b4ca595fde51b63c0d8.png.webp'),
(29, 2, 'Fruit', 'b463fb062555874848ebb04e093b4109.png.webp'),
(30, 2, 'meat-egg', '27830a16b20dd1b61ed7edab4a47e233.png.webp'),
(31, 2, 'vegetable', '130627ca429bef32c72c91392df920a4.png.webp'),
(32, 2, 'seafood', 'd969191641a38af1768f1552f5bfd921.png.webp');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `user_name` text NOT NULL,
  `fullname` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `birth_day` date DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `id_card` char(12) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `sex` char(1) DEFAULT NULL,
  `address` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `password` text NOT NULL,
  `avatar` text DEFAULT NULL,
  `id_permission` int(11) DEFAULT NULL,
  `status` char(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `user_name`, `fullname`, `birth_day`, `phone`, `id_card`, `email`, `sex`, `address`, `password`, `avatar`, `id_permission`, `status`) VALUES
(1, '', 'Huỳnh Tấn Minh', '1996-03-29', '0334462487', '231273123570', 'NguyenDang@gmail.com', '0', '12 Lê Quang Đạo', '123456', 'avatar-anime.jpg', 1, '0'),
(2, '', 'Đỗ Đức Huy', '1987-09-23', '0397102017', '231456273571', 'VietLe@gmail.com', '1', '127 Lý Thái Tổ', '123456', 'anh-dai-dien-avt-anime-1.jpg', 2, '1'),
(3, '', 'Nguyễn Thị Thu Thủy', '1977-03-23', '0929990471', '231452273572', 'Minhnguyen@gmail.com', '1', '787 Nguyễn Thị Minh Khai', '123456', 'avatar-anime (1).jpg', 2, '0'),
(4, '', 'Ngô Nhật Dương', '1988-12-23', '0393967872', '231273123573', 'LeMinh@gmail.com', '1', '909 Trần Cao Văn', '123456', 'unnamed.png', 1, '0'),
(5, '', 'Đặng Chí Hiếu', '1976-02-03', '0556453746', '231273511174', 'HieuDang@gmail.com', '1', '37 Hùng Vương', '123456', NULL, 1, '1'),
(6, '', 'Dương Trí Hùng', '2001-04-04', '0372678678', '231272223575', 'HungDuong@gmail.com', '1', '34 Lê Lợi', '123456', NULL, 1, '1'),
(7, '', 'Nguyễn Phan Thanh Diệu', '2001-04-09', '0334384098', '231333273576', 'Dieunguyen@gmail.com', '0', '48 Cao Thắng', '123456', NULL, 1, '0'),
(8, '', 'Nguyễn Thị Ly Sa', '1982-08-24', '0323627090', '231273444577', 'Lysa@gmail.com', '0', '93 Nguyên Huệ', '123456', NULL, 1, '1'),
(9, '', 'Võ Tấn An', '1967-06-23', '0334568009', '231273666578', 'anTan@gmail.com', '1', '90 La lợi', '123456', NULL, 1, '1'),
(10, '', 'Lê Hồng Điệp', '1999-06-05', '0329590471', '231278973579', 'DiepLe@gmail.com', '1', '40 Hai Bà Trưng', '123456', NULL, 1, '1'),
(11, '', 'Huỳnh Vũ Cương', '2001-03-23', '0809989765', '231123273580', 'CuongVu@gmail.com', '1', '20 Bà Triệu', '123456', NULL, 1, '0'),
(12, '', 'Phạm Thị Mỹ Duyên', '1988-08-28', '0437843512', '201231273581', 'DuyenPham@gmail.com', '0', '1902 Cao bá Quát', '123456', NULL, 1, '1'),
(13, '', 'Trần Thị Hằng', '2001-03-23', '0334465487', '231273587509', 'HangTran@gmail.com', '0', '1080 Hồ Chí Minh', '123456', NULL, 1, '0'),
(14, '', 'Phạm Văn Thiên', NULL, '', NULL, 'user@gmail.com', '', '', 'ee11cbb19052e40b07aac0ca060c23ee', NULL, 1, '1'),
(15, '', 'Thiên Phạm Văn', NULL, NULL, NULL, 'vanthien.', '', '', '21232f297a57a5a743894a0e4a801fc3', NULL, 2, '1'),
(20, '', NULL, NULL, '1234567890', NULL, NULL, NULL, NULL, '123456', NULL, NULL, '1'),
(21, '', NULL, NULL, '1235567890', NULL, NULL, NULL, NULL, '123456', NULL, NULL, '1'),
(22, '', NULL, NULL, '00000000', NULL, 'vanthien', NULL, NULL, '$2b$10$69SdwN4bY3y4zcrADm6IyO2AvoR8ADdLEuOR7Bw3.SmxcV/9MI37W', NULL, NULL, '1'),
(23, '', 'sỷ bùi', NULL, '0394921219', NULL, 'vanthien.dev@gmail.com', NULL, NULL, '$2b$10$2leZ.R.mxaSGAf3IqtJUuuAxYyApBkqea.o.L1oEROzLJm9mD5VyK', NULL, NULL, '1'),
(25, '', 'phạm thiên', NULL, '0394921218', NULL, NULL, NULL, NULL, '$2b$10$WcOtIIpGYhmmgUc1RhcF3udY43GIYwN..gxI.X4H7gkrdCApuZz5y', NULL, NULL, '1'),
(26, '', 'Thành Nhân', NULL, '0394921217', NULL, NULL, NULL, NULL, '$2b$10$ZdilmqoO/ls3zp64jEzF7OZHg60JoN0AdGGAnq93PhESYP1tgQOD6', NULL, NULL, '1');

-- --------------------------------------------------------

--
-- Table structure for table `village`
--

CREATE TABLE `village` (
  `id_village` int(11) NOT NULL,
  `village_name` text CHARACTER SET utf8 DEFAULT NULL,
  `id_district` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `village`
--

INSERT INTO `village` (`id_village`, `village_name`, `id_district`) VALUES
(1, 'Thanh Bình', 1),
(2, 'Thuận Phước', 1),
(3, 'Hòa Phát', 2),
(4, 'Hòa An', 2),
(5, 'Tam Thuận', 3),
(6, 'Tân Chính', 3),
(7, 'Hòa Hiệp Bắc', 4),
(8, 'Hòa Hiệp Nam', 4),
(9, 'Mỹ An', 5),
(10, 'Khuê Mỹ', 5),
(11, 'An Hải Bắc', 6),
(12, 'Phước Mỹ', 6),
(13, 'Hòa Bắc', 7),
(14, 'Hòa Liên', 7);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id_address`,`id_user`),
  ADD KEY `pk_user_adress` (`id_user`);

--
-- Indexes for table `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id_brand`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id_cart`,`id_user`,`id_shop`,`id_product`),
  ADD KEY `fk_user_cart` (`id_user`),
  ADD KEY `fk_product_cart` (`id_product`),
  ADD KEY `fk_shop_cart` (`id_shop`),
  ADD KEY `fk_color_cart` (`id_color`),
  ADD KEY `fk_size_cart` (`id_size`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_cate`),
  ADD KEY `id_cate` (`id_cate`);

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`id_city`);

--
-- Indexes for table `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`id_color`),
  ADD KEY `fk_product_color` (`id_product`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id_cmt`,`id_product`,`id_user`),
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `config`
--
ALTER TABLE `config`
  ADD PRIMARY KEY (`id_config`);

--
-- Indexes for table `detail_order`
--
ALTER TABLE `detail_order`
  ADD PRIMARY KEY (`id_detail_order`),
  ADD KEY `pk_detail_order` (`id_order`),
  ADD KEY `pk_product_order_detail` (`id_product`);

--
-- Indexes for table `detail_promotion`
--
ALTER TABLE `detail_promotion`
  ADD PRIMARY KEY (`id_promotion`,`id_product`),
  ADD KEY `fk_product_promotion_detail` (`id_product`);

--
-- Indexes for table `district`
--
ALTER TABLE `district`
  ADD PRIMARY KEY (`id_district`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id_img`,`id_product`),
  ADD KEY `id_product` (`id_product`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id_order`,`id_user`),
  ADD KEY `pk_user_order` (`id_user`),
  ADD KEY `fk_address_order` (`id_address`);

--
-- Indexes for table `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`id_permission`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id_product`),
  ADD KEY `fk_product_user` (`id_shop`),
  ADD KEY `fk_promotion` (`id_promotion`),
  ADD KEY `fk_product_type` (`id_type`),
  ADD KEY `fk_brand` (`id_brand`);

--
-- Indexes for table `promotion`
--
ALTER TABLE `promotion`
  ADD PRIMARY KEY (`id_promotion`);

--
-- Indexes for table `rate`
--
ALTER TABLE `rate`
  ADD PRIMARY KEY (`id_rate`,`id_user`,`id_product`),
  ADD KEY `fk_rate_user` (`id_user`),
  ADD KEY `fk_rate_product` (`id_product`);

--
-- Indexes for table `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`id_shop`);

--
-- Indexes for table `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`id_size`),
  ADD KEY `pk_product_size` (`id_product`);

--
-- Indexes for table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`id_type`),
  ADD KEY `type_ibfk_2` (`id_cate`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `id_card` (`id_card`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `FK_user_permission` (`id_permission`);

--
-- Indexes for table `village`
--
ALTER TABLE `village`
  ADD PRIMARY KEY (`id_village`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `id_address` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `banner`
--
ALTER TABLE `banner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `brand`
--
ALTER TABLE `brand`
  MODIFY `id_brand` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id_cart` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id_cate` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
  MODIFY `id_city` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `color`
--
ALTER TABLE `color`
  MODIFY `id_color` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id_cmt` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `config`
--
ALTER TABLE `config`
  MODIFY `id_config` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_order`
--
ALTER TABLE `detail_order`
  MODIFY `id_detail_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `district`
--
ALTER TABLE `district`
  MODIFY `id_district` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `id_img` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=180;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `permission`
--
ALTER TABLE `permission`
  MODIFY `id_permission` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `promotion`
--
ALTER TABLE `promotion`
  MODIFY `id_promotion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `rate`
--
ALTER TABLE `rate`
  MODIFY `id_rate` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `shop`
--
ALTER TABLE `shop`
  MODIFY `id_shop` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `size`
--
ALTER TABLE `size`
  MODIFY `id_size` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `type`
--
ALTER TABLE `type`
  MODIFY `id_type` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `village`
--
ALTER TABLE `village`
  MODIFY `id_village` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `pk_user_adress` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `fk_color_cart` FOREIGN KEY (`id_color`) REFERENCES `color` (`id_color`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `fk_product_cart` FOREIGN KEY (`id_product`) REFERENCES `product` (`id_product`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_shop_cart` FOREIGN KEY (`id_shop`) REFERENCES `shop` (`id_shop`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_size_cart` FOREIGN KEY (`id_size`) REFERENCES `size` (`id_size`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `fk_user_cart` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `color`
--
ALTER TABLE `color`
  ADD CONSTRAINT `fk_product_color` FOREIGN KEY (`id_product`) REFERENCES `product` (`id_product`);

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `product` (`id_product`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detail_order`
--
ALTER TABLE `detail_order`
  ADD CONSTRAINT `pk_detail_order` FOREIGN KEY (`id_order`) REFERENCES `order` (`id_order`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pk_product_order_detail` FOREIGN KEY (`id_product`) REFERENCES `product` (`id_product`);

--
-- Constraints for table `detail_promotion`
--
ALTER TABLE `detail_promotion`
  ADD CONSTRAINT `fk_product_promotion_detail` FOREIGN KEY (`id_product`) REFERENCES `product` (`id_product`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_promotion_promotion_detail` FOREIGN KEY (`id_promotion`) REFERENCES `promotion` (`id_promotion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `district`
--
ALTER TABLE `district`
  ADD CONSTRAINT `FK_id_province` FOREIGN KEY (`id_city`) REFERENCES `city` (`id_city`);

--
-- Constraints for table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `image_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `product` (`id_product`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `fk_address_order` FOREIGN KEY (`id_address`) REFERENCES `address` (`id_address`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `pk_user_order` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `fk_brand` FOREIGN KEY (`id_brand`) REFERENCES `brand` (`id_brand`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `fk_product_shop` FOREIGN KEY (`id_shop`) REFERENCES `shop` (`id_shop`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `fk_product_type` FOREIGN KEY (`id_type`) REFERENCES `type` (`id_type`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `fk_promotion` FOREIGN KEY (`id_promotion`) REFERENCES `promotion` (`id_promotion`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `rate`
--
ALTER TABLE `rate`
  ADD CONSTRAINT `fk_rate_product` FOREIGN KEY (`id_product`) REFERENCES `product` (`id_product`),
  ADD CONSTRAINT `fk_rate_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `size`
--
ALTER TABLE `size`
  ADD CONSTRAINT `pk_product_size` FOREIGN KEY (`id_product`) REFERENCES `product` (`id_product`);

--
-- Constraints for table `type`
--
ALTER TABLE `type`
  ADD CONSTRAINT `type_ibfk_2` FOREIGN KEY (`id_cate`) REFERENCES `category` (`id_cate`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_user_permission` FOREIGN KEY (`id_permission`) REFERENCES `permission` (`id_permission`);

--
-- Constraints for table `village`
--
ALTER TABLE `village`
  ADD CONSTRAINT `FK_id_city` FOREIGN KEY (`id_district`) REFERENCES `district` (`id_district`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
