-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 17, 2020 at 02:32 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lets_revise`
--

-- --------------------------------------------------------

--
-- Table structure for table `assignment`
--

CREATE TABLE `assignment` (
  `Id` int(11) NOT NULL,
  `UID` int(11) NOT NULL,
  `name` text NOT NULL,
  `pdfFile` varchar(50) DEFAULT NULL,
  `vdoFile` char(10) DEFAULT NULL,
  `isActive` bit(1) NOT NULL DEFAULT b'0',
  `file_size_limit` bigint(20) NOT NULL,
  `entryTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `assignmentquestion`
--

CREATE TABLE `assignmentquestion` (
  `Id` int(11) NOT NULL,
  `AssignmentId` int(11) NOT NULL,
  `question` varchar(50) NOT NULL,
  `isactive` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `assignmentresponse`
--

CREATE TABLE `assignmentresponse` (
  `Id` int(11) NOT NULL,
  `assignmentId` int(11) NOT NULL,
  `assignmentquestionId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `response` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `studentassignment`
--

CREATE TABLE `studentassignment` (
  `Id` int(11) NOT NULL,
  `AssignmentId` int(11) NOT NULL,
  `student_userId` int(11) NOT NULL,
  `teacher_userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `studentprofile`
--

CREATE TABLE `studentprofile` (
  `Id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `address` varchar(50) DEFAULT NULL,
  `rollNo` int(11) NOT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `phoneNo` bigint(20) DEFAULT NULL,
  `emergeencyNo` bigint(20) NOT NULL,
  `entryTime` datetime NOT NULL,
  `updateTime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `teacherprofile`
--

CREATE TABLE `teacherprofile` (
  `Id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `address` varchar(50) DEFAULT NULL,
  `empId` int(11) NOT NULL,
  `phoneNo` bigint(20) DEFAULT NULL,
  `entryTime` datetime NOT NULL,
  `updateTime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `Id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `userType` varchar(50) NOT NULL,
  `isActive` bit(1) DEFAULT b'0',
  `entrytime` datetime NOT NULL,
  `updateTime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`Id`, `username`, `password`, `userType`, `isActive`, `entrytime`, `updateTime`) VALUES
(3, 'bhavika@123.com', '123456', 'student', b'1', '2020-01-17 15:00:00', NULL),
(4, 'test@123.com', '123456', 'student', b'1', '2020-01-17 11:00:00', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assignment`
--
ALTER TABLE `assignment`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `assignmentquestion`
--
ALTER TABLE `assignmentquestion`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `AssignmentId` (`AssignmentId`);

--
-- Indexes for table `assignmentresponse`
--
ALTER TABLE `assignmentresponse`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `assignmentId` (`assignmentId`),
  ADD KEY `assignmentauestionId` (`assignmentquestionId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `studentassignment`
--
ALTER TABLE `studentassignment`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `student_userId` (`student_userId`),
  ADD KEY `teacher_userId` (`teacher_userId`),
  ADD KEY `AssignmentId` (`AssignmentId`);

--
-- Indexes for table `studentprofile`
--
ALTER TABLE `studentprofile`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `teacherprofile`
--
ALTER TABLE `teacherprofile`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assignmentquestion`
--
ALTER TABLE `assignmentquestion`
  ADD CONSTRAINT `assignmentquestion_ibfk_1` FOREIGN KEY (`AssignmentId`) REFERENCES `assignment` (`Id`);

--
-- Constraints for table `assignmentresponse`
--
ALTER TABLE `assignmentresponse`
  ADD CONSTRAINT `assignmentresponse_ibfk_1` FOREIGN KEY (`assignmentId`) REFERENCES `assignment` (`Id`),
  ADD CONSTRAINT `assignmentresponse_ibfk_2` FOREIGN KEY (`assignmentquestionId`) REFERENCES `assignmentquestion` (`Id`),
  ADD CONSTRAINT `assignmentresponse_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `user` (`Id`);

--
-- Constraints for table `studentassignment`
--
ALTER TABLE `studentassignment`
  ADD CONSTRAINT `studentassignment_ibfk_1` FOREIGN KEY (`student_userId`) REFERENCES `studentprofile` (`Id`),
  ADD CONSTRAINT `studentassignment_ibfk_2` FOREIGN KEY (`teacher_userId`) REFERENCES `teacherprofile` (`Id`),
  ADD CONSTRAINT `studentassignment_ibfk_3` FOREIGN KEY (`AssignmentId`) REFERENCES `assignment` (`Id`);

--
-- Constraints for table `studentprofile`
--
ALTER TABLE `studentprofile`
  ADD CONSTRAINT `studentprofile_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`Id`);

--
-- Constraints for table `teacherprofile`
--
ALTER TABLE `teacherprofile`
  ADD CONSTRAINT `teacherprofile_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
