CREATE DATABASE sproutified_db;
USE sproutified_db;

CREATE TABLE users (
    id       INT          AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE plants (
    id            INT          AUTO_INCREMENT PRIMARY KEY,
    plant_id      INT,
    commonName    VARCHAR(100),
    botanicalName VARCHAR(150),
    type          VARCHAR(50),
    water         VARCHAR(20),
    sunlight      VARCHAR(20),
    soil          VARCHAR(20),
    planting      VARCHAR(100),
    harvesting    VARCHAR(100),
    FOREIGN KEY (plant_id) REFERENCES users(id)
);

CREATE TABLE gardens (
    id       INT          AUTO_INCREMENT PRIMARY KEY,
    user_id  INT,
    plant_id INT,
    size     INT,
    title    VARCHAR(50),
    created  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)  REFERENCES users(id),
    FOREIGN KEY (plant_id) REFERENCES plants(id)
);

CREATE TABLE savedPlants (
    id       INT       AUTO_INCREMENT PRIMARY KEY,
    user_id  INT,
    plant_id INT,
    created  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)  REFERENCES users(id),
    FOREIGN KEY (plant_id) REFERENCES plants(id)
);

CREATE TABLE worksAndTools (
    id        INT          AUTO_INCREMENT PRIMARY KEY,
    user_id   INT,
    garden_id INT,
    workName  VARCHAR(50),
    toolName  VARCHAR(100),
    FOREIGN KEY (user_id)   REFERENCES users(id),
    FOREIGN KEY (garden_id) REFERENCES gardens(id)
);

CREATE TABLE savedWorksAndTools (
    id        INT          AUTO_INCREMENT PRIMARY KEY,
    user_id   INT,
    garden_id INT,
    created   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)   REFERENCES users(id),
    FOREIGN KEY (garden_id) REFERENCES gardens(id)
);

CREATE TABLE knowledges (
    id          INT           AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(150),
    description TEXT,
    imageURL    VARCHAR(2083)
);

CREATE TABLE ideas (
    id          INT           AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(150),
    plants      VARCHAR(200),
    sunlight    VARCHAR(20),
    water       VARCHAR(20),
    maintenance VARCHAR(20),
    imageURL    VARCHAR(2083)
);

CREATE TABLE savedIdeas (
    id      INT       AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    idea_id INT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (idea_id) REFERENCES ideas(id)
);

