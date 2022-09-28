-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema stakloram
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `stakloram` ;

-- -----------------------------------------------------
-- Schema stakloram
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `stakloram` DEFAULT CHARACTER SET utf8 ;
USE `stakloram` ;

-- -----------------------------------------------------
-- Table `stakloram`.`privilege`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram`.`privilege` ;

CREATE TABLE IF NOT EXISTS `stakloram`.`privilege` (
  `privilege_id` INT(11) NOT NULL,
  `privilege_description` VARCHAR(245) NOT NULL,
  PRIMARY KEY (`privilege_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stakloram`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram`.`user` ;

CREATE TABLE IF NOT EXISTS `stakloram`.`user` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_display_name` VARCHAR(255) NOT NULL,
  `user_name` VARCHAR(255) NOT NULL,
  `user_password` VARCHAR(255) NOT NULL,
  `user_active` TINYINT(1) NULL DEFAULT NULL,
  `user_created_on` DATETIME NOT NULL,
  `user_last_modified_on` DATETIME NOT NULL,
  `privilege_privilege_id` INT(11) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC) VISIBLE,
  INDEX `fk_user_privilege1_idx` (`privilege_privilege_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_privilege1`
    FOREIGN KEY (`privilege_privilege_id`)
    REFERENCES `stakloram`.`privilege` (`privilege_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stakloram`.`zip_code`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram`.`zip_code` ;

