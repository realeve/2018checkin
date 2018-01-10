/*
Navicat MySQL Data Transfer

Source Server         : MySQL
Source Server Version : 50621
Source Host           : 127.0.0.1:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2017-04-28 15:07:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cbpm_vote_artisan
-- ----------------------------
DROP TABLE IF EXISTS `cbpm_vote_artisan`;
CREATE TABLE `cbpm_vote_artisan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(255) DEFAULT NULL,
  `openid` varchar(255) DEFAULT NULL,
  `artisanId` int(11) DEFAULT NULL,
  `rec_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cbpm_vote_artisan
-- ----------------------------

-- ----------------------------
-- Table structure for cbpm_vote_artisan_list
-- ----------------------------
DROP TABLE IF EXISTS `cbpm_vote_artisan_list`;
CREATE TABLE `cbpm_vote_artisan_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `artId` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `voteNums` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cbpm_vote_artisan_list
-- ----------------------------
INSERT INTO `cbpm_vote_artisan_list` VALUES ('1', '0', '王安云', '0');
INSERT INTO `cbpm_vote_artisan_list` VALUES ('2', '1', '刘惠春', '0');
INSERT INTO `cbpm_vote_artisan_list` VALUES ('3', '2', '朱佳艺', '0');
INSERT INTO `cbpm_vote_artisan_list` VALUES ('4', '3', '王志平', '0');
INSERT INTO `cbpm_vote_artisan_list` VALUES ('5', '4', '余林', '0');
INSERT INTO `cbpm_vote_artisan_list` VALUES ('6', '5', '夏惠顺', '0');
INSERT INTO `cbpm_vote_artisan_list` VALUES ('7', '6', '余敏', '0');
INSERT INTO `cbpm_vote_artisan_list` VALUES ('8', '7', '常欢', '0');
INSERT INTO `cbpm_vote_artisan_list` VALUES ('9', '8', '宗亚军', '0');
INSERT INTO `cbpm_vote_artisan_list` VALUES ('10', '9', '江玉龙', '0');

-- ----------------------------
-- Table structure for cbpm_vote_artisan_user
-- ----------------------------
DROP TABLE IF EXISTS `cbpm_vote_artisan_user`;
CREATE TABLE `cbpm_vote_artisan_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `prov` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `area` varchar(255) DEFAULT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `openid` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `rec_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cbpm_vote_artisan_user
-- ----------------------------
DROP TRIGGER IF EXISTS `voteInsert`;
DELIMITER ;;
CREATE TRIGGER `voteInsert` AFTER INSERT ON `cbpm_vote_artisan` FOR EACH ROW BEGIN
	UPDATE cbpm_vote_artisan_list
SET voteNums = voteNums + 1
WHERE
	artId = new.artisanId;
END
;;
DELIMITER ;
