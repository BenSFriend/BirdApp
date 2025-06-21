package com.techelevator.model;

public class Diet {

    private int id;
    private String diet;

    public Diet() {
    }

    public Diet(int id, String diet) {
        this.id = id;
        this.diet = diet;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDiet() {
        return diet;
    }

    public void setDiet(String diet) {
        this.diet = diet;
    }
}
