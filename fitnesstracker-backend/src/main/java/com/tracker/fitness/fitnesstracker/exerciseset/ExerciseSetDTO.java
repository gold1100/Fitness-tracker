package com.tracker.fitness.fitnesstracker.exerciseset;

import com.tracker.fitness.fitnesstracker.exercise.Exercise;
import javax.validation.constraints.NotNull;

public class ExerciseSetDTO {

    private Long id;
    @NotNull
    private Exercise exercise;
    @NotNull
    private int repetitions;
    private double weight;

    public ExerciseSetDTO() {
    }

    public ExerciseSetDTO(Long id, Exercise exercise, int repetitions, double weight) {
        this.id = id;
        this.exercise = exercise;
        this.repetitions = repetitions;
        this.weight = weight;
    }

    public int getRepetitions() {
        return repetitions;
    }

    public void setRepetitions(int repetitions) {
        this.repetitions = repetitions;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }
}
