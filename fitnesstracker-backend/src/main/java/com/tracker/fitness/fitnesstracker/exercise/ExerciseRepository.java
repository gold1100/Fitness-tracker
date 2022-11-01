package com.tracker.fitness.fitnesstracker.exercise;

import com.tracker.fitness.fitnesstracker.exerciseset.ExerciseSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {

    // finds a set where exercise was performed with biggest weight

    @Query("SELECT es FROM ExerciseSet es " +
            "WHERE es.exercise.id = ?1 AND es.weight = (SELECT max(es.weight) FROM es WHERE es.exercise.id = ?1)")
    List<ExerciseSet> findMaxWeightSet(Long exerciseId);
}
