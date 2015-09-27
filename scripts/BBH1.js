/*
Graphical Module BBH1 Building Block Histogram.

This module has all functionalities for graphical display of user data.

Module Dependencies: d3, THREE, BBMathematics, BBStatistics.
 
*/
define( [ 'd3', 'THREE' ], function( d3, THREE ){


  // Object Constructor BBH1 Building Block Histogram 1D. 
  var BBH1 = function( name, title, nbinsx, xmin, xmax ){
    var fDimension = 1; // Dimension of the plot data.
    var name = name;
    var title = title;
    var nbinsx = nbinsx;
    var xmin = xmin;
    var xmax = xmax;
    var rawData = []; // data array filled by Fill function.
    var freqData = new Array( nbinsx + 2 ); // data array of frequencies for each bin. Two bins extra have been added, one for underflow and the another one for overflow.

    function Fill( value ) {
      return rawData.push( value );
    }
 
    function Draw(){
      var binxlow = xmin;
      var binwidth = ( xmax - xmin ) / nbinsx;
      var binxup = binxlow + binwidth;

      // Initialize frequencies to zero.
      for( var i = 0; i < freqData.length; i++ ){
        freqData[ i ] = 0;
      }

      // First fill array of frequencies for each bin: freqData.
      for( var i = 0; i < rawData.length; i++ ){
        if( rawData[ i ] < xmin ) freqData[ 0 ] += 1; // Underflow.
        if( rawData[ i ] >= xmax ) freqData[ nbinsx + 1 ] += 1; // Overflow.
        // From index 1 til index nbinsx-2 of freqData Array.
        for( var j = 1; j < freqData.length - 1; j++ ){
          if( rawData[ i ] >= binxlow && rawData[ i ] < binxup ){
            freqData[ j ] += 1;
            break;
	  }
        }
        // Go to the next bin
        binxlow = binxup;
        binxup += binwidth;   
      }


      // **************************************************************
      // Now start visualization
      // **************************************************************

      var margin = { top:20, right:40, bottom: 30, left:20 };
      var width = 640 -  margin.left - margin.right ;
      var height = 400 -  margin.top - margin.bottom ;
      var svg = d3.select( "#c1" ).append( "svg" )
        .attr( "height", height + margin.left + margin.right )
        .attr( "width", width + margin.top + margin.bottom );
      // Drawing a chart inside the svg
      var chart = svg.append( "g" )
        .attr( "transform", "translate(" + margin.left + "," + margin.top + ")" );
      // Scaling the data
      var xScale = d3.scale.linear().range( [ 0, width ] );
      var yScale = d3.scale.linear().range( [ height, 0 ] );
      // Defining the plot's domain
      xScale.domain( xmin, xmax ).nice();
      yScale.domain( 0, d3.max( rawData ) ).nice();

      var xAxis = d3.svg.axis()
        .scale( xScale )
        .orient( "bottom" );

      var yAxis = d3.svg.axis()
        .scale( yScale )
        .orient( "left" );

      var xAxisGroup = chart.append( "g" )
        .attr( "transform", "translate(0," + height + ")" );

      var yAxisGroup = chart.append( "g" )
        .attr( "transform", "translate(0," + height + ")" );

      xAxis( xAxisGroup );
      yAxis( yAxisGroup );
      // Definining text labels for axis.
      // Don't do it because that need to be accessed by the user

      // Displaying data    
      freqData.forEach(
        chart2.append( "rect" )
          .attr( "x", xScale )
          .attr( "width", binwidth )
          .attr( "y", yScale )
          .attr( "height", height - yScale )
      );
    } // Ends function Draw
    return {
      Fill: Fill,
      Draw: Draw
    };
  }; // Ends function BBH1
  return {
    BBH1: BBH1
  };
}); // Ends Module BBH


