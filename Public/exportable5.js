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
            tableText = tableText + ',"abstract":"' + ODB.features[j].abstract + '"'
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

            // edges array subloop
            tableText = tableText + ',"edges":['
            try{
                for (var i = 0; i < ODB.features[j].edges.length; i++){
                    tableText = tableText + "'" + ODB.features[j].edges[i] + "'"
                    if (i + 1 < ODB.features[j].edges.length){
                        tableText = tableText + ","
                    }
                }
            }
            catch{}
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
                tableText = tableText + '"'+ ODB.features[j].watershed[k] + '"'
                if (k < ODB.features[j].watershed.length - 1){
                    tableText = tableText + ','
                }
            }
            tableText = tableText + '],"centroid":[' + ODB.features[j].centroid[0] + "," + ODB.features[j].centroid[1] +"]"
            if (ODB.features[j].containsCentroidOf.length > 0){tableText = tableText + ',"containsCentroidOf":[' + ODB.features[j].containsCentroidOf + ']'}
            else{tableText = tableText + ',"containsCentroidOf":[]'}
            if (ODB.features[j].lid == 1){tableText = tableText + ',"lid":' + ODB.features[j].lid}
            else{tableText = tableText + ',"lid":0'}
            tableText = tableText + ',"keywords":['
            try{
                for (var k = 0; k < ODB.features[j].keywords.length; k++){
                    tableText = tableText + '"'+ ODB.features[j].keywords[k] + '"'
                    if (k < ODB.features[j].keywords.length - 1){
                        tableText = tableText + ','
                    }
                }
            }
            catch{}
            tableText = tableText + '],"raft":['
            for (var k = 0; k < ODB.features[j].raft.length; k++){
                tableText = tableText + ODB.features[j].raft[k]
                if (k < ODB.features[j].raft.length - 1){
                    tableText = tableText + ','
                }
            }

            tableText = tableText + ']},'
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

    myNewRow = document.createElement('tr');
    myNewCell1 = document.createElement('td');
    tableText = "var odbNoMetes = ["
    for (var j = 0; j < odbNoMetes.length; j ++){
        tableText = tableText + odbNoMetes[j]
        if (j < odbNoMetes.length - 1){
            tableText = tableText + ","
        }
    }
    tableText = tableText + "]"
    myNewCell1.innerText = tableText
    myNewRow.append(myNewCell1)
    theTable.append(myNewRow);

    // myNewRow = document.createElement('tr');
    // myNewCell1 = document.createElement('td');
    // tableText = "var noRealEstateConveyed = ["
    // for (var j = 0; j < noRealEstateConveyed.length; j ++){
    //     tableText = tableText + noRealEstateConveyed[j]
    //     if (j < noRealEstateConveyed.length - 1){
    //         tableText = tableText + ","
    //     }
    // }

    myNewRow = document.createElement('tr');
    myNewCell1 = document.createElement('td');
    tableText = "var inModelUpdates = ["
    for (var j = 0; j < inModelUpdates.length; j ++){
        tableText = tableText + inModelUpdates[j]
        if (j < inModelUpdates.length - 1){
            tableText = tableText + ","
        }
    }

    tableText = tableText + "]"
    myNewCell1.innerText = tableText
    myNewRow.append(myNewCell1)
    theTable.append(myNewRow);


    myNewRow = document.createElement('tr');
    myNewCell1 = document.createElement('td');
    version = version + 1
    myNewCell1.innerText = "var version = " + version
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
                        console.log("added 2 to score for item " + j +" bc " + ODB.features[i].adj[j] + " bc it matches three names but not suffix " + ODB.features[x].adj[k])
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

    function lightenTheLoad(x){// this checks to make sure that nearby field does not reference itself
        for (var j = 0; j < ODB.features[x].nearby.length; j++){
            if (ODB.features[x].nearby[j][0] == x){
                var temp = ODB.features[x].nearby
                temp.splice(j,1)
                j = ODB.features.length
            }
        }
    }

    function makeDateSortable(date){
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
                try{
                    if (ODB.features[i].history[j][2] > ODB.features[i].history[j+1][2]){
                        var temp = ODB.features[i].history[j+1]
                        ODB.features[i].history[j+1] = ODB.features[i].history[j]
                        ODB.features[i].history[j] = temp
                        movedOne = "yes"
                    }
                }
                catch{}
            }
        }
        if (movedOne=="yes"){checkAllDates();}
    }

    function checkDateSortability(){
        for (var i = 0; i < ODB.features.length; i++){
            for (var j = 0; j < ODB.features[i].history.length - 1; j ++){
                if (ODB.features[i].history[j][2] == 0){
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
    }


    function getHyperlink(x){
        var hyperlink = bareHyperlink(x)
        hyperlink = "<a href='" + hyperlink + "'>link</a>"
        if (hyperlink == "<a href='no ODN reference'>link</a>"){hyperlink = "no link"}
        return hyperlink
    }

    function bareHyperlink(x){
        try {
            var stepOne = x
            var stepTwo = []
            var stepThree
            var stepFour
            if (stepOne.includes("ODB")){
                stepTwo = stepOne.split(" ")
                for (var i = 0; i < stepTwo.length; i++){
                    if (stepTwo[i].includes("ODB")){
                        stepThree = stepTwo[i+1]
                        i = stepTwo.length
                    }
                }
                stepFour = stepThree.split("/")
            }
            try{
                var bareLink = "https://rod.orangecountync.gov/orangencnw/application.asp?cmd=image_link&image_link_book=" + stepFour[0] + "&image_link_page=" + stepFour[1] + "&image_link_booktype=Records%20Book&tif2pdf=true"
            }
            catch {var bareLink = "no ODB reference"}
        }
        catch {var bareLink = "no ODB reference"}
        return bareLink
    }

    function JSONmaintenance(){
        checkAllDates();
        for (var i = 0; i < ODB.features.length; i++){
            if (ODB.features[i].grantor=="NC" || ODB.features[i].grantor=="Granville"){ODB.features[i].type = "grant"}
            ODB.features[i].id = i
            // CHECK FOR MISSING ACRES
            if (ODB.features[i].coords.length > 1 && ODB.features[i].acres == 0){
                var abstract = ODB.features[i].abstract
                if (abstract.includes(' acres')){
                    var splitAtAcres = abstract.split(' acres')
                    var holding = splitAtAcres[0]
                    var splitAtSpace = holding.split(' ')
                    var last = splitAtSpace.length - 1
                    ODB.features[i].acres = splitAtSpace[last]
                }
            }
    
            // CHECK FOR MISSING CENTROIDS
            if (ODB.features[i].coords.length > 1 && ODB.features[i].centroid[0] == 0 && ODB.features[i].centroid[1] == 0){
                getCentroid(i)
            }
    
            // CHECK FOR shortRef & citations
            if (ODB.features[i].coords.length > 1 && ODB.features[i].shortRef == ""){
                ODB.features[i].shortRef = ODB.features[i].citations
            }
            if (ODB.features[i].coords.length > 1 && ODB.features[i].citations == ""){
                ODB.features[i].citations = ODB.features[i].shortRef
            }

            // check for missing ODB hyperlinks
            if (ODB.features[i].coords.length > 1 && ODB.features[i].link == ""){
                ODB.features[i].link = bareHyperlink(ODB.features[i].shortRef)
            }
    
            //check all TYPE field
            if (ODB.features[i].caption.includes("ODB") && ODB.features[i].type != "grant"){
                ODB.features[i].type = "deed"
            }

            // CHECK FOR MISSING WATERSHEDS
            var watersheds = ["Amos Creek","Babs Branch","Back Branch","Back Creek","Bakers Creek","Banks Branch","Barbees Creek","Bear Creek","Big Branch","Big Creek","Billy Morgan Creek","Birds Branch","Birds Creek","Black Jack Creek","Blown Fork Branch","Blue Hill Branch","Bolin Creek","Bradfords Creek","Brick Kiln Branch","Broomstraw Creek","Bryants Branch","Buck Quarter Creek","Buckhorn Branch","Buckhorn Creek","Buffalo Branch","Buffalo Creek","Burks Creek","Burnetts Branch","Butchers Creek","Cabin Branch","Camp Branch","Cane Creek","Cane Creek","Carrington Spring Branch","Caswells Creek","Caterpillar Branch","Caterpillar Creek","Cates Creek","Cates Spring Branch","Cattail Branch","Cedar Creek","Clear Creek","Collins Creek","Combs Creek","Connally Spring Branch","Cook Spring Branch","Crooked Run","Cross Creek","Cub Creek","Cubb Creek","Deep Bottom Branch","Dicks Branch","Dividing Branch","Dividing Line Branch","Drewrys Branch","Drones Creek","Dry Branch","Dry Creek","Dunagans Spring Branch","Durhams Branch","Dutchmans Creek","E Fork of Eno River","Edward Maner Creek","Elks Creek","Eno River","Fanns Creek","Finchers Branch","First Creek","Flat Branch","Flat Creek","Flat River","Forresters Creek","Fullers Branch","Gibsons Creek","Grays Creek","Great Branch","Great Creek","Hardens Creek","Hardins Creek","Harrels Creek","Hastings Creek","Haw Branch","Haw Creek","Haw River","Hawfield Branch","Henry Morris Creek","Hester Stillhouse Branch","Hico Creek","Hills Creek","Hog Branch","Hogpen Branch","Hogs Creek","Hollow Rock Branch","House Spring Branch","Indian Branch","Iveys Spring Branch","Jackhorse Creek","Jacksons Creek","Jacksons Run","James Collins Creek","Jobs Branch","Jones Creek","Jumping Run","Kennedys Branch","Lanteys Branch","Laws Creek","Lick Branch","Lick Creek","Lightwood Branch","Line Branch","Little Back Creek","Little Cedar Creek","Little Creek","Little Mill Creek","Little Ready Branch","Little River","Littlejohns Branch","Long Branch","Lower Creek","Lynches Creek","M Fork of Eno River","Maple Branch","Marshalls Branch","Mason Creek","McAdams Creek","McGowans Creek","McMunds Branch","Meadow Branch","Mebanes Branch","Middle Creek","Mile Branch","Mill Branch","Mill Creek","Miry Branch","Mitchells Creek","Moccasin Branch","Morgan Creek","Motes Creek","Mount Willing Branch","Mountain Branch","Mountain Creek","Muddy Branch","Mulberry Branch","N Fork of Little River","N Hico Creek","Nancy Hills Creek","Neuse River","Nevills Creek","New Hope Creek","New River","Northeast Creek","Northern Creek","Nunn Creek","Nunns Mill Creek","Obeds Creek","Old Field Creek","Panther Branch","Panther Creek","Pattersons Creek","Pea Creek","Phils Creek","Pine Pole Branch","Piney Mountain Creek","Pollocks Spring Branch","Ponds Creek","Presswoods Creek","Prices Creek","Prickly Pear Branch","Quaker Creek","Quarrel Creek","Rayburn Branch","Rayburns Creek","Reddings Spring Branch","Reedy Branch","Reeves Spring Branch","Rich Creek","Richland Creek","Rock Spring Branch","Rocky Branch","Rocky Creek","Rocky Run","Ruler Creek","S Fork of Little River","S Fork of Morgan Creek","S Hico Creek","School House Branch","Schoolhouse Branch","Schoolhouse Spring Branch","Seven Mile Branch","Seven Mile Creek","Shop Branch","Smiths Spring Branch","Spirit Branch","Stags Creek","Stewarts Spring Branch","Still House Branch","Stillhouse Branch","Stones Creek","Stony Branch","Storm Creek","Straight Branch","Stroud Spring Branch","Sweet Creek","Tapleys Creek","Tar Kiln Branch","Tar River","Terrells Creek","Thompsons Branch","Three Mile Branch","Thrift Spring Branch","Toms Creek","Turkey Hill Creek","Turkey Lick Branch","Turnpike Creek","Tussocky Branch","Upper Little River","W Fork of Eno River","Wates Branch","Watsons Creek","Whitteds Creek","Wild Cat Branch","Wilkersons Creek","Willis Branch","Wolf Den Branch","Wolf Trap Branch","Wooley Spring Branch","Wynns Creek"]
            if (ODB.features[i].coords.length > 1 && ODB.features[i].watershed.length == 0){
                ODB.features[i].watershed = []
                var testSubject = ODB.features[i].abstract + ODB.features[i].legal
                for (var j = 0; j < watersheds.length; j++){
                    if(testSubject.includes(watersheds[j])){
                        ODB.features[i].watershed.push(watersheds[j])
                    }
                }
            }
    
            //CHECK FOR "to BO" in corners also for extra spaces  
            if (ODB.features[i].coords.length > 1){
                for (var j = 0; j < ODB.features[i].corners.length; j++){
                    var thisCorner = ODB.features[i].corners[j].trim()
                    if (thisCorner[0] == "t" && thisCorner[1] == "o" && thisCorner[2] == " "){
                        thisCorner = thisCorner.slice(3)
                    }
                    ODB.features[i].corners[j] = thisCorner
                }
                var last = ODB.features[i].corners.length - 1
                if (ODB.features[i].corners[last] == "begin" || ODB.features[i].corners[last] == "first station"){
                    ODB.features[i].corners[last] = ""
                }
            }
    
            // MAKE SURE ALL SORTABLE DATES ARE GOOD
            if (ODB.features[i].sortabledate == 0 && ODB.features[i].date.length > 3){
                ODB.features[i].sortabledate = makeDateSortable(ODB.features[i].date)
            }

            //Make sure every parcel's raft contains itself
            ODB.features[i].raft = [i]
            // var tempArray = ODB.features[i].raft
            // if (tempArray.includes(i)){}
            // else{ODB.features[i].raft.push(i)}

            //Fill the keyword field in the JSON
            if(ODB.features[i].keywords.length == 0){
                var text = ODB.features[i].abstract + ODB.features[i].legal + JSON.stringify(ODB.features[i].history) 
                for (var j = 0; j < adjoiners.features.length; j++){
                    if (text.includes(adjoiners.features[j].fullName)){
                        if(ODB.features[i].keywords.includes(adjoiners.features[j].fullName)){}
                        else{ODB.features[i].keywords.push(adjoiners.features[j].fullName)}
                    }
                }    
            }
        }
        for (var i = 0; i < thisData.features.length; i++){
            if (thisData.features[i].conveysRealEstate == false){
                thisData.features[i].metes = false
                thisData.features[i].inModelAlready = false
            }
            // var sendToInModelTest = thisData.features[i].line
            // console.log(sendToInModelTest)
            // thisData.features[i].inModelAlready = InModelAlready(i);
        }
        for (var i = 0; i < inModelUpdates.length; i++){
            thisData.features[inModelUpdates[i]].inModelAlready = true
        }
    }