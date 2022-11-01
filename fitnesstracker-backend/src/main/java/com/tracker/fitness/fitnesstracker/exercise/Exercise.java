package com.tracker.fitness.fitnesstracker.exercise;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tracker.fitness.fitnesstracker.exerciseset.ExerciseSet;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "exercises")
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    @OneToMany(
            mappedBy = "exercise",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonIgnore
    private List<ExerciseSet> exerciseSets = new ArrayList<>();

    public Exercise() {

    }

    public Exercise(long id, String name, List<ExerciseSet> exerciseSets) {
        this.id = id;
        this.name = name;
        this.exerciseSets = exerciseSets;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<ExerciseSet> getExerciseSets() {
        return exerciseSets;
    }

    public void setExerciseSets(List<ExerciseSet> exerciseSets) {
        this.exerciseSets = exerciseSets;
    }
}


