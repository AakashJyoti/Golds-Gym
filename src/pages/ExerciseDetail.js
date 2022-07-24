import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import {
  exercisesOptions,
  fetchData,
  youtubeOptions,
} from "../utils/fetchData";
import SimilarExercises from "../components/SimilarExercises";
import ExercisesVideos from "../components/ExercisesVideos";
import Detail from "../components/Detail";

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState([]);
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMusclesExercises, setTargetMusclesExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchExercisesData = async () => {
      const exerciseDbUrl = "https://exercisedb.p.rapidapi.com";
      const youtubeSearchUrl =
        "https://youtube-search-and-download.p.rapidapi.com";

      const exerciseDetailData = await fetchData(
        `${exerciseDbUrl}/exercises/exercise/${id}`,
        exercisesOptions
      );
      setExerciseDetail(exerciseDetailData);

      const exerciseVideosData = await fetchData(
        `${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`,
        youtubeOptions
      );
      setExerciseVideos(exerciseVideosData.contents);

      const targetMusclesExercisesData = await fetchData(
        `${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,
        exercisesOptions
      );
      setTargetMusclesExercises(targetMusclesExercisesData);

      const equipmentExrecisesData = await fetchData(
        `${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,
        exercisesOptions
      );
      setEquipmentExercises(equipmentExrecisesData);
    };

    fetchExercisesData();
  }, [id]);

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExercisesVideos
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
      />
      <SimilarExercises
        targetMusclesExercises={targetMusclesExercises}
        equipmentExercises={equipmentExercises}
      />
    </Box>
  );
};

export default ExerciseDetail;
