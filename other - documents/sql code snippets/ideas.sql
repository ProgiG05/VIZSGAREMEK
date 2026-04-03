-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Ápr 03. 17:05
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `sproutified_db`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ideas`
--

CREATE TABLE `ideas` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `picture` varchar(50) NOT NULL,
  `plants` varchar(255) NOT NULL,
  `sunlight` varchar(50) NOT NULL,
  `water` varchar(50) NOT NULL,
  `maintenance` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `ideas`
--

INSERT INTO `ideas` (`id`, `title`, `description`, `picture`, `plants`, `sunlight`, `water`, `maintenance`) VALUES
(1, 'Herbal Kitchen Box', 'This compact indoor garden is designed for your kitchen countertop. It features essential culinary herbs including basil, thyme, and oregano. 	Requiring Moderate sunlight and Medium watering, this low-maintenance setup ensures you always have fresh, aromatic ingredients at your fingertips 	to elevate your home-cooked meals with natural flavors.', 'gardenidea1.png', 'Basil, Thyme, Oregano, Parsley, Chives', 'Moderate', 'Medium', 'Low'),
(2, 'Balcony Berry Wall', 'Maximize your outdoor space with this vertical berry garden, perfect for sunny balconies. Grow strawberries and raspberries in a space-saving 	arrangement. These plants thrive in High sunlight with Medium water requirements. With Average maintenance, you can enjoy a bountiful harvest of 	fresh, antioxidant-rich berries throughout the summer season.', 'gardenidea2.png', 'Strawberries, Blueberries, Raspberries, Goji berries', 'High', 'Medium', 'Average'),
(3, 'Tropical Patio Garden', 'Transform your patio into a lush exotic oasis with this tropical selection. Featuring pineapple and banana, this garden brings a vacation feel 	home. These plants require High sunlight and High water levels to mimic their natural habitat. With Average maintenance, you are rewarded with 	striking foliage and unique flavors.', 'gardenidea3.png', 'Pineapple, Banana, Papaya, Lemongrass, Taro', 'High', 'High', 'Average'),
(4, 'Mediterranean Herb Corner', 'Bring Mediterranean fragrances to your home with this hardy herb collection. It includes rosemary and lavender, which are drought-tolerant and love 	High sunlight. Because they require Low water and Low maintenance, they are perfect for busy gardeners. This aromatic corner provides savory herbs 	while attracting pollinators with beautiful blooms.', 'gardenidea4.png', 'Rosemary, Sage, Lavender, Oregano, Thyme', 'High', 'Low', 'Low'),
(5, 'Salad Bowl Planter', 'Grow fresh salad greens in a single large container. This mix includes lettuce and arugula, providing textures and nutrients for your meals. The 	planter thrives in Moderate sunlight with Medium watering. This Low maintenance approach allows for continuous harvesting, ensuring you have crisp, 	organic greens ready for every dinner.', 'gardenidea5.png', 'Lettuce, Spinach, Arugula, Kale, Chives', 'Moderate', 'Medium', 'Low'),
(6, 'Urban Vegetable Crate', 'This rustic wooden crate setup is perfect for growing vegetables in city environments. It houses tomatoes, peppers, and basil. These plants require 	High sunlight and Medium watering. With Average maintenance, this compact garden produces a significant yield of fresh produce, proving you do not 	need a large backyard garden.', 'gardenidea6.png', 'Tomatoes, Peppers, Eggplant, Basil, Celery', 'High', 'Medium', 'Average'),
(7, 'Rooftop Tomato Rack', 'Utilize your rooftop’s full sun potential with this vertical tomato growing rack. It features cherry tomatoes and basil for a complete Italian-	inspired garden. These plants need High sunlight and Medium water. Though they require High maintenance to manage growth, the reward is a heavy 	harvest of sweet, sun-ripened tomatoes.', 'gardenidea7.png', 'Cherry tomato, Roma tomato, Basil, Oregano, Parsley', 'High', 'Medium', 'High'),
(8, 'Desert-Friendly Edible Bed', 'Designed for hot climates, this edible garden features heat-loving plants like figs and chili peppers. These species thrive in High sunlight and 	require Low water once established. With Average maintenance, this sustainable garden provides a unique variety of fruits and spices while remaining 	resilient against harsh temperatures and limited resources.', 'gardenidea8.png', 'Figs, Chili peppers, Rosemary, Dates, Oregano', 'High', 'Low', 'Average'),
(9, 'Cold-Season Root Box', 'Keep your garden productive during cooler months with this root vegetable collection. It features carrots and radishes, which grow well in Moderate 	sunlight and Medium water. This Low maintenance box is ideal for autumn gardening, providing hearty, nutrient-dense vegetables that thrive in 	temperatures too cold for typical summer crops.', 'gardenidea9.png', 'Carrots, Beets, Radishes, Turnips, Parsnips', 'Moderate', 'Medium', 'Low'),
(10, 'Indoor LED Microgarden', 'Grow nutrient-packed microgreens year-round, regardless of the weather. Using integrated LED technology, this system supports lettuce and basil 	even in Low light indoor areas. With Medium water and Low maintenance, this high-tech garden ensures a constant supply of fresh garnishes, making it 	a perfect addition to any modern home.', 'gardenidea10.png', 'Microgreens, Lettuce, Basil, Mint, Chives', 'Low', 'Medium', 'Low'),
(11, 'The Pollinator Paradise', 'A vibrant, buzzing oasis designed to attract butterflies and bees. This garden features a succession of colorful blooms and native plants, 	providing essential nectar throughout the seasons. The variety of heights creates a lively, natural look that supports local biodiversity while 	remaining incredibly Easy to care for in High sunlight.', 'gardenidea11.png', 'Purple Coneflower, Butterfly bush, Milkweed, Bee Balm, Black-eyed Susan, Aster', 'High', 'Medium', 'Easy'),
(12, 'The Sun-Drenched Haven', 'This Mediterranean-inspired retreat pairs drought-tolerant lavender and rosemary with structural agaves. A gravel path leads to a quiet bench under 	a small olive tree, creating a water-wise sanctuary that thrives in High sunlight with minimal effort. This Low water and Easy maintenance garden 	offers a peaceful, sunny getaway.', 'gardenidea12.png', 'Olive Tree, Lavender, Rosemary, Agave, Mexican Feather Grass, Thyme', 'High', 'Low', 'Easy'),
(13, 'The Shady Woodland Retreat', 'Escape to a tranquil, cool sanctuary. This garden uses a canopy of existing trees to nurture a dense tapestry of textures, featuring varied greens 	from hostas and ferns. A winding path creates a natural, Easy to maintain sense of journey in Low sunlight environments with Medium water needs.', 'gardenidea13.png', 'Japanese Maple, Hosta, Ostrich Fern, Japanese Forest Grass, Bleeding Heart, Wild Ginger', 'Low', 'Medium', 'Easy');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `ideas`
--
ALTER TABLE `ideas`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `ideas`
--
ALTER TABLE `ideas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
