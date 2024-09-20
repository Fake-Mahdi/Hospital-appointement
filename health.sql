-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 20 sep. 2024 à 13:30
-- Version du serveur :  10.4.18-MariaDB
-- Version de PHP : 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `health`
--

-- --------------------------------------------------------

--
-- Structure de la table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `physician_name` varchar(255) DEFAULT NULL,
  `appointment_reason` text DEFAULT NULL,
  `additional_comments` text DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `userid` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('scheduled','cancelled','pending') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `appointments`
--

INSERT INTO `appointments` (`id`, `physician_name`, `appointment_reason`, `additional_comments`, `birthdate`, `userid`, `created_at`, `status`) VALUES
(1, 'Dr.green', 'i will die soon', 'i will die so save me ', '2001-12-15', '1', '2024-09-16 01:49:39', 'pending'),
(2, 'Dr.green', 'zdazdza', 'azdazdaz', '2001-07-20', '10', '2024-09-16 02:13:03', 'pending'),
(3, 'Dr.lee', 'death', 'death', '2001-12-12', '12', '2024-09-16 02:19:19', 'scheduled'),
(4, 'Dr.green', 'I just Miss U ', 'Sore wa Judan janai', '2024-12-07', '13', '2024-09-16 02:53:42', 'cancelled'),
(5, 'Dr.green', 'I Miss U ', 'Kanraze ai ni Kittai Kudasai', '2024-09-21', '14', '2024-09-16 03:02:06', 'scheduled'),
(6, 'Dr.lee', 'tomrrow afternone', 'Yeah !! After None', '2001-02-12', '10', '2024-09-16 03:05:55', 'pending'),
(7, 'Dr.cameron.', 'dazdaz', 'azdazd', '2024-12-12', '10', '2024-09-16 03:06:50', 'pending'),
(8, 'Dr.cameron.', 'I\'m Sick As Fuck  Man', 'So Please Help', '2024-09-24', '15', '2024-09-18 02:31:29', 'scheduled'),
(9, 'Dr.green', 'azdazdaz', 'azdazdaz', '2024-12-11', '16', '2024-09-18 02:39:01', 'cancelled'),
(10, 'Dr.sharma', 'zadazdazd', 'azdazdazd', '2024-09-20', '17', '2024-09-18 22:18:28', 'scheduled'),
(11, 'Dr.lee', 'zdazd', 'azdazdazd', '2001-12-12', '17', '2024-09-18 22:25:47', 'scheduled'),
(12, '', '', '', '2024-04-19', '17', '2024-09-18 22:27:19', 'cancelled'),
(13, 'Dr.lee', 'zdazdaz', 'azdazdazdaz', '2001-04-20', '17', '2024-09-18 22:27:51', 'cancelled'),
(14, 'Dr.lee', 'azdad', 'azdazd', '2009-08-19', '17', '2024-09-18 22:28:17', 'cancelled'),
(15, 'Dr.lee', 'Mahdinone none', 'azdazdazdaz', '2024-09-19', '3', '2024-09-20 10:59:34', 'cancelled');

-- --------------------------------------------------------

--
-- Structure de la table `medical`
--

