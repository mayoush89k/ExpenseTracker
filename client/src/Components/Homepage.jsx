import React from "react";
import "./style.css";
import lightWallpaper from "../assets/lightWallpaper.png";
import darkWallpaper from "../assets/darkWallpaper.png";

export default function Homepage() {
  const lightColors = ["#FFD28F", "#FFE3BB", "#B4BDFF", "#83A2FF"];
  const darkColors = ["#F5E8C7", "#818FB4", "#435585", "#363062"];
  return (
    <div className="w-full h-[90vh] flex flex-col justify-start items-center">
      {console.log(window.matchMedia("(prefers-color-scheme: dark)").matches)}
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
