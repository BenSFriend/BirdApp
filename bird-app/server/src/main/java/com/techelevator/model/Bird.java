package com.techelevator.model;

public class Bird {

    private int id;
    private String bird_name;

    //wingspan in cm
    private int wingspan;
    private int range_id;
    private int diet_id;
    private String img_url;
    private String bird_description;

    //joining data
    private String bird_range;
    private String bird_diet;

    public Bird() {
    }

    public Bird(int id, String bird_name, String bird_description, int wingspan,
                int range_id, int diet_id, String img_url) {
        this.id = id;
        this.bird_description = bird_description;
        this.bird_name = bird_name;
        this.wingspan = wingspan;
        this.range_id = range_id;
        this.diet_id = diet_id;
        this.img_url = img_url;
    }

    //**** should I just use one constructor that includes all data and then keep my OG as-needed????


    // includes range and diet strings
    public Bird(int id, String bird_name, String bird_description, int wingspan, String bird_range, int range_id, String bird_diet, int diet_id, String img_url) {
        this.bird_description = bird_description;
        this.id = id;
        this.bird_name = bird_name;
        this.wingspan = wingspan;
        this.bird_range = bird_range;
        this.bird_diet = bird_diet;
        this.img_url = img_url;
        this.range_id = range_id;
        this.diet_id = diet_id;
    }


    public String getBird_range() {
        return bird_range;
    }

    public void setBird_range(String bird_range) {
        this.bird_range = bird_range;
    }

    public String getBird_diet() {
        return bird_diet;
    }

    public void setBird_diet(String bird_diet) {
        this.bird_diet = bird_diet;
    }

    public String getBird_description() {
        return bird_description;
    }

    public void setBird_description(String bird_description) {
        this.bird_description = bird_description;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBird_name() {
        return bird_name;
    }

    public void setBird_name(String bird_name) {
        this.bird_name = bird_name;
    }

    public int getWingspan() {
        return wingspan;
    }

    public void setWingspan(int wingspan) {
        this.wingspan = wingspan;
    }

    public int getRange_id() {
        return range_id;
    }

    public void setRange_id(int range_id) {
        this.range_id = range_id;
    }

    public int getDiet_id() {
        return diet_id;
    }

    public void setDiet_id(int diet_id) {
        this.diet_id = diet_id;
    }

    public String getImg_url() {
        return img_url;
    }

    public void setImg_url(String img_url) {
        this.img_url = img_url;
    }


}