CREATE TABLE `medical` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phonenumber` varchar(20) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `gender` enum('male','female','other') DEFAULT NULL,
  `emergencyname` varchar(255) DEFAULT NULL,
  `emergencyphonenumber` varchar(20) DEFAULT NULL,
  `doctor` varchar(255) DEFAULT NULL,
  `insurance` varchar(255) DEFAULT NULL,
  `insurancenumber` varchar(50) DEFAULT NULL,
  `allergies` text DEFAULT NULL,
  `currentmedication` text DEFAULT NULL,
  `familymedical` text DEFAULT NULL,
  `identification` varchar(255) DEFAULT NULL,
  `identificationnumber` varchar(50) DEFAULT NULL,
  `userid` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `pastmedical` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `medical`
--

INSERT INTO `medical` (`id`, `fullname`, `email`, `phonenumber`, `birthdate`, `gender`, `emergencyname`, `emergencyphonenumber`, `doctor`, `insurance`, `insurancenumber`, `allergies`, `currentmedication`, `familymedical`, `identification`, `identificationnumber`, `userid`, `created_at`, `pastmedical`) VALUES
(10, 'mahdi', 'azdaz', '85645', '2001-12-12', 'male', 'azazd', '654', 'Dr.green', 'azdazd', 'azdazd', 'azdazd', 'd', 'azdazdaz', 'adazd', 'azdazdazd', 'azdazdazd', '2024-09-14 22:04:06', NULL),
(11, 'mahdi', 'azdaz', '85645', '2001-12-12', 'male', 'azazd', '654', 'Dr.green', 'azdazd', 'azdazd', 'azdazd', 'azdazdazd', 'azdazdaz', 'adazd', 'azdazdazd', 'azdazdazd', '2024-09-14 22:07:08', NULL),
(12, 'mahdi', 'azdaz', '85645', '2001-12-12', 'male', 'azazd', '654', 'Dr.green', 'azdazd', 'azdazd', 'azdazd', NULL, 'azdazdaz', 'azdazdazd', 'azdazdazd', '3', '2024-09-14 22:23:32', 'azdazdazd'),
(13, 'azdazd', 'azdazdaz', 'azdazd', '2005-12-12', 'male', 'azdd', 'azdazdazdazd', 'Dr.green', 'azdazd', 'azdaz', 'azdaz', NULL, 'azdazd', 'azdazd', '5456', '5', '2024-09-15 00:12:20', 'azdaz'),
(14, 'Mahdiboukhouima', 'Mystirio.02@gmail.com', '0770208201', '2001-07-20', 'male', 'Bavaria', '0662774945', 'Dr.lee', 'alza', '21458796442', 'none', NULL, 'none', 'BMCE', '145879651235', '9', '2024-09-15 00:48:31', 'none'),
(15, 'oussama', 'oussama619@gmail.com', '0770208201', '2001-12-12', 'male', 'alza', '21458965874', 'Dr.sharma', 'alza', '2154784562', 'none', NULL, 'none alhamdoulilaah', 'ddazdazd', '5456565549', '12', '2024-09-16 02:18:13', 'none'),
(16, 'Mahdi boukhouima', 'mahdibouikhouima14@gmail.com', '0770208201', '2001-07-20', 'male', 'alza', '1254789652', 'Dr.cameron.', 'moline', 'Azb1458M1c7', 'none', NULL, 'none', 'zajdazbdazdjiazodlaz', '1456124752668', '13', '2024-09-16 02:53:03', 'none'),
(17, 'Yassine Fendaki', 'mahdibouikhouima14@gmail.com', '0678961952', '2001-12-12', 'male', 'That\'s me ', '125477953154', 'Dr.green', 'allianz maroc', 'ABC98785412', 'none', NULL, 'none', 'Carte National Marocain', 'BV938', '14', '2024-09-16 03:01:04', 'none'),
(18, 'Mahdi boukhouima', 'mystirio.02@gmail.com', '0770208201', '2001-07-20', 'male', '12346488', 'kazjdkljdklazd', 'Dr.green', 'Mahdi', '26565+', 'none', NULL, 'none', 'zdazdazd', '21351', '15', '2024-09-18 02:30:42', 'none'),
(19, 'zdazd', 'boksaad2@gmail.com', '56454466', '2001-12-12', 'male', 'azdzadazdazd', '6566++6+6', 'Dr.cameron.', 'azdazdazdazd', 'azdazdzad', 'azdazd', NULL, 'azdazd', 'azdazd', '12312312123', '16', '2024-09-18 02:38:49', 'azdazdaz'),
(20, 'Mahdi Boukhouima', 'Mahdiboukhouima14@gmail.com', '0770208201', '2001-12-12', 'male', 'zddazdzad', '65656+', 'Dr.lee', 'azdazdazdza', '45456456', 'azdazdaz', NULL, 'azdazd', 'azdazd', '54456', '17', '2024-09-18 22:18:04', 'zdazd');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`) VALUES
(1, 'Mahdi', 'Mahdiboukhouima14@gmail.com'),
(2, 'mahdi', 'mahdiboukhouima14@gmail.com'),
(3, 'mahdi', 'mahdiboukhouima@gmail.com'),
(4, 'mahdi', 'mahdiboukhouima@gmail.com'),
(5, 'musun', 'saadbkien@gmail.com'),
(6, 'messone', 'Mahdiboukhouima@gmail.com'),
(7, 'messi', 'mahdiboukhouimz14@gmail.com'),
(8, 'ronaldo', 'mahsiboukhouima@gmail.com'),
(9, 'messu', 'mahdiboukhoima14@gmail.com'),
(10, 'neymar', 'mahdiboukhouima@gmail.com'),
(11, 'pedro', 'mahdiboukhouima@gmail.com'),
(12, 'oussama', 'Mahdiboukhouima14@gmail.com'),
(13, 'sanchez', 'mahdiboukhouima14@gmail.com'),
(14, 'Yassine Fendaki', 'mahdiboukhouima14@gmail.com'),
(15, 'Mahdi boukhouima', 'Mahdiboukhouima14@gmail.com'),
(16, 'saad', 'boksaad2@gmail.com'),
(17, 'Mahdi Renbi', 'Mahdiboukhouima14@gmail.com'),
(18, 'Mosiund', 'Mahdiboukhouima14@gmail.com'),
(19, 'mahdibondu', 'Mahdiboukhouima14@gmail.com');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `medical`
--
ALTER TABLE `medical`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `medical`
--
ALTER TABLE `medical`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
