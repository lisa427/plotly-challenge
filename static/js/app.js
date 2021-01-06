// populate dropdown menu with the names from json data
d3.json("samples.json").then(function(namesData) {
    let names = namesData.names;

    let select = document.getElementById("selDataset"); 

    for(let i = 0; i < names.length; i++) {
        let opt = names[i];
        select.innerHTML += "<option value=\"" + opt + "\">" + opt + "</option>";
    }
});

// function to build 3 charts (bubble, bar, and demographic text box)
function buildPlots(id) {
      
    d3.json("samples.json").then(function(allData) {

        // bubble chart
        // grab sample data from json object and filter by id
        let samplesArray = allData.samples
        let filteredSamples = samplesArray.filter(d => d.id === id);

        // save filtered data into variables
        let sampleValues = filteredSamples[0].sample_values;
        let otuIds = filteredSamples[0].otu_ids;
        let otuLabels = filteredSamples[0].otu_labels;
      
        // set up data for Plotly bubble chart
        var trace1 = {
            x: otuIds,
            y: sampleValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
              color: otuIds,
              size: sampleValues
            }
        };
          
        var data = [trace1];
          
        var layout = {
            xaxis: {title: 'OTU ID'},
            showlegend: false,
            height: 500,
            width: 1000
        };
        
        // plot bubble chart
        Plotly.newPlot('bubble', data, layout);

        // bar chart
        // slice first 10 values from previously filtered data
        let sampleValues10 = sampleValues.slice(0,10);
        let otuIds10 = otuIds.slice(0,10);
        let otuLabels10 = otuLabels.slice(0,10);

        // convert IDs to text and add "OTU" 
        otuIds10 = otuIds10.map(number => `OTU ${number}`);

        // set up data for Plotly bar chart
        var data2 = [{
            type: 'bar',
            x: sampleValues10,
            y: otuIds10,
            orientation: 'h',
            text: otuLabels10,
            transforms: [{
                type: 'sort',
                target: 'y',
                order: 'descending'
              }]
          }];

          // plot bar chart
          Plotly.newPlot('bar', data2);

        // demographic text
        // grab metadata from json object and filter by id
        let metaArray = allData.metadata
        let filteredMeta = metaArray.filter(d => d.id.toString() === id);
        
        // save filtered data into variables
        let ethnicity = filteredMeta[0].ethnicity;
        let gender = filteredMeta[0].gender;
        let age = filteredMeta[0].age.toString();
        let location = filteredMeta[0].location;
        let bbtype = filteredMeta[0].bbtype;
        let wfreq = filteredMeta[0].wfreq;

        // display text in html element
        document.getElementById("sample-metadata").innerHTML = `ID: ${id}\
        <br>Ethnicity: ${ethnicity}\
        <br>Gender: ${gender}\
        <br>Age: ${age}\
        <br>Location: ${location}\
        <br>bbtype: ${bbtype}\
        <br>wfreq: ${wfreq}`;
               
    });
};

// function to change id to selected from dropdown and recreate plots
function updateId() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // reassign the id variable with value from the dropdown menu
    id = dropdownMenu.property("value");
    // build plots with chosen id
    buildPlots(id);
};

// get first id from json data and build plots
d3.json("samples.json").then(function(data2) {
    let id = data2.names[0];
    buildPlots(id);
  });

// listen for the dropdown menu to be changed and run function to change id
d3.selectAll("#selDataset").on("change", updateId);