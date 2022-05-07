-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema employeeRegistration
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema employeeRegistration
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `employeeRegistration` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `employeeRegistration` ;

-- -----------------------------------------------------
-- Table `employeeRegistration`.`gender`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `employeeRegistration`.`gender` (
  `genderID` CHAR(1) NOT NULL,
  `gender` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`genderID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `employeeRegistration`.`account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `employeeRegistration`.`account` (
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `birthday` DATE NOT NULL,
  `gender` CHAR(1) NOT NULL,
  PRIMARY KEY (`email`),
  INDEX `fk_gender_account` (`gender` ASC) VISIBLE,
  CONSTRAINT `fk_gender_account`
    FOREIGN KEY (`gender`)
    REFERENCES `employeeRegistration`.`gender` (`genderID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `employeeRegistration`.`department`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `employeeRegistration`.`department` (
  `departmentID` INT NOT NULL,
  `department` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`departmentID`, `email`),
  INDEX `fk_account_department` (`email` ASC) VISIBLE,
  CONSTRAINT `fk_account_department`
    FOREIGN KEY (`email`)
    REFERENCES `employeeRegistration`.`account` (`email`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `employeeRegistration`.`jobTitle`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `employeeRegistration`.`jobTitle` (
  `email` VARCHAR(45) NOT NULL,
  `jobTitleID` INT NOT NULL,
  `jobTitle` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`jobTitleID`, `email`),
  INDEX `fk_account_jobtitle` (`email` ASC) VISIBLE,
  CONSTRAINT `fk_account_jobtitle`
    FOREIGN KEY (`email`)
    REFERENCES `employeeRegistration`.`account` (`email`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `employeeRegistration`.`employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `employeeRegistration`.`employee` (
  `employeeID` INT NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `birthday` DATE NOT NULL,
  `gender` CHAR(1) NULL DEFAULT NULL,
  `department` INT NULL DEFAULT NULL,
  `jobTitle` INT NULL DEFAULT NULL,
  PRIMARY KEY (`employeeID`, `email`),
  INDEX `fk_account_employee` (`email` ASC) VISIBLE,
  INDEX `fk_gender_employee` (`gender` ASC) VISIBLE,
  INDEX `fk_department_employee` (`department` ASC) VISIBLE,
  INDEX `fk_jobTitle_employee` (`jobTitle` ASC) VISIBLE,
  CONSTRAINT `fk_account_employee`
    FOREIGN KEY (`email`)
    REFERENCES `employeeRegistration`.`account` (`email`),
  CONSTRAINT `fk_department_employee`
    FOREIGN KEY (`department`)
    REFERENCES `employeeRegistration`.`department` (`departmentID`)
    ON DELETE SET NULL
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_gender_employee`
    FOREIGN KEY (`gender`)
    REFERENCES `employeeRegistration`.`gender` (`genderID`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_jobTitle_employee`
    FOREIGN KEY (`jobTitle`)
    REFERENCES `employeeRegistration`.`jobTitle` (`jobTitleID`)
    ON DELETE SET NULL
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
