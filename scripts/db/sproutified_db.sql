-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.4.3 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for sproutified_db
DROP DATABASE IF EXISTS `sproutified_db`;
CREATE DATABASE IF NOT EXISTS `sproutified_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sproutified_db`;

-- Dumping structure for table sproutified_db.garden_manager
DROP TABLE IF EXISTS `garden_manager`;
CREATE TABLE IF NOT EXISTS `garden_manager` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `garden_name` varchar(50) NOT NULL,
  `garden_content` text,
  `last_garden_saved` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `garden_manager_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Dumping structure for table sproutified_db.ideas
DROP TABLE IF EXISTS `ideas`;
CREATE TABLE IF NOT EXISTS `ideas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `picture` varchar(50) NOT NULL,
  `plants` varchar(255) NOT NULL,
  `sunlight` varchar(50) NOT NULL,
  `water` varchar(50) NOT NULL,
  `maintenance` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table sproutified_db.ideas: ~13 rows (approximately)
INSERT INTO `ideas` (`id`, `title`, `description`, `picture`, `plants`, `sunlight`, `water`, `maintenance`) VALUES
	(1, 'Herbal Kitchen Box', 'This compact indoor garden is designed for your kitchen countertop. It features essential culinary herbs including basil, thyme, and oregano. Requiring Moderate sunlight and Medium watering, this low-maintenance setup ensures you always have fresh, aromatic ingredients at your fingertips 	to elevate your home-cooked meals with natural flavors.', 'HerbalKitchenBox', 'Basil, Thyme, Oregano, Parsley, Chives', 'Moderate', 'Medium', 'Low'),
	(2, 'Balcony Berry Wall', 'Maximize your outdoor space with this vertical berry garden, perfect for sunny balconies. Grow strawberries and raspberries in a space-saving arrangement. These plants thrive in High sunlight with Medium water requirements. With Average maintenance, you can enjoy a bountiful harvest of 	fresh, antioxidant-rich berries throughout the summer season.', 'BalconyBerryWall', 'Strawberries, Blueberries, Raspberries, Goji berries', 'High', 'Medium', 'Average'),
	(3, 'Tropical Patio Garden', 'Transform your patio into a lush exotic oasis with this tropical selection. Featuring pineapple and banana, this garden brings a vacation feel home. These plants require High sunlight and High water levels to mimic their natural habitat. With Average maintenance, you are rewarded with 	striking foliage and unique flavors.', 'TropicalPatioGarden', 'Pineapple, Banana, Papaya, Lemongrass, Taro', 'High', 'High', 'Average'),
	(4, 'Mediterranean Herb Corner', 'Bring Mediterranean fragrances to your home with this hardy herb collection. It includes rosemary and lavender, which are drought-tolerant and love High sunlight. Because they require Low water and Low maintenance, they are perfect for busy gardeners. This aromatic corner provides savory herbs 	while attracting pollinators with beautiful blooms.', 'MediterraneanHerbCorner', 'Rosemary, Sage, Lavender, Oregano, Thyme', 'High', 'Low', 'Low'),
	(5, 'Salad Bowl Planter', 'Grow fresh salad greens in a single large container. This mix includes lettuce and arugula, providing textures and nutrients for your meals. The planter thrives in Moderate sunlight with Medium watering. This Low maintenance approach allows for continuous harvesting, ensuring you have crisp, organic greens ready for every dinner.', 'SaladBowlPlanter', 'Lettuce, Spinach, Arugula, Kale, Chives', 'Moderate', 'Medium', 'Low'),
	(6, 'Urban Vegetable Crate', 'This rustic wooden crate setup is perfect for growing vegetables in city environments. It houses tomatoes, peppers, and basil. These plants require 	High sunlight and Medium watering. With Average maintenance, this compact garden produces a significant yield of fresh produce, proving you do not need a large backyard garden.', 'UrbanVegetableCrate', 'Tomatoes, Peppers, Eggplant, Basil, Celery', 'High', 'Medium', 'Average'),
	(7, 'Rooftop Tomato Rack', 'Utilize your rooftop’s full sun potential with this vertical tomato growing rack. It features cherry tomatoes and basil for a complete Italian-inspired garden. These plants need High sunlight and Medium water. Though they require High maintenance to manage growth, the reward is a heavy harvest of sweet, sun-ripened tomatoes.', 'RooftopTomatoRack', 'Cherry tomato, Roma tomato, Basil, Oregano, Parsley', 'High', 'Medium', 'High'),
	(8, 'Desert-Friendly Edible Bed', 'Designed for hot climates, this edible garden features heat-loving plants like figs and chili peppers. These species thrive in High sunlight and require Low water once established. With Average maintenance, this sustainable garden provides a unique variety of fruits and spices while remaining resilient against harsh temperatures and limited resources.', 'DesertFriendlyEdibleBed', 'Figs, Chili peppers, Rosemary, Dates, Oregano', 'High', 'Low', 'Average'),
	(9, 'Cold-Season Root Box', 'Keep your garden productive during cooler months with this root vegetable collection. It features carrots and radishes, which grow well in Moderate sunlight and Medium water. This Low maintenance box is ideal for autumn gardening, providing hearty, nutrient-dense vegetables that thrive in temperatures too cold for typical summer crops.', 'ColdSeasonRootBox', 'Carrots, Beets, Radishes, Turnips, Parsnips', 'Moderate', 'Medium', 'Low'),
	(10, 'Indoor LED Microgarden', 'Grow nutrient-packed microgreens year-round, regardless of the weather. Using integrated LED technology, this system supports lettuce and basil even in Low light indoor areas. With Medium water and Low maintenance, this high-tech garden ensures a constant supply of fresh garnishes, making it a perfect addition to any modern home.', 'IndoorLEDMicrogarden', 'Microgreens, Lettuce, Basil, Mint, Chives', 'Low', 'Medium', 'Low'),
	(11, 'The Pollinator Paradise', 'A vibrant, buzzing oasis designed to attract butterflies and bees. This garden features a succession of colorful blooms and native plants, providing essential nectar throughout the seasons. The variety of heights creates a lively, natural look that supports local biodiversity while remaining incredibly Easy to care for in High sunlight.', 'ThePollinatorParadise', 'Purple Coneflower, Butterfly bush, Milkweed, Bee Balm, Black-eyed Susan, Aster', 'High', 'Medium', 'Easy'),
	(12, 'The Sun-Drenched Haven', 'This Mediterranean-inspired retreat pairs drought-tolerant lavender and rosemary with structural agaves. A gravel path leads to a quiet bench under a small olive tree, creating a water-wise sanctuary that thrives in High sunlight with minimal effort. This Low water and Easy maintenance garden offers a peaceful, sunny getaway.', 'TheSunDrenchedHaven', 'Olive Tree, Lavender, Rosemary, Agave, Mexican Feather Grass, Thyme', 'High', 'Low', 'Easy'),
	(13, 'The Shady Woodland Retreat', 'Escape to a tranquil, cool sanctuary. This garden uses a canopy of existing trees to nurture a dense tapestry of textures, featuring varied greens from hostas and ferns. A winding path creates a natural, Easy to maintain sense of journey in Low sunlight environments with Medium water needs.', 'TheShadyWoodlandRetreat', 'Japanese Maple, Hosta, Ostrich Fern, Japanese Forest Grass, Bleeding Heart, Wild Ginger', 'Low', 'Medium', 'Easy');

