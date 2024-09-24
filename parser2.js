function parse(j){
    problem = "no"
    window.scrollTo(0,0)
    output = []
    directions = []
    var convertedDistances = []
    distances = []
    corners = []
    var typedinput
    typedinput = ODB.features[inPlacement].legal
    var splitbycomma = []
    splitbycomma = typedinput.split(',');
    var firstCorner = splitbycomma.shift()
    legals = [[firstCorner]]
    for (i = 0; i < splitbycomma.length; i = i + 1){
        var reassembly = ''
        var splitbyspace = splitbycomma[i].split(' ');
        directions.push(splitbyspace[1])
        distances.push(splitbyspace[2])
        //Having seperated direction & disatnce, not reassemble everything after that as the corners
        for (k = 4; k < splitbyspace.length; k = k + 1) {
            reassembly = reassembly + splitbyspace[k] + ' '
        }
        corners.push(reassembly)
    }
    // Now lets determine the units in which distances are espressed
    var divisor = 1 // default is set to interpret distances as chains
    if (splitbycomma[1].includes(' po ')) { // but if units are poles, divide distances by 4 to get chains
        divisor = 4
    }
    if (splitbycomma[1].includes(' po,')) {
        divisor = 4
    }
    console.log("all distances are " + distances)
    for (var i = 0; i < splitbycomma.length; i = i + 1) {
        var nextDirection = directions[i]
        var nextDistance = distances[i]
        var convertedDistance = nextDistance/divisor // apply the divisor to get all units in chains
        convertedDistances.push(convertedDistance) // and put those distances in an array
        var nextCorner = corners[i]
        nextDirection = "'"+ nextDirection + "'" // similarly create an array of each direction
        legals[0].push(nextDirection)
        legals[0].push(convertedDistance)
        nextCorner = "'" + nextCorner + "'"
        legals[0].push(nextCorner)
    }

    //output is going to be the array of ghost coordinates for the tract we are now processing
    //output will assume the starting point is lat = 0, long = 0, later the user can put it somewhere else
    output = [[0,0]] 
    var nextCoord = 1
    for (i = 0; i < directions.length; i = i + 1){
        // now test for whether the next direction is something other than N, S, E, or W - like "N45W"
        if (directions[i].length > 1) { //if so then we need to figure what the angle is
            var partsArray = directions[i].split('');  // so seperate the direction into individual characters
                direction1 = partsArray[0] //here we determine the first component - like "N"
                direction2 = partsArray[partsArray.length - 1] // and the last - like "W"
                var theta = "" //theta will be our angle, but we need to reassemble it from partsArray
                for (var j = 1; j < partsArray.length -1; j = j + 1) {
                    theta = theta.concat(partsArray[j]);
                    }
                var hypChains = convertedDistances[i] //now set the distance as our hypoteneuse
                theta = (90-theta)*3.14159265359/180 //convert to complimentary angle in radians
                var oppChains = hypChains * Math.sin(theta) //a little trig will tell us the NS vector magnitude
                var adjChains = hypChains * Math.cos(theta) // and the EW vector magnitude
                if (direction1 == "N") {newLat = output[nextCoord-1][0] + oppChains * NSscaling}
                if (direction1 == "S") {newLat = output[nextCoord-1][0] - oppChains * NSscaling}
                if (direction2 == "E") {newLong = output[nextCoord-1][1] + adjChains * EWscaling}
                if (direction2 == "W") {newLong = output[nextCoord-1][1] - adjChains * EWscaling}
                try{output.push([newLat, newLong])}
                catch{
                    console.log("there is a problem with the description")
                    problem = "yes"
                    return
                }
        }
        if (directions[i] == "N" && problem == "no") {
            output.push([convertedDistances[i] * NSscaling + output[nextCoord-1][0], output[nextCoord-1][1]])}
        if (directions[i] == "S" && problem == "no") {
            output.push([- convertedDistances[i] * NSscaling + output[nextCoord-1][0], output[nextCoord-1][1]])}
        if (directions[i] == "E" && problem == "no") {
            output.push([output[nextCoord-1][0], convertedDistances[i] * EWscaling + output[nextCoord-1][1]])}
        if (directions[i] == "W" && problem == "no") {
            output.push([output[nextCoord-1][0], - convertedDistances[i] * EWscaling + output[nextCoord-1][1]])}
        var nextCoord = nextCoord + 1
        }
        // Now we have a set of ghost coordinates, so let's put them into the JSON
        if (problem == "no"){
            ODB.features[inPlacement].coords = output
            mapMode();    
        }
        else{fixProblem()}
}

function petitionMode(){
    document.getElementById('description').style.visibility = "hidden"
    document.getElementById('petition').style.visibility = "block"
}

function petitionSearch(){
    tempLayer.clearLayers();
    var petitionList = document.getElementById('petition').value
    var petitionArray = petitionList.split(", ")
    searchResult = []

    for (var j = 0; j < petitionArray.length; j++){
        var searchTerm = petitionArray[j]
        for (var i = 0; i < ODB.features.length; i++){
            var thisSearch = ODB.features[i].brief + " " + ODB.features[i].legal + " " + ODB.features[i].caption 
            if (thisSearch.includes(searchTerm)){
                searchResult.push(i)
            }
        }
    }
    searchResultTable()
}

function fixProblem(){
    var checkCounter
    for (var i = 0; i < distances.length; i++){
        if (typeof distances[i] === 'number'){
            checkCounter = checkCounter + 1
        }
    }
    if (checkCounter == distances.length){console.log("All distances are numbers")}
    else {console.log("Some distances are not numbers")}

    for (var i = 0; i < distances.length; i++){
        if (typeof distances[i] === 'number'){
            checkCounter = checkCounter + 1
        }
    }
    if (checkCounter == distances.length){console.log("All distances are numbers")}
    else {console.log("Some distances are not numbers")}

}