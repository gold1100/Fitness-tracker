package com.tracker.fitness.fitnesstracker.exercise;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/exercises")
@CrossOrigin("http://localhost:3000")
public class ExerciseController {
    private final ExerciseService exerciseService;


    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @GetMapping
    public List<Exercise> getExercises(){
        return exerciseService.getExercises();
    }

    @PostMapping
    public Exercise addNewExercise(@RequestBody Exercise exercise){
        return exerciseService.addNewExercise(exercise);
    }

    @DeleteMapping(path = "/{exerciseId}")
    public void deleteExercise(@PathVariable Long exerciseId){
        exerciseService.deleteExercise(exerciseId);
    }

    @GetMapping(path = "/{exerciseId}/maxWeight")
    public MaxWeightRaised getMaxWeightRaised(@PathVariable Long exerciseId){
        return exerciseService.getMaxWeightRaised(exerciseId);
    }
}
