package com.tracker.fitness.fitnesstracker.exercise;

import java.time.LocalDate;

public class MaxWeightRaised {
    private final double MaxWeight;
    private final LocalDate date;

    public MaxWeightRaised(double maxWeight, LocalDate date) {
        MaxWeight = maxWeight;
        this.date = date;
    }

    public double getMaxWeight() {
        return MaxWeight;
    }

    public LocalDate getDate() {
        return date;
    }
}
