let message = {
    props: ['type', 'from'],
    template: '<p class="message" :class="type"><strong>{{ from }} : </strong><slot></slot></p>'
}

let socket = io.connect('/')
let name = undefined;
while (name === undefined || name == '') {
  name = prompt('Insert your username :')
  socket.emit('new user', {pseudo: name})
}
socket.on('new user', function(data) {
  console.log('Got announcement: ', data.message)
})

let messages = []
let users = []

let vm = new Vue({
    el: "#app",
    components: { message },
    data: {
        user : {
            id: 1,
            name: 'Corentin'
        },
        users,
        messages,
        text: '',
        to: 2,
        last: 0
    },
    computed: {
        lastMessage() {
            return this.last = messages.lastChild.id;
        }
    },
    methods: {
       send (e) {
           toSend = {
               id: messages.length + 1,
               from: this.user.name,
               to: this.correspondant,
               text: this.text
           }
           messages.push(toSend)
           this.text = '';
       },
       changeTo (e) {
           this.to = e.toElement.getAttribute('to')
           console.log(this.to)
       }
    },
    mounted() {
        this.$http.get('messages/').then((response) => {
            for (i = 0; i < response.data.length; i++)
                messages.push(response.data[i])
        }, (response) => {
            console.log('error', response)
        })
        this.$http.get('users/').then((response) => {
            for (i = 0; i < response.data.length; i++) {
                if(response.data[i].id != this.user.id) {
                    users.push(response.data[i])
                }
            }
        }, (response) => {
            console.log('error', response)
        })
    }
})