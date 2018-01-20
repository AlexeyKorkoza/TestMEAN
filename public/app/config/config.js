export default {
    leaflet: {
        center: {
            lat: 53.6834599,
            lng: 23.8342648,
            zoom: 13
        },
        markers: {},
        titles: {
            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            options: {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
        }
    },
    select: {
        create: false,
        valueField: 'value',
        labelField: 'text',
        delimiter: '|',
        placeholder: 'Choose type object',
        maxItems: 1
    }
}