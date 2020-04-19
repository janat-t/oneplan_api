const axios = require("axios");
const { API_key } = require("../config/googleapi.config.js");

exports.findId = async (req, res) => {
  let url =
    "https://maps.googleapis.com/maps/api/place/details/json?place_id=" +
    req.params.placeId +
    "&fields=name,photo&key=" +
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
