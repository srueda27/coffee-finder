'use client'

import { PositionType } from "@/types";
import { useState } from "react";

export const useTrackLocation = (setLongLat: React.Dispatch<React.SetStateAction<string | null>>) => {
  const [isFindingLocation, setIsFindingLocation] = useState(false)
  // const [longLat, setLongLat] = useState('')
  const [locationErrorMsg, setLocationErrorMsg] = useState('')

  function success(position: PositionType) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setIsFindingLocation(false)
    setLongLat(`${latitude},${longitude}`)
    setLocationErrorMsg('')
  }

  function error() {
    setIsFindingLocation(false)
    setLocationErrorMsg("Unable to retrieve your location")
  }

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      setIsFindingLocation(false)
      setLocationErrorMsg("Geolocation is not supported by your browser")
    } else {
      setIsFindingLocation(true)
      setLocationErrorMsg('')
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  return {
    handleTrackLocation,
    isFindingLocation,
    // longLat,
    locationErrorMsg
  }
}