CREATE TABLE IF NOT EXISTS `stakloram`.`zip_code` (
  `zip_code_id` INT(11) NOT NULL,
  `zip_code_city_name` VARCHAR(45) NOT NULL,
  `zip_code_created_on` DATETIME NOT NULL,
  `zip_code_last_modified_on` DATETIME NOT NULL,
  `user_user_id` INT(11) NOT NULL,
  PRIMARY KEY (`zip_code_id`),
  INDEX `fk_zip_code_user1_idx` (`user_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_zip_code_user`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `stakloram`.`user` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stakloram`.`buyer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram`.`buyer` ;

CREATE TABLE IF NOT EXISTS `stakloram`.`buyer` (
  `buyer_id` INT(11) NOT NULL AUTO_INCREMENT,
  `buyer_type` VARCHAR(45) NOT NULL,
  `buyer_name` VARCHAR(145) NOT NULL,
  `buyer_address` VARCHAR(45) NOT NULL,
  `buyer_identification_number` VARCHAR(45) NOT NULL,
  `buyer_PIB` VARCHAR(45) NOT NULL,
  `buyer_contact_person` VARCHAR(145) NULL DEFAULT NULL,
  `buyer_phone_number` VARCHAR(145) NULL DEFAULT NULL,
  `buyer_email` VARCHAR(45) NULL DEFAULT NULL,
  `buyer_country` VARCHAR(45) NOT NULL,
  `zip_code_zip_code_id` INT(11) NOT NULL,
  `buyer_jbkjs` VARCHAR(45) NULL DEFAULT NULL,
  `buyer_city_foreign` VARCHAR(45) NULL DEFAULT NULL,
  `buyer_created_on` DATETIME NOT NULL,
  `buyer_last_modified_on` DATETIME NOT NULL,
  `user_user_id` INT(11) NOT NULL,
  PRIMARY KEY (`buyer_id`),
  UNIQUE INDEX `buyer_PIB_UNIQUE` (`buyer_PIB` ASC) VISIBLE,
  INDEX `fk_buyer_zip_code1_idx` (`zip_code_zip_code_id` ASC) VISIBLE,
  INDEX `fk_buyer_user1_idx` (`user_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_buyer_user`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `stakloram`.`user` (`user_id`),
  CONSTRAINT `fk_buyer_zip_code`
    FOREIGN KEY (`zip_code_zip_code_id`)
    REFERENCES `stakloram`.`zip_code` (`zip_code_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stakloram`.`work_order_finish`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram`.`work_order_finish` ;

CREATE TABLE IF NOT EXISTS `stakloram`.`work_order_finish` (
  `work_order_finish_id` INT(11) NOT NULL AUTO_INCREMENT,
  `work_order_finish_active` TINYINT(1) NULL DEFAULT NULL,
  `work_order_finish_created_on` DATETIME NULL DEFAULT NULL,
  `work_order_finish_last_modified_on` DATETIME NULL DEFAULT NULL,
  `user_user_id` INT(11) NOT NULL,
  PRIMARY KEY (`work_order_finish_id`),
  INDEX `fk_work_order_finish_user1_idx` (`user_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_work_order_finish_user1`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `stakloram`.`user` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stakloram`.`work_order_viewed`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram`.`work_order_viewed` ;

CREATE TABLE IF NOT EXISTS `stakloram`.`work_order_viewed` (
  `work_order_viewed_id` INT(11) NOT NULL AUTO_INCREMENT,
  `work_order_viewed_active` TINYINT(1) NOT NULL,
  `work_order_viewed_created_on` DATETIME NOT NULL,
  `work_order_viewed_last_modified_on` DATETIME NOT NULL,
  `user_user_id` INT(11) NOT NULL,
  PRIMARY KEY (`work_order_viewed_id`),
  INDEX `fk_work_order_viewed_user1_idx` (`user_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_work_order_viewed_user1`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `stakloram`.`user` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stakloram`.`work_order`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram`.`work_order` ;

CREATE TABLE IF NOT EXISTS `stakloram`.`work_order` (
  `work_order_id` INT(11) NOT NULL AUTO_INCREMENT,
  `work_order_number` INT(11) NOT NULL,
  `work_order_date` DATE NOT NULL,
  `work_order_place_of_issue` VARCHAR(45) NOT NULL,
  `work_order_for_person` VARCHAR(145) NULL DEFAULT NULL,
  `work_order_description` VARCHAR(145) NULL DEFAULT NULL,
  `work_order_note` VARCHAR(545) NULL DEFAULT NULL,
  `buyer_buyer_id` INT(11) NOT NULL,
  `work_order_viewed_work_order_viewed_id` INT(11) NOT NULL,
  `work_order_finish_work_order_finish_id` INT(11) NOT NULL,
  `work_order_created_on` DATETIME NOT NULL,
  `work_order_last_modified_on` DATETIME NOT NULL,
  `user_user_id` INT(11) NOT NULL,
  PRIMARY KEY (`work_order_id`),
  INDEX `fk_work_order_buyer1_idx` (`buyer_buyer_id` ASC) VISIBLE,
  INDEX `fk_work_order_user1_idx` (`user_user_id` ASC) VISIBLE,
  INDEX `fk_work_order_work_order_viewed1_idx` (`work_order_viewed_work_order_viewed_id` ASC) VISIBLE,
  INDEX `fk_work_order_work_order_finish1_idx` (`work_order_finish_work_order_finish_id` ASC) VISIBLE,
  CONSTRAINT `fk_work_order_buyer`
    FOREIGN KEY (`buyer_buyer_id`)
    REFERENCES `stakloram`.`buyer` (`buyer_id`),
  CONSTRAINT `fk_work_order_user`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `stakloram`.`user` (`user_id`),
  CONSTRAINT `fk_work_order_work_order_finish1`
    FOREIGN KEY (`work_order_finish_work_order_finish_id`)
    REFERENCES `stakloram`.`work_order_finish` (`work_order_finish_id`),
  CONSTRAINT `fk_work_order_work_order_viewed1`
    FOREIGN KEY (`work_order_viewed_work_order_viewed_id`)
    REFERENCES `stakloram`.`work_order_viewed` (`work_order_viewed_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stakloram`.`image`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram`.`image` ;

CREATE TABLE IF NOT EXISTS `stakloram`.`image` (
  `image_id` INT(11) NOT NULL AUTO_INCREMENT,
  `image_url` VARCHAR(450) NOT NULL,
  `image_description` VARCHAR(450) NULL DEFAULT NULL,
  `work_order_work_order_id` INT(11) NOT NULL,
  `image_created_on` DATETIME NULL DEFAULT NULL,
  `image_last_modified_on` DATETIME NULL DEFAULT NULL,
  `user_user_id` INT(11) NOT NULL,
  PRIMARY KEY (`image_id`),
  INDEX `fk_image_user1_idx` (`user_user_id` ASC) VISIBLE,
  INDEX `fk_image_work_order1_idx` (`work_order_work_order_id` ASC) VISIBLE,
  CONSTRAINT `fk_image_user1`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `stakloram`.`user` (`user_id`),
  CONSTRAINT `fk_image_work_order1`
    FOREIGN KEY (`work_order_work_order_id`)
    REFERENCES `stakloram`.`work_order` (`work_order_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stakloram`.`income`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram`.`income` ;

CREATE TABLE IF NOT EXISTS `stakloram`.`income` (
  `income_id` INT(11) NOT NULL AUTO_INCREMENT,
  `income_date` DATE NULL DEFAULT NULL,
  `income_amount` DECIMAL(14,2) NULL DEFAULT NULL,
  `income_comments` VARCHAR(245) NULL DEFAULT NULL,
  `buyer_buyer_id` INT(11) NOT NULL,
  `income_created_on` DATETIME NULL DEFAULT NULL,
  `income_last_modified_on` DATETIME NULL DEFAULT NULL,
  `user_user_id` INT(11) NOT NULL,
  PRIMARY KEY (`income_id`),
  INDEX `fk_income_buyer1_idx` (`buyer_buyer_id` ASC) VISIBLE,
  INDEX `fk_income_user1_idx` (`user_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_income_buyer`
    FOREIGN KEY (`buyer_buyer_id`)
    REFERENCES `stakloram`.`buyer` (`buyer_id`),
  CONSTRAINT `fk_income_user`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `stakloram`.`user` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stakloram`.`invoice`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram`.`invoice` ;

CREATE TABLE IF NOT EXISTS `stakloram`.`invoice` (
  `invoice_id` INT(11) NOT NULL AUTO_INCREMENT,
  `invoice_type` VARCHAR(45) NOT NULL,
  `invoice_number_of_invoice` INT(11) NOT NULL,
  `invoice_date_of_create` DATE NOT NULL,
  `invoice_date_of_turnover` DATE NOT NULL,
  `invoice_date_of_maturity` DATE NOT NULL,
  `invoice_place_of_issue` VARCHAR(45) NOT NULL,
  `invoice_method_of_payment` VARCHAR(45) NOT NULL,
  `invoice_additional_description` VARCHAR(545) NULL DEFAULT NULL,
  `invoice_net_amount` DECIMAL(19,2) NOT NULL,
  `invoice_vat_rate` DECIMAL(6,2) NOT NULL,
  `invoice_vat_amount` DECIMAL(19,2) NOT NULL,
  `invoice_gross_amount` DECIMAL(19,2) NOT NULL,
  `invoice_unpaid_amount` DECIMAL(19,2) NOT NULL,
  `invoice_paid_amount` DECIMAL(19,2) NOT NULL,
  `invoice_number_of_cash_bill` VARCHAR(45) NULL DEFAULT NULL,
  `invoice_currency` VARCHAR(45) NOT NULL,
  `invoice_country` VARCHAR(45) NOT NULL,
  `buyer_buyer_id` INT(11) NOT NULL,
  `invoice_created_on` DATETIME NOT NULL,
  `invoice_last_modified_on` DATETIME NOT NULL,
  `user_user_id` INT(11) NOT NULL,
  `invoice_created` TINYINT(4) NULL DEFAULT NULL,
  PRIMARY KEY (`invoice_id`),
  INDEX `fk_invoice_user1_idx` (`user_user_id` ASC) VISIBLE,
  INDEX `fk_invoice_buyer1_idx` (`buyer_buyer_id` ASC) VISIBLE,
  CONSTRAINT `fk_invoice_buyer1`
    FOREIGN KEY (`buyer_buyer_id`)
    REFERENCES `stakloram`.`buyer` (`buyer_id`),
  CONSTRAINT `fk_invoice_user`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `stakloram`.`user` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stakloram`.`note`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram`.`note` ;

CREATE TABLE IF NOT EXISTS `stakloram`.`note` (
  `note_id` INT(11) NOT NULL AUTO_INCREMENT,
  `note_name` VARCHAR(45) NULL DEFAULT NULL,
  `note_description` VARCHAR(345) NULL DEFAULT NULL,
  `note_created_on` DATETIME NULL DEFAULT NULL,
  `note_last_modified_on` DATETIME NULL DEFAULT NULL,
  `user_user_id` INT(11) NOT NULL,
  PRIMARY KEY (`note_id`),
  INDEX `fk_note_user1_idx` (`user_user_id` ASC) VISIBLE,
  CONSTRAINT `user_user_id`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `stakloram`.`user` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stakloram`.`invoice_has_note`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram`.`invoice_has_note` ;

CREATE TABLE IF NOT EXISTS `stakloram`.`invoice_has_note` (
  `invoice_has_note_id` INT(11) NOT NULL AUTO_INCREMENT,
  `invoice_invoice_id` INT(11) NOT NULL,
  `note_note_id` INT(11) NOT NULL,
  PRIMARY KEY (`invoice_has_note_id`),
  INDEX `fk_invoice_has_note_note1_idx` (`note_note_id` ASC) VISIBLE,
  INDEX `fk_invoice_has_note_invoice1_idx` (`invoice_invoice_id` ASC) VISIBLE,
  CONSTRAINT `fk_invoice_has_note_invoice`
    FOREIGN KEY (`invoice_invoice_id`)
    REFERENCES `stakloram`.`invoice` (`invoice_id`),
  CONSTRAINT `fk_invoice_has_note_note`
    FOREIGN KEY (`note_note_id`)
    REFERENCES `stakloram`.`note` (`note_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stakloram`.`invoice_item`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram`.`invoice_item` ;

CREATE TABLE IF NOT EXISTS `stakloram`.`invoice_item` (
  `invoice_item_id` INT(11) NOT NULL AUTO_INCREMENT,
  `invoice_item_description` VARCHAR(545) NULL DEFAULT NULL,
  `invoice_item_unit_of_measure` VARCHAR(15) NULL DEFAULT NULL,
  `invoice_item_quantity` DECIMAL(19,10) NULL DEFAULT NULL,
  `invoice_item_price_per_unit` DECIMAL(19,10) NULL DEFAULT NULL,
  `invoice_item_net_price` DECIMAL(19,10) NULL DEFAULT NULL,
  `invoice_item_vat_rate` DECIMAL(6,2) NULL DEFAULT NULL,
  `invoice_item_vat_amount` DECIMAL(19,2) NULL DEFAULT NULL,
  `invoice_item_gross_price` DECIMAL(14,2) NULL DEFAULT NULL,
  `invoice_invoice_id` INT(11) NOT NULL,
  `invoice_item_created_on` DATETIME NULL DEFAULT NULL,
  `invoice_item_last_modified_on` DATETIME NULL DEFAULT NULL,
  `user_user_id` INT(11) NOT NULL,
  PRIMARY KEY (`invoice_item_id`),
  INDEX `fk_invoice_item_invoice1_idx` (`invoice_invoice_id` ASC) VISIBLE,
  INDEX `fk_invoice_item_user1_idx` (`user_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_invoice_item_invoice`
    FOREIGN KEY (`invoice_invoice_id`)
    REFERENCES `stakloram`.`invoice` (`invoice_id`),
  CONSTRAINT `fk_invoice_item_user`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `stakloram`.`user` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stakloram`.`product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram`.`product` ;

CREATE TABLE IF NOT EXISTS `stakloram`.`product` (
  `product_id` INT(11) NOT NULL AUTO_INCREMENT,
  `product_number` VARCHAR(45) NULL DEFAULT NULL,
  `product_description` VARCHAR(545) NOT NULL,
  `product_unit_of_measure` VARCHAR(15) NULL DEFAULT NULL,
  `product_created_on` DATETIME NULL DEFAULT NULL,
  `product_last_modified_on` DATETIME NULL DEFAULT NULL,
  `user_user_id` INT(11) NOT NULL,
  PRIMARY KEY (`product_id`),
  INDEX `fk_product_user1_idx` (`user_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_product_user`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `stakloram`.`user` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stakloram`.`invoice_item_has_product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram`.`invoice_item_has_product` ;

CREATE TABLE IF NOT EXISTS `stakloram`.`invoice_item_has_product` (
  `invoice_item_has_product_id` INT(11) NOT NULL AUTO_INCREMENT,
  `invoice_item_invoice_item_id` INT(11) NOT NULL,
  `product_product_id` INT(11) NOT NULL,
  PRIMARY KEY (`invoice_item_has_product_id`),
  INDEX `fk_invoice_item_has_product_product1_idx` (`product_product_id` ASC) VISIBLE,
  INDEX `fk_invoice_item_has_product_invoice_item1_idx` (`invoice_item_invoice_item_id` ASC) VISIBLE,
  CONSTRAINT `fk_invoice_item_has_product_invoice_item1`
    FOREIGN KEY (`invoice_item_invoice_item_id`)
    REFERENCES `stakloram`.`invoice_item` (`invoice_item_id`),
  CONSTRAINT `fk_invoice_item_has_product_product1`
    FOREIGN KEY (`product_product_id`)
    REFERENCES `stakloram`.`product` (`product_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stakloram`.`work_order_item`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram`.`work_order_item` ;

CREATE TABLE IF NOT EXISTS `stakloram`.`work_order_item` (
  `work_order_item_id` INT(11) NOT NULL AUTO_INCREMENT,
  `work_order_item_description` VARCHAR(545) NULL DEFAULT NULL,
  `work_order_item_dimension1` DECIMAL(19,2) NULL DEFAULT NULL,
  `work_order_item_dimension2` DECIMAL(19,2) NULL DEFAULT NULL,
  `work_order_item_dimension3` DECIMAL(19,2) NULL DEFAULT NULL,
  `work_order_item_quantity` DECIMAL(19,2) NULL DEFAULT NULL,
  `work_order_item_sum_quantity` DECIMAL(19,10) NULL DEFAULT NULL,
  `work_order_item_note` VARCHAR(545) NULL DEFAULT NULL,
  `work_order_work_order_id` INT(11) NOT NULL,
  `product_product_id` INT(11) NOT NULL,
  `work_order_item_settled` TINYINT(1) NULL DEFAULT NULL,
  `work_order_item_created_on` DATETIME NULL DEFAULT NULL,
  `work_order_item_last_modified_on` DATETIME NULL DEFAULT NULL,
  `user_user_id` INT(11) NOT NULL,
  PRIMARY KEY (`work_order_item_id`),
  INDEX `fk_work_order_item_work_order1_idx` (`work_order_work_order_id` ASC) VISIBLE,
  INDEX `fk_work_order_item_user1_idx` (`user_user_id` ASC) VISIBLE,
  INDEX `fk_work_order_item_product1_idx` (`product_product_id` ASC) VISIBLE,
  CONSTRAINT `fk_work_order_item_product1`
    FOREIGN KEY (`product_product_id`)
    REFERENCES `stakloram`.`product` (`product_id`),
  CONSTRAINT `fk_work_order_item_user`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `stakloram`.`user` (`user_id`),
  CONSTRAINT `fk_work_order_item_work_order`
    FOREIGN KEY (`work_order_work_order_id`)
    REFERENCES `stakloram`.`work_order` (`work_order_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stakloram`.`invoice_item_has_work_order_item`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram`.`invoice_item_has_work_order_item` ;

CREATE TABLE IF NOT EXISTS `stakloram`.`invoice_item_has_work_order_item` (
  `invoice_item_has_work_order_item_id` INT(11) NOT NULL AUTO_INCREMENT,
  `invoice_item_invoice_item_id` INT(11) NOT NULL,
  `work_order_item_work_order_item_id` INT(11) NOT NULL,
  PRIMARY KEY (`invoice_item_has_work_order_item_id`),
  INDEX `fk_invoice_item_has_work_order_item_work_order_item1_idx` (`work_order_item_work_order_item_id` ASC) VISIBLE,
  INDEX `fk_invoice_item_has_work_order_item_invoice_item1_idx` (`invoice_item_invoice_item_id` ASC) VISIBLE,
  CONSTRAINT `fk_invoice_item_has_work_order_item_invoice_item`
    FOREIGN KEY (`invoice_item_invoice_item_id`)
    REFERENCES `stakloram`.`invoice_item` (`invoice_item_id`),
  CONSTRAINT `fk_invoice_item_has_work_order_item_work_order_item`
    FOREIGN KEY (`work_order_item_work_order_item_id`)
    REFERENCES `stakloram`.`work_order_item` (`work_order_item_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stakloram`.`transaction`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stakloram`.`transaction` ;

CREATE TABLE IF NOT EXISTS `stakloram`.`transaction` (
  `transaction_id` INT(11) NOT NULL AUTO_INCREMENT,
  `transaction_amount` DECIMAL(10,2) NULL DEFAULT NULL,
  `income_income_id` INT(11) NOT NULL,
  `invoice_invoice_id` INT(11) NOT NULL,
  `transaction_created_on` DATETIME NULL DEFAULT NULL,
  `transaction_last_modified_on` DATETIME NULL DEFAULT NULL,
  `user_user_id` INT(11) NOT NULL,
  PRIMARY KEY (`transaction_id`),
  INDEX `fk_transaction_income1_idx` (`income_income_id` ASC) VISIBLE,
  INDEX `fk_transaction_invoice1_idx` (`invoice_invoice_id` ASC) VISIBLE,
  INDEX `fk_transaction_user1_idx` (`user_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_transaction_income`
    FOREIGN KEY (`income_income_id`)
    REFERENCES `stakloram`.`income` (`income_id`),
  CONSTRAINT `fk_transaction_invoice`
    FOREIGN KEY (`invoice_invoice_id`)
    REFERENCES `stakloram`.`invoice` (`invoice_id`),
  CONSTRAINT `fk_transaction_user`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `stakloram`.`user` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

USE `stakloram`;

DELIMITER $$

USE `stakloram`$$
DROP TRIGGER IF EXISTS `stakloram`.`work_order_BEFORE_DELETE` $$
USE `stakloram`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `stakloram`.`work_order_BEFORE_DELETE`
BEFORE DELETE ON `stakloram`.`work_order`
FOR EACH ROW
BEGIN
	delete FROM work_order_item where OLD.work_order_id=work_order_item.work_order_work_order_id;
    delete from image where old.work_order_id=image.work_order_work_order_id;
END$$


USE `stakloram`$$
DROP TRIGGER IF EXISTS `stakloram`.`income_BEFORE_DELETE` $$
USE `stakloram`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `stakloram`.`income_BEFORE_DELETE`
BEFORE DELETE ON `stakloram`.`income`
FOR EACH ROW
BEGIN
	delete from transaction where old.income_id=transaction.income_income_id;
END$$


USE `stakloram`$$
DROP TRIGGER IF EXISTS `stakloram`.`invoice_BEFORE_DELETE` $$
USE `stakloram`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `stakloram`.`invoice_BEFORE_DELETE`
BEFORE DELETE ON `stakloram`.`invoice`
FOR EACH ROW
BEGIN
	delete FROM invoice_item where invoice_item.invoice_invoice_id=OLD.invoice_id;
    delete from invoice_has_note where old.invoice_id=invoice_has_note.invoice_invoice_id;
END$$


USE `stakloram`$$
DROP TRIGGER IF EXISTS `stakloram`.`invoice_item_BEFORE_DELETE` $$
USE `stakloram`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `stakloram`.`invoice_item_BEFORE_DELETE`
BEFORE DELETE ON `stakloram`.`invoice_item`
FOR EACH ROW
BEGIN
	delete from invoice_item_has_work_order_item where old.invoice_item_id=invoice_item_has_work_order_item.invoice_item_invoice_item_id;
END$$


USE `stakloram`$$
DROP TRIGGER IF EXISTS `stakloram`.`invoice_item_has_work_order_item_AFTER_DELETE` $$
USE `stakloram`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `stakloram`.`invoice_item_has_work_order_item_AFTER_DELETE`
AFTER DELETE ON `stakloram`.`invoice_item_has_work_order_item`
FOR EACH ROW
BEGIN
	update work_order_item set work_order_item.work_order_item_settled=0 where old.work_order_item_work_order_item_id=work_order_item.work_order_item_id;
END$$


USE `stakloram`$$
DROP TRIGGER IF EXISTS `stakloram`.`invoice_item_has_work_order_item_AFTER_INSERT` $$
USE `stakloram`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `stakloram`.`invoice_item_has_work_order_item_AFTER_INSERT`
AFTER INSERT ON `stakloram`.`invoice_item_has_work_order_item`
FOR EACH ROW
BEGIN
	update work_order_item set work_order_item_settled=1 where work_order_item.work_order_item_id=new.work_order_item_work_order_item_id;
END$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
