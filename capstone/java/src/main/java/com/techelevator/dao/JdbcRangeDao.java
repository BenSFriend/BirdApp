package com.techelevator.dao;

import com.techelevator.exception.DaoException;
import com.techelevator.model.Diet;
import com.techelevator.model.Range;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcRangeDao implements RangeDao {

    private JdbcTemplate jdbcTemplate = new JdbcTemplate();

    public JdbcRangeDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    //*** IMPORTANT ***
    //add cross-functional requests like
    //get rangeId by rangeName
    //this will become important for bird lookups I think??
    //refer to cake project


    @Override
    public List<Range> getRanges() {
        List<Range> ranges = new ArrayList<>();

        final String sql = "SELECT range_id, range FROM ranges";

        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next()) {
                Range range = mapRowToRange(results);
                ranges.add(range);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return ranges;
    }

    @Override
    public Range getRangeById(int range_id) {
        Range range = null;
        String sql = "SELECT range_id, range FROM ranges WHERE range_id = ?";
        try {
            final SqlRowSet result = jdbcTemplate.queryForRowSet(sql, range_id);
            if (result.next()) {
                range = mapRowToRange(result);
            }
        } catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to connect to server", exception);
        }
        return range;
    }

    @Override
    public Range createRange(Range range) {
        String sql = "INSERT INTO ranges(range)\n" +
                "VALUES (?) RETURNING range_id;";
        try {
            int newRange = jdbcTemplate.queryForObject(sql, int.class,
                    range.getRange()
            );
            return getRangeById(newRange);
        } catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to connect to server", exception);
        }
    }

    private Range mapRowToRange(SqlRowSet rs) {
        Range range = new Range();

        range.setId(rs.getInt("range_id "));
        range.setRange(rs.getString("range"));
        return range;
    }
}
