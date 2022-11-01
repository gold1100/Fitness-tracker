import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/exercises";

class ExerciseService {
  getAllExercises() {
    return axios.get(BASE_URL);
  }

  addExercise(exercise) {
    return axios.post(BASE_URL, exercise);
  }

  getMaxWeightRaised(exerciseId) {
    return axios.get(BASE_URL + "/" + exerciseId + "/maxWeight");
  }

  deleteExercise(exerciseId) {
    console.log(BASE_URL + "/" + exerciseId);
    return axios.delete(BASE_URL + "/" + exerciseId);
  }
}

export default new ExerciseService();