CREATE TABLE gardenmanager (
    id              INT         AUTO_INCREMENT PRIMARY KEY,
    user_id         INT,
    gardenname      VARCHAR(50),
    gardencontent   TEXT,
    lastgardensaved TIMESTAMP   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (username, password) VALUES
('user1','pass1'),('user2','pass2'),('user3','pass3'),
('user4','pass4'),('user5','pass5'),('user6','pass6'),
('user7','pass7'),('user8','pass8'),('user9','pass9'),
('user10','pass10');

INSERT INTO plants (plant_id, commonName, botanicalName, type, water, sunlight, soil, planting, harvesting) VALUES
(1,'Apple','Malus domestica','fruits','medium','high','moderate','March-April','September-October'),
(1,'Potato','Solanum tuberosum','vegetables','medium','moderate','high','April-May','August'),
(2,'Tomato','Solanum lycopersicum','vegetables','high','high','high','March-April','July-August'),
(2,'Mint','Mentha spicata','herbs','medium','moderate','moderate','April','June-August'),
(3,'Lemon','Citrus limon','fruits','medium','high','high','March','October'),
(3,'Carrot','Daucus carota','vegetables','low','moderate','low','March-April','August'),
(4,'Basil','Ocimum basilicum','herbs','medium','high','moderate','April','July'),
(4,'Onion','Allium cepa','vegetables','low','moderate','low','February-March','July'),
(5,'Cucumber','Cucumis sativus','vegetables','high','high','high','April-May','August'),
(5,'Strawberry','Fragaria × ananassa','fruits','medium','high','moderate','March','June');

INSERT INTO gardens (user_id, plant_id, size, title) VALUES
(1,1,20,'Apple Patch'),(1,2,30,'Potato Bed'),
(2,3,25,'Tomato Row'),(2,4,15,'Mint Corner'),
(3,5,40,'Lemon Grove'),(3,6,18,'Carrot Strip'),
(4,7,12,'Basil Box'),(4,8,22,'Onion Field'),
(5,9,28,'Cucumber Frame'),(5,10,35,'Strawberry Wall');

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

INSERT INTO knowledges (title, description) VALUES
('Gardening in Space',
'Gardening in space explores how plants can grow in microgravity, where traditional concepts like soil, weight, and natural sunlight behave very differently. Astronauts rely on specialized growth chambers that simulate ideal conditions using LED lights, controlled humidity, and nutrient-delivery systems. Without gravity, plants cannot orient themselves normally, so they rely heavily on light direction for growth cues. This field helps scientists understand how crops such as lettuce, tomatoes, and dwarf wheat adapt to unconventional environments. It also plays a vital role in planning long-term space missions, where sustainable food production will be essential. Space gardening experiments provide valuable insight into plant resilience, nutrient uptake, and the possibility of building self-sustaining ecosystems beyond Earth.'),
('Zen Gardens',
'Zen gardens, traditionally created in Japan, emphasize simplicity, balance, and mindful interaction with natural elements. While they commonly feature rocks, gravel, moss, and carefully pruned shrubs, edible plants can also be incorporated into modern interpretations. The essence of a Zen garden lies in creating a peaceful environment that encourages reflection and calmness. Patterns in raked gravel represent flowing water, while intentional empty spaces symbolize openness and possibility. Even though Zen gardens traditionally avoid clutter, they can still support small herbal plantings that blend seamlessly into the overall design. These gardens require thoughtful maintenance, but the reward is a serene outdoor environment that nourishes both the mind and the senses.'),
('Gardening in the Desert',
'Gardening in the desert involves adapting to extreme temperatures, poor soil quality, and extremely limited water availability. Successful desert gardeners rely on drought-tolerant plants, efficient irrigation systems, and methods such as mulching to retain moisture. Many edible plants, including desert melons, chilies, figs, and certain herbs, thrive under these conditions with proper care. Soil improvement techniques, like adding organic matter or using raised beds, can significantly increase productivity. Desert gardening highlights the resilience of both plants and gardeners, demonstrating how food can be grown sustainably even in climates that seem harsh and unforgiving.'),
('Vertical Gardening',
'Vertical gardening maximizes growing space by training plants upward using trellises, walls, stacked planters, or modular systems. This method is ideal for urban environments where horizontal space is limited. Edible plants such as strawberries, leafy greens, herbs, beans, and cucumbers adapt particularly well to vertical structures. Vertical gardens improve air circulation, reduce weed problems, and create visually striking green walls. They can be used indoors or outdoors, depending on available sunlight. The approach supports efficient water use, sometimes through drip irrigation or hydroponic setups. Vertical gardening encourages sustainable living, offering an accessible way for people to grow fresh foods even in compact spaces.'),
('Aquaponic Gardening',
'Aquaponic gardening combines aquaculture and hydroponics to form a closed-loop ecosystem where fish waste provides nutrients for plants, and plants help filter the water for the fish. Edible crops like lettuce, basil, tomatoes, and peppers thrive in aquaponic systems due to the naturally nutrient-rich water. This method requires careful balancing of fish health, beneficial bacteria, and plant growth conditions. Aquaponics is highly sustainable because it uses significantly less water than traditional gardening and produces two sources of food simultaneously. It is particularly appealing for those interested in environmentally friendly food production.'),
('Urban Rooftop Gardens',
'Urban rooftop gardens transform unused roof space into productive green environments capable of growing vegetables, fruits, and herbs. These gardens help reduce heat absorption in cities, improve air quality, and provide fresh produce close to home. Rooftop gardens may use raised beds, containers, or even hydroponic systems to optimize growing conditions. With proper planning regarding structural load, waterproofing, and wind protection, rooftops become vibrant, high-yield microfarms. They are an excellent solution for individuals who wish to garden despite living in densely populated areas with limited ground-level access.'),
('Tropical Food Gardens',
'Tropical food gardens support plants that thrive in warm, humid climates with abundant sunlight. Crops such as pineapples, bananas, papayas, taro, and lemongrass grow exceptionally well in these environments. Tropical gardens often develop into lush, layered ecosystems, with tall fruit trees providing shade for smaller herbs and vegetables. Good soil drainage is essential due to frequent rainfall. Tropical food gardening celebrates biodiversity, offering colorful and flavorful harvests while supporting pollinators and other wildlife.'),
('Permaculture Gardens',
'Permaculture gardens are designed to function like natural ecosystems, emphasizing sustainability, diversity, and long-term productivity. Edible plants are arranged in layers, from tall trees to ground cover, creating efficient nutrient cycles and minimizing waste. Common permaculture crops include berries, herbs, perennial vegetables, and fruit trees. These gardens rely on natural processes such as composting, mulching, and companion planting to reduce external inputs. Permaculture encourages self-sufficiency and environmental stewardship while producing consistent, reliable harvests year after year.'),
('Cold Climate Gardening',
'Cold climate gardening focuses on growing edible plants in regions with short growing seasons, frost risks, and low temperatures. Gardeners use cold frames, greenhouses, mulch, and frost-resistant varieties to extend the planting period. Crops like kale, carrots, potatoes, and hardy herbs can tolerate cold conditions surprisingly well. Proper planning, including soil warming techniques and season extension methods, allows for successful food production despite environmental challenges. This approach showcases human ingenuity in adapting food systems to harsh climates.'),
('Coastal Gardening',
'Coastal gardening deals with challenges such as salty winds, sandy soils, and high humidity. With strategic planning, gardeners can successfully cultivate edible plants like figs, rosemary, tomatoes, and chard in coastal zones. Techniques include creating windbreaks, improving soil structure with organic matter, and selecting salt-tolerant varieties. Coastal gardens often benefit from abundant sunlight and mild temperatures, which support year-round growth of many crops. The result is a productive garden well-adapted to its marine environment.'),
('Companion Planting',
'Companion planting is the practice of growing different plants in close proximity so they mutually benefit each other. Classic pairings like tomatoes and basil, or the Three Sisters combination of corn, beans, and squash, demonstrate how plants can protect and nourish one another naturally. Some companions repel pests, others fix nitrogen in the soil, and some simply make better use of vertical and horizontal space. Understanding which plants thrive together and which inhibit each other is a key skill that reduces the need for chemical intervention. Companion planting is one of the oldest and most effective tools in sustainable gardening.'),
('Raised Bed Gardening',
'Raised bed gardening involves growing plants in soil elevated above the ground level, enclosed within a frame made of wood, metal, or stone. This method offers excellent drainage, warmer soil temperatures, and protection from ground pests like slugs. Gardeners have precise control over soil composition, which is especially valuable in areas with poor native soil. Raised beds are easier on the back, reduce weed pressure, and allow for earlier planting in spring. They are equally suitable for beginners and experienced gardeners, and can be adapted to almost any space, from large backyards to small patios.'),
('Container Gardening',
'Container gardening allows plants to be grown in pots, buckets, crates, and other vessels, making it ideal for balconies, patios, and indoor spaces. Almost any edible plant can be grown in a container if the vessel is the right size and has adequate drainage. Tomatoes, peppers, herbs, salad greens, and even dwarf fruit trees perform exceptionally well in containers. The key challenges are managing moisture levels, as containers dry out faster than ground soil, and ensuring consistent nutrition through regular feeding. Container gardening offers unmatched flexibility, letting gardeners move plants to optimize sunlight exposure throughout the day.'),
('Seed Saving',
'Seed saving is the practice of collecting, drying, and storing seeds from your best-performing plants for use in future seasons. It is one of the oldest agricultural traditions and a powerful way to preserve rare or heirloom plant varieties that may not be available commercially. Open-pollinated and heirloom varieties are best suited for seed saving, as hybrid seeds often do not produce true-to-type offspring. Proper drying and storage in cool, dry, dark conditions can keep seeds viable for several years. Seed saving builds self-reliance in the garden and deepens the gardeners connection to the full life cycle of their plants.'),
('Composting for Gardeners',
'Composting transforms kitchen scraps and garden waste into rich, dark organic matter that dramatically improves soil health and plant productivity. A well-managed compost pile balances green materials like vegetable peels and fresh grass clippings with brown materials like dried leaves and cardboard. Microorganisms, worms, and insects break down this material over weeks or months into humus, which feeds plants and improves soil structure. Regularly turning the pile introduces oxygen and speeds up decomposition. Composting reduces household waste, eliminates the need for synthetic fertilizers, and creates a sustainable cycle that keeps nutrients circulating within your own garden ecosystem.');

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