-- Dumping structure for table sproutified_db.knowledges
DROP TABLE IF EXISTS `knowledges`;
CREATE TABLE IF NOT EXISTS `knowledges` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `summary` text,
  `picture` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table sproutified_db.knowledges: ~15 rows (approximately)
INSERT INTO `knowledges` (`id`, `title`, `description`, `summary`, `picture`) VALUES
	(1, 'Gardening in Space', 'Gardening in space explores how plants can grow in microgravity, where traditional concepts like soil, weight, and natural sunlight behave very differently. Astronauts rely on specialized growth chambers that simulate ideal conditions using LED lights, controlled humidity, and nutrient-delivery systems. Without gravity, plants cannot orient themselves normally, so they rely heavily on light direction for growth cues. This field helps scientists understand how crops such as lettuce, tomatoes, and dwarf wheat adapt to unconventional environments. It also plays a vital role in planning long-term space missions, where sustainable food production will be essential. Space gardening experiments provide valuable insight into plant resilience, nutrient uptake, and the possibility of building self-sustaining ecosystems beyond Earth.', 'Master zero-gravity farming with LED chambers and nutrient systems to sustain life and fresh nutrition on long-term interstellar missions.', 'GardeningInSpace'),
	(2, 'Zen Gardens', 'Zen gardens, traditionally created in Japan, emphasize simplicity, balance, and mindful interaction with natural elements. While they commonly feature rocks, gravel, moss, and carefully pruned shrubs, edible plants can also be incorporated into modern interpretations. The essence of a Zen garden lies in creating a peaceful environment that encourages reflection and calmness. Patterns in raked gravel represent flowing water, while intentional empty spaces symbolize openness and possibility. Even though Zen gardens traditionally avoid clutter, they can still support small herbal plantings that blend seamlessly into the overall design. These gardens require thoughtful maintenance, but the reward is a serene outdoor environment that nourishes both the mind and the senses.', 'Create a minimalist sanctuary using raked gravel and moss to foster deep reflection, mental clarity, and profound inner peace.', 'ZenGardens'),
	(3, 'Gardening in the Desert', 'Gardening in the desert involves adapting to extreme temperatures, poor soil quality, and extremely limited water availability. Successful desert gardeners rely on drought-tolerant plants, efficient irrigation systems, and methods such as mulching to retain moisture. Many edible plants, including desert melons, chilies, figs, and certain herbs, thrive under these conditions with proper care. Soil improvement techniques, like adding organic matter or using raised beds, can significantly increase productivity. Desert gardening highlights the resilience of both plants and gardeners, demonstrating how food can be grown sustainably even in climates that seem harsh and unforgiving.', 'Defy extreme heat using drought-tolerant plants and smart irrigation to transform scorched, arid landscapes into productive, sustainable food oases.', 'GardeningInTheDesert'),
	(4, 'Vertical Gardening', 'Vertical gardening maximizes growing space by training plants upward using trellises, walls, stacked planters, or modular systems. This method is ideal for urban environments where horizontal space is limited. Edible plants such as strawberries, leafy greens, herbs, beans, and cucumbers adapt particularly well to vertical structures. Vertical gardens improve air circulation, reduce weed problems, and create visually striking green walls. They can be used indoors or outdoors, depending on available sunlight. The approach supports efficient water use, sometimes through drip irrigation or hydroponic setups. Vertical gardening encourages sustainable living, offering an accessible way for people to grow fresh foods even in compact spaces.', 'Maximize limited urban footprints by growing upward, turning bare walls into lush, oxygen-rich towers of fresh herbs and vegetables.', 'VerticalGardening'),
	(5, 'Aquaponic Gardening', 'Aquaponic gardening combines aquaculture and hydroponics to form a closed-loop ecosystem where fish waste provides nutrients for plants, and plants help filter the water for the fish. Edible crops like lettuce, basil, tomatoes, and peppers thrive in aquaponic systems due to the naturally nutrient-rich water. This method requires careful balancing of fish health, beneficial bacteria, and plant growth conditions. Aquaponics is highly sustainable because it uses significantly less water than traditional gardening and produces two sources of food simultaneously. It is particularly appealing for those interested in environmentally friendly food production.', 'Cultivates a perfect closed-loop ecosystem where fish and plants thrive together, saving water while producing two sustainable food sources.', 'AquaponicGardening'),
	(6, 'Urban Rooftop Gardens', 'Urban rooftop gardens transform unused roof space into productive green environments capable of growing vegetables, fruits, and herbs. These gardens help reduce heat absorption in cities, improve air quality, and provide fresh produce close to home. Rooftop gardens may use raised beds, containers, or even hydroponic systems to optimize growing conditions. With proper planning regarding structural load, waterproofing, and wind protection, rooftops become vibrant, high-yield microfarms. They are an excellent solution for individuals who wish to garden despite living in densely populated areas with limited ground-level access.', 'Transform idle city skylines into vibrant micro-farms that cool buildings, improve air quality, and provide hyper-local, fresh organic produce.', 'UrbanRooftopGardens'),
	(7, 'Tropical Food Gardens', 'Tropical food gardens support plants that thrive in warm, humid climates with abundant sunlight. Crops such as pineapples, bananas, papayas, taro, and lemongrass grow exceptionally well in these environments. Tropical gardens often develop into lush, layered ecosystems, with tall fruit trees providing shade for smaller herbs and vegetables. Good soil drainage is essential due to frequent rainfall. Tropical food gardening celebrates biodiversity, offering colorful and flavorful harvests while supporting pollinators and other wildlife.', 'Cultivate lush, layered ecosystems with pineapples and bananas, utilizing abundant sunlight and humidity to create a vibrant, biodiverse edible paradise.', 'TropicalFoodGardens'),
	(8, 'Permaculture Gardens', 'Permaculture gardens are designed to function like natural ecosystems, emphasizing sustainability, diversity, and long-term productivity. Edible plants are arranged in layers, from tall trees to ground cover, creating efficient nutrient cycles and minimizing waste. Common permaculture crops include berries, herbs, perennial vegetables, and fruit trees. These gardens rely on natural processes such as composting, mulching, and companion planting to reduce external inputs. Permaculture encourages self-sufficiency and environmental stewardship while producing consistent, reliable harvests year after year.', 'Design self-sustaining edible ecosystems that mimic nature, using layered planting and natural nutrient cycles to ensure long-term, diverse food productivity.', 'PermacultureGardens'),
	(9, 'Cold Climate Gardening', 'Cold climate gardening focuses on growing edible plants in regions with short growing seasons, frost risks, and low temperatures. Gardeners use cold frames, greenhouses, mulch, and frost-resistant varieties to extend the planting period. Crops like kale, carrots, potatoes, and hardy herbs can tolerate cold conditions surprisingly well. Proper planning, including soil warming techniques and season extension methods, allows for successful food production despite environmental challenges. This approach showcases human ingenuity in adapting food systems to harsh climates.', 'Master short growing seasons using frost-resistant crops and protective structures to harvest hardy vegetables despite freezing temperatures and harsh winters.', 'ColdClimateGardening'),
	(10, 'Coastal Gardening', 'Coastal gardening deals with challenges such as salty winds, sandy soils, and high humidity. With strategic planning, gardeners can successfully cultivate edible plants like figs, rosemary, tomatoes, and chard in coastal zones. Techniques include creating windbreaks, improving soil structure with organic matter, and selecting salt-tolerant varieties. Coastal gardens often benefit from abundant sunlight and mild temperatures, which support year-round growth of many crops. The result is a productive garden well-adapted to its marine environment.', 'Cultivate salt-tolerant gardens by building windbreaks and enriching sandy soils to grow resilient, sun-drenched crops in demanding maritime environments.', 'CoastalGardening'),
	(11, 'History of matcha', 'Matcha’s story started in 1191 when the monk Eisai brought seeds from China to Japan, eventually finding the perfect terroir in Uji, Kyoto. Originally a medicinal tonic for Zen monks, matcha farming evolved significantly during the 16th century with the invention of shading.By covering the bushes weeks before harvest, farmers forced the plants to produce extra chlorophyll and L-theanine, creating that signature vibrant green and mellow umami taste.This labor-intensive tradition remains the backbone of Japanese tea culture, transforming humble leaves into the "liquid jade" we obsess over today.', 'Trace matcha from 12th-century monk traditions to Kyoto’s shading techniques, creating the vibrant, umami-rich "liquid jade" celebrated in Japanese culture.', 'HistoryOfMatcha'),
	(12, 'Companion Planting', 'Companion planting is the strategic placement of different plant species close to one another to enhance growth, deter pests, and improve soil quality. This ancient practice relies on the natural relationships between plants; for example, tall sunflowers can provide shade for sensitive lettuce, while marigolds release chemicals that repel harmful nematodes. One of the most famous examples is the "Three Sisters" method—corn, beans, and squash—where the corn provides a trellis for beans, beans fix nitrogen in the soil, and squash leaves act as a living mulch. By creating these symbiotic relationships, gardeners can reduce their reliance on chemical fertilizers and pesticides, fostering a more balanced and resilient garden ecosystem.', 'Boost garden health and yield by pairing plants that naturally protect each other and share nutrients, creating a harmonious and chemical-free ecosystem.', 'CompanionPlanting'),
	(13, 'Moon Phase Gardening', 'Moon phase gardening is a traditional practice based on the belief that the lunar cycle influences plant growth through its gravitational pull on water, similar to the tides. According to this method, the "waxing" moon (increasing light) is the best time for planting crops that produce above-ground, such as leafy greens and grains, because the rising moisture encourages germination. Conversely, the "waning" moon (decreasing light) is ideal for root crops like carrots and potatoes, as the energy shifts toward the soil and root development. While scientific debate continues, many gardeners swear by these cycles to improve plant vigor and harvest quality, connecting modern horticulture to ancient celestial wisdom.', 'Use the lunar cycle to time planting and harvesting, leveraging the moon\'s gravitational pull on water to optimize seed germination and plant growth.', 'MoonPhaseGardening'),
	(14, 'Victory Gardens', 'Victory gardens, also known as "war gardens," were fruit, herb, and vegetable gardens planted at private residences and public parks during World War I and World War II. These gardens were promoted by governments to reduce pressure on the public food supply and boost morale by allowing citizens to contribute directly to the war effort. At their peak, nearly 20 million victory gardens in the United States produced roughly 40 percent of all vegetables consumed in the country. This movement transformed lawns and empty lots into productive spaces, teaching an entire generation the value of self-sufficiency and community resilience. Today, the spirit of victory gardening lives on in the modern push for urban agriculture and food security.', 'Rediscover the historical movement of home-grown food that supported nations during wartime, fostering community spirit and total food self-sufficiency.', 'VictoryGardens'),
	(15, 'The Science of Edible Flowers', 'Edible flowers have been used for centuries in culinary traditions ranging from Ancient Rome to Victorian England, adding color, fragrance, and unique flavors to dishes. Common garden varieties like nasturtiums, pansies, lavender, and calendula are not only decorative but often packed with antioxidants and vitamins. For instance, nasturtiums offer a peppery kick similar to watercress, while borage provides a refreshing cucumber-like taste. Beyond their culinary appeal, growing edible flowers encourages pollinators like bees and butterflies to visit the garden, which improves the yields of neighboring vegetable crops. Integrating these blooms turns a functional vegetable patch into a multi-sensory gourmet landscape.', 'Enhance your plate and garden with vibrant, edible blooms that offer unique flavors and nutritional benefits, turning landscapes into gourmet pantries.', 'EdibleFlowers');

