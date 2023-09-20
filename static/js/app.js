d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
    var names = data.names;

    var dropdown = d3.select("#selDataset");
    names.forEach(name => {
        dropdown.append("option").text(name).property("value", name);
    });

    optionChanged(names[0]);  // Load the initial sample ID's data on first load
});
function optionChanged(selectedID) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
        // Filter the data for the selected sample ID
        var sample = data.samples.filter(obj => obj.id === selectedID)[0];

        // Display demographic information
        var metadata = data.metadata.filter(obj => obj.id == selectedID)[0];
        var demoInfo = d3.select("#sample-metadata");
        demoInfo.html("");  // Clear previous info
        Object.entries(metadata).forEach(([key, value]) => {
            demoInfo.append("p").text(`${key}: ${value}`);
        });

        // Bar chart
        var trace1 = {
            x: sample.sample_values.slice(0, 10).reverse(),
            y: sample.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
            text: sample.otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h"
        };

        var barData = [trace1];
        Plotly.newPlot("bar", barData);

        // Bubble chart
        var trace2 = {
            x: sample.otu_ids,
            y: sample.sample_values,
            text: sample.otu_labels,
            mode: 'markers',
            marker: {
                size: sample.sample_values,
                color: sample.otu_ids
            }
        };

        var bubbleData = [trace2];
        var layout = {
            xaxis: { title: "OTU ID" }
        };
        Plotly.newPlot("bubble", bubbleData, layout);

        
    });
}
