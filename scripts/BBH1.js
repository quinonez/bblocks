/*
Graphical Module BBH1 Building Block Histogram.

This module has all functionalities for graphical display of user data.

Module Dependencies: d3, THREE, BBMathematics, BBStatistics.
 
*/
define( [ 'd3', 'THREE' ], function( d3, THREE ){
  "use strict";

  // Object Constructor BBH1 Building Block Histogram 1D. 
  function BBH1( name, title, nbinsx, xmin, xmax ){
    this.fDimension = 1; // Dimension of the plot data.
    this.name = name;
    this.title = title;
    this.nbinsx = nbinsx;
    this.xmin = xmin;
    this.xmax = xmax;
    this.rawData = []; // data array filled by Fill function.
    this.freqData = new Array( nbinsx + 2 ); // data array of frequencies for each bin. Two bins extra have been added, one for underflow and the another one for overflow.
  }


  BBH1.prototype = {
    constructor: BBH1,

    Fill: function( value ) {
      return this.rawData.push( value );
    },
    
    Draw: function(){
    var binxlow = this.xmin;
    var binwidth = ( this.xmax - this.xmin ) / this.nbinsx;
    var binxup = binxlow + binwidth;

    // Initialize frequencies to zero.
    for( var i = 0; i < this.freqData.length; i++ ){
      this.freqData[ i ] = 0;
    }

    // First fill array of frequencies for each bin: freqData.
    for( var i = 0; i < this.rawData.length; i++ ){
      binxlow = this.xmin;
      binxup = binxlow + binwidth;
      if( this.rawData[ i ] < this.xmin ) this.freqData[ 0 ] += 1; // Underflow.
      if( this.rawData[ i ] >= this.xmax ) this.freqData[ nbinsx + 1 ] += 1; // Overflow.
      // From index 1 til index nbinsx-2 of freqData Array.
      for( var j = 1; j < this.freqData.length - 1; j++ ){
        if( this.rawData[ i ] >= binxlow && this.rawData[ i ] < binxup ){
          this.freqData[ j ] += 1;
          break;
        }
        // Go to the next bin
        binxlow = binxup;
        binxup += binwidth;   
      }
    }
    console.log(this.freqData);
      // **************************************************************
      // Now start visualization
      // **************************************************************
      var margin = { top:20, right:40, bottom: 30, left:60 };
      var width = 640 -  margin.left - margin.right ;
      var height = 400 -  margin.top - margin.bottom ;
      var svg = d3.select( "#c1" ).append( "svg" )
        .attr( "width", height + margin.left + margin.right )
        .attr( "height", width + margin.top + margin.bottom );
      // Drawing a chart inside the svg
      var chart = svg.append( "g" )
        .attr( "transform", "translate(" + margin.left + "," + margin.top + ")" );
      // Scaling the data
      var xScale = d3.scale.linear().range( [ 0, width ] );
      var yScale = d3.scale.linear().range( [ height, 0 ] );
      // Defining the plot's domain
      xScale.domain([ this.xmin, this.xmax ]).nice();
      yScale.domain([ 0, d3.max( this.rawData ) ]).nice();

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
      this.freqData.forEach(function(d){
        chart.append( "rect" )
          .attr( "x", function(d){return binwidth;} )
          .attr( "width", binwidth )
          .attr( "y", height/2 )
          .attr( "height", height )
      });
    } // Ends function Draw
  };

  return BBH1;
 
}); // Ends Module BBH1


