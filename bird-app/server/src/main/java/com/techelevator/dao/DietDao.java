package com.techelevator.dao;

import com.techelevator.model.Diet;

import java.util.List;

public interface DietDao {
    List<Diet> getDiets();

    Diet getDietById(int diet_id);

    Diet createDiet(Diet diet);
}
