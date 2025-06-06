package com.techelevator.controller;

import com.techelevator.dao.BirdDao;
import com.techelevator.exception.DaoException;
import com.techelevator.model.Bird;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import javax.xml.namespace.QName;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "/birds")
public class BirdController {

    private final BirdDao birdDao;

    public BirdController(BirdDao birdDao) {
        this.birdDao = birdDao;
    }

    @GetMapping(path = "/all")
    public List<Bird> GetAllBirds() {
        List<Bird> birds;
        try {
            birds = birdDao.getBirds();
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return birds;
    }

    // handles req's like "GET /wingspanLookup?upperLimit=100&lowerLimit=50"
    @GetMapping(path = "/wingspanLookup")
    public List<Bird> getBirdsByWingspan(
            @RequestParam(required = true) int lowerLimit,
            @RequestParam(required = true) int upperLimit) {

        List<Bird> birds;
        try {
            birds = birdDao.getBirdsByWingspan(upperLimit, lowerLimit);
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return birds;
    }


    //     FIX??
    // lookup by name and not ID?? important or no?

    @GetMapping(path = "/rangeLookup/{range_id}")
    public List<Bird> GetBirdsByRange(@PathVariable(required = true) int range_id) {
        List<Bird> birds;
        try {
            birds = birdDao.getBirdsByRange(range_id);
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return birds;
    }

    @GetMapping(path = "/dietLookup/{diet_id}")
    public List<Bird> GetBirdsByDiet(@PathVariable(required = true) int diet_id) {
        List<Bird> birds;
        try {
            birds = birdDao.getBirdsByDiet(diet_id);
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return birds;
    }

    @GetMapping(path = "/nameLookup/{name}")
    public List<Bird> GetBirdsByName(@PathVariable(required = true) String name) {
        List<Bird> birds;
        try {
            birds = birdDao.getBirdsByName(name);
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return birds;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path = "/add")
    public Bird CreateBird(@RequestBody @Valid Bird bird) {
        Bird newBird;
        try {

            // Validate user input before inserting into the database
            if (bird.getBird_name() == null || bird.getBird_name().trim().isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bird name is required.");
            }
            if (bird.getDiet_id() <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Diet ID is required.");
            }
            if (bird.getWingspan() <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wingspan is required.");
            }
            if (bird.getImg_url() == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Image URL is required.");
            }
            if (bird.getRange_id() <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Range ID is required.");
            }
            if (bird.getId() <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bird ID is required.");
            }

            newBird = birdDao.createBird(bird);
            if (newBird == null) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to create bird");
            }
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to process request");
        }
        return newBird;
    }


}
