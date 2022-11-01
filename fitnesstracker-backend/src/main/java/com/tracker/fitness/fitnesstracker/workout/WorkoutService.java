package com.tracker.fitness.fitnesstracker.workout;

import com.tracker.fitness.fitnesstracker.exerciseset.ExerciseSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.Optional;

@Service
public class WorkoutService  {

    private final WorkoutRepository workoutRepository;

    // -------- Workouts --------

    @Autowired
    public WorkoutService(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    public List<Workout> getWorkouts(){
        return workoutRepository.findAll();
    }

    public Workout getWorkoutById(Long id) {
        return fetchWorkout(id);
    }

    public Workout addWorkout(Workout workout) {
        workout.getExerciseSets().forEach(exerciseSet -> exerciseSet.setWorkout(workout));
        return workoutRepository.save(workout);
    }

    public Workout editWorkout(Long workoutId, Workout workout) {
        Workout updatedWorkout = fetchWorkout(workoutId);
        List<ExerciseSet> newSets = workout.getExerciseSets();
        newSets.forEach(exerciseSet -> exerciseSet.setWorkout(updatedWorkout));
        updatedWorkout.setDate(workout.getDate());
        updatedWorkout.setDescription(workout.getDescription());
        updatedWorkout.getExerciseSets().clear();
        updatedWorkout.getExerciseSets().addAll(newSets);
        return workoutRepository.save(updatedWorkout);

    }

    public void deleteWorkout(Long id) {
        Optional<Workout> workoutData = workoutRepository.findById(id);
        workoutData.ifPresentOrElse(
                workoutRepository::delete,
                () -> {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Workout with id " + id + "does not exist");
                });
    }

    // -------- priv methods --------

    private Workout fetchWorkout(Long workoutId){
        Optional<Workout> workout = workoutRepository.findById(workoutId);
        if (workout.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Workout with id " + workoutId + "does not exist");
        }
        return workout.get();
    }

}
