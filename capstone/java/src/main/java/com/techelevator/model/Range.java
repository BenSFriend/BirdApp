package com.techelevator.model;

public class Range {

    private int id;
    private String range;

    public Range() {
    }

    public Range(int id, String range) {
        this.id = id;
        this.range = range;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRange() {
        return range;
    }

    public void setRange(String range) {
        this.range = range;
    }
}

