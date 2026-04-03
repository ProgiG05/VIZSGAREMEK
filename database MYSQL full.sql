CREATE DATABASE sproutified_db;
USE sproutified_db;


CREATE TABLE users (
    id       INT          AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);


CREATE TABLE gardenmanager (
    id              INT          AUTO_INCREMENT PRIMARY KEY,
    user_id         INT,
    gardenname      VARCHAR(50)  NOT NULL,
    gardencontent   TEXT,
    lastgardensaved TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY     (user_id) 	 REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE `plants` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
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
  `harvesting` varchar(100) DEFAULT NULL
);


CREATE TABLE ideas (
    id          INT           AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(150)  NOT NULL,
    plants      VARCHAR(200),
    sunlight    VARCHAR(20),
    water       VARCHAR(20),
    maintenance VARCHAR(20),
    imageURL    VARCHAR(2083)
);


CREATE TABLE knowledges (
    id          INT           AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(150)  NOT NULL,
    description TEXT          NOT NULL,
    summary 	TEXT	      DEFAULT NULL
);


CREATE TABLE worksAndTools (
    id        INT          AUTO_INCREMENT PRIMARY KEY,
    user_id   INT,
    garden_id INT,
    workName  VARCHAR(50),
    toolName  VARCHAR(100),
    FOREIGN KEY (user_id)   REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (garden_id) REFERENCES gardenmanager(id) ON DELETE CASCADE
);

CREATE TABLE savedPlants (
    id       INT       AUTO_INCREMENT PRIMARY KEY,
    user_id  INT,
    plant_id INT,
    created  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)  REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE CASCADE
);


CREATE TABLE savedIdeas (
    id      INT       AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    idea_id INT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (idea_id) REFERENCES ideas(id) ON DELETE CASCADE
);


CREATE TABLE savedWorksAndTools (
    id               INT       AUTO_INCREMENT PRIMARY KEY,
    user_id          INT,
    garden_id        INT,
    worksandtools_id INT,
    created          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)          REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (garden_id)        REFERENCES gardenmanager(id) ON DELETE CASCADE,
    FOREIGN KEY (worksandtools_id) REFERENCES worksAndTools(id) ON DELETE CASCADE
);






INSERT INTO users (username, password) VALUES
('user1','pass1'),('user2','pass2'),('user3','pass3'),
('user4','pass4'),('user5','pass5'),('user6','pass6'),
('user7','pass7'),('user8','pass8'),('user9','pass9'),
('user10','pass10');


INSERT INTO `gardenmanager` (`user_id`, `gardenname`, `gardencontent`, `lastgardensaved`) 
VALUES
  (1, 'Salsa Patch', '13,29,35;+,,15;,,;,+,', '2026-03-24 12:09:05'),
  (1, 'Victory Garden', '7,8,7,8;8,7,8,7;9,9,9,9', '2026-03-03 09:00:00'),
  (2, 'Empty Cell Test 1', '-,0,2;0,2,0;2,-,1', '2026-03-01 08:15:00'),
  (2, 'Disabled Cell Test 1', '3,,2;0,2,;5,-,1', '2026-03-01 08:15:00'),
  (3, 'new garden test', '+,+,+,+,;+,+,+,+,;+,+,+,+,;+,+,+,+,10', '2026-03-13 10:35:54'),
  (4, 'Alexovics kertje', '32', '2026-03-18 10:04:04'),
  (4, 'Some Patch', '13,29,35;+,,15;,,;,+,', '2026-03-24 12:09:05'),
  (5, 'IDK Garden', '7,8,7,8;8,7,8,7;9,9,9,9', '2026-03-03 09:00:00'),
  (5, 'Loss Garden', '-,0,2;0,2,0;2,-,1', '2026-03-01 08:15:00'),
  (5, 'Placeholder', '3,,2;0,2,;5,-,1', '2026-03-01 08:15:00');

INSERT INTO `plants` ( `commonName`, `botanicalName`, `origin`, `type`, `water`, `sunlight`, `soil`, `indoor`, `seeds`, `planting`, `pruning`, `harvesting`) VALUES
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

INSERT INTO worksAndTools (user_id, garden_id, workName, toolName) VALUES
(1,1,'planting','Hand Trowel, Gardening Gloves'),
(1,2,'watering','Watering Can, Moisture Meter'),
(2,3,'weeding','Hand Hoe, Kneeling Pad'),
(2,4,'harvesting','Pruning Shears, Garden Basket'),
(3,5,'chemical spraying','Backpack Sprayer, Safety Goggles'),
(3,6,'watering','Garden Hose, Spray Nozzle'),
(4,7,'planting','Garden Shovel, Compost Bag'),
(4,8,'weeding','Cape Cod Weeder, Garden Fork'),
(5,9,'harvesting','Sickle, Collection Crate'),
(5,10,'watering','Oscillating Sprinkler, Water Timer');

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

INSERT INTO ideas (title, plants, sunlight, water, maintenance) VALUES
('Herbal Kitchen Box', 'basil,thyme,oregano,parsley,chives', 'moderate', 'medium', 'low'),
('Balcony Berry Wall', 'strawberries,blueberries,raspberries,goji berries,currants', 'high', 'medium', 'average'),
('Tropical Patio Garden', 'pineapple,banana,papaya,lemongrass,taro', 'high', 'high', 'average'),
('Mediterranean Herb Corner', 'rosemary,sage,lavender,oregano,thyme', 'high', 'low', 'low'),
('Salad Bowl Planter', 'lettuce,spinach,arugula,kale,chives', 'moderate', 'medium', 'low'),
('Urban Vegetable Crate', 'tomatoes,peppers,eggplant,basil,celery', 'high', 'medium', 'average'),
('Rooftop Tomato Rack', 'cherry tomato,roma tomato,basil,oregano,parsley', 'high', 'medium', 'high'),
('Desert-Friendly Edible Bed', 'figs,chili peppers,rosemary,dates,oregano', 'high', 'low', 'average'),
('Cold-Season Root Box', 'carrots,beets,radishes,turnips,parsnips', 'moderate', 'medium', 'low'),
('Indoor LED Microgarden', 'microgreens,lettuce,basil,mint,chives', 'low', 'medium', 'low'),
('Windowsill Herb Strip', 'basil,mint,parsley,coriander,dill', 'moderate', 'low', 'low'),
('Three Sisters Bed', 'corn,climbing beans,butternut squash', 'high', 'medium', 'low'),
('Pollinator Herb Patch', 'lavender,borage,chamomile,lemon balm,fennel', 'high', 'low', 'low'),
('Compact Fruit Basket', 'strawberries,dwarf blueberry,dwarf apple,redcurrant,gooseberry', 'high', 'medium', 'average'),
('Raised Salad Table', 'romaine,butterhead lettuce,radishes,spring onion,nasturtium', 'moderate', 'medium', 'low'),
('Tropical Smoothie Garden', 'banana,pineapple,passion fruit,ginger,turmeric', 'high', 'high', 'high'),
('Zen Edible Corner', 'bamboo shoots,shiso,wasabi greens,ginger,lemongrass', 'moderate', 'medium', 'average'),
('Autumn Harvest Box', 'kale,Brussels sprouts,leeks,garlic,winter squash', 'moderate', 'medium', 'average'),
('Cottage Garden Mix', 'nasturtium,calendula,borage,chives,parsley', 'high', 'medium', 'low'),
('Aquaponic Mini Setup', 'lettuce,watercress,basil,mint,spinach', 'low', 'low', 'high');
