package com.techelevator.dao;

import com.techelevator.exception.DaoException;
import com.techelevator.model.Bird;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcBirdDao implements BirdDao {

    private JdbcTemplate jdbcTemplate = new JdbcTemplate();

    public JdbcBirdDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    //****THINGS TO CONSIDER/ADD*****

    // queries for multi-lookup
    // ex. wingspan/diet  ,  wingspan/range  ,  range/diet
    //     wingspan/range/diet


    @Override
    public List<Bird> getBirds() {
        List<Bird> birds = new ArrayList<>();

        final String sql =

                "SELECT bird_id, bird_name, bird_description, wingspan, r.bird_range AS bird_range, d.bird_diet AS bird_diet, img_url\n" +
                        "FROM birds\n" +
                        "JOIN ranges r ON birds.range_id = r.range_id\n" +
                        "JOIN diets d ON birds.diet_id = d.diet_id;";

//        "SELECT bird_id, bird_name, wingspan, r.range, d.diet, img_url\n" +
//                "FROM birds\n" +
//                "JOIN ranges r ON birds.range_id  = r.range_id\n" +
//                "JOIN diets d ON birds.diet_id = d.diet_id;";

        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next()) {
                Bird bird = mapRowToBirdWithDetails(results);
                birds.add(bird);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return birds;

    }


    @Override
    public List<Bird> getBirdsByWingspan(int lowerLimit, int upperLimit) {
        List<Bird> birds = new ArrayList<>();

        final String sql =

                "SELECT bird_id, bird_name, bird_description, wingspan, r.bird_range, d.bird_diet, img_url\n" +
                        "FROM birds\n" +
                        "JOIN ranges r ON birds.range_id  = r.range_id\n" +
                        "JOIN diets d ON birds.diet_id = d.diet_id\n" +
                        "WHERE wingspan BETWEEN ? AND ?;";

        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, lowerLimit, upperLimit);
            while (results.next()) {
                Bird bird = mapRowToBirdWithDetails(results);
                birds.add(bird);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return birds;
    }


    @Override
    public List<Bird> getBirdsByRange(int range_id) {
        List<Bird> birds = new ArrayList<>();

        final String sql =

                "SELECT bird_id, bird_name, bird_description, wingspan, r.bird_range, d.bird_diet, img_url\n" +
                        "FROM birds\n" +
                        "JOIN ranges r ON birds.range_id  = r.range_id\n" +
                        "JOIN diets d ON birds.diet_id = d.diet_id\n" +
                        "WHERE birds.range_id = ?;";

        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, range_id);
            while (results.next()) {
                Bird bird = mapRowToBirdWithDetails(results);
                birds.add(bird);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return birds;

    }

    @Override
    public List<Bird> getBirdsByDiet(int diet_id) {
        List<Bird> birds = new ArrayList<>();

        final String sql =

                "SELECT bird_id, bird_name, bird_description, wingspan, r.bird_range, d.bird_diet, img_url\n" +
                        "FROM birds\n" +
                        "JOIN ranges r ON birds.range_id  = r.range_id\n" +
                        "JOIN diets d ON birds.diet_id = d.diet_id\n" +
                        "WHERE birds.diet_id = ?;";

        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, diet_id);
            while (results.next()) {
                Bird bird = mapRowToBirdWithDetails(results);
                birds.add(bird);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return birds;

    }

    @Override
    public Bird getBirdById(int bird_id) {
        Bird bird = null;
        String sql =

                "SELECT bird_id, bird_name, bird_description, wingspan, r.bird_range, d.bird_diet, img_url\n" +
                        "FROM birds\n" +
                        "JOIN ranges r ON birds.range_id  = r.range_id\n" +
                        "JOIN diets d ON birds.diet_id = d.diet_id\n" +
                        " WHERE bird_id = ?;";

        try {
            final SqlRowSet result = jdbcTemplate.queryForRowSet(sql, bird_id);
            if (result.next()) {
                bird = mapRowToBirdWithDetails(result);
            }
        } catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to connect to server", exception);
        }
        return bird;
    }


    // this needs to be a list because 'ILIKE' may return multiple results
    // usage will be bird lookup that might return multiple results, ie 'eagle'
    // can apply to multiple species
    @Override
    public List<Bird> getBirdsByName(String bird_name) {
        List<Bird> birds = new ArrayList<>();

        String sql =

                "SELECT bird_id, bird_name, wingspan, r.bird_range, d.bird_diet, img_url\n" +
                        "FROM birds \n" +
                        "JOIN ranges r ON birds.range_id  = r.range_id\n" +
                        "JOIN diets d ON birds.diet_id = d.diet_id\n" +
                        "WHERE bird_name ILIKE '%' || ? || '%';";


        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, bird_name);
            while (results.next()) {
                Bird bird = mapRowToBirdWithDetails(results); //mapRowToBirdWithDetails??
                birds.add(bird);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return birds;
    }


    @Override
    public Bird createBird(Bird bird) {
        String sql = "INSERT INTO birds(bird_name, bird_description, wingspan, range_id, diet_id, img_url)\n" +
                "VALUES (?, ?, ?, ?, ?, ?) RETURNING bird_id;";
        try {
            int newBird = jdbcTemplate.queryForObject(sql, int.class,
                    bird.getBird_name(),
                    bird.getBird_description(),
                    bird.getWingspan(),
                    bird.getRange_id(),
                    bird.getDiet_id(),
                    bird.getImg_url()
            );
            return getBirdById(newBird);
        } catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to connect to server", exception);
        }
    }


    //prob need a second mapper for different usages
    //one that returns object including range and diet Strings
    //maybe requires separate constructor in bird model
    // maybe I just need a DTO

    private Bird mapRowToBirdWithDetails(SqlRowSet rs) {
        Bird bird = new Bird();
        bird.setId(rs.getInt("bird_id"));
        bird.setBird_description(rs.getString("bird_description"));
        bird.setBird_name(rs.getString("bird_name"));
        bird.setWingspan(rs.getInt("wingspan"));
        bird.setImg_url(rs.getString("img_url"));
        bird.setBird_range(rs.getString("bird_range"));
        bird.setBird_diet(rs.getString("bird_diet"));     // requires Bird class to have `diet` (String)
        return bird;
    }

    private Bird mapRowToBird(SqlRowSet rs) {
        Bird bird = new Bird();
        bird.setId(rs.getInt("bird_id"));
        bird.setBird_name(rs.getString("bird_name"));
        bird.setBird_description(rs.getString("bird_description"));
        bird.setDiet_id(rs.getInt("diet_id"));
        bird.setRange_id(rs.getInt("range_id"));
        bird.setImg_url(rs.getString("img_url"));
        bird.setWingspan(rs.getInt("wingspan"));
        return bird;
    }
}

