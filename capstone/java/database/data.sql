BEGIN TRANSACTION;

-- the password for both users is "password"
INSERT INTO users (username,password_hash,role) VALUES ('user','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('admin','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN');

-- Diets
INSERT INTO diets (bird_diet)
VALUES ('Insectivore') , ('Vegetarian') , ('Omnivore'), ('Carnivore');

--Ranges
INSERT INTO ranges (bird_range)
VALUES ('North America') , ('South America') , ('Europe'), ('Asia'), ('Australia'), ('Africa');

--Birds
INSERT INTO birds (bird_name, wingspan, range_id, diet_id, img_url, bird_description)
VALUES

-- North American Birds (range_id = 1)
-- wingspan measured in cm
('American Robin', 36, 1, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/American_robin_%2871307%29.jpg/2560px-American_robin_%2871307%29.jpg', 'A medium-sized songbird with a distinctive orange-red breast and cheerful song, known as a harbinger of spring.'),
('Bald Eagle', 220, 1, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Bald_eagle_about_to_fly_in_Alaska_%282016%29.jpg/1920px-Bald_eagle_about_to_fly_in_Alaska_%282016%29.jpg', 'America''s national bird, a powerful raptor with distinctive white head and tail feathers that can soar up to 10,000 feet.'),
('Blue Jay', 34, 1, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Blue_jay_in_Central_Park_%2816465%29.jpg/2560px-Blue_jay_in_Central_Park_%2816465%29.jpg', 'An intelligent corvid with striking blue coloration and crest, known for complex social behavior and mimicry abilities.'),
('Northern Cardinal', 30, 1, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Cardinal_with_raspberries.jpg/960px-Cardinal_with_raspberries.jpg', 'A vibrant red songbird where males display brilliant scarlet plumage year-round and clear whistling songs.'),
('Red-tailed Hawk', 130, 1, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Red-tailed_Hawk_%2845812546121%29.jpg/2560px-Red-tailed_Hawk_%2845812546121%29.jpg', 'A large, broad-winged hawk with distinctive reddish tail, one of the most common hawks in North America.'),
('American Goldfinch', 22, 1, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Carduelis_tristis_-Michigan%2C_USA_-male-8.jpg/500px-Carduelis_tristis_-Michigan%2C_USA_-male-8.jpg', 'A small, bright yellow finch that undergoes dramatic seasonal plumage changes during breeding season.'),
('House Sparrow', 24, 1, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/House_sparrow_male_in_Prospect_Park_%2853532%29.jpg/500px-House_sparrow_male_in_Prospect_Park_%2853532%29.jpg', 'A small, adaptable songbird that has successfully colonized urban environments worldwide.'),
('Mourning Dove', 45, 1, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Av_Mourning_Dove_JG.jpg/500px-Av_Mourning_Dove_JG.jpg', 'A gentle dove with distinctive mournful call, known for being excellent parents and ground feeders.'),
('Turkey Vulture', 180, 1, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Turkey_vulture_%28Cathartes_aura%29_in_flight.JPG/500px-Turkey_vulture_%28Cathartes_aura%29_in_flight.JPG', 'A large scavenging bird with impressive wingspan and bald red head, crucial for ecosystem cleanup.'),
('Downy Woodpecker', 30, 1, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Downy_Woodpecker01.jpg/500px-Downy_Woodpecker01.jpg', 'The smallest woodpecker in North America with black and white plumage and males having red head patches.'),
('Scissor-Tailed Flycatcher', 37, 1, 1, 'https://www.allaboutbirds.org/guide/assets/photo/65684761-480px.jpg', 'Oklahoma''s state bird with dramatically long forked tail and acrobatic flight displays during migration.'),
('Purple Martin', 39, 1, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Progne_subis-male_chirping.jpg/500px-Progne_subis-male_chirping.jpg', 'The largest swallow in North America with dark purple-blue plumage and complex colonial social structures.'),
('Barn Swallow', 34, 1, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Rauchschwalbe_Hirundo_rustica.jpg/500px-Rauchschwalbe_Hirundo_rustica.jpg', 'A graceful swallow with deeply forked tail that builds distinctive cup-shaped mud nests.'),
('Tree Swallow', 32, 1, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Tree_swallow_in_JBWR_%2825579%29.jpg/500px-Tree_swallow_in_JBWR_%2825579%29.jpg', 'An iridescent blue-green swallow that nests in tree cavities and excels at aerial insect hunting.'),
('Red Winged Blackbird', 31, 1, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Red_winged_blackbird_-_natures_pics.jpg/500px-Red_winged_blackbird_-_natures_pics.jpg', 'A medium-sized blackbird where males display distinctive red and yellow shoulder patches in marshes.'),
('Gray Catbird', 26, 1, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Gray_Catbird_%28Dumetella_carolinensis%29.jpg/500px-Gray_Catbird_%28Dumetella_carolinensis%29.jpg', 'A secretive songbird named for its cat-like mewing call and excellent mimicry abilities.'),
('Nighthawk', 60, 1, 1, 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Common_Nighthawk.JPG', 'A nocturnal bird with excellent camouflage and distinctive nasal call, feeding on aerial insects.'),

('Black-capped Chickadee', 18, 1, 1, null, 'A small, acrobatic songbird with distinctive black cap and white cheeks, known for cached food storage.'),
('White-breasted Nuthatch', 22, 1, 1, null, 'A small woodland bird that walks headfirst down tree trunks searching for insects in bark crevices.'),
('Cedar Waxwing', 30, 1, 3, null, 'A silky-smooth bird with waxy red wing tips and yellow tail band, known for passing berries between individuals.'),
('Rose-breasted Grosbeak', 32, 1, 3, null, 'A stocky songbird where males have brilliant rose-red breast patches and powerful seed-cracking bills.'),
('Indigo Bunting', 20, 1, 2, null, 'A small finch where males turn brilliant blue during breeding season and migrate using star navigation.'),
('Eastern Bluebird', 25, 1, 1, null, 'A thrush with brilliant blue upperparts and rusty breast, symbol of happiness and hope.'),
('Great Blue Heron', 180, 1, 4, null, 'A large wading bird with impressive height and patience, standing motionless while hunting fish.'),
('Belted Kingfisher', 48, 1, 4, null, 'A stocky bird with large head and bill, known for diving into water from perches to catch fish.'),
('Pileated Woodpecker', 76, 1, 1, null, 'The largest woodpecker in North America with distinctive red crest and powerful excavating abilities.'),
('Ruby-throated Hummingbird', 11, 1, 2, null, 'The only hummingbird that breeds in eastern North America, capable of flying backwards and hovering.'),
('Wood Duck', 75, 1, 3, null, 'One of the most beautiful waterfowl with intricate plumage patterns and distinctive crested head.'),
('Yellow Warbler', 18, 1, 1, null, 'A bright yellow songbird that migrates incredible distances and often raises cowbird chicks as foster parents.'),
('Chimney Swift', 30, 1, 1, null, 'An aerial specialist that spends almost its entire life in flight, even sleeping and mating in the air.'),
('Great Horned Owl', 122, 1, 4, null, 'A powerful nocturnal predator with distinctive ear tufts and one of the most adaptable owls in North America.'),
('Common Grackle', 46, 1, 3, null, 'A large blackbird with iridescent plumage and yellow eyes, known for intelligent problem-solving abilities.'),

-- South American Birds (range_id = 2)
('Scarlet Macaw', 105, 2, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Scarlet_macaw_%28Ara_macao_cyanopterus%29_Copan.jpg/500px-Scarlet_macaw_%28Ara_macao_cyanopterus%29_Copan.jpg', 'One of the largest and most colorful parrots with brilliant red, blue, and yellow plumage, living over 50 years.'),
('Toco Toucan', 60, 2, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Toco_toucan_-_panoramio_-_Basa_Roland.jpg/500px-Toco_toucan_-_panoramio_-_Basa_Roland.jpg', 'An iconic tropical bird with massive yellow-orange bill, surprisingly agile despite their large beaks.'),
('Lettered Aracari', 29, 2, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Lettered_Ara%C3%A7ari.jpg/500px-Lettered_Ara%C3%A7ari.jpg', 'A smaller toucan species with intricate black and yellow markings resembling letters, traveling in social flocks.'),
('Harpy Eagle', 200, 2, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Harpia_harpyja_001_800.jpg/500px-Harpia_harpyja_001_800.jpg', 'One of the most powerful raptors in the world with distinctive facial disc and incredibly strong talons.'),
('Andean Condor', 320, 2, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Peru_-_Colca_Canyon_-_Andean_condor_%28Vultur_gryphus%29_01.jpg/500px-Peru_-_Colca_Canyon_-_Andean_condor_%28Vultur_gryphus%29_01.jpg', 'The largest flying bird in South America with impressive soaring abilities and cultural significance to Andean peoples.'),
('Blue Manakin', 18, 2, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Chiroxiphia_caudata-2.jpg/500px-Chiroxiphia_caudata-2.jpg', 'A small, vibrant blue bird where males perform elaborate courtship dances to attract females.'),
('Hoatzin', 65, 2, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Hoatzin_%28Opisthocomus_hoazin%29_Rio_Napo.jpg/500px-Hoatzin_%28Opisthocomus_hoazin%29_Rio_Napo.jpg', 'A unique bird with prehistoric appearance and remarkable ability of chicks to climb using wing claws.'),
('Jabiru', 280, 2, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Jabiru_%28Jabiru_mycteria%29_2.JPG/960px-Jabiru_%28Jabiru_mycteria%29_2.JPG', 'The tallest flying bird in South and Central America, a massive stork with impressive wingspan.'),
('Cock-of-the-rock', 65, 2, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Andean_Cock_of_the_Rock.jpg/500px-Andean_Cock_of_the_Rock.jpg', 'Peru''s national bird with brilliant orange plumage and distinctive disk-shaped crest, performing elaborate mating displays.'),
('Great Kiskadee', 40, 2, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Great_kiskadee_%2870240%29.jpg/500px-Great_kiskadee_%2870240%29.jpg', 'A large flycatcher with distinctive yellow belly and bold black and white head pattern, named for its call.'),
('Rufous Hornero', 25, 2, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Flickr_-_Dario_Sanches_-_JO%C3%83O-DE-BARRO_%28Furnarius_rufus%29_%2825%29.jpg/500px-Flickr_-_Dario_Sanches_-_JO%C3%83O-DE-BARRO_%28Furnarius_rufus%29_%2825%29.jpg', 'Argentina''s national bird, known for building distinctive clay-oven shaped nests that give them their name.'),

('Hyacinth Macaw', 140, 2, 2, null, 'The largest parrot in the world with stunning cobalt blue plumage and powerful beak for cracking palm nuts.'),
('Green-winged Macaw', 125, 2, 2, null, 'A large, colorful parrot with red, blue, and green plumage, known for their intelligence and longevity.'),
('Channel-billed Toucan', 58, 2, 3, null, 'The largest toucan species with a massive yellow bill and distinctive throat coloration.'),
('Spectacled Owl', 125, 2, 4, null, 'A large owl with distinctive white eyebrow markings that give it a spectacled appearance.'),
('King Vulture', 200, 2, 4, null, 'A colorful scavenging bird with distinctive orange and yellow head coloration and regal appearance.'),
('Sunbittern', 71, 2, 4, null, 'A secretive wading bird with spectacular wing displays showing eye-spots when threatened.'),
('Boat-billed Heron', 80, 2, 4, null, 'A nocturnal heron with an unusually broad, flattened bill adapted for catching fish and frogs.'),
('Magellanic Penguin', 61, 2, 4, null, 'A medium-sized penguin that breeds along the coasts of Argentina and Chile.'),
('Southern Caracara', 123, 2, 4, null, 'An opportunistic raptor known for its intelligence and adaptability, often called the Mexican Eagle.'),
('Oilbird', 95, 2, 3, null, 'The world''s only nocturnal fruit-eating bird, using echolocation to navigate in dark caves.'),
('Wire-tailed Manakin', 14, 2, 1, null, 'A small bird where males have distinctive wire-like tail feathers used in courtship displays.'),
('Crested Caracara', 125, 2, 4, null, 'Mexico''s national bird, a long-legged raptor that often hunts on foot like a hawk-eagle hybrid.'),
('Resplendent Quetzal', 55, 2, 3, null, 'A magnificent bird with iridescent green plumage and long tail feathers, sacred to ancient Mayans.'),
('Brazilian Tanager', 18, 2, 3, null, 'A vibrant red songbird endemic to Brazil, often seen in mixed-species flocks in Atlantic forests.'),
('Maguari Stork', 155, 2, 4, null, 'A large wading bird with distinctive black and white plumage, found in wetlands across South America.'),

-- European Birds (range_id = 3)
('European Robin', 22, 3, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Erithacus_rubecula_with_cocked_head.jpg/500px-Erithacus_rubecula_with_cocked_head.jpg', 'Britain''s unofficial national bird with distinctive red breast and territorial nature, singing year-round.'),
('Common Blackbird', 36, 3, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Common_Blackbird.jpg/500px-Common_Blackbird.jpg', 'A thrush species where males are jet black with bright orange beaks and renowned for melodious songs.'),
('Eurasian Blue Tit', 18, 3, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Eurasian_blue_tit_Lancashire.jpg/500px-Eurasian_blue_tit_Lancashire.jpg', 'A small, colorful bird with distinctive blue cap and wings, known for acrobatic feeding at bird tables.'),
('White Stork', 220, 3, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/White_stork_%28Ciconia_ciconia%29_Bia%C5%82owieza.jpg/500px-White_stork_%28Ciconia_ciconia%29_Bia%C5%82owieza.jpg', 'A large wading bird associated with bringing babies in folklore, known for building massive nests on rooftops.'),
('Golden Eagle', 230, 3, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/015_Wild_Golden_Eagle_in_flight_at_Pfyn-Finges_%28Switzerland%29_Photo_by_Giles_Laurent.jpg/500px-015_Wild_Golden_Eagle_in_flight_at_Pfyn-Finges_%28Switzerland%29_Photo_by_Giles_Laurent.jpg', 'A majestic raptor with golden-brown head feathers, capable of soaring at high altitudes in mountainous regions.'),
('European Starling', 37, 3, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/A_Common_Starling_on_the_ground%2C_D%C3%BCsseldorf.jpg/996px-A_Common_Starling_on_the_ground%2C_D%C3%BCsseldorf.jpg', 'An iridescent black bird with remarkable vocal abilities, capable of mimicking over 20 different bird species.'),
('Western House Martin', 32, 3, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Mehlschwalbe_Delichon_urbicum.jpg/500px-Mehlschwalbe_Delichon_urbicum.jpg', 'A small aerial insectivore with distinctive white rump patch, building mud nests under building eaves.'),
('Western Barn Owl', 95, 3, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Barn_Owl%2C_Lancashire.jpg/500px-Barn_Owl%2C_Lancashire.jpg', 'A nocturnal hunter with heart-shaped facial disc and silent flight, known for eerie screeching calls.'),
('Great Tit', 24, 3, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Great_tit_side-on.jpg/500px-Great_tit_side-on.jpg', 'The largest European tit with distinctive black head and yellow body, known for problem-solving intelligence.'),
('Eurasian Magpie', 56, 3, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/%D0%A1%D0%BE%D1%80%D0%BE%D0%BA%D0%B0_%28Pica_pica%29%2C_%D0%9A%D0%B0%D0%BB%D0%B8%D0%BD%D0%B8%D0%BD%D0%B3%D1%80%D0%B0%D0%B4.jpg/500px-%D0%A1%D0%BE%D1%80%D0%BE%D0%BA%D0%B0_%28Pica_pica%29%2C_%D0%9A%D0%B0%D0%BB%D0%B8%D0%BD%D0%B8%D0%BD%D0%B3%D1%80%D0%B0%D0%B4.jpg', 'An intelligent corvid with iridescent black and white plumage, one of the few animals to recognize itself in mirrors.'),

('Eurasian Wren', 13, 3, 1, null, 'One of Europe''s smallest birds with an incredibly loud song, capable of singing over 700 notes per minute.'),
('Coal Tit', 17, 3, 1, null, 'A small black-headed tit with distinctive white cheek patches, expert at caching seeds for winter.'),
('European Greenfinch', 25, 3, 2, null, 'A stocky finch with olive-green plumage and powerful bill for cracking tough seeds.'),
('Common Chaffinch', 25, 3, 2, null, 'One of Europe''s most common birds with distinctive pink breast and cheerful song.'),
('Song Thrush', 33, 3, 1, null, 'A speckled brown bird famous for smashing snails on stones and its varied, repetitive song.'),
('Eurasian Jay', 55, 3, 3, null, 'A colorful corvid with blue wing patches, crucial for oak forest regeneration through acorn caching.'),
('Common Buzzard', 130, 3, 4, null, 'Europe''s most common raptor with broad wings perfect for soaring and hunting small mammals.'),
('Eurasian Kestrel', 75, 3, 4, null, 'A small falcon known for hovering while hunting, with distinctive rusty-red plumage.'),
('Northern Lapwing', 82, 3, 1, null, 'A distinctive wading bird with prominent crest and tumbling aerial displays during breeding season.'),
('Common Kingfisher', 25, 3, 4, null, 'A brilliant blue and orange bird that dives into water to catch fish with remarkable precision.'),
('Spotted Flycatcher', 23, 3, 1, null, 'A subtle brown bird that catches insects on the wing from prominent perches.'),
('Yellowhammer', 23, 3, 2, null, 'A bunting with bright yellow head and distinctive "little-bit-of-bread-and-no-cheese" song.'),
('Red Kite', 175, 3, 4, null, 'A graceful raptor with distinctive forked tail, successfully reintroduced to many European regions.'),
('Little Owl', 56, 3, 4, null, 'A small, compact owl associated with Athena in Greek mythology, often active during daylight.'),
('Hooded Crow', 100, 3, 3, null, 'A grey and black corvid closely related to carrion crows, highly intelligent and adaptable.'),

-- Asian Birds (range_id = 4)
('Peacock', 160, 4, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Peacock_Plumage.jpg/500px-Peacock_Plumage.jpg', 'India''s national bird with spectacular tail feathers displaying iridescent eye-spots during courtship rituals.'),
('Red-Crowned Crane', 240, 4, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Grus_japonensis_-Hokkaido%2C_Japan_-several-8_%281%29.jpg/500px-Grus_japonensis_-Hokkaido%2C_Japan_-several-8_%281%29.jpg', 'A symbol of longevity in Asian culture with elegant dancing displays and distinctive red crown patch.'),
('Oriental Pied Hornbill', 130, 4, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Oriental_Pied_Hornbill_Mating.jpg/500px-Oriental_Pied_Hornbill_Mating.jpg', 'A large black and white hornbill with distinctive casque, playing crucial roles in forest seed dispersal.'),
('Himalayan Monal', 70, 4, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Himalayan_Monal_Adult_Male_East_Sikkim_Sikkim_India.png/500px-Himalayan_Monal_Adult_Male_East_Sikkim_Sikkim_India.png', 'Nepal''s national bird with brilliant iridescent plumage that changes color in different light angles.'),
('Indian Paradise Flycatcher', 25, 4, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/The_Asian_Paradise_Flycatcher.jpg/500px-The_Asian_Paradise_Flycatcher.jpg', 'A graceful bird where males develop extremely long white tail streamers during breeding season.'),
('Northern Shrike', 30, 4, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Northern_Shrike%2C_Arvada%2C_Jefferson%2C_Colorado.jpg/500px-Northern_Shrike%2C_Arvada%2C_Jefferson%2C_Colorado.jpg', 'A predatory songbird that impales prey on thorns or barbed wire, earning the nickname "butcher bird".'),
('Mandarin Duck', 75, 4, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Pair_of_mandarin_ducks.jpg/500px-Pair_of_mandarin_ducks.jpg', 'Considered the most beautiful duck in the world with intricate plumage patterns and cultural significance in Asia.'),
('Asian Koel', 40, 4, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Asian_koel.jpg/500px-Asian_koel.jpg', 'A large cuckoo with distinctive calls, males are glossy black while females are brown with white spots.'),
('White-rumped Shama', 25, 4, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/White-rumped_Shama_%2814503818154%29.jpg/500px-White-rumped_Shama_%2814503818154%29.jpg', 'Prized for their melodious song and ability to mimic other birds, popular in traditional bird singing competitions.'),

('Japanese Crane', 250, 4, 3, null, 'A symbol of peace and longevity with elegant courtship dances, featured prominently in Japanese art.'),
('Great Hornbill', 160, 4, 3, null, 'A massive hornbill with distinctive yellow casque, keystone species in Asian tropical forests.'),
('Blue-throated Barbet', 17, 4, 3, null, 'A colorful fruit-eating bird with distinctive call, important for forest regeneration in Asia.'),
('Asian Fairy-bluebird', 24, 4, 3, null, 'A brilliant blue and black bird with iridescent plumage, found in the canopies of Asian forests.'),
('Crested Serpent Eagle', 140, 4, 4, null, 'A medium-sized raptor with distinctive crest and loud calling, specializing in reptile hunting.'),
('Red Junglefowl', 78, 4, 3, null, 'The wild ancestor of domestic chickens with brilliant red and gold plumage in males.'),
('Black-naped Oriole', 22, 4, 1, null, 'A bright yellow bird with distinctive black markings, known for its flute-like calls.'),
('Pied Kingfisher', 44, 4, 4, null, 'A black and white kingfisher capable of hovering over water before diving for fish.'),
('Brahminy Kite', 145, 4, 4, null, 'A distinctive raptor with white head and breast, considered sacred in Hindu culture.'),
('Asian Paradise Flycatcher', 48, 4, 1, null, 'Males develop spectacular long white tail ribbons that flutter gracefully during flight.'),
('Spotted Dove', 32, 4, 2, null, 'A gentle dove with distinctive spotted collar, common in gardens and urban areas across Asia.'),
('House Crow', 84, 4, 3, null, 'An intelligent and adaptable corvid that thrives in urban environments throughout Asia.'),
('White-breasted Kingfisher', 48, 4, 4, null, 'A large kingfisher with striking blue and white plumage, often found far from water.'),
('Oriental Magpie-Robin', 19, 4, 1, null, 'A confident songbird with distinctive black and white plumage, known for elaborate songs.'),
('Coppersmith Barbet', 17, 4, 3, null, 'A small green barbet named for its metallic call that resembles a coppersmith hammering.'),

-- Australian Birds (range_id = 5)
('Wedge-tailed Eagle', 280, 5, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Aquila_audax_-_Captain%27s_Flat.jpg/500px-Aquila_audax_-_Captain%27s_Flat.jpg', 'Australia''s largest raptor with diamond-shaped tail and ability to soar for hours without flapping.'),
('Kookaburra', 65, 5, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Dacelo_novaeguineae_waterworks.jpg/500px-Dacelo_novaeguineae_waterworks.jpg', 'Known as the laughing kookaburra for its distinctive call that sounds like human laughter.'),
('Cockatiel', 30, 5, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Nymphicus_hollandicus_-perching_on_wires_-Australia-6a.jpg/500px-Nymphicus_hollandicus_-perching_on_wires_-Australia-6a.jpg', 'A small cockatoo with distinctive yellow crest and orange cheek patches.'),
('Rainbow Lorikeet', 30, 5, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Rainbow_lorikeet_%28Trichoglossus_moluccanus_moluccanus%29_Sydney.jpg/960px-Rainbow_lorikeet_%28Trichoglossus_moluccanus_moluccanus%29_Sydney.jpg', null),
('Emu', 0, 5, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Emu_1_-_Tidbinbilla.jpg/960px-Emu_1_-_Tidbinbilla.jpg', null),
('Magpie Lark', 30, 5, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Magpie-lark_%28Grallina_cyanoleuca_cyanoleuca%29_male_Adelaide.jpg/500px-Magpie-lark_%28Grallina_cyanoleuca_cyanoleuca%29_male_Adelaide.jpg', null),
('Galah', 35, 5, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Galah_%28Eolophus_roseicapilla_albiceps%29_male_Adelaide.jpg/500px-Galah_%28Eolophus_roseicapilla_albiceps%29_male_Adelaide.jpg', null),
('Australian Pelican', 270, 5, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Pelecanus_conspicillatus_-_Doughboy_Head.jpg/500px-Pelecanus_conspicillatus_-_Doughboy_Head.jpg', null),
('Superb Fairy-wren', 14, 5, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Male_and_female_superb_fairy_wren.jpg/500px-Male_and_female_superb_fairy_wren.jpg', null),
('Willie Wagtail', 25, 5, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Rhipidura_leucophrys_-_Glen_Davis.jpg/960px-Rhipidura_leucophrys_-_Glen_Davis.jpg', null),
('Pink Robin', 20, 5, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Pink_Robin_0A2A9297.jpg/500px-Pink_Robin_0A2A9297.jpg', null),

-- African Birds (range_id = 6)
('African Grey Parrot', 46, 6, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Perroquet_%C3%A0_Yampopo_Beach_-_Douala.jpg/500px-Perroquet_%C3%A0_Yampopo_Beach_-_Douala.jpg', null),
('Secretary Bird', 210, 6, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Secretary_bird_Mara_for_WC.jpg/500px-Secretary_bird_Mara_for_WC.jpg', null),
('Ostrich', 0, 6, 3, 'https://cdn.theatlantic.com/thumbor/LV_DH34UpAL5CTy5yswaWeVMKdQ=/336x0:2361x1519/1200x900/media/img/mt/2025/01/2025_01_07_ostrich_1555343491/original.jpg', null),
('African Fish Eagle', 240, 6, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/African_fish_eagle_%28Haliaeetus_vocifer%29_Ethiopia.jpg/500px-African_fish_eagle_%28Haliaeetus_vocifer%29_Ethiopia.jpg', null),
('Lilac-breasted Roller', 37, 6, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Lilac-breasted_roller_%28Coracias_caudatus%29_Kruger.jpg/500px-Lilac-breasted_roller_%28Coracias_caudatus%29_Kruger.jpg', null),
('Southern Ground-Hornbill', 180, 6, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Ground_Hornbill%2C_Chobe_National_Park%2C_Botswana_%2836427414050%29.jpg/500px-Ground_Hornbill%2C_Chobe_National_Park%2C_Botswana_%2836427414050%29.jpg', null),
('Red-billed Quelea', 24, 6, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Red-billed_Quelea_%28Quelea_quelea%29_%286040990915%29.jpg/500px-Red-billed_Quelea_%28Quelea_quelea%29_%286040990915%29.jpg', null),
('Cape Weaver', 25, 6, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Ploceus_capensis_-Johannesburg%2C_South_Africa_-male-8.jpg/500px-Ploceus_capensis_-Johannesburg%2C_South_Africa_-male-8.jpg', null),
('Pennant-Winged Nightjar', 66, 6, 1, 'https://static.wikia.nocookie.net/naturerules1/images/d/d3/353453371.png/revision/latest?cb=20230708034420', null);



COMMIT TRANSACTION;