-- Dumping structure for table sproutified_db.plants
DROP TABLE IF EXISTS `plants`;
CREATE TABLE IF NOT EXISTS `plants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `common_name` varchar(100) DEFAULT NULL,
  `botanical_name` varchar(150) DEFAULT NULL,
  `origin` varchar(150) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `water` varchar(20) DEFAULT NULL,
  `sunlight` varchar(20) DEFAULT NULL,
  `soil` varchar(20) DEFAULT NULL,
  `indoor` tinyint(1) DEFAULT NULL,
  `seeds` tinyint(1) DEFAULT NULL,
  `planting` varchar(100) DEFAULT NULL,
  `pruning` varchar(100) DEFAULT NULL,
  `harvesting` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table sproutified_db.plants: ~82 rows (approximately)
INSERT INTO `plants` (`id`, `common_name`, `botanical_name`, `origin`, `type`, `water`, `sunlight`, `soil`, `indoor`, `seeds`, `planting`, `pruning`, `harvesting`) VALUES
	(1, 'Apple', 'Malus domestica', 'Central Asia', 'fruits', 'medium', 'high', 'moderate', 0, 0, 'March-April', 'February-March', 'September-October'),
	(2, 'Potato', 'Solanum tuberosum', 'South America', 'vegetables', 'medium', 'moderate', 'high', 0, 1, 'April-May', 'None', 'August'),
	(3, 'Tomato', 'Solanum lycopersicum', 'South America', 'vegetables', 'high', 'high', 'high', 0, 1, 'March-April', 'June-August', 'July-August'),
	(4, 'Mint', 'Mentha spicata', 'Europe', 'herbs', 'medium', 'moderate', 'moderate', 1, 1, 'April', 'May-September', 'June-August'),
	(5, 'Lemon', 'Citrus limon', 'South Asia', 'fruits', 'medium', 'high', 'high', 0, 0, 'March', 'March-April', 'October'),
	(6, 'Lavender', 'Lavandula angustifolia', 'Mediterranean', 'herbs', 'low', 'high', 'moderate', 0, 1, 'April-May', 'August-September', 'July-August'),
	(7, 'Basil', 'Ocimum basilicum', 'Central Africa', 'herbs', 'medium', 'high', 'moderate', 1, 1, 'April', 'June-August', 'July'),
	(8, 'Aloe Vera', 'Aloe barbadensis miller', 'Arabian Peninsula', 'succulents', 'low', 'high', 'low', 1, 0, 'Year-round', 'April-May', 'Year-round'),
	(9, 'Cucumber', 'Cucumis sativus', 'South Asia', 'vegetables', 'high', 'high', 'high', 0, 1, 'April-May', 'July-August', 'August'),
	(10, 'Rosemary', 'Salvia rosmarinus', 'Mediterranean', 'herbs', 'low', 'high', 'low', 0, 0, 'March-April', 'May-June', 'Year-round'),
	(11, 'Thyme', 'Thymus vulgaris', 'Mediterranean', 'herbs', 'low', 'high', 'low', 1, 1, 'April-May', 'June', 'Year-round'),
	(12, 'Oregano', 'Origanum vulgare', 'Mediterranean', 'herbs', 'low', 'high', 'moderate', 1, 1, 'April-May', 'July', 'Year-round'),
	(13, 'Parsley', 'Petroselinum crispum', 'Mediterranean', 'herbs', 'medium', 'moderate', 'high', 1, 1, 'March-April', 'None', 'June-October'),
	(14, 'Chives', 'Allium schoenoprasum', 'Asia/Europe', 'herbs', 'medium', 'moderate', 'high', 1, 1, 'March-May', 'None', 'April-November'),
	(15, 'Strawberry', 'Fragaria x ananassa', 'North America', 'fruits', 'medium', 'high', 'moderate', 0, 1, 'March-April', 'October', 'June-July'),
	(16, 'Blueberry', 'Vaccinium corymbosum', 'North America', 'fruits', 'high', 'high', 'high', 0, 0, 'March-April', 'January-February', 'July-August'),
	(17, 'Raspberry', 'Rubus idaeus', 'Europe/Asia', 'fruits', 'medium', 'high', 'high', 0, 0, 'November-March', 'February', 'July-August'),
	(18, 'Goji berry', 'Lycium barbarum', 'Asia', 'fruits', 'medium', 'high', 'moderate', 0, 1, 'March-May', 'February', 'August-October'),
	(19, 'Pineapple', 'Ananas comosus', 'South America', 'fruits', 'medium', 'high', 'low', 1, 0, 'Year-round', 'None', 'Year-round'),
	(20, 'Banana', 'Musa', 'Southeast Asia', 'fruits', 'high', 'high', 'high', 0, 0, 'Year-round', 'Year-round', 'Year-round'),
	(21, 'Papaya', 'Carica papaya', 'Central America', 'fruits', 'high', 'high', 'moderate', 0, 1, 'Year-round', 'None', 'Year-round'),
	(22, 'Lemongrass', 'Cymbopogon', 'Asia', 'herbs', 'high', 'high', 'moderate', 1, 0, 'March-May', 'None', 'July-October'),
	(23, 'Taro', 'Colocasia esculenta', 'Southeast Asia', 'vegetables', 'high', 'moderate', 'high', 0, 0, 'March-April', 'None', 'October-November'),
	(24, 'Sage', 'Salvia officinalis', 'Mediterranean', 'herbs', 'low', 'high', 'low', 1, 1, 'April-May', 'March', 'Year-round'),
	(25, 'Lettuce', 'Lactuca sativa', 'Egypt', 'vegetables', 'medium', 'moderate', 'moderate', 1, 1, 'March-May', 'None', 'May-July'),
	(26, 'Spinach', 'Spinacia oleracea', 'Central Asia', 'vegetables', 'medium', 'moderate', 'high', 0, 1, 'March-April', 'None', 'May-June'),
	(27, 'Arugula', 'Eruca vesicaria', 'Mediterranean', 'vegetables', 'medium', 'moderate', 'moderate', 1, 1, 'April-May', 'None', 'May-September'),
	(28, 'Kale', 'Brassica oleracea', 'Europe', 'vegetables', 'medium', 'high', 'moderate', 0, 1, 'March-May', 'None', 'June-October'),
	(29, 'Pepper', 'Capsicum annuum', 'Central/South America', 'vegetables', 'medium', 'high', 'high', 1, 1, 'March-April', 'None', 'July-October'),
	(30, 'Eggplant', 'Solanum melongena', 'Asia', 'vegetables', 'high', 'high', 'high', 0, 1, 'April-May', 'None', 'August-September'),
	(31, 'Celery', 'Apium graveolens', 'Mediterranean', 'vegetables', 'high', 'moderate', 'high', 0, 1, 'March-April', 'None', 'August-October'),
	(32, 'Cherry tomato', 'S. lycopersicum var. cerasiforme', 'South America', 'vegetables', 'high', 'high', 'high', 0, 1, 'March-April', 'June-August', 'July-September'),
	(33, 'Roma tomato', 'S. lycopersicum Roma', 'South America', 'vegetables', 'high', 'high', 'high', 0, 1, 'March-April', 'June-August', 'August-September'),
	(34, 'Fig', 'Ficus carica', 'Middle East', 'fruits', 'medium', 'high', 'moderate', 0, 0, 'March-April', 'January-February', 'August-September'),
	(35, 'Chili pepper', 'Capsicum annuum', 'Americas', 'vegetables', 'medium', 'high', 'moderate', 1, 1, 'March-April', 'None', 'August-October'),
	(36, 'Date Palm', 'Phoenix dactylifera', 'Middle East', 'fruits', 'low', 'high', 'low', 0, 1, 'March-May', 'None', 'September-October'),
	(37, 'Carrot', 'Daucus carota', 'Persia', 'vegetables', 'medium', 'high', 'low', 0, 1, 'March-July', 'None', 'June-October'),
	(38, 'Beet', 'Beta vulgaris', 'Mediterranean', 'vegetables', 'medium', 'moderate', 'moderate', 0, 1, 'April-July', 'None', 'June-October'),
	(39, 'Radish', 'Raphanus sativus', 'Asia', 'vegetables', 'medium', 'moderate', 'low', 1, 1, 'March-September', 'None', 'April-October'),
	(40, 'Turnip', 'Brassica rapa', 'Europe', 'vegetables', 'medium', 'moderate', 'moderate', 0, 1, 'March-April', 'None', 'June-July'),
	(41, 'Parsnip', 'Pastinaca sativa', 'Europe/Asia', 'vegetables', 'medium', 'high', 'high', 0, 1, 'March-April', 'None', 'October-November'),
	(42, 'Microgreens', 'Various species', 'Worldwide', 'vegetables', 'high', 'low', 'moderate', 1, 1, 'Year-round', 'None', 'Year-round'),
	(43, 'Purple Coneflower', 'Echinacea purpurea', 'North America', 'flowers', 'medium', 'high', 'moderate', 0, 1, 'March-May', 'None', 'July-September'),
	(44, 'Butterfly bush', 'Buddleja', 'Asia/Americas', 'flowers', 'medium', 'high', 'moderate', 0, 0, 'March-April', 'March', 'July-September'),
	(45, 'Milkweed', 'Asclepias', 'Americas', 'flowers', 'low', 'high', 'low', 0, 1, 'March-April', 'None', 'June-August'),
	(46, 'Bee Balm', 'Monarda', 'North America', 'flowers', 'high', 'high', 'high', 0, 1, 'April-May', 'None', 'July-August'),
	(47, 'Black-eyed Susan', 'Rudbeckia hirta', 'North America', 'flowers', 'low', 'high', 'moderate', 0, 1, 'March-May', 'None', 'July-September'),
	(48, 'Aster', 'Asteraceae', 'Worldwide', 'flowers', 'medium', 'high', 'moderate', 0, 1, 'April-May', 'None', 'August-October'),
	(49, 'Olive Tree', 'Olea europaea', 'Mediterranean', 'fruits', 'low', 'high', 'low', 0, 0, 'March-April', 'February-March', 'October-November'),
	(50, 'Agave', 'Agave', 'Americas', 'succulents', 'low', 'high', 'low', 1, 0, 'Year-round', 'None', 'Year-round'),
	(51, 'Mexican Feather Grass', 'Stipa tenuissima', 'Americas', 'grass', 'low', 'high', 'low', 0, 1, 'March-April', 'March', 'Year-round'),
	(52, 'Japanese Maple', 'Acer palmatum', 'Asia', 'trees', 'medium', 'moderate', 'moderate', 0, 0, 'November-March', 'January', 'None'),
	(53, 'Hosta', 'Hosta', 'Asia', 'flowers', 'high', 'low', 'high', 0, 0, 'March-April', 'None', 'None'),
	(54, 'Ostrich Fern', 'Matteuccia struthiopteris', 'N. Hemisphere', 'ferns', 'high', 'low', 'high', 1, 0, 'March-April', 'None', 'None'),
	(55, 'Japanese Forest Grass', 'Hakonechloa macra', 'Japan', 'grass', 'high', 'low', 'high', 0, 0, 'March-April', 'March', 'None'),
	(56, 'Bleeding Heart', 'Lamprocapnos spectabilis', 'Asia', 'flowers', 'medium', 'low', 'high', 0, 0, 'March-April', 'None', 'May-June'),
	(57, 'Wild Ginger', 'Asarum', 'N. Hemisphere', 'herbs', 'medium', 'low', 'high', 1, 0, 'March-April', 'None', 'Year-round'),
	(58, 'Moonflower', 'Ipomoea alba', 'Tropical Americas', 'flowers', 'high', 'high', 'moderate', 0, 1, 'April-May', 'None', 'August-October'),
	(59, 'Jasmine', 'Jasminum officinale', 'Eurasia', 'flowers', 'medium', 'high', 'moderate', 1, 0, 'March-April', 'February-March', 'June-September'),
	(60, 'White Rose', 'Rosa alba', 'Europe', 'flowers', 'medium', 'high', 'high', 0, 0, 'March-April', 'February', 'June-July'),
	(61, 'Silver Mound Artemisia', 'Artemisia schmidtiana', 'Japan', 'ornamental', 'low', 'high', 'low', 0, 0, 'April-May', 'July', 'None'),
	(62, 'Evening Primrose', 'Oenothera biennis', 'North America', 'flowers', 'low', 'high', 'low', 0, 1, 'April-May', 'None', 'July-September'),
	(63, 'Chamomile', 'Matricaria chamomilla', 'Europe', 'herbs', 'medium', 'high', 'moderate', 1, 1, 'March-May', 'None', 'June-August'),
	(64, 'Peppermint', 'Mentha × piperita', 'Europe', 'herbs', 'high', 'moderate', 'moderate', 1, 0, 'April-May', 'May-September', 'June-September'),
	(65, 'Lemon Balm', 'Melissa officinalis', 'Europe', 'herbs', 'medium', 'moderate', 'moderate', 1, 1, 'March-May', 'June-August', 'June-October'),
	(66, 'Stevia', 'Stevia rebaudiana', 'South America', 'herbs', 'high', 'high', 'high', 1, 1, 'May-June', 'None', 'September-October'),
	(67, 'Cilantro', 'Coriandrum sativum', 'Mediterranean', 'herbs', 'medium', 'moderate', 'moderate', 1, 1, 'March-September', 'None', 'May-October'),
	(68, 'Red Onion', 'Allium cepa', 'Central Asia', 'vegetables', 'medium', 'high', 'moderate', 0, 1, 'March-April', 'None', 'August-September'),
	(69, 'Echeveria', 'Echeveria elegans', 'Mexico', 'succulents', 'low', 'high', 'low', 1, 0, 'Year-round', 'None', 'Year-round'),
	(70, 'Sedum', 'Sedum spectabile', 'East Asia', 'succulents', 'low', 'high', 'low', 0, 0, 'April-May', 'March', 'None'),
	(71, 'Jade Plant', 'Crassula ovata', 'South Africa', 'succulents', 'low', 'high', 'low', 1, 0, 'Year-round', 'March-April', 'Year-round'),
	(72, 'Ghost Plant', 'Graptopetalum paraguayense', 'Mexico', 'succulents', 'low', 'high', 'low', 1, 0, 'Year-round', 'None', 'Year-round'),
	(73, 'Sweet Alyssum', 'Lobularia maritima', 'Mediterranean', 'flowers', 'medium', 'high', 'moderate', 0, 1, 'March-May', 'None', 'June-October'),
	(74, 'Gardenia', 'Gardenia jasminoides', 'East Asia', 'flowers', 'high', 'moderate', 'high', 1, 0, 'March-April', 'July', 'June-August'),
	(75, 'Dianthus', 'Dianthus caryophyllus', 'Eurasia', 'flowers', 'medium', 'high', 'moderate', 0, 1, 'March-May', 'None', 'June-August'),
	(76, 'Scented Geranium', 'Pelargonium graveolens', 'South Africa', 'herbs', 'low', 'high', 'moderate', 1, 0, 'April-May', 'March', 'June-September'),
	(77, 'Dwarf Pear', 'Pyrus communis', 'Eurasia', 'fruits', 'medium', 'high', 'high', 0, 0, 'March-April', 'February', 'August-September'),
	(78, 'Dwarf Cherry', 'Prunus avium', 'Europe', 'fruits', 'medium', 'high', 'high', 0, 0, 'March-April', 'February', 'June-July'),
	(79, 'Sheet Moss', 'Hypnum cupressiforme', 'Northern Hemisphere', 'mosses', 'high', 'low', 'moderate', 0, 0, 'Year-round', 'None', 'None'),
	(80, 'Cushion Moss', 'Leucobryum glaucum', 'North America', 'mosses', 'high', 'low', 'moderate', 0, 0, 'Year-round', 'None', 'None'),
	(81, 'Maidenhair Fern', 'Adiantum aethiopicum', 'Australia', 'ferns', 'high', 'low', 'high', 1, 0, 'March-April', 'March', 'None'),
	(82, 'Irish Moss', 'Sagina subulata', 'Europe', 'ornamental', 'medium', 'moderate', 'moderate', 0, 1, 'April-May', 'None', 'June-August');

-- Dumping structure for table sproutified_db.refresh_tokens
DROP TABLE IF EXISTS `refresh_tokens`;
CREATE TABLE IF NOT EXISTS `refresh_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token_hash` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_refresh_tokens_users` (`user_id`),
  CONSTRAINT `FK_refresh_tokens_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Dumping structure for table sproutified_db.saved_ideas
DROP TABLE IF EXISTS `saved_ideas`;
CREATE TABLE IF NOT EXISTS `saved_ideas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `idea_id` int DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `idea_id` (`idea_id`),
  CONSTRAINT `saved_ideas_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `saved_ideas_ibfk_2` FOREIGN KEY (`idea_id`) REFERENCES `ideas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table sproutified_db.saved_ideas: ~0 rows (approximately)

-- Dumping structure for table sproutified_db.saved_plants
DROP TABLE IF EXISTS `saved_plants`;
CREATE TABLE IF NOT EXISTS `saved_plants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `plant_id` int DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `plant_id` (`plant_id`),
  CONSTRAINT `saved_plants_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `saved_plants_ibfk_2` FOREIGN KEY (`plant_id`) REFERENCES `plants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Dumping structure for table sproutified_db.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
