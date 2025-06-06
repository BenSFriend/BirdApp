package com.techelevator.dao;

import com.techelevator.model.RegisterUserDto;
import com.techelevator.model.Bird;

import java.util.List;

public interface BirdDao {

    List<Bird> getBirds();

    //display birds as clickable images

    List<Bird> getBirdsByWingspan(int lowerLimit, int upperLimit);

    //filter birds within wingspan range selection

    List<Bird> getBirdsByRange(int range_id);

    //filter birds by a given locale
    //migrating/mating/year round?

    List<Bird> getBirdsByDiet(int diet_id);

    Bird getBirdById(int id);

    // backend usage

    //bird lookup

    List<Bird> getBirdsByName(String name);

    Bird createBird(Bird bird);

    //add bird
    //separate card with a 'plus' sigh that takes you to an add view
}
