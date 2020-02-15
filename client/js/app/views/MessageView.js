class MessageView extends View {

    _template(data) {
        return data.text ? `<p class="alert alert-info">${data.text}</p>` : `<p></p>`
    }
}