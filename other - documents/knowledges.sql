-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Ápr 03. 16:27
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
-- Tábla szerkezet ehhez a táblához `knowledges`
--

CREATE TABLE `knowledges` (
  `id` int(11) NOT NULL,
  `title` varchar(150) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `summary` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `knowledges`
--

INSERT INTO `knowledges` (`title`, `description`, `summary`) VALUES
('Gardening in Space', 'Gardening in space explores how plants can grow in microgravity, where traditional concepts like soil, weight, and natural sunlight behave very differently. Astronauts rely on specialized growth chambers that simulate ideal conditions using LED lights, controlled humidity, and nutrient-delivery systems. Without gravity, plants cannot orient themselves normally, so they rely heavily on light direction for growth cues. This field helps scientists understand how crops such as lettuce, tomatoes, and dwarf wheat adapt to unconventional environments. It also plays a vital role in planning long-term space missions, where sustainable food production will be essential. Space gardening experiments provide valuable insight into plant resilience, nutrient uptake, and the possibility of building self-sustaining ecosystems beyond Earth.', 'Master zero-gravity farming with LED chambers and nutrient systems to sustain life and fresh nutrition on long-term interstellar missions.'),
('Zen Gardens', 'Zen gardens, traditionally created in Japan, emphasize simplicity, balance, and mindful interaction with natural elements. While they commonly feature rocks, gravel, moss, and carefully pruned shrubs, edible plants can also be incorporated into modern interpretations. The essence of a Zen garden lies in creating a peaceful environment that encourages reflection and calmness. Patterns in raked gravel represent flowing water, while intentional empty spaces symbolize openness and possibility. Even though Zen gardens traditionally avoid clutter, they can still support small herbal plantings that blend seamlessly into the overall design. These gardens require thoughtful maintenance, but the reward is a serene outdoor environment that nourishes both the mind and the senses.', 'Create a minimalist sanctuary using raked gravel and moss to foster deep reflection, mental clarity, and profound inner peace.'),
('Gardening in the Desert', 'Gardening in the desert involves adapting to extreme temperatures, poor soil quality, and extremely limited water availability. Successful desert gardeners rely on drought-tolerant plants, efficient irrigation systems, and methods such as mulching to retain moisture. Many edible plants, including desert melons, chilies, figs, and certain herbs, thrive under these conditions with proper care. Soil improvement techniques, like adding organic matter or using raised beds, can significantly increase productivity. Desert gardening highlights the resilience of both plants and gardeners, demonstrating how food can be grown sustainably even in climates that seem harsh and unforgiving.', 'Defy extreme heat using drought-tolerant plants and smart irrigation to transform scorched, arid landscapes into productive, sustainable food oases.'),
('Vertical Gardening', 'Vertical gardening maximizes growing space by training plants upward using trellises, walls, stacked planters, or modular systems. This method is ideal for urban environments where horizontal space is limited. Edible plants such as strawberries, leafy greens, herbs, beans, and cucumbers adapt particularly well to vertical structures. Vertical gardens improve air circulation, reduce weed problems, and create visually striking green walls. They can be used indoors or outdoors, depending on available sunlight. The approach supports efficient water use, sometimes through drip irrigation or hydroponic setups. Vertical gardening encourages sustainable living, offering an accessible way for people to grow fresh foods even in compact spaces.', 'Maximize limited urban footprints by growing upward, turning bare walls into lush, oxygen-rich towers of fresh herbs and vegetables.'),
('Aquaponic Gardening', 'Aquaponic gardening combines aquaculture and hydroponics to form a closed-loop ecosystem where fish waste provides nutrients for plants, and plants help filter the water for the fish. Edible crops like lettuce, basil, tomatoes, and peppers thrive in aquaponic systems due to the naturally nutrient-rich water. This method requires careful balancing of fish health, beneficial bacteria, and plant growth conditions. Aquaponics is highly sustainable because it uses significantly less water than traditional gardening and produces two sources of food simultaneously. It is particularly appealing for those interested in environmentally friendly food production.', 'Cultivates a perfect closed-loop ecosystem where fish and plants thrive together, saving water while producing two sustainable food sources.'),
('Urban Rooftop Gardens', 'Urban rooftop gardens transform unused roof space into productive green environments capable of growing vegetables, fruits, and herbs. These gardens help reduce heat absorption in cities, improve air quality, and provide fresh produce close to home. Rooftop gardens may use raised beds, containers, or even hydroponic systems to optimize growing conditions. With proper planning regarding structural load, waterproofing, and wind protection, rooftops become vibrant, high-yield microfarms. They are an excellent solution for individuals who wish to garden despite living in densely populated areas with limited ground-level access.', 'Transform idle city skylines into vibrant micro-farms that cool buildings, improve air quality, and provide hyper-local, fresh organic produce.'),
('Tropical Food Gardens', 'Tropical food gardens support plants that thrive in warm, humid climates with abundant sunlight. Crops such as pineapples, bananas, papayas, taro, and lemongrass grow exceptionally well in these environments. Tropical gardens often develop into lush, layered ecosystems, with tall fruit trees providing shade for smaller herbs and vegetables. Good soil drainage is essential due to frequent rainfall. Tropical food gardening celebrates biodiversity, offering colorful and flavorful harvests while supporting pollinators and other wildlife.', 'Cultivate lush, layered ecosystems with pineapples and bananas, utilizing abundant sunlight and humidity to create a vibrant, biodiverse edible paradise.'),
('Permaculture Gardens', 'Permaculture gardens are designed to function like natural ecosystems, emphasizing sustainability, diversity, and long-term productivity. Edible plants are arranged in layers, from tall trees to ground cover, creating efficient nutrient cycles and minimizing waste. Common permaculture crops include berries, herbs, perennial vegetables, and fruit trees. These gardens rely on natural processes such as composting, mulching, and companion planting to reduce external inputs. Permaculture encourages self-sufficiency and environmental stewardship while producing consistent, reliable harvests year after year.', 'Design self-sustaining edible ecosystems that mimic nature, using layered planting and natural nutrient cycles to ensure long-term, diverse food productivity.'),
('Cold Climate Gardening', 'Cold climate gardening focuses on growing edible plants in regions with short growing seasons, frost risks, and low temperatures. Gardeners use cold frames, greenhouses, mulch, and frost-resistant varieties to extend the planting period. Crops like kale, carrots, potatoes, and hardy herbs can tolerate cold conditions surprisingly well. Proper planning, including soil warming techniques and season extension methods, allows for successful food production despite environmental challenges. This approach showcases human ingenuity in adapting food systems to harsh climates.', 'Master short growing seasons using frost-resistant crops and protective structures to harvest hardy vegetables despite freezing temperatures and harsh winters.'),
('Coastal Gardening', 'Coastal gardening deals with challenges such as salty winds, sandy soils, and high humidity. With strategic planning, gardeners can successfully cultivate edible plants like figs, rosemary, tomatoes, and chard in coastal zones. Techniques include creating windbreaks, improving soil structure with organic matter, and selecting salt-tolerant varieties. Coastal gardens often benefit from abundant sunlight and mild temperatures, which support year-round growth of many crops. The result is a productive garden well-adapted to its marine environment.', 'Cultivate salt-tolerant gardens by building windbreaks and enriching sandy soils to grow resilient, sun-drenched crops in demanding maritime environments.'),
('History of matcha', 'Matcha’s story started in 1191 when the monk Eisai brought seeds from China to Japan, eventually finding the perfect terroir in Uji, Kyoto. Originally a medicinal tonic for Zen monks, matcha farming evolved significantly during the 16th century with the invention of shading.By covering the bushes weeks before harvest, farmers forced the plants to produce extra chlorophyll and L-theanine, creating that signature vibrant green and mellow umami taste.This labor-intensive tradition remains the backbone of Japanese tea culture, transforming humble leaves into the \"liquid jade\" we obsess over today.', 'Trace matcha from 12th-century monk traditions to Kyoto’s shading techniques, creating the vibrant, umami-rich \"liquid jade\" celebrated in Japanese culture.');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `knowledges`
--
ALTER TABLE `knowledges`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `knowledges`
--
ALTER TABLE `knowledges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
