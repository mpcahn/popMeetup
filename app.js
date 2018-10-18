//api key 673e4c22272f4632b4c671069d3752
var events = []

document.addEventListener("DOMContentLoaded", function (event) {   

    String.prototype.insert = function (index, string) {
        if (index > 0)
            return this.substring(0, index) + string + this.substring(index, this.length);
        else
            return string + this;
    };

    $(".zip").focus()

    $(".zip").keyup(function (e) {
        if (e.keyCode === 13) {
            $(".btn").click()
        }
    })

    $('.btn').on('click', function () {
        var zip = $('.zip').val()
        var link = 'https://galvanize-cors.herokuapp.com/https://api.meetup.com/2/open_events?&key=673e4c22272f4632b4c671069d3752&photo-host=public&zip=&page=200'
        link = link.insert(132, zip)

        $(".list-group").empty()

        $.get(link)
            .then(function (data) {
                dataLength = data.results.length
                for (var i = 0; i < dataLength; i++) {
                    data.results[i].group.name
                    group_name = data.results[i].group.name
                    num_rsvps = data.results[i].yes_rsvp_count
                    url = data.results[i].event_url
                    time = data.results[i].time + data.results[i].utc_offset

                    obj = {
                        'name': group_name,
                        'link': url,
                        'rsvps': num_rsvps,
                        'time': time
                    }
                    events.push(obj)
                }                  

                events.sort(function (a, b) {
                    return b.rsvps - a.rsvps
                })

                for (var i = 0; i < events.length; i++) {
                    var link = '<li  class="list-group-item">' + '<a href="' + events[i].link + '">' + events[i].rsvps + ' RSVP\'d from: ' + events[i].name + '</a>' + "</li>"
                    $('.list-group').append(link)
                }
            });
    })
})