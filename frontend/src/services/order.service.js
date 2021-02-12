import axios from "axios";

import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/order/";

class OrderService {
  add(data) {
    return axios.post(
      API_URL + "add", data, { headers: authHeader() }
    );
  }
  getBoiskoAvailiable(productId) {
    return axios.get(
      API_URL + "boisko/unavailiable?productId=" + productId,  { headers: authHeader() }
    );
  }
  getBoiskoHoursDiasble(productId, rentDateFrom) {
    return axios.get(
      API_URL + "boisko/hours-to-disable?productId=" + productId + "&rentDateFrom=" + rentDateFrom,  { headers: authHeader() }
    );
  }
  getBiezniaBusy(rentDateFrom, rentDateTo) {
    return axios.get(
      API_URL + "bieznia/options-to-disable?rentDateFrom=" + rentDateFrom + "&rentDateTo=" + rentDateTo, { headers: authHeader() }
    );
  }
  getBiezniaUnavailiable() {
    return axios.get(
      API_URL + "bieznia/unavailiable",  { headers: authHeader() }
    );
  }
  getKajakBusy(rentDateFrom, rentDateTo) {
    return axios.get(
      API_URL + "kajak/options-to-disable?rentDateFrom=" + rentDateFrom + "&rentDateTo=" + rentDateTo, { headers: authHeader() }
    );
  }
  getKajakUnavailiable() {
    return axios.get(
      API_URL + "kajak/unavailiable",  { headers: authHeader() }
    );
  }
  getMataBusy(rentDateFrom, rentDateTo) {
    return axios.get(
      API_URL + "mata/options-to-disable?rentDateFrom=" + rentDateFrom + "&rentDateTo=" + rentDateTo, { headers: authHeader() }
    );
  }
  getMataUnavailiable() {
    return axios.get(
      API_URL + "mata/unavailiable",  { headers: authHeader() }
    );
  }
  getRowerKolazowkaBusy(rentDateFrom, rentDateTo) {
    return axios.get(
      API_URL + "rower-kolazowka/options-to-disable?rentDateFrom=" + rentDateFrom + "&rentDateTo=" + rentDateTo, { headers: authHeader() }
    );
  }
  getRowerKolazowkaUnavailiable() {
    return axios.get(
      API_URL + "rower-kolazowka/unavailiable",  { headers: authHeader() }
    );
  }
  getRowerGorskiBusy(rentDateFrom, rentDateTo) {
    return axios.get(
      API_URL + "rower-gorski/options-to-disable?rentDateFrom=" + rentDateFrom + "&rentDateTo=" + rentDateTo, { headers: authHeader() }
    );
  }
  getRowerGorskiUnavailiable() {
    return axios.get(
      API_URL + "rower-gorski/unavailiable",  { headers: authHeader() }
    );
  }
  getRowerMiejskiBusy(rentDateFrom, rentDateTo) {
    return axios.get(
      API_URL + "rower-miejski/options-to-disable?rentDateFrom=" + rentDateFrom + "&rentDateTo=" + rentDateTo, { headers: authHeader() }
    );
  }
  getRowerMiejskiUnavailiable() {
    return axios.get(
      API_URL + "rower-miejski/unavailiable",  { headers: authHeader() }
    );
  }
  getRowerStacjonarnyBusy(rentDateFrom, rentDateTo) {
    return axios.get(
      API_URL + "rower-stacjonarny/options-to-disable?rentDateFrom=" + rentDateFrom + "&rentDateTo=" + rentDateTo, { headers: authHeader() }
    );
  }
  getRowerStacjonarnyUnavailiable() {
    return axios.get(
      API_URL + "rower-stacjonarny/unavailiable",  { headers: authHeader() }
    );
  }
  getSpadochronBusy(rentDateFrom, rentDateTo) {
    return axios.get(
      API_URL + "spadochron/options-to-disable?rentDateFrom=" + rentDateFrom + "&rentDateTo=" + rentDateTo, { headers: authHeader() }
    );
  }
  getSpadochronUnavailiable() {
    return axios.get(
      API_URL + "spadochron/unavailiable",  { headers: authHeader() }
    );
  }
  getSzynaCmpBusy(rentDateFrom, rentDateTo) {
    return axios.get(
      API_URL + "szyna-cmp/options-to-disable?rentDateFrom=" + rentDateFrom + "&rentDateTo=" + rentDateTo, { headers: authHeader() }
    );
  }
  getSzynaCmpUnavailiable() {
    return axios.get(
      API_URL + "szyna-cmp/unavailiable",  { headers: authHeader() }
    );
  }
  getWorekTreningowyBusy(rentDateFrom, rentDateTo) {
    return axios.get(
      API_URL + "worek-treningowy/options-to-disable?rentDateFrom=" + rentDateFrom + "&rentDateTo=" + rentDateTo, { headers: authHeader() }
    );
  }
  getWorekTreningowyUnavailiable() {
    return axios.get(
      API_URL + "worek-treningowy/unavailiable",  { headers: authHeader() }
    );
  }
  getGruszkaBusy(rentDateFrom, rentDateTo) {
    return axios.get(
      API_URL + "gruszka/options-to-disable?rentDateFrom=" + rentDateFrom + "&rentDateTo=" + rentDateTo, { headers: authHeader() }
    );
  }
  getGruszkaUnavailiable() {
    return axios.get(
      API_URL + "gruszka/unavailiable",  { headers: authHeader() }
    );
  }
  getZestawDoNartBusy(rentDateFrom, rentDateTo) {
    return axios.get(
      API_URL + "zestaw-do-nart/options-to-disable?rentDateFrom=" + rentDateFrom + "&rentDateTo=" + rentDateTo, { headers: authHeader() }
    );
  }
  getZestawDoNartUnavailiable() {
    return axios.get(
      API_URL + "zestaw-do-nart/unavailiable",  { headers: authHeader() }
    );
  }
  getZestawDoHokejaBusy(rentDateFrom, rentDateTo) {
    return axios.get(
      API_URL + "zestaw-do-hokeja/options-to-disable?rentDateFrom=" + rentDateFrom + "&rentDateTo=" + rentDateTo, { headers: authHeader() }
    );
  }
  getZestawDoHokejaUnavailiable() {
    return axios.get(
      API_URL + "zestaw-do-hokeja/unavailiable",  { headers: authHeader() }
    );
  }
  getZestawDoSnowboarduBusy(rentDateFrom, rentDateTo) {
    return axios.get(
      API_URL + "zestaw-do-snowboardu/options-to-disable?rentDateFrom=" + rentDateFrom + "&rentDateTo=" + rentDateTo, { headers: authHeader() }
    );
  }
  getZestawDoSnowboarduUnavailiable() {
    return axios.get(
      API_URL + "zestaw-do-snowboardu/unavailiable",  { headers: authHeader() }
    );
  }
  getZestawDoWspinaczkiBusy(rentDateFrom, rentDateTo) {
    return axios.get(
      API_URL + "zestaw-do-wspinaczki/options-to-disable?rentDateFrom=" + rentDateFrom + "&rentDateTo=" + rentDateTo, { headers: authHeader() }
    );
  }
  getZestawDoWspinaczkiUnavailiable() {
    return axios.get(
      API_URL + "zestaw-do-wspinaczki/unavailiable",  { headers: authHeader() }
    );
  }
}

export default new OrderService();
