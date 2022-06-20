-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema stakloram2022
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `stakloram2022` ;

-- -----------------------------------------------------
-- Schema stakloram2022
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `stakloram2022` DEFAULT CHARACTER SET utf8 ;
USE `stakloram2022` ;

-- -----------------------------------------------------
-- Table `stakloram2022`.`country`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram2022`.`country` ;

CREATE TABLE IF NOT EXISTS `stakloram2022`.`country` (
  `country_id` INT(11) NOT NULL AUTO_INCREMENT,
  `country_description` VARCHAR(445) NULL DEFAULT NULL,
  PRIMARY KEY (`country_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stakloram2022`.`city`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram2022`.`city` ;

CREATE TABLE IF NOT EXISTS `stakloram2022`.`city` (
  `city_id` INT(11) NOT NULL AUTO_INCREMENT,
  `city_zip_code` VARCHAR(45) NULL DEFAULT NULL,
  `city_name` VARCHAR(445) NULL DEFAULT NULL,
  `city_country_country_id` INT(11) NOT NULL,
  PRIMARY KEY (`city_id`),
  INDEX `fk_settlement_country1_idx` (`city_country_country_id` ASC) VISIBLE,
  CONSTRAINT `fk_settlement_country1`
    FOREIGN KEY (`city_country_country_id`)
    REFERENCES `stakloram2022`.`country` (`country_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stakloram2022`.`buyer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram2022`.`buyer` ;

CREATE TABLE IF NOT EXISTS `stakloram2022`.`buyer` (
  `buyer_id` INT(11) NOT NULL AUTO_INCREMENT,
  `buyer_type` VARCHAR(45) NULL DEFAULT NULL,
  `buyer_name` VARCHAR(400) NULL DEFAULT NULL,
  `buyer_address` VARCHAR(400) NULL DEFAULT NULL,
  `buyer_address_contact` VARCHAR(45) NULL DEFAULT NULL,
  `buyer_matical_number` VARCHAR(145) NULL DEFAULT NULL,
  `buyer_pib` VARCHAR(45) NULL DEFAULT NULL,
  `buyer_contact_person` VARCHAR(245) NULL DEFAULT NULL,
  `buyer_phone_number_fix` VARCHAR(145) NULL DEFAULT NULL,
  `buyer_phone_number_mobile` VARCHAR(145) NULL DEFAULT NULL,
  `buyer_email` VARCHAR(145) NULL DEFAULT NULL,
  `buyer_gender` VARCHAR(45) NULL DEFAULT NULL,
  `buyer_city_city_id` INT(11) NOT NULL,
  PRIMARY KEY (`buyer_id`),
  INDEX `fk_buyer_settlement1_idx` (`buyer_city_city_id` ASC) VISIBLE,
  CONSTRAINT `fk_buyer_settlement1`
    FOREIGN KEY (`buyer_city_city_id`)
    REFERENCES `stakloram2022`.`city` (`city_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stakloram2022`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram2022`.`user` ;

CREATE TABLE IF NOT EXISTS `stakloram2022`.`user` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_username` VARCHAR(500) NOT NULL,
  `user_password` VARCHAR(100) NULL DEFAULT NULL,
  `user_full_name` VARCHAR(500) NULL DEFAULT NULL,
  `user_email` VARCHAR(500) NULL DEFAULT NULL,
  `user_language` VARCHAR(45) NULL DEFAULT NULL,
  `user_thumbnail` VARCHAR(4000) NULL DEFAULT NULL,
  `user_enabled` TINYINT(4) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_name_UNIQUE` (`user_full_name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stakloram2022`.`history`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram2022`.`history` ;

CREATE TABLE IF NOT EXISTS `stakloram2022`.`history` (
  `history_id` INT(11) NOT NULL AUTO_INCREMENT,
  `history_action` VARCHAR(245) NULL DEFAULT NULL,
  `history_object_type` VARCHAR(245) NULL DEFAULT NULL,
  `history_previous_value` VARCHAR(4000) NULL DEFAULT NULL,
  `history_new_value` VARCHAR(4000) NULL DEFAULT NULL,
  `history_time` DATETIME NULL DEFAULT NULL,
  `history_user_user_id` INT(11) NOT NULL,
  PRIMARY KEY (`history_id`),
  INDEX `fk_history_user1_idx` (`history_user_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_history_user1`
    FOREIGN KEY (`history_user_user_id`)
    REFERENCES `stakloram2022`.`user` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stakloram2022`.`image`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram2022`.`image` ;

CREATE TABLE IF NOT EXISTS `stakloram2022`.`image` (
  `image_id` INT(11) NOT NULL AUTO_INCREMENT,
  `image_url` VARCHAR(400) NULL DEFAULT NULL,
  `image_description` VARCHAR(4000) NULL DEFAULT NULL,
  PRIMARY KEY (`image_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stakloram2022`.`income`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram2022`.`income` ;

CREATE TABLE IF NOT EXISTS `stakloram2022`.`income` (
  `income_id` INT(11) NOT NULL AUTO_INCREMENT,
  `income_date` DATE NULL DEFAULT NULL,
  `income_bank_statement_number` VARCHAR(145) NULL DEFAULT NULL,
  `income_amount` DECIMAL(20,2) NULL DEFAULT NULL,
  `income_comment` VARCHAR(4000) NULL DEFAULT NULL,
  `income_buyer_buyer_id` INT(11) NOT NULL,
  PRIMARY KEY (`income_id`),
  INDEX `fk_income_buyer1_idx` (`income_buyer_buyer_id` ASC) VISIBLE,
  CONSTRAINT `fk_income_buyer1`
    FOREIGN KEY (`income_buyer_buyer_id`)
    REFERENCES `stakloram2022`.`buyer` (`buyer_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stakloram2022`.`invoice`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram2022`.`invoice` ;

CREATE TABLE IF NOT EXISTS `stakloram2022`.`invoice` (
  `invoice_id` INT(11) NOT NULL AUTO_INCREMENT,
  `invoice_type` VARCHAR(145) NULL DEFAULT NULL,
  `invoice_number` INT(11) NULL DEFAULT NULL,
  `invoice_number_sign` VARCHAR(45) NULL DEFAULT NULL,
  `invoice_date_of_create` DATE NULL DEFAULT NULL,
  `invoice_date_of_turnover` DATE NULL DEFAULT NULL,
  `invoice_date_of_maturity` DATE NULL DEFAULT NULL,
  `invoice_place_of_issue` VARCHAR(445) NULL DEFAULT NULL,
  `invoice_net_amount` DECIMAL(20,2) NULL DEFAULT NULL,
  `invoice_vat_amount` DECIMAL(20,2) NULL DEFAULT NULL,
  `invoice_gross_amount` DECIMAL(20,2) NULL DEFAULT NULL,
  `invoice_number_of_cash_bill` VARCHAR(145) NULL DEFAULT NULL,
  `invoice_currency` VARCHAR(45) NULL DEFAULT NULL,
  `invoice_country` VARCHAR(445) NULL DEFAULT NULL,
  `invoice_comment` VARCHAR(4000) NULL DEFAULT NULL,
  `invoice_disabled` TINYINT(4) NULL DEFAULT NULL,
  `invoice_advance_invoice_id` INT(11) NULL DEFAULT NULL,
  `invoice_pre_invoice_id` INT(11) NULL DEFAULT NULL,
  `invoice_buyer_buyer_id` INT(11) NOT NULL,
  PRIMARY KEY (`invoice_id`),
  INDEX `fk_invoice_buyer1_idx` (`invoice_buyer_buyer_id` ASC) VISIBLE,
  CONSTRAINT `fk_invoice_buyer1`
    FOREIGN KEY (`invoice_buyer_buyer_id`)
    REFERENCES `stakloram2022`.`buyer` (`buyer_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stakloram2022`.`invoice_item`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram2022`.`invoice_item` ;

CREATE TABLE IF NOT EXISTS `stakloram2022`.`invoice_item` (
  `invoice_item_id` INT(11) NOT NULL AUTO_INCREMENT,
  `invoice_item_description` VARCHAR(400) NULL DEFAULT NULL,
  `invoice_item_net_price` DECIMAL(20,2) NULL DEFAULT NULL,
  `invoice_item_vat_rate` DECIMAL(6,2) NULL DEFAULT NULL,
  `invoice_item_vat_amount` DECIMAL(20,2) NULL DEFAULT NULL,
  `invoice_item_gross_price` DECIMAL(20,2) NULL DEFAULT NULL,
  `invoice_item_invoice_invoice_id` INT(11) NOT NULL,
  PRIMARY KEY (`invoice_item_id`),
  INDEX `fk_invoice_item_invoice1_idx` (`invoice_item_invoice_invoice_id` ASC) VISIBLE,
  CONSTRAINT `fk_invoice_item_invoice1`
    FOREIGN KEY (`invoice_item_invoice_invoice_id`)
    REFERENCES `stakloram2022`.`invoice` (`invoice_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stakloram2022`.`outcome`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram2022`.`outcome` ;

CREATE TABLE IF NOT EXISTS `stakloram2022`.`outcome` (
  `outcome_id` INT(11) NOT NULL AUTO_INCREMENT,
  `outcome_date` DATE NULL DEFAULT NULL,
  `outcome_amount` DECIMAL(20,2) NULL DEFAULT NULL,
  `outcome_comment` VARCHAR(4000) NULL DEFAULT NULL,
  `outcome_buyer_buyer_id` INT(11) NOT NULL,
  PRIMARY KEY (`outcome_id`),
  INDEX `fk_income_buyer1_idx` (`outcome_buyer_buyer_id` ASC) VISIBLE,
  CONSTRAINT `fk_income_buyer10`
    FOREIGN KEY (`outcome_buyer_buyer_id`)
    REFERENCES `stakloram2022`.`buyer` (`buyer_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stakloram2022`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram2022`.`role` ;

CREATE TABLE IF NOT EXISTS `stakloram2022`.`role` (
  `role_id` INT(11) NOT NULL AUTO_INCREMENT,
  `role_name` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`role_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stakloram2022`.`user_has_role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram2022`.`user_has_role` ;

CREATE TABLE IF NOT EXISTS `stakloram2022`.`user_has_role` (
  `user_user_id` INT(11) NOT NULL,
  `role_role_id` INT(11) NOT NULL,
  PRIMARY KEY (`user_user_id`, `role_role_id`),
  INDEX `fk_user_has_role_role1_idx` (`role_role_id` ASC) VISIBLE,
  INDEX `fk_user_has_role_user1_idx` (`user_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_role_role1`
    FOREIGN KEY (`role_role_id`)
    REFERENCES `stakloram2022`.`role` (`role_id`),
  CONSTRAINT `fk_user_has_role_user1`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `stakloram2022`.`user` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stakloram2022`.`work_order`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram2022`.`work_order` ;

CREATE TABLE IF NOT EXISTS `stakloram2022`.`work_order` (
  `work_order_id` INT NOT NULL AUTO_INCREMENT,
  `work_order_number` INT NULL,
  `work_order_date_of_create` DATE NULL,
  `work_order_place_of_issue` VARCHAR(145) NULL,
  `work_order_for_person` VARCHAR(145) NULL,
  `work_order_description` VARCHAR(3045) NULL,
  `work_order_note` VARCHAR(3045) NULL,
  `work_order_buyer_buyer_id` INT(11) NOT NULL,
  PRIMARY KEY (`work_order_id`),
  INDEX `fk_work_order_buyer1_idx` (`work_order_buyer_buyer_id` ASC) VISIBLE,
  CONSTRAINT `fk_work_order_buyer1`
    FOREIGN KEY (`work_order_buyer_buyer_id`)
    REFERENCES `stakloram2022`.`buyer` (`buyer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stakloram2022`.`work_order_item`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram2022`.`work_order_item` ;

CREATE TABLE IF NOT EXISTS `stakloram2022`.`work_order_item` (
  `work_order_item_id` INT NOT NULL AUTO_INCREMENT,
  `work_order_item_description` VARCHAR(5000) NULL,
  `work_order_item_dimension1` DECIMAL(19,2) NULL,
  `work_order_item_dimension2` DECIMAL(19,2) NULL,
  `work_order_item_dimension3` DECIMAL(19,2) NULL,
  `work_order_item_quantity` DECIMAL(19,2) NULL,
  `work_order_item_sum_quantity` DECIMAL(19,10) NULL,
  `work_order_item_note` VARCHAR(5000) NULL,
  `work_order_item_work_order_work_order_id` INT NOT NULL,
  `work_order_item_product_product_id` INT NOT NULL,
  `work_order_item_invoice_item_invoice_item_id` INT(11) NULL,
  PRIMARY KEY (`work_order_item_id`),
  INDEX `fk_work_order_item_work_order1_idx` (`work_order_item_work_order_work_order_id` ASC) VISIBLE,
  INDEX `fk_work_order_item_invoice_item1_idx` (`work_order_item_invoice_item_invoice_item_id` ASC) VISIBLE,
  CONSTRAINT `fk_work_order_item_work_order1`
    FOREIGN KEY (`work_order_item_work_order_work_order_id`)
    REFERENCES `stakloram2022`.`work_order` (`work_order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_work_order_item_invoice_item1`
    FOREIGN KEY (`work_order_item_invoice_item_invoice_item_id`)
    REFERENCES `stakloram2022`.`invoice_item` (`invoice_item_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
