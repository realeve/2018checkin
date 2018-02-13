/*
Navicat MySQL Data Transfer

Source Server         : MYSQL
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : weixin

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-02-13 15:39:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cbpm_error_desc
-- ----------------------------
DROP TABLE IF EXISTS `cbpm_error_desc`;
CREATE TABLE `cbpm_error_desc` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `err_url` varchar(255) DEFAULT NULL,
  `err_desc` text,
  `network_type` varchar(255) DEFAULT NULL,
  `device_platform` varchar(255) DEFAULT NULL,
  `device_user_agent` text,
  `device_app_version` text,
  `rec_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
