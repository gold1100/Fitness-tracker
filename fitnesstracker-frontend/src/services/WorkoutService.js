import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/workouts";

class WorkoutService {
  getAllWorkouts() {
    return axios.get(BASE_URL);
  }

  addWorkout(workout) {
    return axios.post(BASE_URL, workout);
  }

  deleteWorkout(id) {
    return axios.delete(BASE_URL + "/" + id);
  }

  updateWorkout(id, workoutBody) {
    return axios.put(BASE_URL + "/" + id, workoutBody);
  }

  addExerciseSet(workoutId, exerciseSet) {
    return axios.post(BASE_URL + "/" + workoutId + "/exerciseSet", exerciseSet);
  }
}

export default new WorkoutService();
