d3.select();
d3.selectAll();

d3.select('h1').style('color', 'blue')
.attr('class','heading')
.text('SALES')



d3.selectAll('p').style('color', 'black')

var dataset = [1140955,494802,285238,1124565,468568,281141,1111618,482079,277904,1095034,456264,273758,1126476,450958,281619];

var svgWidth = 800, svgHeight = 300, barPadding = 5;
var barWidth = (svgWidth / dataset.length);


var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var xScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, svgWidth]);
    
var yScale = d3.scaleLinear()
    .domain([0,d3.max(dataset)])
    .range([0, svgHeight/1.1]);



var barChart = svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("y", function(d) {
         return svgHeight - yScale(d)
    })
    .attr("height", function(d) { 
        return d; 
    })
    .attr("width", barWidth - barPadding)
    .attr("transform", function (d, i) {
        var translate = [barWidth * i, 0]; 
        return "translate("+ translate +")";
    });


var text = svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) {
        return d;
    })
    .attr("y", function(d, i) {
        return svgHeight - yScale(d);
    })
    .attr("x", function(d, i) {
        return barWidth * i;
    })
    .attr("fill", "#A64C38");


var data = [
    {"platform": "Android", "percentage": 40.11}, 
    {"platform": "Windows", "percentage": 36.69},
    {"platform": "iOS", "percentage": 13.06}
];

var svgWidth1 = 800, svgHeight1 = 300, radius =  Math.min(svgWidth1, svgHeight1) / 2;
var svg1 = d3.select('svg')
    .attr("width", svgWidth1)
    .attr("height", svgHeight1);

//Create group element to hold pie chart    
var g = svg1.append("g")
    .attr("transform", "translate(" + radius + "," + 400 + ")") ;

var color = d3.scaleOrdinal(d3.schemeCategory10);

var pie = d3.pie().value(function(d) { 
     return d.percentage; 
});

var path = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);
 
var arc = g.selectAll("arc")
    .data(pie(data))
    .enter()
    .append("g");

arc.append("path")
    .attr("d", path)
    .attr("fill", function(d) { return color(d.data.percentage); });
        
var label = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);
            
arc.append("text")
    .attr("transform", function(d) { 
        return "translate(" + label.centroid(d) + ")"; 
    })
    .attr("text-anchor", "middle")
    .text(function(d) { return d.data.platform+":"+d.data.percentage+"%"; });
    


