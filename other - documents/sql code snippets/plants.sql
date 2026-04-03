CREATE TABLE `plants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `commonName` varchar(100) DEFAULT NULL,
  `botanicalName` varchar(150) DEFAULT NULL,
  `origin` varchar(150) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `water` varchar(20) DEFAULT NULL,
  `sunlight` varchar(20) DEFAULT NULL,
  `soil` varchar(20) DEFAULT NULL,
  `indoor` boolean DEFAULT NULL,
  `seeds` boolean DEFAULT NULL,
  `planting` varchar(100) DEFAULT NULL,
  `pruning` varchar(100) DEFAULT NULL,
  `harvesting` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
)

INSERT INTO `plants` (
    `commonName`, `botanicalName`, `origin`, `type`, `water`, `sunlight`, `soil`, `indoor`, `seeds`, `planting`, `pruning`, `harvesting`
) VALUES
('Apple', 'Malus domestica', 'Central Asia', 'fruits', 'medium', 'high', 'moderate', 0, 0, 'March-April', 'February-March', 'September-October'),
('Potato', 'Solanum tuberosum', 'South America', 'vegetables', 'medium', 'moderate', 'high', 0, 1, 'April-May', 'None', 'August'),
('Tomato', 'Solanum lycopersicum', 'South America', 'vegetables', 'high', 'high', 'high', 0, 1, 'March-April', 'June-August', 'July-August'),
('Mint', 'Mentha spicata', 'Europe', 'herbs', 'medium', 'moderate', 'moderate', 1, 1, 'April', 'May-September', 'June-August'),
('Lemon', 'Citrus limon', 'South Asia', 'fruits', 'medium', 'high', 'high', 0, 0, 'March', 'March-April', 'October'),
('Lavender', 'Lavandula angustifolia', 'Mediterranean', 'herbs', 'low', 'high', 'moderate', 0, 1, 'April-May', 'August-September', 'July-August'),
('Basil', 'Ocimum basilicum', 'Central Africa', 'herbs', 'medium', 'high', 'moderate', 1, 1, 'April', 'June-August', 'July'),
('Aloe Vera', 'Aloe barbadensis miller', 'Arabian Peninsula', 'succulents', 'low', 'high', 'low', 1, 0, 'Year-round', 'April-May', 'Year-round'),
('Cucumber', 'Cucumis sativus', 'South Asia', 'vegetables', 'high', 'high', 'high', 0, 1, 'April-May', 'July-August', 'August'),
('Rosemary', 'Salvia rosmarinus', 'Mediterranean', 'herbs', 'low', 'high', 'low', 0, 0, 'March-April', 'May-June', 'Year-round');