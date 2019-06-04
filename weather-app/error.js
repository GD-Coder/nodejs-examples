const errorService = {

    returnErrorResponse(requestType, errorType) {
        switch (errorType) {

            case "connection":
                return "Unable to connect to " + requestType + " service... please check your internet connection and try again."

            case "location":
                return "The given location could not be found. Please enter a new location."
        }
    }
}

module.exports = errorService