import React from "react";

export const required = val => {
  if (val) return undefined;

  return "Field is required";
};

export const maxLengthCreator = maxLengthVal => val => {
  if (val.length > maxLengthVal)
    return "Max length is " + maxLengthVal + " symbols";

  return undefined;
};
