package com.tracker.fitness.fitnesstracker.workout;

import com.tracker.fitness.fitnesstracker.exerciseset.ExerciseSet;
import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "workouts")
public class Workout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private LocalDate date;
    private String description;

    @OneToMany(
            mappedBy = "workout",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<ExerciseSet> exerciseSets = new ArrayList<>();


    public Workout() {
    }

    public Workout(LocalDate date, String description, List<ExerciseSet> exerciseSets) {
        this.date = date;
        this.description = description;
        this.exerciseSets = exerciseSets;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<ExerciseSet> getExerciseSets() {
        return exerciseSets;
    }
}
