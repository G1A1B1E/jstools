function calculate_this() {
    var input = document.getElementById('numbers').value;
    var results = eval(input);
    document.getElementById('results').innerHTML = results;
  }

  