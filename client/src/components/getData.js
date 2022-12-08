import { SERVER_HOST } from "../config/global_constants";
import axios from "axios";

export const getTags = async function () {
  let values;
  await axios.get(`${SERVER_HOST}/Tags`).then((res) => {
    if (res.data.length === 0) {
      values = null;
      return;
    }
    if (res.data.errorMessage) {
      console.log(res.data.errorMessage);
      values = null;
      return;
    }
    values = res.data;
  });
  return values.map((x) => {
    return { value: x, label: x };
  });
};

export const getTypes = async function () {
  let values;
  await axios.get(`${SERVER_HOST}/types`).then((res) => {
    if (res.data.length === 0) {
      values = null;
      return;
    }
    if (res.data.errorMessage) {
      console.log(res.data.errorMessage);
      values = null;
      return;
    }
    values = res.data;
  });
  return values.map((x) => {
    return { value: x, label: x };
  });
};

export const getLocalities = async function () {
  let values;
  await axios.get(`${SERVER_HOST}/localities`).then((res) => {
    if (res.data.length === 0) {
      values = null;
      return;
    }
    if (res.data.errorMessage) {
      console.log(res.data.errorMessage);
      values = null;
      return;
    }
    values = res.data;
  });
  return values.map((x) => {
    return { value: x, label: x };
  });
};

export const getRegions = async function () {
  let values;
  await axios.get(`${SERVER_HOST}/regions`).then((res) => {
    if (res.data.length === 0) {
      values = null;
      return;
    }
    if (res.data.errorMessage) {
      console.log(res.data.errorMessage);
      values = null;
      return;
    }
    values = res.data;
  });
  return values.map((x) => {
    return { value: x, label: x };
  });
};
