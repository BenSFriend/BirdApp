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
INSERT INTO birds (bird_name, wingspan, range_id, diet_id, img_url)
VALUES

-- North American Birds (range_id = 1)
-- WINGSPANS ARE IN CM
('American Robin', 36, 1, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/American_robin_%2871307%29.jpg/2560px-American_robin_%2871307%29.jpg'),
('Bald Eagle', 220, 1, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Bald_eagle_about_to_fly_in_Alaska_%282016%29.jpg/1920px-Bald_eagle_about_to_fly_in_Alaska_%282016%29.jpg'),
('Blue Jay', 34, 1, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Blue_jay_in_Central_Park_%2816465%29.jpg/2560px-Blue_jay_in_Central_Park_%2816465%29.jpg'),
('Northern Cardinal', 30, 1, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Cardinal_with_raspberries.jpg/960px-Cardinal_with_raspberries.jpg'),
('Red-tailed Hawk', 130, 1, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Red-tailed_Hawk_%2845812546121%29.jpg/2560px-Red-tailed_Hawk_%2845812546121%29.jpg'),
('American Goldfinch', 22, 1, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Carduelis_tristis_-Michigan%2C_USA_-male-8.jpg/500px-Carduelis_tristis_-Michigan%2C_USA_-male-8.jpg'),
('House Sparrow', 24, 1, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/House_sparrow_male_in_Prospect_Park_%2853532%29.jpg/500px-House_sparrow_male_in_Prospect_Park_%2853532%29.jpg'),
('Mourning Dove', 45, 1, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Av_Mourning_Dove_JG.jpg/500px-Av_Mourning_Dove_JG.jpg'),
('Turkey Vulture', 180, 1, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Turkey_vulture_%28Cathartes_aura%29_in_flight.JPG/500px-Turkey_vulture_%28Cathartes_aura%29_in_flight.JPG'),
('Downy Woodpecker', 30, 1, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Downy_Woodpecker01.jpg/500px-Downy_Woodpecker01.jpg'),
('Scissor-Tailed Flycatcher', 37, 1, 1, 'https://www.allaboutbirds.org/guide/assets/photo/65684761-480px.jpg'),
('Purple Martin', 39, 1, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Progne_subis-male_chirping.jpg/500px-Progne_subis-male_chirping.jpg'),
('Barn Swallow', 34, 1, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Rauchschwalbe_Hirundo_rustica.jpg/500px-Rauchschwalbe_Hirundo_rustica.jpg'),
('Tree Swallow', 32, 1, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Tree_swallow_in_JBWR_%2825579%29.jpg/500px-Tree_swallow_in_JBWR_%2825579%29.jpg'),
('Red Winged Blackbird', 31, 1, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Red_winged_blackbird_-_natures_pics.jpg/500px-Red_winged_blackbird_-_natures_pics.jpg'),
('Gray Catbird', 26, 1, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Gray_Catbird_%28Dumetella_carolinensis%29.jpg/500px-Gray_Catbird_%28Dumetella_carolinensis%29.jpg'),
('Nighthawk', 60, 1, 1, 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Common_Nighthawk.JPG'),

-- South American Birds (range_id = 2)
('Scarlet Macaw', 105, 2, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Scarlet_macaw_%28Ara_macao_cyanopterus%29_Copan.jpg/500px-Scarlet_macaw_%28Ara_macao_cyanopterus%29_Copan.jpg'),
('Toco Toucan', 60, 2, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Toco_toucan_-_panoramio_-_Basa_Roland.jpg/500px-Toco_toucan_-_panoramio_-_Basa_Roland.jpg'),
('Lettered Aracari', 29, 2, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Lettered_Ara%C3%A7ari.jpg/500px-Lettered_Ara%C3%A7ari.jpg'),
('Harpy Eagle', 200, 2, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Harpia_harpyja_001_800.jpg/500px-Harpia_harpyja_001_800.jpg'),
('Andean Condor', 320, 2, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Peru_-_Colca_Canyon_-_Andean_condor_%28Vultur_gryphus%29_01.jpg/500px-Peru_-_Colca_Canyon_-_Andean_condor_%28Vultur_gryphus%29_01.jpg'),
('Blue Manakin', 18, 2, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Chiroxiphia_caudata-2.jpg/500px-Chiroxiphia_caudata-2.jpg'),
('Hoatzin', 65, 2, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Hoatzin_%28Opisthocomus_hoazin%29_Rio_Napo.jpg/500px-Hoatzin_%28Opisthocomus_hoazin%29_Rio_Napo.jpg'),
('Jabiru', 280, 2, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Jabiru_%28Jabiru_mycteria%29_2.JPG/960px-Jabiru_%28Jabiru_mycteria%29_2.JPG'),
('Cock-of-the-rock', 65, 2, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Andean_Cock_of_the_Rock.jpg/500px-Andean_Cock_of_the_Rock.jpg'),
('Great Kiskadee', 40, 2, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Great_kiskadee_%2870240%29.jpg/500px-Great_kiskadee_%2870240%29.jpg'),
('Rufous Hornero', 25, 2, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Flickr_-_Dario_Sanches_-_JO%C3%83O-DE-BARRO_%28Furnarius_rufus%29_%2825%29.jpg/500px-Flickr_-_Dario_Sanches_-_JO%C3%83O-DE-BARRO_%28Furnarius_rufus%29_%2825%29.jpg'),

-- European Birds (range_id = 3)
('European Robin', 22, 3, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Erithacus_rubecula_with_cocked_head.jpg/500px-Erithacus_rubecula_with_cocked_head.jpg'),
('Common Blackbird', 36, 3, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Common_Blackbird.jpg/500px-Common_Blackbird.jpg'),
('Eurasian Blue Tit', 18, 3, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Eurasian_blue_tit_Lancashire.jpg/500px-Eurasian_blue_tit_Lancashire.jpg'),
('White Stork', 220, 3, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/White_stork_%28Ciconia_ciconia%29_Bia%C5%82owieza.jpg/500px-White_stork_%28Ciconia_ciconia%29_Bia%C5%82owieza.jpg'),
('Golden Eagle', 230, 3, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/015_Wild_Golden_Eagle_in_flight_at_Pfyn-Finges_%28Switzerland%29_Photo_by_Giles_Laurent.jpg/500px-015_Wild_Golden_Eagle_in_flight_at_Pfyn-Finges_%28Switzerland%29_Photo_by_Giles_Laurent.jpg'),
('European Starling', 37, 3, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/A_Common_Starling_on_the_ground%2C_D%C3%BCsseldorf.jpg/996px-A_Common_Starling_on_the_ground%2C_D%C3%BCsseldorf.jpg'),
('Western House Martin', 32, 3, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Mehlschwalbe_Delichon_urbicum.jpg/500px-Mehlschwalbe_Delichon_urbicum.jpg'),
('Western Barn Owl', 95, 3, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Barn_Owl%2C_Lancashire.jpg/500px-Barn_Owl%2C_Lancashire.jpg'),
('Great Tit', 24, 3, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Great_tit_side-on.jpg/500px-Great_tit_side-on.jpg'),
('Eurasian Magpie', 56, 3, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/%D0%A1%D0%BE%D1%80%D0%BE%D0%BA%D0%B0_%28Pica_pica%29%2C_%D0%9A%D0%B0%D0%BB%D0%B8%D0%BD%D0%B8%D0%BD%D0%B3%D1%80%D0%B0%D0%B4.jpg/500px-%D0%A1%D0%BE%D1%80%D0%BE%D0%BA%D0%B0_%28Pica_pica%29%2C_%D0%9A%D0%B0%D0%BB%D0%B8%D0%BD%D0%B8%D0%BD%D0%B3%D1%80%D0%B0%D0%B4.jpg'),

-- Asian Birds (range_id = 4)
('Peacock', 160, 4, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Peacock_Plumage.jpg/500px-Peacock_Plumage.jpg'),
('Red-Crowned Crane', 240, 4, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Grus_japonensis_-Hokkaido%2C_Japan_-several-8_%281%29.jpg/500px-Grus_japonensis_-Hokkaido%2C_Japan_-several-8_%281%29.jpg'),
('Oriental Pied Hornbill', 130, 4, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Oriental_Pied_Hornbill_Mating.jpg/500px-Oriental_Pied_Hornbill_Mating.jpg'),
('Himalayan Monal', 70, 4, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Himalayan_Monal_Adult_Male_East_Sikkim_Sikkim_India.png/500px-Himalayan_Monal_Adult_Male_East_Sikkim_Sikkim_India.png'),
('Indian Paradise Flycatcher', 25, 4, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/The_Asian_Paradise_Flycatcher.jpg/500px-The_Asian_Paradise_Flycatcher.jpg'),
('Northern Shrike', 30, 4, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Northern_Shrike%2C_Arvada%2C_Jefferson%2C_Colorado.jpg/500px-Northern_Shrike%2C_Arvada%2C_Jefferson%2C_Colorado.jpg'),
('Mandarin Duck', 75, 4, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Pair_of_mandarin_ducks.jpg/500px-Pair_of_mandarin_ducks.jpg'),
('Asian Koel', 40, 4, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Asian_koel.jpg/500px-Asian_koel.jpg'),
('White-rumped Shama', 25, 4, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/White-rumped_Shama_%2814503818154%29.jpg/500px-White-rumped_Shama_%2814503818154%29.jpg'),

-- Australian Birds (range_id = 5)
('Wedge-tailed Eagle', 280, 5, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Aquila_audax_-_Captain%27s_Flat.jpg/500px-Aquila_audax_-_Captain%27s_Flat.jpg'),
('Kookaburra', 65, 5, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Dacelo_novaeguineae_waterworks.jpg/500px-Dacelo_novaeguineae_waterworks.jpg'),
('Cockatiel', 30, 5, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Nymphicus_hollandicus_-perching_on_wires_-Australia-6a.jpg/500px-Nymphicus_hollandicus_-perching_on_wires_-Australia-6a.jpg'),
('Rainbow Lorikeet', 30, 5, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Rainbow_lorikeet_%28Trichoglossus_moluccanus_moluccanus%29_Sydney.jpg/960px-Rainbow_lorikeet_%28Trichoglossus_moluccanus_moluccanus%29_Sydney.jpg'),
('Emu', 0, 5, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Emu_1_-_Tidbinbilla.jpg/960px-Emu_1_-_Tidbinbilla.jpg'),
('Magpie Lark', 30, 5, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Magpie-lark_%28Grallina_cyanoleuca_cyanoleuca%29_male_Adelaide.jpg/500px-Magpie-lark_%28Grallina_cyanoleuca_cyanoleuca%29_male_Adelaide.jpg'),
('Galah', 35, 5, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Galah_%28Eolophus_roseicapilla_albiceps%29_male_Adelaide.jpg/500px-Galah_%28Eolophus_roseicapilla_albiceps%29_male_Adelaide.jpg'),
('Australian Pelican', 270, 5, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Pelecanus_conspicillatus_-_Doughboy_Head.jpg/500px-Pelecanus_conspicillatus_-_Doughboy_Head.jpg'),
('Superb Fairy-wren', 14, 5, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Male_and_female_superb_fairy_wren.jpg/500px-Male_and_female_superb_fairy_wren.jpg'),
('Willie Wagtail', 25, 5, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Rhipidura_leucophrys_-_Glen_Davis.jpg/960px-Rhipidura_leucophrys_-_Glen_Davis.jpg'),
('Pink Robin', 20, 5, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Pink_Robin_0A2A9297.jpg/500px-Pink_Robin_0A2A9297.jpg'),

-- African Birds (range_id = 6)
('African Grey Parrot', 46, 6, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Perroquet_%C3%A0_Yampopo_Beach_-_Douala.jpg/500px-Perroquet_%C3%A0_Yampopo_Beach_-_Douala.jpg'),
('Secretary Bird', 210, 6, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Secretary_bird_Mara_for_WC.jpg/500px-Secretary_bird_Mara_for_WC.jpg'),
('Ostrich', 0, 6, 3, 'https://cdn.theatlantic.com/thumbor/LV_DH34UpAL5CTy5yswaWeVMKdQ=/336x0:2361x1519/1200x900/media/img/mt/2025/01/2025_01_07_ostrich_1555343491/original.jpg'),
('African Fish Eagle', 240, 6, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/African_fish_eagle_%28Haliaeetus_vocifer%29_Ethiopia.jpg/500px-African_fish_eagle_%28Haliaeetus_vocifer%29_Ethiopia.jpg'),
('Lilac-breasted Roller', 37, 6, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Lilac-breasted_roller_%28Coracias_caudatus%29_Kruger.jpg/500px-Lilac-breasted_roller_%28Coracias_caudatus%29_Kruger.jpg'),
('Southern Ground-Hornbill', 180, 6, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Ground_Hornbill%2C_Chobe_National_Park%2C_Botswana_%2836427414050%29.jpg/500px-Ground_Hornbill%2C_Chobe_National_Park%2C_Botswana_%2836427414050%29.jpg'),
('Red-billed Quelea', 24, 6, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Red-billed_Quelea_%28Quelea_quelea%29_%286040990915%29.jpg/500px-Red-billed_Quelea_%28Quelea_quelea%29_%286040990915%29.jpg'),
('Cape Weaver', 25, 6, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Ploceus_capensis_-Johannesburg%2C_South_Africa_-male-8.jpg/500px-Ploceus_capensis_-Johannesburg%2C_South_Africa_-male-8.jpg'),
('Pied Kingfisher', 44, 6, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Pied_kingfisher_%28Ceryle_rudis_leucomelanurus%29_male.jpg/960px-Pied_kingfisher_%28Ceryle_rudis_leucomelanurus%29_male.jpg'),
('Pennant-Winged Nightjar', 66, 6, 1, 'https://static.wikia.nocookie.net/naturerules1/images/d/d3/353453371.png/revision/latest?cb=20230708034420');



COMMIT TRANSACTION;
