package com.techelevator.dao;

import com.techelevator.exception.DaoException;
import com.techelevator.model.Bird;
import com.techelevator.model.Diet;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;


@Component
public class JdbcDietDao implements DietDao{


    private JdbcTemplate jdbcTemplate = new JdbcTemplate();

    public JdbcDietDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    //*** IMPORTANT ***
    //add cross-functional requests like
    //get dietId by dietName
    //this will become important for bird lookups I think??
    //refer to cake project

    @Override
    public List<Diet> getDiets() {
        List<Diet> diets = new ArrayList<>();

        final String sql = "SELECT diet_id, diet FROM diets";

        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next()) {
                Diet diet = mapRowToDiet(results);
                diets.add(diet);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return diets;
    }


    //this fills need for 'get name by id'
    @Override
    public Diet getDietById(int diet_id) {
        Diet diet = null;
        String sql = "SELECT diet_id, diet FROM diets WHERE diet_id = ?";
        try {
            final SqlRowSet result = jdbcTemplate.queryForRowSet(sql, diet_id);
            if (result.next()) {
                diet = mapRowToDiet(result);
            }
        } catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to connect to server", exception);
        }
        return diet;
    }

    @Override
    public Diet createDiet(Diet diet) {
        String sql = "INSERT INTO diets(diet)\n" +
                "VALUES (?) RETURNING bird_id;";
        try{
            int newDiet = jdbcTemplate.queryForObject(sql, int.class,
                    diet.getDiet()
            );
            return getDietById(newDiet);
        } catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to connect to server", exception);
        }
    }



    private Diet mapRowToDiet(SqlRowSet rs) {
       Diet diet = new Diet();

        diet.setId(rs.getInt("diet_id "));
        diet.setDiet(rs.getString("diet"));
        return diet;
    }

}


