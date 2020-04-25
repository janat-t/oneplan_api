const axios = require("axios");
const { API_key } = require("../config/googleapi.config.js");

exports.findId = async (req, res) => {
  let url =
    "https://maps.googleapis.com/maps/api/place/details/json?place_id=" +
    req.params.placeId +
    "&fields=name, &key=" +
    API_key;
  let photos = [];
  let error = null;
  await axios
    .get(url)
    .then(result => {
      console.log(result.data.result);
      photos = result.data.result.photos;
    })
    .catch(err => {
      console.log(err);
      error = err;
    });
  if (error) {
    res.status(500).send({
      message: "Error retrieving image of place with place_id " + req.params.placeId
    });
    return;
  }
  if (photos.length === 0) {
    res.status(404).send({
      message: "Not found image " + req.params.placeId
    });
    console.log("photo not found");
    return;
  }
  // console.log("found photo: ", photos);
  let photoUrls = [];
  await photos.map(photo => {
    photoUrls.push(
      "https://maps.googleapis.com/maps/api/place/photo?maxwidth=480&photoreference=" +
        photo.photo_reference +
        "&key=" +
        API_key
    );
  });
  res.send(photoUrls);
};

exports.findPhotoId = async (req, res) => {
  let url =
    "https://maps.googleapis.com/maps/api/place/details/json?place_id=" +
    req.params.placeId +
    "&fields=photo&key=" +
    API_key;
  let photos = [];
  let error = null;
  await axios
    .get(url)
    .then(result => {
      console.log(result.data.result);
      photos = result.data.result.photos;
    })
    .catch(err => {
      console.log(err);
      error = err;
    });
  if (error) {
    res.status(500).send({
      message: "Error retrieving image of place with place_id " + req.params.placeId
    });
    return;
  }
  if (photos.length === 0) {
    res.status(404).send({
      message: "Not found image " + req.params.placeId
    });
    console.log("photo not found");
    return;
  }
  // console.log("found photo: ", photos);
  let photoUrls = [];
  await Promise.all(
    photos.map(async photo => {
      let request =
        "https://maps.googleapis.com/maps/api/place/photo?maxwidth=480&photoreference=" +
        photo.photo_reference +
        "&key=" +
        API_key;
      let newUrl = "";
      await axios
        .head(request)
        .then(result => {
          let newUrl = result.request._redirectable._currentUrl;
          console.log(newUrl);
          photoUrls.push(newUrl);
        })
        .catch(error => {
          console.log(error);
        });
      return newUrl;
    })
  );
  res.send(photoUrls);
};

exports.transport = async (req, res) => {
  let url =
    "https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:" +
    req.params.originPlaceId +
    "&destinations=place_id:" +
    req.params.destinationPlaceId +
    "&mode=transit&key=" +
    API_key;
  let data = {};
  let error = null;

  await axios
    .get(url)
    .then(result => {
      console.log("data", result.data);
      data = result.data.rows[0].elements[0];
    })
    .catch(err => {
      console.log(err);
      error = err;
    });
  if (data.status == "ZERO_RESULTS") {
    url =
      "https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:" +
      req.params.originPlaceId +
      "&destinations=place_id:" +
      req.params.destinationPlaceId +
      "&mode=driving&key=" +
      API_key;
    await axios
      .get(url)
      .then(result => {
        console.log("data", result.data);
        data = result.data.rows[0].elements[0];
      })
      .catch(err => {
        console.log(err);
        error = err;
      });
  } else {
    res.send({ ...data, mode: "Public Transport" });
    return;
  }
  if (error) {
    res.status(500).send({
      message: "Error retrieving image of place with place_id " + req.params.placeId
    });
    return;
  }
  res.send({ ...data, mode: "Driving" });
};
