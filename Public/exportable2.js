function exportTable(){ // We are going to show the entire JSON as a table (which we can select all & copy)
    // first, hide everything but the table so that when we select all, we are copying the JSON data only

    ODB.features.sort((a, b) => (a.id > b.id ? 1 : -1));
    theTable.innerHTML=""
    var myNewRow = document.createElement('tr');
    var myNewCell = document.createElement('td');
    myNewCell.innerText = "recentPlacement = [" + recentPlacement + "]"
    myNewRow.append(myNewCell)
    theTable.append(myNewRow);

    var myNewRow = document.createElement('tr');
    var myNewCell = document.createElement('td');
    try{
        myNewCell.innerText = "lastSearch = '" + document.getElementById('searchInput2').value + "'"
    }
    catch{
        myNewCell.innerText = "lastSearch = 'no last search'"
    }
    myNewRow.append(myNewCell)
    theTable.append(myNewRow);

    var myNewRow = document.createElement('tr');
    var myNewCell1 = document.createElement('td');
    myNewCell1.innerText = "var ODB = {'features':["
    myNewRow.append(myNewCell1)
    theTable.append(myNewRow);
    for (var j = 0; j < ODB.features.length; j = j + 1){
        if (ODB.features[j].type != "delete"){
            myNewRow = document.createElement('tr');
            myNewCell1 = document.createElement('td');
            var tableText = '{"id":' + ODB.features[j].id + ',"type":"' + ODB.features[j].type + '"'
            tableText = tableText + ',"citations":"' + ODB.features[j].citations + '"'
            tableText = tableText + ',"grantor":"' + ODB.features[j].grantor + '"'
            tableText = tableText + ',"grantee":"' + ODB.features[j].grantee + '"'
            tableText = tableText + ',"date":"' + ODB.features[j].date + '"'
            tableText = tableText + ',"brief":"' + ODB.features[j].brief + '"'
            tableText = tableText + ',"SCC":"' + ODB.features[j].SCC + '"'
            tableText = tableText + ',"surveyed":"' + ODB.features[j].surveyed + '"'
            tableText = tableText + ',"shortRef":"' + ODB.features[j].shortRef + '"'
            tableText = tableText + ',"link":"' + ODB.features[j].link + '"'
            if (ODB.features[j].caption == "") {
                ODB.features[j].caption = ODB.features[j].citations + " " + ODB.features[j].grantor + " to " + ODB.features[j].grantee
            }
            tableText = tableText + ',"caption":"' + ODB.features[j].caption + '"'
            tableText = tableText + ',"legal":"' + ODB.features[j].legal + '"'
            // corners array subloop
            tableText = tableText + ',"corners":['
                for (var i = 0; i < ODB.features[j].corners.length; i++){
                    tableText = tableText + "'" + ODB.features[j].corners[i] + "'"
                    if (i + 1 < ODB.features[j].corners.length){
                        tableText = tableText + ","
                    }
                }
            tableText = tableText + "]"
            // coords array subloop
            tableText = tableText + ',"coords":['
                for (var i = 0; i < ODB.features[j].coords.length; i++){
                    if (i==0){
                        tableText = tableText + "["
                    }
                    var nextLat = ODB.features[j].coords[i][0]
                    var nextLong = ODB.features[j].coords[i][1]
                    tableText = tableText + nextLat + "," + nextLong + "]"
                    if (i + 1 < ODB.features[j].coords.length){
                        tableText = tableText + ",["
                    }
                }
            tableText = tableText + "]"
            tableText = tableText + ',"county":"'+ ODB.features[j].county + '","history":['
            for (var i = 0; i < ODB.features[j].history.length; i = i + 1){
                tableText = tableText + '["' + ODB.features[j].history[i][0] + '"' + ',"' + ODB.features[j].history[i][1] + '",' + ODB.features[j].history[i][2] + ']'
                if (i < ODB.features[j].history.length - 1){
                    tableText = tableText + ","
                }
            }
            tableText = tableText + '],"acres":' + ODB.features[j].acres +',"sortabledate":' + ODB.features[j].sortabledate
            
            tableText = tableText + ',"source":['
            if (ODB.features[j].source.length > 0){
                console.log("source is longer than one!")
                for (var k = 0; k < ODB.features[j].source.length; k++){
                    tableText = tableText + '"' + ODB.features[j].source[k] + '"'
                    if (k != (ODB.features[j].source.length - 1)){
                        tableText = tableText + ","
                    }
                }
                tableText = tableText + "]"
            }
            else {
                tableText = tableText + ']'
            }
            tableText = tableText + ',"watershed":['
            for (var k = 0; k < ODB.features[j].watershed.length; k++){
                console.log("k = " + k + " j = " + j)
                tableText = tableText + '"'+ ODB.features[j].watershed[k] + '"'
                if (k < ODB.features[j].watershed.length - 1){
                    tableText = tableText + ','
                }
            }
            tableText = tableText + '],"adj":['
            for (var k = 0; k < ODB.features[j].adj.length; k++){
                tableText = tableText + '["'+ ODB.features[j].adj[k][0] + '",'
                tableText = tableText + '"'+ ODB.features[j].adj[k][1] + '",'
                tableText = tableText + '"'+ ODB.features[j].adj[k][2] + '",'
                tableText = tableText + '"'+ ODB.features[j].adj[k][3] + '"]'
                if (k < ODB.features[j].adj.length - 1){
                    tableText = tableText + ','
                }
            }
            tableText = tableText + '],"nearby":['
            for (var k = 0; k < ODB.features[j].nearby.length; k = k + 1){
                tableText = tableText + "[" + ODB.features[j].nearby[k][0] + "," + ODB.features[j].nearby[k][1] +"]" 
                if (k < ODB.features[j].nearby.length - 1){
                    tableText = tableText + ','
                }
            }
            tableText = tableText + '],"centroid":[' + ODB.features[j].centroid[0] + "," + ODB.features[j].centroid[1] +"]" 
            tableText = tableText + ',"containsCentroidOf":[' + ODB.features[j].containsCentroidOf + ']'
            tableText = tableText + ',"lid":' + ODB.features[j].lid
            tableText = tableText + '},'
            myNewCell1.innerText = tableText
            myNewRow.append(myNewCell1)
            theTable.append(myNewRow);
        }
    }
    myNewRow = document.createElement('tr');
    myNewCell1 = document.createElement('td');
    myNewCell1.innerText = "]}"
    myNewRow.append(myNewCell1)
    theTable.append(myNewRow);
}


