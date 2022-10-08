//  var fill = d3.scale.category20();
var fill = d3.scale.category10().range(["#fff"]);
var url="/getwords.php";
$.getJSON(url, function(mydata) {
    d3.layout.cloud().size([600, 350])
      .words(mydata)
      .rotate(function() { return ~~(Math.random() * 1) * 90; })
      .font("Helvetica")
      .fontSize(function(d) { return Math.log(d.size)/Math.log(1.1); })
      .on("end", draw)
      .start();
    });
        
function draw(words) {
    var html="Meest voorkomende woorden in recente tweets: "
    for (var i = 0; i < words.length; i++) {
        html = html + "<a href='timeline/"+words[i].text+"'>"+words[i].text+"</a> | "
    }
    html=html.slice(0, -3)
    document.getElementById('wordlist').innerHTML=html
    d3.select("#cloud").append("svg")
        .attr("width", 600)
        .attr("height", 350)
      .append("g")
        .attr("transform", "translate(300,175)")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("cursor","pointer")
        .attr("text-anchor", "middle")
        .attr("aria-label", function(d) {return d.text +", "+d.size +" keer" } )
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .on("click", function(d) {
        	var url="timeline/"+d.text;
        	window.location=url;
    	})
        .text(function(d) { return d.text; });
  }
