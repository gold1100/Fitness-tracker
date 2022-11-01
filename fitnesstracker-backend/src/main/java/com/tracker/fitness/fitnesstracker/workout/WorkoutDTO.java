package com.tracker.fitness.fitnesstracker.workout;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.tracker.fitness.fitnesstracker.exerciseset.ExerciseSetDTO;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

public class WorkoutDTO {


    private long id;
    @NotNull(message = "date cannot be null")
    @JsonDeserialize(using= LocalDateDeserializer.class)
    private LocalDate date;
    private String description;
    private List<ExerciseSetDTO> exerciseSets;

    public WorkoutDTO(){

    }

    public WorkoutDTO(long id, LocalDate date, String description, List<ExerciseSetDTO> exerciseSets) {
        this.id = id;
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

    public List<ExerciseSetDTO> getExerciseSets() {
        return exerciseSets;
    }

    public void setExerciseSets(List<ExerciseSetDTO> exerciseSets) {
        this.exerciseSets = exerciseSets;
    }
}
