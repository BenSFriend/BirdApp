package com.techelevator.dao;

import com.techelevator.model.Range;

import java.util.List;

public interface RangeDao {
    List<Range> getRanges();

    Range getRangeById(int range_id);

    Range createRange(Range range);
}
