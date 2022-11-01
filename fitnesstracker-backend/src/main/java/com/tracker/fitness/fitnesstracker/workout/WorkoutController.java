package com.tracker.fitness.fitnesstracker.workout;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "api/v1/workouts")
@CrossOrigin("http://localhost:3000")
public class WorkoutController {

    private final WorkoutService workoutService;
    private final Mapper mapper;

    @Autowired
    public WorkoutController(WorkoutService workoutService, Mapper mapper) {
        this.workoutService = workoutService;
        this.mapper = mapper;
    }

    //Workouts

    @GetMapping
    public List<WorkoutDTO> getWorkouts() {
        return workoutService
                .getWorkouts()
                .stream()
                .map(mapper::toWorkoutDTO).collect(Collectors.toList());
    }

    @GetMapping(path = "/{id}")
    public WorkoutDTO getWorkout(@PathVariable Long id){
        return mapper.toWorkoutDTO(workoutService.getWorkoutById(id));
    }

    @PostMapping
    public WorkoutDTO addWorkout(@RequestBody WorkoutDTO workoutDTO) {
        Workout obj = workoutService.addWorkout(mapper.toWorkout(workoutDTO));
        return mapper.toWorkoutDTO(obj);

    }

    @PutMapping(path = "/{id}")
    public WorkoutDTO editWorkout(@PathVariable Long id, @RequestBody WorkoutDTO workoutDTO){
        Workout obj = workoutService.editWorkout(id, mapper.toWorkout(workoutDTO));
        return mapper.toWorkoutDTO(obj);
    }

    @DeleteMapping(path = "/{id}")
    public void deleteWorkout(@PathVariable Long id){
        workoutService.deleteWorkout(id);
    }

}

