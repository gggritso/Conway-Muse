// Generated by CoffeeScript 1.3.3
(function() {

  (function(global) {
    var Muse;
    Muse = (function() {
      var COLORS, DIM, INTERVAL, INTERVAL_TIMEOUT, checkNeighbours, seed, step, toggleState;
      INTERVAL_TIMEOUT = 1500;
      DIM = 0;
      COLORS = [];
      INTERVAL = void 0;
      toggleState = function(cell) {
        var r;
        cell = $(cell);
        if (!cell.hasClass('alive')) {
          cell.addClass('alive');
          r = Math.floor(Math.random() * COLORS.length);
          return cell.css('background-color', COLORS[r]);
        } else {
          cell.removeClass('alive');
          return cell.css({
            'background-color': ''
          });
        }
      };
      checkNeighbours = function(elem) {
        var cc, col, cr, num_alive, row, _i, _j, _ref, _ref1, _ref2, _ref3, _ref4;
        _ref = $(elem).attr('id').replace('c', '').split('-'), row = _ref[0], col = _ref[1];
        row = parseInt(row, 10);
        col = parseInt(col, 10);
        num_alive = 0;
        for (cr = _i = _ref1 = row - 1, _ref2 = row + 1; _ref1 <= _ref2 ? _i <= _ref2 : _i >= _ref2; cr = _ref1 <= _ref2 ? ++_i : --_i) {
          for (cc = _j = _ref3 = col - 1, _ref4 = col + 1; _ref3 <= _ref4 ? _j <= _ref4 : _j >= _ref4; cc = _ref3 <= _ref4 ? ++_j : --_j) {
            if ($("#c" + cr + "-" + cc).hasClass('alive')) {
              num_alive += 1;
            }
          }
        }
        if ($(elem).hasClass('alive')) {
          num_alive -= 1;
        }
        return num_alive;
      };
      seed = function() {
        return $('.cell').each(function(i, cell) {
          var r;
          r = Math.floor(Math.random() * 6) + 1;
          if (r === 1) {
            return toggleState(cell);
          }
        });
      };
      step = function() {
        var birth_list, cell, death_list, _i, _j, _len, _len1;
        death_list = [];
        birth_list = [];
        $('.cell').each(function(i, cell) {
          var neighbours;
          neighbours = checkNeighbours(cell);
          if (neighbours < 2 && $(cell).hasClass('alive')) {
            return death_list.push(cell);
          } else if (neighbours > 3 && $(cell).hasClass('alive')) {
            return death_list.push(cell);
          } else if (neighbours === 3 && !$(cell).hasClass('alive')) {
            return birth_list.push(cell);
          }
        });
        for (_i = 0, _len = death_list.length; _i < _len; _i++) {
          cell = death_list[_i];
          toggleState(cell);
        }
        for (_j = 0, _len1 = birth_list.length; _j < _len1; _j++) {
          cell = birth_list[_j];
          toggleState(cell);
        }
        return true;
      };
      return {
        initialize: function(width, height) {
          var column, divs, item, row, _i, _j;
          DIM = width;
          COLORS = (function() {
            var _i, _len, _ref, _results;
            _ref = $('#palette div');
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              item = _ref[_i];
              _results.push($(item).css('background-color'));
            }
            return _results;
          })();
          divs = '';
          for (row = _i = 1; 1 <= height ? _i <= height : _i >= height; row = 1 <= height ? ++_i : --_i) {
            for (column = _j = 1; 1 <= width ? _j <= width : _j >= width; column = 1 <= width ? ++_j : --_j) {
              divs += "<div id='c" + row + "-" + column + "' class='cell'></div>";
            }
            divs += '<br>';
          }
          $('#board').html(divs);
          $('#board').on('click', '.cell', function(event) {
            return toggleState($(this));
          });
          $('#board').width(($('.cell').width() + 2) * DIM);
          seed();
          step();
          return this.start();
        },
        start: function() {
          return INTERVAL = setInterval(step, INTERVAL_TIMEOUT);
        },
        stop: function() {
          return clearInterval(INTERVAL);
        },
        clear: function() {
          return $('.cell').removeClass('alive').css('background-color', '');
        }
      };
    })();
    return global.Muse = Muse;
  })(this);

}).call(this);
