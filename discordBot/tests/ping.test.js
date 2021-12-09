const pingCommand = require('../commands/ping.js');

const message = {
    channel: {
        send: function(output) {
            return output;
        }
    }
}

test('Correct Output', async () => {
    expect(
        await pingCommand.execute(message, [])
    ).toBe('Pong!')
})