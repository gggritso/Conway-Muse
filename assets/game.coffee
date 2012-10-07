( ( global ) ->

  Muse = ( ->

    INTERVAL_TIMEOUT = 1500
    DIM = 0  # Default dimension
    COLORS = []
    INTERVAL = undefined


    toggleState = ( cell ) ->
      # TODO: Figure out colours here, and always use this to toggle!
      cell = $( cell )
      if !cell.hasClass( 'alive' )
        # Dead cell, so give it a new color!
        cell.addClass( 'alive' );
        r = Math.floor( Math.random() * COLORS.length )
        cell.css( 'background-color', COLORS[ r ] )
      else
        # Kill the cell!
        cell.removeClass( 'alive' )
        cell.css( 'background-color': '' )

    checkNeighbours = ( elem ) ->
      [row, col] = $( elem ).attr( 'id' ).replace('c', '').split( '-' )
      row = parseInt( row, 10 )
      col = parseInt( col, 10 )

      # Check all cells, then subtract own state
      # TODO: Also comprehension?
      num_alive = 0
      for cr in [row-1..row+1]
        for cc in [col-1..col+1]
          num_alive += 1 if $( "#c#{cr}-#{cc}" ).hasClass( 'alive' )

      num_alive -= 1 if $( elem ).hasClass( 'alive' )

      return num_alive

    seed = ->
      $( '.cell' ).each ( i, cell ) ->
        r = Math.floor(Math.random() * 6) + 1
        toggleState( cell ) if r == 1

    step = ->
      # Go through the board, and compose a new one!

      death_list = []
      birth_list = []

      # Optimize: check all alive cells first?
      $( '.cell' ).each ( i, cell ) ->
        neighbours = checkNeighbours( cell )

        if neighbours < 2 and $( cell ).hasClass( 'alive' )
          death_list.push( cell )
        else if neighbours > 3 and $( cell ).hasClass( 'alive' )
          death_list.push( cell )
        else if neighbours == 3 and not $( cell ).hasClass( 'alive' )
          birth_list.push( cell )

      # Apply the changes
      for cell in death_list
        toggleState( cell )

      for cell in birth_list
        toggleState( cell )

      return true

    initialize: (width, height) ->
      # Create our grid
      DIM = width

      # Get the colors
      COLORS = ( $( item ).css('background-color') for item in $( '#palette div' ) )

      # Create each row one by one
      # TODO: Use array comprehensions to create string
      divs = ''
      for row in [1..height]
        for column in [1..width]
          divs += "<div id='c#{row}-#{column}' class='cell'></div>"
        divs += '<br>'

      $( '#board' ).html( divs )

      # Add click handlers
      $( '.cell' ).click ->
        toggleState( this )

      # Resize the container
      $( '#board' ).width( ( $( '.cell' ).width() + 2 ) * DIM )

      seed()
      step()
      this.start()


    start: ->
      INTERVAL = setInterval(step, INTERVAL_TIMEOUT)

    stop: ->
      clearInterval( INTERVAL )

    clear: ->
      $( '.cell' ).removeClass( 'alive' ).css( 'background-color', '' )

  )()

  global.Muse = Muse

)( this )
