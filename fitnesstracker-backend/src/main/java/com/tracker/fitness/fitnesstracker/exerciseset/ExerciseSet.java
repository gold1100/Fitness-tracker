package com.tracker.fitness.fitnesstracker.exerciseset;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tracker.fitness.fitnesstracker.exercise.Exercise;
import com.tracker.fitness.fitnesstracker.workout.Workout;
import javax.persistence.*;

@Entity
@Table(name = "exercise_entry")
public class ExerciseSet {

    public ExerciseSet() {
    }

    public ExerciseSet(Exercise exercise, int repetitions, double weight) {
        this.exercise = exercise;
        this.repetitions = repetitions;
        this.weight = weight;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "workout_id")
    @JsonIgnore
    private Workout workout;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;
    private int repetitions;
    private double weight;

    public Exercise getExercise() {
        return exercise;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Workout getWorkout() {
        return workout;
    }

    public void setWorkout(Workout workout) {
        this.workout = workout;
    }
}
