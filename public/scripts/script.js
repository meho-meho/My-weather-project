navigator.geolocation.getCurrentPosition((pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    $('#lat').val(lat);
    $('#lon').val(lon);
    $('#form').submit();
});