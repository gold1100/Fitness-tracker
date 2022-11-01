package com.tracker.fitness.fitnesstracker.exercise;

import com.tracker.fitness.fitnesstracker.exerciseset.ExerciseSet;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class ExerciseService {

    private final ExerciseRepository exerciseRepository;

    public ExerciseService(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    public List<Exercise> getExercises() {
        return exerciseRepository.findAll();
    }

    public Exercise addNewExercise(Exercise exercise) {
            return exerciseRepository.save(exercise);

    }

    public void deleteExercise(Long exerciseId) {
        Optional<Exercise> exerciseData = exerciseRepository.findById(exerciseId);
        exerciseData.ifPresentOrElse(exerciseRepository::delete, () -> {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Exercise with id " + exerciseId + "does not exist");
                });
    }

    public MaxWeightRaised getMaxWeightRaised(Long exerciseId) {
        List<ExerciseSet> maxWeightSet = exerciseRepository.findMaxWeightSet(exerciseId);
        if(maxWeightSet.isEmpty()){
            return new MaxWeightRaised(0, null);
        }
        return new MaxWeightRaised(maxWeightSet.get(0).getWeight(), maxWeightSet.get(0).getWorkout().getDate());
    }
}

