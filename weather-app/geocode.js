const geocodeService = {

    baseUrl: "https://api.mapbox.com/geocoding/v5/mapbox.places/",
    token: "?access_token=pk.eyJ1IjoiZ2VyYWxkZDB3bmV5IiwiYSI6ImNqd2Fxa3ZpZTAyMjg0OW5yMWhwZDF1dHoifQ.EwpJ8GB1EPwqbN2kYGvmLg&limit=1",
    city: "Oklahoma City",

    returnGeocode() {
        return this.baseUrl + encodeURI(this.city) + ".json" + this.token
    }

}

module.exports =
    geocodeService