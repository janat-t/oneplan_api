const axios = require("axios");
const { API_key } = require("../config/googleapi.config.js");

exports.findId = async (req, res) => {
  let url =
    "https://maps.googleapis.com/maps/api/place/details/json?place_id=" +
    req.params.placeId +
    "&fields=name,type,url&key=" +
    API_key;
  let error = null;
  await axios
    .get(url)
    .then(result => {
      data = [
        {
          attraction_id: 0,
          google_place_id: req.params.placeId,
          attraction_name: result.data.result.name,
          attraction_type: result.data.result.types[0],
          attraction_link: result.data.result.url,
          open_time: "",
          close_time: "",
          attraction_description: "",
          ward_id: 0
        }
      ];
    })
    .catch(err => {
      console.log(err);
      error = err;
    });
  if (res === "callFunc") return data[0];
  if (error) {
    res.status(500).send({
      message: "Error retrieving place with place_id " + req.params.placeId
    });
    return;
  }
  console.log(data);
  res.send(data);
};

exports.findPhotoId = async (req, res) => {
  let url =
    "https://maps.googleapis.com/maps/api/place/details/json?place_id=" +
    req.params.placeId +
    "&fields=name,type,url,photo&key=" +
    API_key;
  let photos = [];
  let data = [];
  let error = null;
  await axios
    .get(url)
    .then(result => {
      data = [
        {
          google_place_id: req.params.placeId,
          attraction_type: result.data.result.types[0],
          attraction_link: result.data.result.url
        }
      ];
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
  let photoUrls = [];
  if (photos) {
    photos.map(photo => {
      let request =
        "https://maps.googleapis.com/maps/api/place/photo?maxwidth=480&photoreference=" +
        photo.photo_reference +
        "&key=" +
        API_key;
      photoUrls.push(request);
    });
  }

  data[0] = { ...data[0], photos: photoUrls };
  console.log(data);
  res.send(data);
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
  if (process.env.NODE_ENV === "development") {
    res.send({
      distance: {
        text: "10.3 km",
        value: 10251
      },
      duration: {
        text: "16 mins",
        value: 940
      },
      status: "OK",
      mode: "Driving"
    });
    return;
  }
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
