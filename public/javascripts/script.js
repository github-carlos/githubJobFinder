
var uriGithubJobs = 'http://localhost:3000/github';

function buscarEmpregos() {
    var description = $('#description').val();
    var location = $('#location').val();
    var full_time = $('#full_time').val();
    
    var url = uriGithubJobs + '?'     + 'description=' + description  + '&'+
                            'location=' + location + '&';
    if (full_time !== 'both') {
        url = url + 'full_time=' + full_time;
    }

    console.log('url', url);

    $.ajax({
        url: url,
        success: function( result ) {
          $('#tableJobs').empty();
          console.log('result', typeof result)
          jobs = JSON.parse(result);
          console.log('typef',jobs);

          for (var i = 0; i < jobs.length; i++) {
              $('#tableJobs').append(
                "<section class='container with-title'> \
                    <h2 class='title'> " + jobs[i].title + ' - ' + jobs[i].location + "</h2> \
                    <div class='job-description container is-dark'> " 
                       + jobs[i].description +
                    "</div> \
                    <a href='/github/job/"+ jobs[i].id + "' class='btn'>Visualizar</a>        \
                </section>"
                )
          }
        }
      });
}