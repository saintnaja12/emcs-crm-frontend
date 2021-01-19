const handlers = []
export default $socket => () => (
	{
		init() {
			$socket.on('reminder-new-message', (data) => {
				handlers.forEach(handler => {
					handler.newReminder(data)
				})
			})
			$socket.on('reminder-message-read', (data) => {
				handlers.forEach(handler => {
					handler.readReminder(data)
				})
			})
		},
		registerHandler(handler) {
			handlers.push(handler)
		},
		broadcastMessage(message) {
			$socket.emit('switch', message)
		},
		disconnect() {
			$socket.disconnect()
		}
	}
)

