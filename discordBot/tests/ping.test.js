const pingCommand = require('../commands/ping.js');

const message = {
    channel: {
        send: function(output) {
            return output;
        }
    }
}

test('Ping output message properly sent', async () => {
    expect(
        await pingCommand.execute(message, [])
    ).toBe('Pong!')
})