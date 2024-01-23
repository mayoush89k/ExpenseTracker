import React from "react";
import "./style.css";
import lightWallpaper from "../assets/lightWallpaper.png";
import darkWallpaper from "../assets/darkWallpaper.png";

export default function Homepage() {
  return (
    <div className="w-full h-[90vh] flex flex-col justify-center items-center">
      <img
        src={
          window.matchMedia("(prefers-color-scheme: dark)").matches
            ? darkWallpaper
            : lightWallpaper
        }
        alt="wallpaper"
        width={700}
        height={700}
        className="my-16"
      />
    </div>
  );
}
