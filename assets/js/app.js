//Lesson Plan d3 3-activity 9 for reference

 var svgWidth = 960;
 var svgHeight = 700;

 var margin = {
   top: 20,
   right: 40,
   bottom: 60,
   left: 100
 };

 var width = svgWidth - margin.left - margin.right;
 var height = svgHeight - margin.top - margin.bottom;

 // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
 var svg = d3.select("#scatter")
   .append("svg")
   .attr("width", svgWidth)
   .attr("height", svgHeight);

 var chartGroup = svg.append("g")
   .attr("transform", `translate(${margin.left}, ${margin.top})`);

 



//access CSV
// Load data from data.csv
d3.csv("../data/data.csv").then(function(stateData) {
  console.log(stateData);


//income versus obesity
//var income = data[0].income;
//console.log(income);

//var obesity = data[0].obesity;
//console.log(obesity);

//parse data and set as numbers
    stateData.forEach(function(data) {
        data.income = +data.income;
        data.obesity = +data.obesity;
    });

//create scale functions
    var xLinearScale = d3.scaleLinear()
        .domain([15, d3.max(stateData, d => d.obesity)])
        .range([0, width]);
    
    var yLinearScale = d3.scaleLinear()
        .domain([30000, d3.max(stateData, d => d.income)])
        .range([height, 0]);

//create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    
//append axes to the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    
    chartGroup.append("g")
        .call(leftAxis);

//create circles
    var circlesGroup = chartGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.obesity))
    .attr("cy", d => yLinearScale(d.income))
    .attr("r", "12")
    .attr("fill", "orange")
    .attr("opacity", ".5");

//text for circles
    var circlesText = chartGroup.selectAll()
    .data(stateData)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("x", d => xLinearScale(d.obesity))
    .attr("y", d => yLinearScale(d.income))
    .style("font-size", "10px")
    .style("text-anchor", "middle")
    .style("fill", "white");
    
    //axis labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left +20)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "aText")
        .text("Average Income");
    
    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "aText")
        .text("Obesity");
}).catch(function(error) {
            console.log(error);
        });
                        


