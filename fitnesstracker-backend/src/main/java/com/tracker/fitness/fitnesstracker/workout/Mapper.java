package com.tracker.fitness.fitnesstracker.workout;

import com.tracker.fitness.fitnesstracker.exercise.Exercise;
import com.tracker.fitness.fitnesstracker.exercise.ExerciseRepository;
import com.tracker.fitness.fitnesstracker.exerciseset.ExerciseSet;
import com.tracker.fitness.fitnesstracker.exerciseset.ExerciseSetDTO;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Component
public class Mapper {

    private final ExerciseRepository exerciseRepository;

    public Mapper(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    public ExerciseSet toExerciseSet(ExerciseSetDTO exerciseSetDTO){
        Optional<Exercise> exerciseData = exerciseRepository.findById(exerciseSetDTO.getExercise().getId());
        if(exerciseData.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "exercise with this id does not exist");
        }
        return new ExerciseSet(
                exerciseData.get(),
                exerciseSetDTO.getRepetitions(),
                exerciseSetDTO.getWeight()
        );
    }

    public ExerciseSetDTO toExerciseSetDTO(ExerciseSet exerciseSet){
        return new ExerciseSetDTO(
                exerciseSet.getId(),
                exerciseSet.getExercise(),
                exerciseSet.getRepetitions(),
                exerciseSet.getWeight());
    }

    public Workout toWorkout(WorkoutDTO workoutDTO){
        List<ExerciseSet> exerciseSets = workoutDTO.getExerciseSets()
                .stream()
                .map(this::toExerciseSet)
                .toList();
        return new Workout(
                workoutDTO.getDate(),
                workoutDTO.getDescription(),
                exerciseSets
                );
    }

    public WorkoutDTO toWorkoutDTO(Workout workout){
        List<ExerciseSetDTO> exerciseSetDTOS = workout.getExerciseSets()
                .stream()
                .map(this::toExerciseSetDTO)
                .toList();
        return new WorkoutDTO(
                workout.getId(),
                workout.getDate(),
                workout.getDescription(),
                exerciseSetDTOS);
    }
}
