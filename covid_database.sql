-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 18, 2022 at 04:52 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `covid_record`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `countPatients` (IN `id` INT)  NO SQL
BEGIN
UPDATE hospital SET hospital.no_patients=(SELECT COUNT(*) FROM treatment WHERE treatment.hospital_id=id) WHERE hospital.hospital_id=id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `demography`
--

CREATE TABLE `demography` (
  `Patient_id` int(11) NOT NULL,
  `Height` float NOT NULL,
  `Weight` float NOT NULL,
  `Qualification` varchar(30) NOT NULL,
  `Job` varchar(20) NOT NULL,
  `Travel` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `demography`
--

INSERT INTO `demography` (`Patient_id`, `Height`, `Weight`, `Qualification`, `Job`, `Travel`) VALUES
(13, 171, 70, 'B.E', 'Software Engineer', 'Dubai'),
(14, 155, 65, '12th Pass', 'Artist', 'jammu'),
(15, 160, 75, 'Undergraduate ', 'Student', 'Varanasi'),
(16, 182, 80, 'Undergraduate', 'Student', 'Mirzapur'),
(17, 170, 71, 'B.E ', 'Sales Executive ', 'Muzaffarpur'),
(18, 190, 57, 'B.Tech', 'S.E', 'London');

-- --------------------------------------------------------

--
-- Table structure for table `family_history`
--

CREATE TABLE `family_history` (
  `Member_id` int(11) NOT NULL,
  `Member_blood_group` varchar(3) NOT NULL,
  `Member_name` varchar(30) NOT NULL,
  `Member_covid_history` tinyint(1) NOT NULL,
  `Patient_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `family_history`
--

INSERT INTO `family_history` (`Member_id`, `Member_blood_group`, `Member_name`, `Member_covid_history`, `Patient_id`) VALUES
(1, '', 'Ajay', 1, 6),
(2, '', 'Ajay', 1, 7),
(7, 'B+', 'Aryan', 0, 13),
(8, 'B+', 'Sadiq', 0, 14),
(9, 'B+', 'Devendra Upadhaya', 1, 15),
(10, 'O-', 'Ashwit Patel', 1, 16),
(11, 'O+', 'Mohit Kishan', 0, 17),
(12, 'B+', 'Anil', 0, 18);

-- --------------------------------------------------------

--
-- Table structure for table `hospital`
--

CREATE TABLE `hospital` (
  `hospital_id` int(11) NOT NULL,
  `city` varchar(15) NOT NULL,
  `hospital_name` varchar(50) NOT NULL,
  `state` varchar(20) NOT NULL,
  `no_patients` int(2) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hospital`
--

INSERT INTO `hospital` (`hospital_id`, `city`, `hospital_name`, `state`, `no_patients`, `createdAt`, `updatedAt`) VALUES
(1, 'Bangalore', 'BGS', 'Karnataka', NULL, '2022-01-02 05:42:44', '2022-01-02 05:42:44'),
(3, 'Ranchi', 'Sadar', 'Jharkhand', 1, '2022-01-02 05:49:31', '2022-01-18 03:34:01'),
(4, 'Ranchi', 'RIMS', 'Jharkhand', NULL, '2022-01-04 04:17:40', '2022-01-04 04:17:40'),
(5, 'New Delhi', 'AIMS', 'Delhi', 1, '2022-01-04 04:18:12', '2022-01-18 03:46:46'),
(6, 'Bangalore', 'Fortis', 'Karnataka ', NULL, '2022-01-04 04:18:44', '2022-01-04 04:18:44'),
(7, 'Patna', 'Medanta', 'Bihar', NULL, '2022-01-04 04:27:30', '2022-01-04 04:27:30'),
(8, 'Patna', 'Ruban', 'Bihar', NULL, '2022-01-04 04:27:56', '2022-01-04 04:27:56'),
(9, 'Bangalore', 'Apollo', 'Karnataka', NULL, '2022-01-16 17:33:01', '2022-01-16 17:33:01');

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `Patient_id` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `Age` int(3) NOT NULL,
  `Gender` varchar(1) NOT NULL,
  `Blood_group` varchar(3) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`Patient_id`, `Name`, `Age`, `Gender`, `Blood_group`, `createdAt`, `updatedAt`) VALUES
(1, 'Shyam', 25, 'M', 'B+', '2021-12-28 07:07:18', '2021-12-28 07:07:18'),
(2, 'Satyam', 25, 'M', 'B+', '2021-12-28 07:07:34', '2021-12-28 07:07:34'),
(3, 'Ravi', 20, 'M', 'O+', '2021-12-28 07:08:57', '2021-12-28 07:08:57'),
(4, 'Rahul', 42, 'M', 'A+', '2021-12-28 07:30:36', '2021-12-28 07:30:36'),
(5, 'Rahul', 42, 'M', 'A+', '2021-12-28 11:33:54', '2021-12-28 11:33:54'),
(6, 'Rahul', 42, 'M', 'A+', '2021-12-28 11:34:48', '2021-12-28 11:34:48'),
(7, 'Ravi', 22, 'M', 'A+', '2021-12-28 11:37:39', '2021-12-28 11:37:39'),
(11, 'Raj', 20, 'M', 'O-', '2022-01-02 05:48:10', '2022-01-02 05:48:10'),
(13, 'Akash', 21, 'M', 'AB+', '2022-01-03 20:35:05', '2022-01-11 03:34:31'),
(14, 'Ashrya Verma ', 24, 'M', 'O+', '2022-01-04 04:24:12', '2022-01-10 15:16:23'),
(15, 'Ashwit Patel', 23, 'M', 'B-', '2022-01-04 04:26:43', '2022-01-14 14:42:23'),
(16, 'Devendra Upadhaya', 26, 'M', 'AB+', '2022-01-04 04:30:34', '2022-01-04 04:30:34'),
(17, 'Avinash Anand', 21, 'M', 'B+', '2022-01-04 04:34:55', '2022-01-04 04:34:55'),
(18, 'Arnav', 25, 'M', 'B-', '2022-01-04 04:48:52', '2022-01-18 03:47:48');

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE `test` (
  `test_no` int(11) NOT NULL,
  `test_date` date NOT NULL,
  `result` varchar(20) NOT NULL,
  `symptoms` text NOT NULL,
  `patient_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `test`
--

INSERT INTO `test` (`test_no`, `test_date`, `result`, `symptoms`, `patient_id`) VALUES
(5, '1999-12-31', 'Negative', 'Fever, Cough', 13),
(6, '2021-07-14', 'Positive', 'Fever,Cough', 14),
(7, '2021-12-23', 'Negative', 'Asymptomatic ', 15),
(8, '2021-12-23', 'Positive', 'Fever,Cough', 16),
(9, '2021-11-26', 'Positive', 'Fever,Cough', 17),
(10, '2021-12-07', 'Negative', 'Cough', 18);

--
-- Triggers `test`
--
DELIMITER $$
CREATE TRIGGER `setDischarge` AFTER UPDATE ON `test` FOR EACH ROW BEGIN
IF (OLD.Result = 'Positive') AND (NEW.Result = 'Negative') THEN
UPDATE treatment SET discharge_date = CURRENT_TIMESTAMP WHERE treatment.patient_id = NEW.patient_id;
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `treatment`
--

CREATE TABLE `treatment` (
  `patient_id` int(11) NOT NULL,
  `hospital_id` int(11) NOT NULL,
  `admission_no` int(10) NOT NULL,
  `start_date` date NOT NULL,
  `discharge_date` date NOT NULL,
  `icu_admission` tinyint(1) NOT NULL,
  `critical_condition` tinyint(1) NOT NULL,
  `icu_days` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `treatment`
--

INSERT INTO `treatment` (`patient_id`, `hospital_id`, `admission_no`, `start_date`, `discharge_date`, `icu_admission`, `critical_condition`, `icu_days`) VALUES
(15, 7, 1, '2022-01-05', '2022-01-16', 1, 1, 5),
(13, 8, 2, '2022-01-01', '2022-01-06', 0, 0, 3),
(17, 3, 3, '2021-12-31', '2022-01-09', 0, 0, 4),
(18, 5, 26, '2022-01-06', '2022-01-18', 1, 1, 3);

--
-- Triggers `treatment`
--
DELIMITER $$
CREATE TRIGGER `callProcedure` AFTER INSERT ON `treatment` FOR EACH ROW BEGIN
IF(NEW.hospital_id) THEN
CALL countPatients(NEW.hospital_id);
END IF;
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `demography`
--
ALTER TABLE `demography`
  ADD PRIMARY KEY (`Patient_id`),
  ADD UNIQUE KEY `D_fk` (`Patient_id`) USING BTREE;

--
-- Indexes for table `family_history`
--
ALTER TABLE `family_history`
  ADD PRIMARY KEY (`Member_id`),
  ADD KEY `Foreign` (`Patient_id`);

--
-- Indexes for table `hospital`
--
ALTER TABLE `hospital`
  ADD PRIMARY KEY (`hospital_id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`Patient_id`);

--
-- Indexes for table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`test_no`),
  ADD KEY `t_fk` (`patient_id`);

--
-- Indexes for table `treatment`
--
ALTER TABLE `treatment`
  ADD PRIMARY KEY (`admission_no`),
  ADD KEY `t_fk1` (`patient_id`),
  ADD KEY `t_fk2` (`hospital_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `family_history`
--
ALTER TABLE `family_history`
  MODIFY `Member_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `hospital`
--
ALTER TABLE `hospital`
  MODIFY `hospital_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `Patient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `test`
--
ALTER TABLE `test`
  MODIFY `test_no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `treatment`
--
ALTER TABLE `treatment`
  MODIFY `admission_no` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `demography`
--
ALTER TABLE `demography`
  ADD CONSTRAINT `D_fk` FOREIGN KEY (`Patient_id`) REFERENCES `patient` (`Patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `family_history`
--
ALTER TABLE `family_history`
  ADD CONSTRAINT `F_fk` FOREIGN KEY (`Patient_id`) REFERENCES `patient` (`Patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `test`
--
ALTER TABLE `test`
  ADD CONSTRAINT `t_fk` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`Patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `treatment`
--
ALTER TABLE `treatment`
  ADD CONSTRAINT `t_fk1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`Patient_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `t_fk2` FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`hospital_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