function score(x){
        var SCORE = []
        ODB.features[x].nearby = []
        var watershedMatches = []
        //compare watersheds
        for (var i = 0; i < ODB.features.length; i++){
            SCORE.push(0)
            for (var j = 0; j < ODB.features[i].watershed.length; j++){
                for (var k = 0; k < ODB.features[x].watershed.length; k++){
                    if (ODB.features[i].watershed[j] == ODB.features[x].watershed[k] && ODB.features[x].watershed[k] != "none"){
                        console.log("watershed match " + j + " bc " + ODB.features[i].watershed[j] +" = " + ODB.features[x].watershed[k])
                        if (ODB.features[i].watershed[j].includes("Branch")){
                            SCORE[i] = SCORE[i] + 5
                            watershedMatches.push(i)
                        }
                        if (ODB.features[i].watershed[j].includes("Creek")){
                            SCORE[i] = SCORE[i] + 4
                            console.log("adding 4 to " + i+ " for a Creek match")
                            watershedMatches.push(i)
                        }
                        if (ODB.features[i].watershed[j].includes("River")){
                            SCORE[i] = SCORE[i] + 3
                            watershedMatches.push(i)
                        }
                    }
                }
            }
        }
        console.log("watershed matches = " + watershedMatches.length)
        for (var i = 0; i < ODB.features.length; i++){
            for (var j = 0; j < ODB.features[i].adj.length; j++){
                for (var k = 0; k < ODB.features[x].adj.length; k++){// ODB.features[x].adj[k][0] is the adjoiner we are testing
                //compare exact names + 4
               if (ODB.features[i].adj[j][0] == ODB.features[x].adj[k][0] && ODB.features[i].adj[j][1] == ODB.features[x].adj[k][1] && ODB.features[i].adj[j][2] == ODB.features[x].adj[k][2] && ODB.features[i].adj[j][3] == ODB.features[x].adj[k][3] && ODB.features[i].adj[j][0] !=""){
                        SCORE[i] = SCORE[i] + 4
                        console.log("added 4 to score for item " + j + " bc " + ODB.features[i].adj[j] + " bc it matches exactly " + ODB.features[x].adj[k]);
                    }
                    if (ODB.features[i].adj[j][0] == ODB.features[x].adj[k][0] && ODB.features[i].adj[j][1] != ODB.features[x].adj[k][1] && ODB.features[i].adj[j][2] == ODB.features[x].adj[k][2] && ODB.features[i].adj[j][0] != ""){
                        SCORE[i] = SCORE[i] + 1
                        console.log("added 1 to score for item " + j + " bc " + ODB.features[i].adj[j] + " bc it matches first & last " + ODB.features[x].adj[k])
                    }
                    if (ODB.features[i].adj[j][0] == ODB.features[x].adj[k][0] && ODB.features[i].adj[j][3] != ODB.features[x].adj[k][3] && ODB.features[i].adj[j][2] == ODB.features[x].adj[k][2] && ODB.features[i].adj[j][0] != ""){
                        SCORE[i] = SCORE[i] + 1
                        console.log("added 1 to score for item " + j +" bc " + ODB.features[i].adj[j] + " bc it matches three names but not suffix " + ODB.features[x].adj[k])
                    }
                    if (ODB.features[i].adj[j][2] == ODB.features[x].adj[k][2] && ODB.features[i].adj[j][0] == "" && ODB.features[i].adj[j][1] == "" && ODB.features[i].adj[j][3] == ""){
                        SCORE[i] = SCORE[i] + 0.25
                        console.log("added 0.25 to score for item " + j + " bc " + ODB.features[i].adj[j] + " bc it matches lastName only " + ODB.features[x].adj[k])
                    }
                }
            }
        }
        for (var i = 0; i < ODB.features.length; i++){
            if (SCORE[i] > 5){
                var scoringPair = [ODB.features[i].id,SCORE[i]]
                ODB.features[x].nearby.push(scoringPair)
            }
        }
        lightenTheLoad(x)
    }

    function lightenTheLoad(x){
        for (var j = 0; j < ODB.features[x].nearby.length; j++){
            if (ODB.features[x].nearby[j][0] == x){
                var temp = ODB.features[x].nearby
                temp.splice(j,1)
                j = ODB.features.length
            }
        }
    }

    function makeDateSortable(date){
        console.log(date)
        var dateArray = date.split(" ")
        if (dateArray.length == 3){
            var dateSortable = Number(dateArray[2])
            if (dateArray[1] == "Jan"){dateSortable = dateSortable + 0.01}
            if (dateArray[1] == "Feb"){dateSortable = dateSortable + 0.02}
            if (dateArray[1] == "Mar"){dateSortable = dateSortable + 0.03}
            if (dateArray[1] == "Apr"){dateSortable = dateSortable + 0.04}
            if (dateArray[1] == "May"){dateSortable = dateSortable + 0.05}
            if (dateArray[1] == "Jun"){dateSortable = dateSortable + 0.06}
            if (dateArray[1] == "Jul"){dateSortable = dateSortable + 0.07}
            if (dateArray[1] == "Aug"){dateSortable = dateSortable + 0.08}
            if (dateArray[1] == "Sep"){dateSortable = dateSortable + 0.09}
            if (dateArray[1] == "Oct"){dateSortable = dateSortable + 0.10}
            if (dateArray[1] == "Nov"){dateSortable = dateSortable + 0.11}
            if (dateArray[1] == "Dec"){dateSortable = dateSortable + 0.12}
            dateSortable = dateSortable + (dateArray[0]/10000)
            return dateSortable
        }
        if (dateArray.length == 2){
            var dateSortable = Number(dateArray[1])
            if (dateArray[0] == "Jan"){dateSortable = dateSortable + 0.01}
            if (dateArray[0] == "Feb"){dateSortable = dateSortable + 0.02}
            if (dateArray[0] == "Mar"){dateSortable = dateSortable + 0.03}
            if (dateArray[0] == "Apr"){dateSortable = dateSortable + 0.04}
            if (dateArray[0] == "May"){dateSortable = dateSortable + 0.05}
            if (dateArray[0] == "Jun"){dateSortable = dateSortable + 0.06}
            if (dateArray[0] == "Jul"){dateSortable = dateSortable + 0.07}
            if (dateArray[0] == "Aug"){dateSortable = dateSortable + 0.08}
            if (dateArray[0] == "Sep"){dateSortable = dateSortable + 0.09}
            if (dateArray[0] == "Oct"){dateSortable = dateSortable + 0.10}
            if (dateArray[0] == "Nov"){dateSortable = dateSortable + 0.11}
            if (dateArray[0] == "Dec"){dateSortable = dateSortable + 0.12}
            return dateSortable
        }
        if (dateArray.length == 1){
            var dateSortable = Number(dateArray[0])
            return dateSortable
        }
        return dateSortable
    }

    function checkAllDates(){
        var movedOne = "no"
        for (var i = 0; i < ODB.features.length; i++){
            for (var j = 0; j < ODB.features[i].history.length - 1; j ++){
                if (ODB.features[i].history[j][2] > ODB.features[i].history[j+1][2]){
                    var temp = ODB.features[i].history[j+1]
                    ODB.features[i].history[j+1] = ODB.features[i].history[j]
                    ODB.features[i].history[j] = temp
                    movedOne = "yes"
                }
            }
        }
        if (movedOne=="yes"){checkAllDates();}
    }

    function checkDateSortability(){
        for (var i = 0; i < ODB.features.length; i++){
            for (var j = 0; j < ODB.features[i].history.length - 1; j ++){
                if (ODB.features[i].history[j][2] == 0){
                    console.log("sending " + i)
                    ODB.features[i].history[j][2] = makeDateSortable(ODB.features[i].history[j][1])
                }
            }
        }
    }
    
    function getCentroid(x){
        mymap.on('popupopen', function(e){popup = e.popup;});
        L.polygon(ODB.features[x].coords, {color:"red", fillColor:"red"}).addTo(tempLayer)
            .bindPopup("taking centroid").openPopup();
        ODB.features[x].centroid = [popup._latlng.lat,popup._latlng.lng]
        tempLayer.clearLayers();
        L.marker(ODB.features[x].centroid).addTo(grantLayer)
    }
