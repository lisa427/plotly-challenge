// populate dropdown menu with the names from json data
d3.json("samples.json").then(function(namesData) {
    let names = namesData.names;

    let select = document.getElementById("selDataset"); 

    for(let i = 0; i < names.length; i++) {
        let opt = names[i];
        select.innerHTML += "<option value=\"" + opt + "\">" + opt + "</option>";
    }
});

// function to build 4 charts (bubble, bar, text box, & gauge)
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
              colorscale: 'Blues',
              size: sampleValues
            }
        };
          
        var data = [trace1];
          
        var layout = {
            xaxis: {title: 'OTU ID'},
            title: { text: "OTU Volumes" },
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

          var layout2 = {
            title: { text: "Top 10 OTUs" },
            showlegend: false
        };

          // plot bar chart
          Plotly.newPlot('bar', data2, layout2);

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

        // gauge chart
        // set up data for Plotly gauge chart
        // use washing frequency variable from text box
        var data3 = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: wfreq,
                title: { text: "Belly Button Washing Frequency<br>Scrubs per Week" },
                type: "indicator",
                mode: "gauge+number",
                gauge: { 
                    axis: { range: [null, 9] },
                    bar: { color: "navy" },
                    steps: [
                        { range: [0, 1], color: "B3E5FC" },
                        { range: [1, 2], color: "81D4FA" },
                        { range: [2, 3], color: "4FC3F7" },
                        { range: [3, 4], color: "29B6F6" },
                        { range: [4, 5], color: "03A9FA" },
                        { range: [5, 6], color: "039BE5" },
                        { range: [6, 7], color: "0288D1" },
                        { range: [7, 8], color: "0277BD" },
                        { range: [8, 9], color: "01579B" }
                      ]
                    } 
            }
        ];
        
        var layout3 = { 
            width: 500, 
            height: 400, 
            margin: { t: 0, b: 0 } 
        };

        // plot gauge chart
        Plotly.newPlot('gauge', data3, layout3);
               
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
d3.json("samples.json").then(function(jsonData) {
    let id = jsonData.names[0];
    buildPlots(id);
  });

// listen for the dropdown menu to be changed and run function to change id
d3.selectAll("#selDataset").on("change", updateId);