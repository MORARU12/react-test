import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFont } from "../redux/apiSlice";
import useMediaQuery from "../hooks/mediaQuery";

const Font = ({ font, main }) => {
  const fontSelected = useSelector((state) => state.api.fontSelected);
  const matchesMobile = useMediaQuery("(max-width: 720px)");
  const dispatch = useDispatch();

  const handleOnClick = (id) => {
    if (fontSelected === id) {
      dispatch(selectFont(-1));
      return;
    }
    dispatch(selectFont(id));
  };

  return (
    <>
      <input type="radio" id="html" name="fav_language" value="HTML" />

      <label
        htmlFor="html"
        className={`${
          main && !matchesMobile ? "form--label" : "form--label-small"
        }`}
        onClick={() => handleOnClick(font.id)}
        style={{
          opacity: fontSelected === font.id ? 0.5 : 1,
        }}
      >
        <div
          className={`${
            main && !matchesMobile ? "block--square" : "block--square-small"
          }`}
          style={{
            backgroundColor: font.color,
          }}
        >
          <span>{font["color-blind-label"]}</span>
          <span>{font.abbr}</span>
        </div>
        <section
          className={`text--section ${
            main && !matchesMobile ? "" : "text--section-mini"
          }`}
        >
          <span></span>
          <p>{font.label}</p>
        </section>
      </label>
    </>
  );
};

export default Font;
